'use client';

import { useState, useEffect, useRef } from 'react';

interface PositionData {
  tokenAddress: string;
  tokenSymbol: string;
  entryPrice: number;
  currentPrice?: number;
  amount: number;
  costBasis: number;
  currentValue?: number;
  unrealizedPnlPercent?: number;
}

interface BalancePoint {
  timestamp: number;
  sol: number;
  usdValue: number;
}

interface PortfolioChartProps {
  wsUrl?: string;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Token colors for allocation bar - Y2K Financial Palette
const TOKEN_COLORS: Record<string, string> = {
  SOL: '#D4A574',      // Gold/amber - classic finance
  BONK: '#F7931A',     // Orange
  WIF: '#006600',      // Money green
  POPCAT: '#CC0000',   // Alert red
  JUP: '#003399',      // Web blue
  ARA: '#D98D6C',      // Claude coral
  DEFAULT: '#CCAA00',  // Gold
};

function getTokenColor(symbol: string): string {
  return TOKEN_COLORS[symbol.toUpperCase()] || TOKEN_COLORS.DEFAULT;
}

export function PortfolioChart({ wsUrl }: PortfolioChartProps) {
  const [balanceHistory, setBalanceHistory] = useState<BalancePoint[]>([]);
  const [currentBalance, setCurrentBalance] = useState<{ sol: number; usdValue: number } | null>(null);
  const [positions, setPositions] = useState<PositionData[]>([]);
  const [totalPositionValue, setTotalPositionValue] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const WS_URL = wsUrl || process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // Extract wallet data from market updates
        if (message.type === 'market_update' && message.marketData) {
          const walletSol = message.marketData.walletSol ?? 0;
          const walletValue = message.marketData.walletValue ?? 0;
          const positionsData = message.marketData.positions ?? [];
          const positionValue = message.marketData.totalPositionValue ?? 0;

          // Skip if both are zero/undefined (invalid data)
          if (walletSol === 0 && walletValue === 0) return;

          const point: BalancePoint = {
            timestamp: message.timestamp || Date.now(),
            sol: walletSol,
            usdValue: walletValue,
          };

          setCurrentBalance({ sol: walletSol, usdValue: walletValue });
          setPositions(positionsData);
          setTotalPositionValue(positionValue);
          setBalanceHistory(prev => {
            const newHistory = [...prev, point];
            // Keep last 50 points (about 25 minutes at 30s intervals)
            return newHistory.slice(-50);
          });
        }
      } catch (e) {
        console.error('Error parsing chart message:', e);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [WS_URL]);

  // Draw chart when data changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || balanceHistory.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get actual dimensions
    const rect = container.getBoundingClientRect();
    const width = rect.width - 4;
    const height = 120; // Slightly smaller to make room for holdings

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = '#0a0f0a';
    ctx.fillRect(0, 0, width, height);

