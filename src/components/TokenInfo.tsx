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
    <div className="card">
      <div className="card-header">
        <span>Token Information</span>
        <span className="badge badge-accent">$ARA</span>
      </div>

      <div className="token-info-content">
        {/* Contract Address */}
        <div className="token-section">
          <div className="section-label">Contract Address</div>
          <div className="ca-row">
            <input
              type="text"
              className="input input-mono"
              value={CONTRACT_ADDRESS || 'Launching soon...'}
              readOnly
              style={{ color: CONTRACT_ADDRESS ? undefined : 'var(--text-muted)' }}
            />
            <button
              onClick={copyToClipboard}
              className={`btn ${copied ? 'btn-success' : 'btn-secondary'}`}
              disabled={!CONTRACT_ADDRESS}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Buy Links */}
        <div className="token-section">
          <div className="section-label">Buy $ARA</div>
          <div className="buy-links">
            <a
              href={SOCIAL_LINKS.pumpfun}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Pump.fun
            </a>
            <a
              href={SOCIAL_LINKS.jupiter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Jupiter
            </a>
            <a
              href={SOCIAL_LINKS.raydium}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Raydium
            </a>
          </div>
        </div>

        {/* Token Details */}
        <div className="token-section">
          <div className="section-label">Token Details</div>
          <div className="token-details-grid">
            <div className="stat-box stat-box-sm">
              <div className="stat-label">Network</div>
              <div className="stat-value-sm accent">Solana</div>
            </div>
            <div className="stat-box stat-box-sm">
              <div className="stat-label">Type</div>
              <div className="stat-value-sm">SPL Token</div>
            </div>
            <div className="stat-box stat-box-sm">
              <div className="stat-label">Supply</div>
              <div className="stat-value-sm mono">1B</div>
            </div>
            <div className="stat-box stat-box-sm">
              <div className="stat-label">Tax</div>
              <div className="stat-value-sm success">0%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer center">
        <a
          href={SOCIAL_LINKS.dexscreener}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm"
        >
          View on DexScreener
        </a>
      </div>
    </div>
  );
}
