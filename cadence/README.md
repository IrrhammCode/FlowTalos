# ⛓️ FlowTalos Cadence Smart Contracts

> **The Settlement Layer** — Unparalleled capability-based smart contracts deployed on Flow Testnet, enabling cross-VM EVM liquidity access while isolating funds from AI manipulation.

[![Flow Blockchain](https://img.shields.io/badge/Blockchain-Flow_Cadence-10B981?style=for-the-badge&logo=flow&logoColor=white)](#)
[![Smart Contracts](https://img.shields.io/badge/Infrastructure-Smart_Contracts-black?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 Operational Context & Protocol Role

The FlowTalos Cadence Smart Contracts act as the foundational base layer of the protocol, explicitly engineered to enforce absolute security through Flow's unique resource-oriented paradigm. By establishing strict boundaries, these contracts ensure that the off-chain Python AI Agent cannot arbitrarily clone, withdraw, or compromise user deposits under any circumstance. 

Deployed securely on the Flow Testnet, the protocol elegantly separates custody from execution. The `FlowTalosVault` holds the human investor's funds and manages a Cadence-Owned Account (COA) for cross-VM interactions, while the `FlowTalosStrategyHandler` acts as the execution gatekeeper. This architecture evaluates payloads verified by the Forte Flow Transaction Scheduler and delegates mathematically precise batch transactions into Flow EVM. This guarantees that liquidity is sourced from deep EVM AMMs dynamically while native Cadence resources safely handle the ultimate settlement.

<details open>
<summary><b>🔎 Proof of Implementation (Cadence Code Evidence)</b></summary>

*   **Cross-VM Evm Bridge:** [`cadence/contracts/FlowTalosVault.cdc (Line 95)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosVault.cdc#L95) — Demonstrates the COA invoking `executeEVMCalls()` directly against EVM AMMs.
*   **Execution Handler Gate:** [`cadence/contracts/FlowTalosStrategyHandler.cdc (Line 42)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosStrategyHandler.cdc#L42) — Shows the capability-restricted execution block rejecting zero-amount arrays.
*   **Immutable On-Chain Proof:** [`cadence/contracts/FlowTalosStrategyHandler.cdc (Line 60)`](https://github.com/IrrhammCode/FlowTalos/blob/main/cadence/cadence/contracts/FlowTalosStrategyHandler.cdc#L60) — The `StrategyExecuted` event permanently recording the IPFS `CIDv1` reasoning receipt onto the Flow ledger.
</details>

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
