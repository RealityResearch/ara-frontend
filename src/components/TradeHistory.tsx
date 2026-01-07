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
      case 'win': return '#CCFFCC';
      case 'loss': return '#FFCCCC';
      case 'even': return '#E0E0E0';
      case 'open': return '#CCE5FF';
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
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              <span style={{ marginRight: '8px' }}>TRADE HISTORY</span>
              <span style={{ fontSize: '9px', color: '#008800', marginRight: '8px' }}>
                ● LIVE
              </span>
              <span style={{ fontSize: '10px', color: '#666666', fontWeight: 'normal' }}>
                ({trades.length} trades)
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Content */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', background: '#FFFFFF' }}>
        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table-y2k" style={{ width: '100%', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)' }}>
                <th style={{ padding: '6px 8px', textAlign: 'left', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  Time
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'left', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  Token
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  Side
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'right', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  Amount
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'right', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  PnL
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  Hold
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  Result
                </th>
                <th style={{ padding: '6px 8px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', borderBottom: '2px solid #999999' }}>
                  TX
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedTrades.map((trade, index) => (
                <tr
                  key={trade.id}
                  style={{
                    background: index % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedTrade(selectedTrade?.id === trade.id ? null : trade)}
                >
                  <td style={{ padding: '6px 8px', fontSize: '10px', fontFamily: 'Courier New' }}>
                    <div style={{ color: '#333333' }}>{trade.timestamp}</div>
                    <div style={{ color: '#999999', fontSize: '8px' }}>{trade.date}</div>
                  </td>
                  <td style={{ padding: '6px 8px', fontSize: '11px', fontWeight: 'bold' }}>
                    {trade.tokenSymbol}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 6px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      background: trade.direction === 'BUY'
                        ? 'linear-gradient(to bottom, #66CC66 0%, #339933 100%)'
                        : 'linear-gradient(to bottom, #CC6666 0%, #993333 100%)',
                      color: '#FFFFFF',
                      border: `1px solid ${trade.direction === 'BUY' ? '#228822' : '#882222'}`
                    }}>
                      {trade.direction}
                    </span>
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontSize: '10px', fontFamily: 'Courier New' }}>
                    {(trade.amountSol ?? 0).toFixed(2)} SOL
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'right' }}>
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
                  <td style={{ padding: '6px 8px', textAlign: 'center', fontSize: '10px', fontFamily: 'Courier New', color: '#666666' }}>
                    {trade.holdTime}
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      background: getResultBg(trade.result),
                      color: getResultColor(trade.result),
                      border: `1px solid ${getResultColor(trade.result)}44`
                    }}>
                      {getResultLabel(trade.result)}
                    </span>
                  </td>
                  <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                    <a
                      href={`https://solscan.io/tx/${trade.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ fontSize: '9px', fontFamily: 'Courier New' }}
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
            background: '#FFFFEE',
            borderTop: '2px solid #CCCC99',
            padding: '12px'
          }}>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td width="50%" valign="top">
                    <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', color: '#666600' }}>
                      Trade Details
                    </div>
                    <table style={{ fontSize: '10px' }} cellPadding={2}>
                      <tbody>
                        <tr>
                          <td style={{ color: '#666666' }}>Entry Price:</td>
                          <td style={{ fontFamily: 'Courier New' }}>${(selectedTrade.entryPrice ?? 0).toFixed(6)}</td>
                        </tr>
                        {selectedTrade.exitPrice != null && (
                          <tr>
                            <td style={{ color: '#666666' }}>Exit Price:</td>
                            <td style={{ fontFamily: 'Courier New' }}>${(selectedTrade.exitPrice ?? 0).toFixed(6)}</td>
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
                  </td>
                  <td width="50%" valign="top">
                    <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '4px', color: '#666600' }}>
                      Agent Reasoning
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#333333',
                      background: '#FFFFFF',
                      border: '1px solid #CCCCCC',
                      padding: '6px',
                      fontStyle: 'italic'
                    }}>
                      &ldquo;{selectedTrade.reasoning}&rdquo;
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Show More / Less */}
        {trades.length > maxRows && (
          <div style={{
            borderTop: '1px solid #CCCCCC',
            padding: '8px',
            textAlign: 'center',
            background: '#F5F5F5'
          }}>
            <button
              className="btn-y2k"
              onClick={() => setShowAll(!showAll)}
              style={{ fontSize: '10px' }}
            >
              {showAll ? 'Show Less ▲' : `Show All ${trades.length} Trades ▼`}
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
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📭</div>
            No trades yet. The agent is analyzing markets...
          </div>
        )}
      </div>
    </div>
  );
}
