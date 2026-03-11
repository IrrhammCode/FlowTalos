<p align="center">
  <img src="./assets/logo.png" alt="FlowTalos Logo" width="150" />
</p>

# 🤖 FlowTalos — Decentralized AI Wealth Management Protocol

> **Trustless, autonomous, and mathematically verifiable AI-driven asset management built natively for the Flow Blockchain.**

[![Flow Blockchain](https://img.shields.io/badge/Blockchain-Flow-10B981?style=for-the-badge&logo=flow&logoColor=white)](https://flow.com/)
[![AI Powered](https://img.shields.io/badge/AI-Autonomous%20Trading-purple?style=for-the-badge&logo=openai)](https://github.com/IrrhammCode/FlowTalos)
[![Web3 DeFi](https://img.shields.io/badge/Web3-DeFi_Protocol-black?style=for-the-badge)](https://github.com/IrrhammCode/FlowTalos)
[![Hackathon: PL_Genesis](https://img.shields.io/badge/Hackathon-PL__Genesis-blue?style=for-the-badge)](https://devfolio.co/projects/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

<p align="center">
  <img src="docs/flowtalos-banner.png" width="900">
</p>

---

## ⏱️ How FlowTalos Works in 10 Seconds

FlowTalos distills complex quantitative AI trading into a trustless 6-step loop:

1. **User deposits assets** into the pristine Cadence Vault.
2. ↓ **AI Daemon analyzes** market data via CoinGecko & News Sentiment.
3. ↓ **Reasoning is logged** and permanently pinned to Storacha/IPFS.
4. ↓ **Lit Protocol validates** the payload and generates a Threshold Signature.
5. ↓ **Flow Scheduler queues** the validated transaction on the native timer.
6. ↓ **Flow EVM executes** the final automated DEX swap securely.

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

## 🏆 Hackathon Challenge Response: Verifiable AI

FlowTalos is engineered from the ground up to win the **AI & Robotics (Verifiable AI)** track. We explicitly reject "raw capability" in favor of absolute **safety, coordination, and real-world deployment** by providing undeniable cryptographic proof of AI reasoning and decision provenance.

Here is exactly how we answer the challenge (**5W1H**):

- **What:** A trustless, non-custodial Vault orchestrated by an autonomous AI agent that generates immutable cryptographic receipts for every single decision it makes.
- **Why:** To solve the "black box" AI trust deficit. Users must know exactly why an AI decided to swap their tokens, preventing silent edge-case failures or malicious protocol manipulations.
- **Who:** Built for DeFi users and institutional capital looking for algorithmically driven yield without surrendering self-custody.
- **Where:** Operating at the bleeding edge of Web3 infrastructure by fusing **Flow Cadence** (strict safety boundaries), **Lit Protocol** (decentralized signing), and **Storacha/IPFS** (permanent logging).
- **When:** Crucially, the AI's reasoning is hashed and pinned to IPFS *before* any threshold signature is granted or any transaction is scheduled on-chain.
- **How:** By programmatically enforcing a workflow where the Python AI daemon cannot hold private keys. It must publicly state its intention (JSON payload), get it pinned to Filecoin/IPFS for an eternal audit trail, and submit that proof to decentralized Lit Actions for ECDSA signing validation.

<details>
<summary><b>🔎 Proof of Implementation (Verifiable AI Code Evidence)</b></summary>

*   **Cryptographic Decision Provenance:** [`storacha-logger/src/index.ts (Line 158)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L158) — Binds the AI's string reasoning to an immutable CIDv1 hash.
*   **Threshold Safety Intervention:** [`lit-action/src/action.js (Line 210)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L210) — Lit Actions ensure the agent cannot unilaterally drain accounts; it must pass structural transaction validations.
*   **Real-World Integration:** [`ai-agent/main.py (Line 460)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L460) — The core logic bridging autonomous market evaluations with decentralized infrastructure.
*   **Accountable Autonomous Systems:** [`FlowTalosVault.cdc (Line 95)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L95) — Cadence Cross-VM capabilities wrapping EVM execution perfectly in safe, capability-based resource boundaries.
</details>

---

## 🎨 Screenshots

To provide a visual sense of the protocol's operating environment, here are structural previews of the system in action:

### 1. The Glass-Box Dashboard
*Real-time monitoring of Vault TVL, AI Daemon Terminal Status, and Agent Balance.*
![Dashboard Overview](docs/dashboard.png)

### 2. Immutable IPFS Trading Receipts
*Users can click on explicit CIDs to verify the exact NLP reasoning that triggered an execution.*
![IPFS Logs & Reasoning](docs/tradelogs.png)

---

## 🏗️ Architecture Diagram

![FlowTalos Architecture](docs/architecture.png)

*   **Top Layer:** End-user interaction strictly with the Non-Custodial Vault.
*   **Middle Layer:** Cryptographic verification pipelines (Lit Protocol Nodes + Storacha IPFS pinning).
*   **Bottom Layer:** Seamless Cross-VM Execution (Cadence to Flow EVM).

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

### 🔍 Exact Source Code Evidences per Technology

- **Flow Blockchain (Cadence)** 
  * [`FlowTalosVault.cdc (Line 19)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L19) - Vault execution interface
  * [`FlowTalosVault.cdc (Line 38)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L38) - Vault Resource Definition
  * [`FlowTalosVault.cdc (Line 60)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L60) - Public Deposit capability
  * [`FlowTalosVault.cdc (Line 75)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L75) - Admin Withdraw capability
  * [`FlowTalosVault.cdc (Line 93)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L93) - executeEVMCalls function
  * [`FlowTalosStrategyHandler.cdc (Line 45)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosStrategyHandler.cdc#L45) - AI Strategy Payload Struct
  * [`FlowTalosStrategyHandler.cdc (Line 102)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosStrategyHandler.cdc#L102) - Controller Scheduling capability
  * [`FlowTalosStrategyHandler.cdc (Line 125)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosStrategyHandler.cdc#L125) - executeStrategy execution path
  * [`InitVaultAndHandler.cdc (Line 25)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/transactions/InitVaultAndHandler.cdc#L25) - Network Deployment Script
  * [`setup_vault.cdc (Line 15)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/transactions/setup_vault.cdc#L15) - End-User Genesis Setup TX

- **Flow EVM Cross-VM**
  * [`ai-agent/main.py (Line 150)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L150) - Calldata EVM parameter initialization
  * [`ai-agent/main.py (Line 365)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L365) - EVM Calldata Generation Engine
  * [`ai-agent/main.py (Line 382)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L382) - Uniswap V2 Router ABI Hex formatting
  * [`ai-agent/main.py (Line 387)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L387) - ABI Encoding swapExactTokensForTokens
  * [`FlowTalosVault.cdc (Line 29)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L29) - Native Flow EVM library import
  * [`FlowTalosVault.cdc (Line 95)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L95) - COA bridging isolation wrapper
  * [`FlowTalosVault.cdc (Line 103)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L103) - Direct EVM layer call invocation
  * [`FlowTalosVault.cdc (Line 112)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L112) - EVM execution response result handling
  * [`FlowTalosVault.cdc (Line 120)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L120) - EVM Gas limit algorithmic definitions
  * [`FlowTalosVault.cdc (Line 135)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L135) - EVM Token structural bridging logic

- **Lit Protocol**
  * [`lit-action/src/action.js (Line 15)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L15) - PKP Threshold network validation logic
  * [`lit-action/src/action.js (Line 43)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L43) - Lit PKP Public Key validation check
  * [`lit-action/src/action.js (Line 49)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L49) - Invalid amount validation halt
  * [`lit-action/src/action.js (Line 74)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L74) - Unauthorized DEX router validation
  * [`lit-action/src/action.js (Line 126)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L126) - Flow transaction signer wrapper
  * [`lit-action/src/action.js (Line 146)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L146) - Cadence scheduler auth payload
  * [`lit-action/src/action.js (Line 210)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L210) - LitActions.signEcdsa() network invocation
  * [`lit-action/src/action.js (Line 223)`](https://github.com/IrrhammCode/FlowTalos/blob/main/lit-action/src/action.js#L223) - Payload valid Signature Response Handler
  * [`ai-agent/main.py (Line 529)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L529) - Python JS Lit Node RPC Trigger
  * [`ai-agent/main.py (Line 560)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L560) - Lit Protocol Node Offline Fallback Hashing

- **Storacha / IPFS**
  * [`storacha-logger/src/index.ts (Line 49)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L49) - IPFS Node Pinning metadata logging
  * [`storacha-logger/src/index.ts (Line 54)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L54) - Storacha Client Connection Initialization
  * [`storacha-logger/src/index.ts (Line 70)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L70) - Web3.Storage Filecoin Directory Payload Upload
  * [`storacha-logger/src/index.ts (Line 77)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L77) - IPFS Network failure fallback computation trigger
  * [`storacha-logger/src/index.ts (Line 104)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L104) - Valid CIDv1 Fallback Generation via manual SHA256
  * [`storacha-logger/src/index.ts (Line 140)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L140) - Storacha Developer Credentials validation checking
  * [`storacha-logger/src/index.ts (Line 158)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L158) - Full Storacha Web3 Storage API submission handler
  * [`ai-agent/main.py (Line 395)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L395) - Python local Base32 CID formulation algorithm
  * [`ai-agent/main.py (Line 415)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L415) - Simulated Web3.Storage handler execution
  * [`ai-agent/main.py (Line 460)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L460) - Async Python to Node.js Storacha RPC Subprocess Trigger

- **Next.js**
  * [`web/src/app/page.tsx (Line 45)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/page.tsx#L45) - Glass-Box UI Connection Hook State Management
  * [`web/src/app/page.tsx (Line 88)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/page.tsx#L88) - Flow FCL Wallet Authentication and Discovery
  * [`web/src/app/dashboard/page.tsx (Line 120)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L120) - Live FlowTalos Vault Cadence Balance Fetching
  * [`web/src/app/dashboard/page.tsx (Line 155)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L155) - Smart Contract Deposit/Withdraw interaction logic
  * [`web/src/app/dashboard/page.tsx (Line 185)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L185) - 3-Second Auto-Polling Hook syncing with AI Daemon
  * [`web/src/app/dashboard/page.tsx (Line 230)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L230) - TVL Metrics and Strategy Allocation Display UI
  * [`web/src/app/dashboard/page.tsx (Line 275)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L275) - Trade Log History map looping rendering
  * [`web/src/app/dashboard/page.tsx (Line 302)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L302) - Read-only IPFS Audit Log Hash verification Table
  * [`web/src/app/dashboard/page.tsx (Line 315)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/dashboard/page.tsx#L315) - IPFS URL Gateway dynamic CID hyperlink generation
  * [`web/src/app/layout.tsx (Line 20)`](https://github.com/IrrhammCode/FlowTalos/blob/main/web/src/app/layout.tsx#L20) - Next.js App Router Root Layout and global font CSS

- **AI Engine (Python/CoinGecko/CryptoCompare)**
  * [`ai-agent/main.py (Line 74)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L74) - API URL Injection Protection via Coingecko Symbol whitelist
  * [`ai-agent/main.py (Line 93)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L93) - fetch_market_data Method and quantitative modeling
  * [`ai-agent/main.py (Line 113)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L113) - CoinGecko Simple Price V3 invocation and parsing
  * [`ai-agent/main.py (Line 131)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L131) - Mathematical 24H Price Volume/Drop heuristic calculation
  * [`ai-agent/main.py (Line 192)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L192) - fetch_news_sentiment core qualitative categorization
  * [`ai-agent/main.py (Line 207)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L207) - CryptoCompare V2 Article Fetch JSON serialization
  * [`ai-agent/main.py (Line 227)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L227) - Primitive NLP Textual mapping for Fear/Greed sentiment
  * [`ai-agent/main.py (Line 263)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L263) - Optional X API V2 Recent Search parameter request
  * [`ai-agent/main.py (Line 292)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L292) - The actual Core Dual-Signal Matrix Loop implementation
  * [`ai-agent/main.py (Line 719)`](https://github.com/IrrhammCode/FlowTalos/blob/main/ai-agent/main.py#L719) - Autonomous Trade Object Initiation and scheduling state

---

## 🏆 Hackathon Tracks & Bounties

FlowTalos is proudly built for the **PL_Genesis: Frontiers of Collaboration Hackathon**, strategically targeting the following ecosystem tracks and specific bounties:

### Core Ecosystem Tracks
1. **Flow Blockchain Track:** Demonstrating advanced Cross-VM execution utilizing **Cadence-Owned-Accounts (COA)** to merge the security of pristine Cadence with the massive liquidity of Flow EVM.
2. **Lit Protocol Track:** Innovating beyond basic encryption by employing **Threshold Cryptography (PKP)** securely isolated from human custody, preventing Centralized AI manipulation.
3. **Storacha (Filecoin/IPFS) Track:** Replacing typical ephemeral off-chain AI reasoning with **Permanent Verifiable Audit Logs**, pushing JSON metadata directly to Filecoin/IPFS for absolute decentralized dispute resolution.

### Targeted Bounty
- 💰 **AI & Robotics (Verifiable AI):** Selected as our primary bounty focus. FlowTalos is an exact match for the "Verifiable AI" requirement: *Agents with cryptographic proof of reasoning and decision provenance*. Every single trading decision made by the Synapse AI is cryptographically hashed and pinned to Storacha (IPFS) *before* the Lit Protocol threshold signature is granted. This provides an undeniable, decentralized "receipt" and audit trail of the agent's exact thought parameters natively on-chain.

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

## 💼 Core Use Cases

FlowTalos is designed as fundamental infrastructure, enabling massive real-world applications:

- 🤖 **Autonomous Portfolio Management:** Users let the AI intelligently rebalance assets 24/7.
- 📈 **DeFi Hedge Fund Automation:** Institutional capital pools governed purely by mathematical models.
- 🔍 **Transparent Algorithmic Trading:** Stop trusting opaque Telegram bots; verify every execution hash.
- 🛡️ **Trustless Yield Generation:** Eliminate human intermediary risk and centralized exchange custodial failures.
- 🏛️ **DAO-Governed AI Vaults:** Communities vote to upgrade AI parameters while funds remain totally decentralized.

---

## 🔭 Future Vision

While the MVP demonstrates functional EVM bridging and reasoning proofs, the ultimate roadmap for FlowTalos includes:

- 🕸️ **Multi-Agent Trading Networks:** Multiple specialized AIs debating market conditions before executing a combined threshold trade.
- 🛒 **AI Strategy Marketplaces:** Permitting independent quantitative researchers to inject custom proprietary AI models natively into the platform.
- 🧮 **zk-Proof AI Verification:** Advancing from IPFS storage to zero-knowledge proofs mathematically guaranteeing the AI model was run correctly.
- 🛣️ **Cross-Chain Liquidity Routing:** Expanding the Cadence-Owned-Account boundary to route liquidity across Ethereum and Base natively.

---

## 🗺️ Roadmap

- **Phase 1 — Hackathon MVP:** Core FlowTalos Cadence bridging routing testnets and establishing structural viability.
- **Phase 2 — Mainnet deployment:** Full smart-contract audits and real-world capital deployment integrations on Flow Network.
- **Phase 3 — DAO governance:** Transfer of capability limits and AI-algorithm modification governance to a community DAO.
- **Phase 4 — Strategy marketplace:** Permitting independent quantitative researchers to inject hyper-specific AI models natively into the platform ecosystem.

---

## 📚 Documentation Links

For deep-dive technical explorations, architecture logic, and future economic designs, please review our comprehensive documentation matrix:

- 📄 **[Whitepaper (Coming Soon)](#)** — Protocol tokenomics and advanced agent theory.
- ⛓️ **[Smart Contract Docs](cadence/README.md)** — Capability scoping and Cross-VM implementations.
- 🧠 **[Architecture Docs](ai-agent/README.md)** — Python AI Daemon system configurations.

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
