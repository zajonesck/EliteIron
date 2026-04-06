'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { PrintfulSyncProduct } from '@/lib/printful';

type Product = PrintfulSyncProduct & { price: string };

const CATEGORIES = ['All', 'Apparel', 'Accessories'];

const ACCESSORY_KEYWORDS = [
  'cap', 'hat', 'beanie', 'sticker', 'bottle', 'slides', 'bag', 'mug',
];

function getCategory(name: string): string {
  const lower = name.toLowerCase();
  return ACCESSORY_KEYWORDS.some((kw) => lower.includes(kw))
    ? 'Accessories'
    : 'Apparel';
}

export default function StoreGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? products
      : products.filter((p) => getCategory(p.name) === active);

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 border transition-colors ${
              active === cat
                ? 'bg-[#C41E1E] border-[#C41E1E] text-white'
                : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-950 hover:bg-black transition-colors group"
          >
            <Link href={`/store/${product.id}`} className="relative aspect-square bg-black overflow-hidden border-b border-white/5 block">
              <Image
                src={product.thumbnail_url}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-white font-black text-base uppercase tracking-wide">
                  {product.name}
                </h3>
                <div className="text-[#C41E1E] font-black text-lg shrink-0">
                  {product.price}
                </div>
              </div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-4">
                {getCategory(product.name)}
              </div>

              <Link
                href={`/store/${product.id}`}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-[#C41E1E] border border-white/10 hover:border-[#C41E1E] text-gray-300 hover:text-white text-xs font-bold tracking-[0.15em] uppercase py-3 transition-all duration-200"
              >
                <ShoppingBag size={13} />
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
