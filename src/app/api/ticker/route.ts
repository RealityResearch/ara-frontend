import { NextResponse } from 'next/server';

// Token addresses for DexScreener API
const TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112',
  ARA: '5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  PYTH: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3',
};

// CoinGecko IDs for BTC and ETH (not on Solana DEX)
const COINGECKO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
};

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

// Cache to reduce API calls
let cache: { data: TickerItem[]; timestamp: number } | null = null;
const CACHE_TTL = 15000; // 15 seconds

async function fetchDexScreenerPrices(): Promise<TickerItem[]> {
  const addresses = Object.values(TOKENS).join(',');

  try {
    const response = await fetch(
      `https://api.dexscreener.com/tokens/v1/solana/${addresses}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'ClaudeInvestments/1.0',
        },
        next: { revalidate: 15 },
      }
    );

    if (!response.ok) {
      throw new Error(`DexScreener API error: ${response.status}`);
    }

    const data = await response.json();

    // Map token addresses to symbols
    const addressToSymbol: Record<string, string> = {};
    for (const [symbol, address] of Object.entries(TOKENS)) {
      addressToSymbol[address.toLowerCase()] = symbol === 'ARA' ? '$ARA' : symbol;
    }

    // Process pairs data
    const tokenPrices: Record<string, TickerItem> = {};

    if (Array.isArray(data)) {
      for (const pair of data) {
        const baseAddress = pair.baseToken?.address?.toLowerCase();
        const symbol = addressToSymbol[baseAddress];

        if (symbol && !tokenPrices[symbol]) {
          const priceUsd = parseFloat(pair.priceUsd || '0');
          const priceChange = pair.priceChange?.h24 || 0;

          if (priceUsd > 0) {
            tokenPrices[symbol] = {
              symbol,
              price: priceUsd,
              change: priceChange,
            };
          }
        }
      }
    }

    return Object.values(tokenPrices);
  } catch (error) {
    console.error('DexScreener fetch error:', error);
    return [];
  }
}

async function fetchCoinGeckoPrices(): Promise<TickerItem[]> {
  try {
    const ids = Object.values(COINGECKO_IDS).join(',');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    const result: TickerItem[] = [];

    for (const [symbol, id] of Object.entries(COINGECKO_IDS)) {
      const tokenData = data[id];
      if (tokenData) {
        result.push({
          symbol,
          price: tokenData.usd || 0,
          change: tokenData.usd_24h_change || 0,
        });
      }
    }

    return result;
  } catch (error) {
    console.error('CoinGecko fetch error:', error);
    return [];
  }
}

export async function GET() {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    // Fetch from both APIs in parallel
    const [dexPrices, geckoPrice] = await Promise.all([
      fetchDexScreenerPrices(),
      fetchCoinGeckoPrices(),
    ]);

    // Combine and order
    const combined = [...dexPrices, ...geckoPrice];

    // Desired order
    const order = ['SOL', 'BTC', 'ETH', '$ARA', 'BONK', 'JUP', 'WIF', 'PYTH'];
    const sorted = order
      .map(symbol => combined.find(t => t.symbol === symbol))
      .filter((t): t is TickerItem => t !== undefined);

    // Cache result
    cache = { data: sorted, timestamp: Date.now() };

    return NextResponse.json(sorted);
  } catch (error) {
    console.error('Ticker API error:', error);

    // Return cached data if available, even if stale
    if (cache) {
      return NextResponse.json(cache.data);
    }

    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}
