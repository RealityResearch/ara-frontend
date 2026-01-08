'use client';

import { SOCIAL_LINKS } from '@/lib/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ padding: '8px' }}>
      {/* Disclaimer */}
      <div className="bb-terminal" style={{ marginBottom: '8px' }}>
        <div className="bb-header" style={{ background: '#331100' }}>
          <span style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '10px' }}>! IMPORTANT DISCLAIMER</span>
        </div>
        <div style={{ padding: '12px', background: '#1a0a00', borderBottom: '2px solid #ff6600' }}>
          <span style={{ fontSize: '10px', color: '#999999', lineHeight: '1.5' }}>
            $ARA is a memecoin on the Solana blockchain. This is <span style={{ color: '#ff6600', fontWeight: 'bold' }}>NOT</span> a real
            investment product, retirement account, or financial instrument. There is no FDIC insurance, SEC registration, or regulatory
            oversight of any kind. The &quot;AI agent&quot; is for entertainment purposes only.
            <span style={{ color: '#ff3333', fontWeight: 'bold' }}> You will probably lose money.</span> Do not invest more than you can
            afford to lose completely. This is not financial advice. DYOR.
          </span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bb-terminal">
        <div className="bb-header">
          <span className="bb-brand">CLAUDE INVESTMENTS</span>
          <span style={{ color: '#00ff00', fontSize: '9px' }}>● AGENT ONLINE</span>
        </div>

        <div style={{ display: 'flex', gap: '2px', padding: '2px' }}>
          {/* Logo Column */}
          <div style={{ flex: 1 }} className="bb-panel">
            <div style={{ padding: '12px' }}>
              <img
                src="/logos/claude-investments.png"
                alt="Claude Investments"
                style={{ height: '32px', width: 'auto', marginBottom: '8px', filter: 'brightness(1.1)' }}
              />
              <div style={{ fontSize: '9px', color: '#666666', lineHeight: '1.4' }}>
                The first fully autonomous AI-powered<br />
                retirement fund on Solana.
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ flex: 1 }} className="bb-panel">
            <div style={{ padding: '12px' }}>
              <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>QUICK LINKS</div>
              <div style={{ fontSize: '10px', lineHeight: '1.8' }}>
                <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ color: '#3399ff', display: 'block' }}>* Buy on pump.fun</a>
                <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer" style={{ color: '#3399ff', display: 'block' }}>* Swap on Jupiter</a>
                <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" style={{ color: '#3399ff', display: 'block' }}>* View Chart</a>
                <a href="#terminal" style={{ color: '#3399ff', display: 'block' }}>* Live Terminal</a>
                <a href="#roadmap" style={{ color: '#3399ff', display: 'block' }}>* Roadmap</a>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div style={{ flex: 1 }} className="bb-panel">
            <div style={{ padding: '12px' }}>
              <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>CONNECT</div>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
                <button style={{
                  background: 'linear-gradient(180deg, #1da1f2 0%, #0d8bd9 100%)',
                  border: '1px solid #3399ff',
                  color: '#ffffff',
                  padding: '8px 16px',
                  fontFamily: 'Courier New',
                  fontSize: '10px',
                  cursor: 'pointer',
                  width: '100%',
                }}>
                  FOLLOW @CLAUDECAPITAL
                </button>
              </a>
              <div style={{ fontSize: '8px', color: '#666666', marginTop: '8px', textAlign: 'center' }}>
                All updates posted on X/Twitter
              </div>
            </div>
          </div>
        </div>

        <div className="bb-divider" />

        {/* Bottom Links */}
        <div style={{ padding: '8px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '10px', marginBottom: '8px' }}>
            <a href="#" style={{ color: '#3399ff' }}>HOME</a>
            <a href="#terminal" style={{ color: '#3399ff' }}>TERMINAL</a>
            <a href="#how-it-works" style={{ color: '#3399ff' }}>HOW IT WORKS</a>
            <a href="#chart" style={{ color: '#3399ff' }}>CHART</a>
            <a href="#token" style={{ color: '#3399ff' }}>TOKEN</a>
            <a href="#roadmap" style={{ color: '#3399ff' }}>ROADMAP</a>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="bb-fkey" style={{ padding: '2px 8px', fontSize: '8px' }}>SSL SECURED</span>
            <span className="bb-fkey" style={{ padding: '2px 8px', fontSize: '8px' }}>
              <span style={{ color: '#9945FF' }}>*</span> SOLANA
            </span>
            <span style={{
              padding: '2px 8px',
              fontSize: '8px',
              background: '#00aa00',
              border: '1px solid #00ff00',
              color: '#ffffff',
            }}>
              <span style={{ color: '#00ff00' }}>●</span> LIVE
            </span>
          </div>

          {/* Copyright */}
          <div style={{ fontSize: '9px', color: '#666666' }}>
            &copy; {currentYear} Claude Investments. All rights reserved.
            <br />
            <span style={{ color: '#ff6600' }}>Powered by Claude AI</span>
          </div>
        </div>

        {/* Command Line */}
        <div className="bb-command">
          <span className="bb-prompt">{'>'}</span>
          <span style={{ color: '#ff6600' }}>END OF TRANSMISSION</span>
          <span className="bb-cursor"></span>
        </div>
      </div>
    </footer>
  );
}
