# 🌐 FlowTalos Dashboard

> **The Glass-Box Interface** — An elegant Next.js web application that connects users directly to the Vault, providing absolute transparency into the AI Agent's operation and reasoning logs.

[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 The Role of the Dashboard (5W1H)

- **What:** A high-performance, responsive Web3 application built on Next.js 14 and React 18.
- **Why:** To fulfill the "Glass-Box" promise of FlowTalos. Decentralized trust means nothing if users cannot easily verify the AI's math. This dashboard surfaces every IPFS log and EVM calldata permutation in real time.
- **Who:** Built for institutional fund managers and everyday retail DeFi investors to monitor their un-custodied yields.
- **Where:** Deployed on edge networks (like Vercel) and connected simultaneously to both Ethereum EVM wallets (via Wagmi) and Flow native wallets (via FCL).
- **When:** Provides 24/7 real-time feedback bridging the off-chain Python terminal directly to the user's browser via the `/api/trades` route.
- **How:** By querying the local JSON ledger and parsing the immutable Storacha CIDs into clickable, verifiable explorer links while dynamically syncing Vault metrics via the Flow testnet RPC.

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
