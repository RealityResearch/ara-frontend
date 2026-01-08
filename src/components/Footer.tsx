'use client';

import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Disclaimer Banner */}
      <div className="skeu-panel" style={{
        margin: '12px',
        padding: '12px',
        background: 'linear-gradient(180deg, #fffef0 0%, #fff8e0 100%)'
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ fontSize: '18px' }}>!</div>
          <div>
            <strong style={{ color: '#996600' }}>IMPORTANT DISCLAIMER:</strong>
            <br />
            <span style={{ fontSize: '10px', color: '#666666' }}>
              $ARA is a memecoin on the Solana blockchain. This is <strong>NOT</strong> a real investment product,
              retirement account, or financial instrument. There is no FDIC insurance, SEC registration, or regulatory
              oversight of any kind. The &quot;AI agent&quot; is for entertainment purposes only.
              <strong style={{ color: '#996600' }}> You will probably lose money.</strong> Do not invest more than you can
              afford to lose completely. This is not financial advice. DYOR.
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="skeu-panel" style={{ margin: '0 12px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Logo Column */}
          <div style={{ flex: '0 0 30%' }}>
            <Image
              src="/logos/claude-investments.png"
              alt="Claude Investments"
              width={160}
              height={42}
              style={{ marginBottom: '8px' }}
            />
            <br />
            <span style={{ fontSize: '9px', color: '#666666' }}>
              The first fully autonomous AI-powered<br />
              retirement fund on Solana.
            </span>
            <br /><br />
            <span style={{ fontSize: '9px' }}>
              <span style={{ color: '#008800' }}>*</span> Agent Online
            </span>
          </div>

          {/* Quick Links */}
          <div style={{ flex: '0 0 35%' }}>
            <strong style={{ fontSize: '11px', color: '#003366' }}>Quick Links</strong>
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, #a0a0a0, transparent)',
              margin: '4px 0'
            }} />
            <div style={{ fontSize: '10px', lineHeight: '1.8' }}>
              * <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC' }}>Buy on pump.fun</a><br />
              * <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC' }}>Swap on Jupiter</a><br />
              * <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" style={{ color: '#0066CC' }}>View Chart</a><br />
              * <a href="#terminal" style={{ color: '#0066CC' }}>Live Terminal</a><br />
              * <a href="#roadmap" style={{ color: '#0066CC' }}>Roadmap</a>
            </div>
          </div>

          {/* Connect */}
          <div style={{ flex: '0 0 35%' }}>
            <strong style={{ fontSize: '11px', color: '#003366' }}>Connect With Us</strong>
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, #a0a0a0, transparent)',
              margin: '4px 0'
            }} />
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
              <button className="skeu-btn" style={{ fontSize: '11px', marginTop: '8px' }}>
                Follow @ClaudeCapital
              </button>
            </a>
            <div style={{ fontSize: '9px', color: '#666666', marginTop: '8px' }}>
              All updates posted on X/Twitter
            </div>
          </div>
        </div>

        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #a0a0a0, transparent)',
          margin: '12px 0'
        }} />

        {/* Bottom Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '10px' }}>
          <a href="#" style={{ color: '#0066CC' }}>Home</a>
          <a href="#terminal" style={{ color: '#0066CC' }}>Terminal</a>
          <a href="#how-it-works" style={{ color: '#0066CC' }}>How It Works</a>
          <a href="#chart" style={{ color: '#0066CC' }}>Chart</a>
          <a href="#token" style={{ color: '#0066CC' }}>Token Info</a>
          <a href="#roadmap" style={{ color: '#0066CC' }}>Roadmap</a>
        </div>

        {/* Trust Badges */}
        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <div className="skeu-btn" style={{ fontSize: '9px', padding: '2px 8px' }}>
            SSL Secured
          </div>
          <div className="skeu-btn" style={{ fontSize: '9px', padding: '2px 8px' }}>
            <span style={{ color: '#9945FF' }}>*</span> Solana
          </div>
          <div className="skeu-btn" style={{
            fontSize: '9px',
            padding: '2px 8px',
            background: 'linear-gradient(180deg, #4a90d9 0%, #2070c0 50%, #1060b0 100%)',
            color: '#FFFFFF',
            textShadow: '0 -1px 0 rgba(0,0,0,0.3)'
          }}>
            <span style={{ color: '#66FF66' }}>*</span> LIVE
          </div>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: '12px', fontSize: '9px', color: '#666666', textAlign: 'center' }}>
          &copy; {currentYear} Claude Investments. All rights reserved.<br />
          <span style={{ color: '#999999' }}>
            Powered by Claude AI
          </span>
        </div>
      </div>
    </footer>
  );
}
