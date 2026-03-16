import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://elite-iron.vercel.app"),
  title: "Elite Iron Sports Performance | Suwanee, GA",
  description:
    "Elite Iron Sports Performance — Suwanee, Georgia's premier strength and powerlifting facility. Coached by James Townsend, Powerlifting America's Head Team Equipped Coach. Where Champions Are Built.",
  keywords: [
    "powerlifting",
    "strength training",
    "sports performance",
    "Suwanee GA",
    "James Townsend",
    "Elite Iron",
    "equipped powerlifting",
    "gym Suwanee",
  ],
  openGraph: {
    title: "Elite Iron Sports Performance | Suwanee, GA",
    description: "Suwanee, Georgia's premier strength and powerlifting facility. Where Champions Are Built.",
    images: [{ url: "https://elite-iron.vercel.app/images/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://elite-iron.vercel.app/images/og-image.webp"],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://elite-iron.vercel.app/#business',
      name: 'Elite Iron Sports Performance',
      description: "Suwanee, Georgia's premier strength and powerlifting facility.",
      url: 'https://elite-iron.vercel.app',
      telephone: '+17709045994',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4140 Moore Rd B116',
        addressLocality: 'Suwanee',
        addressRegion: 'GA',
        postalCode: '30024',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 34.0521,
        longitude: -84.0701,
      },
      sameAs: [
        'https://www.instagram.com/eliteironsp/',
        'https://www.facebook.com/eliteironsp/',
      ],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '06:00', closes: '20:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
      ],
      hasMap: 'https://maps.google.com/?q=4140+Moore+Rd+B116+Suwanee+GA+30024',
    },
    {
      '@type': 'Person',
      '@id': 'https://elite-iron.vercel.app/#james',
      name: 'James Townsend',
      jobTitle: 'Head Coach',
      worksFor: { '@id': 'https://elite-iron.vercel.app/#business' },
      description: "Powerlifting America's Head Team Equipped Coach and founder of Elite Iron Sports Performance.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
