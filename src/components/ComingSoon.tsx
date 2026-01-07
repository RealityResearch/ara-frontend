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
    icon: '🔒',
    status: 'Phase 1',
  },
  {
    title: 'Employer Match',
    description: 'Protocol matches a percentage of your stake from creator fees.',
    icon: '🤝',
    status: 'Phase 1',
  },
  {
    title: 'Staking Tiers',
    description: '30, 60, 90, or 365 day locks with escalating APY rewards.',
    icon: '📈',
    status: 'Phase 2',
  },
  {
    title: 'Milestone NFTs',
    description: 'Achievement badges for holding. Flex your diamond hands.',
    icon: '🏆',
    status: 'Phase 2',
  },
  {
    title: 'Governance',
    description: 'Vote on agent parameters: risk tolerance, asset allocation.',
    icon: '🗳️',
    status: 'Phase 3',
  },
  {
    title: 'Multi-Agent System',
    description: 'Specialized agents for different strategies.',
    icon: '🤖',
    status: 'Future',
  },
];

export function ComingSoon() {
  return (
    <div id="roadmap" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              🗺️ ROADMAP - COMING SOON
              {' '}
              <span className="badge-new" style={{ marginLeft: '8px' }}>NEW!</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Content */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', padding: '12px', background: '#F5F5DC' }}>
        {/* Intro Text */}
        <div className="box-highlight" style={{ marginBottom: '12px' }}>
          <strong>📢 Announcement:</strong> Building the most advanced autonomous retirement fund on Solana.
          Every feature designed to maximize your retirement gains.
        </div>

        {/* Features Grid */}
        <table width="100%" cellPadding={4} cellSpacing={4}>
          <tbody>
            <tr>
              {features.slice(0, 3).map((feature) => (
                <td key={feature.title} width="33%" valign="top">
                  <div className="fieldset-y2k" style={{ height: '100%' }}>
                    <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                      {feature.icon} {feature.title}
                    </div>
                    <p style={{ fontSize: '10px', margin: '0 0 8px 0', color: '#333333' }}>
                      {feature.description}
                    </p>
                    <div style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      background: feature.status === 'Phase 1' ? '#CCFFCC' : feature.status === 'Future' ? '#E0E0E0' : '#FFFFCC',
                      border: `1px solid ${feature.status === 'Phase 1' ? '#009900' : feature.status === 'Future' ? '#999999' : '#CC9900'}`,
                      display: 'inline-block'
                    }}>
                      {feature.status}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              {features.slice(3, 6).map((feature) => (
                <td key={feature.title} width="33%" valign="top">
                  <div className="fieldset-y2k" style={{ height: '100%' }}>
                    <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                      {feature.icon} {feature.title}
                    </div>
                    <p style={{ fontSize: '10px', margin: '0 0 8px 0', color: '#333333' }}>
                      {feature.description}
                    </p>
                    <div style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      background: feature.status === 'Phase 1' ? '#CCFFCC' : feature.status === 'Future' ? '#E0E0E0' : '#FFFFCC',
                      border: `1px solid ${feature.status === 'Phase 1' ? '#009900' : feature.status === 'Future' ? '#999999' : '#CC9900'}`,
                      display: 'inline-block'
                    }}>
                      {feature.status}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Progress Bar */}
        <div style={{ marginTop: '12px', padding: '8px', background: '#FFFFFF', border: '1px solid #CCCCCC' }}>
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                <td style={{ fontSize: '10px', fontWeight: 'bold' }}>Development Progress:</td>
                <td width="70%">
                  <div style={{
                    background: '#E0E0E0',
                    border: '2px inset #CCCCCC',
                    height: '16px',
                    position: 'relative'
                  }}>
                    <div style={{
                      background: 'linear-gradient(to bottom, #66CC66 0%, #339933 50%, #228822 100%)',
                      width: '33%',
                      height: '100%'
                    }} />
                  </div>
                </td>
                <td style={{ fontSize: '10px', fontWeight: 'bold', color: '#008800', paddingLeft: '8px' }}>Phase 1</td>
              </tr>
            </tbody>
          </table>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginTop: '4px' }}>
            <tbody>
              <tr style={{ fontSize: '9px', color: '#666666' }}>
                <td>Launch</td>
                <td align="center">Phase 1</td>
                <td align="center">Phase 2</td>
                <td align="right">Phase 3</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#666666', marginBottom: '8px' }}>
            Want to help shape the future of $ARA?
          </div>
          <a href="https://x.com/ClaudeCapital" target="_blank" rel="noopener noreferrer">
            <button className="btn-action">
              Follow @ClaudeCapital
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
