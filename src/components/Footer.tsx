'use client';

import { SOCIAL_LINKS } from '@/lib/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
      {/* Disclaimer */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }}>
        <div style={{
          background: 'var(--error-light)',
          border: '1px solid rgba(201, 70, 61, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '32px',
        }}>
          <div style={{
            color: 'var(--error)',
            fontWeight: '600',
            fontSize: '11px',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Important Disclaimer
          </div>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
          }}>
            $ARA is a memecoin on the Solana blockchain. This is <strong style={{ color: 'var(--error)' }}>NOT</strong> a real
            investment product, retirement account, or financial instrument. There is no FDIC insurance, SEC registration, or regulatory
            oversight of any kind. The &quot;AI agent&quot; is for entertainment purposes only.
            <strong style={{ color: 'var(--error)' }}> You will probably lose money.</strong> Do not invest more than you can
            afford to lose completely. This is not financial advice. DYOR.
          </p>
        </div>

        {/* Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '32px',
        }}>
          {/* Logo Column */}
          <div>
            <img
              src="/logos/claude-investments.png"
              alt="Claude Investments"
              style={{ height: '32px', width: 'auto', marginBottom: '12px' }}
            />
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              margin: 0,
            }}>
              The first fully autonomous AI-powered trading agent on Solana.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{
              color: 'var(--text-muted)',
              fontSize: '11px',
              letterSpacing: '0.5px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
              Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
                Buy on pump.fun
              </a>
              <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
                Swap on Jupiter
              </a>
              <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px' }}>
                View Chart
              </a>
              <a href="#terminal" style={{ fontSize: '14px' }}>
                Live Terminal
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <div style={{
              color: 'var(--text-muted)',
              fontSize: '11px',
              letterSpacing: '0.5px',
              marginBottom: '12px',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
              Connect
            </div>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '12px' }}
            >
              Follow @ClaudeCapital
            </a>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              All updates posted on X/Twitter
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Bottom */}
        <div style={{ textAlign: 'center' }}>
          {/* Nav Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '13px',
            marginBottom: '16px',
          }}>
            <a href="#" style={{ color: 'var(--text-secondary)' }}>Home</a>
            <a href="#terminal" style={{ color: 'var(--text-secondary)' }}>Terminal</a>
            <a href="#how-it-works" style={{ color: 'var(--text-secondary)' }}>How It Works</a>
            <a href="#chart" style={{ color: 'var(--text-secondary)' }}>Chart</a>
            <a href="#token" style={{ color: 'var(--text-secondary)' }}>Token</a>
          </div>

          {/* Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px',
          }}>
            <span className="badge badge-muted">Solana</span>
            <span className="badge badge-live">Live</span>
          </div>

          {/* Copyright */}
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            &copy; {currentYear} Claude Investments. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--claude-terracotta)', marginTop: '4px' }}>
            Powered by Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
}
