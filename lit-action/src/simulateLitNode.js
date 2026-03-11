/**
 * FlowTalos — Local Lit Protocol Node Simulator
 * ===============================================
 * Executes `action.js` in an environment that mirrors a real Lit Protocol Node.
 *
 * In production, `action.js` runs inside Lit's decentralized threshold network
 * where PKP keys are split across >2/3 of staked nodes. This simulator recreates
 * that environment locally so the Python AI Agent can validate the full pipeline
 * (Signal → Cadence Payload → ECDSA Signing) without needing live Lit Node access.
 *
 * Usage (called by Python AI Agent via subprocess):
 *   FLOWTALOS_SIGNAL='{"action":"BUY",...}' node simulateLitNode.js
 *
 * Environment Variables:
 *   FLOWTALOS_SIGNAL       — JSON-serialized AI signal payload (required)
 *   FLOWTALOS_ACTION_MODE  — "local" indicator (set by Python agent)
 *
 * Output:
 *   Prints a single JSON line to stdout matching the Lit Action response format:
 *   { status: "SUCCESS", payload: { script: "...", arguments: [...] } }
 *
 * @module simulateLitNode
 * @author FlowTalos Team
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ethers = require('ethers');

/**
 * Main execution function. Sets up the Lit Node global environment,
 * executes `action.js`, and captures the response.
 */
async function run() {
    try {
        // ── 1. Validate Input ──────────────────────────────────────────────
        if (!process.env.FLOWTALOS_SIGNAL) {
            throw new Error('FLOWTALOS_SIGNAL environment variable is missing');
        }

        const signal = JSON.parse(process.env.FLOWTALOS_SIGNAL);

        // ── 2. Inject Lit Node Globals ──────────────────────────────────────
        // These variables are normally injected by the Lit Protocol runtime
        // into the execution sandbox of every Lit Action.

        global.delaySeconds = '5.0';
        global.executionEffort = '1000';
        global.transactionData = JSON.stringify([{
            target: signal.dex_router || '0x0000000000000000000000000000000000000000',
            data: signal.evm_calldata || '0x',
        }]);
        global.ipfsProofCID = signal.ipfs_proof_cid || 'bafybeig_local_fallback';
        global.signalAction = signal.action;
        global.signalToken = signal.token;
        global.signalAmount = String(signal.amount);
        global.pkpPublicKey = '04' + crypto.randomBytes(64).toString('hex');
        global.sigName = 'flowtalos_strategy_schedule';

        // Ethers.js is globally available inside Lit Actions
        global.ethers = ethers;

        // ── 3. Mock Lit SDK Functions ────────────────────────────────────────
        let finalResponse = null;

        global.LitActions = {
            /**
             * Captures the response that action.js sends back to the Lit network.
             * @param {{ response: string }} args
             */
            setResponse: (args) => {
                finalResponse = args.response;
            },

            /**
             * Simulates ECDSA threshold signing using a local random signature.
             * In production, this aggregates signature shares from 2/3+ Lit nodes.
             * @returns {Promise<{ signature: string, publicKey: string }>}
             */
            signEcdsa: async () => ({
                signature: '0x' + crypto.randomBytes(65).toString('hex'),
                publicKey: global.pkpPublicKey,
            }),
        };

        // ── 4. Execute action.js ────────────────────────────────────────────
        // Suppress console.log to prevent action.js debug output from
        // corrupting the JSON stdout that Python parses.
        const originalLog = console.log;
        console.log = () => { };

        const actionScriptPath = path.join(__dirname, 'action.js');
        const actionScript = fs.readFileSync(actionScriptPath, 'utf8');

        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const executor = new AsyncFunction(actionScript);
        await executor();

        // ── 5. Output Result ────────────────────────────────────────────────
        console.log = originalLog;

        if (finalResponse) {
            console.log(finalResponse);
        } else {
            console.log(JSON.stringify({
                status: 'ERROR',
                message: 'Lit Action completed but did not call setResponse()',
            }));
        }

    } catch (err) {
        // Ensure Python always receives valid JSON, even on catastrophic failure
        console.log(JSON.stringify({
            status: 'ERROR',
            message: err.message || 'Unknown simulateLitNode error',
        }));
    }
}

run();
