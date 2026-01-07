# Claude Investments — ARA (Automated Retirement Account)

## Project Overview
A memecoin on Solana launched via pump.fun featuring a landing page that displays the LIVE THOUGHTS of an AI trading agent. The agent controls the dev wallet and autonomously trades creator fees. Users watch the agent think, analyze, and execute trades in real-time.

- **Name:** Claude Investments
- **Ticker:** $ARA
- **Slogan:** "The Future of Investing is Here"
- **Core Hook:** Transparent AI agent trading with all reasoning visible

## Aesthetic Direction
**"Y2K Financial Trust Terminal"** — Early 2000s online brokerage vibes (E*Trade, Charles Schwab, Fidelity circa 2001-2005) meets modern memecoin culture.

**Visual Elements:**
- Chunky beveled buttons with 3D gradient effects
- XP-style window frames with blue gradient title bars
- Inset shadow panels for "sunken" data displays
- Scrolling stock ticker strip
- CRT scanline overlay on terminal
- Blinking cursors and typing animations
- Data-dense table layouts with alternating rows

**Paradox:** Looks like serious finance, obviously a memecoin.

## Tech Stack
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Fonts:** Playfair Display (serif/trust) + Courier Prime (terminal) + Tahoma (UI)
- **Live Data:** DexScreener + CoinGecko APIs (free, no key), WebSocket for agent
- **Deployment:** Vercel

## File Structure
```
cc/
├── CLAUDE.md                    # This file - source of truth
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.local.example           # Frontend env vars
├── public/
│   └── logos/
│       ├── Claude Circle 4x.png
│       └── claude-investments.png
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main landing page
│   │   ├── globals.css         # Y2K design system
│   │   └── api/
│   │       └── ticker/route.ts # Live price ticker API (DexScreener + CoinGecko)
│   ├── components/
│   │   ├── Ticker.tsx          # Scrolling price ticker
│   │   ├── Hero.tsx            # Hero section with logo/CTA
│   │   ├── AgentTerminal.tsx   # Live AI thoughts terminal
│   │   ├── VotingPanel.tsx     # Community voting UI (NEW)
│   │   ├── PortfolioChart.tsx  # Real-time balance chart (NEW)
│   │   ├── PerformanceMetrics.tsx # Win rate, PnL stats
│   │   ├── BotEvolution.tsx    # Agent personality evolution
│   │   ├── TradeHistory.tsx    # Recent trades table
│   │   ├── TokenInfo.tsx       # Contract address, buy links
│   │   ├── ComingSoon.tsx      # Roadmap features
│   │   └── Footer.tsx          # Socials & disclaimer
│   ├── hooks/
│   │   ├── useAgentThoughts.ts # WebSocket + mock fallback hook
│   │   └── useAgentStats.ts    # Performance/evolution stats hook
│   └── lib/
│       └── mockData.ts         # Mock data for demo
├── agent-service/               # Trading agent backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example            # Agent env vars (API key)
│   ├── data/
│   │   └── agent-memory.json   # Persistent agent memory
│   └── src/
│       ├── index.ts            # Entry point + WebSocket server
│       ├── agent.ts            # Claude-powered trading agent
│       ├── websocket.ts        # Thought broadcast + voting
│       ├── voting.ts           # Community voting system (NEW)
│       ├── state.ts            # Performance/evolution tracking
│       ├── memory/             # Agent learning system (NEW)
│       │   ├── index.ts
│       │   ├── manager.ts
│       │   └── types.ts
│       └── tools/
│           ├── market.ts       # Price/wallet/trade tools
│           ├── wallet.ts       # Solana wallet management
│           ├── trading.ts      # Jupiter swap execution
│           └── research.ts     # Firecrawl web research
```

## Design System

### Colors
```css
/* Y2K Financial Palette */
--navy-deep: #0a1628;       /* Main background */
--navy-mid: #152238;        /* Elevated surfaces */
--navy-light: #1e3a5f;      /* Panel backgrounds */
--navy-bright: #2563eb;     /* Primary actions */

/* Windows XP Chrome */
--xp-silver: #c0c0c0;       /* Classic borders */
--xp-gray: #808080;         /* Secondary text */
--xp-dark: #404040;         /* Shadows */

/* Financial Status */
--money-green: #22c55e;     /* Gains, success */
--blood-red: #dc2626;       /* Losses, warnings */
--gold-accent: #d4a574;     /* Premium highlights */
--ticker-amber: #fbbf24;    /* Attention, data */

/* Terminal */
--terminal-green: #00ff41;  /* Matrix-style text */
--terminal-bg: #0a0f0a;     /* Dark terminal bg */

/* Brand */
--claude-coral: #d98d6c;    /* Claude accent color */
```

