'use client';

import { useState } from 'react';

interface ChartEmbedProps {
  contractAddress: string;
  height?: number;
}

export function ChartEmbed({ contractAddress, height = 400 }: ChartEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Show placeholder if no contract address
  if (!contractAddress) {
    return (
      <div id="chart" style={{ marginBottom: '16px' }}>
        <div className="bb-header">
          LIVE CHART
          <span className="bb-badge-pending">PENDING</span>
        </div>
        <div className="bb-panel" style={{
          height: `${height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            fontSize: '48px',
            opacity: 0.3
          }}>
            📊
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: 'var(--bb-orange)',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              CHART AVAILABLE AFTER LAUNCH
            </div>
            <div style={{
              color: 'var(--bb-text-dim)',
              fontSize: '11px'
            }}>
              DEXScreener chart will appear here once $ARA is live on pump.fun
            </div>
          </div>
          <div style={{
            marginTop: '16px',
            padding: '8px 16px',
            border: '1px solid var(--bb-border)',
            fontSize: '10px',
            color: 'var(--bb-text-dim)'
          }}>
            Powered by DEXScreener
          </div>
        </div>
      </div>
    );
  }

  // DEXScreener embed URL
  const embedUrl = `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`;

  return (
    <div id="chart" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="bb-header">
        LIVE CHART
        <span className="bb-badge-live">REAL-TIME</span>
      </div>

      {/* Chart Container */}
      <div className="bb-panel">
        {/* Chart Title Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          borderBottom: '1px solid var(--bb-border)',
          fontSize: '11px'
        }}>
          <span style={{ color: 'var(--bb-orange)' }}>DEXScreener - {contractAddress.slice(0, 8)}...{contractAddress.slice(-4)}</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', color: 'var(--bb-text-dim)' }}>Powered by DEXScreener</span>
            <a
              href={`https://dexscreener.com/solana/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bb-btn" style={{ padding: '2px 8px', fontSize: '9px' }}>
                Open
              </button>
            </a>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && !hasError && (
          <div style={{
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bb-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px'
          }}>
            <div style={{ textAlign: 'center', color: 'var(--bb-green)' }}>
              <div className="spin" style={{ fontSize: '24px', marginBottom: '8px' }}>~</div>
              <div>Loading chart data...</div>
              <div style={{ fontSize: '10px', color: 'var(--bb-text-dim)', marginTop: '4px' }}>
                Connecting to DEXScreener...
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div style={{
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bb-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px'
          }}>
            <div style={{ textAlign: 'center', color: 'var(--bb-red)' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>!</div>
              <div>Chart unavailable</div>
              <div style={{ fontSize: '10px', color: 'var(--bb-text-dim)', marginTop: '4px' }}>
                <a
                  href={`https://dexscreener.com/solana/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--bb-orange)' }}
                >
                  View on DEXScreener
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Chart iframe */}
        <iframe
          src={embedUrl}
          style={{
            width: '100%',
            height: `${height}px`,
            border: 'none',
            display: isLoading || hasError ? 'none' : 'block'
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          title="DEXScreener Chart"
          sandbox="allow-scripts allow-same-origin allow-popups"
        />

        {/* Chart Footer */}
        <div style={{
          padding: '6px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '9px',
          borderTop: '1px solid var(--bb-border)',
          background: 'var(--bb-bg-secondary)'
        }}>
          <div style={{ color: 'var(--bb-text-dim)' }}>
            <span style={{ color: 'var(--bb-green)' }}>*</span> Live data from DEXScreener
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={`https://birdeye.so/token/${contractAddress}?chain=solana`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--bb-orange)', textDecoration: 'none' }}
            >
              Birdeye
            </a>
            <a
              href={`https://solscan.io/token/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--bb-orange)', textDecoration: 'none' }}
            >
              Solscan
            </a>
            <a
              href={`https://pump.fun/coin/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--bb-orange)', textDecoration: 'none' }}
            >
              pump.fun
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
