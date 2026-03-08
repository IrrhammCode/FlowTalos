import "FlowTransactionScheduler"
import "FlowTalosVault"
import "FlowToken"
import "FungibleToken"

access(all) contract FlowTalosStrategyHandler {

    /// Event emitted when an AI strategy is executed autonomously by Flow Scheduled Transactions
    access(all) event StrategyExecuted(
        scheduleID: UInt64, 
        action: String, 
        token: String, 
        amount: UFix64, 
        ipfsProofCID: String, 
        successful: Bool
    )

    /// Handler resource that implements the Scheduled Transaction interface
    access(all) resource Handler: FlowTransactionScheduler.TransactionHandler {

        /// This is the function executed automatically by Flow at the `future` timestamp
        access(FlowTransactionScheduler.Execute) fun executeTransaction(id: UInt64, data: AnyStruct?) {
            
            // Expecting a structured dictionary from ScheduleAIStrategy.cdc
            let strategyData = data as? {String: AnyStruct}
                ?? panic("Invalid strategy data format provided to StrategyHandler")

            let calls = strategyData["evmCalls"] as? [{String: AnyStruct}]
                ?? panic("No EVM batch calls provided in strategy data")
                
            let ipfsProof = strategyData["ipfsProof"] as? String ?? "None"
            let action = strategyData["action"] as? String ?? "Unknown"
            let token = strategyData["token"] as? String ?? "Unknown"
            let amount = strategyData["amount"] as? UFix64 ?? 0.0

            // Borrow the Vault Manager from the contract account
            let vaultManager = FlowTalosStrategyHandler.account.storage.borrow<&FlowTalosVault.VaultManager>(from: /storage/flowTalosVaultManager)
                ?? panic("VaultManager is missing from the StrategyHandler account")

            // Execute the EVM Batch!
            let success = vaultManager.executeEVMCalls(calls: calls, mustPass: true)
            
            // Emit transparent on-chain proof binding the execution to the Storacha CID
            emit StrategyExecuted(
                scheduleID: id,
                action: action,
                token: token,
                amount: amount,
                ipfsProofCID: ipfsProof,
                successful: success
            )
            
            log("AI Scheduled Strategy Executed (id: ".concat(id.toString()).concat(") | Action: ").concat(action).concat(" | Proof: ").concat(ipfsProof))
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
