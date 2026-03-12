# 🔐 FlowTalos Lit Protocol Action

> **The Vault Key** — Decentralized JavaScript verification constraints executed across a distributed network of validation nodes to securely generate Threshold Signatures.

[![Lit Protocol](https://img.shields.io/badge/Security-Lit_Protocol-FF6B00?style=for-the-badge)](#)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 The Role of the Lit Action (5W1H)

- **What:** An isolated JavaScript function executed simultaneously across the Lit Network (Threshold Cryptography).
- **Why:** To completely eliminate the "Hot Wallet" vulnerability. The AI Daemon does not hold the keys to user funds. Instead, it holds permission to ask the Lit Network to generate a key signature ONLY if the strategy parameters are deemed safe.
- **Who:** Guards the end-users by programmatically restricting what the off-chain Python backend can deploy onto the blockchain.
- **Where:** Deployed to and executed within the decentralized secure enclaves of the Lit Protocol Yellowstone Testnet.
- **When:** Triggered immediately after the Python AI computes a valid trading matrix and successfully pins it to Storacha.
- **How:** By intercepting the EVM payload, cryptographically compiling it into a `ScheduleAIStrategy.cdc` Cadence transaction script, adding the Flow `FLOW-V0.0-transaction` domain tag, and utilizing `LitActions.signEcdsa()` using `keccak256` hashes over a defined PKP public key.

---

## 🏗️ Architecture Overview

```text
┌──────────────────────────────────────────────────────────────┐
│                    Lit Protocol Network                       │
│                  (2/3+ Staked Node Consensus)                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐    ┌────────────────────────────────┐  │
│  │  action.js        │    │  Lit SDK Globals               │  │
│  │  ────────────────│    │  ───────────────────────────── │  │
│  │  1. Validate      │    │  • LitActions.setResponse()    │  │
│  │  2. Cadence TX    │◄───│  • LitActions.signEcdsa()      │  │
│  │  3. Domain Tag    │    │  • ethers (global)             │  │
│  │  4. keccak256     │    │  • pkpPublicKey                │  │
│  │  5. Sign          │    └────────────────────────────────┘  │
│  └──────────────────┘                                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Validation & Constraints

The `action.js` script actively protects the FlowTalos smart contracts from hallucinated or malicious AI intents.

- **Delay Bounds Constraints:** Rejects scheduling values exceeding 86,400 seconds (24 Hours max).
- **Size Bounds Constraints:** Blocks transaction strings exceeding 10,000 serialized characters.
- **Input Type Completeness:** Fails the signing procedure instantly if any of the 7 core arguments (including the IPFS reasoning `CID`) are omitted.

---

## 💻 Local Testing Simulation

For deterministic hackathon demonstration and testing, `simulateLitNode.js` fully recreates the Lit SDK environment using Node.js `AsyncFunction` sandboxing. It injects the `ethers` library and global `LitActions` mocks, providing a completely identical code execution path to mainnet Lit node validation logic.

### 1. Setup

```bash
cd lit-action
npm install
```

### 2. Manual Invocation

```bash
FLOWTALOS_SIGNAL='{"action":"BUY","token":"FLOW","amount":100,"reasoning":"RSI oversold"}' \
FLOWTALOS_ACTION_MODE=local \
node src/simulateLitNode.js
```

### 3. Test Coverage

Comprehensive Jest suites validate Cadence string generation, domain separator hashing, and ECDSA threshold response encapsulation:

```bash
npx jest
```
