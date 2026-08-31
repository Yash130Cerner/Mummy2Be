import { ImageResponse } from 'next/og'

export const alt = 'Mummy2Be - Maternity Gown Rental in Ontario & Across Canada'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Brand OG image - generated at the edge, no binary assets needed. */
export default function OpengraphImage() {
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
          backgroundColor: '#FAF6EF',
          backgroundImage:
            'radial-gradient(600px 380px at 82% 18%, rgba(231,210,204,0.9), rgba(231,210,204,0)), radial-gradient(520px 360px at 12% 88%, rgba(198,172,179,0.55), rgba(198,172,179,0))',
          fontFamily: 'Georgia, serif',
          color: '#37291F',
          textAlign: 'center',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 92, display: 'flex', alignItems: 'baseline' }}>
          Mummy2Be
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: '#BF9A54',
              marginLeft: 10,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: '#6E5C4F',
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Premium maternity gown rentals - one size fits every bump, delivered across Canada.
        </div>
        <div
          style={{
            marginTop: 42,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#9E5340',
          }}
        >
          Ontario, serving all of Canada
        </div>
      </div>
    ),
    { ...size },
  )
}
