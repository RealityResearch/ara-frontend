'use client';

interface Feature {
  title: string;
  description: string;
  icon: string;
  status: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Future';
}

const features: Feature[] = [
  {
    title: 'Retirement Age Lock',
    description: 'Set your target retirement date. Withdraw early? Pay a penalty.',
    icon: '...',
    status: 'Phase 1',
  },
  {
    title: 'Employer Match',
    description: 'Protocol matches a percentage of your stake from creator fees.',
    icon: '...',
    status: 'Phase 1',
  },
  {
    title: 'Staking Tiers',
    description: '30, 60, 90, or 365 day locks with escalating APY rewards.',
    icon: '...',
    status: 'Phase 2',
  },
  {
    title: 'Milestone NFTs',
    description: 'Achievement badges for holding. Flex your diamond hands.',
    icon: '...',
    status: 'Phase 2',
  },
  {
    title: 'Governance',
    description: 'Vote on agent parameters: risk tolerance, asset allocation.',
    icon: '...',
    status: 'Phase 3',
  },
  {
    title: 'Multi-Agent System',
    description: 'Specialized agents for different strategies.',
    icon: '...',
    status: 'Future',
  },
];

function getStatusStyle(status: Feature['status']) {
  switch (status) {
    case 'Phase 1':
      return { bg: 'linear-gradient(180deg, #CCFFCC 0%, #AAFFAA 100%)', border: '#009900', color: '#006600' };
    case 'Phase 2':
      return { bg: 'linear-gradient(180deg, #FFFFCC 0%, #FFFFAA 100%)', border: '#CC9900', color: '#996600' };
    case 'Phase 3':
      return { bg: 'linear-gradient(180deg, #FFCCCC 0%, #FFAAAA 100%)', border: '#CC0000', color: '#990000' };
    case 'Future':
      return { bg: 'linear-gradient(180deg, #E0E0E0 0%, #C8C8C8 100%)', border: '#999999', color: '#666666' };
  }
}

export function ComingSoon() {
  return (
    <div id="roadmap" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        ROADMAP - COMING SOON
        <span style={{ marginLeft: '8px', fontSize: '9px', color: '#FFCC00' }}>NEW!</span>
      </div>

      {/* Main Content */}
      <div className="skeu-panel" style={{ borderRadius: '0 0 6px 6px', padding: '12px' }}>
        {/* Intro Text */}
        <div className="skeu-panel" style={{
          marginBottom: '12px',
          padding: '8px',
          background: 'linear-gradient(180deg, #f0f8ff 0%, #e0f0ff 100%)'
        }}>
          <strong>Announcement:</strong> Building the most advanced autonomous retirement fund on Solana.
          Every feature designed to maximize your retirement gains.
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
          {features.map((feature) => {
            const statusStyle = getStatusStyle(feature.status);
            return (
              <div key={feature.title} className="skeu-panel" style={{ padding: '12px' }}>
                <div className="skeu-section-header" style={{
                  marginBottom: '8px',
                  fontSize: '10px',
                  padding: '4px 8px'
                }}>
                  {feature.icon} {feature.title}
                </div>
                <p style={{ fontSize: '10px', margin: '0 0 8px 0', color: '#333333' }}>
                  {feature.description}
                </p>
                <div className="skeu-btn" style={{
                  fontSize: '9px',
                  padding: '2px 8px',
                  background: statusStyle.bg,
                  border: `1px solid ${statusStyle.border}`,
                  color: statusStyle.color,
                  display: 'inline-block'
                }}>
                  {feature.status}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="skeu-panel" style={{ padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Development Progress:</span>
            <div style={{
              flex: 1,
              background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)',
              border: '1px solid #a0a0a0',
              borderRadius: '4px',
              height: '16px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                background: 'linear-gradient(180deg, #66CC66 0%, #449944 50%, #338833 100%)',
                width: '33%',
                height: '100%',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
              }} />
            </div>
            <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#008800' }}>Phase 1</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '9px', color: '#666666' }}>
            <span>Launch</span>
            <span>Phase 1</span>
            <span>Phase 2</span>
            <span>Phase 3</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#666666', marginBottom: '8px' }}>
            Want to help shape the future of $ARA?
          </div>
          <a href="https://x.com/ClaudeCapital" target="_blank" rel="noopener noreferrer">
            <button className="skeu-btn" style={{ fontSize: '11px' }}>
              Follow @ClaudeCapital
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
