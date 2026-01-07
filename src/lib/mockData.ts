// Mock data for the agent terminal and wallet display

export interface AgentThought {
  timestamp: string;
  message: string;
  type: 'analysis' | 'decision' | 'trade' | 'info' | 'alert';
}

export const mockThoughts: AgentThought[] = [
  { timestamp: '14:32:01', message: 'Analyzing SOL/USDC price action...', type: 'analysis' },
  { timestamp: '14:32:03', message: '15-min RSI at 67.2 — approaching overbought', type: 'analysis' },
  { timestamp: '14:32:05', message: 'Creator fees received: 0.42 SOL', type: 'info' },
  { timestamp: '14:32:08', message: 'Evaluating entry points for SOL accumulation', type: 'analysis' },
  { timestamp: '14:32:12', message: 'Decision: HOLD — waiting for better entry below $95', type: 'decision' },
  { timestamp: '14:32:15', message: 'Portfolio value: 12.84 SOL ($1,219.80)', type: 'info' },
  { timestamp: '14:33:01', message: 'Market sentiment scan: CT bullish, funding rates neutral', type: 'analysis' },
  { timestamp: '14:33:05', message: 'Monitoring for volatility spike...', type: 'info' },
  { timestamp: '14:33:22', message: 'Detected: Large whale movement on Jupiter', type: 'alert' },
  { timestamp: '14:33:45', message: 'Correlation analysis: BTC dominance declining', type: 'analysis' },
  { timestamp: '14:34:01', message: 'TRADE EXECUTED: Buy 0.5 SOL @ $94.82', type: 'trade' },
  { timestamp: '14:34:03', message: 'Trade confirmed. TX: 4xKj...9mNp', type: 'info' },
  { timestamp: '14:34:15', message: 'Updated portfolio: 13.34 SOL ($1,267.33)', type: 'info' },
  { timestamp: '14:34:30', message: 'Running Monte Carlo simulation on current position...', type: 'analysis' },
  { timestamp: '14:34:45', message: '95% VaR: -$127.80 | Expected value: +$89.20', type: 'analysis' },
  { timestamp: '14:35:00', message: 'Risk assessment: MODERATE — within parameters', type: 'decision' },
  { timestamp: '14:35:15', message: 'Next review scheduled in 5 minutes', type: 'info' },
  { timestamp: '14:35:30', message: 'Scanning for arbitrage opportunities...', type: 'analysis' },
  { timestamp: '14:35:45', message: 'Raydium-Jupiter spread: 0.03% — below threshold', type: 'analysis' },
  { timestamp: '14:36:00', message: 'All systems nominal. Awaiting market catalyst.', type: 'info' },
];

export interface Trade {
  id: string;
  timestamp: string;
  token: string;
  direction: 'BUY' | 'SELL';
  amount: string;
  price: string;
  result: number; // percentage
}

export const mockTrades: Trade[] = [
  { id: '1', timestamp: '14:34:01', token: 'SOL', direction: 'BUY', amount: '0.50', price: '$94.82', result: 0 },
  { id: '2', timestamp: '13:45:22', token: 'SOL', direction: 'BUY', amount: '1.20', price: '$93.50', result: 1.4 },
  { id: '3', timestamp: '12:30:15', token: 'SOL', direction: 'SELL', amount: '0.80', price: '$96.20', result: 2.8 },
  { id: '4', timestamp: '11:15:44', token: 'SOL', direction: 'BUY', amount: '2.00', price: '$92.10', result: 2.9 },
  { id: '5', timestamp: '10:05:33', token: 'SOL', direction: 'BUY', amount: '0.35', price: '$91.80', result: 3.3 },
];

export interface WalletStats {
  balance: string;
  balanceUSD: string;
  pnlDay: number;
  pnlWeek: number;
  pnlMonth: number;
  totalTrades: number;
  winRate: number;
}

export const mockWalletStats: WalletStats = {
  balance: '13.34',
  balanceUSD: '1,267.33',
  pnlDay: 3.2,
  pnlWeek: 12.8,
  pnlMonth: 47.3,
  totalTrades: 142,
  winRate: 67.6,
};

export interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

export const mockTickerData: TickerItem[] = [
  { symbol: 'SOL', price: 94.95, change: 2.34 },
  { symbol: 'BTC', price: 43521, change: 1.12 },
  { symbol: 'ETH', price: 2284, change: -0.45 },
  { symbol: '$ARA', price: 0.000042, change: 156.7 },
  { symbol: 'BONK', price: 0.0000089, change: 8.9 },
  { symbol: 'JUP', price: 0.82, change: -2.1 },
  { symbol: 'WIF', price: 0.54, change: 12.3 },
  { symbol: 'PYTH', price: 0.38, change: 4.5 },
];

