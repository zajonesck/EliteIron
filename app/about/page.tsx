import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Award } from 'lucide-react';

const certifications = [
  'NSCA Certified Strength & Conditioning Specialist',
  'IPF Senior International Level II Coaching Certification',
  'USA Weightlifting Club Coach',
  'ISSA Certified Personal Trainer',
  '2017 Billy Jack Talton "Coach of the Year"',
];

const career = [
  { years: '2008–2009', role: 'Assistant Football S&C Coach', org: 'University of Virginia' },
  { years: '2009–2011', role: 'Assistant Football S&C Coach', org: 'Mississippi State University' },
  { years: '2011', role: 'Head Football S&C Coach', org: 'Marshall University' },
  { years: '2012–2018', role: 'Co-Owner', org: 'GATA Running & GATA Combine Training' },
  { years: '2012–2018', role: 'Owner', org: 'GATA Barbell Club' },
  { years: '2016–2022', role: 'Head Coach — National Open Team', org: 'USAPL' },
  { years: '2017, 2022, 2025', role: 'Head Coach — Team USA', org: 'World Games (IWGA) Powerlifting' },
  { years: '2018–Present', role: 'Owner & Head Coach', org: 'Elite Iron Sports Performance' },
  { years: '2022–Present', role: 'Head Coach — National Open Team', org: 'Powerlifting America' },
  { years: '2025–Present', role: 'Coaching Commission Chairman', org: 'Powerlifting America' },
];

