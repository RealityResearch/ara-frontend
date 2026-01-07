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
