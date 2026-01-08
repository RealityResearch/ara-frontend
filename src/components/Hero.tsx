'use client';

import Image from 'next/image';

export function Hero() {
  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Main Hero Panel */}
      <div className="skeu-window">
        {/* Logo Banner */}
        <div style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%)',
          padding: '24px 12px',
          textAlign: 'center',
          borderBottom: '1px solid #a0a0a0'
        }}>
          <Image
            src="/logos/claude-investments.png"
            alt="Claude Investments"
            width={420}
            height={110}
            priority
          />
        </div>

        {/* Slogan Bar */}
        <div className="skeu-section-header" style={{ borderRadius: 0, textAlign: 'center' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontStyle: 'italic', fontWeight: 'normal' }}>
            &ldquo;The Future of Investing is Here&rdquo;
          </span>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'flex' }}>
          {/* Left Column - Main Content */}
          <div style={{ flex: '0 0 60%', padding: '12px', background: 'linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%)' }}>
            <div className="skeu-section-header" style={{ marginBottom: '8px' }}>
              Welcome to Claude Investments
            </div>
            <div className="skeu-panel" style={{ padding: '12px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '11px', lineHeight: '1.6' }}>
                <strong>Watch an AI manage your retirement in real-time.</strong> Every trade,
                every decision, completely transparent. The first fully autonomous retirement
                fund on Solana.
              </p>
              <div className="skeu-panel" style={{
                padding: '8px',
                margin: '8px 0',
                background: 'linear-gradient(180deg, #f0f8ff 0%, #e8f4ff 100%)'
              }}>
                <span style={{ color: '#003366', fontWeight: 'bold', fontSize: '10px' }}>Key Features:</span>
                <div style={{ fontSize: '10px', marginTop: '4px' }}>
                  <span style={{ color: '#006600' }}>+</span> AI-Powered Trading 24/7<br />
                  <span style={{ color: '#006600' }}>+</span> 100% Transparent Operations<br />
                  <span style={{ color: '#006600' }}>+</span> On-Chain Verified Transactions<br />
                  <span style={{ color: '#006600' }}>+</span> Real-Time Performance Tracking
                </div>
              </div>
              <p style={{ margin: '0', textAlign: 'center' }}>
                <a href="#terminal" className="skeu-btn" style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  fontSize: '11px',
                  color: '#003399'
                }}>
                  View Live Agent Terminal
                </a>
              </p>
            </div>
          </div>

          {/* Right Column - Action Box */}
          <div style={{
            flex: '0 0 40%',
            padding: '12px',
            background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
            borderLeft: '1px solid #a0a0a0'
          }}>
            <div className="skeu-panel" style={{ padding: '12px' }}>
              <div className="skeu-section-header" style={{ marginBottom: '8px', fontSize: '10px' }}>
                Quick Actions
              </div>

              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <div className="skeu-terminal" style={{
                  padding: '12px',
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '10px', color: '#666666' }}>TICKER SYMBOL</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00CCFF' }}>$ARA</div>
                  <div style={{ fontSize: '10px', color: '#00FF00' }}>
                    <span style={{ color: '#00FF00' }}>*</span> LIVE ON SOLANA
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <a
                  href="https://pump.fun/coin/5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="skeu-btn-green skeu-btn" style={{ width: '100%', marginBottom: '8px', fontSize: '14px', padding: '10px' }}>
                    BUY $ARA NOW
                  </button>
                </a>
              </div>

              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #a0a0a0, transparent)',
                margin: '12px 0'
              }} />

              <div style={{ fontSize: '9px', color: '#666666', textAlign: 'center' }}>
                *****<br />
                Autonomous trading powered by Claude AI<br />
                <span style={{ color: '#006600' }}>+ Creator fees fund the trading wallet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="skeu-metallic" style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px',
          borderTop: '1px solid #a0a0a0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '16px' }}>...</span><br />
            <span style={{ fontSize: '9px', color: '#666666' }}>AI-POWERED</span>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px dotted #a0a0a0', paddingLeft: '16px' }}>
            <span style={{ fontSize: '16px' }}>...</span><br />
            <span style={{ fontSize: '9px', color: '#666666' }}>TRANSPARENT</span>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px dotted #a0a0a0', paddingLeft: '16px' }}>
            <span style={{ fontSize: '16px' }}>...</span><br />
            <span style={{ fontSize: '9px', color: '#666666' }}>ON-CHAIN</span>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px dotted #a0a0a0', paddingLeft: '16px' }}>
            <span style={{ fontSize: '16px' }}>...</span><br />
            <span style={{ fontSize: '9px', color: '#666666' }}>24/7 TRADING</span>
          </div>
        </div>
      </div>
    </div>
  );
}