const testimonials = [
  {
    name: 'Charles Okpoko',
    title: 'IPF World Medalist',
    photo: '/images/testimonials/charles-okpoko.webp',
    quote: "I have had the pleasure of working with James since I first made the USA open national equipped team back in 2016. I placed second at the 2016 IPF World Championship, third at the 2017 IWGA Powerlifting Championship, and first at 2018 Classic World Championship with James's programming and coaching, as well as set various American and World records. He goes above and beyond for his clients, and I can't wait to see what else the future holds.",
  },
  {
    name: 'Zack Jones',
    title: '2022 NAPF Champion',
    photo: '/images/testimonials/zack-jones.jpg',
    quote: "I started working with James in 2016 and have not looked back since. Over the years I have won numerous local meets, transitioned into equipped powerlifting through Powerlifting America, and ultimately won the 2022 NAPF Championships. None of that happens without James. What stands out most is how invested he is in his athletes long term. He is not just writing programs, he is paying attention, adjusting, and pushing you toward goals you did not think were realistic yet. The longevity of our athlete-coach relationship speaks for itself, and I am still making progress. If you are serious about the sport and want a coach who will match that seriousness, James is the one.",
  },
  {
    name: 'Natalie Hansen',
    title: 'Elite Powerlifter',
    photo: '/images/testimonials/natalie-hansen.webp',
    quote: "James Townsend is the best coach I have worked with for a handful of reasons. The support and genuine investment he has in every one of his athletes is incredible. With a schedule that sometimes is quite busy, James is accommodating, flexible, and attentive. He takes the time to view every training video and provide thorough technical feedback which has drastically improved my lifting and technique over the last 3 years. Because of his attention to detail, I have become a much more consistent lifter, which is better for both the athlete and coach. I can't recommend James enough for power lifters who are truly willing to work hard and want to get to the next level.",
  },
  {
    name: 'Allegra Hudson',
    title: 'National & World Title Holder',
    photo: '/images/testimonials/allegra-hudson.webp',
    quote: "I started working with James after 2016 Open Nationals when I made the Open National Team. Since working with James I have attained national and world titles, various American records in both raw/equipped, and made national teams in both raw/equipped divisions. One of the accomplishments under James I am proud of is the development of strength I have gained in the bench press. I went from being someone who never even came close to medaling in the event — to earning a bronze in bench press at 2016 IPF Jr. Worlds (equipped) and 2018 IPF Classic Worlds (raw).",
  },
  {
    name: 'Becci Holcomb',
    title: 'USAPL National & World Champion',
    photo: '/images/testimonials/becci-holcomb.webp',
    quote: "I started working with James to prep for the 2017 Open Nationals. That year I won the 2017 USAPL Open Nationals, I was a 2017 USAPL National team member, and a world champion deadlift at the 2017 IPF Open Worlds. I have also broken and set deadlift American Records and won the Bodybuilding.com Pro Deadlift challenge. I am most proud of my deadlift and bench press improvements since I started training with James. Each week I am hitting new weights I only imagined I would be lifting.",
  },
  {
    name: 'Dale McLaren',
    title: 'Long-Term Athlete',
    photo: '/images/testimonials/dale-mclaren.webp',
    quote: "I've been training with James since 2013. I've had goals that I wanted to achieve for many years, but they kept eluding me. James' aggressive and smart style of programming and coaching has helped me achieve many of my goals and we keep pushing for more. Powerlifting is always a work in progress and I just keep making progress with James.",
  },
  {
    name: 'TraShon Hightower',
    title: 'Elite Athlete',
    photo: '/images/testimonials/trashon-hightower.webp',
    quote: "In training I thought I had hit my biggest plateau, but working with James within the last year has shown me there's always room for improvement. I can't wait to see what the future holds with Elite Iron.",
  },
  {
    name: 'Gabby Felps',
    title: 'Competitive Powerlifter',
    photo: '/images/testimonials/gabby-felps.webp',
    quote: "I started training with James in October of 2017 after I competed in my second meet at the USA Powerlifting Raw Nationals. His programming helped me place 10th overall at the Arnold with a 20 point jump in Wilks, 44 pound total increase, and personal records in all three lifts. His programming is sound, and the best that you can get.",
  },
  {
    name: 'Jordan Kummer',
    title: 'Post-Surgery Athlete',
    photo: '/images/testimonials/jordan-kummer.webp',
    quote: "James adapted training to account for spinal fusion surgery, something many trainers would avoid. He's aggressive in terms of training, but cares about his lifters' health.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Page Hero */}
      <section className="relative bg-black pt-32 pb-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0">
          <Image src="/images/team-group.jpg" alt="Elite Iron team" fill className="object-cover object-top opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C41E1E]/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="text-white font-black text-5xl md:text-7xl uppercase leading-tight max-w-3xl">
            Where<br />
            <span className="text-[#C41E1E]">Champions</span><br />
            Are Built.
          </h1>
          <div className="w-16 h-1 bg-[#C41E1E] mt-6" />
        </div>
      </section>

      {/* About Us */}
      <section className="bg-ei-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-white font-black text-3xl uppercase mb-6 red-line">About Us</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  At Elite Iron Sports Performance, we believe strength isn&apos;t reserved for competitors — it&apos;s for
                  anyone willing to show up and put in the work. Whether you&apos;re chasing a PR, building confidence,
                  getting back into fitness, or preparing for a sport, we&apos;re here to support individuals from every
                  background, every level, and every goal.
                </p>
                <p>
                  Elite Iron is a community of lifters, athletes, parents, teens, and everyday people committed to
                  becoming stronger — physically and mentally — through discipline, consistency, and connection.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-white font-black text-3xl uppercase mb-6 red-line">Our Goal</h2>
              <p className="text-gray-400 leading-relaxed mb-6">Elite Iron aims to be your training home — whether you are:</p>
              <ul className="space-y-3">
                {[
                  'A competitive powerlifter or weightlifter',
                  'A young athlete developing strength',
                  'An adult starting (or restarting) your fitness journey',
                  'Someone wanting to feel healthier, stronger, and more confident',
                  'An athlete following your own programming',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-[#C41E1E] mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-6 italic border-l-2 border-[#C41E1E] pl-4">
                We welcome all paths. With 24/7 keypad access, your training fits your life — not the other way around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storefront divider */}
      <section className="relative h-56 overflow-hidden">
        <Image src="/images/storefront.jpg" alt="Elite Iron Sports Performance — 4140 Moore Rd B116, Suwanee GA" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <p className="text-white font-black text-2xl uppercase tracking-widest">4140 Moore Rd, B-116</p>
          <p className="text-[#C41E1E] text-sm font-bold tracking-[0.3em] uppercase mt-1">Suwanee, Georgia</p>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Methodology</p>
              <h2 className="text-white font-black text-3xl md:text-4xl uppercase leading-tight red-line">
                Our Training<br />Philosophy
              </h2>
            </div>
            <div className="lg:col-span-3">
              <p className="text-gray-400 leading-relaxed mb-8">
                Our in-house programming, developed by James Townsend, follows a{' '}
                <span className="text-white font-semibold">high-volume, high-frequency, undulating periodization</span>{' '}
                approach proven to build strong, durable athletes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Smart Progression', desc: 'Structured, deliberate increases that keep you moving forward without burning out.' },
                  { label: 'Technique & Safety', desc: 'Every rep is coached with proper mechanics to protect your longevity in the sport.' },
                  { label: 'Long-Term Development', desc: 'Programs built for the next 10 years, not just the next 10 weeks.' },
                  { label: 'Confidence & Empowerment', desc: 'We build athletes who trust themselves under the bar and in life.' },
                  { label: 'Support for ALL Levels', desc: 'From your first barbell to the world stage — you belong here.' },
                ].map(({ label, desc }) => (
                  <div key={label} className="border border-white/8 p-5 bg-zinc-950">
                    <div className="text-white font-bold text-sm uppercase tracking-wide mb-2">{label}</div>
                    <div className="text-gray-500 text-sm leading-relaxed">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-ei-navy py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">The Facility</p>
            <h2 className="text-white font-black text-4xl uppercase">Competition-Grade Equipment</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              To support athletes of every level, our facility is equipped like a true competition training room.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
            {[
              'Eleiko Bars & Plates',
              'Ivanko Competition Plates',
              "Youth & Women's Barbells",
              'Bumper & Fractional Plates',
              'Competition Platforms, Racks & Benches',
              'Deadlift Jacks, Knee-Wrap Rollers, Chalk',
            ].map((item) => (
              <div key={item} className="bg-ei-navy p-6 text-center group hover:bg-black transition-colors">
                <div className="w-8 h-0.5 bg-[#C41E1E] mx-auto mb-4 group-hover:w-12 transition-all duration-300" />
                <div className="text-gray-300 text-sm font-medium leading-snug">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* James Bio */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Owner / Head Coach</p>
              <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-2 red-line">
                James Townsend
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed mt-8">
                <p>
                  James brings over 20 years of coaching experience rooted in strength and conditioning,
                  speed and agility, youth athletic development, and long-term athlete performance. After
                  college, he advanced into collegiate football strength and conditioning, taking on roles
                  at the University of Virginia, Mississippi State, and Marshall University.
                </p>
                <p>
                  Since transitioning to the private sector, James has trained athletes and adults across
                  a wide range of ages and competitive levels. His coaching style blends proven training
                  methods with a practical, supportive approach that helps clients build confidence, stay
                  consistent, and train with purpose.
                </p>
                <p>
                  Along the way, he established himself internationally as Head Coach of the USA
                  Powerlifting National Teams. His hard work and tenacity earned him recognition as{' '}
                  <span className="text-white font-semibold">Coach of the Year in 2017</span>, and in 2018,
                  he founded Elite Iron Sports Performance. He has served as Head Coach for Team USA at the{' '}
                  <span className="text-white font-semibold">World Games in 2017, 2022, and 2025</span>.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-4">Certifications &amp; Awards</h3>
                <ul className="space-y-2.5">
                  {certifications.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <Award size={14} className="text-[#C41E1E] mt-0.5 shrink-0" />
                      <span className="text-gray-300 text-sm">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {/* Headshot */}
              <div className="relative overflow-hidden border border-white/10">
                <div className="relative aspect-[4/5]">
                  <Image src="/images/james-headshot.webp" alt="James Townsend — Head Coach, Elite Iron Sports Performance" fill className="object-cover object-top" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-xs font-bold tracking-widest uppercase">James Townsend</p>
                    <p className="text-[#C41E1E] text-[10px] tracking-wide uppercase mt-0.5">Owner / Head Coach</p>
                  </div>
                </div>
              </div>

              {/* Career Timeline */}
              <div className="border border-white/10 bg-zinc-950 p-6">
                <h3 className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-5">Career Timeline</h3>
                <div className="relative">
                  <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/10" />
                  <div className="space-y-4">
                    {career.map(({ years, role, org }) => (
                      <div key={`${years}-${org}`} className="flex gap-4 items-start group">
                        <div className="text-[#C41E1E] text-[10px] font-mono font-bold w-20 shrink-0 pt-1 text-right leading-tight">{years}</div>
                        <div className="relative pl-5">
                          <div className="absolute left-0 top-1.5 w-2 h-2 bg-[#C41E1E] rounded-full group-hover:scale-125 transition-transform" />
                          <div className="text-white text-xs font-semibold leading-tight">{role}</div>
                          <div className="text-gray-500 text-[10px] mt-0.5">{org}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drew Cargill */}
      <section className="bg-ei-navy py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden border border-white/10 max-w-sm">
              <div className="relative aspect-[4/5]">
                <Image src="/images/drew-cargill.webp" alt="Drew Cargill — Assistant Coach, Elite Iron Sports Performance" fill className="object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-xs font-bold tracking-widest uppercase">Drew Cargill</p>
                  <p className="text-[#C41E1E] text-[10px] tracking-wide uppercase mt-0.5">Assistant Coach</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Assistant Coach</p>
              <h2 className="text-white font-black text-4xl md:text-5xl uppercase leading-tight mb-2 red-line">
                Drew Cargill
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed mt-8">
                <p>
                  Drew Cargill brings a competitive athlete&apos;s mindset and a coach&apos;s eye for detail to Elite Iron.
                  As Assistant Coach, Drew works directly with athletes across all disciplines — helping execute
                  programming, provide real-time technique feedback, and support the day-to-day operations
                  of the facility.
                </p>
                <p>
                  Whether on the competition floor or in the training room, Drew&apos;s presence and energy
                  make him an essential part of the Elite Iron coaching staff. He is committed to the
                  same standard of excellence that defines every athlete and coach at this gym.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-black py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-3">Athlete Testimonials</p>
            <h2 className="text-white font-black text-4xl md:text-5xl uppercase red-line">
              Words From<br />The Platform
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {testimonials.map(({ name, title, photo, quote }) => (
              <div key={name} className="bg-zinc-950 flex flex-col sm:flex-row hover:bg-zinc-900 transition-colors duration-200 group">
                {/* Photo panel */}
                <div className="relative h-56 sm:h-auto sm:w-48 shrink-0 overflow-hidden">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C41E1E]/20 flex items-center justify-center">
                      <span className="text-[#C41E1E] text-2xl font-black">{name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent to-zinc-950 group-hover:to-zinc-900 transition-colors duration-200" />
                </div>
                {/* Content */}
                <div className="flex flex-col justify-between p-6 flex-1 min-w-0">
                  <p className="text-gray-400 text-sm leading-relaxed italic mb-5">&ldquo;{quote}&rdquo;</p>
                  <div>
                    <div className="w-6 h-0.5 bg-[#C41E1E] mb-3" />
                    <div className="text-white font-bold text-sm">{name}</div>
                    <div className="text-[#C41E1E] text-xs tracking-wide mt-0.5">{title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C41E1E] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white font-black text-3xl md:text-4xl uppercase mb-4">Train With the Best</h2>
          <p className="text-white/80 mb-8">Contact James today to discuss your goals and find the right program for you.</p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-black hover:bg-zinc-900 text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors"
          >
            Get in Touch
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
