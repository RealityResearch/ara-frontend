'use client';

import { mockPerformance, type PerformanceData } from '@/lib/mockData';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
  icon?: string;
}

function MetricCard({ label, value, subValue, color = '#b86b4a', icon }: MetricCardProps) {
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
  const pnlColor = data.totalPnlSol >= 0 ? '#008800' : '#CC0000';
  const streakColor = data.streakType === 'win' ? '#008800' : data.streakType === 'loss' ? '#CC0000' : '#666666';

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
                  value={`${data.winRate.toFixed(1)}%`}
                  subValue={`${data.wins}W / ${data.losses}L / ${data.even}E`}
                  color={data.winRate >= 50 ? '#008800' : '#CC0000'}
                  icon="🎯"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Total PnL"
                  value={`${data.totalPnlSol >= 0 ? '+' : ''}${data.totalPnlSol.toFixed(2)} SOL`}
                  subValue={`$${data.totalPnlUsd.toFixed(2)}`}
                  color={pnlColor}
                  icon="💰"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Total Trades"
                  value={data.totalTrades}
                  subValue={`Avg hold: ${data.avgHoldTime}`}
                  icon="📊"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Wallet Balance"
                  value={`${data.walletBalanceSol} SOL`}
                  subValue={`$${data.walletBalanceUsd.toFixed(2)}`}
                  icon="👛"
                />
              </td>
              <td width="20%" valign="top">
                <MetricCard
                  label="Current Streak"
                  value={`${data.currentStreak} ${data.streakType === 'win' ? 'W' : data.streakType === 'loss' ? 'L' : '—'}`}
                  subValue={data.streakType === 'win' ? 'On fire!' : data.streakType === 'loss' ? 'Rough patch' : 'Fresh start'}
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
                    {Array.from({ length: data.maxPositions }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '2px inset #CCCCCC',
                          background: i < data.openPositions
                            ? 'linear-gradient(to bottom, #66CC66 0%, #339933 100%)'
                            : '#E0E0E0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          color: i < data.openPositions ? '#FFFFFF' : '#999999'
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '9px', color: '#666666', marginTop: '4px' }}>
                    {data.openPositions} / {data.maxPositions} slots used
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
                        +{data.bestTrade.toFixed(1)}%
                      </span>
                      <div style={{ fontSize: '8px', color: '#666666' }}>Best</div>
                    </div>
                    <div style={{ borderLeft: '1px dotted #CCCCCC', paddingLeft: '16px' }}>
                      <span style={{ color: '#CC0000', fontWeight: 'bold', fontSize: '14px' }}>
                        {data.worstTrade.toFixed(1)}%
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
                      width: `${(data.wins / (data.wins + data.losses)) * 100}%`,
                      height: '100%',
                      position: 'absolute',
                      left: 0
                    }} />
                    <div style={{
                      background: 'linear-gradient(to bottom, #CC6666 0%, #993333 100%)',
                      width: `${(data.losses / (data.wins + data.losses)) * 100}%`,
                      height: '100%',
                      position: 'absolute',
                      right: 0
                    }} />
                  </div>
                  <div style={{ fontSize: '8px', color: '#666666', marginTop: '4px' }}>
                    <span style={{ color: '#008800' }}>{data.wins} wins</span>
                    {' vs '}
                    <span style={{ color: '#CC0000' }}>{data.losses} losses</span>
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
