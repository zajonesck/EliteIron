'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    heardAbout: '',
    message: '',
  });
  const [services, setServices] = useState<string[]>([]);

  const SERVICE_OPTIONS = [
    'Gym Membership',
    'Day Pass',
    'Small Group Training',
    'Remote Coaching & Programming',
    'Powerlifting Meet Prep',
    'Youth Athlete Development',
  ];

  const handleServiceToggle = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, services }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-4">Reach Out</p>
          <h1 className="text-white font-black text-5xl md:text-7xl uppercase leading-tight">
            Let&apos;s Talk<br />
            <span className="text-[#C41E1E]">Strength</span>
          </h1>
          <div className="w-16 h-1 bg-[#C41E1E] mt-6" />
          <p className="text-gray-500 mt-6 max-w-xl text-lg">
            Thank you for your interest in Elite Iron Sports Performance! Fill out the form below and we&apos;ll get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="bg-zinc-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-white font-black text-2xl uppercase mb-8 red-line">Contact Info</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C41E1E]/10 border border-[#C41E1E]/20 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#C41E1E]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">Location</div>
                    <div className="text-gray-400 text-sm leading-relaxed">
                      4140 Moore Rd, B-116<br />Suwanee, GA
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C41E1E]/10 border border-[#C41E1E]/20 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#C41E1E]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">Phone</div>
                    <a href="tel:7707145957" className="text-gray-400 hover:text-white text-sm transition-colors">
                      (770) 714-5957
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C41E1E]/10 border border-[#C41E1E]/20 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#C41E1E]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">Email</div>
                    <a href="mailto:eliteironsp@gmail.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                      eliteironsp@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C41E1E]/10 border border-[#C41E1E]/20 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#C41E1E]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">Gym Access</div>
                    <div className="text-gray-400 text-sm">24/7 Keypad Access</div>
                    <div className="text-gray-600 text-xs mt-0.5">Train on your schedule</div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10">
                <div className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-4">Follow Us</div>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/eliteironsp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/10 hover:border-[#C41E1E] bg-black hover:bg-[#C41E1E]/10 text-gray-400 hover:text-white px-4 py-2.5 text-sm font-medium transition-all duration-200"
                  >
                    <Facebook size={14} />
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/eliteironsp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/10 hover:border-[#C41E1E] bg-black hover:bg-[#C41E1E]/10 text-gray-400 hover:text-white px-4 py-2.5 text-sm font-medium transition-all duration-200"
                  >
                    <Instagram size={14} />
                    Instagram
                  </a>
                </div>
              </div>

              {/* What to ask about */}
              <div className="mt-10 border border-white/8 bg-black p-6">
                <div className="text-[#C41E1E] text-xs font-bold tracking-[0.2em] uppercase mb-4">Ask Us About</div>
                <ul className="space-y-2">
                  {[
                    'Gym memberships & day passes',
                    'Small group training sessions',
                    'Remote coaching & programming',
                    'Powerlifting meet preparation',
                    'Youth athlete development',
                    'Waiver & onboarding',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-500 text-sm">
                      <div className="w-1 h-1 bg-[#C41E1E] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="border border-[#C41E1E]/30 bg-[#C41E1E]/10 p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-[#C41E1E] flex items-center justify-center mx-auto mb-6">
                    <ArrowRight size={28} className="text-white" />
                  </div>
                  <h3 className="text-white font-black text-2xl uppercase mb-3">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm">
                    Thanks for reaching out. James will be in touch with you shortly to discuss your goals.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-2">
                        First Name <span className="text-[#C41E1E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 focus:border-[#C41E1E] text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors"
                        placeholder="First"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-2">
                        Last Name <span className="text-[#C41E1E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-black border border-white/10 focus:border-[#C41E1E] text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors"
                        placeholder="Last"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-2">
                      Email Address <span className="text-[#C41E1E]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 focus:border-[#C41E1E] text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-2">
                      Phone <span className="text-[#C41E1E]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 focus:border-[#C41E1E] text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors"
                      placeholder="(000) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-3">
                      Services Interested In
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((service) => (
                        <label
                          key={service}
                          className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors text-sm ${
                            services.includes(service)
                              ? 'border-[#C41E1E] bg-[#C41E1E]/10 text-white'
                              : 'border-white/10 bg-black text-gray-400 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-colors ${
                            services.includes(service) ? 'border-[#C41E1E] bg-[#C41E1E]' : 'border-white/20'
                          }`}>
                            {services.includes(service) && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={services.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-2">
                      How Did You Hear About Us?
                    </label>
                    <select
                      name="heardAbout"
                      value={form.heardAbout}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 focus:border-[#C41E1E] text-gray-400 px-4 py-3 text-sm outline-none transition-colors appearance-none"
                    >
                      <option value="">Select an option</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="google">Google Search</option>
                      <option value="referral">Friend / Referral</option>
                      <option value="powerlifting-meet">Powerlifting Meet</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold tracking-[0.15em] uppercase mb-2">
                      Message <span className="text-[#C41E1E]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/10 focus:border-[#C41E1E] text-white placeholder-gray-600 px-4 py-3 text-sm outline-none transition-colors resize-none"
                      placeholder="Ask us about gym memberships, programming, fitness training, etc."
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#C41E1E] hover:bg-[#E02020] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm tracking-[0.2em] uppercase py-4 transition-all duration-200 hover:shadow-xl hover:shadow-red-900/40 flex items-center justify-center gap-3 group"
                  >
                    {loading ? 'Sending…' : 'Submit'}
                    {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
