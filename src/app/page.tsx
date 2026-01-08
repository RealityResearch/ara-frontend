'use client';

import { Ticker } from '@/components/Ticker';
import { Hero } from '@/components/Hero';
import { AgentTerminal } from '@/components/AgentTerminal';
import { TerminalPreview } from '@/components/TerminalPreview';
import { VotingPanel } from '@/components/VotingPanel';
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
import { LiveClock } from '@/components/LiveClock';
import { StickyCA } from '@/components/StickyCA';
import { SOCIAL_LINKS, CONTRACT_ADDRESS } from '@/lib/mockData';
import { useAgentStats } from '@/hooks/useAgentStats';

export default function Home() {
  const { performance, evolution, tradeHistory, isLive } = useAgentStats();
  return (
    <div style={{ background: '#FFFEF5', minHeight: '100vh' }}>

      {/* Y2K Header Bar */}
      <div className="header-gradient">
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td>
                <span className="header-gradient-title">
                  CLAUDE INVESTMENTS
                </span>
                <span style={{ color: '#FFCC00', fontSize: '10px', marginLeft: '8px' }}>®</span>
                <span className="hide-mobile" style={{ marginLeft: '12px', fontSize: '10px', color: '#99CCFF' }}>
                  — Automated Retirement Account
                </span>
              </td>
              <td align="right" style={{ fontSize: '10px', color: '#99CCFF' }}>
                <span className="hide-mobile" style={{ marginRight: '12px' }}>
                  <LiveClock />
                </span>
                <span className="badge-secure">
                  🔒 128-bit SSL
                </span>
                {' '}
                <span style={{ color: '#00FF00' }}>● ONLINE</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Alert Bar */}
      <div style={{
        background: '#003366',
        padding: '3px 0',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#FFFFFF',
      }}>
        AI Trading Agent is LIVE — Creator Fees Now Funding Trading Wallet —{' '}
        <span style={{ color: '#00FF00' }}>● ACTIVE</span>
      </div>

      {/* Scrolling Ticker */}
      <Ticker />

      {/* Navigation Bar */}
      <div style={{
        background: 'linear-gradient(to bottom, #F5F5F5 0%, #E0E0E0 100%)',
        borderBottom: '1px solid #999999',
        padding: '4px 12px',
        fontSize: '11px'
      }}>
        <table width="100%" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td>
                <a href="#" style={{ marginRight: '12px' }}>Home</a>
                <a href="#terminal" style={{ marginRight: '12px' }}>
                  Terminal
                  <span style={{ fontSize: '8px', marginLeft: '4px', color: '#008800' }}>● LIVE</span>
                </a>
                <a href="#performance" style={{ marginRight: '12px' }}>Stats</a>
                <a href="#trades" style={{ marginRight: '12px' }}>Trades</a>
                <a href="#chart" style={{ marginRight: '12px' }}>Chart</a>
                <a href="#token" className="hide-mobile" style={{ marginRight: '12px' }}>Token</a>
                <a href="#roadmap" className="hide-mobile">Roadmap</a>
              </td>
              <td align="right" className="hide-mobile">
                <span style={{ color: '#666666', fontSize: '10px' }}>
                  <span style={{ color: '#008800' }}>●</span> Agent Active |{' '}
                  Analyzing: <span style={{ fontFamily: 'Courier New' }}>$ARA</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="layout-sidebar" style={{ padding: '12px' }}>
        {/* Sidebar - Desktop Only */}
        <div className="sidebar-nav hide-mobile" style={{ alignSelf: 'start' }}>
          <div className="sidebar-nav-header">Navigation</div>
          <a href="#" className="sidebar-nav-item">Home</a>
          <a href="#terminal" className="sidebar-nav-item">
            Terminal <span style={{ fontSize: '7px', color: '#008800' }}>● LIVE</span>
          </a>
          <a href="#voting" className="sidebar-nav-item">
            Voting <span style={{ fontSize: '7px', color: '#FF6B35' }}>● VOTE</span>
          </a>
          <a href="#discovery" className="sidebar-nav-item">
            Discovery <span style={{ fontSize: '7px', color: '#00CCFF' }}>● SCAN</span>
          </a>
          <a href="#performance" className="sidebar-nav-item">Performance</a>
          <a href="#evolution" className="sidebar-nav-item">Evolution</a>
          <a href="#trades" className="sidebar-nav-item">Trade History</a>
          <a href="#chart" className="sidebar-nav-item">
            Chart <span style={{ fontSize: '7px', color: '#00FF00' }}>● LIVE</span>
          </a>
          <a href="#how-it-works" className="sidebar-nav-item">How It Works</a>
          <a href="#token" className="sidebar-nav-item">Token Info</a>
          <a href="#roadmap" className="sidebar-nav-item">Roadmap</a>

          <div className="hr-dotted" style={{ margin: '4px 8px' }} />

          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="sidebar-nav-item">Twitter/X</a>
          <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer" className="sidebar-nav-item">DEXScreener</a>

          {/* Sidebar Promo Box */}
          <div style={{ padding: '8px', background: '#003366' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' }}>
              BUY $ARA
            </div>
            <div style={{ textAlign: 'center', marginTop: '6px' }}>
              <a href={SOCIAL_LINKS.pumpfun} target="_blank" rel="noopener noreferrer">
                <button className="btn-buy-y2k" style={{ fontSize: '10px', padding: '6px 12px' }}>
                  PUMP.FUN
                </button>
              </a>
            </div>
          </div>

          {/* Visitor Counter */}
          <div style={{ padding: '8px', textAlign: 'center', background: '#E8E8E8', borderTop: '1px solid #CCCCCC' }}>
            <div style={{ fontSize: '8px', color: '#666666' }}>You are visitor:</div>
            <div className="hit-counter" style={{ fontSize: '10px', marginTop: '4px' }}>
              <span className="hit-counter-digit">0</span>
              <span className="hit-counter-digit">8</span>
              <span className="hit-counter-digit">4</span>
              <span className="hit-counter-digit">2</span>
              <span className="hit-counter-digit">0</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* AI Brain Preview - Above the Fold */}
          <TerminalPreview />

          {/* Hero Section */}
          <Hero />

          {/* Treasury Balance - Full Width at Top */}
          <div style={{ marginBottom: '16px' }}>
            <PortfolioChart />
          </div>

          {/* Agent Terminal */}
          <AgentTerminal />

          {/* Trade History - Right Below Terminal for Live Updates */}
          <TradeHistory trades={tradeHistory} />

          {/* Voting Panel */}
          <div id="voting" style={{ marginBottom: '16px' }}>
            <VotingPanel />
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
    </div>
  );
}
