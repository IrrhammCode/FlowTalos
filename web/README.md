# 🌐 FlowTalos Dashboard

> **The Glass-Box Interface** — An elegant Next.js web application that connects users directly to the Vault, providing absolute transparency into the AI Agent's operation and reasoning logs.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 Operational Context & Protocol Role

The FlowTalos Dashboard serves as the definitive "Glass-Box" realization of the protocol, built upon high-performance Next.js 14 and React 18 infrastructure. Decentralized trust cannot exist if users cannot effortlessly verify algorithmic decision-making. Therefore, this dashboard is critically aligned to surface every Storacha IPFS reasoning log and Flow EVM execution payload in real-time, bridging the gap between off-chain Python terminal data and the end-user's browser.

Deployed at the edge and catering to both institutional fund managers and retail DeFi investors, the frontend uniquely integrates dual-chain connectivity. Users can interact fluidly utilizing Ethereum EVM wallets via Wagmi or native Flow wallets via the Flow Client Library (FCL). By safely parsing immutable IPFS CIDs into interactive block explorer links while streaming Cadence vault television limits, the dashboard offers uninterrupted, 24/7 accountability of the autonomous system.

<details open>
<summary><b>🔎 Proof of Implementation (Web Code Evidence)</b></summary>

*   **Real-time Glass-Box Terminal:** [`src/components/TerminalLog.tsx (Line 38)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/components/TerminalLog.tsx#L38) — The React component mapping live AI trading daemon output directly to the DOM.
*   **Dual-Chain Protocol Connectivity:** [`src/components/Web3Provider.tsx (Line 25)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/components/Web3Provider.tsx#L25) — Safely abstracts the integration between RainbowKit configs and `@onflow/fcl` parameters.
*   **Secure Trade Ledger API Guard:** [`src/app/api/trades/route.ts (Line 15)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/api/trades/route.ts#L15) — Edge function safely parsing the Python `trade_log.json` while guarding against path traversal.
</details>

---

## 🏗️ Architecture Overview

```text
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
│  │ GET /api/trades → Safely reads trade_log.json            │  │
│  │ • Path traversal protection                              │  │
│  │ • File size limit (5MB) & Response limits                │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|------|------------|---------|
| Framework | Next.js 14 | App Router & Edge API |
| Language | TypeScript | Type-safe development |
| Styling | Tailwind CSS | Utility-first responsive design |
| Charts | Recharts | Dynamic portfolio metrics |
| Wallet Integration | Wagmi + RainbowKit | Ethereum/EVM wallet modal |
| Flow Integration | @onflow/fcl | Cadence transaction signing |
| Runtime | Node.js | Edge rendering & API execution |

---

## 📂 Folder Structure

```text
web/
├── src/
│   ├── app/                 # Next.js App Router root
│   │   ├── dashboard/       # Main authenticated dashboard interface
│   │   └── api/             # Edge API routes (e.g., /api/trades)
│   ├── components/          # Reusable React components
│   │   ├── TerminalLog.tsx  # Live AI reasoning output stream
│   │   └── Web3Provider.tsx # Dual-chain wallet wrapper (EVM/FCL)
│   ├── lib/                 # Utilities and SSR polyfills
│   └── config/              # Flow network configurations
└── public/                  # Static assets and protocol SVGs
```

---

## 💎 Key Features

- **Protocol Stats Ticker:** Live metrics including TVL and strategy uptime.
- **Dual-Chain Wallet Connector:** Flawless integration between RainbowKit (EVM) and `@onflow/fcl` (Cadence).
- **IPFS Proof Links:** Direct access to unalterable `CIDv1` records verifying that the Python logic was executed fairly.
- **AI Terminal Emulation:** A React component exclusively rendering the live thoughts of the Synapse Daemon in real-time.
---

## 🎨 Screenshots

To provide a visual sense of the protocol's operating environment, here are structural previews of the system in action:

### 1. Landing Page
*The protocol introduction and Web3 Wallet connectivity portal.*
![Landing Page](../docs/landing.png)

### 2. Dashboard Interface
*Real-time monitoring of Vault TVL, portfolio metrics, and the active Vault.*
![Dashboard Overview](../docs/dashboard.png)

### 3. AI Terminal & IPFS Logs
*Live terminal emulation rendering the thoughts of the Synapse Daemon and clickable CIDv1 immutable proofs.*
![Terminal and Logs](../docs/terminal.png)

---

## 🛡️ Security Hardening

The `/api/trades` bridge has been intensely hardened against malicious local file exploitation:
1. **Directory Traversal Blocks:** Enforces `path.resolve()` and explicitly rejects parent `..` traversals.
2. **Buffer Limitations:** Maximum 5MB memory footprint via `readFileSync()` guards against DDoSing the edge functions.
3. **Response Capping:** Returns a maximum of 100 historical records to protect browser hydration load times.

---

## 💻 Installation & Usage

### 1. Prerequisites
- Node.js 18+ and `npm`

### 2. Environment Variables

Create a `.env.local` file at the root of the `/web` directory.

| Variable | Description | Requirement |
|--------|-------------|-------------|
| `NEXT_PUBLIC_WC_PROJECT_ID` | WalletConnect Project ID from cloud.walletconnect.com | **Required** (For RainbowKit EVM integration) |
| `NEXT_PUBLIC_FLOW_NETWORK` | Flow network environment (`testnet` or `mainnet`) | Optional (Defaults to `testnet`) |

### 3. Local Development

```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the Glass-Box interface.

---

## 🚀 Deployment

The FlowTalos Dashboard is optimized for Vercel edge deployment.

**Deploy via Vercel CLI:**
```bash
npx vercel deploy --prod
```

**Or build for production locally:**
```bash
npm run build
npm start
```

---

## 🆘 Troubleshooting

**1. EVM Wallet not connecting or WalletConnect error:**
- The RainbowKit modal relies on WalletConnect. Ensure `NEXT_PUBLIC_WC_PROJECT_ID` is correctly set in `.env.local` and restart the server.

**2. Hydration or LocalStorage window errors:**
- Next.js SSR occasionally conflicts during hard refreshes if states differ. Delete the build cache and restart:
```bash
rm -rf .next
npm run dev
```

**3. Testnet Cadence transactions stalling:**
- Testnet nodes undergo routine maintenance. Check Flow testnet status via the official Discord or [status.onflow.org](https://status.onflow.org/).

---

## 📄 License

This dashboard component is distributed under the **MIT License**.

Refer to the root repository `LICENSE` file for full definitions and terms.
