'use client';

import { useState, useEffect, useRef } from 'react';

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

export function PortfolioChart({ wsUrl }: PortfolioChartProps) {
  const [balanceHistory, setBalanceHistory] = useState<BalancePoint[]>([]);
  const [currentBalance, setCurrentBalance] = useState<{ sol: number; usdValue: number } | null>(null);
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
          const { walletSol, walletValue } = message.marketData;

          const point: BalancePoint = {
            timestamp: message.timestamp || Date.now(),
            sol: walletSol,
            usdValue: walletValue,
          };

          setCurrentBalance({ sol: walletSol, usdValue: walletValue });
          setBalanceHistory(prev => {
            const newHistory = [...prev, point];
            // Keep last 50 points (about 25 minutes at 30s intervals)
            return newHistory.slice(-50);
          });
        }

        // Also handle state updates which include performance data
        if (message.type === 'state_update' && message.performance) {
          // Could extract additional data here if needed
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
    const width = rect.width - 4; // Account for border
    const height = 180; // Taller chart for more visibility

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
    const values = balanceHistory.map(p => p.sol);
    const minVal = Math.min(...values) * 0.95;
    const maxVal = Math.max(...values) * 1.05;
    const range = maxVal - minVal || 0.01;

    // Draw grid
    ctx.strokeStyle = '#1a2a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = (i / 4) * height;
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

      // Pulsing dot
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

    // X-axis time labels
    if (balanceHistory.length > 0) {
      ctx.textAlign = 'right';
      ctx.fillText(formatTime(balanceHistory[0].timestamp), width / 3, height - 4);
      ctx.fillText(formatTime(balanceHistory[balanceHistory.length - 1].timestamp), width - 4, height - 4);
    }

  }, [balanceHistory]);

  const changePercent = balanceHistory.length >= 2
    ? ((balanceHistory[balanceHistory.length - 1].sol - balanceHistory[0].sol) / balanceHistory[0].sol) * 100
    : 0;

  const isPositive = changePercent >= 0;

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              Portfolio Balance
              <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#008800' : '#FF8800' }}>
                ● {isConnected ? 'LIVE' : 'OFFLINE'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Chart Panel */}
      <div style={{ border: '2px outset #CCCCCC', background: '#C0C0C0', padding: '2px' }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(to right, #000080 0%, #1084D0 100%)',
          padding: '2px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '11px' }}>
            Treasury Balance (SOL)
          </span>
          <div style={{ display: 'flex', gap: '8px', fontSize: '10px' }}>
            {currentBalance && (
              <>
                <span style={{ color: '#FFCC00' }}>
                  {currentBalance.sol.toFixed(4)} SOL
                </span>
                <span style={{ color: isPositive ? '#00FF00' : '#FF6666' }}>
                  {isPositive ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Chart Area */}
        <div
          ref={containerRef}
          style={{
            background: '#0a0f0a',
            border: '2px inset #666666',
            padding: '2px',
          }}
        >
          {balanceHistory.length < 2 ? (
            <div style={{
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00aa00',
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
            }}>
              <span>Collecting data</span>
              <span className="cursor-blink">█</span>
            </div>
          ) : (
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '180px' }} />
          )}
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '6px',
          background: '#E8E8E8',
          borderTop: '1px solid #999999',
          fontSize: '10px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666666', fontSize: '9px' }}>Current</div>
            <div style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>
              {currentBalance ? `${currentBalance.sol.toFixed(4)} SOL` : '--'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666666', fontSize: '9px' }}>USD Value</div>
            <div style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>
              {currentBalance ? `$${currentBalance.usdValue.toFixed(2)}` : '--'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666666', fontSize: '9px' }}>Session Change</div>
            <div style={{
              fontFamily: 'Courier New',
              fontWeight: 'bold',
              color: isPositive ? '#008800' : '#CC0000'
            }}>
              {balanceHistory.length >= 2 ? `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%` : '--'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666666', fontSize: '9px' }}>Data Points</div>
            <div style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>
              {balanceHistory.length}
            </div>
          </div>
        </div>

        {/* Info Bar */}
        <div style={{
          background: '#E0E0E0',
          borderTop: '1px solid #999999',
          padding: '2px 8px',
          fontSize: '9px',
          color: '#666666',
          textAlign: 'center'
        }}>
          Updates every ~30s • Shows last 25 minutes of balance data
        </div>
      </div>
    </div>
  );
}
