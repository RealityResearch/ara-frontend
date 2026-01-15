'use client';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Buy $ARA',
      description: 'Purchase $ARA on pump.fun. A small creator fee is collected on each trade.',
    },
    {
      number: '2',
      title: 'Fees Fund Agent',
      description: 'Creator fees flow directly into the AI trading wallet. This is the retirement fund.',
    },
    {
      number: '3',
      title: 'Claude Analyzes',
      description: 'The AI agent monitors prices, volume, sentiment, and whale movements 24/7.',
    },
    {
      number: '4',
      title: 'Trades Execute',
      description: 'When conditions are right, the agent executes trades autonomously on Solana.',
    },
    {
      number: '5',
      title: 'Full Transparency',
      description: 'Every thought, every decision, every trade - visible in real-time on this site.',
    },
  ];

  const features = [
    { title: 'Trustless', description: 'Agent wallet is public. Verify every transaction on-chain.' },
    { title: 'Real AI', description: 'Powered by Claude. See actual reasoning, not canned responses.' },
    { title: '24/7', description: 'Never sleeps. Monitors markets around the clock.' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        How It Works
      </div>

      {/* Banner */}
      <div className="how-banner">
        <h3 className="font-display how-banner-title">
          The First Fully Transparent AI Trading Agent
        </h3>
        <p className="how-banner-subtitle">
          Watch an AI manage a treasury in real-time. No hidden algorithms. No black boxes.
        </p>
      </div>

      {/* Steps */}
      <div className="how-steps">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`how-step ${index < steps.length - 1 ? 'has-border' : ''}`}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <div className="step-title">{step.title}</div>
              <div className="step-description">{step.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="how-features">
        {features.map((feature) => (
          <div key={feature.title} className="feature-item">
            <div className="feature-title">{feature.title}</div>
            <div className="feature-description">{feature.description}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="card-footer center">
        <p className="how-cta-text">
          The twist? You can watch the AI think. Every market analysis, every hesitation, every decision.
        </p>
        <a href="#terminal" className="btn btn-primary">
          Watch the Agent Think
        </a>
      </div>
    </div>
  );
}