// $ARA - Claude Investments Automated Retirement Account
export const CONTRACT_ADDRESS = '5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump';

export const SOCIAL_LINKS = {
  twitter: 'https://x.com/ClaudeCapital',
  pumpfun: `https://pump.fun/coin/${CONTRACT_ADDRESS}`,
  jupiter: `https://jup.ag/swap/SOL-${CONTRACT_ADDRESS}`,
  raydium: `https://raydium.io/swap/?inputCurrency=SOL&outputCurrency=${CONTRACT_ADDRESS}`,
  dexscreener: `https://dexscreener.com/solana/${CONTRACT_ADDRESS}`,
};

// ============================================
// PERFORMANCE METRICS
// ============================================

export interface PerformanceData {
  winRate: number;
  totalTrades: number;
  wins: number;
  losses: number;
  even: number;
  totalPnlSol: number;
  totalPnlUsd: number;
  walletBalanceSol: number;
  walletBalanceUsd: number;
  openPositions: number;
  maxPositions: number;
  avgHoldTime: string;
  bestTrade: number;
  worstTrade: number;
  currentStreak: number;
  streakType: 'win' | 'loss' | 'none';
}

export const mockPerformance: PerformanceData = {
  winRate: 67.6,
  totalTrades: 142,
  wins: 96,
  losses: 38,
  even: 8,
  totalPnlSol: 4.82,
  totalPnlUsd: 678.42,
  walletBalanceSol: 13.34,
  walletBalanceUsd: 1876.52,
  openPositions: 1,
  maxPositions: 3,
  avgHoldTime: '24m',
  bestTrade: 34.2,
  worstTrade: -18.7,
  currentStreak: 3,
  streakType: 'win',
};

// ============================================
// BOT EVOLUTION / GAMIFICATION
// ============================================

export interface BotLevel {
  name: string;
  minXp: number;
  maxXp: number;
  icon: string;
  color: string;
}

export const BOT_LEVELS: BotLevel[] = [
  { name: 'Intern', minXp: 0, maxXp: 100, icon: '👶', color: '#999999' },
  { name: 'Junior Analyst', minXp: 100, maxXp: 500, icon: '📊', color: '#66BB66' },
  { name: 'Associate', minXp: 500, maxXp: 1500, icon: '💼', color: '#4488CC' },
  { name: 'Senior Trader', minXp: 1500, maxXp: 4000, icon: '📈', color: '#9966CC' },
  { name: 'VP of Trading', minXp: 4000, maxXp: 10000, icon: '🎯', color: '#CC8833' },
  { name: 'Managing Director', minXp: 10000, maxXp: 25000, icon: '👔', color: '#CC6666' },
  { name: 'Partner', minXp: 25000, maxXp: 50000, icon: '🏆', color: '#FFD700' },
  { name: 'Legend', minXp: 50000, maxXp: 999999, icon: '👑', color: '#FF6600' },
];

export interface BotStats {
  experience: number;
  accuracy: number;
  analysis: number;
  adaptation: number;
  riskMgmt: number;
}

export interface EvolutionData {
  currentXp: number;
  totalXpEarned: number;
  stats: BotStats;
  recentGains: BotStats;
  cyclesCompleted: number;
  uptime: string;
}

export const mockEvolution: EvolutionData = {
  currentXp: 847,
  totalXpEarned: 1247,
  stats: {
    experience: 42,
    accuracy: 68,
    analysis: 55,
    adaptation: 31,
    riskMgmt: 47,
  },
  recentGains: {
    experience: 12,
    accuracy: 5,
    analysis: 8,
    adaptation: 3,
    riskMgmt: 6,
  },
  cyclesCompleted: 284,
  uptime: '4d 12h 33m',
};

export function getCurrentLevel(xp: number): BotLevel {
  for (let i = BOT_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= BOT_LEVELS[i].minXp) {
      return BOT_LEVELS[i];
    }
  }
  return BOT_LEVELS[0];
}

export function getLevelProgress(xp: number): number {
  const level = getCurrentLevel(xp);
  const progressInLevel = xp - level.minXp;
  const levelRange = level.maxXp - level.minXp;
  return Math.min((progressInLevel / levelRange) * 100, 100);
}

// ============================================
// DETAILED TRADE HISTORY
// ============================================

