'use client';

import { SOCIAL_LINKS } from '@/lib/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ padding: '24px', background: '#FAF9F6' }}>
      {/* Disclaimer */}
      <div className="card" style={{ marginBottom: '24px', maxWidth: '1200px', margin: '0 auto 24px' }}>
        <div style={{
          background: '#FFF8F6',
          border: '1px solid #E8D0C8',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <div style={{
            color: '#C45C5C',
            fontWeight: '600',
            fontSize: '12px',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Important Disclaimer
          </div>
          <p style={{ fontSize: '12px', color: '#6B6860', lineHeight: '1.6', margin: 0 }}>
            $ARA is a memecoin on the Solana blockchain. This is <strong style={{ color: '#C45C5C' }}>NOT</strong> a real
            investment product, retirement account, or financial instrument. There is no FDIC insurance, SEC registration, or regulatory
            oversight of any kind. The &quot;AI agent&quot; is for entertainment purposes only.
            <strong style={{ color: '#C45C5C' }}> You will probably lose money.</strong> Do not invest more than you can
            afford to lose completely. This is not financial advice. DYOR.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="card" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '24px'
        }}>
          {/* Logo Column */}
          <div>
            <img
              src="/logos/claude-investments.png"
              alt="Claude Investments"
              style={{ height: '36px', width: 'auto', marginBottom: '12px' }}
            />
            <p style={{ fontSize: '13px', color: '#6B6860', lineHeight: '1.5', margin: 0 }}>
              The first fully autonomous AI-powered retirement fund on Solana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{
              color: '#9A958C',
              fontSize: '11px',
              letterSpacing: '1px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ color: '#D4775C', fontSize: '13px' }}>Buy on pump.fun</a>
              <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer" style={{ color: '#D4775C', fontSize: '13px' }}>Swap on Jupiter</a>
              <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" style={{ color: '#D4775C', fontSize: '13px' }}>View Chart</a>
              <a href="#terminal" style={{ color: '#D4775C', fontSize: '13px' }}>Live Terminal</a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <div style={{
              color: '#9A958C',
              fontSize: '11px',
              letterSpacing: '1px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              Connect
            </div>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', maxWidth: '200px' }}>
                Follow @ClaudeCapital
              </button>
            </a>
            <p style={{ fontSize: '11px', color: '#9A958C', marginTop: '8px' }}>
              All updates posted on X/Twitter
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#E8E5E0', margin: '24px 0' }} />

        {/* Bottom */}
        <div style={{ textAlign: 'center' }}>
          {/* Nav Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            marginBottom: '16px'
          }}>
            <a href="#" style={{ color: '#6B6860' }}>Home</a>
            <a href="#terminal" style={{ color: '#6B6860' }}>Terminal</a>
            <a href="#how-it-works" style={{ color: '#6B6860' }}>How It Works</a>
            <a href="#chart" style={{ color: '#6B6860' }}>Chart</a>
            <a href="#token" style={{ color: '#6B6860' }}>Token</a>
          </div>

          {/* Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span className="badge badge-muted">SSL Secured</span>
            <span className="badge badge-muted">Solana</span>
            <span className="badge badge-live">Live</span>
          </div>

          {/* Copyright */}
          <p style={{ fontSize: '12px', color: '#9A958C', margin: 0 }}>
            &copy; {currentYear} Claude Investments. All rights reserved.
            <br />
            <span style={{ color: '#D4775C' }}>Powered by Claude AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
