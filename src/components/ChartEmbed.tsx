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
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              📈 LIVE CHART
              <span style={{ marginLeft: '8px', fontSize: '9px', color: '#00FF00' }}>
                ● REAL-TIME
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Chart Container */}
      <div style={{
        border: '1px solid #CCCCCC',
        borderTop: 'none',
        background: '#0a0a0a'
      }}>
        {/* Chart Title Bar - Windows XP Style */}
        <div style={{
          background: 'linear-gradient(to right, #000080 0%, #1084D0 100%)',
          padding: '2px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '11px' }}>
            DEXScreener - {contractAddress.slice(0, 8)}...{contractAddress.slice(-4)}
          </span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px', color: '#99CCFF' }}>Powered by DEXScreener</span>
            <a
              href={`https://dexscreener.com/solana/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: '8px' }}
            >
              <button className="btn-y2k" style={{ padding: '0 6px', fontSize: '9px' }}>
                Open ↗
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
            background: '#0a0a0a',
            color: '#00FF00',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div className="spin" style={{ fontSize: '24px', marginBottom: '8px' }}>⟳</div>
              <div>Loading chart data...</div>
              <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px' }}>
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
            background: '#0a0a0a',
            color: '#FF6666',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
              <div>Chart unavailable</div>
              <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px' }}>
                <a
                  href={`https://dexscreener.com/solana/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6699FF' }}
                >
                  View on DEXScreener →
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
          background: '#1a1a1a',
          borderTop: '1px solid #333333',
          padding: '6px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '9px'
        }}>
          <div style={{ color: '#666666' }}>
            <span style={{ color: '#00FF00' }}>●</span> Live data from DEXScreener
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={`https://birdeye.so/token/${contractAddress}?chain=solana`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#6699FF', textDecoration: 'none' }}
            >
              Birdeye
            </a>
            <a
              href={`https://solscan.io/token/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#6699FF', textDecoration: 'none' }}
            >
              Solscan
            </a>
            <a
              href={`https://pump.fun/coin/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#6699FF', textDecoration: 'none' }}
            >
              pump.fun
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