export interface DetailedTrade {
  id: string;
  timestamp: string;
  date: string;
  token: string;
  tokenSymbol: string;
  direction: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number | null;
  amountSol: number;
  pnlSol: number;
  pnlPercent: number;
  holdTime: string;
  status: 'open' | 'closed' | 'pending';
  result: 'win' | 'loss' | 'even' | 'open';
  txHash: string;
  reasoning: string;
}

export const mockTradeHistory: DetailedTrade[] = [
  {
    id: 't1',
    timestamp: '14:32:01',
    date: '2025-01-06',
    token: 'SOL',
    tokenSymbol: 'SOL',
    direction: 'BUY',
    entryPrice: 140.25,
    exitPrice: null,
    amountSol: 0.5,
    pnlSol: 0.02,
    pnlPercent: 4.2,
    holdTime: '—',
    status: 'open',
    result: 'open',
    txHash: '4xKj...9mNp',
    reasoning: 'RSI oversold, whale accumulation detected',
  },
  {
    id: 't2',
    timestamp: '12:15:33',
    date: '2025-01-06',
    token: 'BONK',
    tokenSymbol: 'BONK',
    direction: 'SELL',
    entryPrice: 0.0000115,
    exitPrice: 0.0000132,
    amountSol: 0.8,
    pnlSol: 0.12,
    pnlPercent: 14.8,
    holdTime: '2h 15m',
    status: 'closed',
    result: 'win',
    txHash: '7yHm...3kLp',
    reasoning: 'Target hit, taking profits',
  },
  {
    id: 't3',
    timestamp: '09:45:22',
    date: '2025-01-06',
    token: 'WIF',
    tokenSymbol: 'WIF',
    direction: 'BUY',
    entryPrice: 0.42,
    exitPrice: 0.39,
    amountSol: 1.2,
    pnlSol: -0.086,
    pnlPercent: -7.1,
    holdTime: '45m',
    status: 'closed',
    result: 'loss',
    txHash: '2nBx...8qRt',
    reasoning: 'Stop loss triggered',
  },
  {
    id: 't4',
    timestamp: '08:20:11',
    date: '2025-01-06',
    token: 'JUP',
    tokenSymbol: 'JUP',
    direction: 'BUY',
    entryPrice: 0.225,
    exitPrice: 0.241,
    amountSol: 2.0,
    pnlSol: 0.14,
    pnlPercent: 7.1,
    holdTime: '1h 30m',
    status: 'closed',
    result: 'win',
    txHash: '9pLm...1vNx',
    reasoning: 'Breakout pattern confirmed',
  },
  {
    id: 't5',
    timestamp: '22:10:45',
    date: '2025-01-05',
    token: 'PYTH',
    tokenSymbol: 'PYTH',
    direction: 'SELL',
    entryPrice: 0.072,
    exitPrice: 0.071,
    amountSol: 0.6,
    pnlSol: -0.008,
    pnlPercent: -1.4,
    holdTime: '3h 20m',
    status: 'closed',
    result: 'loss',
    txHash: '5kWr...4sTq',
    reasoning: 'Market reversal, cut losses early',
  },
  {
    id: 't6',
    timestamp: '18:33:29',
    date: '2025-01-05',
    token: 'SOL',
    tokenSymbol: 'SOL',
    direction: 'BUY',
    entryPrice: 138.50,
    exitPrice: 142.20,
    amountSol: 1.5,
    pnlSol: 0.04,
    pnlPercent: 2.7,
    holdTime: '4h 10m',
    status: 'closed',
    result: 'win',
    txHash: '3mKp...7yLn',
    reasoning: 'Trend continuation, scaling in',
  },
  {
    id: 't7',
    timestamp: '14:05:18',
    date: '2025-01-05',
    token: 'BONK',
    tokenSymbol: 'BONK',
    direction: 'BUY',
    entryPrice: 0.0000108,
    exitPrice: 0.0000115,
    amountSol: 0.4,
    pnlSol: 0.026,
    pnlPercent: 6.5,
    holdTime: '55m',
    status: 'closed',
    result: 'win',
    txHash: '8rTx...2pMn',
    reasoning: 'Volume spike, momentum entry',
  },
  {
    id: 't8',
    timestamp: '10:22:55',
    date: '2025-01-05',
    token: 'WIF',
    tokenSymbol: 'WIF',
    direction: 'SELL',
    entryPrice: 0.445,
    exitPrice: 0.445,
    amountSol: 0.3,
    pnlSol: 0.0,
    pnlPercent: 0.0,
    holdTime: '20m',
    status: 'closed',
    result: 'even',
    txHash: '1nVq...6xKm',
    reasoning: 'Breakeven exit, uncertain conditions',
  },
];
