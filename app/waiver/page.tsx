'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckSquare, Square, AlertTriangle, CheckCircle } from 'lucide-react';

const CLAUSES = [
  "I hereby acknowledge that the personal training for which I am registering is a strenuous activity which is beyond the capability of some people, and may cause minor, severe and/or permanent injuries or death to those people that are not in sufficient physical fitness, training and/or experience.",
  "I have made my own determination as to whether or not I am able to safely participate in such training. I recognize that James Townsend and Elite Iron have not evaluated my ability to participate in such training.",
  "I also recognize that any advice dispensed through James Townsend or Elite Iron may not be appropriate for me, and it is my responsibility to make this determination.",
  "I acknowledge that personal training is an extreme test of a person's physical and mental limits and carries with it, regardless of physical fitness or experience, the potential for death, serious injury and property loss. I hereby assume the risks of participating in such training.",
  "I certify that my level of physical fitness is appropriate to participate in the personal training which I am voluntarily undertaking.",
  "I certify that I have not been advised against participation in such activity by a qualified health care professional.",
  "I, for myself, my past, present and future agents, attorneys, representatives, successors, assigns, heirs and executors, do hereby waive, release and discharge EI/James Townsend; its past, present and future owners, directors, officers, employees, agents, representatives, contractors, attorneys, any participants in James Townsend/EI personal training other than myself, parents, subsidiaries, predecessors, successors, affiliates, assigns, sponsors, any event for which this training is geared or based, and any organizer, sponsor, speaker, volunteer, city, town, village or other municipality or governmental entity associated with such event (the \"Elite Iron parties\") from any and all liability, claims, causes of action, real or personal, or any other loss associated with or arising from participation therein. This release includes, but is not limited to, any and all loss or liabilities for death, personal injury, partial or permanent disability, property damage, medical or hospital bills, theft or damage of any kind, including economic losses, which may in the future arise out of or relate to my participation in or traveling to and from personal training through Elite Iron/James Townsend.",
  "I AGREE NOT TO SUE Elite Iron/James Townsend for any and all claims made or liabilities assessed against them as discharged herein.",
  "I INDEMNIFY AND HOLD HARMLESS James Townsend/Elite Iron from any and all claims made or liabilities assessed against them as a result of (i) my actions or inactions (ii) the actions, inactions or negligence of others including those parties hereby indemnified (iii) the conditions of the facilities, equipment or areas where the event or activity is being conducted and (iv) any other harm caused by an occurrence related to personal training through Elite Iron.",
];

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming',
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 25 }, (_, i) => String(new Date().getFullYear() - i));
const MINOR_COUNTS = [1,2,3,4,5,6,7,8,9,10];

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

type ParticipantType = 'none' | 'adult' | 'minor';
type Status = 'idle' | 'submitting' | 'success' | 'error';

interface MinorInfo {
  firstName: string; lastName: string; gender: string;
  dobMonth: string; dobDay: string; dobYear: string;
}

const blankMinor = (): MinorInfo => ({
  firstName: '', lastName: '', gender: '',
  dobMonth: '', dobDay: '', dobYear: '',
});

const inputCls = 'w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#C41E1E] transition-colors placeholder:text-gray-600';
const labelCls = 'block text-gray-500 text-xs uppercase tracking-wider mb-1.5';
const sectionHead = 'text-white font-black text-xs uppercase tracking-[0.2em] mb-4 pb-2 border-b border-white/8';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className={labelCls}>{label}</label>{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className={sectionHead}>{children}</h3>;
}

