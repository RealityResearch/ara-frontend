'use client';

import { useState, useEffect } from 'react';

export interface TradeNotification {
  id: string;
  type: 'BUY' | 'SELL';
  token: string;
  amount: string;
  price?: string;
  reasoning?: string;
  timestamp: number;
}

interface TradePopupProps {
  wsUrl?: string;
}

export function TradePopup({ wsUrl }: TradePopupProps) {
  const [trades, setTrades] = useState<TradeNotification[]>([]);
  const [currentTrade, setCurrentTrade] = useState<TradeNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const WS_URL = wsUrl || process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // Look for trade-related messages
        if (message.type === 'action' && message.content) {
          const content = message.content.toLowerCase();

          // Detect trade execution messages
          if (content.includes('execute_trade') || content.includes('executed') ||
              content.includes('bought') || content.includes('sold') ||
              content.includes('buying') || content.includes('selling')) {

            // Parse trade info from message
            const isBuy = content.includes('buy') || content.includes('bought');
            const isSell = content.includes('sell') || content.includes('sold');

            if (isBuy || isSell) {
              // Try to extract token symbol (look for common patterns)
              const tokenMatch = message.content.match(/(?:bought|sold|buying|selling)\s+(\d*\.?\d+)\s*(?:SOL\s+(?:of|worth))?\s*(\w+)/i) ||
                                 message.content.match(/(\w+)\s+(?:for|at)/i);

              const trade: TradeNotification = {
                id: `trade-${Date.now()}`,
                type: isBuy ? 'BUY' : 'SELL',
                token: tokenMatch ? tokenMatch[2] || tokenMatch[1] : 'TOKEN',
                amount: tokenMatch ? tokenMatch[1] : '???',
                reasoning: message.content,
                timestamp: message.timestamp || Date.now(),
              };

              setTrades(prev => [...prev, trade]);
              setCurrentTrade(trade);
              setIsVisible(true);

              // Auto-hide after 8 seconds
              setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => setCurrentTrade(null), 500);
              }, 8000);
            }
          }
        }

        // Also catch direct trade messages
        if (message.type === 'trade' || (message.metadata?.action === 'buy' || message.metadata?.action === 'sell')) {
          const trade: TradeNotification = {
            id: `trade-${Date.now()}`,
            type: message.metadata?.action === 'sell' ? 'SELL' : 'BUY',
            token: message.metadata?.token || 'TOKEN',
            amount: message.metadata?.amount || '???',
            reasoning: message.content,
            timestamp: message.timestamp || Date.now(),
          };

          setTrades(prev => [...prev, trade]);
          setCurrentTrade(trade);
          setIsVisible(true);

          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setCurrentTrade(null), 500);
          }, 8000);
        }
      } catch (e) {
        // Ignore parse errors
      }
    };

    return () => {
      socket.close();
    };
  }, [WS_URL]);

  if (!currentTrade) return null;

  const isBuy = currentTrade.type === 'BUY';

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        onClick={() => setIsVisible(false)}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: isVisible
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -50%) scale(0.8)',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s ease',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {/* Y2K Style Window */}
        <div style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)',
          border: '3px outset #ffffff',
          borderRadius: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 #ffffff',
          minWidth: '400px',
          maxWidth: '500px',
        }}>
          {/* Title Bar */}
          <div style={{
            background: isBuy
              ? 'linear-gradient(90deg, #006600 0%, #008800 50%, #006600 100%)'
              : 'linear-gradient(90deg, #CC0000 0%, #EE0000 50%, #CC0000 100%)',
            padding: '8px 12px',
            borderRadius: '5px 5px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '14px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontFamily: 'Tahoma, sans-serif',
            }}>
              {isBuy ? '🟢 TRADE EXECUTED - BUY' : '🔴 TRADE EXECUTED - SELL'}
            </span>
            <button
              onClick={() => setIsVisible(false)}
              style={{
                background: 'linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 100%)',
                border: '2px outset #ffffff',
                borderRadius: '3px',
                padding: '2px 8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            >
              X
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '16px' }}>
            {/* Big Token Display */}
            <div style={{
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                fontFamily: 'Courier New, monospace',
                color: isBuy ? '#006600' : '#CC0000',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                animation: 'pulse 1s ease-in-out infinite',
              }}>
                {currentTrade.token}
              </div>
              <div style={{
                fontSize: '24px',
                color: '#333333',
                fontWeight: 'bold',
              }}>
                {isBuy ? 'BOUGHT' : 'SOLD'}
              </div>
            </div>

            {/* Details */}
            <div style={{
              background: '#ffffff',
              border: '2px inset #a0a0a0',
              borderRadius: '4px',
              padding: '12px',
              marginBottom: '12px',
            }}>
              <table style={{ width: '100%', fontSize: '12px' }}>
                <tbody>
                  <tr>
                    <td style={{ color: '#666666', padding: '4px 0' }}>Action:</td>
                    <td style={{
                      fontWeight: 'bold',
                      color: isBuy ? '#006600' : '#CC0000',
                    }}>
                      {currentTrade.type}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: '#666666', padding: '4px 0' }}>Token:</td>
                    <td style={{ fontWeight: 'bold' }}>{currentTrade.token}</td>
                  </tr>
                  <tr>
                    <td style={{ color: '#666666', padding: '4px 0' }}>Time:</td>
                    <td>{new Date(currentTrade.timestamp).toLocaleTimeString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Reasoning */}
            {currentTrade.reasoning && (
              <div style={{
                background: 'linear-gradient(180deg, #fffff0 0%, #ffffd0 100%)',
                border: '1px solid #cccc00',
                borderRadius: '4px',
                padding: '8px',
                fontSize: '10px',
                fontFamily: 'Courier New, monospace',
                color: '#666600',
                maxHeight: '80px',
                overflow: 'auto',
              }}>
                <strong>Agent Reasoning:</strong><br />
                {currentTrade.reasoning.slice(0, 200)}
                {currentTrade.reasoning.length > 200 ? '...' : ''}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            background: 'linear-gradient(180deg, #d0d0d0 0%, #b0b0b0 100%)',
            padding: '8px 16px',
            borderTop: '1px solid #a0a0a0',
            borderRadius: '0 0 5px 5px',
            textAlign: 'center',
            fontSize: '10px',
            color: '#666666',
          }}>
            Claude Investments - Autonomous Trading Agent
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </>
  );
}
