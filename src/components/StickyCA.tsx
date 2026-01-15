'use client';

import { useState } from 'react';
import { CONTRACT_ADDRESS, SOCIAL_LINKS } from '@/lib/mockData';

export function StickyCA() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayCA = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`;

  return (
    <div className="sticky-ca">
      <div className="sticky-ca-card">
        {/* Header */}
        <div className="sticky-ca-header">
          <span className="sticky-ca-label">Contract</span>
          <div className="sticky-ca-live">
            <span className="live-dot"></span>
            <span className="live-text">LIVE</span>
          </div>
        </div>

        {/* CA Display */}
        <div className="sticky-ca-display">{displayCA}</div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={`btn btn-primary sticky-ca-btn ${copied ? 'btn-success' : ''}`}
        >
          {copied ? 'Copied!' : 'Copy CA'}
        </button>

        {/* Quick Links */}
        <div className="sticky-ca-links">
          <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer">
            pump.fun
          </a>
          <span className="divider">|</span>
          <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer">
            chart
          </a>
        </div>
      </div>
    </div>
  );
}
