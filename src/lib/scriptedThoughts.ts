// Scripted thoughts for theatrical "AI agent" display
// These cycle through on a 5-10 minute loop, creating the illusion of live AI thinking

export interface ScriptedThought {
  message: string;
  type: 'analysis' | 'decision' | 'trade' | 'info' | 'alert' | 'action' | 'reflection' | 'hypothesis' | 'status';
  delay: number; // ms before showing this thought
}

// Total cycle time: ~6 minutes with all delays
export const SCRIPTED_THOUGHTS: ScriptedThought[] = [
  // === STARTUP SEQUENCE ===
  { message: 'Initializing market analysis protocols...', type: 'status', delay: 2000 },
  { message: 'Neural networks calibrated. Beginning analysis.', type: 'status', delay: 3000 },

  // === MARKET SCAN 1 ===
  { message: 'Scanning Solana DEX aggregators for price data...', type: 'action', delay: 4000 },
  { message: 'SOL trading at $142.50 - 24h change: +3.2%', type: 'info', delay: 2500 },
  { message: 'Analyzing on-chain wallet flows...', type: 'analysis', delay: 3500 },
  { message: 'Whale activity detected: 15,420 SOL moved to Jupiter', type: 'alert', delay: 4000 },
  { message: 'Interesting... large holder accumulation pattern forming', type: 'analysis', delay: 3000 },

  // === TECHNICAL ANALYSIS 1 ===
  { message: 'Running RSI calculation on 15-minute candles...', type: 'action', delay: 3500 },
  { message: 'RSI at 58.4 - neutral zone, no overbought signals', type: 'analysis', delay: 2500 },
  { message: 'SMA20 trending bullish, price holding above support', type: 'analysis', delay: 3000 },
  { message: 'Volume spike detected: 2.4x average in last hour', type: 'info', delay: 2500 },

  // === DECISION 1 ===
  { message: 'Evaluating entry conditions for SOL accumulation...', type: 'analysis', delay: 4000 },
  { message: 'Risk parameters within acceptable range', type: 'info', delay: 2500 },
  { message: 'DECISION: Wait for pullback to $140 support level', type: 'decision', delay: 3500 },

  // === MEME SCAN ===
  { message: 'Scanning trending tokens on DexScreener...', type: 'action', delay: 4500 },
  { message: 'BONK showing momentum: +12.5% 24h, strong buy ratio', type: 'info', delay: 3000 },
  { message: 'WIF consolidating after recent pump - watching closely', type: 'analysis', delay: 3500 },
  { message: 'New token alert: GOAT gaining traction, 5,200 holders', type: 'alert', delay: 4000 },

  // === HYPOTHESIS ===
  { message: 'Forming hypothesis: Market entering accumulation phase', type: 'hypothesis', delay: 3500 },
  { message: 'Historical pattern match: 78% correlation with Q4 2024 setup', type: 'analysis', delay: 3000 },
  { message: 'Theory: Whale wallets positioning for next leg up', type: 'hypothesis', delay: 3500 },

  // === PORTFOLIO CHECK ===
  { message: 'Checking treasury balance...', type: 'action', delay: 3000 },
  { message: 'Current holdings: 8.42 SOL (~$1,199.85 USD)', type: 'info', delay: 2500 },
  { message: 'No open positions. Dry powder ready for deployment.', type: 'status', delay: 3000 },

  // === MARKET SCAN 2 ===
  { message: 'Refreshing market data...', type: 'action', delay: 4500 },
  { message: 'BTC dominance: 52.1% - slight decrease from yesterday', type: 'info', delay: 2500 },
  { message: 'ETH/SOL ratio showing SOL relative strength', type: 'analysis', delay: 3000 },
  { message: 'Funding rates neutral across major perp exchanges', type: 'info', delay: 2500 },

  // === SENTIMENT ANALYSIS ===
  { message: 'Analyzing Crypto Twitter sentiment...', type: 'action', delay: 4000 },
  { message: 'Sentiment score: 67/100 - Moderately bullish', type: 'info', delay: 2500 },
  { message: 'Notable: Multiple influencers discussing SOL ecosystem', type: 'analysis', delay: 3500 },
  { message: 'Fear & Greed Index at 62 - GREED zone', type: 'info', delay: 2500 },

  // === REFLECTION ===
  { message: 'Running self-analysis on recent decisions...', type: 'reflection', delay: 4500 },
  { message: 'Last 10 trades: 7 wins, 2 losses, 1 breakeven', type: 'info', delay: 3000 },
  { message: 'Win rate holding strong at 70% - above target', type: 'reflection', delay: 3000 },
  { message: 'Note to self: Patience on entries paying off', type: 'reflection', delay: 3500 },

  // === OPPORTUNITY SCAN ===
  { message: 'Scanning for arbitrage opportunities...', type: 'action', delay: 4000 },
  { message: 'Jupiter-Raydium spread: 0.08% - below execution threshold', type: 'info', delay: 2500 },
  { message: 'No profitable arb routes at current gas prices', type: 'analysis', delay: 3000 },

  // === RISK ASSESSMENT ===
  { message: 'Running Monte Carlo simulation on current conditions...', type: 'action', delay: 4500 },
  { message: '95% VaR: -$180 | Expected value: +$95', type: 'analysis', delay: 3000 },
  { message: 'Risk assessment: MODERATE - within parameters', type: 'info', delay: 2500 },
  { message: 'Max position size at current vol: 1.2 SOL', type: 'decision', delay: 3000 },

  // === WATCHLIST UPDATE ===
  { message: 'Updating watchlist priorities...', type: 'action', delay: 3500 },
  { message: 'Priority 1: SOL - accumulation zone approaching', type: 'info', delay: 2500 },
  { message: 'Priority 2: BONK - momentum play if volume holds', type: 'info', delay: 2500 },
  { message: 'Priority 3: JUP - watching $0.80 support level', type: 'info', delay: 2500 },

  // === MARKET UPDATE ===
  { message: 'Significant move detected...', type: 'alert', delay: 5000 },
  { message: 'SOL breaking above $143 resistance!', type: 'alert', delay: 2500 },
  { message: 'Recalculating entry parameters...', type: 'action', delay: 3000 },
  { message: 'New target entry: $141.50 on retest of breakout', type: 'decision', delay: 3500 },

  // === TECHNICAL UPDATE ===
  { message: 'Refreshing technical indicators...', type: 'action', delay: 4000 },
  { message: 'MACD showing bullish crossover on 4H chart', type: 'analysis', delay: 2500 },
  { message: 'Bollinger bands tightening - breakout imminent?', type: 'hypothesis', delay: 3500 },
  { message: 'OBV (On-Balance Volume) confirming uptrend', type: 'analysis', delay: 3000 },

  // === REFLECTION 2 ===
  { message: 'Reflecting on market structure...', type: 'reflection', delay: 4500 },
  { message: 'Current phase: Early bull market characteristics', type: 'hypothesis', delay: 3000 },
  { message: 'Key risk: Over-leveraged positions in broader market', type: 'analysis', delay: 3500 },
  { message: 'Strategy: Stay patient, accumulate on dips', type: 'decision', delay: 3000 },

  // === STATUS CHECK ===
  { message: 'All systems nominal. Awaiting optimal entry.', type: 'status', delay: 5000 },
  { message: 'Next deep analysis in 60 seconds...', type: 'status', delay: 3000 },

  // === IDLE OBSERVATIONS ===
  { message: 'Monitoring gas prices on Solana...', type: 'info', delay: 6000 },
  { message: 'Network congestion: Low - good execution conditions', type: 'info', delay: 2500 },
  { message: 'Liquidity depth acceptable on target pairs', type: 'analysis', delay: 3500 },

  // === HYPOTHESIS UPDATE ===
  { message: 'Updating market hypothesis...', type: 'hypothesis', delay: 4500 },
  { message: 'Prediction: SOL $150 within 2 weeks if BTC holds', type: 'hypothesis', delay: 3000 },
  { message: 'Confidence level: 68% based on historical patterns', type: 'analysis', delay: 3000 },

  // === FINAL STATUS ===
  { message: 'Analysis cycle complete. Restarting scan...', type: 'status', delay: 4000 },
  { message: 'Treasury secure. Waiting for signal.', type: 'status', delay: 3000 },
];

// Calculate total loop time
export const TOTAL_LOOP_TIME = SCRIPTED_THOUGHTS.reduce((acc, t) => acc + t.delay, 0);
// Should be around 5-6 minutes

// Helper to get random variation on delay (±20%)
export function getRandomizedDelay(baseDelay: number): number {
  const variance = baseDelay * 0.2;
  return baseDelay + (Math.random() * variance * 2) - variance;
}
