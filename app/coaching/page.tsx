import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Users, Dumbbell, Target, Clock, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Coaching & Services | Elite Iron Sports Performance',
  description: 'Strength training, powerlifting coaching, small group training, and online programming in Suwanee, GA. Expert coaching for all levels.',
  openGraph: {
    title: 'Coaching & Services | Elite Iron Sports Performance',
    description: 'Expert strength and powerlifting coaching in Suwanee, GA. Small group training, S&C programming, and online coaching available.',
  },
};

const services = [
  {
    icon: Users,
    title: 'Small Group Training',
    desc: 'Train alongside a tight-knit group with direct coaching and programming tailored to the group\'s goals. Build strength, community, and accountability.',
    features: ['Coach-led sessions', 'Structured programming', 'All fitness levels welcome', 'Community atmosphere'],
  },
  {
    icon: Zap,
    title: 'Strength & Conditioning',
    desc: 'Comprehensive S&C programming covering all fitness levels. Whether you\'re new to lifting or an experienced athlete, we build your foundation the right way.',
    features: ['All fitness levels', 'Foundational movement', 'Progressive overload', 'Injury-conscious approach'],
  },
  {
    icon: Target,
    title: 'Sports Strength Training',
    desc: 'Periodized athletic development programs for youth and competitive athletes. Built to improve on-field and on-platform performance.',
    features: ['Youth athlete development', 'In-season & off-season', 'Sport-specific programming', 'Speed & agility integration'],
  },
  {
    icon: Dumbbell,
    title: 'Powerlifting Coaching',
    desc: 'World-class equipped and raw powerlifting coaching from Powerlifting America\'s Head Team Equipped Coach. Meet prep, technique, and long-term development.',
    features: ['Equipped & raw coaching', 'Meet preparation', 'Technique analysis', 'World-level programming'],
  },
  {
    icon: Globe,
    title: 'Remote Programming',
    desc: 'Can\'t make it in-person? Get fully customized programming delivered digitally with video feedback, weekly check-ins, and ongoing support.',
    features: ['Custom programming', 'Video review & feedback', 'Weekly check-ins', 'Flexible scheduling'],
  },
  {
    icon: Clock,
    title: '24/7 Gym Access',
    desc: 'Members get 24/7 keypad access to the facility. Train on your schedule — whether that\'s 5 AM or 11 PM. Your goals don\'t keep office hours.',
    features: ['Keypad access', 'No staffed hours required', 'Competition equipment available', 'Chalk & accessories provided'],
  },
];

const equipment = [
  { name: 'Eleiko Bars & Plates', desc: 'Competition-standard Swedish steel' },
  { name: 'Ivanko Competition Plates', desc: 'Precision-calibrated iron' },
  { name: 'Youth & Women\'s Barbells', desc: 'Shorter, lighter training bars' },
  { name: 'Bumper Plates', desc: 'Olympic lifting and drop-friendly' },
  { name: 'Fractional Plates', desc: 'Micro-loading for precise progression' },
  { name: 'Competition Platforms', desc: 'Dedicated lifting platforms' },
  { name: 'Competition Racks & Benches', desc: 'Meet-standard equipment' },
  { name: 'Deadlift Jacks', desc: 'For loading & unloading plates' },
  { name: 'Knee-Wrap Rollers', desc: 'For equipped lifting preparation' },
  { name: 'Chalk & Baby Powder', desc: 'Competition essentials, always available' },
];

