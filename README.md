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

## 🌐 The Flow EVM / Cadence Synergy
FlowTalos uniquely bridges both runtimes available on Flow. 
The Vaults and Scheduling logic live in **Cadence** (providing strong security boundaries, capability-based access control, and native chronological scheduling). 
The executed DeFi strategies (AMM Swaps, liquidity provisioning) happen dynamically in the **Flow EVM** space via Cadence-Owned Accounts (COA), allowing the AI to tap into standard Solidity ABIs seamlessly.
