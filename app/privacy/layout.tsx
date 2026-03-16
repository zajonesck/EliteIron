import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Elite Iron Sports Performance',
  description: 'Privacy policy for Elite Iron Sports Performance — how we collect, use, and protect your information.',
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