export default function CoachingPage() {
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
        <div className="absolute inset-0">
          <Image src="/images/deadlift-grip.jpg" alt="Deadlift" fill className="object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#C41E1E]/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-4">What We Offer</p>
          <h1 className="text-white font-black text-5xl md:text-7xl uppercase leading-tight max-w-3xl">
            Coaching &amp;<br />
            <span className="text-[#C41E1E]">Services</span>
          </h1>
          <div className="w-16 h-1 bg-[#C41E1E] mt-6" />
          <p className="text-gray-500 mt-6 max-w-xl text-lg">
            Programs built for every goal — from first-time lifters to national-level competitors.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-ei-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {services.map(({ icon: Icon, title, desc, features }) => (
              <div key={title} className="bg-ei-navy p-8 group hover:bg-black transition-colors duration-300 flex flex-col">
                <div className="w-12 h-12 bg-[#C41E1E]/10 border border-[#C41E1E]/20 flex items-center justify-center mb-5 group-hover:bg-[#C41E1E]/20 transition-colors">
                  <Icon size={22} className="text-[#C41E1E]" />
                </div>
                <h2 className="text-white font-black text-xl uppercase tracking-wide mb-3">{title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{desc}</p>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <CheckCircle size={12} className="text-[#C41E1E] shrink-0" />
                      <span className="text-gray-400 text-xs">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-black py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Approach</p>
              <h2 className="text-white font-black text-4xl uppercase leading-tight mb-6 red-line">
                The Elite Iron<br />Method
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Our in-house programming, developed by James Townsend, follows a{' '}
                  <span className="text-white font-semibold">high-volume, high-frequency,
                  undulating periodization</span> approach proven to build strong, durable athletes
                  across every discipline.
                </p>
                <p>
                  But more importantly, our philosophy centers on the human being in front of the
                  barbell — not just the numbers on it. We build confidence, consistency, and
                  long-term results.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { num: '01', label: 'Assess', desc: 'We evaluate your movement, history, and goals before writing a single rep.' },
                { num: '02', label: 'Program', desc: 'Custom periodized programming built around your life and competition schedule.' },
                { num: '03', label: 'Coach', desc: 'Real-time technique feedback, video analysis, and ongoing adjustments.' },
                { num: '04', label: 'Progress', desc: 'Systematic progression that builds strength week over week, year over year.' },
              ].map(({ num, label, desc }) => (
                <div key={num} className="border border-white/8 p-6 bg-zinc-950">
                  <div className="text-[#C41E1E] text-xs font-black tracking-widest mb-3">{num}</div>
                  <div className="text-white font-bold text-lg uppercase mb-2">{label}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-ei-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">The Facility</p>
            <h2 className="text-white font-black text-4xl uppercase red-line">Competition-Grade<br />Equipment</h2>
            <p className="text-gray-500 mt-6 max-w-xl">
              High-quality tools for high-quality effort — no matter your starting point. Our facility is
              stocked like a true competition training room.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5">
            {equipment.map(({ name, desc }) => (
              <div key={name} className="bg-ei-navy p-5 hover:bg-black transition-colors group">
                <div className="w-6 h-0.5 bg-[#C41E1E] mb-3 group-hover:w-10 transition-all duration-300" />
                <div className="text-white text-sm font-bold mb-1">{name}</div>
                <div className="text-gray-600 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Train */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Everyone Is Welcome</p>
          <h2 className="text-white font-black text-4xl md:text-5xl uppercase mb-6">Who We Train</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Strength isn&apos;t reserved for competitors. It&apos;s for anyone willing to show up and do the work.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Competitive Powerlifters', icon: '🏋️' },
              { label: 'Olympic Weightlifters', icon: '🥇' },
              { label: 'Youth Athletes', icon: '⚡' },
              { label: 'Adults Restarting Fitness', icon: '💪' },
              { label: 'Sports Athletes', icon: '🏈' },
              { label: 'Self-Programmed Athletes', icon: '📋' },
            ].map(({ label, icon }) => (
              <div key={label} className="border border-white/8 p-6 bg-zinc-950 hover:border-[#C41E1E]/40 transition-colors">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-gray-300 text-xs font-semibold uppercase tracking-wide leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#C41E1E] py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-4">
            Start Training Today
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Questions about membership, remote coaching, or what program is right for you? Reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors"
            >
              Contact Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:7707145957"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-white hover:text-[#C41E1E] transition-all duration-200"
            >
              (770) 714-5957
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
