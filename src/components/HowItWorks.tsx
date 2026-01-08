'use client';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'You Buy $ARA',
      description: 'Purchase $ARA on pump.fun. A small creator fee is collected on each trade.',
      icon: '$',
    },
    {
      number: '2',
      title: 'Fees Fund the Agent',
      description: 'Creator fees flow directly into the AI trading wallet. This is the retirement fund.',
      icon: 'B',
    },
    {
      number: '3',
      title: 'Claude Analyzes Markets',
      description: 'The AI agent monitors prices, volume, sentiment, and whale movements 24/7.',
      icon: 'AI',
    },
    {
      number: '4',
      title: 'Trades Execute Live',
      description: 'When conditions are right, the agent executes trades autonomously on Solana.',
      icon: '!',
    },
    {
      number: '5',
      title: 'Full Transparency',
      description: 'Every thought, every decision, every trade - visible in real-time on this site.',
      icon: 'O',
    },
  ];

  return (
    <div id="how-it-works" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        HOW IT WORKS
      </div>

      {/* Main Content */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', padding: 0 }}>
        {/* Intro */}
        <div className="skeu-section-header" style={{
          borderRadius: 0,
          textAlign: 'center',
          padding: '12px'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
            The First Fully Transparent AI Trading Agent
          </div>
          <div style={{ fontSize: '11px', color: '#99CCFF', fontWeight: 'normal' }}>
            Watch an AI manage a treasury in real-time. No hidden algorithms. No black boxes.
          </div>
        </div>

        {/* Steps */}
        <div style={{ padding: '12px' }}>
          {steps.map((step, index) => (
            <div key={step.number} style={{ display: 'flex', marginBottom: index < steps.length - 1 ? '8px' : 0 }}>
              <div className="skeu-btn" style={{
                width: '36px',
                height: '36px',
                minWidth: '36px',
                background: 'linear-gradient(180deg, #4a90d9 0%, #2070c0 50%, #1060b0 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                marginRight: '12px',
                textShadow: '0 -1px 0 rgba(0,0,0,0.3)'
              }}>
                {step.number}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#003366', marginBottom: '2px' }}>
                  <span style={{ marginRight: '6px' }}>{step.icon}</span>
                  {step.title}
                </div>
                <div style={{ fontSize: '11px', color: '#666666', lineHeight: '1.4' }}>
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="skeu-metallic" style={{ borderTop: '1px solid #a0a0a0', padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>...</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003366' }}>Trustless</div>
              <div style={{ fontSize: '9px', color: '#666666' }}>
                Agent wallet is public. Verify every transaction on-chain.
              </div>
            </div>
            <div style={{ textAlign: 'center', flex: 1, borderLeft: '1px dotted #a0a0a0', paddingLeft: '12px' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>...</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003366' }}>Real AI</div>
              <div style={{ fontSize: '9px', color: '#666666' }}>
                Powered by Claude. See actual reasoning, not canned responses.
              </div>
            </div>
            <div style={{ textAlign: 'center', flex: 1, borderLeft: '1px dotted #a0a0a0', paddingLeft: '12px' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>...</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003366' }}>24/7</div>
              <div style={{ fontSize: '9px', color: '#666666' }}>
                Never sleeps. Monitors markets around the clock.
              </div>
            </div>
          </div>
        </div>

        {/* The Hook */}
        <div style={{
          background: 'linear-gradient(180deg, #fffde8 0%, #fff8d0 100%)',
          borderTop: '1px solid #d4a574',
          padding: '12px',
          textAlign: 'center',
          borderRadius: '0 0 6px 6px'
        }}>
          <div style={{ fontSize: '11px', color: '#666600', marginBottom: '8px' }}>
            <strong>The twist?</strong> You can watch the AI think. Every market analysis, every hesitation,
            every &quot;ape in&quot; moment - streamed live to the terminal above.
          </div>
          <a href="#terminal">
            <button className="skeu-btn-green skeu-btn" style={{ fontSize: '11px' }}>
              Watch the Agent Think
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
