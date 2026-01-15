'use client';

import { useState, useEffect, useRef } from 'react';

const FAKE_BALANCE = {
  sol: 8.4237,
  usdValue: 1199.85,
};

const FAKE_SOL_PRICE = 142.50;

const FAKE_POSITIONS = [
  { tokenSymbol: 'BONK', amount: 15420000, currentValue: 137.24, unrealizedPnlPercent: 12.4 },
];

function generateFakeHistory(): { timestamp: number; sol: number; usdValue: number }[] {
  const now = Date.now();
  const history = [];
  let baseSol = 8.2;

  for (let i = 30; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 0.15;
    baseSol = Math.max(7.8, Math.min(8.8, baseSol + variation));
    history.push({
      timestamp: now - i * 60000,
      sol: baseSol,
      usdValue: baseSol * FAKE_SOL_PRICE,
    });
  }
  history[history.length - 1].sol = FAKE_BALANCE.sol;
  return history;
}

function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function PortfolioChart() {
  const [balanceHistory] = useState(generateFakeHistory);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Background
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#E8E4DD';
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

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#DA7756';
    ctx.lineWidth = 2;

    balanceHistory.forEach((point, index) => {
      const x = (index / (balanceHistory.length - 1)) * width;
      const y = height - ((point.sol - minVal) / range) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Gradient fill
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(218, 119, 86, 0.2)');
    gradient.addColorStop(1, 'rgba(218, 119, 86, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // End dot
    if (balanceHistory.length > 0) {
      const lastPoint = balanceHistory[balanceHistory.length - 1];
      const lastX = width - 4;
      const lastY = height - ((lastPoint.sol - minVal) / range) * height;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#DA7756';
      ctx.fill();
    }
  }, [balanceHistory]);

  const solValueUsd = FAKE_BALANCE.sol * FAKE_SOL_PRICE;
  const totalPositionValue = FAKE_POSITIONS.reduce((acc, p) => acc + (p.currentValue || 0), 0);
  const totalPortfolioValue = solValueUsd + totalPositionValue;
  const solPercent = totalPortfolioValue > 0 ? (solValueUsd / totalPortfolioValue) * 100 : 100;

  const changePercent = balanceHistory.length >= 2
    ? ((balanceHistory[balanceHistory.length - 1].sol - balanceHistory[0].sol) / balanceHistory[0].sol) * 100
    : 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>Treasury Balance</span>
        <span className="badge badge-live">Live</span>
      </div>

      {/* Total Value */}
      <div style={{
        padding: '24px',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div style={{
          color: 'var(--text-muted)',
          fontSize: '12px',
          letterSpacing: '1px',
          marginBottom: '8px',
          textTransform: 'uppercase',
        }}>
          Total Portfolio Value
        </div>
        <div style={{
          fontSize: '42px',
          fontWeight: '600',
          fontFamily: 'Playfair Display, serif',
          color: 'var(--text-primary)',
        }}>
          ${formatNumber(totalPortfolioValue)}
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
        }}>
          <span style={{ color: 'var(--claude-terracotta)' }}>{formatNumber(FAKE_BALANCE.sol, 4)} SOL</span>
          <span style={{ margin: '0 8px', color: 'var(--border-medium)' }}>|</span>
          <span>Positions: ${formatNumber(totalPositionValue)}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        background: 'var(--border-light)',
      }}>
        <div style={{
          background: 'var(--bg-surface)',
          padding: '16px',
          textAlign: 'center',
        }}>
          <div className="stat-label">SOL Balance</div>
          <div className="stat-value" style={{ fontSize: '20px', color: 'var(--claude-terracotta)' }}>
            {formatNumber(FAKE_BALANCE.sol, 4)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            ${formatNumber(solValueUsd)}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          padding: '16px',
          textAlign: 'center',
        }}>
          <div className="stat-label">SOL Price</div>
          <div className="stat-value" style={{ fontSize: '20px' }}>
            ${formatNumber(FAKE_SOL_PRICE)}
          </div>
          <div style={{
            fontSize: '12px',
            marginTop: '4px',
            color: isPositive ? 'var(--success)' : 'var(--error)',
          }}>
            {isPositive ? '+' : ''}{formatNumber(changePercent)}%
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          padding: '16px',
          textAlign: 'center',
        }}>
          <div className="stat-label">Allocation</div>
          <div className="stat-value" style={{ fontSize: '20px' }}>
            {solPercent.toFixed(0)}%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            SOL
          </div>
        </div>
      </div>

      {/* Holdings */}
      <div style={{ padding: '16px' }}>
        <div style={{
          color: 'var(--text-muted)',
          fontSize: '11px',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}>
          Holdings
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'right' }}>Value</th>
              <th style={{ textAlign: 'right' }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span style={{ fontWeight: '600', color: 'var(--claude-terracotta)' }}>SOL</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontSize: '12px' }}>Solana</span>
              </td>
              <td style={{ textAlign: 'right', fontFamily: 'Courier Prime, monospace' }}>
                {formatNumber(FAKE_BALANCE.sol, 4)}
              </td>
              <td style={{ textAlign: 'right', fontWeight: '500' }}>
                ${formatNumber(solValueUsd)}
              </td>
              <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>--</td>
            </tr>
            {FAKE_POSITIONS.map((pos) => (
              <tr key={pos.tokenSymbol}>
                <td>
                  <span style={{ fontWeight: '600' }}>{pos.tokenSymbol}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontSize: '12px' }}>Memecoin</span>
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'Courier Prime, monospace' }}>
                  {formatNumber(pos.amount, 0)}
                </td>
                <td style={{ textAlign: 'right', fontWeight: '500' }}>
                  ${formatNumber(pos.currentValue)}
                </td>
                <td style={{
                  textAlign: 'right',
                  fontWeight: '500',
                  color: pos.unrealizedPnlPercent >= 0 ? 'var(--success)' : 'var(--error)',
                }}>
                  {pos.unrealizedPnlPercent >= 0 ? '+' : ''}{formatNumber(pos.unrealizedPnlPercent)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}>
          <span style={{
            color: 'var(--text-muted)',
            fontSize: '11px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            Balance History
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
            {balanceHistory.length} points
          </span>
        </div>
        <div
          ref={containerRef}
          style={{
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
          }}
        >
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100px' }} />
        </div>
      </div>
    </div>
  );
}
