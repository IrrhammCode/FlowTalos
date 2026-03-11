/**
 * FlowTalos — Flow Client Library (FCL) Configuration
 * =====================================================
 * Configures the Flow Client Library for Testnet interaction.
 *
 * This single file bootstraps all FCL settings used by the dashboard:
 *   - Access Node API endpoint (Flow Testnet REST API)
 *   - Wallet Discovery service for user authentication
 *   - Contract address aliases for deployed FlowTalos contracts
 *   - Core Flow contract aliases (FlowToken, FungibleToken)
 *
 * Contract Addresses:
 *   FlowTalosVault             → 0x24c2e530f15129b7  (our Testnet deployer)
 *   FlowTalosStrategyHandler   → 0x24c2e530f15129b7  (same deployer)
 *   FlowToken                  → 0x7e60df042a9c0868  (Testnet standard)
 *   FungibleToken              → 0x9a0766d93b6608b7  (Testnet standard)
 *
 * @module config/fcl
 */

import { config } from "@onflow/fcl";

config({
    "app.detail.title": "FlowTalos Dashboard",
    "app.detail.icon": "https://i.imgur.com/r23Zhv8.png",

    // ── Flow Testnet Access ─────────────────────────────────────────────
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",

    // ── FlowTalos Contract Aliases (deployed on our Testnet account) ────
    "0xFlowTalosVault": "0x24c2e530f15129b7",
    "0xFlowTalosStrategyHandler": "0x24c2e530f15129b7",

    // ── Core Flow Contracts (Testnet standard addresses) ────────────────
    "0xFlowToken": "0x7e60df042a9c0868",
    "0xFungibleToken": "0x9a0766d93b6608b7",

    // ── Flow Scheduler Contracts ────────────────────────────────────────
    "0xFlowTransactionScheduler": "0x8c5303eaa26202d6",
    "0xFlowTransactionSchedulerUtils": "0x8c5303eaa26202d6",
});
