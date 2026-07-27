import { NextRequest, NextResponse } from 'next/server';
import type { CartItem } from '@/lib/cart';
import { getPrintfulRates } from '@/lib/printful';
import type { ShippingAddress } from '@/lib/printful';

export async function POST(req: NextRequest) {
  try {
    const { items, address }: { items: CartItem[]; address: ShippingAddress } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }
    if (!address?.address1 || !address?.city || !address?.state_code || !address?.country_code || !address?.zip) {
      return NextResponse.json({ error: 'Incomplete address' }, { status: 400 });
    }

    const rates = await getPrintfulRates(items, address);
    return NextResponse.json(rates);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
