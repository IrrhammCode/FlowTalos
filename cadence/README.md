# ⛓️ FlowTalos Cadence Smart Contracts

> **The Settlement Layer** — Unparalleled capability-based smart contracts deployed on Flow Testnet, enabling cross-VM EVM liquidity access while isolating funds from AI manipulation.

[![Flow Blockchain](https://img.shields.io/badge/Blockchain-Flow_Cadence-10B981?style=for-the-badge&logo=flow&logoColor=white)](#)
[![Smart Contracts](https://img.shields.io/badge/Infrastructure-Smart_Contracts-black?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 The Role of the Smart Contracts (5W1H)

- **What:** The base blockchain protocol layer utilizing pure Cadence resources to handle all human user deposits and AI execution limits.
- **Why:** To guarantee Absolute Security. Cadence’s "resource-oriented" structure makes it impossible for the Python AI Agent to arbitrarily clone, destroy, or withdraw user funds.
- **Who:** Defines the boundaries for both the human **Investor** (who holds the withdrawal capability) and the **Synapse AI** (which holds scheduling capability).
- **Where:** Deployed on the **Flow Testnet**, utilizing Cross-VM imports to bridge deep liquidity from the Flow EVM ecosystem.
- **When:** Invoked asynchronously whenever the Forte Flow Transaction Scheduler dictates the epoch maturity of a validated AI trade payload.
- **How:** By separating the `Vault` (custody) and the `StrategyHandler` (execution). The Vault owns a Cadence-Owned Account (COA) explicitly capable of submitting serialized EVM calldata arrays to DEX routers safely.

---

## 🏗️ Architecture Overview

```text
┌───────────────────────────────────────────────────────────────┐
│                  Flow Blockchain (Testnet)                     │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  FlowTalosVault.cdc           FlowTalosStrategyHandler.cdc    │
│  ┌─────────────────────┐     ┌─────────────────────────────┐  │
│  │ • Creates COA        │     │ • Implements TransactionHa- │  │
│  │ • VaultManager       │◄────│   ndler interface           │  │
│  │ • executeEVMCalls()  │     │ • executeTransaction()      │  │
│  │ • Batch EVM Bridge   │     │ • Emits StrategyExecuted    │  │
│  └─────────────────────┘     └─────────────────────────────┘  │
│           ▲                            ▲                      │
│           │                            │                      │
│  InitVaultAndHandler.cdc    ScheduleAIStrategy.cdc            │
│  (One-time setup)           (AI submits strategies)           │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  Forte Scheduled Transactions (FlowTransactionScheduler) │ │
│  └──────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔐 Core Contract Modularity

### `FlowTalosVault.cdc` (The Liquidity Bridge)
The strict non-custodial EVM Bridge Manager. It holds FLOW/USDC safely inside a Cadence resource structure, preventing any AI extraction vectors.
- Manages an internal **Cadence-Owned Account (COA)** dynamically bridging funds to Flow EVM.
- Exposes `executeEVMCalls()` allowing deterministic batch processing of Solidity calldata byte-arrays against AMM Routers like IncrementFi.

### `FlowTalosStrategyHandler.cdc` (The Validation Gate)
Serves as the ultimate authority receiving queued executions from the Forte Scheduler framework.
- Evaluates specific payload variables (e.g., rejecting `AMOUNT <= 0`).
- Triggers immutable on-chain Audit tracking by emitting the `StrategyExecuted` event natively containing the IPFS `CIDv1` string representing the AI's cryptographic decision receipt.

---

## 🛡️ Uncompromised Security Implementation

- **Capability-Based Access Control:** Unlike Ethereum mappings, access is granted strictly through unforgeable Capability structs. The AI is only authorized to touch the `StrategyHandler`, inherently firewalling it away from the `VaultManager` withdrawals.
- **Action Whitelisting:** Execution entirely aborts and rolls back if an action string falls outside approved protocol constants ("BUY" / "SELL").
- **Atomic Batches:** `mustPass=true` is hardcoded across the cross-VM layer. If the Flow EVM DEX swap experiences massive slippage and fails, the native Cadence Vault transaction rolls back seamlessly without trailing state variables breaking.

---

## 💻 Quick Deployment

### 1. Prerequisites
- [Flow CLI installed](https://docs.onflow.org/flow-cli/)
- Funded account in `flow.json` mapped to the Flow Testnet

### 2. Automated Generation
```bash
cd cadence
flow keys generate
```

### 3. Deploy to Flow Testnet
```bash
# Push smart contracts to the Flow Network
flow project deploy --network=testnet

# Initialize the Vault capability mappings
flow transactions send cadence/transactions/InitVaultAndHandler.cdc \
  --network testnet --signer testnet-account --gas-limit 9999
```
