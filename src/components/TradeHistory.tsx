'use client';

import { useState, useEffect } from 'react';
import { mockTradeHistory, type DetailedTrade } from '@/lib/mockData';

interface Props {
  trades?: DetailedTrade[];
  maxRows?: number;
}

export function TradeHistory({ trades = mockTradeHistory, maxRows = 10 }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<DetailedTrade | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');

  const displayedTrades = showAll ? trades : trades.slice(0, maxRows);

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

  // Calculate stats
  const winCount = trades.filter(t => t.result === 'win').length;
  const lossCount = trades.filter(t => t.result === 'loss').length;
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnlSol ?? 0), 0);

  return (
    <div id="trades" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">TRADE HISTORY</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>{trades.length} TRADES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="bb-time">{currentTime}</span>
          <span className="bb-badge bb-badge-live">LIVE</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bb-grid bb-grid-4" style={{ margin: '2px' }}>
        <div className="bb-stat-box" style={{ padding: '6px' }}>
          <div className="bb-stat-label">TOTAL TRADES</div>
          <div className="bb-stat-value" style={{ fontSize: '14px' }}>{trades.length}</div>
        </div>
        <div className="bb-stat-box" style={{ padding: '6px' }}>
          <div className="bb-stat-label">WINS</div>
          <div className="bb-stat-value bb-positive" style={{ fontSize: '14px' }}>{winCount}</div>
        </div>
        <div className="bb-stat-box" style={{ padding: '6px' }}>
          <div className="bb-stat-label">LOSSES</div>
          <div className="bb-stat-value bb-negative" style={{ fontSize: '14px' }}>{lossCount}</div>
        </div>
        <div className="bb-stat-box" style={{ padding: '6px' }}>
          <div className="bb-stat-label">TOTAL P&L</div>
          <div className={`bb-stat-value ${totalPnl >= 0 ? 'bb-positive' : 'bb-negative'}`} style={{ fontSize: '14px' }}>
            {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(3)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="bb-table" style={{ minWidth: '700px' }}>
          <thead>
            <tr>
              <th>TIME</th>
              <th>TOKEN</th>
              <th style={{ textAlign: 'center' }}>SIDE</th>
              <th style={{ textAlign: 'right' }}>AMOUNT</th>
              <th style={{ textAlign: 'right' }}>P&L</th>
              <th style={{ textAlign: 'center' }}>HOLD</th>
              <th style={{ textAlign: 'center' }}>RESULT</th>
              <th style={{ textAlign: 'right' }}>TX</th>
            </tr>
          </thead>
          <tbody>
            {displayedTrades.map((trade) => (
              <tr
                key={trade.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedTrade(selectedTrade?.id === trade.id ? null : trade)}
              >
                <td style={{ fontFamily: 'Courier New' }}>
                  <div style={{ color: '#ffaa00' }}>{trade.timestamp}</div>
                  <div style={{ color: '#666666', fontSize: '8px' }}>{trade.date}</div>
                </td>
                <td>
                  <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{trade.tokenSymbol}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    background: trade.direction === 'BUY' ? '#00aa00' : '#aa0000',
                    color: '#ffffff',
                  }}>
                    {trade.direction}
                  </span>
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                  {(trade.amountSol ?? 0).toFixed(3)} <span style={{ color: '#666666' }}>SOL</span>
                </td>
                <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                  <span className={(trade.pnlSol ?? 0) >= 0 ? 'bb-positive' : 'bb-negative'}>
                    {(trade.pnlSol ?? 0) >= 0 ? '+' : ''}{(trade.pnlSol ?? 0).toFixed(3)}
                  </span>
                  <div style={{ fontSize: '8px' }} className={(trade.pnlPercent ?? 0) >= 0 ? 'bb-positive' : 'bb-negative'}>
                    ({(trade.pnlPercent ?? 0) >= 0 ? '+' : ''}{(trade.pnlPercent ?? 0).toFixed(1)}%)
                  </div>
                </td>
                <td style={{ textAlign: 'center', fontFamily: 'Courier New', color: '#666666' }}>
                  {trade.holdTime}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    background: trade.result === 'win' ? '#00aa00' :
                               trade.result === 'loss' ? '#aa0000' :
                               trade.result === 'open' ? '#0066aa' : '#666666',
                    color: '#ffffff',
                  }}>
                    {trade.result.toUpperCase()}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <a
                    href={`https://solscan.io/tx/${trade.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: '9px', fontFamily: 'Courier New', color: '#3399ff' }}
                  >
                    {trade.txHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Trade Detail */}
      {selectedTrade && (
        <div style={{
          background: '#0d0d0d',
          borderTop: '1px solid #ff6600',
          padding: '12px'
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>
                TRADE DETAILS
              </div>
              <table className="bb-table" style={{ fontSize: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#666666' }}>ENTRY PRICE</td>
                    <td style={{ textAlign: 'right', fontFamily: 'Courier New', color: '#ffffff' }}>
                      ${(selectedTrade.entryPrice ?? 0).toFixed(8)}
                    </td>
                  </tr>
                  {selectedTrade.exitPrice != null && (
                    <tr>
                      <td style={{ color: '#666666' }}>EXIT PRICE</td>
                      <td style={{ textAlign: 'right', fontFamily: 'Courier New', color: '#ffffff' }}>
                        ${(selectedTrade.exitPrice ?? 0).toFixed(8)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ color: '#666666' }}>STATUS</td>
                    <td style={{ textAlign: 'right' }} className={
                      selectedTrade.result === 'win' ? 'bb-positive' :
                      selectedTrade.result === 'loss' ? 'bb-negative' : 'bb-info'
                    }>
                      {selectedTrade.status.toUpperCase()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px', marginBottom: '8px' }}>
                AGENT REASONING
              </div>
              <div style={{
                background: '#000000',
                border: '1px solid #333333',
                padding: '8px',
                fontSize: '10px',
                color: '#ff6600',
                fontFamily: 'Courier New',
                lineHeight: '1.4',
              }}>
                &quot;{selectedTrade.reasoning}&quot;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show More / Function Keys */}
      <div className="bb-function-keys">
        {trades.length > maxRows && (
          <button className="bb-fkey" onClick={() => setShowAll(!showAll)}>
            <span className="bb-fkey-label">F1</span>
            {showAll ? 'LESS' : 'MORE'}
          </button>
        )}
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          FILTER
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F3</span>
          EXPORT
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Empty State */}
      {trades.length === 0 && (
        <div style={{
          padding: '24px',
          textAlign: 'center',
          color: '#ff6600',
          fontSize: '11px',
          fontFamily: 'Courier New',
        }}>
          <div style={{ marginBottom: '8px' }}>NO TRADES RECORDED</div>
          <div style={{ color: '#666666', fontSize: '10px' }}>Agent is analyzing markets...</div>
        </div>
      )}

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>TRADES GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
