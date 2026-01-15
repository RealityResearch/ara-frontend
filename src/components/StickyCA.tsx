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
    }}>
      {/* CA Copy Box */}
      <div className="card" style={{
        padding: '12px',
        minWidth: '160px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{
            fontSize: '9px',
            color: '#9A958C',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '600'
          }}>
            Contract
          </span>
          <span style={{
            fontSize: '8px',
            color: '#5C8A5C',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{
              width: '5px',
              height: '5px',
              background: '#5C8A5C',
              borderRadius: '50%'
            }}></span>
            LIVE
          </span>
        </div>

        {/* CA Display */}
        <div style={{
          background: '#1A1918',
          borderRadius: '6px',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#D4775C',
          padding: '8px',
          marginBottom: '10px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {displayCA}
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={copied ? 'btn-primary' : 'btn-primary'}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '12px',
            fontWeight: '600',
            background: copied ? '#5C8A5C' : undefined,
          }}
        >
          {copied ? '✓ Copied!' : 'Copy CA'}
        </button>

        {/* Quick Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '10px',
          fontSize: '11px'
        }}>
          <a
            href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D4775C' }}
          >
            pump.fun
          </a>
          <span style={{ color: '#E8E5E0' }}>|</span>
          <a
            href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D4775C' }}
          >
            chart
          </a>
        </div>
      </div>
    </div>
  );
}
