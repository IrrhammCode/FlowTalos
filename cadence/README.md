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

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|------|------------|---------|
| Smart Contracts | Flow Cadence | Secure Vault and capability management |
| Cross-VM Execution | Cadence EVM Bridge | Transaction execution against Ethereum/Solidity DEXs |
| Tooling | Flow CLI | Contract compilation, testing, and deployment |
| Automation | Forte Scheduler | Autonomously triggered execution queues |

---

## 📂 Folder Structure

```text
cadence/
├── contracts/                   # Core protocol logic
│   ├── FlowTalosVault.cdc       # Fund custody & EVM Bridge
│   └── FlowTalosStrategy.cdc    # Validation & Payload Gate
├── transactions/                # Client execution scripts
│   ├── InitVault.cdc            # Account capability bootstrapping
│   └── ScheduleAI.cdc           # Forte Scheduler payload injection
├── scripts/                     # Read-only chain state queries
│   └── GetVaultBalance.cdc      # Returns live portfolio metrics
└── flow.json                    # Flow CLI network configuration
```

---

## 🎨 Screenshots

To provide a visual sense of the Smart Contract operating environment:

### 1. On-Chain Ledger Proofs
*Flow testnet explorer demonstrating immutable CIDv1 execution hashes embedded directly into the blockchain event log.*
![On-chain Events](../docs/tradelogs.png)

---

## 🛡️ Uncompromised Security Implementation

- **Capability-Based Access Control:** Unlike Ethereum mappings, access is granted strictly through unforgeable Capability structs. The AI is only authorized to touch the `StrategyHandler`, inherently firewalling it away from the `VaultManager` withdrawals.
- **Action Whitelisting:** Execution entirely aborts and rolls back if an action string falls outside approved protocol constants ("BUY" / "SELL").
- **Atomic Batches:** `mustPass=true` is hardcoded across the cross-VM layer. If the Flow EVM DEX swap experiences massive slippage and fails, the native Cadence Vault transaction rolls back seamlessly without trailing state variables breaking.

---

## 💻 Installation & Usage

### 1. Prerequisites
- [Flow CLI installed](https://docs.onflow.org/flow-cli/) v3.0+
- A funded Flow Testnet Account

### 2. Environment Variables

While Cadence naturally relies on `flow.json`, you must configure the following key-pairs to interact with the Forte Scheduler locally:

| Variable | Description | Requirement |
|--------|-------------|-------------|
| `testnet-account` (in flow.json) | The exact deployment and signing account address | **Required** |
| Private Key | The ECDSA key matching the `testnet-account` | **Required** |

### 3. Local Setup

```bash
cd cadence
flow keys generate
```

---

## 🚀 Deployment

The protocol utilizes Flow CLI to manage network deployments.

**Deploy to Flow Testnet:**
```bash
flow project deploy --network=testnet
```

**Initialize Capabilities (One-time Setup):**
```bash
flow transactions send cadence/transactions/InitVaultAndHandler.cdc \
  --network testnet --signer testnet-account --gas-limit 9999
```

---

## 🆘 Troubleshooting

**1. Cross-VM Bridge Failures (Execution Reverted):**
- If an EVM call fails (e.g., insufficient liquidity or extreme slippage on IncrementFi), the *entire* Cadence wrapper effectively rolls back to defend state integrity. Check your `mustPass` flag boolean inside `executeEVMCalls`.

**2. Missing Capability Errors:**
- Attempting to schedule a Forte transaction will fail abruptly if the `StrategyHandler` capability was never linked to the `/public/` path. Re-run `InitVaultAndHandler.cdc`.

**3. Flow CLI Network Timeout:**
- Standard testnet RPC congestion. Try appending `--gas-limit 9999` to ensure the complex batch transaction isn't reverting due to computation limits.

---

## 📄 License

This Cadence Smart Contract component is distributed under the **MIT License**.

Refer to the root repository `LICENSE` file for full definitions and terms.
