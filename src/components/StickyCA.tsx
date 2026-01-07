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
      <div style={{
        background: 'linear-gradient(to bottom, #d98d6c 0%, #8b4d32 100%)',
        border: '2px outset #d98d6c',
        borderRadius: '4px',
        padding: '8px 12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        minWidth: '180px'
      }}>
        {/* Header */}
        <div style={{
          fontSize: '9px',
          color: '#99CCFF',
          marginBottom: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>CONTRACT ADDRESS</span>
          <span style={{ color: '#00FF00' }}>● LIVE</span>
        </div>

        {/* CA Display */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#00FFFF',
          marginBottom: '8px',
          letterSpacing: '0.5px'
        }}>
          {displayCA}
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          style={{
            width: '100%',
            background: copied
              ? 'linear-gradient(to bottom, #66CC66 0%, #339933 100%)'
              : 'linear-gradient(to bottom, #FFCC00 0%, #FF9900 100%)',
            border: '2px outset ' + (copied ? '#66CC66' : '#FFCC00'),
            color: copied ? '#FFFFFF' : '#000000',
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            fontWeight: 'bold',
            padding: '6px 12px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {copied ? '✓ COPIED!' : '📋 COPY CA'}
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
            style={{ color: '#99CCFF', textDecoration: 'none' }}
          >
            pump.fun
          </a>
          <span style={{ color: '#666666' }}>|</span>
          <a
            href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#99CCFF', textDecoration: 'none' }}
          >
            chart
          </a>
        </div>
      </div>
    </div>
  );
}
