# 🗄️ FlowTalos Storacha IPFS Logger

> **The Ledger** — Creates immutable, content-addressed cryptographic proofs of the AI Agent's thought processes, pinning metadata arrays persistently to the decentralized Storacha network.

[![Storacha](https://img.shields.io/badge/Storage-Storacha_Network-blue?style=for-the-badge)](#)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![IPFS](https://img.shields.io/badge/Protocol-IPFS_CIDv1-1BB9A6?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 The Role of the Logger (5W1H)

- **What:** A TypeScript Node.js dependency layer exclusively responsible for calculating Base32 CIDv1 IPFS hashes from exact JSON objects.
- **Why:** To permanently bridge "Off-chain AI reasoning" into "On-chain auditability." By hashing the stringified thought matrices, we guarantee no one (not even the protocol creators) can alter the historical context surrounding a trade.
- **Who:** Secures protocol governance users tracking system performance, and allows investors to understand *why* their yield increased or decreased.
- **Where:** Pinned across the distributed web via Filecoin utilizing the Storacha `@web3-storage/w3up-client`.
- **When:** Invoked asynchronously immediately *prior* to Lit Action execution. The Lit Node will outright refuse to sign the Cadence execution transaction without a valid IPFS Hash present.
- **How:** Processes the JSON dump from the AI, standardizes formatting whitespace, runs SHA-256 multiformat encodings, executes upload, and returns the structural CID via a rigorous `__CID_OUTPUT__` CLI pipeline protocol.

---

## 🏗️ Architecture Overview

```text
┌───────────────────────────────────────────────────────────────┐
│                   Storacha IPFS Logger                         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  index.ts                                               │  │
│  │  ──────────                                             │  │
│  │  1. Read JSON file from CLI argument                    │  │
│  │  2. Validate JSON strict syntax                         │  │
│  │  3. Execute W3UP Client (Storacha credential layer)     │  │
│  │  4. Handle fallbacks gracefully (Local Base32 CIDv1)    │  │
│  │  5. Export via stdout parsed protocol markers          │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Reliability & 3-Tier Fallback

The logging module natively prevents single points of failure, ensuring that even under severe network duress, a computationally identical hash is created and logged on-chain locally:

*   **Tier 1 (Normal):** Full Web3 upload using `STORACHA_EMAIL_ADDRESS` and `STORACHA_SPACE_DID`.
*   **Tier 2 (Offline mode):** Calculates deterministic `CIDv1` matching the precise Filecoin standard locally (begins with `bafkreig...`).
*   **Tier 3 (Panic mode):** Fails back to standard Node.js `crypto.createHash('sha256')` hexing to prevent execution stalling.

---

## 💻 Installation & Usage

### 1. Prerequisites
- Node.js 18+ and `npm`

### 2. Setup

```bash
cd storacha-logger
npm install
```

### 3. Usage (Subprocess Context)

The logger is meant to act as a hidden bridge layer rather than a standalone app.

```bash
echo '{"action":"BUY","token":"FLOW","amount":100}' > /tmp/test-payload.json
npx ts-node src/index.ts /tmp/test-payload.json
```

**Expected Local Deterministic Output:**
```bash
⚠ [Storacha] No credentials found. Computing real content-addressed CID locally...
[✔] Real Content-Addressed CID: bafkreig...
__CID_OUTPUT__:bafkreig...
```
