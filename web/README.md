# 🌐 FlowTalos Dashboard

> **The Glass-Box Interface** — Next.js web application that provides full transparency into the AI Agent's operations, wallet connectivity, and real-time cryptographic proof verification.

---

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────┐
│                   FlowTalos Dashboard                         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Landing Page (/)              Dashboard (/dashboard)         │
│  ┌────────────────────┐       ┌─────────────────────────────┐│
│  │ • Hero Section      │       │ • Portfolio Stats           ││
│  │ • Protocol Stats    │  ───► │ • Recent Trades + Proofs    ││
│  │ • Features          │ login │ • AI Terminal Log           ││
│  │ • Connect Wallet    │       │ • Active Vault              ││
│  └────────────────────┘       │ • Settings Panel            ││
│                               └─────────────────────────────┘│
│                                                               │
│  API Layer                                                    │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ GET /api/trades → Reads ai-agent/trade_log.json          │  │
│  │ • Path traversal protection                              │  │
│  │ • File size limit (5MB)                                  │  │
│  │ • Response cap (100 items)                               │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
web/
├── public/
│   ├── logo.png                  # FlowTalos branding
│   ├── flow-logo.svg             # Flow blockchain logo
│   ├── filecoin-logo.svg         # Filecoin/Storacha logo
│   ├── lit-logo.svg              # Lit Protocol logo
│   └── storacha-logo.svg         # Storacha network logo
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (926 lines)
│   │   ├── layout.tsx            # Root layout with Web3Provider
│   │   ├── globals.css           # Global styles
│   │   ├── favicon.ico           # Browser tab icon
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard page (1166 lines)
│   │   └── api/
│   │       └── trades/
│   │           └── route.ts      # Trade log API endpoint
│   ├── components/
│   │   ├── Web3Provider.tsx      # RainbowKit + Wagmi + FCL provider
│   │   └── TerminalLog.tsx       # AI terminal log display component
│   ├── config/
│   │   └── fcl.ts                # Flow Client Library configuration
│   └── lib/
│       └── patch-localstorage.ts # SSR localStorage polyfill
├── next.config.ts                # Next.js configuration
├── package.json                  # Node.js dependencies
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Features

### Landing Page (`/`)
- **Hero Section** with animated gradient background
- **Market Ticker** with live protocol statistics
- **Protocol Stats** showing TVL, trades executed, and uptime
- **Feature Cards** explaining the Glass-Box architecture
- **How It Works** step-by-step pipeline visualization
- **Auto-Redirect** to `/dashboard` when wallet is connected

### Dashboard (`/dashboard`)
- **Portfolio Overview** — Total balance, P&L, active positions
- **Recent Trades Table** — Every AI trade with IPFS CID proof links
- **AI Terminal** — Live feed of agent execution logs
- **Active Vault** — Deposit/withdraw interface for the Cadence vault
- **Settings Panel** — Risk parameters and notification preferences
- **Chart Visualization** — Portfolio performance via Recharts

### API Route (`/api/trades`)
- Reads `trade_log.json` produced by the Python AI Agent
- Returns trades in reverse chronological order
- Hardened with path traversal protection, file size limits, and response caps

## Security Measures

| Protection | Location | Implementation |
|---|---|---|
| Path Traversal | `route.ts` | `path.resolve()` + base directory validation |
| File Size Limit | `route.ts` | 5MB max before `readFileSync()` |
| Response Cap | `route.ts` | Max 100 trade entries per response |
| Array Validation | `route.ts` | Rejects non-array JSON data |
| SSR Polyfill | `patch-localstorage.ts` | Typed `StorageMock` interface for Node.js 22+ |
| Type Safety | All files | TypeScript interfaces replace all `any` types |

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | App Router framework |
| React 18 | UI library |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Recharts | Portfolio chart visualization |
| RainbowKit | EVM wallet connection modal |
| Wagmi | React hooks for Ethereum |
| `@onflow/fcl` | Flow Client Library for Cadence interaction |

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn
- WalletConnect Project ID (from [cloud.walletconnect.com](https://cloud.walletconnect.com))

### Installation

```bash
cd web
npm install
```

### Environment Variables

Create a `.env.local` file in the `web/` directory:

```env
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id_here
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
```

## Wallet Integration

The dashboard supports dual-chain wallet connectivity:

1. **EVM Wallet** — Connected via RainbowKit/Wagmi (MetaMask, WalletConnect, etc.)
2. **Flow Wallet** — Connected via `@onflow/fcl` (Blocto, Lilico, etc.)

The `Web3Provider.tsx` wraps both providers and handles cross-chain state management.
