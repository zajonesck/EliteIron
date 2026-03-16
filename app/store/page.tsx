import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store | Elite Iron Sports Performance',
  description: 'Shop Elite Iron gear — hoodies, shirts, hats, and more. Represent your gym.',
  openGraph: {
    title: 'Elite Iron Store',
    description: 'Shop Elite Iron Sports Performance apparel and gear.',
  },
};

const STORE_BASE = 'https://www.eliteironsp.com/store/p';

const products = [
  {
    id: 1,
    name: 'The Hoodie',
    price: '$50',
    category: 'Apparel',
    description: 'Comfort at its finest!',
    image: '/images/store/unisex-heavy-blend-hoodie-black-front-690d109191096.jpg',
    slug: 'the-hoodie',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'The OG Shirt',
    price: '$35',
    category: 'Apparel',
    description: 'The original game day shirt with logos in the front and back.',
    image: '/images/store/mens-fitted-t-shirt-black-front-6712ca26969bb.jpg',
    slug: 'short-sleeve-t-shirt-2',
    badge: null,
  },
  {
    id: 3,
    name: 'Zip Hoodie',
    price: '$55',
    category: 'Apparel',
    description: 'Perfect for the Autumn temps!',
    image: '/images/store/lane-seven-ls14003-i-premium-full-zip-hoodie-black-front-and-back-69247a26d005f.jpg',
    slug: 'zip-hoodie-updated',
    badge: null,
  },
  {
    id: 4,
    name: 'Faith Is My Foundation',
    price: 'From $43',
    category: 'Apparel',
    description: "Who knew that the softest hoodie you'll ever own comes with such a cool design.",
    image: '/images/store/cotton-heritage-m2580-i-unisex-premium-pullover-hoodie-black-front-2-69307210c5a6a.jpg',
    slug: 'faith-is-my-foundation',
    badge: 'New',
  },
  {
    id: 5,
    name: 'Faith Sweatshirt',
    price: 'From $35',
    category: 'Apparel',
    description: 'Rock a classic sweatshirt silhouette with ribbed crew neck, long sleeve cuffs, and a flat hem.',
    image: '/images/store/unisex-premium-sweatshirt-adobe-front-69307599e8a8f.jpg',
    slug: 'faith-sweatshirt',
    badge: 'New',
  },
  {
    id: 6,
    name: 'Elite Iron Baseball Shirt',
    price: '$40',
    category: 'Apparel',
    description: 'Keep Spring in your wardrobe!',
    image: '/images/store/unisex-34-sleeve-raglan-shirt-heather-grey-black-front-690d08d26365d.jpg',
    slug: '34-sleeve-raglan-shirt',
    badge: null,
  },
  {
    id: 7,
    name: 'Elite Iron Crop Hoodie',
    price: '$45',
    category: 'Apparel',
    description: 'For our friends who want to show off a little well-earned abs while staying warm.',
    image: '/images/store/womens-cropped-hoodie-black-front-669293eb7ca88.jpg',
    slug: 'crop-hoodie',
    badge: null,
  },
  {
    id: 8,
    name: 'Elite Iron Joggers',
    price: '$45',
    category: 'Apparel',
    description: 'Snuggle up to keep the legs and hips warm before the tight sleeves come out.',
    image: '/images/store/unisex-fleece-sweatpants-black-back-669297565aa4e.jpg',
    slug: 'unisex-fleece-sweatpants',
    badge: null,
  },
  {
    id: 9,
    name: 'Elite Iron Muscle Tee',
    price: '$25',
    category: 'Apparel',
    description: 'Never a bad time to show off the big guns either.',
    image: '/images/store/unisex-muscle-shirt-black-front-669295b1cd1ae.jpg',
    slug: 'muscle-shirt',
    badge: null,
  },
  {
    id: 10,
    name: 'Elite Iron Polo Shirt',
    price: '$40',
    category: 'Apparel',
    description: 'Look professional while showing off your team!',
    image: '/images/store/premium-polo-shirt-black-front-6712ce9b7afae.jpg',
    slug: 'mens-premium-polo',
    badge: null,
  },
  {
    id: 11,
    name: 'The Elite Cap',
    price: '$25',
    category: 'Accessories',
    description: 'Keep your head cool with our new colorways.',
    image: '/images/store/closed-back-structured-cap-dark-navy-front-690d0b7918f46.jpg',
    slug: 'structured-twill-cap',
    badge: 'New Colorways',
  },
  {
    id: 12,
    name: 'Elite Iron Sticker',
    price: '$3',
    category: 'Accessories',
    description: 'Give your vehicle a little love!',
    image: '/images/store/kiss-cut-stickers-white-3x3-front-669295e1bc0a7.jpg',
    slug: 'elite-iron-sticker',
    badge: null,
  },
];

export default function StorePage() {
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

          {/* Filter bar */}
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            {['All', 'Apparel', 'Accessories'].map((cat) => (
              <button
                key={cat}
                className={`text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 border transition-colors ${
                  cat === 'All'
                    ? 'bg-[#C41E1E] border-[#C41E1E] text-white'
                    : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {products.map((product) => (
              <div key={product.id} className="bg-zinc-950 hover:bg-black transition-colors group">
                {/* Product image */}
                <div className="relative aspect-square bg-black overflow-hidden border-b border-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-[#C41E1E] text-white text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 z-10">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-white font-black text-base uppercase tracking-wide">{product.name}</h3>
                    <div className="text-[#C41E1E] font-black text-lg shrink-0">{product.price}</div>
                  </div>
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">{product.category}</div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

                  <Link
                    href={`${STORE_BASE}/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-[#C41E1E] border border-white/10 hover:border-[#C41E1E] text-gray-300 hover:text-white text-xs font-bold tracking-[0.15em] uppercase py-3 transition-all duration-200"
                  >
                    <ShoppingBag size={13} />
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
