/// ============================================================================
/// InitVaultAndHandler — One-Time Account Setup Transaction
/// ============================================================================
///
/// Purpose:
///   Initializes the signer's account with the resources required to
///   participate in FlowTalos AI-driven scheduled transactions.
///
/// What It Creates:
///   1. FlowTalosStrategyHandler.Handler → Saved to /storage/FlowTalosStrategyHandler
///      - Entitled capability for Forte scheduler (FlowTransactionScheduler.Execute)
///      - Public capability for read-only handler introspection
///
/// Prerequisites:
///   - FlowTalosVault contract must already be deployed on the same account.
///     Its init() automatically creates the COA and VaultManager.
///   - The signer must have enough FLOW to cover deployment gas costs.
///
/// Idempotent: Safe to call multiple times. Skips creation if resources
///   already exist in storage.
///
/// Author: FlowTalos Team — Flow Hackathon 2026
/// ============================================================================

import "FlowTransactionScheduler"
import "FlowTalosVault"
import "FlowTalosStrategyHandler"

transaction() {
    prepare(signer: auth(Storage, Capabilities) &Account) {

        // ── VaultManager ────────────────────────────────────────────────────
        // VaultManager is automatically created in FlowTalosVault.init()
        // and stored at /storage/flowTalosVaultManager on the deployer account.
        // No manual setup needed here.

        // ── Strategy Handler ────────────────────────────────────────────────
        // Only create if not already present (idempotent)
        if signer.storage.borrow<&AnyResource>(from: /storage/FlowTalosStrategyHandler) == nil {
            let handler <- FlowTalosStrategyHandler.createHandler()
            signer.storage.save(<-handler, to: /storage/FlowTalosStrategyHandler)

            // Issue an entitled capability for the Forte scheduler
            // This capability carries the Execute entitlement required by
            // FlowTransactionScheduler to trigger executeTransaction()
            let _ = signer.capabilities.storage
                .issue<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>(/storage/FlowTalosStrategyHandler)

            // Issue and publish a non-entitled public capability for
            // external introspection (e.g. dashboard queries)
            let publicCap = signer.capabilities.storage
                .issue<&{FlowTransactionScheduler.TransactionHandler}>(/storage/FlowTalosStrategyHandler)
            signer.capabilities.publish(publicCap, at: /public/FlowTalosStrategyHandler)

            log("FlowTalos Strategy Handler initialized and published.")
        } else {
            log("FlowTalos Strategy Handler already exists — skipping.")
        }
    }
}
