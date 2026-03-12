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

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|------|------------|---------|
| Runtime | Node.js TS | Strict type-safe execution wrapper |
| Cryptography | `multiformats` / `sha2` | Official IPFS Base32 CID block generation |
| Decentralized Storage | `@web3-storage/w3up-client` | Storacha Filecoin pinning delegation |
| Interface | CLI `stdout` | Bridge payload transmission back to Python |

---

## 📂 Folder Structure

```text
storacha-logger/
├── src/
│   ├── index.ts             # Primary logic & W3UP client integration
│   └── utils.ts             # Deterministic fallback hashing functions
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # Strict TypeScript compilation rules
└── README.md                # Component documentation
```

---

## 🎨 Screenshots

To provide a visual sense of the Storacha Logger environment:

### 1. Storacha Console
*Verification of IPFS blocks dynamically pinned by the AI Daemon during local testing.*
![Storacha Dashboard](../docs/terminal.png)

---

---

## 💻 Installation & Usage

### 1. Prerequisites
- Node.js 18+ and `npm`

### 2. Environment Variables

Create `.env` at the root of the `/storacha-logger` directory.

| Variable | Description | Requirement |
|--------|-------------|-------------|
| `STORACHA_EMAIL_ADDRESS` | Registered Web3.Storage/Storacha email | Optional (For live Web3 Web IPFS pinning) |
| `STORACHA_SPACE_DID` | The unique Space DID created for this project | Optional (For live Web3 Web IPFS pinning) |

*Note: If these are omitted, the logger automatically falls back to secure local CIDv1 calculation.*

### 3. Local Setup

```bash
cd storacha-logger
npm install
```

### 4. Usage (Subprocess Context)

The logger is meant to act as a hidden bridge layer rather than a standalone app.

```bash
echo '{"action":"BUY","token":"FLOW","amount":100}' > /tmp/test-payload.json
npx ts-node src/index.ts /tmp/test-payload.json
```

---

## 🚀 Deployment

The `storacha-logger` is not deployed as a standalone persistent server. It is executed purely as a stateless script by the AI Agent daemon using `subprocess.run()`. As long as the physical server running `ai-agent/main.py` has Node.js and NPM installed within the same container, the logger will successfully build and trigger.

---

## 🆘 Troubleshooting

**1. IPFS Upload Pending / Stuck:**
- The `@web3-storage` protocol depends on external decentralized nodes. If `w3up` stalls, verify the status of the Storacha network. FlowTalos is designed to bypass this limit after 10 seconds locally.

**2. `DID parsing error`:**
- Ensure `STORACHA_SPACE_DID` correctly begins with `did:key:z...`.

**3. Mismatched Local vs Live CIDs:**
- The AI Agent requires exact whitespace serialization. Ensure the file passed to the logger is rigorously minimized JSON without trailing spaces, otherwise the SHA-256 tree root will violently shift.

---

## 📄 License

This Storacha Logger component is distributed under the **MIT License**.

Refer to the root repository `LICENSE` file for full definitions and terms.
