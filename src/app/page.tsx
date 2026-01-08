'use client';

import { useState, useEffect } from 'react';
import { Ticker } from '@/components/Ticker';
import { TerminalPreview } from '@/components/TerminalPreview';
import { ChatPanel } from '@/components/ChatPanel';
import { PortfolioChart } from '@/components/PortfolioChart';
import { DiscoveryPanel } from '@/components/DiscoveryPanel';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { BotEvolution } from '@/components/BotEvolution';
import { TradeHistory } from '@/components/TradeHistory';
import { ChartEmbed } from '@/components/ChartEmbed';
import { HowItWorks } from '@/components/HowItWorks';
import { TokenInfo } from '@/components/TokenInfo';
import { ComingSoon } from '@/components/ComingSoon';
import { Footer } from '@/components/Footer';
import { StickyCA } from '@/components/StickyCA';
import { TradePopup } from '@/components/TradePopup';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';
import { useAgentStats } from '@/hooks/useAgentStats';

export default function Home() {
  const { performance, evolution, tradeHistory, isLive } = useAgentStats();
  const [currentTime, setCurrentTime] = useState('--:--:--');

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

  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: '#ff6600' }}>

      {/* Bloomberg Header Bar */}
      <div style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
        borderBottom: '2px solid #333333',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="/logos/claude-investments.png"
            alt="Claude Investments"
            style={{ height: '36px', width: 'auto', filter: 'brightness(1.1)' }}
          />
          <span className="hide-mobile" style={{ color: '#ffaa00', fontSize: '10px', fontStyle: 'italic' }}>
            "The Future of Investing is Here"
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#00ff00', fontSize: '10px' }}>
            <span style={{ animation: 'bb-blink 1s infinite' }}>●</span> AGENT LIVE
          </span>
          <span className="bb-time">{currentTime}</span>
          <span className="bb-badge bb-badge-live">LIVE</span>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <Ticker />

      {/* Bloomberg Navigation */}
      <div style={{
        background: '#0d0d0d',
        borderBottom: '1px solid #333333',
        padding: '4px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { label: 'TERMINAL', href: '#terminal', live: true },
            { label: 'PORTFOLIO', href: '#portfolio' },
            { label: 'TRADES', href: '#trades' },
            { label: 'STATS', href: '#performance' },
            { label: 'CHART', href: '#chart', live: true },
            { label: 'TOKEN', href: '#token' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="bb-fkey"
              style={{
                textDecoration: 'none',
                fontSize: '9px',
                padding: '4px 12px',
              }}
            >
              {item.label}
              {item.live && <span style={{ color: '#00ff00', marginLeft: '4px' }}>●</span>}
            </a>
          ))}
        </div>
        <div className="hide-mobile" style={{ fontSize: '9px', color: '#666666' }}>
          <span style={{ color: '#00ff00' }}>●</span> Connected | Analyzing: <span style={{ color: '#ffaa00' }}>$ARA</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', padding: '8px', gap: '8px' }}>
        {/* Sidebar - Desktop Only */}
        <div className="hide-mobile" style={{
          width: '160px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}>
          {/* Navigation Panel */}
          <div className="bb-terminal" style={{ padding: 0 }}>
            <div className="bb-header" style={{ padding: '4px 8px' }}>
              <span style={{ color: '#ffaa00', fontSize: '9px', fontWeight: 'bold' }}>NAVIGATION</span>
            </div>
            {[
              { label: 'Terminal', href: '#terminal', badge: 'LIVE', badgeColor: '#00ff00' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Chat', href: '#chat', badge: 'LIVE', badgeColor: '#3399ff' },
              { label: 'Discovery', href: '#discovery', badge: 'SCAN', badgeColor: '#ffaa00' },
              { label: 'Performance', href: '#performance' },
              { label: 'Evolution', href: '#evolution' },
              { label: 'Trade History', href: '#trades' },
              { label: 'Chart', href: '#chart', badge: 'LIVE', badgeColor: '#00ff00' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Token Info', href: '#token' },
              { label: 'Roadmap', href: '#roadmap' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '6px 8px',
                  color: '#ff6600',
                  textDecoration: 'none',
                  fontSize: '10px',
                  borderBottom: '1px solid #1a1a1a',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 102, 0, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft: '4px',
                    fontSize: '7px',
                    color: item.badgeColor,
                  }}>● {item.badge}</span>
                )}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bb-terminal" style={{ padding: 0 }}>
            <div className="bb-header" style={{ padding: '4px 8px' }}>
              <span style={{ color: '#ffaa00', fontSize: '9px', fontWeight: 'bold' }}>LINKS</span>
            </div>
            <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="bb-fkey" style={{ textAlign: 'center', textDecoration: 'none', fontSize: '9px' }}>
                TWITTER/X
              </a>
              <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" className="bb-fkey" style={{ textAlign: 'center', textDecoration: 'none', fontSize: '9px' }}>
                DEXSCREENER
              </a>
            </div>
          </div>

          {/* Buy CTA */}
          <div className="bb-terminal" style={{ padding: '8px', textAlign: 'center' }}>
            <div style={{ color: '#ffaa00', fontSize: '9px', marginBottom: '8px', fontWeight: 'bold' }}>BUY $ARA</div>
            <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%',
                background: 'linear-gradient(180deg, #00aa00 0%, #006600 100%)',
                border: '1px solid #00ff00',
                color: '#ffffff',
                padding: '8px',
                fontFamily: 'Courier New',
                fontWeight: 'bold',
                fontSize: '11px',
                cursor: 'pointer',
              }}>
                PUMP.FUN
              </button>
            </a>
          </div>

          {/* System Status */}
          <div className="bb-terminal" style={{ padding: '8px' }}>
            <div style={{ color: '#666666', fontSize: '8px', textAlign: 'center', marginBottom: '4px' }}>SYSTEM STATUS</div>
            <div style={{ fontSize: '9px', color: '#00ff00', textAlign: 'center' }}>
              ● ALL SYSTEMS NOMINAL
            </div>
            <div style={{ fontSize: '8px', color: '#666666', textAlign: 'center', marginTop: '4px' }}>
              {currentTime} UTC
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* AI Brain Terminal - Above the Fold */}
          <div id="terminal">
            <TerminalPreview />
          </div>

          {/* Treasury Balance */}
          <div id="portfolio">
            <PortfolioChart />
          </div>

          {/* Trade History - Right Below Terminal for Live Updates */}
          <TradeHistory trades={tradeHistory} />

          {/* Chat Panel */}
          <div id="chat">
            <ChatPanel />
          </div>

          {/* Discovery Panel - Token Scanner */}
          <DiscoveryPanel />

          {/* Performance Metrics */}
          <PerformanceMetrics data={performance} />

          {/* Bot Evolution */}
          <BotEvolution data={evolution} />

          {/* Live Chart */}
          <ChartEmbed contractAddress={CONTRACT_ADDRESS} height={400} />

          {/* How It Works */}
          <HowItWorks />

          {/* Token Info */}
          <TokenInfo />

          {/* Coming Soon / Roadmap */}
          <ComingSoon />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Sticky CA Button */}
      <StickyCA />

      {/* Trade Notification Popup */}
      <TradePopup />
    </div>
  );
}
