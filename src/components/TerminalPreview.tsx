'use client';

import { useAgentThoughts } from '@/hooks/useAgentThoughts';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';

export function TerminalPreview() {
  const { thoughts, isTyping, currentText, isConnected } = useAgentThoughts();
  const recentThoughts = thoughts.slice(-8);

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Skeuomorphic Section Header */}
      <div className="skeu-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>🧠 AI Trading Brain</span>
        <span style={{ fontSize: '9px', color: isConnected ? '#90EE90' : '#FFB347' }}>
          ● {isConnected ? 'LIVE' : 'CONNECTING'}
        </span>
      </div>

      {/* Two Column Layout */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', display: 'flex' }}>
        {/* Left: Terminal */}
        <div style={{ flex: '1', borderRight: '1px solid #a0a0a0' }}>
          <div className="skeu-window" style={{ margin: '8px', borderRadius: '6px' }}>
            <div className="skeu-window-titlebar">
              <span>Live Agent Thoughts</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <button className="skeu-btn" style={{ padding: '0 6px', fontSize: '10px', minWidth: '20px' }}>−</button>
                <button className="skeu-btn" style={{ padding: '0 6px', fontSize: '10px', minWidth: '20px' }}>□</button>
                <button className="skeu-btn" style={{ padding: '0 6px', fontSize: '10px', minWidth: '20px', color: '#CC0000' }}>×</button>
              </div>
            </div>

            <div className="skeu-terminal" style={{
              height: '200px',
              overflow: 'auto',
              padding: '10px',
              fontFamily: '"Courier New", monospace',
              fontSize: '11px',
              borderRadius: '0 0 6px 6px',
            }}>
              {recentThoughts.length === 0 ? (
                <div style={{ color: '#00aa00' }}>
                  Initializing neural networks...<span className="blink">█</span>
                </div>
              ) : (
                recentThoughts.map((thought, index) => (
                  <div key={index} style={{
                    marginBottom: '8px',
                    color: index === recentThoughts.length - 1 ? '#00ff00' : '#00cc00',
                    lineHeight: '1.4',
                    wordBreak: 'break-word',
                  }}>
                    <span style={{ color: '#555' }}>[{thought.timestamp}]</span> {thought.message}
                  </div>
                ))
              )}
              {isTyping && currentText && (
                <div style={{ color: '#00ff00', marginTop: '6px', wordBreak: 'break-word' }}>
                  <span style={{ color: '#ffff00' }}>{'>'}</span> {currentText}<span className="blink">█</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Bar */}
          <div className="skeu-metallic" style={{ margin: '0 8px 8px', padding: '4px 8px', fontSize: '9px', display: 'flex', justifyContent: 'space-between', borderRadius: '4px' }}>
            <span>MODEL: claude-sonnet-4</span>
            <span style={{ color: isConnected ? '#006600' : '#996600' }}>
              {isConnected ? '● STREAMING' : '○ CONNECTING'}
            </span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div style={{ width: '280px', padding: '12px', background: 'linear-gradient(180deg, #f5f5f5 0%, #e5e5e5 100%)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '10px', color: '#333' }}>Quick Actions</div>

          {/* Token Display */}
          <div className="skeu-terminal" style={{ padding: '12px', textAlign: 'center', marginBottom: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '9px', color: '#66AAFF' }}>TICKER SYMBOL</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00FF00' }}>$ARA</div>
            <div style={{ fontSize: '9px', color: '#00CC00' }}>● LIVE ON SOLANA</div>
          </div>

          {/* Buy Button */}
          <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
            <button className="skeu-btn-green" style={{ width: '100%', padding: '10px', fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', borderRadius: '4px', cursor: 'pointer' }}>
              BUY $ARA NOW
            </button>
          </a>

          {/* Contract Address */}
          <div className="skeu-input" style={{ marginBottom: '10px', fontSize: '9px' }}>
            <div style={{ color: '#666', marginBottom: '2px' }}>CONTRACT ADDRESS</div>
            <div style={{ fontFamily: 'monospace', color: '#003399', wordBreak: 'break-all' }}>
              {CONTRACT_ADDRESS.slice(0, 20)}...
            </div>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
            className="skeu-btn"
            style={{ width: '100%', padding: '8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
          >
            📋 COPY CA
          </button>

          <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '9px' }}>
            <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer">pump.fun</a>
            {' | '}
            <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer">chart</a>
          </div>
        </div>
      </div>
    </div>
  );
}
