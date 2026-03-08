# 🔐 Lit Protocol Action

This directory contains the decentralized computation script (Lit Action) that acts as the cryptographic bridge between the off-chain AI Agent and the on-chain Flow ecosystem.

## 🏗️ Architecture Role
Instead of giving the AI agent a raw private key (which is a massive security risk), the agent simply generates a strategy (Calldata + Delay) and sends it to the Lit Protocol Network.

1. **Validation:** The Lit Nodes execute `action.js`.
2. **Construction:** The script reconstructs the exact Cadence payload for `ScheduleAIStrategy.cdc`.
3. **Threshold Signing:** If valid, the nodes use a Programmable Key Pair (PKP) to sign the transaction using ECDSA_secp256k1 (compatible with Flow).
4. **Return:** The aggregated signature is returned to the agent for submission.

This ensures the AI can *only* schedule transactions matching the predefined Cadence script, acting as a powerful security sandbox.

## 🚀 Setup

```bash
cd lit-action
npm install
```

*Note: For the hackathon demo pipeline, `action.js` is executed as a simulated local subprocess by the Python agent to avoid requiring developers to mint a real PKP on the Yellowstone testnet. However, the cryptographic flow is fully production-ready.*
