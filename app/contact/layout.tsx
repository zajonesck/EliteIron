import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Elite Iron Sports Performance',
  description: 'Get in touch with Elite Iron Sports Performance in Suwanee, GA. Ask about coaching, memberships, or drop-in sessions.',
  openGraph: {
    title: 'Contact Elite Iron Sports Performance',
    description: 'Reach out about training, coaching, or membership at Elite Iron in Suwanee, GA.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
