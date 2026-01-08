'use client';

import { mockPerformance, type PerformanceData } from '@/lib/mockData';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
  icon?: string;
}

function MetricCard({ label, value, subValue, color = '#003366', icon }: MetricCardProps) {
  return (
    <div className="skeu-panel" style={{ height: '100%', margin: 0, padding: '8px' }}>
      <div style={{
        fontSize: '9px',
        color: '#666666',
        marginBottom: '4px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
        {label}
      </div>
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Courier New, monospace',
        color: color,
        lineHeight: 1.2
      }}>
        {value}
      </div>
      {subValue && (
        <div style={{ fontSize: '9px', color: '#888888', marginTop: '2px' }}>
          {subValue}
        </div>
      )}
    </div>
  );
}

interface Props {
  data?: PerformanceData;
}

export function PerformanceMetrics({ data = mockPerformance }: Props) {
  // Safely handle potentially undefined values
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

  const pnlColor = safeData.totalPnlSol >= 0 ? '#008800' : '#CC0000';
  const streakColor = safeData.streakType === 'win' ? '#008800' : safeData.streakType === 'loss' ? '#CC0000' : '#666666';
  const totalWinLoss = safeData.wins + safeData.losses || 1; // Prevent division by zero

  return (
    <div id="performance" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        <span style={{ marginRight: '8px' }}>PERFORMANCE METRICS</span>
        <span style={{ fontSize: '9px', color: '#66FF66' }}>LIVE</span>
      </div>

      {/* Main Content */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', padding: '12px' }}>
        {/* Top Row - Key Metrics */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <MetricCard
              label="Win Rate"
              value={`${safeData.winRate.toFixed(1)}%`}
              subValue={`${safeData.wins}W / ${safeData.losses}L / ${safeData.even}E`}
              color={safeData.winRate >= 50 ? '#008800' : '#CC0000'}
              icon="..."
            />
          </div>
          <div style={{ flex: 1 }}>
            <MetricCard
              label="Total PnL"
              value={`${safeData.totalPnlSol >= 0 ? '+' : ''}${safeData.totalPnlSol.toFixed(2)} SOL`}
              subValue={`$${safeData.totalPnlUsd.toFixed(2)}`}
              color={pnlColor}
              icon="$"
            />
          </div>
          <div style={{ flex: 1 }}>
            <MetricCard
              label="Total Trades"
              value={safeData.totalTrades}
              subValue={`Avg hold: ${safeData.avgHoldTime}`}
              icon="#"
            />
          </div>
          <div style={{ flex: 1 }}>
            <MetricCard
              label="Treasury"
              value={`${safeData.walletBalanceSol.toFixed(4)} SOL`}
              subValue={safeData.walletAddress
                ? `${safeData.walletAddress.slice(0, 4)}...${safeData.walletAddress.slice(-4)}`
                : `$${safeData.walletBalanceUsd.toFixed(2)}`}
              icon="W"
            />
            {safeData.walletAddress && (
              <a
                href={`https://solscan.io/account/${safeData.walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '8px',
                  color: '#0066CC',
                  textDecoration: 'underline',
                  display: 'block',
                  marginTop: '2px'
                }}
              >
                View on Solscan
              </a>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <MetricCard
              label="Current Streak"
              value={`${safeData.currentStreak} ${safeData.streakType === 'win' ? 'W' : safeData.streakType === 'loss' ? 'L' : '--'}`}
              subValue={safeData.streakType === 'win' ? 'On fire!' : safeData.streakType === 'loss' ? 'Rough patch' : 'Fresh start'}
              color={streakColor}
              icon="~"
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #a0a0a0, transparent)',
          margin: '12px 0'
        }} />

        {/* Bottom Row - Secondary Metrics */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <div className="skeu-panel" style={{ padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#666666', marginBottom: '4px' }}>OPEN POSITIONS</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                {Array.from({ length: safeData.maxPositions }).map((_, i) => (
                  <div
                    key={i}
                    className="skeu-btn"
                    style={{
                      width: '24px',
                      height: '24px',
                      padding: 0,
                      background: i < safeData.openPositions
                        ? 'linear-gradient(180deg, #66CC66 0%, #449944 50%, #338833 100%)'
                        : 'linear-gradient(180deg, #e0e0e0 0%, #c8c8c8 50%, #b0b0b0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: i < safeData.openPositions ? '#FFFFFF' : '#999999',
                      textShadow: i < safeData.openPositions ? '0 -1px 0 rgba(0,0,0,0.3)' : 'none'
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '9px', color: '#666666', marginTop: '4px' }}>
                {safeData.openPositions} / {safeData.maxPositions} slots used
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="skeu-panel" style={{ padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#666666', marginBottom: '4px' }}>BEST / WORST TRADE</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <div>
                  <span style={{ color: '#008800', fontWeight: 'bold', fontSize: '14px' }}>
                    +{safeData.bestTrade.toFixed(1)}%
                  </span>
                  <div style={{ fontSize: '8px', color: '#666666' }}>Best</div>
                </div>
                <div style={{ borderLeft: '1px dotted #CCCCCC', paddingLeft: '16px' }}>
                  <span style={{ color: '#CC0000', fontWeight: 'bold', fontSize: '14px' }}>
                    {safeData.worstTrade.toFixed(1)}%
                  </span>
                  <div style={{ fontSize: '8px', color: '#666666' }}>Worst</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="skeu-panel" style={{ padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#666666', marginBottom: '4px' }}>WIN/LOSS RATIO</div>
              <div style={{
                background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)',
                border: '1px solid #a0a0a0',
                borderRadius: '4px',
                height: '16px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  background: 'linear-gradient(180deg, #66CC66 0%, #449944 100%)',
                  width: `${(safeData.wins / totalWinLoss) * 100}%`,
                  height: '100%',
                  position: 'absolute',
                  left: 0,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
                }} />
                <div style={{
                  background: 'linear-gradient(180deg, #CC6666 0%, #994444 100%)',
                  width: `${(safeData.losses / totalWinLoss) * 100}%`,
                  height: '100%',
                  position: 'absolute',
                  right: 0,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
                }} />
              </div>
              <div style={{ fontSize: '8px', color: '#666666', marginTop: '4px' }}>
                <span style={{ color: '#008800' }}>{safeData.wins} wins</span>
                {' vs '}
                <span style={{ color: '#CC0000' }}>{safeData.losses} losses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
