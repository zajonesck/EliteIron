import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Elite Iron Sports Performance';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), 'public/images/logo.webp'));
  const base64 = `data:image/webp;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <img
          src={base64}
          style={{ width: '280px', height: '280px', objectFit: 'contain' }}
        />
        <div
          style={{
            color: '#9ca3af',
            fontSize: '24px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Suwanee, Georgia
        </div>
      </div>
    ),
    { ...size }
  );
}
