'use client';

import { useAgentThoughts } from '@/hooks/useAgentThoughts';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';

export function TerminalPreview() {
  const { thoughts, isTyping, currentText, isConnected } = useAgentThoughts();

  // Get last 8 thoughts
  const recentThoughts = thoughts.slice(-8);

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Section Header - Y2K Style */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              AI Trading Brain
              <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#008800' : '#FF8800' }}>
                ● {isConnected ? 'LIVE' : 'CONNECTING'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Two Column Layout - Matches existing Y2K style */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ border: '1px solid #CCCCCC' }}>
        <tbody>
          <tr>
            {/* Left: Mini Terminal */}
            <td width="65%" valign="top" style={{ borderRight: '1px solid #CCCCCC' }}>
              <div style={{ border: '2px outset #CCCCCC', background: '#C0C0C0', padding: '2px' }}>
                {/* Title Bar - Windows XP Style */}
                <div style={{
                  background: 'linear-gradient(to right, #000080 0%, #1084D0 100%)',
                  padding: '2px 4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '11px' }}>
                    🧠 Live Agent Thoughts
                  </span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <button className="btn-y2k" style={{ padding: '0 4px', fontSize: '10px', minWidth: '18px' }}>_</button>
                    <button className="btn-y2k" style={{ padding: '0 4px', fontSize: '10px', minWidth: '18px' }}>□</button>
                    <button className="btn-y2k" style={{ padding: '0 4px', fontSize: '10px', minWidth: '18px', color: '#CC0000' }}>×</button>
                  </div>
                </div>

                {/* Terminal Content */}
                <div
                  className="terminal"
                  style={{
                    height: '180px',
                    overflow: 'auto',
                    padding: '8px',
                    background: '#0a0f0a',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '10px',
                    position: 'relative',
                  }}
                >
                  {recentThoughts.length === 0 ? (
                    <div style={{ color: '#00aa00' }}>
                      Initializing neural networks...
                      <span className="blink">█</span>
                    </div>
                  ) : (
                    recentThoughts.map((thought, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: '6px',
                          color: index === recentThoughts.length - 1 ? '#00ff00' : '#00cc00',
                          lineHeight: '1.3',
                        }}
                      >
                        <span style={{ color: '#666666' }}>[{thought.timestamp}]</span>{' '}
                        {thought.message}
                      </div>
                    ))
                  )}

                  {/* Currently typing */}
                  {isTyping && currentText && (
                    <div style={{ color: '#00ff00', marginTop: '4px' }}>
                      <span style={{ color: '#ffff00' }}>{'>'}</span> {currentText}
                      <span className="blink">█</span>
                    </div>
                  )}
                </div>

                {/* Status Bar */}
                <div style={{
                  background: '#C0C0C0',
                  borderTop: '1px solid #808080',
                  padding: '2px 4px',
                  fontSize: '9px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span>MODEL: claude-sonnet-4</span>
                  <span style={{ color: isConnected ? '#008800' : '#CC8800' }}>
                    {isConnected ? '● STREAMING' : '○ CONNECTING'}
                  </span>
                </div>
              </div>
            </td>

            {/* Right: Quick Buy - Y2K Style */}
            <td width="35%" valign="top" style={{ padding: '0', background: '#F8F8F8' }}>
              <div className="fieldset-y2k" style={{ margin: '8px', marginTop: '12px' }}>
                <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                  Quick Actions
                </div>

                {/* Token Display */}
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <div style={{
                    background: '#001133',
                    color: '#00FF00',
                    padding: '8px',
                    fontFamily: '"Courier New", monospace',
                    borderRadius: '2px',
                    border: '1px inset #333',
                  }}>
                    <div style={{ fontSize: '8px', color: '#66AAFF' }}>TICKER SYMBOL</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>$ARA</div>
                    <div style={{ fontSize: '8px', color: '#00CC00' }}>● LIVE ON SOLANA</div>
                  </div>
                </div>

                {/* Buy Button */}
                <a
                  href={SOCIAL_LINKS.pumpfun}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <button
                    className="btn-buy-y2k"
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                    }}
                  >
                    BUY $ARA NOW
                  </button>
                </a>

                {/* Contract Address */}
                <div style={{
                  background: '#FFFFFF',
                  border: '1px inset #999999',
                  padding: '6px',
                  marginBottom: '8px',
                }}>
                  <div style={{ fontSize: '8px', color: '#666666', marginBottom: '2px' }}>CONTRACT ADDRESS</div>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '8px',
                    wordBreak: 'break-all',
                    color: '#003399',
                  }}>
                    {CONTRACT_ADDRESS.slice(0, 16)}...
                  </div>
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(CONTRACT_ADDRESS)}
                  className="btn-y2k"
                  style={{
                    width: '100%',
                    padding: '6px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  📋 COPY CA
                </button>

                {/* Quick Links */}
                <div style={{
                  marginTop: '8px',
                  textAlign: 'center',
                  fontSize: '9px',
                }}>
                  <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer">pump.fun</a>
                  {' | '}
                  <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer">chart</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
