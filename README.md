<p align="center">
  <img src="./assets/logo.png" alt="FlowTalos Logo" width="150" />
</p>

# FlowTalos: Decentralized AI Wealth Management Protocol

[![Hackathon: Flow The Future of Finance](https://img.shields.io/badge/Hackathon-Flow_The_Future_of_Finance-10B981?style=for-the-badge&logo=flow&logoColor=white)](https://flow.com/)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Lit Protocol](https://img.shields.io/badge/Lit_Protocol-Threshold_Crypto-purple?style=for-the-badge)](https://litprotocol.com/)
[![Storacha](https://img.shields.io/badge/Storacha-IPFS_Pinning-blue?style=for-the-badge)](https://storacha.network/)

FlowTalos is a decentralized, non-custodial asset management protocol driven by an autonomous computational intelligence agent, specifically engineered for the Flow blockchain network. 

<p align="center">
  <img src="./assets/illustration.png" alt="FlowTalos Dashboard Illustration" width="800" />
</p>

---

## The Vision and Architecture

The decentralized finance landscape currently suffers from a massive trust deficit regarding autonomous agents. Investors surrender their assets to black-box models with zero visibility into the reasoning behind executing trades. Furthermore, granting artificial intelligence complete control over a single hot wallet introduces unacceptable centralization risks.

FlowTalos resolves this by executing a "Glass-Box" architecture. The artificial intelligence does not hold the vault's assets. Instead, it acts purely as a cryptographic strategist. Users maintain absolute control of their funds within native Cadence smart contracts, delegating only the power to schedule specific, time-locked trades to the reasoning engine. 

Every single mathematical calculation and qualitative decision made by the intelligence agent is cryptographically logged, pinned to decentralized storage, validated by a threshold network, and scheduled deterministically on the Flow blockchain.

---

## Technology Integrations

FlowTalos coordinates multiple advanced Web3 protocols to achieve fully trustless automation. The following sections detail each technology integrated within the application, providing exact source code references to demonstrate their implementation.

### 1. Flow Blockchain (Cadence)
FlowTalos utilizes Cadence for its robust, resource-oriented security model. The primary vault contract securely holds human-deposited funds and enforces capability-based access control, ensuring the scheduled artificial intelligence can only trigger whitelisted operations, never direct withdrawals.
* **Location:** [`cadence/cadence/contracts/FlowTalosVault.cdc (Line 93)`](./cadence/cadence/contracts/FlowTalosVault.cdc#L93)
* **Function:** Defines `executeEVMCalls()`, the bridge interface that processes the AI's trading payload.

### 2. Flow EVM
To tap into the robust liquidity pools available on Flow, the Cadence smart contract utilizes a Cadence-Owned Account (COA) to natively cross the virtual machine boundary. This allows the system to bridge Cadence security with EVM-based Automated Market Makers (such as IncrementFi).
* **Location:** [`ai-agent/main.py (Line 387)`](./ai-agent/main.py#L387)
* **Function:** The `generate_evm_calldata` construct defines the raw bytecode payload (`evm_calldata`) that Flow EVM will natively parse to execute the swap on decentralized exchanges.

### 3. Storacha Network (IPFS)
To eliminate the "Black-Box" problem, the reasoning matrix generates a comprehensive JSON log detailing exactly why a trade was selected (e.g., specific market metrics, technical indicators). This log is hashed into a Content-Addressed ID (CIDv1) and pinned directly to the Storacha decentralized storage layer, creating a mathematically immutable audit trail.
* **Location:** [`storacha-logger/src/index.ts (Line 59)`](./storacha-logger/src/index.ts#L59)
* **Function:** Invokes the `uploadDirectory` function to pin the AI's reasoning document permanently to Web3.Storage.

### 4. Lit Protocol
Granting an autonomous script direct access to a private key invites critical vulnerabilities. Instead, FlowTalos employs Lit Protocol's threshold cryptography sandbox. A decentralized network of Lit nodes executes a JavaScript validation script to inspect the proposed trade. If the trade meets all safety parameters, the network collaboratively signs the transaction using a Programmable Key Pair (PKP).
* **Location:** [`lit-action/src/action.ts (Line 18)`](./lit-action/src/action.ts#L18)
* **Function:** Evaluates the `scheduleAIStrategy()` Cadence payload and calls `Lit.Actions.signEcdsa()` to generate a decentralized signature.

### 5. Next.js (Web Dashboard)
To provide investors with maximum transparency, the frontend interface is engineered using Next.js. It acts as the interactive "Glass-Box", reading the on-chain data and the Storacha IPFS proofs to display real-time execution logs and portfolio growth.
* **Location:** [`web/src/app/dashboard/page.tsx (Line 302)`](./web/src/app/dashboard/page.tsx#L302)
* **Function:** Utilizes a `useEffect` polling mechanism to stream the live execution status and cryptographic proofs directly to the end user.

### 6. Synapse AI Engine (Python)
The intelligence core of FlowTalos is a multi-threaded Python daemon. It continuously scans market geometry to formulate independent trading signals.
* **Location:** [`ai-agent/main.py (Line 292)`](./ai-agent/main.py#L292)
* **Function:** The `synapse_ai_analyze()` function correlates quantitative technicals (price drops, overbought metrics) with qualitative sentiment before formulating an execution directive.

### 7. CoinGecko API
Real-time quantitative analysis requires highly accurate pricing feeds. The intelligence agent queries CoinGecko endpoints to measure immediate token price volatility and derive internal relative strength metrics.
* **Location:** [`ai-agent/main.py (Line 161)`](./ai-agent/main.py#L161)
* **Function:** The `fetch_market_data()` function parses the JSON response from CoinGecko to establish the baseline quantitative signal.

### 8. CryptoCompare & X (Twitter) APIs
For the qualitative branch of the dual-signal strategy, the agent aggregates real-time news headlines and global social media posts. The content is algorithmically evaluated to classify the current global market sentiment as positive, neutral, or negative.
* **Location:** [`ai-agent/main.py (Line 192)`](./ai-agent/main.py#L192)
* **Function:** The `fetch_news_sentiment()` function requests the latest encrypted market updates from CryptoCompare to complete the fundamental alignment phase of the intelligence matrix.

---

## Usage Initialization

This repository is structured sequentially to reflect the flow of data through the protocol. To initialize the environment locally:

1. Copy the environment templates and insert the required identifiers.
2. Ensure the Flow Protocol CLI is properly configured for the Testnet environment.
3. Activate the Next.js graphical interface:
   ```bash
   cd web
   npm install
   npm run dev
   ```
4. Initiate the Python intelligence loop:
   ```bash
   cd ai-agent
   python3 main.py --daemon
   ```
