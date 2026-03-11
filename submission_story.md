# FlowTalos: The Autonomous Glass-Box Yield Agent
**Submission for "Flow: The Future of Finance" Hackathon**

## 1. Executive Summary & Vision
**FlowTalos** is a decentralized, AI-driven asset management protocol natively built on the Flow Blockchain. It utilizes Flow’s unique **Cross-VM (Cadence + EVM)** architecture to seamlessly bridge intelligent off-chain computation with trustless on-chain execution. 

Unlike traditional "Black-Box" trading bots where users blindly deposit funds and trust an opaque algorithm, FlowTalos introduces the **"Glass-Box" paradigm**. Every single decision made by the AI Agent is cryptographically sealed, uploaded to IPFS (via Storacha), and bound to the resulting on-chain execution transaction on the Flow network.

FlowTalos allows everyday users to deploy their assets into sophisticated, AI-managed vaults that dynamically rebalance portfolios (e.g., swapping FLOW to USDC during high volatility) across deep EVM liquidity pools, all while their funds rest safely in a Cadence resource.

---

## 2. Breaking Down the Problem Space
The current landscape of DeFi yield aggregation and algorithmic trading suffers from three critical flaws:
1. **Opaque Strategies ("Black-Box")**: Users cannot verify *why* a trading bot made a specific move. If a strategy loses money, users are left in the dark. It is impossible to audit the AI's data inputs and algorithmic reasoning at the exact timestamp of execution.
2. **Execution Friction**: Most blockchains force users to choose between the safety of native smart contracts (often with limited DeFi ecosystems) and the deep liquidity of EVM-compatible DEXs (which suffer from smart contract vulnerabilities).
3. **Key Management Risks**: Giving an off-chain Python AI agent direct access to a hot wallet's private keys to execute trades on-chain is a massive, central-point-of-failure security vulnerability.

---

## 3. The FlowTalos Solution: A Four-Pillar Architecture
FlowTalos solves these problems by deeply amalgamating Flow's specific architectural advantages with decentralized infrastructure:

### Pillar I: The Nervous System (Synapse AI & IPFS Logging)
The off-chain Python backend acts as the brain. It runs continuously, ingesting live market data via CoinGecko/Pyth APIs. It computes trading geometry (e.g., RSI, fast/slow velocity metrics). 
When a trading signal is confirmed (e.g., "Oversold conditions detected: BUY FLOW"), the AI produces two critical outputs:
1. The **EVM Calldata** (ABI Hexadecimal strings) required to execute the optimal trade on a Flow EVM DEX (like IncrementFi).
2. A human-readable **Reasoning Log** (JSON) explaining exactly the mathematical parameters that led to the trade.

This Reasoning Log is immediately pushed to **Storacha (Filecoin/IPFS)**, generating an immutable, permanent Content Identifier (CID).

### Pillar II: The Muscles (Flow Cross-VM & Cadence Owned Accounts)
FlowTalos utilizes strictly-typed Cadence smart contracts (`FlowTalosVault.cdc`). Users deposit their native FLOW tokens into the Cadence Vault. 

*The Magic:* The Vault leverages Flow's **Cross-VM** capabilities to spin up a **Cadence Owned Account (COA)** inside the Flow EVM environment. This means the users' assets enjoy the strict, resource-oriented safety of Cadence natively, but the Cadence contract can instantly execute the AI's EVM Calldata to touch the deep liquidity of EVM DEXs without complex or risky cross-chain bridging.

### Pillar III: The Trigger (Lit Protocol TEEs & Flow Schedulers)
How does the AI execute the trade if it doesn't hold the Vault's private keys? 
We use **Lit Protocol** Programmable Key Pairs (PKPs) operating inside Trusted Execution Environments (TEEs). The AI simple pings the Lit Action API. The Lit Action JS script fetches and verifies the IPFS CID, wraps the AI's EVM Calldata, and securely signs a Flow `ScheduleAIStrategy.cdc` transaction. The Cadence Vault verifies this signature and trustlessly queues the transaction via the `FlowTalosStrategyHandler`.

### Pillar IV: The Interface (Glass-Box Dashboard)
We built a premium Next.js dashboard mimicking a high-end quant terminal. Users can:
*   Deposit funds via FCL seamlessly.
*   Interact with the AI terminal.
*   View **Execution Audits**: A live-syncing FCL table showing every executed trade, complete with a direct link to the IPFS CID, opening the "Glass Box" for anyone to read the AI's reasoning.

---

## 4. How We Addressed the Judging Criteria

*   **Technological Implementation & Flow Utilization**: FlowTalos is built *explicitly* to showcase Flow's recent Cross-VM update. It demonstrates how a Cadence contract can manage a COA inside the EVM to route trades securely. We heavily utilized `@onflow/fcl` and Cadence resource capabilities.
*   **Design and UX**: The dashboard is built with Next.js, Framer Motion, and TailwindCSS. It features a custom "Glass-Morphism" aesthetic, sleek typography (Inter), responsive design, and an integrated Web3 Terminal that feels like a premium traditional finance (TradFi) product.
*   **Potential Impact**: FlowTalos introduces the concept of "Auditable AI DeFi." As AI agents become standard in Web3, the ability to permanently tie a smart contract execution to an immutable IPFS log of the exact Prompt/Reasoning will become the gold standard for user trust.
*   **Originality/Creativity**: While Yield Aggregators exist, tying off-chain Python Deep Learning inferences, Lit Protocol TEEs, Filecoin IPFS logs, and Flow Cross-VM executions into a single closed-loop architecture is a highly original synthesis of cutting-edge technologies.

---

## 5. Technology Stack Summary
*   **Blockchain**: Flow Network, Flow Emulator, Cadence Smart Contracts (`FlowTalosVault.cdc`, `FlowTransactionScheduler`), Flow EVM (COAs), `@onflow/fcl`
*   **AI Backend**: Python `3.9`, `requests`, `web3.py` (ABI Calldata Generation)
*   **Frontend**: Next.js (React), TailwindCSS, Recharts, Framer Motion
*   **Wallet Connectivity**: Wagmi, RainbowKit, WalletConnect
*   **Decentralized Storage**: Storacha (`@web3-storage/w3up-client`), IPFS, Filecoin
*   **Secure Execution**: Lit Protocol Actions (Threshold Cryptography JavaScript Node)

---

## 6. Future Roadmap
1.  **Multi-Asset Strategies**: Expanding the vault to accept stablecoins (e.g., bridging USDC to Flow via Axelar) to act as a flight-to-safety asset during bearish AI signaling.
2.  **Custom Risk Params**: Allowing users to spin up their own `FlowTalosVault` instances with customized AI risk parameters (e.g., "Only execute if the IPFS reasoning confidence score is > 95%").
3.  **Community Governance Sub-graphs**: Allowing token-holder votes to dynamically alter the volatility thresholds the Python AI uses to make decisions.

***Empowering the Next Generation of Autonomous On-Chain Finance***
