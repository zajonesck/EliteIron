import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liability Waiver | Elite Iron Sports Performance',
  description: 'Complete the Elite Iron Sports Performance liability waiver and release before your first training session.',
  robots: { index: false, follow: false },
};

export default function WaiverLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
