# Claude Investments — ARA (Automated Retirement Account)

## Project Overview
A memecoin on Solana launched via pump.fun featuring a landing page with **theatrical AI agent animations**. The terminal displays pre-scripted "AI thoughts" on a ~6 minute loop, creating the illusion of a live AI trading agent.

- **Name:** Claude Investments
- **Ticker:** $ARA
- **Slogan:** "The Future of Investing is Here"
- **Mode:** Theatrical (no real AI backend)

## Architecture

**THEATRICAL MODE** - Pure frontend, no backend required:
- Pre-scripted thoughts loop every ~6 minutes
- Typing animations create "live" illusion
- Static mock data for portfolio/trades/stats
- No WebSocket, no API costs, no server

## Tech Stack
- **Framework:** Next.js 16+ (App Router, Turbopack)
- **Styling:** Tailwind CSS v4
- **Fonts:** Playfair Display + Courier Prime + Tahoma
- **Live Data:** DexScreener + CoinGecko APIs (ticker prices only)
- **Deployment:** Vercel (static site)

## File Structure
```
cc/
├── CLAUDE.md                    # This file
├── package.json
├── next.config.ts
├── public/
│   └── logos/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main landing page
│   │   ├── globals.css         # Bloomberg terminal design system
│   │   └── api/
│   │       └── ticker/route.ts # Live price ticker API
│   ├── components/
│   │   ├── Ticker.tsx          # Scrolling price ticker
│   │   ├── TerminalPreview.tsx # Bloomberg-style terminal display
│   │   ├── AgentTerminal.tsx   # AI thoughts terminal
│   │   ├── PortfolioChart.tsx  # Static treasury display
│   │   ├── PerformanceMetrics.tsx
│   │   ├── BotEvolution.tsx
│   │   ├── TradeHistory.tsx
│   │   ├── ChartEmbed.tsx      # DEXScreener embed
│   │   ├── HowItWorks.tsx
│   │   ├── TokenInfo.tsx
│   │   ├── ComingSoon.tsx
│   │   ├── Footer.tsx
│   │   └── StickyCA.tsx
│   ├── hooks/
│   │   ├── useAgentThoughts.ts # Scripted thought loop (no WebSocket)
│   │   └── useAgentStats.ts    # Static mock data
│   └── lib/
│       ├── mockData.ts         # Static mock data
│       └── scriptedThoughts.ts # Pre-written AI thoughts (~70 entries)
```

## How It Works

### Scripted Thoughts System
The terminal displays pre-written thoughts from `src/lib/scriptedThoughts.ts`:
- ~70 unique thought messages
- Each has a type (analysis, decision, trade, alert, etc.)
- Each has a delay (2-6 seconds between thoughts)
- Total loop time: ~6 minutes
- Loop repeats indefinitely

### Thought Types
| Type | Color | Description |
|------|-------|-------------|
| analysis | Green | Market analysis, thinking |
| decision | Cyan | Trading decisions |
| trade | Gold | Trade executions |
| action | Orange | Tool usage, scanning |
| alert | Magenta | Alerts, warnings |
| reflection | Light Blue | Self-analysis |
| hypothesis | Pink | Market theories |
| status | Gray | System status |

### Mock Data
Static data in `src/lib/mockData.ts` provides:
- Fake trade history (7 trades)
- Fake performance stats (67.6% win rate, etc.)
- Fake evolution/XP data
- Contract address and social links

## Running Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

No backend or API keys required. Terminal automatically shows animated thoughts.

## Deployment

```bash
# Deploy to Vercel (or any static host)
npm run build
# Site is fully static, deploys anywhere
```

## Live URLs
- **Site:** https://cc-lime-alpha.vercel.app
- **Contract:** `5X61PKDGt6Fjg6hRxyFiaN61CDToHEeE2gJhDgL9pump`
- **Twitter:** @ClaudeCapital

## Customizing Thoughts

Edit `src/lib/scriptedThoughts.ts` to change the AI's "personality":

```typescript
export const SCRIPTED_THOUGHTS: ScriptedThought[] = [
  { message: 'Your custom message here...', type: 'analysis', delay: 3000 },
  // Add more thoughts...
];
```

Types: `analysis`, `decision`, `trade`, `info`, `alert`, `action`, `reflection`, `hypothesis`, `status`

---

## Previous Architecture (Archived)

The project previously had a full agent-service backend with:
- Real Claude API integration
- Jupiter swap execution
- WebSocket thought streaming
- Position management
- Token discovery

This has been removed in favor of the theatrical mode. All backend code was deleted.

---
*Last updated: Theatrical mode conversion - removed agent-service, converted to scripted frontend.*
