'use client';

import Image from 'next/image';

export function Hero() {
  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Main Hero Table Layout - Professional Y2K */}
      <table width="100%" cellPadding={8} cellSpacing={0} style={{ border: '1px solid #CCCCCC' }}>
        <tbody>
          <tr>
            <td colSpan={2} style={{ background: 'linear-gradient(to bottom, #003399 0%, #001166 100%)', padding: '12px', textAlign: 'center' }}>
              <Image
                src="/logos/claude-investements.png"
                alt="Claude Investments"
                width={380}
                height={100}
                style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }}
                priority
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ background: '#003366', textAlign: 'center', padding: '8px', borderBottom: '1px solid #002244' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#FFFFFF', fontStyle: 'italic' }}>
                &ldquo;The Future of Investing is Here&rdquo;
              </span>
            </td>
          </tr>
          <tr>
            <td width="60%" valign="top" style={{ padding: '12px', background: '#FFFFFF' }}>
              {/* Left Column - Main Content */}
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td>
                      <div className="section-header">
                        Welcome to Claude Investments
                      </div>
                      <div style={{ padding: '8px', fontSize: '11px', lineHeight: '1.6' }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          <strong>Watch an AI manage your retirement in real-time.</strong> Every trade,
                          every decision, completely transparent. The first fully autonomous retirement
                          fund on Solana.
                        </p>
                        <div style={{
                          background: '#F5F5F5',
                          border: '1px solid #CCCCCC',
                          padding: '8px',
                          margin: '8px 0'
                        }}>
                          <span style={{ color: '#003366', fontWeight: 'bold' }}>Key Features:</span>
                          <br />
                          <span style={{ color: '#006600' }}>✓</span> AI-Powered Trading 24/7<br />
                          <span style={{ color: '#006600' }}>✓</span> 100% Transparent Operations<br />
                          <span style={{ color: '#006600' }}>✓</span> On-Chain Verified Transactions<br />
                          <span style={{ color: '#006600' }}>✓</span> Real-Time Performance Tracking
                        </div>
                        <p style={{ margin: '0', textAlign: 'center' }}>
                          <a href="#terminal" style={{ color: '#003399', fontWeight: 'bold' }}>
                            View Live Agent Terminal ↓
                          </a>
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="40%" valign="top" style={{ padding: '12px', background: '#F8F8F8', borderLeft: '1px solid #CCCCCC' }}>
              {/* Right Column - Action Box */}
              <div className="fieldset-y2k" style={{ margin: '0' }}>
                <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                  Quick Actions
                </div>

                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <div style={{
                    background: '#001133',
                    color: '#00FF00',
                    padding: '8px',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '14px',
                    border: '2px inset #333333',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontSize: '10px', color: '#999999' }}>TICKER SYMBOL</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00CCFF' }}>$ARA</div>
                    <div style={{ fontSize: '10px', color: '#00FF00' }}>
                      <span style={{ color: '#00FF00' }}>●</span> LIVE ON SOLANA
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <a
                    href="https://pump.fun/ARA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn-buy-y2k" style={{ width: '100%', marginBottom: '8px', fontSize: '14px' }}>
                      BUY $ARA NOW
                    </button>
                  </a>
                </div>

                <div className="hr-dotted" />

                <div style={{ fontSize: '9px', color: '#666666', textAlign: 'center' }}>
                  ★★★★★<br />
                  Autonomous trading powered by Claude AI<br />
                  <span style={{ color: '#006600' }}>✓ Creator fees fund the trading wallet</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Trust Badges Row */}
      <table width="100%" cellPadding={4} cellSpacing={0} style={{ border: '1px solid #CCCCCC', borderTop: 'none', background: '#F8F8F8' }}>
        <tbody>
          <tr>
            <td align="center" style={{ borderRight: '1px dotted #CCCCCC' }}>
              <span style={{ fontSize: '16px' }}>🤖</span><br />
              <span style={{ fontSize: '9px', color: '#666666' }}>AI-POWERED</span>
            </td>
            <td align="center" style={{ borderRight: '1px dotted #CCCCCC' }}>
              <span style={{ fontSize: '16px' }}>👁️</span><br />
              <span style={{ fontSize: '9px', color: '#666666' }}>TRANSPARENT</span>
            </td>
            <td align="center" style={{ borderRight: '1px dotted #CCCCCC' }}>
              <span style={{ fontSize: '16px' }}>⛓️</span><br />
              <span style={{ fontSize: '9px', color: '#666666' }}>ON-CHAIN</span>
            </td>
            <td align="center">
              <span style={{ fontSize: '16px' }}>📈</span><br />
              <span style={{ fontSize: '9px', color: '#666666' }}>24/7 TRADING</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
