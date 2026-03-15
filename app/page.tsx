import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Users, Clock, Dumbbell, Target, Star } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Small Group Training',
    desc: 'High-energy group sessions with expert coaching. Build strength alongside a community that pushes you.',
  },
  {
    icon: Dumbbell,
    title: 'Powerlifting Coaching',
    desc: "World-class equipped and raw powerlifting coaching from Powerlifting America's Head Team Equipped Coach.",
  },
  {
    icon: Target,
    title: 'Sports Strength Training',
    desc: 'Periodized performance programs for athletes at every level — from youth development to collegiate.',
  },
  {
    icon: Clock,
    title: 'Remote Programming',
    desc: 'Structured, individualized programming built around your schedule, goals, and competition calendar.',
  },
];

const stats = [
  { value: '20+', label: 'Years Coaching' },
  { value: '3x', label: 'World Games Head Coach' },
  { value: '2017', label: 'Coach of the Year' },
  { value: '24/7', label: 'Gym Access' },
];

const testimonialHighlights = [
  {
    quote: "I placed second at the 2016 IPF World Championship, third at the 2017 IWGA Powerlifting Championship, and first at 2018 Classic World Championship with James's programming and coaching.",
    name: 'Charles Okpoko',
    title: 'IPF World Medalist',
  },
  {
    quote: "I started working with James in 2016 and have not looked back since. I won the 2022 NAPF Championships. None of that happens without James. What stands out most is how invested he is in his athletes long term.",
    name: 'Zack Jones',
    title: '2022 NAPF Champion',
  },
  {
    quote: 'I won the 2017 USAPL Open Nationals, was a National team member, and became a world champion deadlifter at the 2017 IPF Open Worlds.',
    name: 'Becci Holcomb',
    title: 'USAPL National & World Champion',
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/gym-interior.jpg"
            alt="Elite Iron gym interior"
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C41E1E]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 border border-[#C41E1E]/40 bg-[#C41E1E]/10 text-[#C41E1E] text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 mb-10">
            <span className="w-1.5 h-1.5 bg-[#C41E1E] rounded-full animate-pulse" />
            Suwanee, Georgia
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[108px] font-black uppercase leading-[0.9] tracking-tight text-white mb-6">
            Where
            <br />
            <span className="text-[#C41E1E]">Champions</span>
            <br />
            Are Built
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Elite Iron Sports Performance — Suwanee&apos;s premier strength and powerlifting facility.
            Coached by James Townsend, Powerlifting America&apos;s Head Team Equipped Coach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/coaching" className="group inline-flex items-center justify-center gap-3 bg-[#C41E1E] hover:bg-[#E02020] text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-all duration-200 hover:shadow-2xl hover:shadow-red-900/40">
              Explore Coaching
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-all duration-200 hover:bg-white/5">
              Get Started
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white">Scroll</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#C41E1E]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/20">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center md:px-8 py-2">
                <div className="text-white font-black text-4xl md:text-5xl leading-none">{value}</div>
                <div className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-ei-navy py-20 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#C41E1E] text-5xl font-black leading-none mb-6 opacity-30">&ldquo;</div>
          <blockquote className="text-white text-2xl md:text-3xl font-light italic leading-relaxed mb-6">
            The key is not the will to win. Everybody has that.{' '}
            <span className="text-[#C41E1E] not-italic font-semibold">It is the will to prepare to win</span>{' '}
            that is important.
          </blockquote>
          <cite className="text-gray-500 text-sm font-semibold tracking-widest uppercase not-italic">
            &mdash; Bobby Knight
          </cite>
        </div>
      </section>

      {/* Services */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">What We Offer</p>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase red-line">
              Training Built<br />For Every Goal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-black p-8 group hover:bg-zinc-950 transition-colors duration-300">
                <div className="w-12 h-12 bg-[#C41E1E]/10 border border-[#C41E1E]/20 flex items-center justify-center mb-6 group-hover:bg-[#C41E1E]/20 transition-colors">
                  <Icon size={22} className="text-[#C41E1E]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-wide">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/coaching" className="group inline-flex items-center gap-2 text-[#C41E1E] text-sm font-bold tracking-[0.15em] uppercase hover:gap-4 transition-all duration-200">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-ei-navy py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Head Coach</p>
              <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-6 red-line">
                James<br />Townsend
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                With over 20 years of coaching experience spanning collegiate football strength &amp; conditioning at
                UVA, Mississippi State, and Marshall University — to leading the USA and Powerlifting America
                National Teams — James brings world-class expertise to every athlete he coaches.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Named Coach of the Year in 2017 and three-time Head Coach for Team USA at the World Games,
                James founded Elite Iron in 2018 to bring elite-level coaching to athletes at every stage of their journey.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'NSCA Certified Strength & Conditioning Specialist',
                  'IPF Senior International Level II Coach',
                  'Powerlifting America Coaching Commission Chairman',
                  'World Games Head Coach: 2017, 2022, 2025',
                ].map((cert) => (
                  <li key={cert} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-[#C41E1E] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="group inline-flex items-center gap-2 border border-white/20 hover:border-[#C41E1E] text-white font-bold text-sm tracking-[0.15em] uppercase px-6 py-3 transition-all duration-200 hover:bg-[#C41E1E]/10">
                Full Bio &amp; Career
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Photo collage */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/james-worlds-medal.jpg"
                  alt="James Townsend at IPF World Championships"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/james-hug.jpg"
                    alt="James celebrating with athlete"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/storefront.jpg"
                    alt="Elite Iron Sports Performance storefront"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deadlift divider */}
      <section className="relative h-64 overflow-hidden">
        <Image src="/images/deadlift-grip.jpg" alt="Deadlift grip" fill className="object-cover object-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <p className="text-white font-black text-3xl md:text-5xl uppercase tracking-widest text-center px-6">
            Earn Your Edge
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center">
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Results Speak</p>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase">What Athletes Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {testimonialHighlights.map(({ quote, name, title }) => (
              <div key={name} className="bg-black p-8 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-[#C41E1E] fill-[#C41E1E]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic flex-1 mb-6">&ldquo;{quote}&rdquo;</p>
                <div>
                  <div className="text-white font-bold text-sm">{name}</div>
                  <div className="text-[#C41E1E] text-xs tracking-wide mt-0.5">{title}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/about#testimonials" className="group inline-flex items-center gap-2 text-[#C41E1E] text-sm font-bold tracking-[0.15em] uppercase hover:gap-4 transition-all duration-200">
              Read All Testimonials <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Team photo */}
      <section className="relative h-80 overflow-hidden">
        <Image src="/images/team-group.jpg" alt="Elite Iron team" fill className="object-cover object-top opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase">The Elite Iron Community</p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#C41E1E] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`, backgroundSize: '20px 20px' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white font-black text-4xl md:text-6xl uppercase leading-tight mb-6">
            Ready to Start<br />Your Journey?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Whether you&apos;re stepping on a platform for the first time or chasing a world record — there&apos;s a place for you at Elite Iron.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-black hover:bg-zinc-900 text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors duration-200">
              Contact James
            </Link>
            <Link href="/coaching" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-white hover:text-[#C41E1E] transition-all duration-200">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
