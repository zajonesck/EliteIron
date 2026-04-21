import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { participantType, clauses, adult, minorData } = body;

  const clauseLines = clauses
    .map((c: { text: string; agreed: boolean }) => `✓ ${c.text}`)
    .join('\n\n');

  let participantInfo = '';
  let subject = '';

  if (participantType === 'adult') {
    subject = `Waiver Signed — ${adult.firstName} ${adult.lastName}`;
    participantInfo = `
      <tr><td style="color:#888;padding:4px 0;width:160px;">Name</td><td style="color:#fff;">${adult.firstName} ${adult.lastName}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Email</td><td style="color:#fff;">${adult.email}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Address</td><td style="color:#fff;">${adult.address1}${adult.address2 ? ', ' + adult.address2 : ''}, ${adult.city}, ${adult.state} ${adult.zip}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Emergency Contact</td><td style="color:#fff;">${adult.emergencyName} — ${adult.emergencyPhone}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Signature</td><td style="color:#fff;font-style:italic;">${adult.signature}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Date</td><td style="color:#fff;">${adult.date}</td></tr>
    `;
  } else {
    const { minors, minorAddress, parentEmail, minorEmergency, parent } = minorData;
    const minorNames = minors.map((m: { firstName: string; lastName: string }) => `${m.firstName} ${m.lastName}`).join(', ');
    subject = `Waiver Signed (Minor) — ${minorNames} (Guardian: ${parent.firstName} ${parent.lastName})`;
    participantInfo = `
      <tr><td style="color:#888;padding:4px 0;width:160px;">Minor(s)</td><td style="color:#fff;">${minorNames}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Address</td><td style="color:#fff;">${minorAddress.address1}${minorAddress.address2 ? ', ' + minorAddress.address2 : ''}, ${minorAddress.city}, ${minorAddress.state} ${minorAddress.zip}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Emergency Contact</td><td style="color:#fff;">${minorEmergency.name} — ${minorEmergency.phone}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Parent / Guardian</td><td style="color:#fff;">${parent.firstName} ${parent.lastName}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Parent Email</td><td style="color:#fff;">${parentEmail}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Signature</td><td style="color:#fff;font-style:italic;">${parent.signature}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Date</td><td style="color:#fff;">${parent.date}</td></tr>
    `;
  }

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #111; color: #eee; padding: 32px; border-radius: 8px;">
  <h1 style="color:#C41E1E; font-size:18px; text-transform:uppercase; letter-spacing:2px; margin-top:0;">
    Liability Waiver Submission
  </h1>
  <p style="color:#888; font-size:13px; margin-top:-8px;">James Townsend / Elite Iron Sports Performance</p>

  <div style="background:#1a1a1a; border-left: 3px solid #C41E1E; padding: 16px 20px; border-radius:4px; margin-bottom:20px;">
    <div style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">
      ${participantType === 'adult' ? 'Adult Participant' : 'Minor Participant'}
    </div>
    <table style="width:100%; font-size:14px; border-collapse:collapse;">
      ${participantInfo}
    </table>
  </div>

  <div style="background:#1a1a1a; padding: 16px 20px; border-radius:4px;">
    <div style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Agreed Clauses</div>
    <pre style="color:#aaa; font-size:12px; margin:0; white-space:pre-wrap; line-height:1.8;">${clauseLines}</pre>
  </div>

  <p style="color:#555; font-size:11px; margin-top:24px; text-align:center;">
    Submitted via eliteironsp.com · ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
  </p>
</div>
`;

  try {
    await resend.emails.send({
      from: 'Elite Iron <onboarding@resend.dev>',
      to: 'zajonesck83@gmail.com',
      subject,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Waiver email error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send email' }, { status: 500 });
  }
}
