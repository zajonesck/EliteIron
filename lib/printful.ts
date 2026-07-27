const PRINTFUL_API = 'https://api.printful.com';

export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
}

export interface PrintfulSyncVariantDetail extends PrintfulSyncVariant {
  files: Array<{
    type: string;
    preview_url: string | null;
    thumbnail_url: string | null;
  }>;
}

export interface PrintfulProductDetail {
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
}

export interface PrintfulProductDetailFull {
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariantDetail[];
}

export interface PrintfulRecipient {
  name: string;
  address1: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email?: string;
}

export interface PrintfulOrderItem {
  sync_variant_id: number;
  quantity: number;
}

function getMinPrice(variants: PrintfulSyncVariant[]): string {
  const prices = variants
    .map((v) => parseFloat(v.retail_price))
    .filter((p) => !isNaN(p));
  if (!prices.length) return '';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$${min.toFixed(2)}` : `From $${min.toFixed(2)}`;
}

export async function getStoreProducts(): Promise<
  (PrintfulSyncProduct & { price: string })[]
> {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error('PRINTFUL_API_TOKEN is not set');

  const listRes = await fetch(`${PRINTFUL_API}/sync/products?limit=100`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!listRes.ok) {
    throw new Error(`Printful API error: ${listRes.status} ${listRes.statusText}`);
  }

  const listData = await listRes.json();
  const products: PrintfulSyncProduct[] = (listData.result ?? []).filter(
    (p: PrintfulSyncProduct) => !p.is_ignored
  );

  // Fetch variants for each product in parallel to get pricing
  const detailed = await Promise.all(
    products.map(async (p) => {
      const res = await fetch(`${PRINTFUL_API}/sync/products/${p.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
      });
      if (!res.ok) return { ...p, price: '' };
      const data = await res.json();
      const detail: PrintfulProductDetail = data.result;
      return {
        ...p,
        price: getMinPrice(detail.sync_variants),
      };
    })
  );

  return detailed;
}

export async function getProductById(id: string | number): Promise<PrintfulProductDetailFull> {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error('PRINTFUL_API_TOKEN is not set');

  const res = await fetch(`${PRINTFUL_API}/sync/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Printful API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  return data.result;
}

export interface ShippingAddress {
  name: string;
  address1: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
}

export interface PrintfulRates {
  shipping: number;
  tax: number;
  shippingLabel: string;
}

export async function getPrintfulRates(
  items: Array<{ variantId: number; quantity: number; price: number }>,
  address: ShippingAddress
): Promise<PrintfulRates> {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error('PRINTFUL_API_TOKEN is not set');

  const recipient = {
    address1: address.address1,
    city: address.city,
    state_code: address.state_code,
    country_code: address.country_code,
    zip: address.zip,
  };

  const shippingRes = await fetch(`${PRINTFUL_API}/shipping/rates`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient,
      items: items.map(i => ({ sync_variant_id: i.variantId, quantity: i.quantity })),
      currency: 'USD',
    }),
  });

  if (!shippingRes.ok) {
    const err = await shippingRes.json().catch(() => ({}));
    throw new Error(`Printful shipping error: ${JSON.stringify(err)}`);
  }

  const shippingData = await shippingRes.json();
  const rates: Array<{ id: string; name: string; rate: string }> = shippingData.result ?? [];
  if (!rates.length) throw new Error('No shipping rates available for this address');

  const cheapest = rates.reduce(
    (min, r) => parseFloat(r.rate) < parseFloat(min.rate) ? r : min,
    rates[0]
  );
  const shippingCost = parseFloat(cheapest.rate);

  let taxAmount = 0;
  const taxRes = await fetch(`${PRINTFUL_API}/tax/rates`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipient }),
  });

  if (taxRes.ok) {
    const taxData = await taxRes.json();
    const taxResult = taxData.result;
    if (taxResult?.required && taxResult?.rate) {
      const itemSubtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      taxAmount = itemSubtotal * taxResult.rate;
      if (taxResult.shipping_taxable) taxAmount += shippingCost * taxResult.rate;
    }
  }

  return {
    shipping: parseFloat(shippingCost.toFixed(2)),
    tax: parseFloat(taxAmount.toFixed(2)),
    shippingLabel: cheapest.name,
  };
}

export async function createPrintfulOrder(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[]
): Promise<{ id: number; status: string }> {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) throw new Error('PRINTFUL_API_TOKEN is not set');

  const res = await fetch(`${PRINTFUL_API}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipient, items }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Printful order error: ${JSON.stringify(err)}`);
  }

  const data = await res.json();
  const order = data.result;

  // Auto-confirm so it goes straight to fulfillment
  const confirmRes = await fetch(`${PRINTFUL_API}/orders/${order.id}/confirm`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  const confirmData = await confirmRes.json().catch(() => ({}));
  if (!confirmRes.ok || confirmData.code >= 400) {
    throw new Error(`Printful confirm error: ${JSON.stringify(confirmData)}`);
  }

  return order;
}
