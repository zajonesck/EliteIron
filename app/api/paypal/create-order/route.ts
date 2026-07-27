import { NextRequest, NextResponse } from 'next/server';
import type { CartItem } from '@/lib/cart';
import { getPrintfulRates } from '@/lib/printful';
import type { ShippingAddress } from '@/lib/printful';

const PAYPAL_BASE = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { items, address }: { items: CartItem[]; address: ShippingAddress } = await req.json();

    if (!address?.address1 || !address?.city || !address?.state_code || !address?.country_code || !address?.zip) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    // Always fetch authoritative rates server-side — never trust frontend amounts
    const { shipping, tax, shippingLabel } = await getPrintfulRates(items, address);

    const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const grandTotal = itemTotal + shipping + tax;

    const token = await getPayPalToken();

    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: grandTotal.toFixed(2),
              breakdown: {
                item_total: { currency_code: 'USD', value: itemTotal.toFixed(2) },
                shipping:   { currency_code: 'USD', value: shipping.toFixed(2) },
                tax_total:  { currency_code: 'USD', value: tax.toFixed(2) },
              },
            },
            items: items.map(i => ({
              name: i.name,
              quantity: String(i.quantity),
              unit_amount: { currency_code: 'USD', value: i.price.toFixed(2) },
            })),
            shipping: {
              name: { full_name: address.name },
              address: {
                address_line_1: address.address1,
                admin_area_2: address.city,
                admin_area_1: address.state_code,
                postal_code: address.zip,
                country_code: address.country_code,
              },
            },
          },
        ],
        application_context: {
          shipping_preference: 'SET_PROVIDED_ADDRESS',
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({ orderId: data.id, shipping, tax, shippingLabel, grandTotal });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
