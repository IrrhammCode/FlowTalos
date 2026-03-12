# 🗄️ FlowTalos Storacha IPFS Logger

> **The Ledger** — Creates immutable, content-addressed cryptographic proofs of the AI Agent's thought processes, pinning metadata arrays persistently to the decentralized Storacha network.

[![Storacha](https://img.shields.io/badge/Storage-Storacha_Network-blue?style=for-the-badge)](#)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![IPFS](https://img.shields.io/badge/Protocol-IPFS_CIDv1-1BB9A6?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌍 Operational Context & Protocol Role

The Storacha IPFS Logger acts as the immutable ledger linking "Off-chain AI reasoning" directly to "On-chain auditability." To permanently solve the black-box nature of AI-managed funds, this TypeScript-based module is invoked by the Python Daemon the exact moment a trading decision is reached. Its sole mandate is to ingest the AI's stringified JSON thought matrix, standardize its spacing, and execute strict SHA-256 multiformat encodings.

By calculating a rigorous Base32 CIDv1 IPFS hash and uploading the payload directly to the Filecoin network via the Storacha `@web3-storage/w3up-client`, the module provides undeniable cryptographic proof of the agent's intent. This occurs strictly *prior* to Lit Action execution—meaning the Lit Node will outright refuse to threshold-sign any Cadence transaction that lacks this verifiable IPFS hash. Ultimately, this guarantees that neither the protocol creators nor malicious actors can retroactively alter the historical context or reasoning parameters associated with a decentralized trade.

<details open>
<summary><b>🔎 Proof of Implementation (Storacha Code Evidence)</b></summary>

*   **Immutable CIDv1 Compilation:** [`src/index.ts (Line 32)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L32) — Logic that binds the raw AI reasoning payload string directly into the SHA-256 IPFS block encoding.
*   **Web3 Storage Pinning Integration:** [`src/index.ts (Line 46)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L46) — Seamless invocation of the W3UP Client establishing space delegations and returning explicit network CIDs.
*   **Deterministic Offline Failovers:** [`src/index.ts (Line 79)`](https://github.com/IrrhammCode/FlowTalos/blob/main/storacha-logger/src/index.ts#L79) — The graceful degradation path that computes mathematically identical Base32 CIDs locally in the event of Storacha credentials missing.
</details>

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
