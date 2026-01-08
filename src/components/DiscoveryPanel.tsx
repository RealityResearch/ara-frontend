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

        // Handle discovery data
        if (msg.type === 'discovery_update') {
          setTokens(msg.tokens || []);
          setLastScan(msg.timestamp);
          setIsScanning(false);
        }

        // Handle discovery thoughts from agent
        if (msg.type === 'discovery_thought') {
          const thought: DiscoveryThought = {
            timestamp: msg.timestamp,
            content: msg.content,
            type: msg.thoughtType || 'analysis',
          };
          setThoughts(prev => [...prev.slice(-20), thought]);
        }

        // Handle scanning status
        if (msg.type === 'discovery_scanning') {
          setIsScanning(true);
        }

        // Also capture relevant agent thoughts about discovery
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

  // Auto-scroll thoughts
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
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              Token Discovery
              <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#008800' : '#FF8800' }}>
                {isScanning ? '● SCANNING...' : isConnected ? '● LIVE' : '● OFFLINE'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Panel */}
      <div style={{ border: '2px outset #CCCCCC', background: '#F5F5F5', padding: '2px' }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(to right, #000080 0%, #1084D0 100%)',
          padding: '2px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '11px' }}>
            🔍 DexScreener Scanner - 2X Targets
          </span>
          <span style={{ color: '#99CCFF', fontSize: '9px' }}>
            {lastScan ? `Last scan: ${formatTime(lastScan)}` : 'Waiting for data...'}
          </span>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: '4px', padding: '4px' }}>
          {/* Left: Agent Thoughts */}
          <div style={{ flex: '1', minWidth: '0' }}>
            <div style={{
              background: '#001122',
              border: '2px inset #333333',
              height: '200px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                background: '#002244',
                padding: '2px 6px',
                fontSize: '9px',
                color: '#99CCFF',
                borderBottom: '1px solid #003366'
              }}>
                AGENT THOUGHTS
              </div>
              <div
                ref={thoughtsRef}
                style={{
                  flex: 1,
                  overflow: 'auto',
                  padding: '6px',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '10px',
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
                    <span className="blink">●</span> Scanning DexScreener...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Token List */}
          <div style={{ flex: '1.5', minWidth: '0' }}>
            <div style={{
              background: '#FFFFFF',
              border: '2px inset #CCCCCC',
              height: '200px',
              overflow: 'auto',
            }}>
              <table width="100%" cellPadding={2} cellSpacing={0} style={{ fontSize: '9px' }}>
                <thead>
                  <tr style={{ background: '#E0E0E0', position: 'sticky', top: 0 }}>
                    <th style={{ textAlign: 'left', padding: '4px' }}>Token</th>
                    <th style={{ textAlign: 'right' }}>Score</th>
                    <th style={{ textAlign: 'right' }}>Price</th>
                    <th style={{ textAlign: 'right' }}>24h</th>
                    <th style={{ textAlign: 'right' }}>Vol/Liq</th>
                    <th style={{ textAlign: 'center' }}>Buy%</th>
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
                            background: i % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                            cursor: 'pointer',
                          }}
                          onClick={() => window.open(t.url || `https://dexscreener.com/solana/${t.address}`, '_blank')}
                        >
                          <td style={{ padding: '4px' }}>
                            <div style={{ fontWeight: 'bold' }}>
                              {t.symbol}
                              {hasFlags && <span style={{ color: '#FF6600', marginLeft: '4px' }}>⚠</span>}
                            </div>
                            <div style={{ color: '#666666', fontSize: '8px' }}>
                              {(t.name ?? '').slice(0, 15)}{(t.name?.length ?? 0) > 15 ? '...' : ''}
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <span style={{
                              background: getScoreColor(t.score),
                              color: '#000000',
                              padding: '1px 4px',
                              fontWeight: 'bold',
                              fontSize: '10px'
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
        <div style={{
          background: '#E8E8E8',
          borderTop: '1px solid #CCCCCC',
          padding: '4px 8px',
          fontSize: '9px',
          color: '#666666',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Filters: &gt;$50K liq | &gt;$100K vol | &gt;50% buys | Not dumping</span>
          <span>Click token to open DexScreener</span>
        </div>
      </div>
    </div>
  );
}
