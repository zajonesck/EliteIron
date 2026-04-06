import { NextRequest, NextResponse } from 'next/server';
import type { CartItem } from '@/lib/cart';
import { createPrintfulOrder } from '@/lib/printful';

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
    const { orderId, cartItems }: { orderId: string; cartItems: CartItem[] } = await req.json();

    const token = await getPayPalToken();

    // Capture the PayPal payment
    const captureRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const captureData = await captureRes.json();

    if (!captureRes.ok || captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Payment capture failed', details: captureData },
        { status: 400 }
      );
    }

    // Extract shipping info from PayPal response
    const unit = captureData.purchase_units?.[0];
    const shipping = unit?.shipping;
    const address = shipping?.address;

    if (!address) {
      return NextResponse.json(
        { error: 'No shipping address returned from PayPal' },
        { status: 400 }
      );
    }

    const payer = captureData.payer;

    // Create Printful order
    const printfulOrder = await createPrintfulOrder(
      {
        name: shipping.name?.full_name ?? `${payer?.name?.given_name ?? ''} ${payer?.name?.surname ?? ''}`.trim(),
        address1: address.address_line_1,
        city: address.admin_area_2,
        state_code: address.admin_area_1,
        country_code: address.country_code,
        zip: address.postal_code,
        email: payer?.email_address,
      },
      cartItems.map(i => ({ sync_variant_id: i.variantId, quantity: i.quantity }))
    );

    return NextResponse.json({ success: true, printfulOrderId: printfulOrder.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
