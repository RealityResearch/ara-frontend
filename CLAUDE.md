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
│   │   ├── WalletDisplay.tsx   # Portfolio & trades display
│   │   ├── TokenInfo.tsx       # Contract address, buy links
│   │   ├── ComingSoon.tsx      # Roadmap features
│   │   └── Footer.tsx          # Socials & disclaimer
│   ├── hooks/
│   │   └── useAgentThoughts.ts # WebSocket + mock fallback hook
│   └── lib/
│       └── mockData.ts         # Mock data for demo
├── agent-service/               # Trading agent backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example            # Agent env vars (API key)
│   └── src/
│       ├── index.ts            # Entry point + WebSocket server
│       ├── agent.ts            # Claude-powered trading agent
│       ├── websocket.ts        # Thought broadcast server
│       └── tools/
│           └── market.ts       # Price/wallet/trade tools
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

## Phase 2: Real Trading (Future)
1. ~~**Real price feeds**~~ — ✅ Done (DexScreener + CoinGecko)
2. **Solana wallet** — @solana/web3.js for dev wallet control
3. **Trade execution** — Jupiter swap API
4. **Creator fee monitoring** — Watch for pump.fun fees
5. **On-chain logs** — Store reasoning hashes on-chain

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

### Pausing the Agent
To stop burning API tokens, set `AGENT_ENABLED=false` on Railway. Health check stays up but no Claude calls are made.

## Mock Data Location
All placeholder data is in `src/lib/mockData.ts`:
- `mockThoughts` — Agent terminal messages (fallback when agent offline)
- `mockTickerData` — Price ticker data
- `CONTRACT_ADDRESS` — `5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump`
- `SOCIAL_LINKS` — Twitter (@ClaudeCapital), pump.fun, DEXScreener

---
*Last updated: Full deployment complete — Vercel + Railway live, agent pausable via env var*
