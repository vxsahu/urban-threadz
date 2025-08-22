import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#000000',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              UT
            </span>
          </div>
          <div>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#000000',
                margin: '0',
                background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NextThread
            </h1>
            <p
              style={{
                fontSize: '20px',
                color: '#666666',
                margin: '0',
                marginTop: '8px',
              }}
            >
              Premium Clothing & Fashion
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '28px',
            color: '#333333',
            textAlign: 'center',
            margin: '0',
            marginBottom: '40px',
            maxWidth: '600px',
            lineHeight: '1.4',
          }}
        >
          Discover the latest trends in premium clothing for men, women, and unisex
        </p>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#333333',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#000000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ color: '#ffffff', fontSize: '24px' }}>🚚</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>Free Shipping</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#333333',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#000000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ color: '#ffffff', fontSize: '24px' }}>🛡️</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>Secure Payment</span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#333333',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#000000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ color: '#ffffff', fontSize: '24px' }}>↩️</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>Easy Returns</span>
          </div>
        </div>

        {/* URL */}
        <p
          style={{
            fontSize: '18px',
            color: '#666666',
            margin: '0',
            marginTop: '60px',
          }}
        >
          {require('@/utils/config').siteUrl}        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
