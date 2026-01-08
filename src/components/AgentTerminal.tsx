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

function formatUSD(value: number | undefined | null): string {
  if (value == null) return '$0.00';
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
      <div className="skeu-section-header">
        Branch Manager Terminal
        <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#66FF66' : '#FFAA00' }}>
          {isConnected ? 'LIVE' : 'DEMO'}
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
                <span style={{ color: isConnected ? '#008800' : '#FF8800' }}></span>
                {isConnected ? ' Connected' : ' Demo Mode'}
              </span>
              <span>
                {model && <span style={{ color: '#003366' }}>{model.replace('claude-', '').replace('-20250514', '')}</span>}
                {lastLatency && <span> | {lastLatency}ms</span>}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Transparency Panel + Question Form */}
        <div style={{ flex: '0 0 30%', padding: '8px', background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)' }}>
          {/* Proof of AI Badge */}
          <div className="skeu-section-header" style={{
            borderRadius: '4px',
            marginBottom: '8px',
            textAlign: 'center',
            fontSize: '10px'
          }}>
            <div style={{ fontWeight: 'bold' }}>PROOF OF AI</div>
            <div style={{ fontSize: '8px', color: '#99CCFF' }}>Real Claude Analysis</div>
          </div>

          {/* Model Info */}
          <div className="skeu-panel" style={{ marginBottom: '8px', padding: '8px' }}>
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
            <div className="skeu-panel" style={{ marginBottom: '8px', padding: '8px' }}>
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
                    <td style={{ color: (marketData.change24h ?? 0) >= 0 ? '#008800' : '#CC0000', fontWeight: 'bold' }}>
                      {(marketData.change24h ?? 0) >= 0 ? '+' : ''}{(marketData.change24h ?? 0).toFixed(1)}%
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
                    <td>{(marketData.holders ?? 0).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ fontSize: '8px', color: '#999999', marginTop: '4px', fontStyle: 'italic' }}>
                This is what Claude sees
              </div>
            </div>
          )}

          {/* Question Form */}
          <div className="skeu-panel" style={{ padding: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px', color: '#003366' }}>
              Ask the Branch Manager
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="skeu-input"
              style={{ width: '100%', marginBottom: '4px', fontSize: '10px', boxSizing: 'border-box' }}
              maxLength={20}
            />
            <textarea
              placeholder="Your question..."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              className="skeu-input"
              style={{ width: '100%', height: '50px', fontSize: '10px', resize: 'none', boxSizing: 'border-box' }}
              maxLength={280}
            />
            <button
              className="skeu-btn-green skeu-btn"
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
        </div>
      </div>
    </div>
  );
}