    // Add scanlines effect
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.03)';
    for (let y = 0; y < height; y += 2) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Calculate data range
    const values = balanceHistory.map(p => p.sol ?? 0).filter(v => !isNaN(v) && v > 0);
    if (values.length === 0) return;
    const minVal = Math.min(...values) * 0.95;
    const maxVal = Math.max(...values) * 1.05;
    const range = maxVal - minVal || 0.01;

    // Draw grid
    ctx.strokeStyle = '#1a2a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = (i / 3) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00ff41';
    ctx.shadowBlur = 5;

    balanceHistory.forEach((point, index) => {
      const x = (index / (balanceHistory.length - 1)) * width;
      const y = height - ((point.sol - minVal) / range) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw fill gradient
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(0, 255, 65, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw current value marker
    if (balanceHistory.length > 0) {
      const lastPoint = balanceHistory[balanceHistory.length - 1];
      const lastX = width;
      const lastY = height - ((lastPoint.sol - minVal) / range) * height;

      ctx.beginPath();
      ctx.arc(lastX - 4, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00ff41';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Y-axis labels
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#00aa00';
    ctx.font = '9px "Courier New"';
    ctx.textAlign = 'left';
    ctx.fillText(`${maxVal.toFixed(3)}`, 4, 12);
    ctx.fillText(`${minVal.toFixed(3)}`, 4, height - 4);

  }, [balanceHistory]);

  const changePercent = balanceHistory.length >= 2
    ? ((balanceHistory[balanceHistory.length - 1].sol - balanceHistory[0].sol) / balanceHistory[0].sol) * 100
    : 0;

  const isPositive = changePercent >= 0;

  // Calculate allocation percentages
  const solValueUsd = currentBalance ? currentBalance.sol * 140 : 0; // Approximate SOL price
  const totalValue = solValueUsd + totalPositionValue;
  const solPercent = totalValue > 0 ? (solValueUsd / totalValue) * 100 : 100;

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        Portfolio Balance
        <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#66FF66' : '#FFAA00' }}>
          {isConnected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Main Panel */}
      <div className="skeu-window" style={{ borderRadius: '0 0 8px 8px' }}>
        {/* Title Bar with Total Value */}
        <div className="skeu-window-titlebar" style={{ padding: '8px 12px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#AAAAAA' }}>Total Portfolio Value</span>
            <div style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Courier New', color: '#FFFFFF' }}>
              ${currentBalance ? (currentBalance.usdValue ?? 0).toFixed(2) : '--'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '10px', color: '#AAAAAA' }}>Session Change</span>
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'Courier New',
              color: isPositive ? '#66FF66' : '#FF6666'
            }}>
              {balanceHistory.length >= 2 ? `${isPositive ? '+' : ''}${(changePercent ?? 0).toFixed(2)}%` : '--'}
            </div>
          </div>
        </div>

        {/* Allocation Bar */}
        <div style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
          padding: '8px 12px',
          borderBottom: '1px solid #333',
        }}>
          <div style={{ fontSize: '9px', color: '#888888', marginBottom: '4px' }}>ALLOCATION</div>
          <div style={{
            display: 'flex',
            height: '20px',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #444',
          }}>
            {/* SOL portion */}
            <div
              style={{
                width: `${solPercent}%`,
                background: `linear-gradient(180deg, ${TOKEN_COLORS.SOL} 0%, ${TOKEN_COLORS.SOL}99 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                minWidth: solPercent > 10 ? 'auto' : '0',
              }}
            >
              {solPercent > 15 ? `SOL ${solPercent.toFixed(0)}%` : ''}
            </div>
            {/* Token positions */}
            {positions.map((pos, i) => {
              const posPercent = totalValue > 0 ? ((pos.currentValue || 0) / totalValue) * 100 : 0;
              if (posPercent < 1) return null;
              return (
                <div
                  key={pos.tokenAddress}
                  style={{
                    width: `${posPercent}%`,
                    background: `linear-gradient(180deg, ${getTokenColor(pos.tokenSymbol)} 0%, ${getTokenColor(pos.tokenSymbol)}99 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  {posPercent > 15 ? `${pos.tokenSymbol} ${posPercent.toFixed(0)}%` : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Holdings Breakdown */}
        <div style={{
          background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
          padding: '8px 12px',
        }}>
          <div style={{ fontSize: '9px', color: '#666666', marginBottom: '6px' }}>HOLDINGS</div>

          {/* SOL Balance */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 8px',
            background: '#fff',
            borderRadius: '4px',
            marginBottom: '4px',
            border: '1px solid #ddd',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: TOKEN_COLORS.SOL,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#fff',
              }}>S</div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '12px' }}>SOL</div>
                <div style={{ fontSize: '9px', color: '#888' }}>
                  {currentBalance ? (currentBalance.sol ?? 0).toFixed(4) : '--'} SOL
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '12px', fontFamily: 'Courier New' }}>
                ${solValueUsd.toFixed(2)}
              </div>
              <div style={{ fontSize: '9px', color: '#888' }}>
                {solPercent.toFixed(1)}% of portfolio
              </div>
            </div>
          </div>

          {/* Token Positions */}
          {positions.length > 0 ? (
            positions.map((pos) => {
              const pnlColor = (pos.unrealizedPnlPercent ?? 0) >= 0 ? '#008800' : '#CC0000';
              const posPercent = totalValue > 0 ? ((pos.currentValue || 0) / totalValue) * 100 : 0;
              return (
                <div
                  key={pos.tokenAddress}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '4px 8px',
                    background: '#fff',
                    borderRadius: '4px',
                    marginBottom: '4px',
                    border: '1px solid #ddd',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: getTokenColor(pos.tokenSymbol),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>{pos.tokenSymbol.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{pos.tokenSymbol}</div>
                      <div style={{ fontSize: '9px', color: '#888' }}>
                        {pos.amount.toLocaleString()} tokens
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px', fontFamily: 'Courier New' }}>
                      ${(pos.currentValue ?? pos.costBasis).toFixed(2)}
                    </div>
                    <div style={{ fontSize: '9px', color: pnlColor, fontWeight: 'bold' }}>
                      {(pos.unrealizedPnlPercent ?? 0) >= 0 ? '+' : ''}{(pos.unrealizedPnlPercent ?? 0).toFixed(1)}%
                      <span style={{ color: '#888', fontWeight: 'normal', marginLeft: '4px' }}>
                        ({posPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{
              padding: '8px',
              textAlign: 'center',
              color: '#888',
              fontSize: '10px',
              fontStyle: 'italic',
            }}>
              No open positions
            </div>
          )}
        </div>

        {/* Chart Area */}
        <div
          ref={containerRef}
          className="skeu-terminal"
          style={{
            padding: '2px',
            borderRadius: 0,
            borderTop: '1px solid #333',
          }}
        >
          {balanceHistory.length < 2 ? (
            <div style={{
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00aa00',
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
            }}>
              <span>Collecting data</span>
              <span className="cursor-blink"></span>
            </div>
          ) : (
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '120px' }} />
          )}
        </div>

        {/* Info Bar */}
        <div style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)',
          borderTop: '1px solid #a0a0a0',
          padding: '4px 8px',
          fontSize: '9px',
          color: '#666666',
          textAlign: 'center',
          borderRadius: '0 0 8px 8px'
        }}>
          Updates every ~30s | SOL Balance Chart
        </div>
      </div>
    </div>
  );
}
