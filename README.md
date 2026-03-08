# FlowTalos: True "Glass-Box" Autonomous Yield
**Flow: The Future of Finance Hackathon Submission**

![FlowTalos Dashboard](dashboard.png) *(UI Preview)*

FlowTalos is a decentralized, AI-driven asset management protocol natively built on the Flow Blockchain. It utilizes Flow’s unique **Cross-VM (Cadence + EVM)** architecture to seamlessly bridge intelligent off-chain computation with trustless on-chain execution. 

Unlike traditional "Black-Box" trading bots, FlowTalos introduces the **"Glass-Box" paradigm**. Every single decision made by the AI Agent is cryptographically sealed, uploaded to IPFS (via Storacha), and bound to the resulting on-chain execution transaction on the Flow network.

---

## 📖 The Problem vs. The FlowTalos Solution

### The Problem
The current landscape of DeFi yield aggregation and algorithmic trading suffers from three critical flaws:
1. **Opaque Strategies ("Black-Box")**: Users cannot verify *why* a trading bot made a specific move. If a strategy loses money, it's impossible to audit the AI's reasoning at that exact timestamp.
2. **Execution Friction**: Most blockchains force users to choose between the safety of native smart contracts and the deep liquidity of EVM-compatible DEXs.
3. **Key Management Risks**: Giving an AI agent direct access to a hot wallet's private keys to execute trades is a massive security vulnerability.

### The FlowTalos Solution
1. **Glass-Box Audits**: Before any trade is executed, the AI's mathematical reasoning and data feeds are logged indelibly to IPFS/Filecoin.
2. **Cross-VM Liquidity**: By using **Cadence Owned Accounts (COAs)**, funds rest securely within native Flow `Vaults` but instantly access EVM DEXs like IncrementFi for the optimal swap routes.
3. **Threshold Security**: The AI does not hold private keys. It pings Lit Protocol Programmable Key Pairs (PKPs) to securely sign Cadence Scheduled Transactions based *only* on the verified IPFS Proof.

---

## 🏗 System Architecture Breakdown

The FlowTalos ecosystem consists of four deeply integrated modules:

### 1. The Nervous System: Impulse AI (`ai-agent/`)
*   **Engine**: Python, Web3.py, Requests
*   **Role**: Ingests live market data (CoinGecko). Computes trading geometry (RSI volatility metrics). Generates raw EVM Calldata hexadecimal arguments (`0xa90...`) required to execute the trade on a Flow EVM DEX.
*   **Outcome**: Produces a JSON file detailing the signal, calldata, and reasoning.

### 2. The Memory Bank: Storacha Logger (`storacha-logger/`)
*   **Engine**: Node.js, TypeScript, `@web3-storage/w3up-client`
*   **Role**: Subprocessed by the AI agent. It reads the JSON outcome and uploads it to the decentralized web using Filecoin/IPFS via the Storacha network.
*   **Outcome**: Returns an immutable Content Identifier (CID).

### 3. The Muscles: Flow Smart Contracts (`cadence/`)
*   **Engine**: Cadence, Flow EVM, Cross-VM
*   **Role**: Includes `FlowTalosVault.cdc` and `FlowTalosStrategyHandler.cdc`. The Vault manages user FLOW deposits securely in Cadence while spinning up a COA (Cadence Owned Account) inside the EVM state for actual asset deployment.
*   **Outcome**: Trustless execution of EVM Calldata routed through a secure Cadence gateway.

### 4. The Trigger & Interface: Next.js Dashboard (`web/`)
*   **Engine**: React, Next.js, Framer Motion, `@onflow/fcl`, Wagmi
*   **Role**: A premium command center where users deposit assets, submit queries to the AI terminal, and monitor the "Recent Trades" execution log which dynamically queries scheduled execution events and links directly to the IPFS CID proofs.

---

## 🚀 Quickstart Guide (Local Demo)

Follow these precise steps to run the complete end-to-end FlowTalos ecosystem locally for testing and judging.

### Prerequisites
*   [Flow CLI](https://developers.flow.com/tools/flow-cli/install) installed.
*   Node.js (v18+) and npm.
*   Python (3.9+) and `pip`.

### Step 1: Initialize the Flow Blockchain (Terminal 1)
Boot up the local Flow Emulator environments to simulate the network.
```bash
cd cadence
flow emulator
```

### Step 2: Deploy the Cadence Contracts (Terminal 2)
In a new terminal window, deploy `FlowTalosVault` and `FlowTalosStrategyHandler` to the running emulator.
```bash
cd cadence
flow project deploy --network emulator
```

### Step 3: Start the Next.js Glass-Box Dashboard (Terminal 3)
Boot the interactive React frontend.
```bash
cd web
npm install
npm run dev
```
Navigate to `http://localhost:3000` in your browser. Connect your wallet using the RainbowKit modal (ensure your wallet is set to the Flow Emulator network or localhost).

### Step 4: Trigger the Python AI Brain (Terminal 4)
This script simulates the cron-job executing the off-chain intelligence.
```bash
cd ai-agent
python3 -m venv venv
source venv/bin/activate
pip install requests web3
python main.py
```
> **What to watch out for:** The Python script will fetch CoinGecko data. If volatility is sufficient (or manually forced in tests), it will generate the EVM Calldata, trigger the `storacha-logger` Node script, output the IPFS `CID`, and prepare the payload for the Lit Protocol signature! 
> 
> Refresh the Dashboard and check the **Recent Trades** table to see the FCL-synced event pop up!

---

## 🛠 Technology Stack
*   **Blockchain Infrastructure**: Flow Network, Flow Emulator, Flow Client Library (FCL)
*   **Smart Contracts**: Cadence, Flow EVM
*   **Backend / AI**: Python, Web3.py
*   **Frontend**: Next.js, React, Tailwind CSS, Recharts, Framer Motion
*   **Wallet Integration**: Wagmi, RainbowKit, WalletConnect
*   **Decentralized Storage**: Storacha (IPFS/Filecoin)
*   **Key Management Architecture**: Lit Protocol (Threshold Cryptography/TEEs)

---

## 🔮 Future Capabilities
While the MVP demonstrates a robust Flow-native framework, we envision scaling FlowTalos to support:
1.  **Multi-Asset Vaults**: Enabling complex cross-chain pairs utilizing Flow's bridged USDC liquidity.
2.  **Custom Risk Engine**: Allowing power-users to deploy personal Cadence Vaults governed by specific IPFS-validation thresholds.
3.  **Governance Sub-graphs**: Allowing community votes to tune the AI's volatility parameters dynamically.

---
*Built with ❤️ for the Flow Ecosystem*
