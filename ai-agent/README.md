# 🧠 FlowTalos AI Agent

> **The Brain** — Autonomous DeFi strategy engine combining quantitative technical analysis with qualitative news sentiment to generate actionable, cryptographically verifiable on-chain signals.

[![Python Core](https://img.shields.io/badge/Language-Python_3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](#)
[![Web3 Analytics](https://img.shields.io/badge/Web3-AI_Analytics-blueviolet?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 Operational Context & Protocol Role

The FlowTalos AI Agent operates as a continuous, multi-threaded Python daemon designed to entirely remove emotional human bias from DeFi trading. Running autonomously in a secure, off-chain cloud environment, it acts as the primary strategist for users who have deposited capital into the FlowTalos Cadence Vault. 

By executing a strict evaluation matrix that cross-references live market data with natural language processing (NLP) sentiment, the agent ensures that trades are only scheduled when optimal conditions align. Crucially, the agent bridges its off-chain intelligence back to the Flow blockchain by cryptographically pinning its "proof-of-thought" to the Storacha (IPFS) network and securely delegating transaction threshold signing to the decentralized Lit Protocol. This guarantees that its decision-making process is fully auditable and tamper-proof before any transaction reaches the Forte Flow Scheduler perfectly natively on the Flow testnet.

<details open>
<summary><b>🔎 Proof of Implementation (Agent Code Evidence)</b></summary>

*   **Continuous Autonomous Loop:** [`main.py (Line 460)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L460) — Highlights the asynchronous daemon loop continuously evaluating the market.
*   **Dual-Signal Matrix Execution:** [`main.py (Line 312)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L312) — The core logical intersection where CoinGecko technicals meet CryptoCompare NLP sentiment.
*   **Decentralized Infrastructure Bridging:** [`main.py (Line 380)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L380) — Subprocess execution wrapping the Storacha IPFS pinning and Lit Action capabilities.
</details>

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
