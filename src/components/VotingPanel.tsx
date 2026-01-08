'use client';

import { useState, useEffect, useCallback } from 'react';

interface VoteStatus {
  currentStyle: string;
  styleConfig: {
    name: string;
    emoji: string;
    description: string;
  };
  voteCounts: Record<string, number>;
  timeRemaining: number;
  totalVotes: number;
}

interface VotingPanelProps {
  wsUrl?: string;
}

const TRADING_STYLES = {
  APE: { name: 'APE MODE', emoji: '...', color: '#FF6B35' },
  DIAMOND: { name: 'DIAMOND HANDS', emoji: '...', color: '#00D4FF' },
  PAPER: { name: 'PAPER HANDS', emoji: '...', color: '#AAAAAA' },
  RESEARCH: { name: 'RESEARCH MODE', emoji: '...', color: '#00CC66' },
  DEGEN: { name: 'FULL DEGEN', emoji: '...', color: '#FF00FF' },
};

function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('ara_visitor_id');
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('ara_visitor_id', id);
  }
  return id;
}

function formatTimeRemaining(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function VotingPanel({ wsUrl }: VotingPanelProps) {
  const [voteStatus, setVoteStatus] = useState<VoteStatus | null>(null);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);

  const WS_URL = wsUrl || process.env.NEXT_PUBLIC_AGENT_WS_URL || 'ws://localhost:8080';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('Voting panel connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'vote_status') {
          setVoteStatus({
            currentStyle: message.currentStyle,
            styleConfig: message.styleConfig,
            voteCounts: message.voteCounts,
            timeRemaining: message.timeRemaining,
            totalVotes: message.totalVotes,
          });
        }

        if (message.type === 'vote_confirmed') {
          setVoteMessage(message.message);
          setTimeout(() => setVoteMessage(null), 3000);
        }
      } catch (e) {
        console.error('Error parsing vote message:', e);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [WS_URL]);

  // Timer countdown
  useEffect(() => {
    if (!voteStatus) return;

    const interval = setInterval(() => {
      setVoteStatus(prev => prev ? {
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1000)
      } : null);
    }, 1000);

    return () => clearInterval(interval);
  }, [voteStatus?.timeRemaining]);

  const handleVote = useCallback((style: string) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    const visitorId = getVisitorId();
    ws.send(JSON.stringify({
      type: 'vote',
      visitorId,
      style,
    }));
    setMyVote(style);
  }, [ws]);

  const totalVotes = voteStatus ? Object.values(voteStatus.voteCounts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div style={{ marginBottom: '16px' }}>
      {/* Section Header */}
      <div className="skeu-section-header">
        Community Voting
        <span style={{ marginLeft: '8px', fontSize: '9px', color: isConnected ? '#66FF66' : '#FFAA00' }}>
          {isConnected ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Main Panel */}
      <div className="skeu-window" style={{ borderRadius: '0 0 8px 8px' }}>
        {/* Title Bar */}
        <div className="skeu-window-titlebar">
          <span>Vote for Agent Trading Style</span>
          <span style={{ color: '#FFCC00', fontSize: '10px', fontWeight: 'normal' }}>
            {voteStatus ? `${formatTimeRemaining(voteStatus.timeRemaining)}` : '--:--'}
          </span>
        </div>

        {/* Current Style Display */}
        {voteStatus && (
          <div className="skeu-section-header" style={{
            margin: '8px',
            borderRadius: '4px',
            textAlign: 'center',
            padding: '12px'
          }}>
            <div style={{ fontSize: '10px', color: '#99CCFF' }}>CURRENT MODE</div>
            <div style={{ fontSize: '24px', margin: '4px 0' }}>
              {voteStatus.styleConfig.emoji}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}>
              {voteStatus.styleConfig.name}
            </div>
            <div style={{ fontSize: '9px', color: '#99CCFF', marginTop: '4px' }}>
              {voteStatus.styleConfig.description}
            </div>
          </div>
        )}

        {/* Vote Buttons */}
        <div style={{ padding: '8px' }}>
          <div style={{ fontSize: '10px', color: '#666666', marginBottom: '6px', textAlign: 'center' }}>
            Click to vote | {totalVotes} total vote{totalVotes !== 1 ? 's' : ''} this round
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {Object.entries(TRADING_STYLES).map(([key, style]) => {
              const votes = voteStatus?.voteCounts[key] || 0;
              const isSelected = myVote === key;
              const isCurrent = voteStatus?.currentStyle === key;

              return (
                <button
                  key={key}
                  onClick={() => handleVote(key)}
                  disabled={!isConnected}
                  className="skeu-btn"
                  style={{
                    padding: '8px 12px',
                    fontSize: '10px',
                    minWidth: '90px',
                    background: isSelected
                      ? `linear-gradient(180deg, ${style.color} 0%, ${style.color}CC 50%, ${style.color}AA 100%)`
                      : isCurrent
                        ? 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)'
                        : undefined,
                    color: isSelected ? '#FFFFFF' : undefined,
                    border: isCurrent ? `2px solid ${style.color}` : undefined,
                    opacity: isConnected ? 1 : 0.5,
                    textShadow: isSelected ? '0 -1px 0 rgba(0,0,0,0.3)' : undefined
                  }}
                >
                  <span style={{ fontSize: '16px', display: 'block' }}>{style.emoji}</span>
                  <span style={{ fontSize: '8px', display: 'block', marginTop: '2px' }}>{style.name}</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    display: 'block',
                    marginTop: '2px',
                    color: isSelected ? '#FFFFFF' : style.color
                  }}>
                    {votes}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Vote Message */}
          {voteMessage && (
            <div className="skeu-btn-green" style={{
              marginTop: '8px',
              padding: '6px 12px',
              fontSize: '10px',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              {voteMessage}
            </div>
          )}
        </div>

        {/* Vote Bars */}
        {voteStatus && totalVotes > 0 && (
          <div style={{ padding: '0 8px 8px 8px' }}>
            {Object.entries(TRADING_STYLES).map(([key, style]) => {
              const votes = voteStatus.voteCounts[key] || 0;
              const percent = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

              return (
                <div key={key} style={{ marginBottom: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px' }}>
                    <span>{style.emoji} {key}</span>
                    <span>{votes} ({percent.toFixed(0)}%)</span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'linear-gradient(180deg, #e0e0e0 0%, #c8c8c8 100%)',
                    border: '1px solid #a0a0a0',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${percent}%`,
                      background: `linear-gradient(180deg, ${style.color} 0%, ${style.color}AA 100%)`,
                      transition: 'width 0.3s ease',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Bar */}
        <div style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)',
          borderTop: '1px solid #a0a0a0',
          padding: '6px 8px',
          fontSize: '9px',
          color: '#666666',
          textAlign: 'center',
          borderRadius: '0 0 8px 8px'
        }}>
          Votes reset every 30 minutes | Your vote influences the agent&apos;s trading behavior
        </div>
      </div>
    </div>
  );
}
