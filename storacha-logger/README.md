# 🗄️ FlowTalos Storacha IPFS Logger

> **The Ledger** — Creates immutable, content-addressed proofs of the AI Agent's reasoning by computing IPFS CIDs and optionally pinning them to the Storacha network.

---

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────┐
│                   Storacha IPFS Logger                         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Python AI Agent                                              │
│       │                                                       │
│       ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  index.ts                                               │  │
│  │  ──────────                                             │  │
│  │  1. Read JSON file from CLI argument                    │  │
│  │  2. Validate JSON structure                             │  │
│  │  3. Attempt Storacha upload (if credentials present)    │  │
│  │  4. Fall back to local CID computation (SHA-256)        │  │
│  │  5. Output CID via __CID_OUTPUT__:<cid> protocol        │  │
│  └─────────────────────────────────────────────────────────┘  │
│       │                                                       │
│       ▼                                                       │
│  __CID_OUTPUT__:<cid>  →  Parsed by Python subprocess         │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
storacha-logger/
├── src/
│   └── index.ts            # Main entry point — CID computation + Storacha upload
├── package.json            # Node.js dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## How It Works

### The Glass-Box Audit Trail

When the AI Agent makes a trading decision, it generates a JSON reasoning log:

```json
{
  "app": "FlowTalos Glass-Box Agent",
  "timestamp": "2026-03-11T04:30:00.000Z",
  "reasoning": "{\"action\":\"BUY\",\"token\":\"FLOW\",\"amount\":100,\"reasoning\":\"RSI oversold...\"}"
}
```

This module computes a **unique, deterministic CID** (Content Identifier) for that log using the same SHA-256 algorithm that IPFS uses. The CID is then:
1. Embedded in the on-chain Cadence transaction (`StrategyExecuted` event)
2. Displayed on the dashboard as a verifiable "Trust Proof"
3. Optionally pinned to Storacha/Filecoin for permanent public access

### 3-Tier Fallback Strategy

The logger **never crashes** — it always produces a valid CID:

| Tier | Mechanism | When Used |
|---|---|---|
| **Tier 1** | Full Storacha upload | Credentials configured, network available |
| **Tier 2** | Local SHA-256 CIDv1 | No credentials or upload failure |
| **Tier 3** | Emergency `crypto.createHash` | CID library itself fails |

### Communication Protocol

The Python AI Agent communicates with this module via subprocess stdout parsing:

```
__CID_OUTPUT__:bafybeig...
```

This marker-based protocol ensures reliable CID extraction even when the module produces verbose logging output.

## Security Measures

| Protection | Implementation |
|---|---|
| Path Traversal Prevention | `path.resolve()` + `isAbsolute()` + reject `..` |
| File Size Limit | Max 10MB before `readFileSync()` |
| JSON Validation | Validates input is parseable JSON before processing |
| Type-Safe Errors | All `catch` blocks use `unknown` type with `instanceof` |
| Graceful Degradation | Never calls `process.exit(1)` in the upload path |

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm

### Installation

```bash
cd storacha-logger
npm install
```

### Usage (via Python AI Agent)

The Storacha Logger is typically invoked by the Python AI Agent as a subprocess:

```bash
npx ts-node src/index.ts /path/to/reasoning.json
```

### Manual Test

```bash
echo '{"action":"BUY","token":"FLOW","amount":100}' > /tmp/test.json
npx ts-node src/index.ts /tmp/test.json
```

Expected output:
```
⚠ [Storacha] No credentials found. Computing real content-addressed CID locally...
[✔] Real Content-Addressed CID: bafkreig...
__CID_OUTPUT__:bafkreig...
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `STORACHA_EMAIL_ADDRESS` | Optional | Storacha account email for full IPFS upload |
| `STORACHA_SPACE_DID` | Optional | Storacha space DID for directory targeting |

Without these variables, the module operates in **local CID mode** — computing deterministic CIDs without uploading to the network.

## Tech Stack

| Technology | Purpose |
|---|---|
| TypeScript | Type-safe Node.js execution |
| `@web3-storage/w3up-client` | Storacha network client |
| `multiformats` | CIDv1 computation (SHA-256 + raw codec) |
| `dotenv` | Environment variable loading |
| `ts-node` | Direct TypeScript execution |
