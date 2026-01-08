'use client';

import { useState } from 'react';
import { mockTradeHistory, type DetailedTrade } from '@/lib/mockData';

interface Props {
  trades?: DetailedTrade[];
  maxRows?: number;
}

export function TradeHistory({ trades = mockTradeHistory, maxRows = 10 }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<DetailedTrade | null>(null);

  const displayedTrades = showAll ? trades : trades.slice(0, maxRows);

  const getResultColor = (result: DetailedTrade['result']) => {
    switch (result) {
      case 'win': return '#008800';
      case 'loss': return '#CC0000';
      case 'even': return '#666666';
      case 'open': return '#0066CC';
    }
  };

  const getResultBg = (result: DetailedTrade['result']) => {
    switch (result) {
      case 'win': return 'linear-gradient(180deg, #66CC66 0%, #44AA44 100%)';
      case 'loss': return 'linear-gradient(180deg, #CC6666 0%, #AA4444 100%)';
      case 'even': return 'linear-gradient(180deg, #AAAAAA 0%, #888888 100%)';
      case 'open': return 'linear-gradient(180deg, #6699CC 0%, #4477AA 100%)';
    }
  };

  const getResultLabel = (result: DetailedTrade['result']) => {
    switch (result) {
      case 'win': return 'WIN';
      case 'loss': return 'LOSS';
      case 'even': return 'EVEN';
      case 'open': return 'OPEN';
    }
  };

  return (
    <div id="trades" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        <span style={{ marginRight: '8px' }}>TRADE HISTORY</span>
        <span style={{ fontSize: '9px', color: '#66FF66', marginRight: '8px' }}>
          LIVE
        </span>
        <span style={{ fontSize: '10px', color: '#99CCFF', fontWeight: 'normal' }}>
          ({trades.length} trades)
        </span>
      </div>

      {/* Main Content */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', padding: 0 }}>
        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse' }}>
            <thead>
              <tr className="skeu-metallic">
                <th style={{ padding: '8px', textAlign: 'left', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  Time
                </th>
                <th style={{ padding: '8px', textAlign: 'left', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  Token
                </th>
                <th style={{ padding: '8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  Side
                </th>
                <th style={{ padding: '8px', textAlign: 'right', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  Amount
                </th>
                <th style={{ padding: '8px', textAlign: 'right', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  PnL
                </th>
                <th style={{ padding: '8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  Hold
                </th>
                <th style={{ padding: '8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  Result
                </th>
                <th style={{ padding: '8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '1px solid #808080' }}>
                  TX
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedTrades.map((trade, index) => (
                <tr
                  key={trade.id}
                  style={{
                    background: index % 2 === 0 ? '#f8f8f8' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'background 0.1s'
                  }}
                  onClick={() => setSelectedTrade(selectedTrade?.id === trade.id ? null : trade)}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e8f0ff'}
                  onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? '#f8f8f8' : '#ffffff'}
                >
                  <td style={{ padding: '8px', fontSize: '10px', fontFamily: 'Courier New' }}>
                    <div style={{ color: '#333333' }}>{trade.timestamp}</div>
                    <div style={{ color: '#999999', fontSize: '8px' }}>{trade.date}</div>
                  </td>
                  <td style={{ padding: '8px', fontSize: '11px', fontWeight: 'bold' }}>
                    {trade.tokenSymbol}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span className="skeu-btn" style={{
                      padding: '2px 8px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      background: trade.direction === 'BUY'
                        ? 'linear-gradient(180deg, #66CC66 0%, #449944 50%, #338833 100%)'
                        : 'linear-gradient(180deg, #CC6666 0%, #994444 50%, #883333 100%)',
                      color: '#FFFFFF',
                      border: `1px solid ${trade.direction === 'BUY' ? '#228822' : '#882222'}`,
                      textShadow: '0 -1px 0 rgba(0,0,0,0.3)'
                    }}>
                      {trade.direction}
                    </span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right', fontSize: '10px', fontFamily: 'Courier New' }}>
                    {(trade.amountSol ?? 0).toFixed(2)} SOL
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>
                    <div style={{
                      fontSize: '10px',
                      fontFamily: 'Courier New',
                      fontWeight: 'bold',
                      color: (trade.pnlSol ?? 0) >= 0 ? '#008800' : '#CC0000'
                    }}>
                      {(trade.pnlSol ?? 0) >= 0 ? '+' : ''}{(trade.pnlSol ?? 0).toFixed(3)} SOL
                    </div>
                    <div style={{
                      fontSize: '9px',
                      color: (trade.pnlPercent ?? 0) >= 0 ? '#008800' : '#CC0000'
                    }}>
                      ({(trade.pnlPercent ?? 0) >= 0 ? '+' : ''}{(trade.pnlPercent ?? 0).toFixed(1)}%)
                    </div>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center', fontSize: '10px', fontFamily: 'Courier New', color: '#666666' }}>
                    {trade.holdTime}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span className="skeu-btn" style={{
                      padding: '2px 10px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      background: getResultBg(trade.result),
                      color: '#FFFFFF',
                      border: `1px solid ${getResultColor(trade.result)}`,
                      textShadow: '0 -1px 0 rgba(0,0,0,0.3)'
                    }}>
                      {getResultLabel(trade.result)}
                    </span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <a
                      href={`https://solscan.io/tx/${trade.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: '9px', fontFamily: 'Courier New', color: '#0066CC' }}
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
            background: 'linear-gradient(180deg, #fffde8 0%, #fff8d0 100%)',
            borderTop: '2px solid #d4a574',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', color: '#996600' }}>
                  Trade Details
                </div>
                <div className="skeu-panel" style={{ padding: '8px', fontSize: '10px' }}>
                  <table cellPadding={2}>
                    <tbody>
                      <tr>
                        <td style={{ color: '#666666' }}>Entry Price:</td>
                        <td style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>${(selectedTrade.entryPrice ?? 0).toFixed(6)}</td>
                      </tr>
                      {selectedTrade.exitPrice != null && (
                        <tr>
                          <td style={{ color: '#666666' }}>Exit Price:</td>
                          <td style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>${(selectedTrade.exitPrice ?? 0).toFixed(6)}</td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ color: '#666666' }}>Status:</td>
                        <td style={{ fontWeight: 'bold', color: getResultColor(selectedTrade.result) }}>
                          {selectedTrade.status.toUpperCase()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', color: '#996600' }}>
                  Agent Reasoning
                </div>
                <div className="skeu-panel" style={{
                  padding: '8px',
                  fontSize: '10px',
                  color: '#333333',
                  fontStyle: 'italic'
                }}>
                  &ldquo;{selectedTrade.reasoning}&rdquo;
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show More / Less */}
        {trades.length > maxRows && (
          <div style={{
            borderTop: '1px solid #a0a0a0',
            padding: '8px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)'
          }}>
            <button
              className="skeu-btn"
              onClick={() => setShowAll(!showAll)}
              style={{ fontSize: '10px' }}
            >
              {showAll ? 'Show Less' : `Show All ${trades.length} Trades`}
            </button>
          </div>
        )}

        {/* Empty State */}
        {trades.length === 0 && (
          <div style={{
            padding: '24px',
            textAlign: 'center',
            color: '#666666',
            fontSize: '11px'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>...</div>
            No trades yet. The agent is analyzing markets...
          </div>
        )}
      </div>
    </div>
  );
}
