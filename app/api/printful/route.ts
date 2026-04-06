import { NextResponse } from 'next/server';
import { getStoreProducts } from '@/lib/printful';

export async function GET() {
  try {
    const products = await getStoreProducts();
    return NextResponse.json({ count: products.length, products });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
