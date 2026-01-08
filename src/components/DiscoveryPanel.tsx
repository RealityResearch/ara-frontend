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
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const thoughtsRef = useRef<HTMLDivElement>(null);

  const WS_URL = process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

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
    if (score == null) return '#666666';
    if (score >= 90) return '#00ff00';
    if (score >= 70) return '#aaff00';
    if (score >= 50) return '#ffaa00';
    return '#ff6666';
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
    <div id="discovery" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">TOKEN DISCOVERY</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>DEXSCREENER SCANNER</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#666666', fontSize: '9px' }}>
            {lastScan ? `Last: ${formatTime(lastScan)}` : 'Waiting...'}
          </span>
          <span className="bb-time">{currentTime}</span>
          <span className={`bb-badge ${isScanning ? '' : isConnected ? 'bb-badge-live' : 'bb-badge-offline'}`}
            style={isScanning ? { background: '#ffaa00', color: '#000' } : {}}>
            {isScanning ? 'SCANNING' : isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '2px', padding: '2px' }}>
        {/* Left: Agent Thoughts */}
        <div style={{ flex: 1 }} className="bb-panel">
          <div style={{
            background: '#0d0d0d',
            padding: '4px 8px',
            borderBottom: '1px solid #333333',
          }}>
            <span style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px' }}>AGENT THOUGHTS</span>
          </div>
          <div
            ref={thoughtsRef}
            style={{
              background: '#000000',
              height: '160px',
              overflow: 'auto',
              padding: '8px',
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
                    color: t.type === 'alert' ? '#ff3333' :
                           t.type === 'decision' ? '#00ddff' :
                           t.type === 'scanning' ? '#ffaa00' : '#00ff00'
                  }}>
                    {t.content}
                  </span>
                </div>
              ))
            )}
            {isScanning && (
              <div style={{ color: '#ffaa00' }}>
                <span className="bb-cursor"></span> Scanning DexScreener...
              </div>
            )}
          </div>
        </div>

        {/* Right: Token List */}
        <div style={{ flex: 1.5 }} className="bb-panel">
          <div style={{ height: '200px', overflow: 'auto' }}>
            <table className="bb-table" style={{ fontSize: '9px' }}>
              <thead>
                <tr>
                  <th style={{ position: 'sticky', top: 0, background: '#1a1a1a' }}>TOKEN</th>
                  <th style={{ textAlign: 'right', position: 'sticky', top: 0, background: '#1a1a1a' }}>SCORE</th>
                  <th style={{ textAlign: 'right', position: 'sticky', top: 0, background: '#1a1a1a' }}>PRICE</th>
                  <th style={{ textAlign: 'right', position: 'sticky', top: 0, background: '#1a1a1a' }}>24H</th>
                  <th style={{ textAlign: 'right', position: 'sticky', top: 0, background: '#1a1a1a' }}>VOL/LIQ</th>
                  <th style={{ textAlign: 'center', position: 'sticky', top: 0, background: '#1a1a1a' }}>BUY%</th>
                </tr>
              </thead>
              <tbody>
                {tokens.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#666666', padding: '40px 20px' }}>
                      NO TOKENS MATCHING CRITERIA
                    </td>
                  </tr>
                ) : (
                  tokens.map((t) => {
                    const buys = t.txns24h?.buys ?? 0;
                    const sells = t.txns24h?.sells ?? 0;
                    const buyRatio = buys + sells > 0 ? Math.round(buys / (buys + sells) * 100) : 50;
                    const volLiqRatio = t.liquidity > 0 ? (t.volume24h / t.liquidity).toFixed(1) : '0.0';
                    const hasFlags = (t.flags?.length ?? 0) > 0;

                    return (
                      <tr
                        key={t.address}
                        style={{ cursor: 'pointer' }}
                        onClick={() => window.open(t.url || `https://dexscreener.com/solana/${t.address}`, '_blank')}
                      >
                        <td>
                          <div style={{ fontWeight: 'bold', color: '#ffffff' }}>
                            {t.symbol}
                            {hasFlags && <span style={{ color: '#ff6600', marginLeft: '4px' }}>!</span>}
                          </div>
                          <div style={{ color: '#666666', fontSize: '8px' }}>
                            {(t.name ?? '').slice(0, 12)}{(t.name?.length ?? 0) > 12 ? '...' : ''}
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <span style={{
                            padding: '1px 6px',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            background: getScoreColor(t.score),
                            color: '#000000',
                          }}>
                            {t.score}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                          ${formatPrice(t.priceUsd)}
                        </td>
                        <td style={{ textAlign: 'right' }} className={(t.priceChange24h ?? 0) >= 0 ? 'bb-positive' : 'bb-negative'}>
                          {(t.priceChange24h ?? 0) >= 0 ? '+' : ''}{(t.priceChange24h ?? 0).toFixed(0)}%
                        </td>
                        <td style={{ textAlign: 'right', fontFamily: 'Courier New' }}>
                          {volLiqRatio}x
                        </td>
                        <td style={{ textAlign: 'center' }} className={buyRatio >= 55 ? 'bb-positive' : buyRatio >= 50 ? '' : 'bb-negative'}>
                          {buyRatio}%
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
        background: '#0d0d0d',
        padding: '6px 8px',
        fontSize: '9px',
        color: '#666666',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>FILTERS: &gt;$50K LIQ | &gt;$100K VOL | &gt;50% BUYS | NOT DUMPING</span>
        <span>Click token to open DexScreener</span>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          FILTER
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F3</span>
          REFRESH
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>DISCOVERY GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
