import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code received' }, { status: 400 });
  }

  const clientId = process.env.NEXT_PUBLIC_PRINTFUL_CLIENT_ID!;
  const clientSecret = process.env.PRINTFUL_CLIENT_SECRET!;
  const redirectUri = `${req.nextUrl.origin}/api/printful/callback`;

  const res = await fetch('https://www.printful.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: 'Token exchange failed', details: data }, { status: 400 });
  }

  // Show the access token so the user can copy it into .env.local
  return new NextResponse(
    `<html><body style="font-family:monospace;padding:40px;background:#111;color:#fff">
      <h2 style="color:#C41E1E">Printful OAuth Success</h2>
      <p>Add this to your <code>.env.local</code> as <strong>PRINTFUL_API_TOKEN</strong>:</p>
      <pre style="background:#222;padding:20px;word-break:break-all;color:#4ade80">${data.access_token}</pre>
      <p style="color:#888">Restart your dev server after updating .env.local</p>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
