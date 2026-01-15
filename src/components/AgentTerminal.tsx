'use client';

import { useEffect, useRef } from 'react';
import { useAgentThoughts, EnhancedThought } from '@/hooks/useAgentThoughts';

// Y2K Financial Terminal Colors
function getTypeColor(type: string): string {
  switch (type) {
    case 'analysis': return '#00CC00';    // Matrix green - thinking
    case 'decision': return '#00CCCC';    // Cyan - answers
    case 'trade': return '#FFD700';       // Gold - TRADE EXECUTION
    case 'action': return '#FF8C00';      // Orange - tool usage
    case 'alert': return '#FF66FF';       // Magenta - alerts
    case 'reflection': return '#9999FF';  // Light blue - self-reflection
    case 'hypothesis': return '#FF99CC';  // Pink - theories
    case 'status': return '#666666';      // Gray - status updates
    case 'info':
    default: return '#888888';
  }
}

function getTypePrefix(type: string): string {
  switch (type) {
    case 'analysis': return 'THINK';
    case 'decision': return 'DECIDE';
    case 'trade': return '$$$ TRADE';
    case 'action': return 'SCAN';
    case 'alert': return 'ALERT';
    case 'reflection': return 'REFLECT';
    case 'hypothesis': return 'THEORY';
    case 'status': return 'SYS';
    case 'info':
    default: return 'INFO';
  }
}

