'use client';

import {
  mockEvolution,
  getCurrentLevel,
  getLevelProgress,
  BOT_LEVELS,
  type EvolutionData,
  type BotStats
} from '@/lib/mockData';

interface StatBarProps {
  label: string;
  value: number;
  gain: number;
  maxValue?: number;
  color: string;
}

function StatBar({ label, value, gain, maxValue = 100, color }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <tr>
      <td style={{ fontSize: '9px', color: '#666666', width: '80px', paddingRight: '8px' }}>
        {label}
      </td>
      <td style={{ width: '100%' }}>
        <div style={{
          background: '#E0E0E0',
          border: '2px inset #CCCCCC',
          height: '12px',
          position: 'relative'
        }}>
          <div style={{
            background: `linear-gradient(to bottom, ${color} 0%, ${color}99 100%)`,
            width: `${percentage}%`,
            height: '100%',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </td>
      <td style={{ fontSize: '10px', fontFamily: 'Courier New', width: '40px', textAlign: 'right', paddingLeft: '8px' }}>
        {value}
      </td>
      <td style={{ fontSize: '9px', width: '40px', textAlign: 'right', color: gain > 0 ? '#008800' : '#666666' }}>
        {gain > 0 ? `+${gain}` : '—'}
      </td>
    </tr>
  );
}

interface Props {
  data?: EvolutionData;
}

export function BotEvolution({ data = mockEvolution }: Props) {
  const currentLevel = getCurrentLevel(data.currentXp);
  const progress = getLevelProgress(data.currentXp);
  const nextLevel = BOT_LEVELS.find(l => l.minXp > data.currentXp);

  return (
    <div id="evolution" style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td className="section-header">
              <span style={{ marginRight: '8px' }}>AGENT EVOLUTION</span>
              <span className="badge-new">XP</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Content */}
      <div style={{ border: '1px solid #CCCCCC', borderTop: 'none', background: '#FFFFFF' }}>
        {/* Level Banner */}
        <div style={{
          background: `linear-gradient(to right, ${currentLevel.color}22 0%, ${currentLevel.color}44 50%, ${currentLevel.color}22 100%)`,
          borderBottom: `2px solid ${currentLevel.color}`,
          padding: '12px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', marginBottom: '4px' }}>{currentLevel.icon}</div>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: currentLevel.color,
            textShadow: '1px 1px 0 #FFFFFF'
          }}>
            {currentLevel.name}
          </div>
          <div style={{ fontSize: '10px', color: '#666666', marginTop: '4px' }}>
            {data.currentXp.toLocaleString()} XP earned
          </div>
        </div>

        <div style={{ padding: '12px' }}>
          {/* Two Column Layout */}
          <table width="100%" cellPadding={0} cellSpacing={0}>
            <tbody>
              <tr>
                {/* Left: XP Progress */}
                <td width="50%" valign="top" style={{ paddingRight: '12px' }}>
                  <div className="fieldset-y2k" style={{ margin: 0 }}>
                    <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                      Experience Progress
                    </div>

                    {/* XP Bar */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '9px',
                        marginBottom: '4px'
                      }}>
                        <span style={{ color: currentLevel.color, fontWeight: 'bold' }}>
                          {currentLevel.name}
                        </span>
                        <span style={{ color: '#666666' }}>
                          {nextLevel ? nextLevel.name : 'MAX'}
                        </span>
                      </div>
                      <div style={{
                        background: '#E0E0E0',
                        border: '2px inset #CCCCCC',
                        height: '20px',
                        position: 'relative'
                      }}>
                        <div style={{
                          background: `linear-gradient(to bottom, ${currentLevel.color} 0%, ${currentLevel.color}BB 50%, ${currentLevel.color}88 100%)`,
                          width: `${progress}%`,
                          height: '100%',
                          transition: 'width 0.5s ease'
                        }} />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '10px',
                          fontWeight: 'bold',
                          color: progress > 50 ? '#FFFFFF' : '#333333',
                          textShadow: progress > 50 ? '1px 1px 0 #00000066' : 'none'
                        }}>
                          {progress.toFixed(1)}%
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '8px',
                        color: '#999999',
                        marginTop: '2px'
                      }}>
                        <span>{currentLevel.minXp.toLocaleString()} XP</span>
                        <span>{nextLevel ? nextLevel.minXp.toLocaleString() : '∞'} XP</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{
                      background: '#F5F5F5',
                      border: '1px solid #CCCCCC',
                      padding: '8px',
                      fontSize: '10px'
                    }}>
                      <table width="100%" cellPadding={2} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td style={{ color: '#666666' }}>Cycles Completed:</td>
                            <td style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>{data.cyclesCompleted}</td>
                          </tr>
                          <tr>
                            <td style={{ color: '#666666' }}>Uptime:</td>
                            <td style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>{data.uptime}</td>
                          </tr>
                          <tr>
                            <td style={{ color: '#666666' }}>Total XP Earned:</td>
                            <td style={{ fontFamily: 'Courier New', fontWeight: 'bold', color: '#008800' }}>
                              +{data.totalXpEarned.toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>

                {/* Right: Stat Bars */}
                <td width="50%" valign="top">
                  <div className="fieldset-y2k" style={{ margin: 0 }}>
                    <div className="fieldset-y2k-legend" style={{ marginLeft: '-4px', marginTop: '-20px', marginBottom: '8px' }}>
                      Agent Stats
                    </div>

                    <table width="100%" cellPadding={2} cellSpacing={4}>
                      <tbody>
                        <StatBar
                          label="Experience"
                          value={data.stats.experience}
                          gain={data.recentGains.experience}
                          color="#4488CC"
                        />
                        <StatBar
                          label="Accuracy"
                          value={data.stats.accuracy}
                          gain={data.recentGains.accuracy}
                          color="#44BB44"
                        />
                        <StatBar
                          label="Analysis"
                          value={data.stats.analysis}
                          gain={data.recentGains.analysis}
                          color="#9966CC"
                        />
                        <StatBar
                          label="Adaptation"
                          value={data.stats.adaptation}
                          gain={data.recentGains.adaptation}
                          color="#CC8833"
                        />
                        <StatBar
                          label="Risk Mgmt"
                          value={data.stats.riskMgmt}
                          gain={data.recentGains.riskMgmt}
                          color="#CC4444"
                        />
                      </tbody>
                    </table>

                    <div style={{
                      fontSize: '8px',
                      color: '#999999',
                      marginTop: '8px',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}>
                      Stats improve as the agent learns from trades
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Level Roadmap */}
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '9px', color: '#666666', marginBottom: '4px', fontWeight: 'bold' }}>
              CAREER PATH
            </div>
            <div style={{
              display: 'flex',
              gap: '2px',
              background: '#F0F0F0',
              border: '1px solid #CCCCCC',
              padding: '4px'
            }}>
              {BOT_LEVELS.map((level, index) => {
                const isUnlocked = data.currentXp >= level.minXp;
                const isCurrent = level.name === currentLevel.name;

                return (
                  <div
                    key={level.name}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '4px 2px',
                      background: isCurrent
                        ? `linear-gradient(to bottom, ${level.color}44 0%, ${level.color}22 100%)`
                        : isUnlocked
                          ? '#FFFFFF'
                          : '#E0E0E0',
                      border: isCurrent ? `2px solid ${level.color}` : '1px solid #CCCCCC',
                      opacity: isUnlocked ? 1 : 0.5
                    }}
                    title={`${level.name}: ${level.minXp.toLocaleString()} XP`}
                  >
                    <div style={{ fontSize: '14px' }}>{level.icon}</div>
                    <div style={{
                      fontSize: '7px',
                      color: isCurrent ? level.color : '#666666',
                      fontWeight: isCurrent ? 'bold' : 'normal',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {level.name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
