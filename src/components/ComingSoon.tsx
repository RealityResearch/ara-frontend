'use client';

interface Feature {
  title: string;
  description: string;
  status: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Future';
}

const features: Feature[] = [
  { title: 'RETIREMENT AGE LOCK', description: 'Set your target retirement date. Withdraw early? Pay a penalty.', status: 'Phase 1' },
  { title: 'EMPLOYER MATCH', description: 'Protocol matches a percentage of your stake from creator fees.', status: 'Phase 1' },
  { title: 'STAKING TIERS', description: '30, 60, 90, or 365 day locks with escalating APY rewards.', status: 'Phase 2' },
  { title: 'MILESTONE NFTs', description: 'Achievement badges for holding. Flex your diamond hands.', status: 'Phase 2' },
  { title: 'GOVERNANCE', description: 'Vote on agent parameters: risk tolerance, asset allocation.', status: 'Phase 3' },
  { title: 'MULTI-AGENT', description: 'Specialized agents for different strategies.', status: 'Future' },
];

function getStatusStyle(status: Feature['status']) {
  switch (status) {
    case 'Phase 1': return { bg: '#00aa00', color: '#ffffff' };
    case 'Phase 2': return { bg: '#ffaa00', color: '#000000' };
    case 'Phase 3': return { bg: '#ff6600', color: '#ffffff' };
    case 'Future': return { bg: '#666666', color: '#ffffff' };
  }
}

export function ComingSoon() {
  const phase1Count = features.filter(f => f.status === 'Phase 1').length;
  const totalCount = features.length;
  const progressPercent = (phase1Count / totalCount) * 100 + 10; // Add some for current work

  return (
    <div id="roadmap" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">ROADMAP</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>COMING SOON</span>
        </div>
        <span className="bb-badge" style={{ background: '#ffaa00', color: '#000' }}>NEW</span>
      </div>

      {/* Announcement */}
      <div style={{
        background: 'linear-gradient(180deg, #3399ff22 0%, #3399ff11 100%)',
        borderBottom: '2px solid #3399ff',
        padding: '12px',
      }}>
        <span style={{ color: '#3399ff', fontWeight: 'bold' }}>ANNOUNCEMENT:</span>
        <span style={{ color: '#ffffff', marginLeft: '8px' }}>
          Building the most advanced autonomous retirement fund on Solana.
        </span>
      </div>

      {/* Features Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', padding: '2px' }}>
        {features.map((feature) => {
          const statusStyle = getStatusStyle(feature.status);
          return (
            <div key={feature.title} className="bb-panel" style={{ padding: '12px' }}>
              <div style={{ color: '#ffaa00', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>
                {feature.title}
              </div>
              <div style={{ fontSize: '9px', color: '#999999', marginBottom: '8px', lineHeight: '1.4' }}>
                {feature.description}
              </div>
              <span style={{
                display: 'inline-block',
                padding: '2px 8px',
                fontSize: '8px',
                fontWeight: 'bold',
                background: statusStyle.bg,
                color: statusStyle.color,
              }}>
                {feature.status.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#ffaa00', fontSize: '9px', letterSpacing: '1px' }}>DEVELOPMENT PROGRESS</span>
          <span style={{ color: '#00ff00', fontSize: '9px', fontWeight: 'bold' }}>PHASE 1</span>
        </div>
        <div className="bb-allocation-bar" style={{ height: '16px' }}>
          <div className="bb-allocation-segment" style={{ width: `${progressPercent}%`, background: '#00aa00' }}>
            <span style={{ fontSize: '9px', color: '#ffffff', fontWeight: 'bold' }}>{progressPercent.toFixed(0)}%</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '8px', color: '#666666' }}>
          <span>LAUNCH</span>
          <span>PHASE 1</span>
          <span>PHASE 2</span>
          <span>PHASE 3</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: '#0d0d0d',
        padding: '12px',
        textAlign: 'center',
        borderTop: '1px solid #333333',
      }}>
        <div style={{ fontSize: '10px', color: '#666666', marginBottom: '8px' }}>
          Want to help shape the future of $ARA?
        </div>
        <a href="https://x.com/ClaudeCapital" target="_blank" rel="noopener noreferrer">
          <button className="bb-fkey" style={{ padding: '8px 24px', fontSize: '11px' }}>
            FOLLOW @CLAUDECAPITAL
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
        <span style={{ color: '#ff6600' }}>ROADMAP GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