export function AgentTerminal() {
  const {
    thoughts,
    isTyping,
    currentText,
    isConnected,
    model,
    lastLatency,
  } = useAgentThoughts();

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [thoughts, currentText]);

  return (
    <div id="terminal" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        Branch Manager Terminal
        <span style={{ marginLeft: '8px', fontSize: '9px', color: '#66FF66' }}>
          ● LIVE
        </span>
      </div>

      {/* Two Column Layout */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', padding: 0, display: 'flex' }}>
        {/* Left: Terminal */}
        <div style={{ flex: '0 0 70%', borderRight: '1px solid #a0a0a0' }}>
          <div className="skeu-window" style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}>
            {/* Title Bar */}
            <div className="skeu-window-titlebar">
              <span>Claude Investments - Branch Manager v1.0</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="skeu-btn" style={{ padding: '0 6px', fontSize: '10px', minWidth: '20px' }}>_</button>
                <button className="skeu-btn" style={{ padding: '0 6px', fontSize: '10px', minWidth: '20px' }}>[]</button>
                <button className="skeu-btn" style={{ padding: '0 6px', fontSize: '10px', minWidth: '20px', color: '#CC0000' }}>X</button>
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="skeu-terminal"
              style={{
                height: '280px',
                overflow: 'auto',
                padding: '8px',
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                borderRadius: 0
              }}
            >
              {/* Boot Message */}
              <div style={{ color: '#666666', marginBottom: '8px' }}>
                <div style={{ color: '#00AA00' }}>Claude Investments - Branch Manager AI</div>
                <div>Analyzing $ARA markets in real-time</div>
                <div style={{ borderBottom: '1px dotted #333333', margin: '8px 0' }} />
              </div>

              {/* Thought Stream */}
              <div>
                {thoughts.map((thought, index) => {
                  const isTrade = thought.type === 'trade';
                  const isAction = thought.type === 'action';
                  const isAlert = thought.type === 'alert';
                  const isDecision = thought.type === 'decision';
                  const isReflection = thought.type === 'reflection';
                  const isHypothesis = thought.type === 'hypothesis';

                  // Get background and border colors based on type
                  const getThoughtStyle = () => {
                    if (isTrade) return {
                      background: 'rgba(255, 215, 0, 0.15)',
                      borderLeft: '3px solid #FFD700',
                      padding: '6px 8px',
                    };
                    if (isAction) return {
                      background: 'rgba(255, 140, 0, 0.1)',
                      borderLeft: '2px solid #FF8C00',
                      padding: '4px 6px',
                    };
                    if (isAlert) return {
                      background: 'rgba(255, 102, 255, 0.1)',
                      borderLeft: '2px solid #FF66FF',
                      padding: '4px 6px',
                    };
                    if (isDecision) return {
                      background: 'rgba(0, 204, 204, 0.1)',
                      borderLeft: '2px solid #00CCCC',
                      padding: '4px 6px',
                    };
                    if (isReflection) return {
                      background: 'rgba(153, 153, 255, 0.1)',
                      borderLeft: '2px solid #9999FF',
                      padding: '4px 6px',
                    };
                    if (isHypothesis) return {
                      background: 'rgba(255, 153, 204, 0.1)',
                      borderLeft: '2px solid #FF99CC',
                      padding: '4px 6px',
                    };
                    return { background: 'transparent', borderLeft: 'none', padding: '0' };
                  };

                  const thoughtStyle = getThoughtStyle();

                  // Get message color based on type
                  const getMessageColor = () => {
                    if (isTrade) return '#FFD700';
                    if (isAction) return '#FF8C00';
                    if (isAlert) return '#FF99FF';
                    if (isDecision) return '#00CCCC';
                    if (isReflection) return '#9999FF';
                    if (isHypothesis) return '#FF99CC';
                    return '#00AA00';
                  };

                  return (
                    <div
                      key={`${thought.timestamp}-${index}`}
                      style={{
                        marginBottom: '6px',
                        ...thoughtStyle,
                      }}
                    >
                      <span style={{ color: '#666666' }}>[{thought.timestamp}]</span>
                      {' '}
                      <span style={{
                        color: getTypeColor(thought.type),
                        fontWeight: isTrade ? 'bold' : 'normal',
                      }}>
                        [{getTypePrefix(thought.type)}]
                      </span>
                      {' '}
                      <span style={{
                        color: getMessageColor(),
                        fontWeight: isTrade ? 'bold' : 'normal',
                      }}>
                        {thought.message}
                      </span>
                      {thought.latencyMs && (
                        <span style={{ color: '#666666', fontSize: '9px' }}> [{thought.latencyMs}ms]</span>
                      )}
                    </div>
                  );
                })}

                {/* Currently typing */}
                {isTyping && (
                  <div>
                    <span style={{ color: '#666666' }} suppressHydrationWarning>
                      [{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                    </span>
                    {' '}
                    <span style={{ color: '#AAAA00' }}>[PROCESSING]</span>
                    {' '}
                    <span style={{ color: '#00AA00' }}>
                      {currentText}
                      <span className="cursor-blink"></span>
                    </span>
                  </div>
                )}

                {/* Idle cursor */}
                {!isTyping && (
                  <div style={{ marginTop: '4px' }}>
                    <span style={{ color: '#00AA00' }}>&gt; <span className="cursor-blink"></span></span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="skeu-metallic" style={{
              padding: '4px 8px',
              fontSize: '9px',
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 0
            }}>
              <span>
                <span style={{ color: '#008800' }}>●</span>
                {' Connected'}
              </span>
              <span>
                {model && <span style={{ color: '#003366' }}>{model.replace('claude-', '').replace('-20250514', '')}</span>}
                {lastLatency && <span> | {lastLatency}ms</span>}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Info Panel */}
        <div style={{ flex: '0 0 30%', padding: '8px', background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)' }}>
          {/* AI Status Badge */}
          <div className="skeu-section-header" style={{
            borderRadius: '4px',
            marginBottom: '8px',
            textAlign: 'center',
            fontSize: '10px'
          }}>
            <div style={{ fontWeight: 'bold' }}>AI TRADING AGENT</div>
            <div style={{ fontSize: '8px', color: '#99CCFF' }}>Autonomous Analysis</div>
          </div>

          {/* Model Info */}
          <div className="skeu-panel" style={{ marginBottom: '8px', padding: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px', color: '#003366' }}>Model</div>
            <div style={{ fontSize: '10px', fontFamily: 'Courier New', color: '#006600' }}>
              claude-sonnet-4
            </div>
            <div style={{ fontSize: '9px', color: '#666666', marginTop: '2px' }}>
              Response: ~{lastLatency}ms
            </div>
          </div>

          {/* Agent Capabilities */}
          <div className="skeu-panel" style={{ marginBottom: '8px', padding: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '6px', color: '#003366' }}>
              Capabilities
            </div>
            <div style={{ fontSize: '9px', lineHeight: 1.6 }}>
              <div style={{ color: '#008800' }}>✓ Market Analysis</div>
              <div style={{ color: '#008800' }}>✓ Technical Indicators</div>
              <div style={{ color: '#008800' }}>✓ Sentiment Tracking</div>
              <div style={{ color: '#008800' }}>✓ Risk Assessment</div>
              <div style={{ color: '#008800' }}>✓ Pattern Recognition</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="skeu-panel" style={{ padding: '8px' }}>
            <div style={{ fontSize: '8px', color: '#999999', fontStyle: 'italic', lineHeight: 1.4 }}>
              This AI agent continuously analyzes market conditions and provides autonomous trading insights.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