### Typography
```
Headings:    'Playfair Display', Georgia, serif
Body/UI:     Tahoma, Verdana, sans-serif
Terminal:    'Courier Prime', 'Courier New', monospace
```

### Component Classes
```css
.btn-xp       /* Classic Windows XP button */
.btn-primary  /* Blue action button */
.btn-buy      /* Green buy/CTA button */
.panel-xp     /* Raised XP-style panel */
.panel-inset  /* Sunken data display */
.title-bar    /* Blue gradient window title */
.terminal     /* CRT terminal with scanlines */
.data-table   /* Financial data table */
```

## Component Inventory

| Component | Status | Description |
|-----------|--------|-------------|
| Ticker | Complete | Live price updates with flash effects, LIVE badge |
| Hero | Complete | Under construction banner, spinning stars, fire divider, webring |
| AgentTerminal | Complete | ASCII art, rainbow status, CRT effects, control panel |
| VotingPanel | Complete | Community voting for trading styles (APE/DIAMOND/PAPER/RESEARCH/DEGEN) |
| PortfolioChart | Complete | Real-time canvas chart of SOL balance with CRT aesthetic |
| PerformanceMetrics | Complete | Win rate, PnL, total trades, wallet balance, streak |
| BotEvolution | Complete | Agent personality traits and evolution over time |
| TradeHistory | Complete | Recent trades table with reasoning |
| HowItWorks | Complete | 5-step explainer of agent flow |
| ChartEmbed | Complete | DEXScreener iframe with Y2K styling |
| StickyCA | Complete | Floating copy CA button (bottom-right) |
| TokenInfo | Complete | Contract address copy, buy links, token stats |
| ComingSoon | Complete | Roadmap features grid (Phase 1/2/3), progress bar |
| Footer | Complete | Disclaimer, quick links, social buttons |
| LiveClock | Complete | Real-time HH:MM:SS in header |

## Key Decisions
1. **Dark mode default** — Degens trade at night
2. **Desktop-first** — Primary trading device (mobile responsive)
3. **Mock data for Phase 1** — Structure ready for real WebSocket
4. **Next.js App Router** — Modern, performant, easy Vercel deploy
5. **Google Fonts via `<link>`** — Loaded in layout.tsx head

## Current Status
- [x] Project brief received
- [x] CLAUDE.md created
- [x] Design direction established (Y2K Financial Trust Terminal)
- [x] Next.js 16 project scaffolded
- [x] Design system implemented (globals.css)
- [x] All components built
- [x] Framer Motion animations added
- [x] Logos integrated
- [x] **CHAOS MODE COMPLETE** - Full Y2K aesthetic overhaul
- [x] Mobile responsive (sidebar hides, touch-friendly buttons)
- [x] **AGENT SERVICE BUILT** - Claude-powered trading agent with WebSocket
- [x] Frontend WebSocket integration (auto-fallback to mock)
- [x] **VERCEL DEPLOYED** - https://cc-lime-alpha.vercel.app
- [x] **RAILWAY DEPLOYED** - https://web-production-3b844.up.railway.app
- [x] Real contract address set
- [x] Social links updated (@ClaudeCapital)
- [x] Pump.fun API integration (real price/volume data)
- [x] **LIVE DATA FEEDS** - DexScreener + CoinGecko APIs for real prices
- [x] **REAL TRADING** - Jupiter swap integration, agent can execute trades
- [x] **COMMUNITY VOTING** - 5 trading styles, 30-min voting rounds
- [x] **MEMORY SYSTEM** - Agent learns from trades, forms hypotheses
- [x] **RESEARCH TOOLS** - Firecrawl web search for market intel
- [x] **PORTFOLIO CHART** - Real-time canvas chart of treasury balance
- [x] **AUTONOMOUS TRADING** - Agent trades ANY memecoin, not just $ARA
- [x] **GENERIC TOOLS** - Trading tools accept token_address parameter
- [x] **DISCOVERY SCANNER** - DexScreener scan every 2 min for opportunities
- [x] **RISK MANAGEMENT** - 15% max/trade, 2 max positions, 5% slippage

