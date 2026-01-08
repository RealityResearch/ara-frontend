'use client';

import { useState, useEffect, useRef } from 'react';

interface DiscoveredToken {
  address: string;
  name: string;
  symbol: string;
  description: string;
  priceUsd: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  txns24h: { buys: number; sells: number };
  pairCreatedAt: number;
  boostAmount?: number;
  score: number;
  flags: string[];
  url: string;
}

interface DiscoveryThought {
  timestamp: number;
  content: string;
  type: 'scanning' | 'analysis' | 'alert' | 'decision';
}

export function DiscoveryPanel() {
  const [tokens, setTokens] = useState<DiscoveredToken[]>([]);
  const [thoughts, setThoughts] = useState<DiscoveryThought[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<number | null>(null);
  const thoughtsRef = useRef<HTMLDivElement>(null);

  const WS_URL = process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === 'discovery_update') {
          setTokens(msg.tokens || []);
          setLastScan(msg.timestamp);
          setIsScanning(false);
        }

        if (msg.type === 'discovery_thought') {
          const thought: DiscoveryThought = {
            timestamp: msg.timestamp,
            content: msg.content,
            type: msg.thoughtType || 'analysis',
          };
          setThoughts(prev => [...prev.slice(-20), thought]);
        }

        if (msg.type === 'discovery_scanning') {
          setIsScanning(true);
        }

        if (msg.type === 'thought' || msg.type === 'analysis') {
          const content = msg.content || '';
          if (content.toLowerCase().includes('discover') ||
              content.toLowerCase().includes('scan') ||
              content.toLowerCase().includes('found') ||
              content.toLowerCase().includes('potential') ||
              content.toLowerCase().includes('opportunity')) {
            const thought: DiscoveryThought = {
              timestamp: msg.timestamp || Date.now(),
              content: content,
              type: 'analysis',
            };
            setThoughts(prev => [...prev.slice(-20), thought]);
          }
        }
      } catch (e) {
        console.error('Error parsing discovery message:', e);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [WS_URL]);

  useEffect(() => {
    if (thoughtsRef.current) {
      thoughtsRef.current.scrollTop = thoughtsRef.current.scrollHeight;
    }
  }, [thoughts]);

  const formatPrice = (price: number | undefined | null): string => {
    if (price == null || isNaN(price)) return '$0.00';
    if (price < 0.00001) return price.toExponential(2);
    if (price < 0.001) return price.toFixed(8);
    return price.toFixed(6);
  };

  const formatK = (num: number | undefined | null): string => {
    if (num == null || isNaN(num)) return '$0';
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const getScoreColor = (score: number | undefined | null): string => {
    if (score == null) return '#999999';
    if (score >= 90) return '#00FF00';
    if (score >= 70) return '#AAFF00';
    if (score >= 50) return '#FFAA00';
    return '#FF6666';
  };

  const formatTime = (ts: number): string => {
    return new Date(ts).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div id="discovery" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        Token Discovery
        <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#66FF66' : '#FFAA00' }}>
          {isScanning ? 'SCANNING...' : isConnected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Main Panel */}
      <div className="skeu-window" style={{ borderRadius: '0 0 8px 8px' }}>
        {/* Title Bar */}
        <div className="skeu-window-titlebar">
          <span>DexScreener Scanner - 2X Targets</span>
          <span style={{ fontSize: '9px', color: '#99CCFF', fontWeight: 'normal' }}>
            {lastScan ? `Last scan: ${formatTime(lastScan)}` : 'Waiting for data...'}
          </span>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: '8px', padding: '8px' }}>
          {/* Left: Agent Thoughts */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <div className="skeu-panel" style={{ padding: 0, height: '200px', display: 'flex', flexDirection: 'column' }}>
              <div className="skeu-section-header" style={{ padding: '4px 8px', fontSize: '9px', borderRadius: '4px 4px 0 0' }}>
                AGENT THOUGHTS
              </div>
              <div
                ref={thoughtsRef}
                className="skeu-terminal"
                style={{
                  flex: 1,
                  overflow: 'auto',
                  padding: '8px',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '10px',
                  borderRadius: '0 0 4px 4px',
                }}
              >
                {thoughts.length === 0 ? (
                  <div style={{ color: '#666666', fontStyle: 'italic' }}>
                    Waiting for agent analysis...
                  </div>
                ) : (
                  thoughts.map((t, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      <span style={{ color: '#666666' }}>[{formatTime(t.timestamp)}]</span>
                      {' '}
                      <span style={{
                        color: t.type === 'alert' ? '#FF6666' :
                               t.type === 'decision' ? '#00CCCC' :
                               t.type === 'scanning' ? '#FFAA00' : '#00AA00'
                      }}>
                        {t.content}
                      </span>
                    </div>
                  ))
                )}
                {isScanning && (
                  <div style={{ color: '#FFAA00' }}>
                    <span className="blink">*</span> Scanning DexScreener...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Token List */}
          <div style={{ flex: '1.5', minWidth: '0' }}>
            <div className="skeu-panel" style={{ padding: 0, height: '200px', overflow: 'auto' }}>
              <table width="100%" cellPadding={2} cellSpacing={0} style={{ fontSize: '9px' }}>
                <thead>
                  <tr className="skeu-metallic" style={{ position: 'sticky', top: 0 }}>
                    <th style={{ textAlign: 'left', padding: '6px 4px', fontWeight: 'bold' }}>Token</th>
                    <th style={{ textAlign: 'right', padding: '6px 4px', fontWeight: 'bold' }}>Score</th>
                    <th style={{ textAlign: 'right', padding: '6px 4px', fontWeight: 'bold' }}>Price</th>
                    <th style={{ textAlign: 'right', padding: '6px 4px', fontWeight: 'bold' }}>24h</th>
                    <th style={{ textAlign: 'right', padding: '6px 4px', fontWeight: 'bold' }}>Vol/Liq</th>
                    <th style={{ textAlign: 'center', padding: '6px 4px', fontWeight: 'bold' }}>Buy%</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#999999' }}>
                        No tokens found matching criteria
                      </td>
                    </tr>
                  ) : (
                    tokens.map((t, i) => {
                      const buys = t.txns24h?.buys ?? 0;
                      const sells = t.txns24h?.sells ?? 0;
                      const buyRatio = buys + sells > 0 ? Math.round(buys / (buys + sells) * 100) : 50;
                      const volLiqRatio = t.liquidity > 0 ? (t.volume24h / t.liquidity).toFixed(1) : '0.0';
                      const hasFlags = (t.flags?.length ?? 0) > 0;

                      return (
                        <tr
                          key={t.address}
                          style={{
                            background: i % 2 === 0 ? '#ffffff' : '#f8f8f8',
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(t.url || `https://dexscreener.com/solana/${t.address}`, '_blank')}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#e8f0ff'}
                          onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? '#ffffff' : '#f8f8f8'}
                        >
                          <td style={{ padding: '4px' }}>
                            <div style={{ fontWeight: 'bold' }}>
                              {t.symbol}
                              {hasFlags && <span style={{ color: '#FF6600', marginLeft: '4px' }}>!</span>}
                            </div>
                            <div style={{ color: '#666666', fontSize: '8px' }}>
                              {(t.name ?? '').slice(0, 15)}{(t.name?.length ?? 0) > 15 ? '...' : ''}
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <span className="skeu-btn" style={{
                              padding: '1px 6px',
                              fontSize: '9px',
                              fontWeight: 'bold',
                              background: `linear-gradient(180deg, ${getScoreColor(t.score)} 0%, ${getScoreColor(t.score)}BB 100%)`,
                              color: '#000000',
                            }}>
                              {t.score}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                            ${formatPrice(t.priceUsd)}
                          </td>
                          <td style={{
                            textAlign: 'right',
                            color: (t.priceChange24h ?? 0) >= 0 ? '#008800' : '#CC0000',
                            fontWeight: 'bold'
                          }}>
                            {(t.priceChange24h ?? 0) >= 0 ? '+' : ''}{(t.priceChange24h ?? 0).toFixed(0)}%
                          </td>
                          <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                            {volLiqRatio}x
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{
                              color: buyRatio >= 55 ? '#008800' : buyRatio >= 50 ? '#666666' : '#CC0000'
                            }}>
                              {buyRatio}%
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Filter Info */}
        <div className="skeu-metallic" style={{
          borderTop: '1px solid #a0a0a0',
          padding: '6px 8px',
          fontSize: '9px',
          color: '#666666',
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '0 0 8px 8px'
        }}>
          <span>Filters: &gt;$50K liq | &gt;$100K vol | &gt;50% buys | Not dumping</span>
          <span>Click token to open DexScreener</span>
        </div>
      </div>
    </div>
  );
}
