/// ============================================================================
/// FlowTalos Strategy Handler
/// ============================================================================
///
/// Purpose:
///   Implements the `FlowTransactionScheduler.TransactionHandler` interface,
///   enabling the AI Agent to schedule autonomous DeFi strategy executions
///   via Flow's Forte Scheduled Transactions infrastructure.
///
/// How It Works:
///   1. The AI Agent (off-chain) calls `ScheduleAIStrategy.cdc` with trade data.
///   2. Flow's Forte scheduler stores the job and fires it at the target timestamp.
///   3. At that future time, Forte calls `executeTransaction()` on this handler.
///   4. The handler unwraps the structured strategy data, delegates EVM calls to
///      `FlowTalosVault.VaultManager`, and emits a transparent on-chain event
///      binding the execution to its immutable IPFS proof (Storacha CID).
///
/// Security:
///   - Only the Flow Scheduler (entitlement `FlowTransactionScheduler.Execute`)
///     can invoke `executeTransaction`. External callers cannot trigger it.
///   - All executions are permanently auditable via the `StrategyExecuted` event
///     and the `ipfsProofCID` field linking to the AI's Glass-Box reasoning log.
///
/// Dependencies:
///   - FlowTransactionScheduler (0x8c5303eaa26202d6) — Forte scheduler
///   - FlowTalosVault           (deployed with this contract) — EVM bridge
///   - FlowToken / FungibleToken — Fee payment for scheduled execution
///
/// Author: FlowTalos Team — Flow Hackathon 2026
/// ============================================================================

import "FlowTransactionScheduler"
import "FlowTalosVault"
import "FlowToken"
import "FungibleToken"

access(all) contract FlowTalosStrategyHandler {

    // =========================================================================
    // EVENTS
    // =========================================================================

    /// Emitted on every autonomous AI strategy execution.
    /// Indexed by `scheduleID` for on-chain querying and off-chain monitoring.
    ///
    /// Fields:
    ///   - scheduleID:   Unique ID assigned by the Forte scheduler
    ///   - action:       "BUY" or "SELL" (from Synapse AI signal)
    ///   - token:        Target token symbol (e.g. "FLOW")
    ///   - amount:       Trade size in human-readable units
    ///   - ipfsProofCID: Storacha CID linking to the immutable AI reasoning log
    ///   - successful:   Whether all EVM calls in the batch succeeded
    access(all) event StrategyExecuted(
        scheduleID: UInt64,
        action: String,
        token: String,
        amount: UFix64,
        ipfsProofCID: String,
        successful: Bool
    )

    // =========================================================================
    // HANDLER RESOURCE
    // =========================================================================

    /// The core handler resource that receives scheduled execution calls from Forte.
    ///
    /// Conforms to `FlowTransactionScheduler.TransactionHandler`, the interface
    /// required by the Forte scheduler to dispatch jobs to custom handlers.
    access(all) resource Handler: FlowTransactionScheduler.TransactionHandler {

        /// Executed automatically by the Flow blockchain at the scheduled timestamp.
        ///
        /// This function is the entry point for all autonomous AI strategy executions.
        /// It unwraps the structured metadata dictionary, delegates the EVM batch
        /// calls to the VaultManager, and emits transparent proof events.
        ///
        /// Expected `data` structure (set by `ScheduleAIStrategy.cdc`):
        /// ```
        /// {
        ///     "evmCalls":  [{String: AnyStruct}],  // EVM batch call array
        ///     "ipfsProof": String,                  // Storacha CID
        ///     "action":    String,                  // "BUY" or "SELL"
        ///     "token":     String,                  // e.g. "FLOW"
        ///     "amount":    UFix64                   // Trade size
        /// }
        /// ```
        ///
        /// Panics if:
        ///   - `data` is not a `{String: AnyStruct}` dictionary
        ///   - No `evmCalls` array is provided
        ///   - VaultManager is missing from contract account storage
        ///   - Any EVM call reverts (when `mustPass` is true)
        access(FlowTransactionScheduler.Execute) fun executeTransaction(id: UInt64, data: AnyStruct?) {

            // ── Unwrap Strategy Data ────────────────────────────────────────
            let strategyData = data as? {String: AnyStruct}
                ?? panic("Invalid strategy data format — expected {String: AnyStruct}")

            let calls = strategyData["evmCalls"] as? [{String: AnyStruct}]
                ?? panic("Missing 'evmCalls' — no EVM batch calls to execute")

            let ipfsProof = strategyData["ipfsProof"] as? String ?? "None"
            let action    = strategyData["action"]    as? String ?? "Unknown"
            let token     = strategyData["token"]     as? String ?? "Unknown"
            let amount    = strategyData["amount"]    as? UFix64 ?? 0.0

            // ── Input Validation ─────────────────────────────────────────
            // Guard: Reject empty batches (malformed payload or AI error)
            assert(calls.length > 0, message: "Strategy has no EVM calls to execute")

            // Guard: Validate action is one of the expected values
            assert(
                action == "BUY" || action == "SELL",
                message: "Invalid action '".concat(action).concat("' — must be BUY or SELL")
            )

            // Guard: Amount must be positive
            assert(amount > 0.0, message: "Trade amount must be greater than 0")

            // ── Borrow EVM Bridge ───────────────────────────────────────────
            let vaultManager = FlowTalosStrategyHandler.account.storage
                .borrow<&FlowTalosVault.VaultManager>(from: /storage/flowTalosVaultManager)
                ?? panic("VaultManager not found — run InitVaultAndHandler.cdc first")

            // ── Execute the EVM Batch ───────────────────────────────────────
            // mustPass=true ensures atomic execution: if ANY call reverts,
            // the entire transaction rolls back. This prevents partial fills
            // that could leave the vault in an inconsistent state.
            let success = vaultManager.executeEVMCalls(calls: calls, mustPass: true)

            // ── Emit On-Chain Audit Event ───────────────────────────────────
            emit StrategyExecuted(
                scheduleID: id,
                action: action,
                token: token,
                amount: amount,
                ipfsProofCID: ipfsProof,
                successful: success
            )

            log("FlowTalos Strategy Executed (ID: "
                .concat(id.toString())
                .concat(") | Action: ").concat(action)
                .concat(" | Token: ").concat(token)
                .concat(" | Amount: ").concat(amount.toString())
                .concat(" | Proof: ipfs://").concat(ipfsProof))
        }

        /// Returns the metadata view types supported by this handler.
        access(all) view fun getViews(): [Type] {
            return [Type<StoragePath>(), Type<PublicPath>()]
        }

        /// Resolves a metadata view to its concrete value.
        access(all) fun resolveView(_ view: Type): AnyStruct? {
            switch view {
                case Type<StoragePath>():
                    return /storage/FlowTalosStrategyHandler
                case Type<PublicPath>():
                    return /public/FlowTalosStrategyHandler
                default:
                    return nil
            }
        }
    }

    // =========================================================================
    // PUBLIC API
    // =========================================================================

    /// Creates a new Handler resource.
    /// Called once during initialization by `InitVaultAndHandler.cdc`.
    access(all) fun createHandler(): @Handler {
        return <- create Handler()
    }
}
