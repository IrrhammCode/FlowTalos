# ⛓️ FlowTalos Cadence Smart Contracts

> **The Settlement Layer** — Resource-oriented smart contracts deployed on Flow Testnet, managing autonomous AI strategy execution through the Forte Scheduled Transactions framework.

---

## Architecture Overview

```
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
│  │  • Timer queue          • Fee estimation                 │ │
│  │  • Priority scheduling  • Capability-based access        │ │
│  └──────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
cadence/
├── cadence/
│   ├── contracts/
│   │   ├── FlowTalosVault.cdc              # COA manager + EVM batch bridge
│   │   └── FlowTalosStrategyHandler.cdc    # Forte scheduler handler
│   └── transactions/
│       ├── InitVaultAndHandler.cdc         # One-time account setup
│       ├── ScheduleAIStrategy.cdc          # AI strategy scheduling
│       └── InitSchedulerManager.cdc        # Scheduler manager init
├── imports/                                # Flow standard library contracts
│   ├── 631e88ae7f1d7c20/                   # EVM contract
│   ├── 8c5303eaa26202d6/                   # FlowTransactionScheduler + Utils
│   └── 9a0766d93b6608b7/                   # FlowToken + FungibleToken
├── flow.json                               # Flow project configuration
└── README.md                               # This file
```

## Contracts

### FlowTalosVault.cdc
The **EVM Bridge Manager** — creates and manages a Cadence-Owned Account (COA) on Flow EVM for executing DeFi transactions.

| Feature | Description |
|---|---|
| COA Management | Automatically creates a COA during deployment |
| Batch EVM Execution | `executeEVMCalls()` processes arrays of EVM transactions |
| Atomic Batches | `mustPass=true` ensures all-or-nothing execution |
| Input Validation | Validates `to` and `data` fields on every call |
| Safe Defaults | `gasLimit` defaults to 300,000; `value` defaults to 0 |
| Idempotent Init | Safe to redeploy without panics |

### FlowTalosStrategyHandler.cdc
The **Forte Handler** — receives scheduled execution calls from the Flow Transaction Scheduler.

| Feature | Description |
|---|---|
| TransactionHandler | Conforms to `FlowTransactionScheduler.TransactionHandler` |
| Action Whitelist | Only accepts `BUY` or `SELL` actions |
| Amount Guard | Rejects trades with `amount <= 0` |
| Empty Batch Guard | Rejects strategies with no EVM calls |
| On-Chain Audit | Emits `StrategyExecuted` with IPFS proof CID |

## Transactions

### InitVaultAndHandler.cdc
One-time account setup that provisions the Strategy Handler and issues capabilities for the Forte scheduler. **Idempotent** — safe to call multiple times.

### ScheduleAIStrategy.cdc
The transaction the AI Agent signs to schedule future execution:
1. Calculates target timestamp (current block + delay)
2. Estimates FLOW token fee
3. Withdraws fees from signer's vault
4. Initializes Scheduler Manager (first-time only)
5. Resolves Handler capability
6. Schedules the job with full strategy metadata

## Security

- **Capability-Based Access Control** — Only the Forte scheduler (with `FlowTransactionScheduler.Execute` entitlement) can invoke `executeTransaction`
- **Action Whitelist** — Only `BUY` or `SELL` strings are accepted; any other action panics
- **Positive Amount Assertion** — `amount > 0.0` enforced on every execution
- **Atomic Execution** — `mustPass=true` ensures the entire EVM batch succeeds or rolls back
- **Dictionary Key Validation** — Each EVM call descriptor is validated for required fields
- **Idempotent Initialization** — Both `init()` and `InitVaultAndHandler.cdc` safely handle re-execution

## Deployment

### Prerequisites
- [Flow CLI](https://docs.onflow.org/flow-cli/) installed
- Flow Testnet account configured in `flow.json`

### Deploy to Testnet

```bash
cd cadence

# Generate keys (first time only)
flow keys generate

# Deploy all contracts
flow project deploy --network=testnet

# Initialize the vault handler (one-time)
flow transactions send cadence/transactions/InitVaultAndHandler.cdc \
  --network testnet --signer testnet-account --gas-limit 9999
```

### Verify Deployment

```bash
flow scripts execute --network=testnet \
  --code "import FlowTalosVault from 0x24c2e530f15129b7; access(all) fun main() {}"
```

## Flow Standard Library Imports

The `imports/` directory contains standard contracts referenced by configuration:

| Address | Contract | Purpose |
|---|---|---|
| `631e88ae7f1d7c20` | `EVM` | Flow EVM bridge interface |
| `8c5303eaa26202d6` | `FlowTransactionScheduler` | Forte scheduled transactions |
| `8c5303eaa26202d6` | `FlowTransactionSchedulerUtils` | Scheduler manager utilities |
| `9a0766d93b6608b7` | `FlowToken` | Native FLOW token |
| `9a0766d93b6608b7` | `FungibleToken` | Fungible token standard |
