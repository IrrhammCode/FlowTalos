# 🧠 FlowTalos AI Agent

> **The Brain** — Autonomous DeFi strategy engine combining quantitative technical analysis with qualitative news sentiment to generate actionable, cryptographically verifiable on-chain signals.

[![Python Core](https://img.shields.io/badge/Language-Python_3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](#)
[![Web3 Analytics](https://img.shields.io/badge/Web3-AI_Analytics-blueviolet?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 The Role of the AI Agent (5W1H)

- **What:** A continuous multi-threaded Python daemon that executes trade evaluation matrices and schedules output transactions.
- **Why:** To eliminate emotion from trading while simultaneously generating cryptographic proof-of-thought (via Storacha IPFS logs) for every decision it makes.
- **Who:** Operates completely autonomously on behalf of users who have deposited capital into the FlowTalos Cadence Vault.
- **Where:** Runs entirely off-chain in any secure cloud computing environment, bridging back on-chain via the Flow testnet.
- **When:** Executes evaluation loops persistently, scheduling trades via the Forte Flow Scheduler only when strict dual-signal criteria align.
- **How:** Fetches CoinGecko/CryptoCompare data, calculates mathematical RSI against NLP sentiment, generates EVM swap calldata locally, and delegates signing to the decentralized Lit Protocol.

---

## 🏗️ Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    FlowTalos AI Agent                        │
├─────────────────────────────────────────────────────────────┤
│  1. fetch_market_data()    → CoinGecko real-time price      │
│  2. fetch_news_sentiment() → CryptoCompare headline NLP     │
│  3. synapse_ai_analyze()   → Dual-signal matrix decision    │
│  4. upload_to_storacha()   → Immutable IPFS proof (CID)     │
│  5. trigger_lit_action()   → Lit Protocol threshold signing │
│  6. submit_to_flow()       → Flow Scheduled Transaction     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Decision Matrix

The Synapse AI engine utilizes a strict **Dual-Signal alignment matrix**. Trades only execute when technicals and sentiment explicitly agree, drastically reducing quantitative "whipsaw" false positives.

| Technical Variable | Positive Sentiment | Neutral Sentiment | Negative Sentiment |
|--------------------|:------------------:|:-----------------:|:------------------:|
| **Bullish (RSI)**  | 🟢 **BUY**         | 🟢 **BUY**        | ⚪ HOLD            |
| **Neutral**        | ⚪ HOLD            | ⚪ HOLD           | ⚪ HOLD            |
| **Bearish (RSI)**  | ⚪ HOLD            | 🔴 **SELL**       | 🔴 **SELL**        |

---

## 🛠️ Technology Stack & Dependencies

| Technology | Purpose |
|---|---|
| **Python 3.9+** | Core asynchronous loop and orchestrator |
| **`requests`** | Time-series and qualitative API polling |
| **`web3.py`** | ABI EVM calldata generation for Uniswap V2 forks |
| **`subprocess`** | Sandboxed RPC execution for Lit Protocol & IPFS Node.js |
| **`hashlib`** | Cryptographic local fallback SHA-256 validation |
| **`fcntl`** | Aggressive file locking preventing JSON log race conditions |

---

## 🛡️ Security & Zero-Crash Architecture

FlowTalos AI is designed never to panic. Every external dependency uses deterministic graceful degradation:

- **CoinGecko Offline?** → Aborts cleanly, preventing invalid trades.
- **Storacha IPFS Network Down?** → Calculates Base32 CIDv1 locally via strictly matched SHA-256 parameters.
- **Lit Protocol Timeout?** → Generates mock double-SHA-256 deterministic arrays for continuous execution testing.
- **Local EVM Calldata Serialization:** The `swapExactTokensForTokens` ABI is strictly coded internally, preventing external RPC-injected smart contract routing modification.

---

## 💻 Installation & Usage

### 1. Prerequisites
- Python 3.9+ and `pip`
- Node.js 18+ (Required for Lit Action & Storacha Subprocesses)

### 2. Quick Setup

```bash
cd ai-agent
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Run the Daemon

```bash
python3 main.py --daemon
```

### 4. Execute Test Suite

The test suite validates the EVM ABI calldata compiler, the deterministic CID hasher, and the dual-signal matrix.

```bash
python3 -m pytest test_agent.py -v
```

---

## 🔑 Environment Secrets

All integrations gracefully fall back to local computation if API keys are missing. For absolute production topology, see `.env.example`:

```ini
FLOW_TESTNET_SIGNER=24c2e530f15129b7
COINGECKO_API_KEY=your_key_here
CRYPTOCOMPARE_API_KEY=your_key_here
```
