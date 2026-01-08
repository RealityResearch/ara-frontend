'use client';

export function HowItWorks() {
  const steps = [
    { number: '1', title: 'BUY $ARA', description: 'Purchase $ARA on pump.fun. A small creator fee is collected on each trade.' },
    { number: '2', title: 'FEES FUND AGENT', description: 'Creator fees flow directly into the AI trading wallet. This is the retirement fund.' },
    { number: '3', title: 'CLAUDE ANALYZES', description: 'The AI agent monitors prices, volume, sentiment, and whale movements 24/7.' },
    { number: '4', title: 'TRADES EXECUTE', description: 'When conditions are right, the agent executes trades autonomously on Solana.' },
    { number: '5', title: 'FULL TRANSPARENCY', description: 'Every thought, every decision, every trade - visible in real-time on this site.' },
  ];

  return (
    <div id="how-it-works" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">HOW IT WORKS</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>SYSTEM OVERVIEW</span>
        </div>
      </div>

      {/* Intro Banner */}
      <div style={{
        background: 'linear-gradient(180deg, #ff660022 0%, #ff660011 100%)',
        borderBottom: '2px solid #ff6600',
        padding: '12px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>
          THE FIRST FULLY TRANSPARENT AI TRADING AGENT
        </div>
        <div style={{ fontSize: '10px', color: '#ffaa00' }}>
          Watch an AI manage a treasury in real-time. No hidden algorithms. No black boxes.
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '12px' }}>
        {steps.map((step, index) => (
          <div key={step.number} style={{
            display: 'flex',
            marginBottom: index < steps.length - 1 ? '12px' : 0,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(180deg, #ff6600 0%, #cc4400 100%)',
              border: '1px solid #ff8800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#ffffff',
              marginRight: '12px',
              flexShrink: 0,
            }}>
              {step.number}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#ffaa00', marginBottom: '2px' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '10px', color: '#999999', lineHeight: '1.4' }}>
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bb-divider" />

      {/* Key Points */}
      <div className="bb-grid bb-grid-3" style={{ margin: '2px' }}>
        <div className="bb-stat-box" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>*</div>
          <div style={{ color: '#ffaa00', fontSize: '11px', fontWeight: 'bold' }}>TRUSTLESS</div>
          <div style={{ fontSize: '9px', color: '#666666', marginTop: '4px' }}>
            Agent wallet is public. Verify every transaction on-chain.
          </div>
        </div>
        <div className="bb-stat-box" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>*</div>
          <div style={{ color: '#ffaa00', fontSize: '11px', fontWeight: 'bold' }}>REAL AI</div>
          <div style={{ fontSize: '9px', color: '#666666', marginTop: '4px' }}>
            Powered by Claude. See actual reasoning, not canned responses.
          </div>
        </div>
        <div className="bb-stat-box" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', marginBottom: '4px' }}>*</div>
          <div style={{ color: '#ffaa00', fontSize: '11px', fontWeight: 'bold' }}>24/7</div>
          <div style={{ fontSize: '9px', color: '#666666', marginTop: '4px' }}>
            Never sleeps. Monitors markets around the clock.
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: '#0d0d0d',
        padding: '12px',
        textAlign: 'center',
        borderTop: '1px solid #ff6600',
      }}>
        <div style={{ fontSize: '10px', color: '#666666', marginBottom: '8px' }}>
          The twist? You can watch the AI think. Every market analysis, every hesitation, every decision.
        </div>
        <a href="#terminal">
          <button style={{
            background: 'linear-gradient(180deg, #00aa00 0%, #006600 100%)',
            border: '1px solid #00ff00',
            color: '#ffffff',
            padding: '8px 24px',
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: 'pointer',
          }}>
            WATCH THE AGENT THINK
          </button>
        </a>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>INFO GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
