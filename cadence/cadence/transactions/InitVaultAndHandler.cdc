import "FlowTransactionScheduler"
import "FlowTalosVault"
import "FlowTalosStrategyHandler"

transaction() {
    prepare(signer: auth(Storage, Capabilities) &Account) {
        
        // --- 1. VAULT MANAGER ---
        // VaultManager is auto-created inside FlowTalosVault.init() as a singleton.
        // No manual creation needed — it lives at /storage/flowTalosVaultManager on the deployer account.

        // --- 2. SET UP THE SCHEDULER HANDLER ---
        // Save a handler resource to storage if not already present
        if signer.storage.borrow<&AnyResource>(from: /storage/FlowTalosStrategyHandler) == nil {
            let handler <- FlowTalosStrategyHandler.createHandler()
            signer.storage.save(<-handler, to: /storage/FlowTalosStrategyHandler)

            // Validation/example that we can create an issue a handler capability with correct entitlement for FlowTransactionScheduler
            let _ = signer.capabilities.storage
                .issue<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>(/storage/FlowTalosStrategyHandler)

            // Issue a non-entitled public capability for the handler that is publicly accessible
            let publicCap = signer.capabilities.storage
                .issue<&{FlowTransactionScheduler.TransactionHandler}>(/storage/FlowTalosStrategyHandler)

            // publish the capability
            signer.capabilities.publish(publicCap, at: /public/FlowTalosStrategyHandler)
        }
    }
}
