'use client';

import { useState } from 'react';

interface ChartEmbedProps {
  contractAddress: string;
  height?: number;
}

export function ChartEmbed({ contractAddress, height = 400 }: ChartEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // DEXScreener embed URL
  const embedUrl = `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`;

  return (
    <div id="chart" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        LIVE CHART
        <span style={{ marginLeft: '8px', fontSize: '9px', color: '#66FF66' }}>
          REAL-TIME
        </span>
      </div>

      {/* Chart Container */}
      <div className="skeu-window" style={{ borderRadius: '0 0 8px 8px' }}>
        {/* Chart Title Bar */}
        <div className="skeu-window-titlebar">
          <span>DEXScreener - {contractAddress.slice(0, 8)}...{contractAddress.slice(-4)}</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', color: '#99CCFF', fontWeight: 'normal' }}>Powered by DEXScreener</span>
            <a
              href={`https://dexscreener.com/solana/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="skeu-btn" style={{ padding: '2px 8px', fontSize: '9px' }}>
                Open
              </button>
            </a>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && !hasError && (
          <div className="skeu-terminal" style={{
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            borderRadius: 0
          }}>
            <div style={{ textAlign: 'center', color: '#00FF00' }}>
              <div className="spin" style={{ fontSize: '24px', marginBottom: '8px' }}>~</div>
              <div>Loading chart data...</div>
              <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px' }}>
                Connecting to DEXScreener...
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="skeu-terminal" style={{
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            borderRadius: 0
          }}>
            <div style={{ textAlign: 'center', color: '#FF6666' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>!</div>
              <div>Chart unavailable</div>
              <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px' }}>
                <a
                  href={`https://dexscreener.com/solana/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6699FF' }}
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
        <div className="skeu-metallic" style={{
          padding: '6px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '9px',
          borderRadius: 0
        }}>
          <div style={{ color: '#666666' }}>
            <span style={{ color: '#00AA00' }}>*</span> Live data from DEXScreener
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={`https://birdeye.so/token/${contractAddress}?chain=solana`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066CC', textDecoration: 'none' }}
            >
              Birdeye
            </a>
            <a
              href={`https://solscan.io/token/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066CC', textDecoration: 'none' }}
            >
              Solscan
            </a>
            <a
              href={`https://pump.fun/coin/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0066CC', textDecoration: 'none' }}
            >
              pump.fun
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
