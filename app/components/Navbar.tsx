'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/store', label: 'Store' },
  { href: '/contact', label: 'Contact' },
  { href: '/waiver', label: 'Waiver' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-black/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.webp"
            alt="Elite Iron Sports Performance"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold tracking-widest uppercase hover-underline transition-colors duration-200 ${
                pathname === href ? 'text-[#C41E1E]' : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={openCart}
            className="relative text-gray-300 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C41E1E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/contact"
            className="ml-2 bg-[#C41E1E] hover:bg-[#E02020] text-white text-sm font-bold tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:shadow-lg hover:shadow-red-900/40"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile: cart + toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative text-gray-300 hover:text-white transition-colors p-1"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C41E1E] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-semibold tracking-widest uppercase py-2 border-b border-white/5 transition-colors ${
                pathname === href ? 'text-[#C41E1E]' : 'text-gray-300'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 bg-[#C41E1E] text-white text-sm font-bold tracking-widest uppercase px-5 py-3 text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
