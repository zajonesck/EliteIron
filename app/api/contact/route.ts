import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email, phone, heardAbout, message, services } = await req.json();

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #111; color: #eee; padding: 32px; border-radius: 8px;">
  <h1 style="color:#C41E1E; font-size:18px; text-transform:uppercase; letter-spacing:2px; margin-top:0;">
    New Contact Form Submission
  </h1>

  <div style="background:#1a1a1a; border-left: 3px solid #C41E1E; padding: 16px 20px; border-radius:4px; margin-bottom:20px;">
    <table style="width:100%; font-size:14px; border-collapse:collapse;">
      <tr><td style="color:#888; padding:4px 0; width:140px;">Name</td><td style="color:#fff;">${firstName} ${lastName}</td></tr>
      <tr><td style="color:#888; padding:4px 0;">Email</td><td style="color:#fff;"><a href="mailto:${email}" style="color:#C41E1E;">${email}</a></td></tr>
      <tr><td style="color:#888; padding:4px 0;">Phone</td><td style="color:#fff;">${phone}</td></tr>
      <tr><td style="color:#888; padding:4px 0;">Heard About Us</td><td style="color:#fff;">${heardAbout || '—'}</td></tr>
      <tr><td style="color:#888; padding:4px 0; vertical-align:top;">Interested In</td><td style="color:#fff;">${Array.isArray(services) && services.length ? services.join(', ') : '—'}</td></tr>
    </table>
  </div>

  <div style="background:#1a1a1a; padding: 16px 20px; border-radius:4px;">
    <div style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Message</div>
    <p style="color:#ccc; font-size:14px; margin:0; line-height:1.7; white-space:pre-wrap;">${message}</p>
  </div>

  <p style="color:#555; font-size:11px; margin-top:24px; text-align:center;">
    Submitted via eliteironsp.com · ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
  </p>
</div>
`;

  try {
    await resend.emails.send({
      from: 'Elite Iron <noreply@eliteironsp.com>',
      to: 'townsendtrainingsystems@gmail.com',
      replyTo: email,
      subject: `New Message — ${firstName} ${lastName}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact email error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
