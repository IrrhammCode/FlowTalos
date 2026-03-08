# 🧠 FlowTalos AI Agent

This directory contains the core intelligence of the FlowTalos Protocol. The AI Agent acts as the brain, constantly monitoring market conditions, making trading decisions, and constructing cross-chain execution logic.

## 🏗️ Architecture Role
1. **Data Ingestion:** Monitors real-time crypto markets via the CoinGecko API.
2. **Analysis:** Runs quantitative trading heuristics (e.g., RSI, Volatility).
3. **Execution Planning:** Constructs EVM Calldata for actual DEX swaps on Flow EVM (e.g., IncrementFi, Metapier).
4. **Trust Generation:** 
    - Computes a SHA-256 CID for the reasoning log.
    - Executes the Lit Protocol Action for threshold signing of the Flow scheduling transaction.
5. **On-Chain Commitment:** Submits the signed payload to the Flow blockchain via `flow-cli`.

## 🛠️ Tech Stack
- **Python 3.9+**
- **Web3.py** (For EVM Calldata construction targeting Flow EVM)
- **Node.js Subprocesses** (To trigger Lit Actions & Storacha hashing)
- **Flow CLI** (For transaction submission)

## 🚀 How to Run Locally

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install requests eth-abi eth-utils
   ```
3. Run the Agent:
   ```bash
   python main.py
   ```

*Note: The agent expects the `lit-action` and `storacha-logger` directories to be initialized with `npm install` before running.*
