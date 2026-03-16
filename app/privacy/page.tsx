import Link from 'next/link';

const LAST_UPDATED = 'March 15, 2026';

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/5 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-4">Legal</p>
          <h1 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12 text-gray-400 text-sm leading-relaxed">

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">Overview</h2>
            <p>
              Elite Iron Sports Performance ("Elite Iron", "we", "us", or "our") is committed to protecting your privacy.
              This policy explains what information we collect when you use our website at{' '}
              <span className="text-white">elite-iron.vercel.app</span>, how we use it, and your rights regarding that information.
            </p>
          </div>

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">Information We Collect</h2>
            <p className="mb-4">We collect information you voluntarily provide when using our contact form or signing a liability waiver. This may include:</p>
            <ul className="space-y-2 pl-4">
              {[
                'First and last name',
                'Email address',
                'Phone number',
                'Date of birth (waiver only)',
                'Physical address (waiver only)',
                'Message content and training interests',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#C41E1E] rounded-full mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">We do not use cookies, analytics tracking, or any third-party tracking scripts on this website.</p>
          </div>

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">How We Use Your Information</h2>
            <p className="mb-4">Information collected is used solely to:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Respond to your inquiry about training, coaching, or membership',
                'Maintain a record of signed liability waivers as required for participation',
                'Send you information about Elite Iron services if you opt in',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#C41E1E] rounded-full mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">Data Sharing</h2>
            <p>
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
              Your data is only accessible to Elite Iron staff directly involved in responding to your inquiry or managing training records.
            </p>
          </div>

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">Data Retention</h2>
            <p>
              Contact form submissions are retained for as long as necessary to respond to your inquiry.
              Signed liability waivers are retained for the duration of your participation with Elite Iron and for a
              reasonable period thereafter as required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Request a copy of the personal information we hold about you',
                'Request correction of inaccurate information',
                'Request deletion of your information, where no legal obligation to retain it exists',
                'Opt out of any communications at any time',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#C41E1E] rounded-full mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-wide mb-4">Contact Us</h2>
            <p className="mb-4">
              For any questions about this privacy policy or to exercise your rights, contact us directly:
            </p>
            <div className="border border-white/10 p-6 space-y-2">
              <p className="text-white font-bold">Elite Iron Sports Performance</p>
              <p>4140 Moore Rd, B-116, Suwanee, GA 30024</p>
              <p>
                <a href="mailto:eliteironsp@gmail.com" className="text-[#C41E1E] hover:text-white transition-colors">
                  eliteironsp@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:7707145957" className="hover:text-white transition-colors">
                  (770) 714-5957
                </a>
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <Link
              href="/"
              className="text-[#C41E1E] hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
