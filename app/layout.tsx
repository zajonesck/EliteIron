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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased bg-black text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
