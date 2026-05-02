import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'WeMake Drivers — Learn to Drive in North London'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2d2f3e 0%, #1b1d2a 100%)',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '6px',
            background: '#e63946',
            borderRadius: '3px',
            marginBottom: '32px',
          }}
        />
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-2px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          WeMake Drivers
        </div>
        <div
          style={{
            fontSize: '32px',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        >
          Driving Lessons in North London
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#e63946',
            borderRadius: '50px',
            padding: '14px 36px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            98% First-Time Pass Rate
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
