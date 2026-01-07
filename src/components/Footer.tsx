'use client';

import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/mockData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Disclaimer Banner */}
      <div style={{
        margin: '12px',
        padding: '12px',
        background: '#FFFEF0',
        border: '1px solid #CCCC99'
      }}>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td width="24" valign="top">
                <span style={{ fontSize: '18px' }}>⚠️</span>
              </td>
              <td>
                <strong style={{ color: '#996600' }}>IMPORTANT DISCLAIMER:</strong>
                <br />
                <span style={{ fontSize: '10px', color: '#666666' }}>
                  $ARA is a memecoin on the Solana blockchain. This is <strong>NOT</strong> a real investment product,
                  retirement account, or financial instrument. There is no FDIC insurance, SEC registration, or regulatory
                  oversight of any kind. The &quot;AI agent&quot; is for entertainment purposes only.
                  <strong style={{ color: '#996600' }}> You will probably lose money.</strong> Do not invest more than you can
                  afford to lose completely. This is not financial advice. DYOR.
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Main Footer */}
      <div className="footer-y2k" style={{ marginTop: '8px' }}>
        <table width="100%" cellPadding={8} cellSpacing={0}>
          <tbody>
            <tr>
              {/* Logo Column */}
              <td width="30%" valign="top" align="left">
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
                  <span style={{ color: '#008800' }}>●</span> Agent Online
                </span>
              </td>

              {/* Quick Links */}
              <td width="35%" valign="top">
                <strong style={{ fontSize: '11px', color: '#003366' }}>Quick Links</strong>
                <div className="hr-dotted" style={{ margin: '4px 0' }} />
                <div style={{ fontSize: '10px', lineHeight: '1.8' }}>
                  • <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer">Buy on pump.fun</a><br />
                  • <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer">Swap on Jupiter</a><br />
                  • <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer">View Chart</a><br />
                  • <a href="#terminal">Live Terminal</a><br />
                  • <a href="#roadmap">Roadmap</a>
                </div>
              </td>

              {/* Connect */}
              <td width="35%" valign="top">
                <strong style={{ fontSize: '11px', color: '#003366' }}>Connect With Us</strong>
                <div className="hr-dotted" style={{ margin: '4px 0' }} />
                <table cellPadding={4} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td>
                        <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">
                          <button className="btn-action" style={{ fontSize: '11px' }}>
                            Follow @ClaudeCapital
                          </button>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ fontSize: '9px', color: '#666666', marginTop: '8px' }}>
                  All updates posted on X/Twitter
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="hr-bevel" style={{ margin: '8px 0' }} />

        {/* Bottom Links */}
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#terminal">Terminal</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#chart">Chart</a>
          <a href="#token">Token Info</a>
          <a href="#roadmap">Roadmap</a>
        </div>

        {/* Trust Badges */}
        <div style={{ marginTop: '12px' }}>
          <table cellPadding={4} cellSpacing={4} style={{ margin: '0 auto' }}>
            <tbody>
              <tr>
                <td>
                  <div className="badge-secure">
                    🔒 SSL Secured
                  </div>
                </td>
                <td>
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #CCCCCC',
                    padding: '2px 8px',
                    fontSize: '9px'
                  }}>
                    <span style={{ color: '#9945FF' }}>◎</span> Solana
                  </div>
                </td>
                <td>
                  <div style={{
                    background: '#003399',
                    color: '#FFFFFF',
                    border: '1px solid #001166',
                    padding: '2px 8px',
                    fontSize: '9px'
                  }}>
                    <span style={{ color: '#00FF00' }}>●</span> LIVE
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Copyright */}
        <div style={{ marginTop: '8px', fontSize: '9px', color: '#666666' }}>
          &copy; {currentYear} Claude Investments. All rights reserved.<br />
          <span style={{ color: '#999999' }}>
            Powered by Claude AI
          </span>
        </div>
      </div>
    </footer>
  );
}
