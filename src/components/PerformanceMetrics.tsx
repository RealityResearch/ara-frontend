'use client';

import { useState, useEffect } from 'react';
import { mockPerformance, type PerformanceData } from '@/lib/mockData';

interface Props {
  data?: PerformanceData;
}

export function PerformanceMetrics({ data = mockPerformance }: Props) {
  const [currentTime, setCurrentTime] = useState('--:--:--');

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

  const safeData = {
    ...mockPerformance,
    ...data,
    winRate: data?.winRate ?? mockPerformance.winRate,
    totalPnlSol: data?.totalPnlSol ?? mockPerformance.totalPnlSol,
    totalPnlUsd: data?.totalPnlUsd ?? mockPerformance.totalPnlUsd,
    walletBalanceSol: data?.walletBalanceSol ?? mockPerformance.walletBalanceSol,
    walletBalanceUsd: data?.walletBalanceUsd ?? mockPerformance.walletBalanceUsd,
    bestTrade: data?.bestTrade ?? mockPerformance.bestTrade,
    worstTrade: data?.worstTrade ?? mockPerformance.worstTrade,
    wins: data?.wins ?? mockPerformance.wins,
    losses: data?.losses ?? mockPerformance.losses,
    even: data?.even ?? mockPerformance.even,
    totalTrades: data?.totalTrades ?? mockPerformance.totalTrades,
    currentStreak: data?.currentStreak ?? mockPerformance.currentStreak,
    streakType: data?.streakType ?? mockPerformance.streakType,
    openPositions: data?.openPositions ?? mockPerformance.openPositions,
    maxPositions: data?.maxPositions ?? mockPerformance.maxPositions,
    avgHoldTime: data?.avgHoldTime ?? mockPerformance.avgHoldTime,
  };

  const totalWinLoss = safeData.wins + safeData.losses || 1;
  const winPercent = (safeData.wins / totalWinLoss) * 100;

  return (
    <div id="performance" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">PERFORMANCE</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>METRICS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="bb-time">{currentTime}</span>
          <span className="bb-badge bb-badge-live">LIVE</span>
        </div>
      </div>

      {/* Stats Grid - Top Row */}
      <div className="bb-grid bb-grid-4" style={{ margin: '2px' }}>
        <div className="bb-stat-box">
          <div className="bb-stat-label">WIN RATE</div>
          <div className={`bb-stat-value ${safeData.winRate >= 50 ? 'bb-positive' : 'bb-negative'}`}>
            {safeData.winRate.toFixed(1)}%
          </div>
          <div className="bb-stat-change bb-neutral">
            {safeData.wins}W / {safeData.losses}L / {safeData.even}E
          </div>
        </div>

        <div className="bb-stat-box">
          <div className="bb-stat-label">TOTAL P&L</div>
          <div className={`bb-stat-value ${safeData.totalPnlSol >= 0 ? 'bb-positive' : 'bb-negative'}`}>
            {safeData.totalPnlSol >= 0 ? '+' : ''}{safeData.totalPnlSol.toFixed(2)}
          </div>
          <div className="bb-stat-change bb-neutral">
            ${safeData.totalPnlUsd.toFixed(2)} USD
          </div>
        </div>

        <div className="bb-stat-box">
          <div className="bb-stat-label">TOTAL TRADES</div>
          <div className="bb-stat-value">{safeData.totalTrades}</div>
          <div className="bb-stat-change bb-neutral">
            Avg: {safeData.avgHoldTime}
          </div>
        </div>

        <div className="bb-stat-box">
          <div className="bb-stat-label">TREASURY</div>
          <div className="bb-stat-value" style={{ color: '#ffffff' }}>
            {safeData.walletBalanceSol.toFixed(4)}
          </div>
          <div className="bb-stat-change bb-neutral">
            ${safeData.walletBalanceUsd.toFixed(2)} USD
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="bb-grid bb-grid-3" style={{ margin: '2px' }}>
        {/* Open Positions */}
        <div className="bb-stat-box" style={{ padding: '8px' }}>
          <div className="bb-stat-label">OPEN POSITIONS</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
            {Array.from({ length: safeData.maxPositions }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '24px',
                  height: '24px',
                  background: i < safeData.openPositions ? '#00aa00' : '#333333',
                  border: `1px solid ${i < safeData.openPositions ? '#00ff00' : '#666666'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: i < safeData.openPositions ? '#ffffff' : '#666666',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ color: '#666666', fontSize: '9px', textAlign: 'center', marginTop: '4px' }}>
            {safeData.openPositions} / {safeData.maxPositions} SLOTS
          </div>
        </div>

        {/* Best/Worst Trade */}
        <div className="bb-stat-box" style={{ padding: '8px' }}>
          <div className="bb-stat-label">BEST / WORST</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="bb-positive" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                +{safeData.bestTrade.toFixed(1)}%
              </div>
              <div style={{ color: '#666666', fontSize: '8px' }}>BEST</div>
            </div>
            <div style={{ borderLeft: '1px solid #333333', paddingLeft: '16px', textAlign: 'center' }}>
              <div className="bb-negative" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {safeData.worstTrade.toFixed(1)}%
              </div>
              <div style={{ color: '#666666', fontSize: '8px' }}>WORST</div>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bb-stat-box" style={{ padding: '8px' }}>
          <div className="bb-stat-label">CURRENT STREAK</div>
          <div style={{
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '8px',
            color: safeData.streakType === 'win' ? '#00ff00' : safeData.streakType === 'loss' ? '#ff3333' : '#666666',
          }}>
            {safeData.currentStreak} {safeData.streakType === 'win' ? 'W' : safeData.streakType === 'loss' ? 'L' : '--'}
          </div>
          <div style={{ color: '#666666', fontSize: '9px', textAlign: 'center', marginTop: '4px' }}>
            {safeData.streakType === 'win' ? 'ON FIRE!' : safeData.streakType === 'loss' ? 'ROUGH PATCH' : 'FRESH START'}
          </div>
        </div>
      </div>

      {/* Win/Loss Bar */}
      <div style={{ padding: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#666666', fontSize: '9px' }}>WIN/LOSS DISTRIBUTION</span>
          <span style={{ color: '#666666', fontSize: '9px' }}>
            <span className="bb-positive">{safeData.wins}</span> vs <span className="bb-negative">{safeData.losses}</span>
          </span>
        </div>
        <div className="bb-allocation-bar" style={{ height: '12px' }}>
          <div
            className="bb-allocation-segment"
            style={{
              width: `${winPercent}%`,
              background: '#00aa00',
            }}
          />
          <div
            className="bb-allocation-segment"
            style={{
              width: `${100 - winPercent}%`,
              background: '#aa0000',
            }}
          />
        </div>
      </div>

      {/* Wallet Link */}
      {safeData.walletAddress && (
        <div style={{
          background: '#0d0d0d',
          padding: '8px',
          textAlign: 'center',
          borderTop: '1px solid #333333',
        }}>
          <a
            href={`https://solscan.io/account/${safeData.walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#3399ff', fontSize: '9px' }}
          >
            VIEW WALLET ON SOLSCAN: {safeData.walletAddress.slice(0, 8)}...{safeData.walletAddress.slice(-4)}
          </a>
        </div>
      )}

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          EXPORT
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>PERFORMANCE GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
