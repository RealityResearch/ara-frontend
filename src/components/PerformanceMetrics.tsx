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
    <div className="fieldset-y2k" style={{ height: '100%', margin: 0 }}>
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
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              <span style={{ marginRight: '8px' }}>PERFORMANCE METRICS</span>
              <span className="badge-new">LIVE</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Content */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', padding: '12px', background: '#FFFFFF' }}>
        {/* Top Row - Key Metrics */}
        <table width="100%" cellPadding={4} cellSpacing={4}>
          <tbody>
            <tr>
              <td width="20%" valign="top">
                <MetricCard
                  label="Win Rate"
                  value={`${safeData.winRate.toFixed(1)}%`}
                  subValue={`${safeData.wins}W / ${safeData.losses}L / ${safeData.even}E`}
                  color={safeData.winRate >= 50 ? '#008800' : '#CC0000'}
                  icon="🎯"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Total PnL"
                  value={`${safeData.totalPnlSol >= 0 ? '+' : ''}${safeData.totalPnlSol.toFixed(2)} SOL`}
                  subValue={`$${safeData.totalPnlUsd.toFixed(2)}`}
                  color={pnlColor}
                  icon="💰"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Total Trades"
                  value={safeData.totalTrades}
                  subValue={`Avg hold: ${safeData.avgHoldTime}`}
                  icon="📊"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Treasury"
                  value={`${safeData.walletBalanceSol.toFixed(4)} SOL`}
                  subValue={safeData.walletAddress
                    ? `${safeData.walletAddress.slice(0, 4)}...${safeData.walletAddress.slice(-4)}`
                    : `$${safeData.walletBalanceUsd.toFixed(2)}`}
                  icon="👛"
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
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Current Streak"
                  value={`${safeData.currentStreak} ${safeData.streakType === 'win' ? 'W' : safeData.streakType === 'loss' ? 'L' : '—'}`}
                  subValue={safeData.streakType === 'win' ? 'On fire!' : safeData.streakType === 'loss' ? 'Rough patch' : 'Fresh start'}
                  color={streakColor}
                  icon="🔥"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Divider */}
        <div className="hr-dotted" style={{ margin: '12px 0' }} />

        {/* Bottom Row - Secondary Metrics */}
        <table width="100%" cellPadding={4} cellSpacing={0}>
          <tbody>
            <tr>
              <td width="33%" valign="top">
                <div style={{
                  background: '#F5F5F5',
                  border: '1px solid #CCCCCC',
                  padding: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9px', color: '#666666', marginBottom: '4px' }}>OPEN POSITIONS</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                    {Array.from({ length: safeData.maxPositions }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '2px inset #CCCCCC',
                          background: i < safeData.openPositions
                            ? 'linear-gradient(to bottom, #66CC66 0%, #339933 100%)'
                            : '#E0E0E0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          color: i < safeData.openPositions ? '#FFFFFF' : '#999999'
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
              </td>
              <td width="33%" valign="top">
                <div style={{
                  background: '#F5F5F5',
                  border: '1px solid #CCCCCC',
                  padding: '8px',
                  textAlign: 'center'
                }}>
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
              </td>
              <td width="33%" valign="top">
                <div style={{
                  background: '#F5F5F5',
                  border: '1px solid #CCCCCC',
                  padding: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9px', color: '#666666', marginBottom: '4px' }}>WIN/LOSS RATIO</div>
                  <div style={{
                    background: '#E0E0E0',
                    border: '2px inset #CCCCCC',
                    height: '16px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(to bottom, #66CC66 0%, #339933 100%)',
                      width: `${(safeData.wins / totalWinLoss) * 100}%`,
                      height: '100%',
                      position: 'absolute',
                      left: 0
                    }} />
                    <div style={{
                      background: 'linear-gradient(to bottom, #CC6666 0%, #993333 100%)',
                      width: `${(safeData.losses / totalWinLoss) * 100}%`,
                      height: '100%',
                      position: 'absolute',
                      right: 0
                    }} />
                  </div>
                  <div style={{ fontSize: '8px', color: '#666666', marginTop: '4px' }}>
                    <span style={{ color: '#008800' }}>{safeData.wins} wins</span>
                    {' vs '}
                    <span style={{ color: '#CC0000' }}>{safeData.losses} losses</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
