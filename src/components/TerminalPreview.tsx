'use client';

import { useAgentThoughts } from '@/hooks/useAgentThoughts';

export function TerminalPreview() {
  const { thoughts, isTyping, currentText, isConnected } = useAgentThoughts();

  // Get last 3 thoughts
  const recentThoughts = thoughts.slice(-3);

  const scrollToTerminal = () => {
    const terminal = document.getElementById('terminal');
    if (terminal) {
      terminal.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      background: '#0a0f0a',
      border: '2px solid #00ff41',
      borderRadius: '4px',
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, #003300 0%, #001a00 100%)',
        padding: '8px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #00ff41',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className="blink"
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isConnected ? '#00ff41' : '#ff6600',
              boxShadow: isConnected ? '0 0 8px #00ff41' : '0 0 8px #ff6600',
            }}
          />
          <span style={{
            color: '#00ff41',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            AI Brain {isConnected ? 'LIVE' : 'CONNECTING...'}
          </span>
        </div>
        <button
          onClick={scrollToTerminal}
          style={{
            background: 'transparent',
            border: '1px solid #00ff41',
            color: '#00ff41',
            padding: '4px 12px',
            fontSize: '10px',
            fontFamily: '"Courier New", monospace',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#00ff41';
            e.currentTarget.style.color = '#000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00ff41';
          }}
        >
          FULL TERMINAL ↓
        </button>
      </div>

      {/* Thoughts Display */}
      <div style={{
        padding: '12px',
        minHeight: '120px',
        maxHeight: '150px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Scanline effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
          pointerEvents: 'none',
        }} />

        {recentThoughts.length === 0 ? (
          <div style={{
            color: '#00aa00',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            textAlign: 'center',
            padding: '20px',
          }}>
            Initializing neural networks...
            <span className="blink">█</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentThoughts.map((thought, index) => (
              <div
                key={index}
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  lineHeight: '1.4',
                  color: index === recentThoughts.length - 1 ? '#00ff41' : '#00aa00',
                  opacity: index === 0 ? 0.5 : index === 1 ? 0.75 : 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                }}
              >
                <span style={{ color: '#666', marginRight: '8px' }}>{thought.timestamp}</span>
                {thought.message}
              </div>
            ))}
          </div>
        )}

        {/* Currently typing indicator */}
        {isTyping && currentText && (
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            color: '#00ff41',
            marginTop: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#ffff00' }}>{'>'}</span> {currentText.slice(0, 80)}
            <span className="blink">█</span>
          </div>
        )}

        {/* Fade overlay at bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30px',
          background: 'linear-gradient(to bottom, transparent, #0a0f0a)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Footer status bar */}
      <div style={{
        background: '#001a00',
        padding: '6px 12px',
        borderTop: '1px solid #003300',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '9px',
        fontFamily: '"Courier New", monospace',
        color: '#00aa00',
      }}>
        <span>MODEL: claude-sonnet-4</span>
        <span>
          {isConnected ? (
            <>STREAMING THOUGHTS<span className="blink">...</span></>
          ) : (
            'RECONNECTING...'
          )}
        </span>
      </div>

    </div>
  );
}
