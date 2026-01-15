'use client';

import { useState, useEffect } from 'react';
import { useAgentThoughts, ThoughtType } from '@/hooks/useAgentThoughts';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';

// Map thought types to colors
function getThoughtColor(type: ThoughtType): string {
  const colors: Record<ThoughtType, string> = {
    analysis: '#D4775C',   // Terracotta - thinking
    trade: '#5C8A5C',      // Green - action
    info: '#9A958C',       // Gray - info
    decision: '#E8E5E0',   // Cream - decisions
    alert: '#C45C5C',      // Red - alerts
    reflection: '#5C7A8A', // Blue - reflection
    hypothesis: '#D4A75C', // Gold - hypothesis
    action: '#D4775C',     // Terracotta - action
    status: '#6B6860',     // Dark gray - status
  };
  return colors[type] || '#D4775C';
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
    <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
      {/* Header */}
      <div style={{
        background: '#1A1918',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #3A3836'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            color: '#D4775C',
            fontWeight: 'bold',
            fontSize: '14px',
            fontFamily: 'Courier New',
            letterSpacing: '1px'
          }}>
            AGENT BRAIN
          </span>
          <span style={{ color: '#9A958C', fontSize: '11px', fontFamily: 'Courier New' }}>
            CLAUDE-SONNET-4
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            color: '#5C8A5C',
            fontSize: '11px',
            fontFamily: 'Courier New',
            fontWeight: 'bold'
          }}>
            {currentTime}
          </span>
          <span style={{
            background: isConnected ? '#5C8A5C' : '#C45C5C',
            color: 'white',
            padding: '3px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {isConnected ? 'STREAMING' : connectionState.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex' }}>
        {/* Left: Terminal Output */}
        <div style={{ flex: 1, background: '#1A1918' }}>
          {/* Sub-header */}
          <div style={{
            background: '#252321',
            padding: '8px 12px',
            borderBottom: '1px solid #3A3836',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              color: '#D4775C',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontFamily: 'Courier New'
            }}>
              Live Agent Thoughts
            </span>
            <span style={{ color: '#6B6860', fontSize: '10px', fontFamily: 'Courier New' }}>
              {recentThoughts.length} msgs
            </span>
          </div>

          {/* Terminal Output */}
          <div style={{
            background: '#1A1918',
            height: '240px',
            overflow: 'auto',
            padding: '12px',
            fontFamily: 'Courier New',
            fontSize: '11px',
            lineHeight: '1.6',
          }}>
            {/* Show initializing only when no thoughts and not typing */}
            {recentThoughts.length === 0 && !isTyping && (
              <div style={{ color: '#D4775C' }}>
                <span style={{ color: '#5C8A5C' }}>{'>'}</span> Initializing neural networks...
                <span className="cursor-blink" style={{ marginLeft: '4px' }}></span>
              </div>
            )}

            {/* Show existing thoughts */}
            {recentThoughts.map((thought, index) => {
              const color = getThoughtColor(thought.type as ThoughtType);
              const prefix = getThoughtPrefix(thought.type as ThoughtType);
              const isLatest = index === recentThoughts.length - 1;
              return (
                <div key={index} style={{
                  marginBottom: '8px',
                  opacity: isLatest ? 1 : 0.85,
                }}>
                  <span style={{ color: '#6B6860' }}>[{thought.timestamp}]</span>
                  <span style={{ color: '#D4775C', marginLeft: '8px', fontWeight: 'bold' }}>{prefix}</span>
                  <span style={{ color: '#3A3836' }}> | </span>
                  <span style={{ color, wordBreak: 'break-word' }}>{thought.message}</span>
                </div>
              );
            })}

            {/* Show currently typing thought */}
            {isTyping && currentText && (
              <div style={{ marginTop: recentThoughts.length > 0 ? '8px' : '0' }}>
                <span style={{ color: '#5C8A5C' }}>{'>'}</span>
                <span style={{ color: '#D4775C', marginLeft: '8px' }}>{currentText}</span>
                <span className="cursor-blink" style={{ marginLeft: '2px' }}></span>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div style={{
            background: '#252321',
            padding: '8px 12px',
            borderTop: '1px solid #3A3836',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10px',
            fontFamily: 'Courier New'
          }}>
            <span style={{ color: '#6B6860' }}>MODEL: claude-sonnet-4-20250514</span>
            <span style={{ color: isConnected ? '#5C8A5C' : '#C45C5C' }}>
              {isConnected ? '● CONNECTED' : '○ ' + connectionState.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Right: Info Panel */}
        <div style={{
          width: '220px',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #E8E5E0'
        }}>
          {/* Token Display */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #E8E5E0',
            textAlign: 'center',
          }}>
            <div style={{
              color: '#9A958C',
              fontSize: '10px',
              letterSpacing: '1px',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Ticker
            </div>
            <div style={{
              color: '#D4775C',
              fontSize: '32px',
              fontWeight: 'bold',
              fontFamily: 'Georgia'
            }}>
              $ARA
            </div>
            <div style={{
              color: '#5C8A5C',
              fontSize: '11px',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                background: '#5C8A5C',
                borderRadius: '50%'
              }}></span>
              Live on Solana
            </div>
          </div>

          {/* Stats */}
          <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div className="stat-box" style={{ padding: '12px' }}>
              <div className="stat-label" style={{ fontSize: '9px' }}>Status</div>
              <div style={{ color: '#5C8A5C', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Courier New' }}>ACTIVE</div>
            </div>
            <div className="stat-box" style={{ padding: '12px' }}>
              <div className="stat-label" style={{ fontSize: '9px' }}>Chain</div>
              <div style={{ color: '#D4775C', fontSize: '13px', fontWeight: 'bold', fontFamily: 'Courier New' }}>SOL</div>
            </div>
          </div>

          {/* Buy Button */}
          <div style={{ padding: '12px 16px' }}>
            <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
              }}>
                Buy $ARA
              </button>
            </a>
          </div>

          {/* Contract Address */}
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{
              color: '#9A958C',
              fontSize: '9px',
              letterSpacing: '1px',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}>
              Contract
            </div>
            <div style={{
              background: '#FAF9F6',
              border: '1px solid #E8E5E0',
              borderRadius: '6px',
              padding: '8px',
              fontSize: '9px',
              color: '#3D3929',
              wordBreak: 'break-all',
              fontFamily: 'Courier New',
            }}>
              {CONTRACT_ADDRESS.slice(0, 20)}...
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
              className="btn-secondary"
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '8px',
                fontSize: '11px',
              }}
            >
              Copy CA
            </button>
          </div>

          {/* Links */}
          <div style={{
            marginTop: 'auto',
            padding: '12px',
            borderTop: '1px solid #E8E5E0',
            display: 'flex',
            gap: '6px',
          }}>
            <a
              href={SOCIAL_LINKS.pumpfun}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '6px', fontSize: '10px' }}
            >
              Pump
            </a>
            <a
              href={SOCIAL_LINKS.dexscreener}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '6px', fontSize: '10px' }}
            >
              DEX
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '6px', fontSize: '10px' }}
            >
              X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
