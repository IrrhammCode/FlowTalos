# 🤖 FlowTalos: Trustless AI Wealth Management Protocol

[![Hackathon: Flow The Future of Finance](https://img.shields.io/badge/Hackathon-Flow_The_Future_of_Finance-10B981?style=for-the-badge&logo=flow&logoColor=white)](https://flow.com/)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Lit Protocol](https://img.shields.io/badge/Lit_Protocol-Threshold_Crypto-purple?style=for-the-badge)](https://litprotocol.com/)
[![Storacha](https://img.shields.io/badge/Storacha-IPFS_Pinning-blue?style=for-the-badge)](https://storacha.network/)

FlowTalos is a decentralized, non-custodial asset management protocol powered by an autonomous computational intelligence agent. Built exclusively for the **Flow Evm/Cadence environment**.

It solving the specific problem of "Black Box AI Agents" in DeFi by leveraging cross-VM infrastructure alongside specialized cryptographic networks (Lit Protocol & Storacha/IPFS). FlowTalos provides a mathematically verifiable execution flow—a "Glass-Box" architecture where every decision the AI makes is logged, cryptographically signed, pinned to decentralized storage, and executed deterministically on-chain.

## 🌟 The Problem
AI agents in DeFi suffer from a massive trust deficit. 
1. **Black Box Execution:** Users surrender their funds to a smart contract, but have zero visibility into *why* the off-chain AI decided to swap tokens or rebalance liquidity at that specific exact second.
2. **Private Key Risk:** AI agents are usually granted complete control over a hot wallet holding the vault's assets, creating a massive single point of failure (centralization risk).
3. **Immutability:** The reasoning models driving the AI are ephemeral; if the AI makes a bad trade and loses funds, there is no immutable audit trail to prove malfeasance vs. market conditions.

## 💎 The FlowTalos Solution
FlowTalos fixes this by utilizing the **Flow Transaction Scheduler** pattern, where the AI does not hold funds. Instead, it acts as an unprivileged *Strategist*. Users maintain control of their Cadence Owned Accounts (COA) while simultaneously delegating scheduling rights for specific whitelisted EVM strategy actions. 

Every action the AI takes goes through our "Glass-Box" pipeline:
1. **Analyze:** AI fetches real-time market data (CoinGecko).
2. **Plan (Calldata):** AI generates the exact EVM calldata for the DEX operation (e.g. `swapExactTokensForTokens` on IncrementFi targeting the Flow EVM).
3. **Audit (Storacha):** AI compiles a JSON reasoning log explaining the *why* (market RSI, volatility), and computes an IPFS CID via the **Storacha Protocol**.
4. **Sign (Lit):** The strategy payload and the reasoning CID are sent to a Lit Protocol Action. A decentralized network validates the structure and applies a Threshold ECDSA Signature.
5. **Schedule (Flow):** The Lit-signed transaction schedules the EVM operation into the `FlowTalosStrategyHandler.cdc` contract.

## 🏗️ Repository Architecture

This mono-repo is structured to reflect the exact flow of data through the protocol:

- **`/ai-agent`** (The Brain): Python-based intelligence engine parsing market signals and constructing EVM calldata.
- **`/lit-action`** (The Vault Key): JavaScript-based Lit Node execution environment enforcing access-control and threshold signing.
- **`/storacha-logger`** (The Ledger): Node.js IPFS CID computation for decentralized reasoning storage.
- **`/cadence`** (The Settlement Layer): Smart Contracts deployed on Flow Testnet executing scheduled batch transactions natively.
- **`/web`** (The "Glass-Box" Dashboard): Next.js UI for end-users to view the verifiable cryptographic proofs of every AI agent action.

*For specific setup instructions, please see the `README.md` file inside each respective directory.*

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IrrhammCode/FlowTalos.git
   cd FlowTalos
   ```

2. **Configure your environment:**
   Copy the example environment file and fill in required API keys (e.g. WalletConnect Project ID).
   ```bash
   cp .env.example .env
   ```
   *(See `.env.example` for detailed instructions on acquiring keys for Storacha, Lit Protocol, and Flow Testnet).*

3. **Install dependencies across components:**
   ```bash
   cd web && npm install && cd ..
   cd storacha-logger && npm install && cd ..
   cd lit-action && npm install && cd ..
   cd ai-agent && python -m venv venv && source venv/bin/activate && pip install requests eth-abi eth-utils && cd ..
   ```

## 🎯 Hackathon Tracks & Technology Integrations

To assist the judges in evaluating FlowTalos, here is exactly where and how each requested technology is implemented within the codebase:

### 1. Flow Blockchain (Cadence & EVM)
FlowTalos uniquely bridges both runtimes available on Flow, utilizing the **Cadence-Owned-Account (COA)** architecture to allow a Cadence smart contract to execute transactions on the Flow EVM seamlessly.

* **Cadence (The Settlement Layer):** 
  * Location: `/cadence/contracts/FlowTalosVault.cdc` & `FlowTalosStrategyHandler.cdc`
  * Usage: We leverage the native **Flow Transaction Scheduler** pattern. The vault logic, access control (Capabilities), and scheduled execution queues live purely in Cadence. The user deposits FLOW/USDC into a Cadence vault, and schedules future AI interventions.
* **Flow EVM (The DeFi Execution Layer):**
  * Location: `/ai-agent/main.py` (`generate_evm_calldata` function)
  * Usage: The AI agent analyzes CoinGecko data and constructs raw EVM calldata targeting real EVM smart contracts (like the `swapExactTokensForTokens` ABI on IncrementFi or Metapier). The Cadence Vault then uses its COA to dispatch this EVM calldata directly to the Flow EVM.

### 2. Storacha Network (Data Storage & Audits)
* **Location:** `/storacha-logger/src/index.ts`
* **Usage:** We use the Web3.Storage / Storacha protocol to solve AI "Black Box" opacity. Whenever the Python AI Agent makes a trading decision, it generates a JSON log explaining its reasoning (e.g., RSI metrics, market volatility). This NodeJS script computes a unique Content-Addressed ID (CIDv1 via SHA-256) for that log and pins it to the decentralized Storacha network. This CID is then attached to the executed trade on the frontend, acting as an immutable cryptographic audit trail.

### 3. Lit Protocol (Threshold Cryptography / Security)
* **Location:** `/lit-action/src/action.js`
* **Usage:** We use Lit Protocol to secure the bridge between the off-chain Python AI Agent and the on-chain Flow Cadence contracts. The AI generates the scheduling payload, but instead of holding a highly vulnerable private key directly, the AI sends the payload to a Lit Action. The decentralized Lit Nodes execute the JS script, validate the Cadence code structure, and use a **Programmable Key Pair (PKP)** (ECDSA_secp256k1) to sign the transaction. Only if the signature is valid can the Flow testnet accept the AI's scheduling request.
