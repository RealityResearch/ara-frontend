'use client';

import { useState, useEffect } from 'react';
import { useAgentThoughts, ThoughtType } from '@/hooks/useAgentThoughts';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';

// Map thought types to Bloomberg colors
function getThoughtColor(type: ThoughtType): string {
  const colors: Record<ThoughtType, string> = {
    analysis: '#ffaa00',   // Amber - thinking
    trade: '#00ff00',      // Green - action
    info: '#999999',       // Gray - info
    decision: '#ffffff',   // White - decisions
    alert: '#ff3333',      // Red - alerts
    reflection: '#3399ff', // Blue - reflection
    hypothesis: '#ffff00', // Yellow - hypothesis
    action: '#ff6600',     // Orange - action
    status: '#666666',     // Dark gray - status
  };
  return colors[type] || '#ff6600';
}

function getThoughtPrefix(type: ThoughtType): string {
  const prefixes: Record<ThoughtType, string> = {
    analysis: 'ANLYS',
    trade: 'TRADE',
    info: 'INFO',
    decision: 'DCSN',
    alert: 'ALERT',
    reflection: 'RFLCT',
    hypothesis: 'HYPTH',
    action: 'ACTN',
    status: 'STAT',
  };
  return prefixes[type] || 'MSG';
}

export function TerminalPreview() {
  const { thoughts, isTyping, currentText, isConnected, connectionState, reconnect } = useAgentThoughts();
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  const recentThoughts = thoughts.slice(-12);

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

  return (
    <div className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">AGENT BRAIN</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>CLAUDE-SONNET-4</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="bb-time">{currentTime}</span>
          <span className={isConnected ? 'bb-badge bb-badge-live' : 'bb-badge bb-badge-offline'}>
            {isConnected ? 'STREAMING' : connectionState.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex' }}>
        {/* Left: Terminal Output */}
        <div style={{ flex: 1, borderRight: '1px solid #333333' }}>
          {/* Sub-header */}
          <div style={{
            background: '#0d0d0d',
            padding: '4px 8px',
            borderBottom: '1px solid #333333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ color: '#ffaa00', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              LIVE AGENT THOUGHTS
            </span>
            <span style={{ color: '#666666', fontSize: '9px' }}>
              {recentThoughts.length} MSGS
            </span>
          </div>

          {/* Terminal Output */}
          <div style={{
            background: '#000000',
            height: '220px',
            overflow: 'auto',
            padding: '8px',
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            lineHeight: '1.5',
          }}>
            {/* Show initializing only when no thoughts and not typing */}
            {recentThoughts.length === 0 && !isTyping && (
              <div style={{ color: '#ff6600' }}>
                <span style={{ color: '#ffaa00' }}>{'>'}</span> Initializing neural networks...
                <span className="bb-cursor" style={{ marginLeft: '4px' }}></span>
              </div>
            )}

            {/* Show existing thoughts */}
            {recentThoughts.map((thought, index) => {
              const color = getThoughtColor(thought.type as ThoughtType);
              const prefix = getThoughtPrefix(thought.type as ThoughtType);
              const isLatest = index === recentThoughts.length - 1;
              return (
                <div key={index} style={{
                  marginBottom: '6px',
                  opacity: isLatest ? 1 : 0.8,
                }}>
                  <span style={{ color: '#666666' }}>[{thought.timestamp}]</span>
                  <span style={{ color: '#ffaa00', marginLeft: '4px' }}>{prefix}</span>
                  <span style={{ color: '#333333' }}> | </span>
                  <span style={{ color, wordBreak: 'break-word' }}>{thought.message}</span>
                </div>
              );
            })}

            {/* Show currently typing thought */}
            {isTyping && currentText && (
              <div style={{ marginTop: recentThoughts.length > 0 ? '8px' : '0' }}>
                <span style={{ color: '#00ff00' }}>{'>'}</span>
                <span style={{ color: '#ffaa00', marginLeft: '4px' }}>{currentText}</span>
                <span className="bb-cursor" style={{ marginLeft: '2px' }}></span>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div style={{
            background: '#0d0d0d',
            padding: '4px 8px',
            borderTop: '1px solid #333333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '9px',
          }}>
            <span style={{ color: '#666666' }}>MODEL: claude-sonnet-4-20250514</span>
            <span style={{ color: isConnected ? '#00ff00' : '#ff6600' }}>
              {isConnected ? '● CONNECTED' : '○ ' + connectionState.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Right: Quick Actions Panel */}
        <div style={{
          width: '200px',
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Token Display */}
          <div style={{
            padding: '12px',
            borderBottom: '1px solid #333333',
            textAlign: 'center',
          }}>
            <div style={{ color: '#666666', fontSize: '8px', letterSpacing: '1px', marginBottom: '4px' }}>
              TICKER
            </div>
            <div style={{ color: '#00ff00', fontSize: '28px', fontWeight: 'bold', fontFamily: 'Courier New' }}>
              $ARA
            </div>
            <div style={{ color: '#666666', fontSize: '9px', marginTop: '4px' }}>
              ● LIVE ON SOLANA
            </div>
          </div>

          {/* Stats */}
          <div className="bb-grid bb-grid-2" style={{ padding: '2px' }}>
            <div className="bb-stat-box" style={{ padding: '6px' }}>
              <div className="bb-stat-label" style={{ fontSize: '7px' }}>STATUS</div>
              <div style={{ color: '#00ff00', fontSize: '11px', fontWeight: 'bold' }}>ACTIVE</div>
            </div>
            <div className="bb-stat-box" style={{ padding: '6px' }}>
              <div className="bb-stat-label" style={{ fontSize: '7px' }}>CHAIN</div>
              <div style={{ color: '#ffaa00', fontSize: '11px', fontWeight: 'bold' }}>SOL</div>
            </div>
          </div>

          {/* Buy Button */}
          <div style={{ padding: '8px' }}>
            <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                background: 'linear-gradient(180deg, #00aa00 0%, #006600 100%)',
                border: '1px solid #00ff00',
                color: '#ffffff',
                padding: '10px',
                fontFamily: 'Courier New',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}>
                BUY $ARA
              </button>
            </a>
          </div>

          {/* Contract Address */}
          <div style={{ padding: '0 8px 8px' }}>
            <div style={{ color: '#666666', fontSize: '8px', letterSpacing: '1px', marginBottom: '4px' }}>
              CONTRACT
            </div>
            <div style={{
              background: '#000000',
              border: '1px solid #333333',
              padding: '6px',
              fontSize: '8px',
              color: '#ff6600',
              wordBreak: 'break-all',
              fontFamily: 'Courier New',
            }}>
              {CONTRACT_ADDRESS.slice(0, 16)}...
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
              style={{
                width: '100%',
                marginTop: '4px',
                background: '#1a1a1a',
                border: '1px solid #333333',
                color: '#ffaa00',
                padding: '6px',
                fontSize: '9px',
                cursor: 'pointer',
                fontFamily: 'Courier New',
              }}
            >
              COPY CA
            </button>
          </div>

          {/* Links */}
          <div style={{
            marginTop: 'auto',
            padding: '8px',
            borderTop: '1px solid #333333',
            display: 'flex',
            gap: '4px',
          }}>
            <a
              href={SOCIAL_LINKS.pumpfun}
              target="_blank"
              rel="noopener noreferrer"
              className="bb-fkey"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '4px', fontSize: '8px' }}
            >
              PUMP
            </a>
            <a
              href={SOCIAL_LINKS.dexscreener}
              target="_blank"
              rel="noopener noreferrer"
              className="bb-fkey"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '4px', fontSize: '8px' }}
            >
              DEX
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="bb-fkey"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '4px', fontSize: '8px' }}
            >
              X
            </a>
          </div>
        </div>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          MARKET
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F3</span>
          HISTORY
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F4</span>
          ALERTS
        </button>
        <button className="bb-fkey" onClick={reconnect} style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F9</span>
          RECONNECT
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>AGENT THOUGHTS GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
