'use client';

import { useState, useEffect, useRef } from 'react';

// Static fake data for theatrical display
const FAKE_BALANCE = {
  sol: 8.4237,
  usdValue: 1199.85,
};

const FAKE_SOL_PRICE = 142.50;

const FAKE_POSITIONS = [
  { tokenSymbol: 'BONK', amount: 15420000, currentValue: 137.24, unrealizedPnlPercent: 12.4 },
];

// Generate fake historical data for the chart
function generateFakeHistory(): { timestamp: number; sol: number; usdValue: number }[] {
  const now = Date.now();
  const history = [];
  let baseSol = 8.2;

  for (let i = 30; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 0.15;
    baseSol = Math.max(7.8, Math.min(8.8, baseSol + variation));
    history.push({
      timestamp: now - i * 60000, // Every minute
      sol: baseSol,
      usdValue: baseSol * FAKE_SOL_PRICE,
    });
  }
  // End at our static balance
  history[history.length - 1].sol = FAKE_BALANCE.sol;
  return history;
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

export function PortfolioChart() {
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  const [balanceHistory] = useState(generateFakeHistory);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || balanceHistory.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = 80;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = (i / 3) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const values = balanceHistory.map(p => p.sol ?? 0).filter(v => !isNaN(v) && v > 0);
    if (values.length === 0) return;
    const minVal = Math.min(...values) * 0.98;
    const maxVal = Math.max(...values) * 1.02;
    const range = maxVal - minVal || 0.01;

    ctx.beginPath();
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 2;

    balanceHistory.forEach((point, index) => {
      const x = (index / (balanceHistory.length - 1)) * width;
      const y = height - ((point.sol - minVal) / range) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 102, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 102, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    if (balanceHistory.length > 0) {
      const lastPoint = balanceHistory[balanceHistory.length - 1];
      const lastX = width - 4;
      const lastY = height - ((lastPoint.sol - minVal) / range) * height;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffaa00';
      ctx.fill();
    }
  }, [balanceHistory]);

  // Calculate values from static data
  const solValueUsd = FAKE_BALANCE.sol * FAKE_SOL_PRICE;
  const totalPositionValue = FAKE_POSITIONS.reduce((acc, p) => acc + (p.currentValue || 0), 0);
  const totalPortfolioValue = solValueUsd + totalPositionValue;
  const solPercent = totalPortfolioValue > 0 ? (solValueUsd / totalPortfolioValue) * 100 : 100;
  const memecoinPercent = totalPortfolioValue > 0 ? (totalPositionValue / totalPortfolioValue) * 100 : 0;

  const changePercent = balanceHistory.length >= 2
    ? ((balanceHistory[balanceHistory.length - 1].sol - balanceHistory[0].sol) / balanceHistory[0].sol) * 100
    : 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand" style={{ fontSize: '16px' }}>TREASURY</span>
          <span style={{ color: '#ffaa00', fontSize: '12px' }}>CLAUDE INVESTMENTS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="bb-time" style={{ fontSize: '12px' }}>{currentTime}</span>
          <span className="bb-badge bb-badge-live" style={{ fontSize: '10px', padding: '2px 8px' }}>
            LIVE
          </span>
        </div>
      </div>

      {/* TOTAL PORTFOLIO VALUE - Big and prominent */}
      <div style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '2px solid #ff6600',
      }}>
        <div style={{ color: '#888888', fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' }}>
          TOTAL PORTFOLIO VALUE
        </div>
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          fontFamily: 'Courier New, monospace',
          color: '#ffffff',
          textShadow: '0 0 20px rgba(255, 102, 0, 0.5)',
        }}>
          ${formatNumber(totalPortfolioValue)}
        </div>
        <div style={{ marginTop: '8px', fontSize: '14px' }}>
          <span style={{ color: '#ff6600' }}>SOL: ${formatNumber(solValueUsd)}</span>
          <span style={{ color: '#444444', margin: '0 12px' }}>|</span>
          <span style={{ color: '#ffaa00' }}>MEMECOINS: ${formatNumber(totalPositionValue)}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '2px', padding: '2px' }}>
        {/* SOL Balance */}
        <div className="bb-stat-box" style={{ flex: 1, padding: '12px' }}>
          <div style={{ color: '#888888', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>SOL BALANCE</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6600', fontFamily: 'Courier New' }}>
            {formatNumber(FAKE_BALANCE.sol, 4)}
          </div>
          <div style={{ fontSize: '12px', color: '#888888', marginTop: '4px' }}>
            ${formatNumber(solValueUsd)} USD
          </div>
        </div>

        {/* Memecoin Value */}
        <div className="bb-stat-box" style={{ flex: 1, padding: '12px' }}>
          <div style={{ color: '#888888', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>MEMECOIN VALUE</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffaa00', fontFamily: 'Courier New' }}>
            ${formatNumber(totalPositionValue)}
          </div>
          <div style={{ fontSize: '12px', color: '#888888', marginTop: '4px' }}>
            {FAKE_POSITIONS.length} POSITION{FAKE_POSITIONS.length !== 1 ? 'S' : ''}
          </div>
        </div>

        {/* SOL Price */}
        <div className="bb-stat-box" style={{ flex: 1, padding: '12px' }}>
          <div style={{ color: '#888888', fontSize: '11px', letterSpacing: '1px', marginBottom: '4px' }}>SOL PRICE</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ff00', fontFamily: 'Courier New' }}>
            ${formatNumber(FAKE_SOL_PRICE)}
          </div>
          <div style={{ fontSize: '12px', marginTop: '4px' }} className={isPositive ? 'bb-positive' : 'bb-negative'}>
            {isPositive ? '+' : ''}{formatNumber(changePercent)}% session
          </div>
        </div>
      </div>

      {/* Allocation Bar */}
      <div style={{ padding: '12px', background: '#0a0a0a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#888888', fontSize: '12px', letterSpacing: '1px' }}>ALLOCATION</span>
          <span style={{ color: '#888888', fontSize: '12px' }}>
            <span style={{ color: '#ff6600' }}>SOL {solPercent.toFixed(0)}%</span>
            {memecoinPercent > 0 && (
              <>
                <span style={{ margin: '0 8px' }}>|</span>
                <span style={{ color: '#ffaa00' }}>MEME {memecoinPercent.toFixed(0)}%</span>
              </>
            )}
          </span>
        </div>
        <div className="bb-allocation-bar" style={{ height: '24px', borderRadius: '4px' }}>
          <div
            className="bb-allocation-segment"
            style={{
              width: `${solPercent}%`,
              background: 'linear-gradient(180deg, #ff6600 0%, #cc4400 100%)',
              fontSize: '11px',
            }}
          >
            {solPercent > 20 ? `SOL` : ''}
          </div>
          {FAKE_POSITIONS.map((pos) => {
            const posPercent = totalPortfolioValue > 0 ? ((pos.currentValue || 0) / totalPortfolioValue) * 100 : 0;
            if (posPercent < 1) return null;
            return (
              <div
                key={pos.tokenSymbol}
                className="bb-allocation-segment"
                style={{
                  width: `${posPercent}%`,
                  background: `linear-gradient(180deg, ${getAllocColor(pos.tokenSymbol)} 0%, ${getAllocColor(pos.tokenSymbol)}88 100%)`,
                  fontSize: '11px',
                }}
              >
                {posPercent > 15 ? pos.tokenSymbol : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Holdings Table */}
      <div style={{ padding: '0 8px 8px' }}>
        <table className="bb-table" style={{ fontSize: '12px' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '11px', padding: '8px' }}>ASSET</th>
              <th style={{ textAlign: 'right', fontSize: '11px', padding: '8px' }}>AMOUNT</th>
              <th style={{ textAlign: 'right', fontSize: '11px', padding: '8px' }}>VALUE (USD)</th>
              <th style={{ textAlign: 'right', fontSize: '11px', padding: '8px' }}>P&L</th>
              <th style={{ textAlign: 'right', fontSize: '11px', padding: '8px' }}>ALLOC %</th>
            </tr>
          </thead>
          <tbody>
            {/* SOL Row */}
            <tr style={{ background: 'rgba(255, 102, 0, 0.1)' }}>
              <td style={{ padding: '10px 8px' }}>
                <span style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '14px' }}>SOL</span>
                <span style={{ color: '#666666', marginLeft: '8px', fontSize: '11px' }}>SOLANA</span>
              </td>
              <td style={{ textAlign: 'right', fontFamily: 'Courier New', fontSize: '13px', padding: '10px 8px' }}>
                {formatNumber(FAKE_BALANCE.sol, 4)}
              </td>
              <td style={{ textAlign: 'right', fontFamily: 'Courier New', color: '#ffffff', fontSize: '13px', fontWeight: 'bold', padding: '10px 8px' }}>
                ${formatNumber(solValueUsd)}
              </td>
              <td style={{ textAlign: 'right', color: '#666666', padding: '10px 8px' }}>--</td>
              <td style={{ textAlign: 'right', color: '#ff6600', fontWeight: 'bold', padding: '10px 8px' }}>
                {solPercent.toFixed(1)}%
              </td>
            </tr>

            {/* Token Positions */}
            {FAKE_POSITIONS.map((pos) => {
              const pnlPercent = pos.unrealizedPnlPercent ?? 0;
              const posPercent = totalPortfolioValue > 0 ? ((pos.currentValue || 0) / totalPortfolioValue) * 100 : 0;
              const posValue = pos.currentValue;
              return (
                <tr key={pos.tokenSymbol}>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ color: getAllocColor(pos.tokenSymbol), fontWeight: 'bold', fontSize: '14px' }}>
                      {pos.tokenSymbol}
                    </span>
                    <span style={{ color: '#666666', marginLeft: '8px', fontSize: '11px' }}>MEMECOIN</span>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'Courier New', fontSize: '13px', padding: '10px 8px' }}>
                    {formatNumber(pos.amount, 0)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'Courier New', color: '#ffffff', fontSize: '13px', fontWeight: 'bold', padding: '10px 8px' }}>
                    ${formatNumber(posValue)}
                  </td>
                  <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: 'bold', padding: '10px 8px' }} className={pnlPercent >= 0 ? 'bb-positive' : 'bb-negative'}>
                    {pnlPercent >= 0 ? '+' : ''}{formatNumber(pnlPercent)}%
                  </td>
                  <td style={{ textAlign: 'right', color: '#ffaa00', fontWeight: 'bold', padding: '10px 8px' }}>
                    {posPercent.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div style={{ padding: '8px 12px', background: '#0a0a0a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: '#ffaa00', fontSize: '11px', letterSpacing: '1px' }}>SOL BALANCE CHART</span>
          <span style={{ color: '#666666', fontSize: '11px' }}>{balanceHistory.length} DATA POINTS</span>
        </div>
        <div ref={containerRef} className="bb-chart-container" style={{ border: '1px solid #333' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '80px' }} />
        </div>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey"><span className="bb-fkey-label">F1</span>HELP</button>
        <button className="bb-fkey"><span className="bb-fkey-label">F2</span>CHART</button>
        <button className="bb-fkey"><span className="bb-fkey-label">F3</span>HISTORY</button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}><span className="bb-fkey-label">F10</span>MENU</button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>TREASURY GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
