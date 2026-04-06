import { NextRequest, NextResponse } from 'next/server';
import type { CartItem } from '@/lib/cart';

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
    const { items }: { items: CartItem[] } = await req.json();

    const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
              value: itemTotal.toFixed(2),
              breakdown: {
                item_total: { currency_code: 'USD', value: itemTotal.toFixed(2) },
              },
            },
            items: items.map(i => ({
              name: i.name,
              quantity: String(i.quantity),
              unit_amount: { currency_code: 'USD', value: i.price.toFixed(2) },
            })),
          },
        ],
        application_context: {
          shipping_preference: 'GET_FROM_FILE',
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({ orderId: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
