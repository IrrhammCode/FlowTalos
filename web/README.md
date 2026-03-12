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

## 💎 Key Features

- **Protocol Stats Ticker:** Live metrics including TVL and strategy uptime.
- **Dual-Chain Wallet Connector:** Flawless integration between RainbowKit (EVM) and `@onflow/fcl` (Cadence).
- **IPFS Proof Links:** Direct access to unalterable `CIDv1` records verifying that the Python logic was executed fairly.
- **AI Terminal Emulation:** A React component exclusively rendering the live thoughts of the Synapse Daemon in real-time.
- **Responsive Analytics:** Recharts charting capabilities plotting yield performance dynamically.

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
- A WalletConnect Project ID

### 2. Environment Setup

Create `.env.local`:
```ini
NEXT_PUBLIC_WC_PROJECT_ID=your_id_here
```

### 3. Quick Boot

```bash
cd web
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the Glass-Box interface.
