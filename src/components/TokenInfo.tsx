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
    <div id="token" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        TOKEN INFORMATION
      </div>

      {/* Main Content */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', padding: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: '0 0 65%' }}>
            {/* Contract Address */}
            <div className="skeu-panel" style={{ marginBottom: '12px', padding: '12px' }}>
              <div className="skeu-section-header" style={{ marginBottom: '8px', fontSize: '10px' }}>
                Contract Address (CA)
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input
                  type="text"
                  className="skeu-input"
                  value={CONTRACT_ADDRESS}
                  readOnly
                  style={{ flex: 1, fontFamily: 'Courier New, monospace', fontSize: '10px' }}
                />
                <button className="skeu-btn" onClick={copyToClipboard} style={{ minWidth: '70px' }}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Buy Links */}
            <div className="skeu-panel" style={{ padding: '12px' }}>
              <div className="skeu-section-header" style={{ marginBottom: '8px', fontSize: '10px' }}>
                Buy $ARA
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                  <button className="skeu-btn-green skeu-btn" style={{ width: '100%' }}>
                    pump.fun
                  </button>
                </a>
                <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                  <button className="skeu-btn" style={{ width: '100%' }}>
                    Jupiter
                  </button>
                </a>
                <a href={SOCIAL_LINKS.raydium} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                  <button className="skeu-btn" style={{ width: '100%' }}>
                    Raydium
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div style={{ flex: '0 0 35%' }}>
            {/* Token Stats */}
            <div className="skeu-panel" style={{ padding: '12px', height: '100%', boxSizing: 'border-box' }}>
              <div className="skeu-section-header" style={{ marginBottom: '8px', fontSize: '10px' }}>
                Token Details
              </div>
              <table style={{ width: '100%', fontSize: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '4px 0', fontWeight: 'bold' }}>Network</td>
                    <td style={{ padding: '4px 0' }}>
                      <span style={{ color: '#9945FF' }}>*</span> Solana
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0', fontWeight: 'bold' }}>Token Type</td>
                    <td style={{ padding: '4px 0' }}>SPL Token</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0', fontWeight: 'bold' }}>Total Supply</td>
                    <td style={{ padding: '4px 0' }}>1,000,000,000</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 0', fontWeight: 'bold' }}>Tax</td>
                    <td style={{ padding: '4px 0', color: '#008800', fontWeight: 'bold' }}>0%</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" className="skeu-btn" style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  fontSize: '10px'
                }}>
                  View Chart on DexScreener
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Powered by Solana */}
        <div className="skeu-metallic" style={{
          marginTop: '12px',
          padding: '8px',
          textAlign: 'center',
          fontSize: '10px',
          borderRadius: '4px'
        }}>
          <span style={{ fontWeight: 'bold' }}>Powered by</span>{' '}
          <span style={{
            background: 'linear-gradient(to right, #9945FF, #14F195)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            SOLANA
          </span>
          {' '} | Fast | Secure | Decentralized
        </div>
      </div>
    </div>
  );
}
