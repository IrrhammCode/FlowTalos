/// ============================================================================
/// ScheduleAIStrategy — Forte Scheduled Transaction
/// ============================================================================
///
/// Purpose:
///   Schedules an AI-generated DeFi strategy for future autonomous execution
///   on the Flow blockchain using the Forte Scheduled Transactions framework.
///
/// Flow (1 Transaction → 6 Steps):
///   1. Calculate the target execution timestamp (current block + delay)
///   2. Estimate the FLOW token fee required by the scheduler
///   3. Withdraw the fee from the signer's FlowToken vault
///   4. Initialize the Scheduler Manager (if first-time setup)
///   5. Resolve the FlowTalosStrategyHandler capability
///   6. Schedule the job with full strategy metadata
///
/// Arguments:
///   - delaySeconds:     UFix64 — How far in the future to execute (e.g. 5.0)
///   - executionEffort:  UInt64 — Computational gas budget for the job
///   - transactionData:  [{String: AnyStruct}] — EVM batch call descriptors
///   - ipfsProofCID:     String — Storacha CID for the AI's Glass-Box reasoning
///   - action:           String — "BUY" or "SELL"
///   - token:            String — Target token symbol (e.g. "FLOW")
///   - amount:           UFix64 — Trade size in human-readable units
///
/// Security:
///   The signer must have:
///     - A FlowToken vault with sufficient balance for scheduler fees
///     - A FlowTalosStrategyHandler saved at /storage/FlowTalosStrategyHandler
///       (set up by InitVaultAndHandler.cdc)
///
/// Author: FlowTalos Team — Flow Hackathon 2026
/// ============================================================================

import "FlowTransactionScheduler"
import "FlowTransactionSchedulerUtils"
import "FlowTalosStrategyHandler"
import "FlowToken"
import "FungibleToken"

transaction(
    delaySeconds: UFix64,
    executionEffort: UInt64,
    transactionData: [{String: AnyStruct}],
    ipfsProofCID: String,
    action: String,
    token: String,
    amount: UFix64
) {
    prepare(signer: auth(Storage, Capabilities) &Account) {

        // ── Step 1: Calculate Future Timestamp ──────────────────────────────
        let future = getCurrentBlock().timestamp + delaySeconds
        let pr = FlowTransactionScheduler.Priority.High

        // ── Step 2: Estimate Execution Fee ──────────────────────────────────
        let est = FlowTransactionScheduler.estimate(
            data: transactionData,
            timestamp: future,
            priority: pr,
            executionEffort: executionEffort
        )

        assert(
            est.timestamp != nil,
            message: est.error ?? "Forte scheduler estimation failed"
        )

        // ── Step 3: Withdraw Fees from Signer's Vault ───────────────────────
        let vaultRef = signer.storage
            .borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Signer does not have a FlowToken vault")

        let fees <- vaultRef.withdraw(amount: est.flowFee ?? 0.0) as! @FlowToken.Vault

        // ── Step 4: Initialize Scheduler Manager (First-Time) ───────────────
        if !signer.storage.check<@{FlowTransactionSchedulerUtils.Manager}>(from: FlowTransactionSchedulerUtils.managerStoragePath) {
            let manager <- FlowTransactionSchedulerUtils.createManager()
            signer.storage.save(<-manager, to: FlowTransactionSchedulerUtils.managerStoragePath)

            let managerRef = signer.capabilities.storage
                .issue<&{FlowTransactionSchedulerUtils.Manager}>(FlowTransactionSchedulerUtils.managerStoragePath)
            signer.capabilities.publish(managerRef, at: FlowTransactionSchedulerUtils.managerPublicPath)
        }

        // ── Step 5: Resolve the Strategy Handler Capability ─────────────────
        // Try the first capability controller; fall back to the second if the
        // first doesn't carry the required Execute entitlement.
        var handlerCap: Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>? = nil

        let controllers = signer.capabilities.storage
            .getControllers(forPath: /storage/FlowTalosStrategyHandler)

        if controllers.length > 0 {
            if let cap = controllers[0].capability as? Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}> {
                handlerCap = cap
            } else if controllers.length > 1 {
                handlerCap = controllers[1].capability as! Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>
            }
        }

        assert(handlerCap != nil, message: "No valid FlowTalosStrategyHandler capability found — run InitVaultAndHandler.cdc first")

        // ── Step 6: Schedule the AI Strategy ────────────────────────────────
        let manager = signer.storage
            .borrow<auth(FlowTransactionSchedulerUtils.Owner) &{FlowTransactionSchedulerUtils.Manager}>(from: FlowTransactionSchedulerUtils.managerStoragePath)
            ?? panic("Could not borrow Scheduler Manager reference")

        // Bundle all AI metadata into a single dictionary for the handler
        let schedulingData: {String: AnyStruct} = {
            "evmCalls": transactionData,
            "ipfsProof": ipfsProofCID,
            "action": action,
            "token": token,
            "amount": amount
        }

        manager.schedule(
            handlerCap: handlerCap!,
            data: schedulingData,
            timestamp: future,
            priority: pr,
            executionEffort: executionEffort,
            fees: <-fees
        )

        log("FlowTalos AI Strategy Scheduled → Timestamp: "
            .concat(future.toString())
            .concat(" | Action: ").concat(action)
            .concat(" | Token: ").concat(token)
            .concat(" | Amount: ").concat(amount.toString())
            .concat(" | Proof: ipfs://").concat(ipfsProofCID))
    }
}