## Chaos Mode Animations (globals.css)
```css
.blink           /* Classic forbidden blink effect */
.rainbow-text    /* Cycling rainbow colors */
.rainbow-bg      /* Animated rainbow background */
.fire-divider    /* Animated fire with 🔥 emojis */
.spin / .spin-slow  /* Rotating elements */
.bounce / .shake / .sparkle  /* Movement effects */
.starburst       /* Pulsing star badge */
.glow-border     /* Green glowing border */
.crt-effect      /* CRT monitor flicker */
.scanlines       /* CRT scanline overlay */
.hit-counter     /* Y2K visitor counter */
.under-construction  /* Yellow/black striped banner */
.webring         /* Classic webring box */
.click-here-btn  /* Bouncing Comic Sans button */
.hide-mobile     /* Hide on mobile screens */
```

## Running Locally

### Frontend Only (Demo Mode)
```bash
npm install
npm run dev
# Open http://localhost:3000
# Terminal shows simulated thoughts
```

### With Live Agent
```bash
# Terminal 1: Start agent service
cd agent-service
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm install
npm run dev

# Terminal 2: Start frontend
cd ..
cp .env.local.example .env.local
# Uncomment NEXT_PUBLIC_AGENT_WS_URL in .env.local
npm run dev
# Open http://localhost:3000
# Terminal now shows LIVE Claude thoughts!
```

