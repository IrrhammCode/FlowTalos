<p align="center">
  <img src="./assets/logo.png" alt="FlowTalos Logo" width="150" />
</p>

# 🤖 FlowTalos — Decentralized AI Wealth Management Protocol

> **Trustless, autonomous, and mathematically verifiable AI-driven asset management built natively for the Flow Blockchain.**

[![Flow Blockchain](https://img.shields.io/badge/Flow-Blockchain-10B981?style=for-the-badge&logo=flow&logoColor=white)](https://flow.com/)
[![Hackathon: PL_Genesis](https://img.shields.io/badge/Hackathon-PL__Genesis:_Frontiers_of_Collaboration-blue?style=for-the-badge)](#)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=openai)](https://github.com/IrrhammCode/FlowTalos)
[![Web3 DeFi](https://img.shields.io/badge/Web3-DeFi-black?style=for-the-badge)](https://github.com/IrrhammCode/FlowTalos)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## ⚡ Quick Start

Get the AI agent and the frontend running locally in under 60 seconds:

```bash
# 1. Clone the repository
git clone https://github.com/IrrhammCode/FlowTalos.git
cd FlowTalos

# 2. Install and run the Next.js Glass-Box frontend
cd web && npm install && npm run dev

# 3. (New terminal) Boot the Synapse AI Daemon
cd ai-agent
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python main.py --daemon
```

---

## 🌍 Project Overview

**What is FlowTalos?**
FlowTalos is a decentralized, non-custodial asset management protocol powered by an autonomous multi-threaded artificial intelligence agent. It bridges the gap between sophisticated quantitative AI trading and trustless Web3 security.

**Why does it exist?**
To permanently solve the "Black-Box" trust issue inherent in AI-driven DeFi agents. By utilizing cryptographic threshold signatures and IPFS storage, FlowTalos mathematically proves *why* an AI made a trade.

**Who is it for?**
For DeFi investors seeking algorithmic yield generation without sacrificing self-custody or surrendering their private keys to a centralized server.

**How does it improve DeFi AI trading?**
It separates the "Brain" from the "Vault". The AI can only schedule algorithmically proven strategies to a queue. The native Cadence smart contract enforcing security utilizes Cross-VM execution (Cadence-Owned-Accounts) to safely access deep Flow EVM liquidity.

---

## 🚨 Problem Statement

The integration of Artificial Intelligence into DeFi trading has introduced a massive trust and security deficit. Current implementations suffer from critical flaws:

- **Black Box Decision Making:** Users surrender their assets to smart contracts with zero visibility into *why* the off-chain AI decided to swap tokens at a specific moment.
- **Custodial AI Wallets:** AI agents are typically granted direct access to a hot wallet's private keys, requiring users to explicitly give up asset sovereignty.
- **Centralized Strategy Execution:** A single centralized script executes the trades, creating a massive single point of failure and hacking risk.
- **Lack of Verifiable Reasoning:** Reasoning models are ephemeral. If an AI executes a catastrophic trade, there is no immutable audit trail to prove malfeasance versus natural market volatility.

---

## 💡 Solution

FlowTalos completely reimagines AI wealth management by replacing blind trust with cryptographic verification. Our innovations include:

- **Glass-Box AI:** Every mathematical calculation and sentiment analysis step is exposed, logged, and verifiable.
- **Non-Custodial Cadence Vault:** The AI does *not* hold funds. Users deposit into pristine Cadence smart contracts. The AI acts merely as an unprivileged *strategist*.
- **IPFS Reasoning Logs:** The exact parameters that triggered a trade are hashed and pinned to Storacha/IPFS before execution.
- **Lit Protocol Threshold Signing:** The AI cannot blindly execute trades. Its proposed payload is validated and threshold-signed by a decentralized network of Lit nodes.
- **Flow EVM Liquidity Execution:** Combines Cadence’s unmatched resource-oriented security with the massive liquidity pools available on the Flow EVM.

---

## 💎 Key Features

- **Transparent AI decision logs** pinned to decentralized storage.
- **Non-custodial vault contracts** enforcing strict capability-based access control.
- **Threshold-signed AI transactions** utilizing Programmable Key Pairs (PKP).
- **Autonomous trade scheduling** natively via the Forte Flow Scheduler.
- **Cross-VM execution** allowing secure Cadence logic to swap tokens on EVM DEXs like IncrementFi natively.

---

## 🏗️ Architecture Overview

```text
    [USER] 
      │ (Deposits Funds via UI)
      ▼
 ┌─────────────────────────┐
 │   FlowTalos Vault       │◄──────┐
 │   (Cadence Contract)    │       │
 └─────────────────────────┘       │ (Execute Scheduled TX)
                                   │
 ┌─────────────────────────┐   ┌─────────────────────────┐
 │   Synapse AI Engine     │──▶│ Flow Execution Scheduler│
 │   (Python Daemon)       │   │ (Cadence Timer Queue)   │
 └─────────────────────────┘   └─────────────────────────┘
      │               │                     ▲
  (Log Reasoning)   (Request Signature)     │ (Threshold Sign)
      ▼               ▼                     │
 ┌──────────────┐  ┌──────────────────────────────┐
 │ Storacha/IPFS│  │ Lit Protocol Action Nodes    │
 │ (JSON Proofs)│  │ (Validates & ECDSA Signs)    │
 └──────────────┘  └──────────────────────────────┘
                                            
                                            │ (Cross-VM Bridge)
                                            ▼
                                ┌─────────────────────────┐
                                │   Flow EVM (DEX Swap)   │
                                │   (IncrementFi/Metapier)│
                                └─────────────────────────┘
```

**Architecture Breakdown:**
1. **User:** Deposits FLOW/USDC into the strictly non-custodial Cadence Vault.
2. **AI Engine:** Analyzes markets off-chain and generates an EVM encoded byte payload.
3. **Storacha IPFS Logs:** The reasoning for the payload is hashed and stored immutably.
4. **Lit Protocol Validation:** Decentralized nodes check the payload structure and ECDSA sign it collaboratively.
5. **Flow Scheduler:** The signed transaction is placed in the native Flow timer queue.
6. **Flow EVM DEX Swap:** The Vault executes the EVM byte payload at the appropriate epoch, securing trades with deepest liquidity.

---

## ⚙️ Protocol Execution Flow

Here is the step-by-step lifecycle of an autonomous AI trade:

1. **Data Ingestion:** The Synapse AI agent fetches current FLOW prices (CoinGecko) and global news headlines (CryptoCompare).
2. **AI Signal Generation:** The algorithm calculates the RSI and evaluates social sentiment (e.g., Bullish Technicals + Positive News = **BUY**).
3. **EVM Calldata Generation:** The agent constructs the exact EVM bytecode required to swap tokens on an EVM decentralized exchange.
4. **Reasoning Log Creation & IPFS Pinning:** A JSON payload detailing the price, sentiment, and reasoning is pinned to Storacha/IPFS, returning a CIDv1 hash.
5. **Lit Validation:** The EVM payload and CID are sent to Lit. The JS Action network validates the target contract and issues a Threshold ECDSA signature.
6. **Flow Scheduling:** The validated transaction is broadcast to the Flow testnet queue.
7. **EVM Execution:** At the scheduled block, the Cadence Vault triggers its Cadence-Owned Account (COA) boundary, routing the transaction onto Flow EVM safely.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|------|------------|--------|
| Blockchain | **Flow** | High-throughput transparent settlement layer |
| Smart Contracts | **Cadence** | Unparalleled capability-based vault security |
| Execution Liquidity | **Flow EVM** | Deep liquidity AMM access via Cross-VM |
| AI Engine | **Python** | Multi-threaded algorithmic trading intelligence |
| Storage | **Storacha / IPFS** | Immutable, cryptographically pinned reasoning logs |
| Signing | **Lit Protocol** | Decentralized JS threshold signature generation |
| Frontend | **Next.js** | Glass-box real-time investor dashboard UI |

<details>
<summary><b>🔍 Click here to view Exact Source Code Evidences per Technology</b></summary>

- **Flow Blockchain (Cadence)** 
  * [`FlowTalosVault.cdc (Line 19)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L19) - Vault execution interface
  * [`FlowTalosVault.cdc (Line 60)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L60) - Deposit capability
  * [`setup_vault.cdc (Line 15)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/transactions/setup_vault.cdc#L15) - User Setup TX
- **Flow EVM Cross-VM**
  * [`ai-agent/main.py (Line 387)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L387) - ABI Encoding swapExactTokensForTokens
  * [`FlowTalosVault.cdc (Line 95)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L95) - COA bridging isolation
  * [`ai-agent/main.py (Line 382)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L382) - Uniswap V2 Router ABI Hex
- **Lit Protocol**
  * [`lit-action/src/action.js (Line 15)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L15) - PKP Threshold network
  * [`lit-action/src/action.js (Line 210)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L210) - LitActions.signEcdsa() invocation
  * [`ai-agent/main.py (Line 529)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L529) - Python Lit RPC Trigger
- **Storacha / IPFS**
  * [`storacha-logger/src/index.ts (Line 70)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L70) - Filecoin Directory upload
  * [`storacha-logger/src/index.ts (Line 104)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L104) - Valid CIDv1 Fallback Generation
  * [`ai-agent/main.py (Line 460)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L460) - Python to Storacha RPC Trigger
- **Next.js**
  * [`web/src/app/dashboard/page.tsx (Line 185)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L185) - Auto-Polling Hook
  * [`web/src/app/dashboard/page.tsx (Line 315)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L315) - CID hyperlink generation
- **AI Engine (Python/CoinGecko/CryptoCompare)**
  * [`ai-agent/main.py (Line 292)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L292) - Core Dual-Signal Matrix Loop
  * [`ai-agent/main.py (Line 113)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L113) - CoinGecko Simple Price V3 invocation
  * [`ai-agent/main.py (Line 207)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L207) - CryptoCompare V2 Article Fetch
</details>

---

## 🔐 Smart Contract Architecture

- **Vault contract:** Highly secure Cadence resource holding human-deposited funds. Ensures the AI cannot arbitrary withdraw assets.
- **Strategy handler:** Validates whether proposed transactions align with predefined yield mechanisms.
- **Capabilities system:** Implements Cadence’s robust access-control ensuring zero overlap between agent planning access and vault settlement loops.
- **EVM bridge execution:** Allows the Cadence vault to encode Solidity calldata strings natively, transferring tokens to a Cadence-Owned Account (COA) to access Flow EVM without trust sacrifices.

---

## 🧠 AI Engine Design

- **Market data ingestion:** CoinGecko API hooks providing time-series pricing data for mathematical modeling.
- **Sentiment analysis:** Aggregates real-time news headlines (and Twitter variables natively) to establish global psychological bias matrices.
- **Signal matrix:** Fuses technical (RSI overbought/oversold) and fundamental sentiment variables. Operations trigger strictly on bidirectional signal agreement.
- **Trade execution encoding:** Bypasses central node servers by actively hashing raw `swapExactTokensForTokens` EVM calldata locally.

---

## 🛡️ Security Model

- **Non-custodial vault:** Absolute investor autonomy. Withdrawals happen independently from AI status.
- **Capability isolation:** Vault assets are firewalled from the scheduling apparatus via pure Cadence `auth()` restrictions.
- **Threshold signatures:** No single entity possesses the private key capable of green-lighting a transaction (Lit Protocol).
- **Deterministic execution:** Strict checks prevent the engine from arbitrarily communicating with malicious EVM routers.
- **Immutable reasoning logs:** Every action is eternally auditable via hash-matched Storacha JSON pins.

---

## 📁 Folder Structure

```text
FlowTalos/
├── ai-agent/           # 🧠 Python intelligence daemon
├── cadence/            # ⛓️ Flow smart contracts & CLI config
├── lit-action/         # 🔑 Lit Protocol Javascript nodes
├── storacha-logger/    # 📦 IPFS/Web3.Storage upload scripts
└── web/                # 🖥️ Next.js Glass-Box Frontend Dashboard
```

---

## 💻 Installation Guide

**Prerequisites:** Node.js (v18+), Python (3.10+), and the Flow CLI.

```bash
# Clone the repository
git clone https://github.com/IrrhammCode/FlowTalos.git
cd FlowTalos

# Install root UI and utility dependencies
npm install --prefix web
npm install --prefix lit-action
npm install --prefix storacha-logger

# Setup Python Virtual Environment
cd ai-agent
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create `.env` files based on `.env.example`. Most notably for the `ai-agent/.env`:

```ini
# Flow Testnet Signer Account Address
FLOW_TESTNET_SIGNER=24c2e530f15129b7

# API Integrations (Optional, graceful offline fallbacks exist)
COINGECKO_API_KEY=your_key_here
CRYPTOCOMPARE_API_KEY=your_key_here
TWITTER_BEARER_TOKEN=your_token_here

# EVM Node Target
FLOW_EVM_RPC_URL=https://testnet.evm.nodes.onflow.org
```

---

## 🚀 Running the Project

**1. Frontend Dashboard:**
```bash
cd web && npm run dev
```

**2. Backend AI Daemon:**
```bash
cd ai-agent
source venv/bin/activate
python main.py --daemon
```

---

## 🧪 Testing

Execute Python logic analysis tests:
```bash
cd ai-agent
pytest test_agent.py
```

Deploy cadence integration checks locally (Emulator):
```bash
flow emulator
flow project deploy --network=emulator
```

---

## 📤 Deployment

- **Flow testnet contracts:**
  ```bash
  flow project deploy --network=testnet
  ```
- **Frontend deployment:**
  ```bash
  cd web && npx vercel deploy --prod
  ```
- **AI daemon:** Designed to be containerized via Docker and executed on any secure cloud VM instance.

---

## 📜 Example Trade Log

*Every executed node generates a verifiable reason payload via Storacha IPFS:*
```json
{
  "timestamp": "2026-03-11T21:45:10.123456",
  "action": "BUY",
  "token": "FLOW",
  "amount": 100.0,
  "price_snapshot": 0.842,
  "news_sentiment": "positive",
  "target_dex_evm": "IncrementFi",
  "evm_calldata": "0x38ed173900000000000...",
  "dex_router": "0xRouterAddress",
  "reasoning": "Dual-Signal Alignment! Technicals: FLOW shows oversold conditions. Qualitative: Social sentiment POSITIVE.",
  "ipfs_cid": "bafybeicm... (Base32 CIDv1)",
  "tx_status": "PENDING"
}
```

---

## 📊 Dashboard

The "Glass-Box" UI features:
- **Portfolio Metrics:** Displaying vault TVL and user asset allocation.
- **Trade Logs Table:** A real-time data stream of autonomous transaction executions.
- **Reasoning CID:** Clickable links bridging users cleanly to their transparent Storacha network proofs.
- **Execution Metrics:** Live terminal emulation showing absolute real-time Python daemon thoughts.

---

## 🗺️ Roadmap

- **Phase 1 — Hackathon MVP:** Core FlowTalos Cadence bridging routing testnets and establishing structural viability.
- **Phase 2 — Mainnet deployment:** Full smart-contract audits and real-world capital deployment integrations on Flow Network.
- **Phase 3 — DAO governance:** Transfer of capability limits and AI-algorithm modification governance to a community DAO.
- **Phase 4 — Strategy marketplace:** Permitting independent quantitative researchers to inject hyper-specific AI models natively into the platform ecosystem.

---

## 🎥 Demo

**▶️ [Demo Video Link]((https://youtu.be/fake_url))** *(Placeholder for submission)*  
**🌐 Live Dashboard Link:** `https://flowtalos.vercel.app/` *(Awaiting deployment)*

---

## 🤝 Contributing Guide

1. Fork the repo and create your branch from `main`.
2. Implement your features or bugfixes using Conventional Commits.
3. Test your integration extensively against the `flow emulator`.
4. Open a Pull Request detailing architectural justifications. We welcome Web3 cryptographers, Cypherpunks, and AI analysts.

---

## 🔐 Security Disclosure

FlowTalos is an experimental hackathon concept protocol. **DO NOT DEPLOY MAINNET FUNDS WITHOUT FULL SMART CONTRACT AUDITS.** The codebase has not been formally proven regarding its COA mapping vectors.

Vulnerability reporting: Please DO NOT open a public GitHub Issue. Create a security advisory or email the maintainers directly.

---

## ⚠️ Known Limitations

- **Rule-based AI constraints:** The intelligence matrix currently utilizes deterministic math scoring (RSI + Sentiment mapped weights) rather than deep-learning LLM prediction generation to guarantee execution speed.
- **Limited assets:** Native swaps presently restricted to primary liquid tokens (FLOW/USDC).
- **Testnet environment:** Relies on testnet API keys which face aggressive rate limits during high throughput.

---

## 🆘 Troubleshooting

- **Flow CLI not detected:** Ensure `flow` binary is added to your `$PATH`. Re-run `sh -ci "$(curl -fsSL https://raw.githubusercontent.com/onflow/flow-cli/master/install.sh)"`.
- **API keys missing:** The python daemon will cleanly revert to "local hashing modes". You will still see functionality, but Storacha CIDs will only render locally on your dashboard.
- **EVM Fallbacks failed:** Check EVM RPC provider statuses within Cadence.

---

## 📄 License

This repository is distributed under the **MIT License**. Read `LICENSE` for details.

---

## 🙌 Credits

- **PL_Genesis: Frontiers of Collaboration Hackathon**
- **Flow Blockchain**
- **Lit Protocol**
- **Storacha**
