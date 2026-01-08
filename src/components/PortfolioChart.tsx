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
  solPrice?: number;
}

interface PortfolioChartProps {
  wsUrl?: string;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Bloomberg-style colors for allocation
const ALLOC_COLORS: Record<string, string> = {
  SOL: '#ff6600',
  BONK: '#ffaa00',
  WIF: '#00ff00',
  POPCAT: '#ff3333',
  JUP: '#3399ff',
  ARA: '#ff8844',
  DEFAULT: '#ffcc00',
};

function getAllocColor(symbol: string): string {
  return ALLOC_COLORS[symbol.toUpperCase()] || ALLOC_COLORS.DEFAULT;
}

export function PortfolioChart({ wsUrl }: PortfolioChartProps) {
  const [balanceHistory, setBalanceHistory] = useState<BalancePoint[]>([]);
  const [currentBalance, setCurrentBalance] = useState<{ sol: number; usdValue: number } | null>(null);
  const [positions, setPositions] = useState<PositionData[]>([]);
  const [totalPositionValue, setTotalPositionValue] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const WS_URL = wsUrl || process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'market_update' && message.marketData) {
          const walletSol = message.marketData.walletSol ?? 0;
          const walletValue = message.marketData.walletValue ?? 0;
          const positionsData = message.marketData.positions ?? [];
          const positionValue = message.marketData.totalPositionValue ?? 0;
          const solPriceUsd = message.marketData.solPrice ?? 0;

          if (walletSol === 0 && walletValue === 0) return;

          const point: BalancePoint = {
            timestamp: message.timestamp || Date.now(),
            sol: walletSol,
            usdValue: walletValue,
            solPrice: solPriceUsd,
          };

          setCurrentBalance({ sol: walletSol, usdValue: walletValue });
          setPositions(positionsData);
          setTotalPositionValue(positionValue);
          if (solPriceUsd > 0) setSolPrice(solPriceUsd);
          setBalanceHistory(prev => {
            const newHistory = [...prev, point];
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

  // Draw Bloomberg-style chart
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || balanceHistory.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = 100;

    canvas.width = width;
    canvas.height = height;

    // Black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Grid lines (dark)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = (i / 4) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let i = 0; i < 10; i++) {
      const x = (i / 9) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const values = balanceHistory.map(p => p.sol ?? 0).filter(v => !isNaN(v) && v > 0);
    if (values.length === 0) return;
    const minVal = Math.min(...values) * 0.98;
    const maxVal = Math.max(...values) * 1.02;
    const range = maxVal - minVal || 0.01;

    // Draw the line (Bloomberg orange)
    ctx.beginPath();
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 2;

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

    // Fill under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 102, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 102, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Current value dot
    if (balanceHistory.length > 0) {
      const lastPoint = balanceHistory[balanceHistory.length - 1];
      const lastX = width - 4;
      const lastY = height - ((lastPoint.sol - minVal) / range) * height;

      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffaa00';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Y-axis labels
    ctx.fillStyle = '#666666';
    ctx.font = '9px Courier New';
    ctx.textAlign = 'left';
    ctx.fillText(`${maxVal.toFixed(3)}`, 4, 10);
    ctx.fillText(`${minVal.toFixed(3)}`, 4, height - 4);

  }, [balanceHistory]);

  const changePercent = balanceHistory.length >= 2
    ? ((balanceHistory[balanceHistory.length - 1].sol - balanceHistory[0].sol) / balanceHistory[0].sol) * 100
    : 0;

  const isPositive = changePercent >= 0;

  const solValueUsd = currentBalance && solPrice > 0 ? currentBalance.sol * solPrice : 0;
  const totalValue = solValueUsd + totalPositionValue;
  const solPercent = totalValue > 0 ? (solValueUsd / totalValue) * 100 : 100;

  // Calculate session high/low
  const sessionHigh = balanceHistory.length > 0 ? Math.max(...balanceHistory.map(p => p.usdValue || 0)) : 0;
  const sessionLow = balanceHistory.length > 0 ? Math.min(...balanceHistory.map(p => p.usdValue || 0).filter(v => v > 0)) : 0;

  return (
    <div className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">PORTFOLIO</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>CLAUDE INVESTMENTS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="bb-time">{currentTime}</span>
          <span className={isConnected ? 'bb-badge bb-badge-live' : 'bb-badge bb-badge-offline'}>
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="bb-grid bb-grid-4" style={{ margin: '2px' }}>
        {/* Total Value */}
        <div className="bb-stat-box">
          <div className="bb-stat-label">NAV</div>
          <div className="bb-stat-value" style={{ color: '#ffffff' }}>
            ${currentBalance ? formatNumber(currentBalance.usdValue ?? 0) : '--'}
          </div>
          <div className={`bb-stat-change ${isPositive ? 'bb-positive' : 'bb-negative'}`}>
            {balanceHistory.length >= 2 ? `${isPositive ? '+' : ''}${formatNumber(changePercent)}%` : '--'}
          </div>
        </div>

        {/* SOL Balance */}
        <div className="bb-stat-box">
          <div className="bb-stat-label">SOL BAL</div>
          <div className="bb-stat-value">
            {currentBalance ? formatNumber(currentBalance.sol ?? 0, 4) : '--'}
          </div>
          <div className="bb-stat-change bb-neutral">
            ${formatNumber(solValueUsd)}
          </div>
        </div>

        {/* Session High */}
        <div className="bb-stat-box">
          <div className="bb-stat-label">SESSION HIGH</div>
          <div className="bb-stat-value bb-positive">
            ${formatNumber(sessionHigh)}
          </div>
          <div className="bb-stat-change bb-neutral">
            {balanceHistory.length} ticks
          </div>
        </div>

        {/* Session Low */}
        <div className="bb-stat-box">
          <div className="bb-stat-label">SESSION LOW</div>
          <div className="bb-stat-value bb-negative">
            ${sessionLow > 0 ? formatNumber(sessionLow) : '--'}
          </div>
          <div className="bb-stat-change bb-neutral">
            SOL: ${formatNumber(solPrice)}
          </div>
        </div>
      </div>

      {/* Allocation Bar */}
      <div style={{ padding: '4px 8px', background: '#0d0d0d' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#999999', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ALLOCATION
          </span>
          <span style={{ color: '#666666', fontSize: '9px' }}>
            {positions.length} POSITION{positions.length !== 1 ? 'S' : ''}
          </span>
        </div>
        <div className="bb-allocation-bar">
          <div
            className="bb-allocation-segment"
            style={{
              width: `${solPercent}%`,
              background: getAllocColor('SOL'),
            }}
          >
            {solPercent > 15 ? `SOL ${solPercent.toFixed(0)}%` : ''}
          </div>
          {positions.map((pos) => {
            const posPercent = totalValue > 0 ? ((pos.currentValue || 0) / totalValue) * 100 : 0;
            if (posPercent < 1) return null;
            return (
              <div
                key={pos.tokenAddress}
                className="bb-allocation-segment"
                style={{
                  width: `${posPercent}%`,
                  background: getAllocColor(pos.tokenSymbol),
                }}
              >
                {posPercent > 10 ? `${pos.tokenSymbol} ${posPercent.toFixed(0)}%` : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Holdings Table */}
      <div style={{ padding: '0 2px' }}>
        <table className="bb-table">
          <thead>
            <tr>
              <th>ASSET</th>
              <th style={{ textAlign: 'right' }}>AMOUNT</th>
              <th style={{ textAlign: 'right' }}>VALUE</th>
              <th style={{ textAlign: 'right' }}>P&L</th>
              <th style={{ textAlign: 'right' }}>%</th>
            </tr>
          </thead>
          <tbody>
            {/* SOL Row */}
            <tr>
              <td>
                <span style={{ color: '#ff6600', fontWeight: 'bold' }}>SOL</span>
                <span style={{ color: '#666666', marginLeft: '8px', fontSize: '9px' }}>SOLANA</span>
              </td>
              <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                {currentBalance ? formatNumber(currentBalance.sol ?? 0, 4) : '--'}
              </td>
              <td style={{ textAlign: 'right', fontFamily: 'Courier New', color: '#ffffff' }}>
                ${formatNumber(solValueUsd)}
              </td>
              <td style={{ textAlign: 'right', color: '#666666' }}>--</td>
              <td style={{ textAlign: 'right', color: '#ffaa00' }}>
                {solPercent.toFixed(1)}%
              </td>
            </tr>

            {/* Token Positions */}
            {positions.map((pos) => {
              const pnlPercent = pos.unrealizedPnlPercent ?? 0;
              const posPercent = totalValue > 0 ? ((pos.currentValue || 0) / totalValue) * 100 : 0;
              return (
                <tr key={pos.tokenAddress}>
                  <td>
                    <span style={{ color: getAllocColor(pos.tokenSymbol), fontWeight: 'bold' }}>
                      {pos.tokenSymbol}
                    </span>
                    <span style={{ color: '#666666', marginLeft: '8px', fontSize: '9px' }}>
                      MEMECOIN
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                    {formatNumber(pos.amount, 0)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'Courier New', color: '#ffffff' }}>
                    ${formatNumber(pos.currentValue ?? pos.costBasis)}
                  </td>
                  <td style={{ textAlign: 'right' }} className={pnlPercent >= 0 ? 'bb-positive' : 'bb-negative'}>
                    {pnlPercent >= 0 ? '+' : ''}{formatNumber(pnlPercent)}%
                  </td>
                  <td style={{ textAlign: 'right', color: '#ffaa00' }}>
                    {posPercent.toFixed(1)}%
                  </td>
                </tr>
              );
            })}

            {positions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#666666', padding: '12px' }}>
                  NO OPEN POSITIONS
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bb-divider" />

      {/* Chart Area */}
      <div style={{ padding: '4px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#ffaa00', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            SOL BALANCE CHART
          </span>
          <span style={{ color: '#666666', fontSize: '9px' }}>
            30s INTERVALS
          </span>
        </div>
        <div ref={containerRef} className="bb-chart-container">
          {balanceHistory.length < 2 ? (
            <div style={{
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff6600',
              fontFamily: 'Courier New',
              fontSize: '11px',
            }}>
              <span>COLLECTING DATA</span>
              <span className="bb-cursor" style={{ marginLeft: '4px' }}></span>
            </div>
          ) : (
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100px' }} />
          )}
        </div>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          CHART
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F3</span>
          TRADES
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F4</span>
          NEWS
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F5</span>
          SCAN
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          ACTIONS
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>PORTFOLIO GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
