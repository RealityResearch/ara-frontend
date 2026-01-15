'use client';

import { useState } from 'react';
import { CONTRACT_ADDRESS, SOCIAL_LINKS } from '@/lib/mockData';

export function StickyCA() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (CONTRACT_ADDRESS.length === 0) return;
    await navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayCA = CONTRACT_ADDRESS.length > 0
    ? `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`
    : 'Coming soon';

  return (
    <div className="sticky-ca">
      <div className="sticky-ca-card">
        {/* Header */}
        <div className="sticky-ca-header">
          <span className="sticky-ca-label">Contract</span>
          <div className="sticky-ca-live">
            <span className="live-dot"></span>
            <span className="live-text">{CONTRACT_ADDRESS.length > 0 ? 'LIVE' : 'SOON'}</span>
          </div>
        </div>

        {/* CA Display */}
        <div className="sticky-ca-display" style={{ color: CONTRACT_ADDRESS.length > 0 ? undefined : 'var(--text-muted)' }}>
          {displayCA}
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className={`btn btn-primary sticky-ca-btn ${copied ? 'btn-success' : ''}`}
          disabled={CONTRACT_ADDRESS.length === 0}
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
