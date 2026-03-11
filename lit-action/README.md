# 🔐 FlowTalos Lit Protocol Action

> **The Vault Key** — Decentralized computation scripts that construct and cryptographically sign Flow Cadence transaction payloads via Lit Protocol's threshold signing network.

---

## Architecture Overview

```
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
│                                                              │
│  Local Simulation (Hackathon):                               │
│  ┌──────────────────────────────────────────────────────────┐│
│  │  simulateLitNode.js                                      ││
│  │  • Injects Lit SDK globals into Node.js                  ││
│  │  • Executes action.js via AsyncFunction                  ││
│  │  • Returns JSON to Python AI Agent via stdout            ││
│  └──────────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
lit-action/
├── src/
│   ├── action.js             # Core Lit Action — Cadence TX construction + signing
│   └── simulateLitNode.js    # Local Lit Node simulator for testing
├── test/
│   └── action.test.js        # Jest test suite — 3 tests
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## How It Works

### action.js — The Core Lit Action

This script runs inside the Lit Protocol's decentralized execution environment. It:

1. **Validates Inputs** — Type-checks all parameters (delay, action, token, amount, CID)
2. **Bounds Validation** — Rejects delays > 24 hours and payloads > 10KB
3. **Constructs Cadence Script** — Builds the full `ScheduleAIStrategy.cdc` transaction body with embedded contract imports
4. **Applies Flow Domain Tag** — Prepends the `FLOW-V0.0-transaction` domain separator (required by Flow's ECDSA verification)
5. **keccak256 Hashing** — Uses keccak256 (not SHA-256) for Lit PKP secp256k1 compatibility
6. **Threshold Signing** — Calls `LitActions.signEcdsa()` to produce a threshold ECDSA signature
7. **Returns Payload** — Sends the complete Cadence script + arguments back to the AI Agent

### simulateLitNode.js — Local Testing Harness

For the hackathon, this script recreates the Lit Node execution environment locally:

- Injects `LitActions`, `ethers`, and all global parameters
- Executes `action.js` via `AsyncFunction` (same as the real Lit runtime)
- Suppresses internal `console.log` to prevent stdout corruption
- Returns structured JSON to the Python AI Agent

## Security Measures

| Protection | Implementation |
|---|---|
| Input Type Validation | `typeof` checks on all string parameters |
| Delay Bounds | Max 86,400 seconds (24 hours) |
| Payload Size Limit | Max 10,000 characters for `transactionData` |
| Input Completeness | All 7 parameters validated before execution |
| Safe JSON Parsing | `JSON.parse` wrapped in try-catch |
| File Existence Check | Verifies `action.js` exists before reading |
| Payload Size Guard | `FLOWTALOS_SIGNAL` env capped at 50KB |
| Error Isolation | All errors return valid JSON (never crashes Python) |

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm

### Installation

```bash
cd lit-action
npm install
```

### Running Tests

```bash
npx jest
```

**Expected output:** 3 tests:
- Validates missing parameter handling (returns ERROR)
- Validates successful Cadence payload construction and signing
- Validates fallback behavior when `signEcdsa` fails

### Manual Execution

```bash
FLOWTALOS_SIGNAL='{"action":"BUY","token":"FLOW","amount":100,"evm_calldata":"0x38ed1739...","dex_router":"0x2A5A...","price_snapshot":0.67,"reasoning":"RSI oversold"}' \
FLOWTALOS_ACTION_MODE=local \
node src/simulateLitNode.js
```

## Production vs. Hackathon Mode

| Aspect | Production | Hackathon Demo |
|---|---|---|
| **Execution** | Lit Protocol Yellowstone Testnet | Local `simulateLitNode.js` |
| **PKP Key** | Minted on Lit Network | Random `crypto.randomBytes(64)` |
| **Signing** | 2/3+ node threshold consensus | Single local mock signature |
| **Security Model** | Fully decentralized | Simulated (same code path) |

The cryptographic flow is **identical** — only the execution environment differs.
