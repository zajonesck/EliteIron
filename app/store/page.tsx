import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { getStoreProducts } from '@/lib/printful';
import StoreGrid from './StoreGrid';

export const metadata: Metadata = {
  title: 'Store | Elite Iron Sports Performance',
  description: 'Shop Elite Iron gear — hoodies, shirts, hats, and more. Represent your gym.',
  openGraph: {
    title: 'Elite Iron Store',
    description: 'Shop Elite Iron Sports Performance apparel and gear.',
  },
};

export default async function StorePage() {
  const products = await getStoreProducts();

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-black pt-32 pb-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-4">Merch</p>
            <h1 className="text-white font-black text-5xl md:text-7xl uppercase leading-tight">
              Elite Iron<br />
              <span className="text-[#C41E1E]">Store</span>
            </h1>
            <div className="w-16 h-1 bg-[#C41E1E] mt-6" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <ShoppingBag size={16} className="text-[#C41E1E]" />
            Rep the gym. Support the mission.
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-zinc-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <StoreGrid products={products} />
        </div>
      </section>

      {/* Custom Orders */}
      <section className="bg-black py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Bulk &amp; Custom</p>
          <h2 className="text-white font-black text-3xl md:text-4xl uppercase mb-4">
            Team Orders &amp; Custom Gear
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Need gear for your team, club, or competition crew? Contact James to discuss bulk orders and custom options.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#C41E1E] hover:bg-[#E02020] text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-all duration-200"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