## Agent Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                     AGENT SERVICE (Node.js)                      │
├─────────────────────────────────────────────────────────────────┤
│  Anthropic SDK (claude-sonnet-4-20250514)                        │
│  ├── System Prompt: Trading personality + strategy              │
│  ├── Streaming: Real-time thought output                        │
│  └── Analysis Loop: Every 30s by default                        │
│                                                                  │
│  Market Tools (src/tools/market.ts):                            │
│  ├── getTokenPrice()     → Price, volume, market cap            │
│  ├── getRecentTrades()   → Last 5 trades on token               │
│  └── getWalletBalance()  → SOL + $ARA holdings                  │
│                                                                  │
│  WebSocket Server (ws://localhost:8080)                         │
│  └── Broadcasts: { type, content, timestamp, metadata }         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS FRONTEND                             │
│  useAgentThoughts.ts                                            │
│  ├── Connects to WebSocket                                      │
│  ├── Falls back to mock if agent unavailable                    │
│  └── Shows LIVE/DEMO status in terminal                         │
└─────────────────────────────────────────────────────────────────┘
```

## Data Feed APIs (Free, No Key Required)

| API | Usage | Rate Limit |
|-----|-------|------------|
| DexScreener | SOL, $ARA, BONK, WIF, JUP, PYTH prices | 300 req/min |
| CoinGecko | BTC, ETH prices | 30 req/min |
| Pump.fun | $ARA bonding curve data, volume | ~60 req/min |
| Solana RPC | Wallet balances | Varies |

**Caching:** 15-30s TTL to stay within limits.

## Community Voting System

The community controls the agent's trading personality via real-time voting.

### Trading Styles
| Style | Emoji | Description |
|-------|-------|-------------|
| APE MODE | 🦍 | Aggressive, FOMO-driven, ape into pumps |
| DIAMOND HANDS | 💎 | Never sell, accumulate, HODL forever |
| PAPER HANDS | 📄 | Quick profits, risk-averse, secure gains |
| RESEARCH MODE | 🔬 | Data-driven, web search before trading |
| FULL DEGEN | 🎰 | Max risk, YOLO, this is a casino |

### How It Works
1. Votes reset every 30 minutes
2. Winning style becomes the agent's personality
3. Style prompt is injected into Claude's system prompt
4. One vote per browser (localStorage visitor ID)
5. Real-time vote counts broadcast via WebSocket

### WebSocket Messages
```typescript
// Vote status (sent on connect + after votes)
{ type: 'vote_status', currentStyle, styleConfig, voteCounts, timeRemaining, totalVotes }

// Cast a vote
{ type: 'vote', visitorId: string, style: 'APE' | 'DIAMOND' | 'PAPER' | 'RESEARCH' | 'DEGEN' }

// Vote confirmation
{ type: 'vote_confirmed', success: boolean, message: string }
```

## Autonomous Trading System

The agent is an **autonomous memecoin hunter** - it discovers, analyzes, and trades ANY Solana token via Jupiter (not just $ARA).

### Agent Wallet
- **Address:** `4fAYdSYPGkqUofFVTypCYauB3CJuQ7jXUNJHFnk3ug6q`
- **Solscan:** https://solscan.io/account/4fAYdSYPGkqUofFVTypCYauB3CJuQ7jXUNJHFnk3ug6q

### Trading Tools (Generic - Any Token)
| Tool | Description |
|------|-------------|
| `check_balance` | Get SOL balance + all token positions |
| `get_price(token_address)` | Get any token's price from DexScreener |
| `get_swap_quote(token_address, direction, amount)` | Jupiter quote for any token |
| `execute_trade(token_address, direction, amount, reasoning)` | Trade any token via Jupiter |
| `check_can_trade` | Verify trading is allowed |

### Discovery Tools
| Tool | Description |
|------|-------------|
| `discover_tokens` | Scan DexScreener for trending/boosted tokens |
| `search_tokens(query)` | Search tokens by name, symbol, or theme |

### Trading Philosophy
- Agent gathers 3-5 candidates, analyzes, picks TOP one
- Only trades with HIGH conviction (quality over quantity)
- OK to pass if nothing looks good

### Risk Management
| Rule | Value |
|------|-------|
| Max per trade | 15% of portfolio |
| Max positions | 2 open at once |
| Slippage | 5% (for memecoins) |
| Daily loss limit | 1 SOL |
| Cooldown | 1 min between trades |

### Token Tradability Note
**Pump.fun tokens must "graduate"** (complete bonding curve) before Jupiter can trade them. The agent will get "TOKEN_NOT_TRADABLE" errors for tokens still on pump.fun's bonding curve. Discovery filters prioritize tokens with $10k+ liquidity which are more likely to be graduated/tradable.

### Research Tools (Firecrawl)
| Tool | Description |
|------|-------------|
| `web_search` | Search web for crypto news/sentiment |
| `scrape_page` | Read content from any webpage |
| `search_crypto_twitter` | Find crypto sentiment on Twitter/X |

## Agent Memory System

The agent learns from experience and persists knowledge across restarts.

### Memory Features
- **Trade History**: Records all trades with reasoning and outcomes
- **Hypotheses**: Agent forms and tests trading theories
- **Market Snapshots**: Historical price/volume data
- **Reflections**: Periodic self-analysis (every 10 cycles)

### Memory File
Stored in `agent-service/data/agent-memory.json`

## Discovery Filters

The agent uses DexScreener to find opportunities. Current filters:

| Filter | Value | Purpose |
|--------|-------|---------|
| Min Liquidity | $10,000 | Tradeable on Jupiter |
| Min Volume 24h | $20,000 | Shows activity |
| Max Age | 7 days | Catch newer plays |
| Min Buys 24h | 50 | Some interest |
| Min Score | 50 | Let agent evaluate |
| Buy Ratio | >40% | Not dumping |
| Chain | Solana only | Focus |

Scanner runs every 2 minutes via `setInterval`.

## Phase 3: Future Enhancements
1. **On-chain logs** — Store reasoning hashes on-chain
2. **Jupiter Ultra API** — Better routing, more token support
3. **Advanced charting** — More detailed portfolio analytics
4. **Social features** — Chat between viewers

## Live Deployment

### URLs
- **Frontend:** https://cc-lime-alpha.vercel.app
- **Agent API:** https://web-production-3b844.up.railway.app
- **GitHub (Agent):** https://github.com/RealityResearch/ara-agent-service

### Environment Variables

**Vercel:**
| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_AGENT_WS_URL` | `wss://web-production-3b844.up.railway.app` |

**Railway:**
| Variable | Value |
|----------|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic key |
| `ANALYSIS_INTERVAL` | `30000` |
| `CONTRACT_ADDRESS` | `5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump` |
| `CREATOR_WALLET` | `FPrWHsHS2SVqSpCZrsdqfiND2un8d4rQN1tNQJ8febNs` |
| `AGENT_ENABLED` | `true` (set to `false` to pause agent) |
| `TRADING_ENABLED` | `true` (enables real trade execution) |
| `MEMORY_ENABLED` | `true` (enables learning system) |
| `FIRECRAWL_API_KEY` | Your Firecrawl key (for research tools) |
| `SOLANA_PRIVATE_KEY` | Base58 wallet private key |
| `SOLANA_RPC_URL` | Solana RPC endpoint (default: mainnet) |

### Pausing the Agent
To stop burning API tokens, set `AGENT_ENABLED=false` on Railway. Health check stays up but no Claude calls are made.

## Mock Data Location
All placeholder data is in `src/lib/mockData.ts`:
- `mockThoughts` — Agent terminal messages (fallback when agent offline)
- `mockTickerData` — Price ticker data
- `CONTRACT_ADDRESS` — `5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump`
- `SOCIAL_LINKS` — Twitter (@ClaudeCapital), pump.fun, DEXScreener

---
*Last updated: Autonomous memecoin trading live - agent hunts ANY token with 15% max risk, 2 position limit, 5% slippage*
