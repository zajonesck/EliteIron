import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/logo.webp"
                alt="Elite Iron Sports Performance"
                width={90}
                height={90}
                className="object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Where Champions Are Built. Suwanee, Georgia's premier strength and performance training facility.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/eliteironsp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#C41E1E] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://www.instagram.com/eliteironsp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#C41E1E] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/coaching', label: 'Coaching & Services' },
                { href: '/store', label: 'Store' },
                { href: '/contact', label: 'Contact' },
                { href: '/waiver', label: 'Sign Waiver' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-500 hover:text-[#C41E1E] text-sm transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                'Small Group Training',
                'Powerlifting Coaching',
                'Olympic Weightlifting',
                'Sports Strength Training',
                'Remote Programming',
                '24/7 Gym Access',
              ].map((s) => (
                <li key={s} className="text-gray-500 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">Find Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#C41E1E] mt-0.5 shrink-0" />
                <div className="text-gray-500 text-sm leading-relaxed">
                  4140 Moore Rd, B-116<br />Suwanee, GA
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#C41E1E] shrink-0" />
                <a href="tel:7707145957" className="text-gray-500 hover:text-white text-sm transition-colors">
                  (770) 714-5957
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#C41E1E] shrink-0" />
                <a href="mailto:eliteironsp@gmail.com" className="text-gray-500 hover:text-white text-sm transition-colors">
                  eliteironsp@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 border border-white/5 bg-white/2">
              <div className="text-[#C41E1E] text-xs font-bold tracking-wider uppercase mb-1">Hours</div>
              <div className="text-gray-400 text-sm">24/7 Keypad Access</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Elite Iron Sports Performance. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Coach James Townsend · Powerlifting America Head Team Equipped Coach
          </p>
        </div>
      </div>
    </footer>
  );
}
