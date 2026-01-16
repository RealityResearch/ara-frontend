'use client';

import { useState, useEffect, useRef } from 'react';
import { useAgentThoughts, ThoughtType } from '@/hooks/useAgentThoughts';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';

function getThoughtColor(type: ThoughtType): string {
  const colors: Record<ThoughtType, string> = {
    analysis: '#DA7756',   // Terracotta - thinking
    trade: '#2D8A4E',      // Green - action
    info: '#9C958D',       // Gray - info
    decision: '#F5F1EA',   // Cream - decisions
    alert: '#C9463D',      // Red - alerts
    reflection: '#5B8FB9', // Blue - reflection
    hypothesis: '#D4A574', // Gold - hypothesis
    action: '#DA7756',     // Terracotta - action
    status: '#6B635B',     // Dark gray - status
  };
  return colors[type] || '#DA7756';
}

function getThoughtLabel(type: ThoughtType): string {
  const labels: Record<ThoughtType, string> = {
    analysis: 'ANALYSIS',
    trade: 'TRADE',
    info: 'INFO',
    decision: 'DECISION',
    alert: 'ALERT',
    reflection: 'REFLECT',
    hypothesis: 'THEORY',
    action: 'ACTION',
    status: 'STATUS',
  };
  return labels[type] || 'MSG';
}

export function TerminalPreview() {
  const { thoughts, isTyping, currentText, isConnected } = useAgentThoughts();
  const [currentTime, setCurrentTime] = useState<string>('--:--:--');
  const terminalRef = useRef<HTMLDivElement>(null);
  const recentThoughts = thoughts.slice(-15);

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

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [thoughts, currentText]);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Terminal Section */}
      <div className="terminal" style={{ borderRadius: 0 }}>
        {/* Header */}
        <div className="terminal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="terminal-title">AGENT TERMINAL</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>claude-sonnet-4</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--terminal-green)', fontSize: '11px', fontFamily: 'Courier Prime, monospace' }}>
              {currentTime}
            </span>
            <span className="badge badge-live" style={{ fontSize: '9px' }}>
              {isConnected ? 'STREAMING' : 'CONNECTING'}
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="terminal-content"
          style={{ minHeight: '280px', maxHeight: '320px' }}
        >
          {/* Boot message */}
          {recentThoughts.length === 0 && !isTyping && (
            <div style={{ color: 'var(--terminal-accent)' }}>
              <span style={{ color: 'var(--terminal-green)' }}>$</span> Initializing neural networks...
              <span className="cursor-blink"></span>
            </div>
          )}

          {/* Thoughts */}
          {recentThoughts.map((thought, index) => {
            const color = getThoughtColor(thought.type as ThoughtType);
            const label = getThoughtLabel(thought.type as ThoughtType);
            const isLatest = index === recentThoughts.length - 1;

            return (
              <div
                key={index}
                style={{
                  marginBottom: '8px',
                  opacity: isLatest ? 1 : 0.8,
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>[{thought.timestamp}]</span>
                <span style={{
                  color: 'var(--terminal-accent)',
                  marginLeft: '8px',
                  fontWeight: '600',
                  fontSize: '10px',
                }}>{label}</span>
                <span style={{ color: 'var(--terminal-border)', margin: '0 6px' }}>|</span>
                <span style={{ color, wordBreak: 'break-word' }}>{thought.message}</span>
              </div>
            );
          })}

          {/* Currently typing */}
          {isTyping && currentText && (
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--terminal-green)' }}>$</span>
              <span style={{ color: 'var(--terminal-accent)', marginLeft: '8px' }}>{currentText}</span>
              <span className="cursor-blink"></span>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div style={{
          background: 'var(--terminal-surface)',
          padding: '8px 16px',
          borderTop: '1px solid var(--terminal-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '10px',
          fontFamily: 'Courier Prime, monospace',
        }}>
          <span style={{ color: 'var(--text-muted)' }}>MODEL: claude-sonnet-4-20250514</span>
          <span style={{ color: isConnected ? 'var(--terminal-green)' : 'var(--error)' }}>
            {isConnected ? '● CONNECTED' : '○ CONNECTING'}
          </span>
        </div>
      </div>

      {/* Info Panel */}
      <div style={{
        background: 'var(--bg-surface)',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px',
        borderTop: '1px solid var(--border-light)',
      }}>
        {/* Token Display */}
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '10px',
            letterSpacing: '1px',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Token
          </div>
          <div style={{
            color: 'var(--claude-terracotta)',
            fontSize: '28px',
            fontWeight: '600',
            fontFamily: 'Copernicus, serif',
          }}>
            $ARA
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '6px',
          }}>
            <span className="live-dot" style={{ width: '5px', height: '5px' }}></span>
            <span style={{ color: 'var(--success)', fontSize: '11px' }}>Live on Solana</span>
          </div>
        </div>

        {/* Contract */}
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '10px',
            letterSpacing: '1px',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Contract
          </div>
          {CONTRACT_ADDRESS.length > 0 ? (
            <>
              <div
                onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  fontSize: '10px',
                  fontFamily: 'Courier Prime, monospace',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                title="Click to copy"
              >
                {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
                className="btn btn-ghost btn-sm"
                style={{ marginTop: '6px', fontSize: '11px' }}
              >
                Copy CA
              </button>
            </>
          ) : (
            <div style={{
              padding: '8px 12px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
            }}>
              Coming soon...
            </div>
          )}
        </div>

        {/* Buy CTA */}
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <div style={{
            color: 'var(--text-muted)',
            fontSize: '10px',
            letterSpacing: '1px',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}>
            Trade
          </div>
          <a
            href={SOCIAL_LINKS.pumpfun}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              textDecoration: 'none',
              width: '100%',
              maxWidth: '160px',
            }}
          >
            Buy $ARA
          </a>
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
            justifyContent: 'center',
          }}>
            <a
              href={SOCIAL_LINKS.dexscreener}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', fontSize: '11px' }}
            >
              Chart
            </a>
            <span style={{ color: 'var(--border-medium)' }}>|</span>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-muted)', fontSize: '11px' }}
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
