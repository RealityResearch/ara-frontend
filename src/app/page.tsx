'use client';

import { useState, useEffect } from 'react';
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
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border-light)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/logos/cc-logo.png"
              alt="Claude Investments"
              style={{ height: '28px', width: 'auto' }}
            />
            <span className="hide-mobile" style={{
              color: 'var(--text-muted)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Automated Retirement Account
            </span>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Live Status */}
            <div className="badge badge-live">
              <span className="live-dot"></span>
              <span>LIVE</span>
            </div>

            {/* Time - Desktop only */}
            <span className="hide-mobile" style={{
              color: 'var(--accent)',
              fontSize: '12px',
              fontFamily: 'Courier Prime, monospace',
            }}>
              {currentTime}
            </span>

            {/* CTA Button - Desktop */}
            <a
              href={SOCIAL_LINKS.pumpfun}
              target="_blank"
              rel="noopener noreferrer"
              className="hide-mobile btn btn-primary btn-sm"
            >
              Buy $ARA
            </a>
          </div>
        </div>
      </header>

      {/* Mobile CTA Bar */}
      <div className="show-mobile" style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-light)',
        padding: '12px 20px',
        display: 'flex',
        gap: '10px',
      }}>
        <a
          href={SOCIAL_LINKS.pumpfun}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ flex: 1, textDecoration: 'none' }}
        >
          Buy $ARA
        </a>
        <a
          href={SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ flex: 1, textDecoration: 'none' }}
        >
          Twitter
        </a>
      </div>

      {/* Main Content */}
      <main style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '24px 20px',
      }}>
        {/* Hero Section */}
        <section style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 className="font-display" style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            fontWeight: '600',
          }}>
            Watch AI Trade in Real-Time
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '16px',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            The first fully transparent AI trading agent on Solana. Every thought, every decision, every trade — visible to all.
          </p>
        </section>

        {/* Terminal - Main Feature */}
        <section id="terminal" style={{ marginBottom: '32px' }}>
          <TerminalPreview />
        </section>

        {/* Stats Grid */}
        <section style={{ marginBottom: '32px' }}>
          <div className="grid grid-3" style={{ gap: '16px' }}>
            <div className="stat-box">
              <div className="stat-label">Token</div>
              <div className="stat-value text-accent">$ARA</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Network</div>
              <div className="stat-value" style={{ fontSize: '20px' }}>Solana</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Status</div>
              <div className="stat-value text-positive" style={{ fontSize: '20px' }}>Active</div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" style={{ marginBottom: '32px' }}>
          <PortfolioChart />
        </section>

        {/* Trade History */}
        <section id="trades" style={{ marginBottom: '32px' }}>
          <TradeHistory trades={tradeHistory} />
        </section>

        {/* Performance */}
        <section id="performance" style={{ marginBottom: '32px' }}>
          <PerformanceMetrics data={performance} />
        </section>

        {/* Evolution */}
        <section id="evolution" style={{ marginBottom: '32px' }}>
          <BotEvolution data={evolution} />
        </section>

        {/* Chart */}
        <section id="chart" style={{ marginBottom: '32px' }}>
          <ChartEmbed contractAddress={CONTRACT_ADDRESS} height={400} />
        </section>

        {/* How It Works */}
        <section id="how-it-works" style={{ marginBottom: '32px' }}>
          <HowItWorks />
        </section>

        {/* Token Info */}
        <section id="token" style={{ marginBottom: '32px' }}>
          <TokenInfo />
        </section>

        {/* Roadmap */}
        <section id="roadmap" style={{ marginBottom: '32px' }}>
          <ComingSoon />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky CA - Desktop only */}
      <div className="hide-mobile">
        <StickyCA />
      </div>
    </div>
  );
}
