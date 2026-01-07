'use client';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'You Buy $ARA',
      description: 'Purchase $ARA on pump.fun. A small creator fee is collected on each trade.',
      icon: '💰',
    },
    {
      number: '2',
      title: 'Fees Fund the Agent',
      description: 'Creator fees flow directly into the AI trading wallet. This is the retirement fund.',
      icon: '🏦',
    },
    {
      number: '3',
      title: 'Claude Analyzes Markets',
      description: 'The AI agent monitors prices, volume, sentiment, and whale movements 24/7.',
      icon: '🤖',
    },
    {
      number: '4',
      title: 'Trades Execute Live',
      description: 'When conditions are right, the agent executes trades autonomously on Solana.',
      icon: '⚡',
    },
    {
      number: '5',
      title: 'Full Transparency',
      description: 'Every thought, every decision, every trade — visible in real-time on this site.',
      icon: '👁️',
    },
  ];

  return (
    <div id="how-it-works" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              ⚙️ HOW IT WORKS
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Content */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', background: '#FFFFFF' }}>
        {/* Intro */}
        <div style={{
          background: 'linear-gradient(to right, #003366 0%, #004488 100%)',
          padding: '12px',
          color: '#FFFFFF',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
            The First Fully Transparent AI Trading Agent
          </div>
          <div style={{ fontSize: '11px', color: '#99CCFF' }}>
            Watch an AI manage a treasury in real-time. No hidden algorithms. No black boxes.
          </div>
        </div>

        {/* Steps */}
        <div style={{ padding: '12px' }}>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              {steps.map((step, index) => (
                <tr key={step.number}>
                  <td width="50" valign="top" style={{ padding: '8px 0' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(to bottom, #003399 0%, #001166 100%)',
                      border: '2px outset #003399',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      fontFamily: 'Arial, sans-serif'
                    }}>
                      {step.number}
                    </div>
                  </td>
                  <td valign="top" style={{ padding: '8px 0 8px 8px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#003366', marginBottom: '2px' }}>
                      <span style={{ marginRight: '6px' }}>{step.icon}</span>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666666', lineHeight: '1.4' }}>
                      {step.description}
                    </div>
                  </td>
                  {index < steps.length - 1 && (
                    <td width="30" valign="middle" style={{ textAlign: 'center', color: '#CCCCCC' }}>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Connector Line */}
          <div style={{
            position: 'relative',
            marginLeft: '26px',
            marginTop: '-220px',
            marginBottom: '220px',
            width: '2px',
            height: '200px',
            background: 'repeating-linear-gradient(to bottom, #003399 0px, #003399 4px, transparent 4px, transparent 8px)',
            display: 'none' // hidden for now, can enable for visual effect
          }} />
        </div>

        {/* Key Points */}
        <div style={{
          background: '#F5F5DC',
          borderTop: '1px solid #CCCCCC',
          padding: '12px'
        }}>
          <table width="100%" cellPadding={8} cellSpacing={0}>
            <tbody>
              <tr>
                <td width="33%" valign="top" style={{ borderRight: '1px dotted #CCCCCC' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔐</div>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003366' }}>Trustless</div>
                    <div style={{ fontSize: '9px', color: '#666666' }}>
                      Agent wallet is public. Verify every transaction on-chain.
                    </div>
                  </div>
                </td>
                <td width="33%" valign="top" style={{ borderRight: '1px dotted #CCCCCC' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>🧠</div>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003366' }}>Real AI</div>
                    <div style={{ fontSize: '9px', color: '#666666' }}>
                      Powered by Claude. See actual reasoning, not canned responses.
                    </div>
                  </div>
                </td>
                <td width="33%" valign="top">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>⏱️</div>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#003366' }}>24/7</div>
                    <div style={{ fontSize: '9px', color: '#666666' }}>
                      Never sleeps. Monitors markets around the clock.
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The Hook */}
        <div style={{
          background: '#FFFFCC',
          borderTop: '1px solid #CCCC99',
          padding: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', color: '#666600', marginBottom: '8px' }}>
            <strong>The twist?</strong> You can watch the AI think. Every market analysis, every hesitation,
            every &quot;ape in&quot; moment — streamed live to the terminal above.
          </div>
          <a href="#terminal">
            <button className="btn-buy-y2k" style={{ fontSize: '11px' }}>
              ↑ Watch the Agent Think
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
