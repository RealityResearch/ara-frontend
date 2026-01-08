'use client';

import { useState } from 'react';
import { CONTRACT_ADDRESS } from '@/lib/mockData';

export function StickyCA() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Truncate for display
  const displayCA = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`;

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    }}>
      {/* CA Copy Box */}
      <div className="skeu-window" style={{
        minWidth: '180px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
      }}>
        {/* Header */}
        <div className="skeu-window-titlebar" style={{ padding: '4px 8px' }}>
          <span style={{ fontSize: '9px' }}>CONTRACT ADDRESS</span>
          <span style={{ fontSize: '9px', color: '#66FF66', fontWeight: 'normal' }}>* LIVE</span>
        </div>

        <div style={{ padding: '8px', background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)' }}>
          {/* CA Display */}
          <div className="skeu-terminal" style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            color: '#00FFFF',
            padding: '6px',
            marginBottom: '8px',
            textAlign: 'center',
            borderRadius: '4px'
          }}>
            {displayCA}
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className={copied ? 'skeu-btn-green skeu-btn' : 'skeu-btn'}
            style={{
              width: '100%',
              fontSize: '11px',
              fontWeight: 'bold',
              background: copied
                ? undefined
                : 'linear-gradient(180deg, #FFCC00 0%, #FF9900 50%, #DD8800 100%)',
              color: copied ? undefined : '#000000',
              textShadow: copied ? undefined : 'none'
            }}
          >
            {copied ? 'COPIED!' : 'COPY CA'}
          </button>

          {/* Quick Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '8px',
            fontSize: '9px'
          }}>
            <a
              href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066CC', textDecoration: 'none' }}
            >
              pump.fun
            </a>
            <span style={{ color: '#666666' }}>|</span>
            <a
              href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066CC', textDecoration: 'none' }}
            >
              chart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
