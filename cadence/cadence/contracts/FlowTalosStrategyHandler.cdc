import "FlowTransactionScheduler"
import "FlowTalosVault"
import "FlowToken"
import "FungibleToken"

access(all) contract FlowTalosStrategyHandler {

    /// Handler resource that implements the Scheduled Transaction interface
    access(all) resource Handler: FlowTransactionScheduler.TransactionHandler {

        /// This is the function executed automatically by Flow at the `future` timestamp
        /// The AI Agent provides `data` which will be our batched EVM calls.
        access(FlowTransactionScheduler.Execute) fun executeTransaction(id: UInt64, data: AnyStruct?) {
            
            // Validate that we received EVM calls data
            let calls = data as? [{String: AnyStruct}]
                ?? panic("No valid EVM batch calls provided to StrategyHandler")

            // Borrow the Vault Manager from the contract account
            let vaultManager = FlowTalosStrategyHandler.account.storage.borrow<&FlowTalosVault.VaultManager>(from: /storage/flowTalosVaultManager)
                ?? panic("VaultManager is missing from the StrategyHandler account")

            // Execute the EVM Batch!
            let success = vaultManager.executeEVMCalls(calls: calls, mustPass: true)
            
            log("AI Scheduled Strategy Executed (id: ".concat(id.toString()).concat(") Success: ").concat(success ? "true" : "false"))
        }

        access(all) view fun getViews(): [Type] {
            return [Type<StoragePath>(), Type<PublicPath>()]
        }

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

    /// Factory for the handler resource
    access(all) fun createHandler(): @Handler {
        return <- create Handler()
    }
}
