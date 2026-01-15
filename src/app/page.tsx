'use client';

import { useState, useEffect } from 'react';
import { Ticker } from '@/components/Ticker';
import { TerminalPreview } from '@/components/TerminalPreview';
import { PortfolioChart } from '@/components/PortfolioChart';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { BotEvolution } from '@/components/BotEvolution';
import { TradeHistory } from '@/components/TradeHistory';
import { ChartEmbed } from '@/components/ChartEmbed';
import { HowItWorks } from '@/components/HowItWorks';
import { TokenInfo } from '@/components/TokenInfo';
import { ComingSoon } from '@/components/ComingSoon';
import { Footer } from '@/components/Footer';
import { StickyCA } from '@/components/StickyCA';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';
import { useAgentStats } from '@/hooks/useAgentStats';

export default function Home() {
  const { performance, evolution, tradeHistory } = useAgentStats();
  const [currentTime, setCurrentTime] = useState('--:--:--');

  // Scroll to top on page load (prevent browser scroll restoration)
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

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
    <div style={{ background: '#FAF9F6', minHeight: '100vh', color: '#3D3929' }}>

      {/* Clean Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8E5E0',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="/logos/claude-investments.png"
              alt="Claude Investments"
              style={{ height: '40px', width: 'auto' }}
            />
            <span className="hide-mobile" style={{ color: '#6B6860', fontSize: '14px', fontStyle: 'italic' }}>
              The Future of Investing is Here
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              color: '#5C8A5C',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#5C8A5C',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></span>
              AGENT LIVE
            </span>
            <span style={{
              fontFamily: 'Courier New',
              color: '#6B6860',
              fontSize: '13px'
            }}>
              {currentTime}
            </span>
          </div>
        </div>
      </header>

      {/* Scrolling Ticker - keep dark for contrast */}
      <Ticker />

      {/* Navigation */}
      <nav style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E8E5E0',
        padding: '8px 24px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { label: 'Terminal', href: '#terminal', live: true },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Trades', href: '#trades' },
              { label: 'Stats', href: '#performance' },
              { label: 'Chart', href: '#chart', live: true },
              { label: 'Token', href: '#token' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                style={{
                  textDecoration: 'none',
                  fontSize: '13px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  color: '#6B6860',
                  transition: 'all 0.2s ease',
                }}
              >
                {item.label}
                {item.live && <span style={{ color: '#5C8A5C', marginLeft: '6px', fontSize: '8px' }}>●</span>}
              </a>
            ))}
          </div>
          <div className="hide-mobile" style={{ fontSize: '12px', color: '#9A958C' }}>
            Analyzing: <span style={{ color: '#D4775C', fontWeight: '600' }}>$ARA</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        display: 'flex',
        gap: '24px'
      }}>
        {/* Sidebar - Desktop Only */}
        <aside className="hide-mobile" style={{
          width: '200px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Navigation Card */}
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{
              background: '#F0EDE8',
              padding: '12px 16px',
              borderBottom: '1px solid #E8E5E0',
              fontWeight: '600',
              fontSize: '12px',
              color: '#6B6860',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Navigation
            </div>
            {[
              { label: 'Terminal', href: '#terminal', badge: 'LIVE' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Performance', href: '#performance' },
              { label: 'Evolution', href: '#evolution' },
              { label: 'Trade History', href: '#trades' },
              { label: 'Chart', href: '#chart', badge: 'LIVE' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Token Info', href: '#token' },
              { label: 'Roadmap', href: '#roadmap' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  color: '#3D3929',
                  textDecoration: 'none',
                  fontSize: '13px',
                  borderBottom: '1px solid #F0EDE8',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FAF9F6'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {item.label}
                {item.badge && (
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '9px',
                    color: '#5C8A5C',
                    fontWeight: '600'
                  }}>● {item.badge}</span>
                )}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{
              fontWeight: '600',
              fontSize: '12px',
              color: '#6B6860',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '12px'
            }}>
              Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: '12px',
                  padding: '8px'
                }}
              >
                Twitter/X
              </a>
              <a
                href={SOCIAL_LINKS.dexscreener}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: '12px',
                  padding: '8px'
                }}
              >
                DexScreener
              </a>
            </div>
          </div>

          {/* Buy CTA */}
          <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{
              color: '#6B6860',
              fontSize: '12px',
              marginBottom: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Buy $ARA
            </div>
            <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{
                width: '100%',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                Pump.fun
              </button>
            </a>
          </div>
        </aside>

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

          {/* Trade History */}
          <TradeHistory trades={tradeHistory} />

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
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky CA Button */}
      <StickyCA />

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
