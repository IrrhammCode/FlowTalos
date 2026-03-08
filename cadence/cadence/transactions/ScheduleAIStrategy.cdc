import "FlowTransactionScheduler"
import "FlowTransactionSchedulerUtils"
import "FlowTalosStrategyHandler"
import "FlowToken"
import "FungibleToken"

/// Schedule an AI Strategy with a delay
transaction(
    delaySeconds: UFix64,
    executionEffort: UInt64,
    transactionData: [{String: AnyStruct}]
) {
    prepare(signer: auth(Storage, Capabilities) &Account) {
        
        // 1. Calculate future timestamp and preset priority to high for AI arbitrage/vault ops
        let future = getCurrentBlock().timestamp + delaySeconds
        let pr = FlowTransactionScheduler.Priority.High

        // 2. Estimate the Flow Token cost for execution
        let est = FlowTransactionScheduler.estimate(
            data: transactionData,
            timestamp: future,
            priority: pr,
            executionEffort: executionEffort
        )

        assert(
            est.timestamp != nil,
            message: est.error ?? "Scheduler estimation failed"
        )

        // 3. Withdraw the estimated execution fees from the signer's Vault
        let vaultRef = signer.storage
            .borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Missing FlowToken vault")
            
        let fees <- vaultRef.withdraw(amount: est.flowFee ?? 0.0) as! @FlowToken.Vault

        // 4. If a transaction scheduler manager has not been created for this account yet, create one
        if !signer.storage.check<@{FlowTransactionSchedulerUtils.Manager}>(from: FlowTransactionSchedulerUtils.managerStoragePath) {
            let manager <- FlowTransactionSchedulerUtils.createManager()
            signer.storage.save(<-manager, to: FlowTransactionSchedulerUtils.managerStoragePath)

            let managerRef = signer.capabilities.storage.issue<&{FlowTransactionSchedulerUtils.Manager}>(FlowTransactionSchedulerUtils.managerStoragePath)
            signer.capabilities.publish(managerRef, at: FlowTransactionSchedulerUtils.managerPublicPath)
        }

        // 5. Get the capability to our AI Strategy handler
        var handlerCap: Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>? = nil

        if let cap = signer.capabilities.storage
            .getControllers(forPath: /storage/FlowTalosStrategyHandler)[0]
            .capability as? Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}> {
            handlerCap = cap
        } else {
            handlerCap = signer.capabilities.storage
                .getControllers(forPath: /storage/FlowTalosStrategyHandler)[1]
                .capability as! Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>
        }

        // 6. Borrow the manager and schedule the transaction
        let manager = signer.storage.borrow<auth(FlowTransactionSchedulerUtils.Owner) &{FlowTransactionSchedulerUtils.Manager}>(from: FlowTransactionSchedulerUtils.managerStoragePath)
            ?? panic("Could not borrow a Manager reference")

        manager.schedule(
            handlerCap: handlerCap!,
            data: transactionData,
            timestamp: future,
            priority: pr,
            executionEffort: executionEffort,
            fees: <-fees
        )

        log("AI Strategy successfully Scheduled at block timestamp: ".concat(future.toString()))
    }
}
