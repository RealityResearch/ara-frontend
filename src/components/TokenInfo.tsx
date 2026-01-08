'use client';

import { useState } from 'react';
import { CONTRACT_ADDRESS, SOCIAL_LINKS } from '@/lib/mockData';

export function TokenInfo() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="token" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">TOKEN INFO</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>$ARA</span>
        </div>
        <span className="bb-badge" style={{ background: '#9945FF', color: '#fff' }}>SOLANA</span>
      </div>

      <div style={{ display: 'flex', gap: '2px', padding: '2px' }}>
        {/* Left: Contract & Buy */}
        <div style={{ flex: 2 }} className="bb-panel">
          <div style={{ padding: '12px' }}>
            {/* Contract Address */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>
                CONTRACT ADDRESS (CA)
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input
                  type="text"
                  className="bb-input"
                  value={CONTRACT_ADDRESS}
                  readOnly
                  style={{ flex: 1, fontSize: '10px' }}
                />
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: copied ? '#00aa00' : 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
                    border: `1px solid ${copied ? '#00ff00' : '#333333'}`,
                    color: copied ? '#ffffff' : '#ffaa00',
                    padding: '4px 16px',
                    fontFamily: 'Courier New',
                    fontSize: '10px',
                    cursor: 'pointer',
                  }}
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Buy Links */}
            <div>
              <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>
                BUY $ARA
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                  <button style={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #00aa00 0%, #006600 100%)',
                    border: '1px solid #00ff00',
                    color: '#ffffff',
                    padding: '8px',
                    fontFamily: 'Courier New',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}>
                    PUMP.FUN
                  </button>
                </a>
                <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                  <button className="bb-fkey" style={{ width: '100%', padding: '8px', fontSize: '11px' }}>
                    JUPITER
                  </button>
                </a>
                <a href={SOCIAL_LINKS.raydium} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                  <button className="bb-fkey" style={{ width: '100%', padding: '8px', fontSize: '11px' }}>
                    RAYDIUM
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Token Details */}
        <div style={{ flex: 1 }} className="bb-panel">
          <div style={{ padding: '12px' }}>
            <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>
              TOKEN DETAILS
            </div>
            <table className="bb-table" style={{ fontSize: '10px' }}>
              <tbody>
                <tr>
                  <td style={{ color: '#666666' }}>NETWORK</td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{ color: '#9945FF' }}>*</span> SOLANA
                  </td>
                </tr>
                <tr>
                  <td style={{ color: '#666666' }}>TYPE</td>
                  <td style={{ textAlign: 'right', color: '#ffffff' }}>SPL TOKEN</td>
                </tr>
                <tr>
                  <td style={{ color: '#666666' }}>SUPPLY</td>
                  <td style={{ textAlign: 'right', color: '#ffffff', fontFamily: 'Courier New' }}>1,000,000,000</td>
                </tr>
                <tr>
                  <td style={{ color: '#666666' }}>TAX</td>
                  <td style={{ textAlign: 'right' }} className="bb-positive">0%</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '12px' }}>
              <a
                href={SOCIAL_LINKS.dexscreener}
                target="_blank"
                rel="noopener noreferrer"
                className="bb-fkey"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '8px', fontSize: '10px' }}
              >
                VIEW CHART
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by Solana */}
      <div style={{
        background: '#0d0d0d',
        padding: '8px',
        textAlign: 'center',
        fontSize: '10px',
        borderTop: '1px solid #333333',
      }}>
        <span style={{ color: '#666666' }}>Powered by</span>{' '}
        <span style={{
          background: 'linear-gradient(to right, #9945FF, #14F195)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}>
          SOLANA
        </span>
        {' '}<span style={{ color: '#666666' }}>| Fast | Secure | Decentralized</span>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>TOKEN GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
