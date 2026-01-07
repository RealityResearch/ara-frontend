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
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              🪙 TOKEN INFORMATION
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Content */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', padding: '12px', background: '#FFFFFF' }}>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td valign="top" width="65%">
                {/* Contract Address */}
                <div className="fieldset-y2k" style={{ marginBottom: '12px' }}>
                  <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                    Contract Address (CA)
                  </div>
                  <table width="100%" cellPadding={0} cellSpacing={4}>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            className="input-y2k"
                            value={CONTRACT_ADDRESS}
                            readOnly
                            style={{ width: '100%', fontFamily: 'Courier New, monospace' }}
                          />
                        </td>
                        <td width="80">
                          <button className="btn-y2k" onClick={copyToClipboard} style={{ width: '100%' }}>
                            {copied ? '✓ Copied!' : 'Copy'}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Buy Links */}
                <div className="fieldset-y2k">
                  <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                    Buy $ARA
                  </div>
                  <table width="100%" cellPadding={4} cellSpacing={4}>
                    <tbody>
                      <tr>
                        <td>
                          <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer">
                            <button className="btn-buy-y2k" style={{ width: '100%' }}>
                              🚀 pump.fun
                            </button>
                          </a>
                        </td>
                        <td>
                          <a href={SOCIAL_LINKS.jupiter} target="_blank" rel="noopener noreferrer">
                            <button className="btn-action" style={{ width: '100%' }}>
                              🪐 Jupiter
                            </button>
                          </a>
                        </td>
                        <td>
                          <a href={SOCIAL_LINKS.raydium} target="_blank" rel="noopener noreferrer">
                            <button className="btn-action" style={{ width: '100%' }}>
                              💧 Raydium
                            </button>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>

              <td width="10"></td>

              <td valign="top" width="35%">
                {/* Token Stats */}
                <div className="fieldset-y2k">
                  <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                    Token Details
                  </div>
                  <table className="table-y2k">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 'bold' }}>Network</td>
                        <td>
                          <span style={{ color: '#9945FF' }}>◎</span> Solana
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold' }}>Token Type</td>
                        <td>SPL Token</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold' }}>Total Supply</td>
                        <td>1,000,000,000</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold' }}>Tax</td>
                        <td style={{ color: '#008800' }}>0%</td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" className="click-here">
                      📊 View Chart on DexScreener
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Powered by Solana */}
        <div style={{
          marginTop: '12px',
          padding: '8px',
          background: 'linear-gradient(to right, #9945FF22 0%, #14F19522 100%)',
          border: '1px solid #9945FF44',
          textAlign: 'center',
          fontSize: '10px'
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
          {' '} • Fast • Secure • Decentralized
        </div>
      </div>
    </div>
  );
}
