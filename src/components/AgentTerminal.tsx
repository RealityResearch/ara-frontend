'use client';

import { useEffect, useRef, useState } from 'react';
import { useAgentThoughts, EnhancedThought } from '@/hooks/useAgentThoughts';

function getTypeColor(type: EnhancedThought['type'], isUserQuestion?: boolean): string {
  if (isUserQuestion) return '#FF66FF'; // Magenta for user questions
  switch (type) {
    case 'analysis': return '#00CC00'; // Green for thoughts
    case 'decision': return '#00CCCC'; // Cyan for answers
    case 'trade': return '#CCCC00';
    case 'alert': return '#FF66FF'; // Magenta for questions
    case 'info':
    default: return '#888888';
  }
}

function getTypePrefix(type: EnhancedThought['type'], isUserQuestion?: boolean): string {
  if (isUserQuestion) return 'Q';
  switch (type) {
    case 'analysis': return 'THINK';
    case 'decision': return 'A'; // Answer
    case 'trade': return 'TRADE';
    case 'alert': return 'Q'; // Question
    case 'info':
    default: return 'INFO';
  }
}

function formatUSD(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

export function AgentTerminal() {
  const {
    thoughts,
    isTyping,
    currentText,
    isConnected,
    marketData,
    model,
    lastLatency,
    questionStatus,
    submitQuestion
  } = useAgentThoughts();

  const terminalRef = useRef<HTMLDivElement>(null);
  const [questionInput, setQuestionInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [thoughts, currentText]);

  const handleSubmitQuestion = () => {
    if (questionInput.trim() && nameInput.trim()) {
      submitQuestion(questionInput.trim(), nameInput.trim());
      setQuestionInput('');
    }
  };

  return (
    <div id="terminal" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              Branch Manager Terminal
              <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#008800' : '#FF8800' }}>
                ● {isConnected ? 'LIVE' : 'DEMO'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Two Column Layout */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ border: '1px solid #CCCCCC' }}>
        <tbody>
          <tr>
            {/* Left: Terminal */}
            <td width="70%" valign="top" style={{ borderRight: '1px solid #CCCCCC' }}>
              <div style={{ border: '2px outset #CCCCCC', background: '#C0C0C0', padding: '2px' }}>
                {/* Title Bar */}
                <div style={{
                  background: 'linear-gradient(to right, #000080 0%, #1084D0 100%)',
                  padding: '2px 4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '11px' }}>
                    Claude Investments - Branch Manager v1.0
                  </span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <button className="btn-y2k" style={{ padding: '0 4px', fontSize: '10px', minWidth: '18px' }}>_</button>
                    <button className="btn-y2k" style={{ padding: '0 4px', fontSize: '10px', minWidth: '18px' }}>□</button>
                    <button className="btn-y2k" style={{ padding: '0 4px', fontSize: '10px', minWidth: '18px', color: '#CC0000' }}>×</button>
                  </div>
                </div>

                {/* Terminal Content */}
                <div
                  ref={terminalRef}
                  className="terminal"
                  style={{
                    height: '280px',
                    overflow: 'auto',
                    padding: '8px',
                    background: '#0a0f0a',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '11px'
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
                      const isQuestion = thought.type === 'alert';
                      const isAnswer = thought.type === 'decision';

                      return (
                        <div
                          key={`${thought.timestamp}-${index}`}
                          style={{
                            marginBottom: '6px',
                            padding: isQuestion || isAnswer ? '4px 6px' : '0',
                            background: isQuestion ? 'rgba(255, 102, 255, 0.1)' : isAnswer ? 'rgba(0, 204, 204, 0.1)' : 'transparent',
                            borderLeft: isQuestion ? '2px solid #FF66FF' : isAnswer ? '2px solid #00CCCC' : 'none'
                          }}
                        >
                          <span style={{ color: '#666666' }}>[{thought.timestamp}]</span>
                          {' '}
                          <span style={{ color: getTypeColor(thought.type, isQuestion) }}>
                            [{getTypePrefix(thought.type, isQuestion)}]
                          </span>
                          {thought.questionFrom && (
                            <span style={{ color: '#FF66FF', fontWeight: 'bold' }}> @{thought.questionFrom}:</span>
                          )}
                          {' '}
                          <span style={{
                            color: isQuestion ? '#FF99FF' : isAnswer ? '#00CCCC' : '#00AA00'
                          }}>
                            {thought.message}
                          </span>
                          {thought.latencyMs && !isQuestion && (
                            <span style={{ color: '#666666', fontSize: '9px' }}> [{thought.latencyMs}ms]</span>
                          )}
                        </div>
                      );
                    })}

                    {/* Currently typing */}
                    {isTyping && (
                      <div>
                        <span style={{ color: '#666666' }}>
                          [{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                        </span>
                        {' '}
                        <span style={{ color: '#AAAA00' }}>[PROCESSING]</span>
                        {' '}
                        <span style={{ color: '#00AA00' }}>
                          {currentText}
                          <span className="cursor-blink">█</span>
                        </span>
                      </div>
                    )}

                    {/* Idle cursor */}
                    {!isTyping && (
                      <div style={{ marginTop: '4px' }}>
                        <span style={{ color: '#00AA00' }}>&gt; <span className="cursor-blink">█</span></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div style={{
                  background: '#E0E0E0',
                  borderTop: '1px solid #999999',
                  padding: '2px 8px',
                  fontSize: '9px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>
                    <span style={{ color: isConnected ? '#008800' : '#FF8800' }}>●</span>
                    {isConnected ? ' Connected' : ' Demo Mode'}
                  </span>
                  <span>
                    {model && <span style={{ color: '#003366' }}>{model.replace('claude-', '').replace('-20250514', '')}</span>}
                    {lastLatency && <span> | {lastLatency}ms</span>}
                  </span>
                </div>
              </div>
            </td>

            {/* Right: Transparency Panel + Question Form */}
            <td width="30%" valign="top" style={{ background: '#F5F5F5', padding: '8px' }}>
              {/* Proof of AI Badge */}
              <div style={{
                background: '#003366',
                color: '#FFFFFF',
                padding: '6px',
                textAlign: 'center',
                fontSize: '10px',
                marginBottom: '8px'
              }}>
                <div style={{ fontWeight: 'bold' }}>PROOF OF AI</div>
                <div style={{ fontSize: '8px', color: '#99CCFF' }}>Real Claude Analysis</div>
              </div>

              {/* Model Info */}
              <div className="fieldset-y2k" style={{ marginBottom: '8px', padding: '6px' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px', color: '#003366' }}>Model</div>
                <div style={{ fontSize: '10px', fontFamily: 'Courier New', color: isConnected ? '#006600' : '#666666' }}>
                  {isConnected && model ? model : 'Not connected'}
                </div>
                {lastLatency && (
                  <div style={{ fontSize: '9px', color: '#666666', marginTop: '2px' }}>
                    Response: {lastLatency}ms
                  </div>
                )}
              </div>

              {/* Live Market Data */}
              {marketData && (
                <div className="fieldset-y2k" style={{ marginBottom: '8px', padding: '6px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px', color: '#003366' }}>
                    Agent Input Data
                  </div>
                  <table style={{ fontSize: '9px', width: '100%' }}>
                    <tbody>
                      <tr>
                        <td style={{ color: '#666666' }}>Price:</td>
                        <td style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>{marketData.priceFormatted}</td>
                      </tr>
                      <tr>
                        <td style={{ color: '#666666' }}>24h:</td>
                        <td style={{ color: marketData.change24h >= 0 ? '#008800' : '#CC0000', fontWeight: 'bold' }}>
                          {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h.toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td style={{ color: '#666666' }}>Volume:</td>
                        <td>{formatUSD(marketData.volume24h)}</td>
                      </tr>
                      <tr>
                        <td style={{ color: '#666666' }}>MCap:</td>
                        <td>{formatUSD(marketData.marketCap)}</td>
                      </tr>
                      <tr>
                        <td style={{ color: '#666666' }}>Holders:</td>
                        <td>{marketData.holders.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ fontSize: '8px', color: '#999999', marginTop: '4px', fontStyle: 'italic' }}>
                    This is what Claude sees
                  </div>
                </div>
              )}

              {/* Question Form */}
              <div className="fieldset-y2k" style={{ padding: '6px' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px', color: '#003366' }}>
                  Ask the Branch Manager
                </div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="input-y2k"
                  style={{ width: '100%', marginBottom: '4px', fontSize: '10px' }}
                  maxLength={20}
                />
                <textarea
                  placeholder="Your question..."
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="input-y2k"
                  style={{ width: '100%', height: '50px', fontSize: '10px', resize: 'none' }}
                  maxLength={280}
                />
                <button
                  className="btn-y2k"
                  onClick={handleSubmitQuestion}
                  disabled={!isConnected || !questionInput.trim() || !nameInput.trim()}
                  style={{ width: '100%', marginTop: '4px', fontSize: '10px' }}
                >
                  Submit Question
                </button>
                {questionStatus && (
                  <div style={{ fontSize: '8px', color: '#006600', marginTop: '4px' }}>
                    {questionStatus}
                  </div>
                )}
                <div style={{ fontSize: '8px', color: '#999999', marginTop: '4px' }}>
                  The manager may answer during analysis cycles (~30% chance)
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
