'use client';

import { useState, useEffect } from 'react';
import {
  mockEvolution,
  getCurrentLevel,
  getLevelProgress,
  BOT_LEVELS,
  type EvolutionData,
} from '@/lib/mockData';

interface Props {
  data?: EvolutionData;
}

export function BotEvolution({ data = mockEvolution }: Props) {
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const currentLevel = getCurrentLevel(data?.currentXp ?? 0);
  const progress = getLevelProgress(data?.currentXp ?? 0) ?? 0;
  const nextLevel = BOT_LEVELS.find(l => l.minXp > (data?.currentXp ?? 0));

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const statBars = [
    { label: 'EXPERIENCE', value: data.stats.experience, gain: data.recentGains.experience, color: '#3399ff' },
    { label: 'ACCURACY', value: data.stats.accuracy, gain: data.recentGains.accuracy, color: '#00ff00' },
    { label: 'ANALYSIS', value: data.stats.analysis, gain: data.recentGains.analysis, color: '#ffaa00' },
    { label: 'ADAPTATION', value: data.stats.adaptation, gain: data.recentGains.adaptation, color: '#ff6600' },
    { label: 'RISK MGMT', value: data.stats.riskMgmt, gain: data.recentGains.riskMgmt, color: '#ff3333' },
  ];

  return (
    <div id="evolution" className="bb-terminal" style={{ marginBottom: '16px' }}>
      {/* Bloomberg Header */}
      <div className="bb-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="bb-brand">AGENT EVOLUTION</span>
          <span style={{ color: '#ffaa00', fontSize: '10px' }}>XP SYSTEM</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="bb-time">{currentTime}</span>
          <span className="bb-badge" style={{ background: currentLevel.color, color: '#000' }}>
            {currentLevel.name.split(' ')[0].toUpperCase()}
          </span>
        </div>
      </div>

      {/* Level Banner */}
      <div style={{
        background: `linear-gradient(180deg, ${currentLevel.color}22 0%, ${currentLevel.color}11 100%)`,
        borderBottom: `2px solid ${currentLevel.color}`,
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{ fontSize: '32px' }}>{currentLevel.icon}</div>
        <div>
          <div style={{ color: currentLevel.color, fontSize: '16px', fontWeight: 'bold' }}>
            {currentLevel.name}
          </div>
          <div style={{ color: '#666666', fontSize: '10px' }}>
            {data.currentXp.toLocaleString()} XP EARNED
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ color: '#ffaa00', fontSize: '12px', fontWeight: 'bold' }}>
            {progress.toFixed(1)}%
          </div>
          <div style={{ color: '#666666', fontSize: '9px' }}>TO NEXT LEVEL</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '2px', padding: '2px' }}>
        {/* Left: XP Progress */}
        <div style={{ flex: 1 }} className="bb-panel">
          <div style={{ padding: '8px' }}>
            <div style={{ color: '#ffaa00', fontSize: '9px', marginBottom: '8px', letterSpacing: '1px' }}>
              EXPERIENCE PROGRESS
            </div>

            {/* XP Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '4px' }}>
                <span style={{ color: currentLevel.color }}>{currentLevel.name}</span>
                <span style={{ color: '#666666' }}>{nextLevel ? nextLevel.name : 'MAX'}</span>
              </div>
              <div className="bb-allocation-bar" style={{ height: '20px' }}>
                <div
                  className="bb-allocation-segment"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(180deg, ${currentLevel.color} 0%, ${currentLevel.color}88 100%)`,
                  }}
                >
                  {progress > 20 && <span style={{ color: '#000', fontWeight: 'bold' }}>{progress.toFixed(0)}%</span>}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#666666', marginTop: '2px' }}>
                <span>{(currentLevel?.minXp ?? 0).toLocaleString()} XP</span>
                <span>{nextLevel ? (nextLevel.minXp ?? 0).toLocaleString() : '--'} XP</span>
              </div>
            </div>

            {/* Stats Table */}
            <table className="bb-table" style={{ fontSize: '10px' }}>
              <tbody>
                <tr>
                  <td style={{ color: '#666666' }}>CYCLES</td>
                  <td style={{ textAlign: 'right', color: '#ffffff' }}>{data.cyclesCompleted}</td>
                </tr>
                <tr>
                  <td style={{ color: '#666666' }}>UPTIME</td>
                  <td style={{ textAlign: 'right', color: '#ffffff' }}>{data.uptime}</td>
                </tr>
                <tr>
                  <td style={{ color: '#666666' }}>TOTAL XP</td>
                  <td style={{ textAlign: 'right' }} className="bb-positive">+{data.totalXpEarned.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Stat Bars */}
        <div style={{ flex: 1 }} className="bb-panel">
          <div style={{ padding: '8px' }}>
            <div style={{ color: '#ffaa00', fontSize: '9px', marginBottom: '8px', letterSpacing: '1px' }}>
              AGENT STATS
            </div>

            {statBars.map((stat) => (
              <div key={stat.label} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                  <span style={{ color: '#666666' }}>{stat.label}</span>
                  <span>
                    <span style={{ color: '#ffffff' }}>{stat.value}</span>
                    {stat.gain > 0 && (
                      <span className="bb-positive" style={{ marginLeft: '4px', fontSize: '8px' }}>+{stat.gain}</span>
                    )}
                  </span>
                </div>
                <div className="bb-allocation-bar" style={{ height: '8px' }}>
                  <div
                    className="bb-allocation-segment"
                    style={{
                      width: `${Math.min(stat.value, 100)}%`,
                      background: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}

            <div style={{ fontSize: '8px', color: '#666666', textAlign: 'center', marginTop: '8px', fontStyle: 'italic' }}>
              Stats improve as the agent learns from trades
            </div>
          </div>
        </div>
      </div>

      {/* Career Path */}
      <div style={{ padding: '8px' }}>
        <div style={{ color: '#ffaa00', fontSize: '9px', marginBottom: '8px', letterSpacing: '1px' }}>
          CAREER PATH
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {BOT_LEVELS.map((level) => {
            const isUnlocked = data.currentXp >= level.minXp;
            const isCurrent = level.name === currentLevel.name;

            return (
              <div
                key={level.name}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '6px 2px',
                  background: isCurrent ? `${level.color}33` : '#0d0d0d',
                  border: isCurrent ? `2px solid ${level.color}` : '1px solid #333333',
                  opacity: isUnlocked ? 1 : 0.4,
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
                  textOverflow: 'ellipsis',
                }}>
                  {level.name.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Function Keys */}
      <div className="bb-function-keys">
        <button className="bb-fkey">
          <span className="bb-fkey-label">F1</span>
          HELP
        </button>
        <button className="bb-fkey">
          <span className="bb-fkey-label">F2</span>
          HISTORY
        </button>
        <button className="bb-fkey" style={{ marginLeft: 'auto' }}>
          <span className="bb-fkey-label">F10</span>
          MENU
        </button>
      </div>

      {/* Command Line */}
      <div className="bb-command">
        <span className="bb-prompt">{'>'}</span>
        <span style={{ color: '#ff6600' }}>EVOLUTION GO</span>
        <span className="bb-cursor"></span>
      </div>
    </div>
  );
}
