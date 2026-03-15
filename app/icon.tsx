import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
        }}
      >
        <img
          src={base64}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
