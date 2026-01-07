'use client';

import { mockWalletStats, mockTrades } from '@/lib/mockData';

export function WalletDisplay() {
  const stats = mockWalletStats;
  const trades = mockTrades;

  return (
    <div id="portfolio" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              Agent Portfolio
            </td>
          </tr>
        </tbody>
      </table>

      {/* Two Column Layout */}
      <table width="100%" cellPadding={8} cellSpacing={0} style={{ border: '1px solid #CCCCCC' }}>
        <tbody>
          <tr>
            {/* Left Column - Account Summary */}
            <td width="50%" valign="top" style={{ background: '#FFFFFF', borderRight: '1px solid #CCCCCC' }}>
              <div className="fieldset-y2k">
                <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                  Account Summary
                </div>

                {/* Balance Display */}
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '9px', color: '#666666', textTransform: 'uppercase' }}>
                    Total Portfolio Value
                  </div>
                  <div style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#003399'
                  }}>
                    {stats.balance} <span style={{ fontSize: '14px', color: '#FF9900' }}>SOL</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666666' }}>
                    ≈ ${stats.balanceUSD}
                  </div>
                </div>

                <div className="hr-dotted" />

                {/* P&L Table */}
                <table className="table-y2k" style={{ marginBottom: '8px' }}>
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>P&amp;L</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>24 Hour</td>
                      <td className={stats.pnlDay >= 0 ? 'text-positive' : 'text-negative'}>
                        {stats.pnlDay >= 0 ? '+' : ''}{stats.pnlDay.toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td>7 Day</td>
                      <td className={stats.pnlWeek >= 0 ? 'text-positive' : 'text-negative'}>
                        {stats.pnlWeek >= 0 ? '+' : ''}{stats.pnlWeek.toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td>30 Day</td>
                      <td className={stats.pnlMonth >= 0 ? 'text-positive' : 'text-negative'}>
                        {stats.pnlMonth >= 0 ? '+' : ''}{stats.pnlMonth.toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Stats Row */}
                <table width="100%" cellPadding={4} cellSpacing={0} style={{ fontSize: '10px' }}>
                  <tbody>
                    <tr>
                      <td align="center" style={{ borderRight: '1px dotted #CCCCCC' }}>
                        <div style={{ color: '#666666' }}>Total Trades</div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{stats.totalTrades}</div>
                      </td>
                      <td align="center" style={{ borderRight: '1px dotted #CCCCCC' }}>
                        <div style={{ color: '#666666' }}>Win Rate</div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#008800' }}>{stats.winRate}%</div>
                      </td>
                      <td align="center">
                        <div style={{ color: '#666666' }}>Status</div>
                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#008800' }}>ACTIVE</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>

            {/* Right Column - Recent Trades */}
            <td width="50%" valign="top" style={{ background: '#F8F8F8' }}>
              <div className="fieldset-y2k">
                <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                  Recent Trades
                </div>

                <table className="table-y2k">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Token</th>
                      <th>Side</th>
                      <th>Amount</th>
                      <th>P&amp;L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((trade, index) => (
                      <tr key={trade.id}>
                        <td style={{ fontFamily: 'Courier New, monospace', fontSize: '10px' }}>
                          {trade.timestamp}
                          {index === 0 && <span style={{ color: '#008800' }}> ●</span>}
                        </td>
                        <td style={{ fontWeight: 'bold', color: '#003366' }}>{trade.token}</td>
                        <td>
                          <span style={{
                            background: trade.direction === 'BUY' ? '#CCFFCC' : '#FFCCCC',
                            border: `1px solid ${trade.direction === 'BUY' ? '#009900' : '#CC0000'}`,
                            padding: '1px 4px',
                            fontSize: '9px',
                            fontWeight: 'bold'
                          }}>
                            {trade.direction}
                          </span>
                        </td>
                        <td style={{ fontSize: '10px' }}>{trade.amount} @ {trade.price}</td>
                        <td className={trade.result >= 0 ? 'text-positive' : 'text-negative'}>
                          {trade.result >= 0 ? '+' : ''}{trade.result.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                  <a href="#" style={{ color: '#003399', fontSize: '10px' }}>View Full History →</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Performance Chart */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', padding: '8px', background: '#FFFFFF' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#003366' }}>
          30-Day Performance Chart
        </div>
        <div className="panel-inset-y2k" style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: '#008800' }}>
          <pre style={{ margin: 0, textAlign: 'center' }}>{`
    $1,400 ┤                                    ╭──────
    $1,300 ┤                         ╭──────────╯
    $1,200 ┤              ╭──────────╯
    $1,100 ┤    ╭─────────╯
    $1,000 ┼────╯
           └──────────────────────────────────────────
            Week 1    Week 2    Week 3    Week 4
          `}</pre>
          <div style={{ textAlign: 'center', color: '#666666', fontSize: '9px', marginTop: '4px' }}>
            <span style={{ color: '#008800', fontWeight: 'bold' }}>+47.3% Portfolio Growth</span> | Avg. Daily Return: +1.58%
          </div>
        </div>
      </div>
    </div>
  );
}
