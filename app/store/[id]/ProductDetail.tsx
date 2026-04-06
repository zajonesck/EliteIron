'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import type { PrintfulProductDetailFull } from '@/lib/printful';
import { useCart } from '@/lib/cart';

interface Props {
  product: PrintfulProductDetailFull;
}

function parseVariantName(productName: string, variantName: string) {
  const stripped = variantName.startsWith(productName + ' - ')
    ? variantName.slice(productName.length + 3)
    : variantName;
  const parts = stripped.split(' / ');
  return {
    size: parts[0]?.trim() || stripped,
    color: parts[1]?.trim() || '',
    label: stripped,
  };
}

export default function ProductDetail({ product }: Props) {
  const { sync_product, sync_variants } = product;
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const variants = sync_variants.filter(v => v.synced);

  const parsed = useMemo(
    () => variants.map(v => ({ ...v, parsed: parseVariantName(sync_product.name, v.name) })),
    [variants, sync_product.name]
  );

  const sizes = useMemo(() => [...new Set(parsed.map(v => v.parsed.size))], [parsed]);
  const colors = useMemo(() => [...new Set(parsed.map(v => v.parsed.color).filter(Boolean))], [parsed]);
  const hasColors = colors.length > 0;

  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? '');
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? '');

  const selectedVariant = useMemo(() => {
    return parsed.find(v =>
      v.parsed.size === selectedSize &&
      (!hasColors || v.parsed.color === selectedColor)
    ) ?? null;
  }, [parsed, selectedSize, selectedColor, hasColors]);

  // Available sizes for selected color (and vice versa)
  const availableSizesForColor = useMemo(() => {
    if (!hasColors) return new Set(sizes);
    return new Set(parsed.filter(v => v.parsed.color === selectedColor).map(v => v.parsed.size));
  }, [parsed, selectedColor, hasColors, sizes]);

  const availableColorsForSize = useMemo(() => {
    if (!hasColors) return new Set<string>();
    return new Set(parsed.filter(v => v.parsed.size === selectedSize).map(v => v.parsed.color));
  }, [parsed, selectedSize, hasColors]);

  // Preview image: use selected variant's preview file, or fall back to product thumbnail
  const previewImage = useMemo(() => {
    if (selectedVariant?.files) {
      const preview = selectedVariant.files.find(f => f.type === 'preview');
      if (preview?.preview_url) return preview.preview_url;
    }
    return sync_product.thumbnail_url;
  }, [selectedVariant, sync_product.thumbnail_url]);

  function handleAddToCart() {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: sync_product.id,
      name: `${sync_product.name} — ${selectedVariant.parsed.label}`,
      price: parseFloat(selectedVariant.retail_price),
      thumbnail: previewImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="bg-black min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-xs uppercase tracking-widest font-bold mb-10 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-zinc-900">
            <Image
              src={previewImage}
              alt={sync_product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Elite Iron Merch
            </p>
            <h1 className="text-white font-black text-3xl md:text-4xl uppercase leading-tight mb-2">
              {sync_product.name}
            </h1>
            <div className="text-[#C41E1E] font-black text-2xl mb-6">
              {selectedVariant
                ? `$${parseFloat(selectedVariant.retail_price).toFixed(2)}`
                : `From $${Math.min(...variants.map(v => parseFloat(v.retail_price))).toFixed(2)}`}
            </div>

            <div className="w-12 h-px bg-[#C41E1E] mb-8" />

            {/* Color selector */}
            {hasColors && (
              <div className="mb-6">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-3">
                  Color: <span className="text-white">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => {
                    const available = availableColorsForSize.has(color);
                    return (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          // If current size isn't available for new color, pick first available
                          const sizesForColor = new Set(
                            parsed.filter(v => v.parsed.color === color).map(v => v.parsed.size)
                          );
                          if (!sizesForColor.has(selectedSize)) {
                            setSelectedSize([...sizesForColor][0] ?? '');
                          }
                        }}
                        disabled={!available}
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                          selectedColor === color
                            ? 'bg-[#C41E1E] border-[#C41E1E] text-white'
                            : available
                            ? 'border-white/20 text-gray-300 hover:border-white/50 hover:text-white'
                            : 'border-white/5 text-gray-700 cursor-not-allowed'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-3">
                  Size: <span className="text-white">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => {
                    const available = availableSizesForColor.has(size);
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`w-14 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${
                          selectedSize === size
                            ? 'bg-[#C41E1E] border-[#C41E1E] text-white'
                            : available
                            ? 'border-white/20 text-gray-300 hover:border-white/50 hover:text-white'
                            : 'border-white/5 text-gray-700 cursor-not-allowed line-through'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant}
              className={`flex items-center justify-center gap-2 w-full py-4 font-black text-sm tracking-[0.15em] uppercase transition-all duration-200 ${
                added
                  ? 'bg-green-700 text-white'
                  : selectedVariant
                  ? 'bg-[#C41E1E] hover:bg-[#E02020] text-white'
                  : 'bg-zinc-800 text-gray-600 cursor-not-allowed'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to Cart
                </>
              )}
            </button>

            <p className="text-gray-600 text-xs text-center mt-4">
              Fulfilled by Printful · Ships worldwide
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