export default function WaiverPage() {
  const [agreed, setAgreed] = useState<boolean[]>(Array(CLAUSES.length).fill(false));
  const [participantType, setParticipantType] = useState<ParticipantType>('none');
  const [status, setStatus] = useState<Status>('idle');

  // Adult
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [sigConsent, setSigConsent] = useState(false);
  const [adult, setAdult] = useState({
    firstName: '', lastName: '',
    address1: '', address2: '', city: '', state: '', zip: '',
    email: '', emailConfirm: '',
    emergencyName: '', emergencyPhone: '',
    signature: '',
  });

  // Minor
  const [minorCount, setMinorCount] = useState(1);
  const [minors, setMinors] = useState<MinorInfo[]>([blankMinor()]);
  const [minorAddress, setMinorAddress] = useState({ address1: '', address2: '', city: '', state: '', zip: '' });
  const [parentEmail, setParentEmail] = useState({ email: '', emailConfirm: '' });
  const [parentEmailUpdates, setParentEmailUpdates] = useState(false);
  const [minorEmergency, setMinorEmergency] = useState({ name: '', phone: '' });
  const [parent, setParent] = useState({ firstName: '', lastName: '', signature: '' });
  const [parentSigConsent, setParentSigConsent] = useState(false);

  const allAgreed = agreed.every(Boolean);
  const adultEmailMatch = adult.email === adult.emailConfirm;
  const parentEmailMatch = parentEmail.email === parentEmail.emailConfirm;

  function toggle(i: number) {
    setAgreed((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function setMinorCount_(n: number) {
    setMinorCount(n);
    setMinors((prev) => {
      const updated = [...prev];
      while (updated.length < n) updated.push(blankMinor());
      return updated.slice(0, n);
    });
  }

  function updateMinor(i: number, field: keyof MinorInfo, value: string) {
    setMinors((prev) => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAgreed || participantType === 'none') return;
    setStatus('submitting');

    const payload = {
      participantType,
      clauses: CLAUSES.map((text, i) => ({ text, agreed: agreed[i] })),
      adult: participantType === 'adult' ? { ...adult, date: today, emailUpdates, ageConfirmed } : null,
      minorData: participantType === 'minor' ? {
        minors, minorAddress, parentEmail: parentEmail.email,
        parentEmailUpdates, minorEmergency, parent: { ...parent, date: today },
      } : null,
    };

    try {
      const res = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setStatus(data.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6 pt-24">
        <div className="max-w-lg w-full text-center">
          <CheckCircle size={56} className="text-[#C41E1E] mx-auto mb-6" />
          <h1 className="text-white font-black text-3xl uppercase mb-4">Waiver Submitted</h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            Your signed liability waiver has been received and sent to Elite Iron Sports Performance. Welcome — you&apos;re all set.
          </p>
          <a href="/" className="inline-flex items-center justify-center bg-[#C41E1E] hover:bg-[#E02020] text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-4 transition-colors">
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  const adultReady = allAgreed && ageConfirmed && sigConsent && adultEmailMatch && adult.signature.trim().length > 0;
  const minorReady = allAgreed && parentSigConsent && parentEmailMatch && parent.signature.trim().length > 0;
  const canSubmit = participantType === 'adult' ? adultReady : participantType === 'minor' ? minorReady : false;

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <Image src="/images/logo.webp" alt="Elite Iron Sports Performance" width={80} height={80} className="object-contain mb-6" />
          <p className="text-[#C41E1E] text-xs font-bold tracking-[0.3em] uppercase mb-2">Legal Document</p>
          <h1 className="text-white font-black text-3xl md:text-4xl uppercase leading-tight">
            Liability Waiver &amp; Release
          </h1>
          <p className="text-gray-500 text-sm mt-2">James Townsend / Elite Iron Sports Performance</p>
          <div className="w-16 h-0.5 bg-[#C41E1E] mt-5" />
        </div>

        <div className="flex gap-3 bg-[#C41E1E]/10 border border-[#C41E1E]/30 p-4 mb-10">
          <AlertTriangle size={18} className="text-[#C41E1E] shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm leading-relaxed">
            Please read each clause carefully and click &ldquo;I Agree&rdquo; for each one.{' '}
            <strong className="text-white">Today&apos;s Date: {today}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Clauses */}
          <div className="space-y-3">
            {CLAUSES.map((clause, i) => (
              <button key={i} type="button" onClick={() => toggle(i)}
                className={`w-full text-left flex gap-4 p-5 border transition-all duration-200 ${
                  agreed[i] ? 'border-[#C41E1E]/50 bg-[#C41E1E]/5' : 'border-white/8 bg-zinc-950 hover:border-white/20'
                }`}>
                <div className="shrink-0 mt-0.5">
                  {agreed[i] ? <CheckSquare size={18} className="text-[#C41E1E]" /> : <Square size={18} className="text-gray-600" />}
                </div>
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">{clause}</p>
                  <p className={`text-xs font-bold mt-2 tracking-wide ${agreed[i] ? 'text-[#C41E1E]' : 'text-gray-600'}`}>
                    {agreed[i] ? 'I AGREE ✓' : 'Click to agree'}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Participant type */}
          <div className={`transition-opacity duration-300 ${allAgreed ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <h2 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-2">Who is participating?</h2>
            <p className="text-gray-500 text-xs mb-4">This agreement is just for YOU — one submission per participant.</p>
            <div className="flex gap-4">
              {(['adult', 'minor'] as const).map((type) => (
                <button key={type} type="button" onClick={() => setParticipantType(type)}
                  className={`flex-1 py-4 font-bold text-sm uppercase tracking-widest border transition-all duration-200 ${
                    participantType === type
                      ? 'bg-[#C41E1E] border-[#C41E1E] text-white'
                      : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                  }`}>
                  {type === 'adult' ? 'Adult (18+)' : 'Minor (Under 18)'}
                </button>
              ))}
            </div>
          </div>

          {/* ── ADULT FORM ── */}
          {participantType === 'adult' && (
            <div className="space-y-8">

              <div>
                <SectionTitle>Participant&apos;s Name</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name *">
                    <input required value={adult.firstName} onChange={(e) => setAdult({ ...adult, firstName: e.target.value })} className={inputCls} placeholder="First name" />
                  </Field>
                  <Field label="Last Name *">
                    <input required value={adult.lastName} onChange={(e) => setAdult({ ...adult, lastName: e.target.value })} className={inputCls} placeholder="Last name" />
                  </Field>
                </div>
              </div>

              <div>
                <SectionTitle>Participant&apos;s Age Acknowledgment *</SectionTitle>
                <button type="button" onClick={() => setAgeConfirmed(!ageConfirmed)}
                  className={`flex items-center gap-3 p-4 border w-full text-left transition-all duration-200 ${
                    ageConfirmed ? 'border-[#C41E1E]/50 bg-[#C41E1E]/5' : 'border-white/8 bg-zinc-950 hover:border-white/20'
                  }`}>
                  {ageConfirmed ? <CheckSquare size={16} className="text-[#C41E1E] shrink-0" /> : <Square size={16} className="text-gray-600 shrink-0" />}
                  <span className="text-gray-300 text-sm">I certify that I am 18 years of age or over.</span>
                </button>
              </div>

              <div>
                <SectionTitle>Participant&apos;s Address</SectionTitle>
                <div className="space-y-4">
                  <Field label="Address Line 1 *">
                    <input required value={adult.address1} onChange={(e) => setAdult({ ...adult, address1: e.target.value })} className={inputCls} placeholder="Street address" />
                  </Field>
                  <Field label="Address Line 2 (optional)">
                    <input value={adult.address2} onChange={(e) => setAdult({ ...adult, address2: e.target.value })} className={inputCls} placeholder="Apt, suite, unit, etc." />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="City *">
                      <input required value={adult.city} onChange={(e) => setAdult({ ...adult, city: e.target.value })} className={inputCls} placeholder="City" />
                    </Field>
                    <Field label="State *">
                      <select required value={adult.state} onChange={(e) => setAdult({ ...adult, state: e.target.value })} className={`${inputCls} bg-zinc-900`}>
                        <option value="">Select state</option>
                        {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Zip Code *">
                      <input required value={adult.zip} onChange={(e) => setAdult({ ...adult, zip: e.target.value })} className={inputCls} placeholder="00000" />
                    </Field>
                  </div>
                </div>
              </div>

              <div>
                <SectionTitle>Email Address</SectionTitle>
                <div className="space-y-4">
                  <Field label="Email *">
                    <input required type="email" value={adult.email} onChange={(e) => setAdult({ ...adult, email: e.target.value })} className={inputCls} placeholder="your@email.com" />
                  </Field>
                  <Field label="Confirm Email *">
                    <input required type="email" value={adult.emailConfirm} onChange={(e) => setAdult({ ...adult, emailConfirm: e.target.value })}
                      className={`${inputCls} ${adult.emailConfirm && !adultEmailMatch ? 'border-red-500' : ''}`} placeholder="Confirm email" />
                    {adult.emailConfirm && !adultEmailMatch && <p className="text-red-400 text-xs mt-1">Emails do not match.</p>}
                  </Field>
                  <button type="button" onClick={() => setEmailUpdates(!emailUpdates)} className="flex items-center gap-3 text-left">
                    {emailUpdates ? <CheckSquare size={15} className="text-[#C41E1E] shrink-0" /> : <Square size={15} className="text-gray-600 shrink-0" />}
                    <span className="text-gray-400 text-sm">I agree to receive information, news, and updates by e-mail.</span>
                  </button>
                </div>
              </div>

              <div>
                <SectionTitle>Emergency Contact</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *">
                    <input required value={adult.emergencyName} onChange={(e) => setAdult({ ...adult, emergencyName: e.target.value })} className={inputCls} placeholder="Full name" />
                  </Field>
                  <Field label="Phone Number *">
                    <input required type="tel" value={adult.emergencyPhone} onChange={(e) => setAdult({ ...adult, emergencyPhone: e.target.value })} className={inputCls} placeholder="(000) 000-0000" />
                  </Field>
                </div>
              </div>

              <div>
                <SectionTitle>Participant&apos;s Signature</SectionTitle>
                <div className="bg-zinc-950 border border-white/8 p-5 mb-4 text-xs text-gray-400 leading-relaxed">
                  <p className="mb-2 text-gray-300 font-semibold text-sm">Electronic Signature Consent</p>
                  <p>By checking below and typing your full legal name, you agree that your electronic signature is the legal equivalent of your handwritten signature and that you are legally bound by this agreement&apos;s terms.</p>
                </div>
                <button type="button" onClick={() => setSigConsent(!sigConsent)}
                  className={`flex items-center gap-3 p-4 border w-full text-left mb-4 transition-all duration-200 ${
                    sigConsent ? 'border-[#C41E1E]/50 bg-[#C41E1E]/5' : 'border-white/8 bg-zinc-950 hover:border-white/20'
                  }`}>
                  {sigConsent ? <CheckSquare size={16} className="text-[#C41E1E] shrink-0" /> : <Square size={16} className="text-gray-600 shrink-0" />}
                  <span className="text-gray-300 text-sm">I agree to use electronic signatures and be legally bound by this document.</span>
                </button>
                <Field label="Type Your Full Legal Name to Sign *">
                  <input required value={adult.signature} onChange={(e) => setAdult({ ...adult, signature: e.target.value })}
                    className={`${inputCls} italic text-lg`} style={{ fontFamily: 'Georgia, serif' }} placeholder="Your full legal name" />
                </Field>
                <div className="mt-3 bg-zinc-900 border border-white/8 px-4 py-3 text-gray-400 text-sm">
                  Date: <span className="text-white font-semibold">{today}</span>
                </div>
              </div>
            </div>
          )}

          {/* ── MINOR FLOW ── */}
          {participantType === 'minor' && (
            <div className="space-y-8">

              {/* Minor count */}
              <div>
                <h2 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-2">How many minors?</h2>
                <p className="text-gray-500 text-xs mb-4">This agreement is for a <strong className="text-white">MINOR</strong>.</p>
                <div className="flex flex-wrap gap-2">
                  {MINOR_COUNTS.map((n) => (
                    <button key={n} type="button" onClick={() => setMinorCount_(n)}
                      className={`w-12 h-12 font-bold text-sm border transition-all duration-200 ${
                        minorCount === n
                          ? 'bg-[#C41E1E] border-[#C41E1E] text-white'
                          : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-minor info */}
              {minors.map((m, i) => (
                <div key={i} className="border border-white/8 bg-zinc-950 p-6 space-y-4">
                  <h3 className="text-[#C41E1E] font-black text-xs uppercase tracking-[0.2em]">
                    Minor {minors.length > 1 ? `#${i + 1}` : ''}&apos;s Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name *">
                      <input required value={m.firstName} onChange={(e) => updateMinor(i, 'firstName', e.target.value)} className={inputCls} placeholder="First name" />
                    </Field>
                    <Field label="Last Name *">
                      <input required value={m.lastName} onChange={(e) => updateMinor(i, 'lastName', e.target.value)} className={inputCls} placeholder="Last name" />
                    </Field>
                  </div>
                  <Field label="Gender">
                    <select value={m.gender} onChange={(e) => updateMinor(i, 'gender', e.target.value)} className={`${inputCls} bg-zinc-900`}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </Field>
                  <div>
                    <label className={labelCls}>Date of Birth *</label>
                    <div className="grid grid-cols-3 gap-3">
                      <select required value={m.dobMonth} onChange={(e) => updateMinor(i, 'dobMonth', e.target.value)} className={`${inputCls} bg-zinc-900`}>
                        <option value="">Month</option>
                        {MONTHS.map((mo) => <option key={mo} value={mo}>{mo}</option>)}
                      </select>
                      <select required value={m.dobDay} onChange={(e) => updateMinor(i, 'dobDay', e.target.value)} className={`${inputCls} bg-zinc-900`}>
                        <option value="">Day</option>
                        {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <select required value={m.dobYear} onChange={(e) => updateMinor(i, 'dobYear', e.target.value)} className={`${inputCls} bg-zinc-900`}>
                        <option value="">Year</option>
                        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Minor's Address */}
              <div>
                <SectionTitle>Minor&apos;s Address</SectionTitle>
                <div className="space-y-4">
                  <Field label="Address Line 1 *">
                    <input required value={minorAddress.address1} onChange={(e) => setMinorAddress({ ...minorAddress, address1: e.target.value })} className={inputCls} placeholder="Street address" />
                  </Field>
                  <Field label="Address Line 2 (optional)">
                    <input value={minorAddress.address2} onChange={(e) => setMinorAddress({ ...minorAddress, address2: e.target.value })} className={inputCls} placeholder="Apt, suite, unit, etc." />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="City *">
                      <input required value={minorAddress.city} onChange={(e) => setMinorAddress({ ...minorAddress, city: e.target.value })} className={inputCls} placeholder="City" />
                    </Field>
                    <Field label="State *">
                      <select required value={minorAddress.state} onChange={(e) => setMinorAddress({ ...minorAddress, state: e.target.value })} className={`${inputCls} bg-zinc-900`}>
                        <option value="">Select state</option>
                        {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Zip Code *">
                      <input required value={minorAddress.zip} onChange={(e) => setMinorAddress({ ...minorAddress, zip: e.target.value })} className={inputCls} placeholder="00000" />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Parent Email */}
              <div>
                <SectionTitle>Parent or Guardian&apos;s Email Address</SectionTitle>
                <div className="space-y-4">
                  <Field label="Email *">
                    <input required type="email" value={parentEmail.email} onChange={(e) => setParentEmail({ ...parentEmail, email: e.target.value })} className={inputCls} placeholder="your@email.com" />
                  </Field>
                  <Field label="Confirm Email *">
                    <input required type="email" value={parentEmail.emailConfirm} onChange={(e) => setParentEmail({ ...parentEmail, emailConfirm: e.target.value })}
                      className={`${inputCls} ${parentEmail.emailConfirm && !parentEmailMatch ? 'border-red-500' : ''}`} placeholder="Confirm email" />
                    {parentEmail.emailConfirm && !parentEmailMatch && <p className="text-red-400 text-xs mt-1">Emails do not match.</p>}
                  </Field>
                  <button type="button" onClick={() => setParentEmailUpdates(!parentEmailUpdates)} className="flex items-center gap-3 text-left">
                    {parentEmailUpdates ? <CheckSquare size={15} className="text-[#C41E1E] shrink-0" /> : <Square size={15} className="text-gray-600 shrink-0" />}
                    <span className="text-gray-400 text-sm">I agree to receive information, news, and updates by e-mail.</span>
                  </button>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <SectionTitle>Emergency Contact</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *">
                    <input required value={minorEmergency.name} onChange={(e) => setMinorEmergency({ ...minorEmergency, name: e.target.value })} className={inputCls} placeholder="Full name" />
                  </Field>
                  <Field label="Phone Number *">
                    <input required type="tel" value={minorEmergency.phone} onChange={(e) => setMinorEmergency({ ...minorEmergency, phone: e.target.value })} className={inputCls} placeholder="(000) 000-0000" />
                  </Field>
                </div>
              </div>

              {/* Parent Name + Signature */}
              <div>
                <SectionTitle>Parent or Guardian&apos;s Name</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name *">
                    <input required value={parent.firstName} onChange={(e) => setParent({ ...parent, firstName: e.target.value })} className={inputCls} placeholder="First name" />
                  </Field>
                  <Field label="Last Name *">
                    <input required value={parent.lastName} onChange={(e) => setParent({ ...parent, lastName: e.target.value })} className={inputCls} placeholder="Last name" />
                  </Field>
                </div>
              </div>

              <div>
                <SectionTitle>Parent or Guardian&apos;s Signature</SectionTitle>
                <div className="bg-zinc-950 border border-white/8 p-5 mb-4 text-xs text-gray-400 leading-relaxed">
                  <p className="mb-2 text-gray-300 font-semibold text-sm">Electronic Signature Consent</p>
                  <p>By checking below and typing your full legal name, you confirm you are the legal parent or guardian of the minor(s) listed above. Your electronic signature is the legal equivalent of your handwritten signature.</p>
                </div>
                <button type="button" onClick={() => setParentSigConsent(!parentSigConsent)}
                  className={`flex items-center gap-3 p-4 border w-full text-left mb-4 transition-all duration-200 ${
                    parentSigConsent ? 'border-[#C41E1E]/50 bg-[#C41E1E]/5' : 'border-white/8 bg-zinc-950 hover:border-white/20'
                  }`}>
                  {parentSigConsent ? <CheckSquare size={16} className="text-[#C41E1E] shrink-0" /> : <Square size={16} className="text-gray-600 shrink-0" />}
                  <span className="text-gray-300 text-sm">I agree to use electronic signatures and am legally bound by this document as parent/guardian.</span>
                </button>
                <Field label="Type Your Full Legal Name to Sign *">
                  <input required value={parent.signature} onChange={(e) => setParent({ ...parent, signature: e.target.value })}
                    className={`${inputCls} italic text-lg`} style={{ fontFamily: 'Georgia, serif' }} placeholder="Parent/guardian full legal name" />
                </Field>
                <div className="mt-3 bg-zinc-900 border border-white/8 px-4 py-3 text-gray-400 text-sm">
                  Date: <span className="text-white font-semibold">{today}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          {participantType !== 'none' && (
            <div className="pt-2">
              {!allAgreed && (
                <p className="text-[#C41E1E] text-sm mb-4 flex items-center gap-2">
                  <AlertTriangle size={14} /> Please agree to all clauses before submitting.
                </p>
              )}
              <button type="submit" disabled={!canSubmit || status === 'submitting'}
                className="w-full bg-[#C41E1E] hover:bg-[#E02020] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm tracking-[0.2em] uppercase py-5 transition-all duration-200">
                {status === 'submitting' ? 'Submitting…' : 'Agree To This Document'}
              </button>
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-4">Something went wrong. Please try again or contact us directly.</p>
              )}
            </div>
          )}

        </form>
      </div>
    </main>
  );
}
