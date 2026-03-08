import EVM from "EVM"

access(all) contract FlowTalosVault {

    /// The path where the Vault's COA is stored
    access(all) let coaStoragePath: StoragePath
    access(all) let coaPublicPath: PublicPath
    
    /// Event emitted when the Vault executes EVM transactions
    access(all) event EVMTransactionsExecuted(txCount: Int, successful: Bool)

    /// Resource that manages the AI Vault's Cadence Owned Account
    access(all) resource VaultManager {

        /// Borrow the COA to execute EVM transactions
        access(self) fun borrowCOA(): auth(EVM.Call) &EVM.CadenceOwnedAccount {
            return FlowTalosVault.account.storage.borrow<auth(EVM.Call) &EVM.CadenceOwnedAccount>(from: FlowTalosVault.coaStoragePath)
                ?? panic("Vault does not have a CadenceOwnedAccount set up!")
        }

        /// Execute a batch of EVM transactions
        /// This is the core function called by the AI's Scheduled Transaction Handler
        access(all) fun executeEVMCalls(calls: [{String: AnyStruct}], mustPass: Bool): Bool {
            let coa = self.borrowCOA()
            var allSuccessful = true

            // Iterate through the provided EVM calls (e.g. bridging, swapping, depositing)
            for i, call in calls {
                let toStr = call["to"] as! String
                let dataHex = call["data"] as! String
                let gasLimit = call["gasLimit"] as! UInt64
                let value = call["value"] as! UInt

                let result = coa.call(
                    to: EVM.addressFromString(toStr),
                    data: dataHex.decodeHex(),
                    gasLimit: gasLimit,
                    value: EVM.Balance(attoflow: value)
                )

                if result.status != EVM.Status.successful {
                    allSuccessful = false
                    if mustPass {
                        panic("EVM Call failed at index ".concat(i.toString()).concat(": ").concat(result.errorMessage))
                    }
                }
            }

            emit EVMTransactionsExecuted(txCount: calls.length, successful: allSuccessful)
            return allSuccessful
        }
    }


    init() {
        self.coaStoragePath = /storage/flowTalosEVMAccount
        self.coaPublicPath = /public/flowTalosEVMAccount

        // Automatically create a COA for the contract account if it doesn't exist
        if self.account.storage.borrow<&EVM.CadenceOwnedAccount>(from: self.coaStoragePath) == nil {
            let coa <- EVM.createCadenceOwnedAccount()
            self.account.storage.save(<-coa, to: self.coaStoragePath)
            
            let cap = self.account.capabilities.storage.issue<&EVM.CadenceOwnedAccount>(self.coaStoragePath)
            self.account.capabilities.publish(cap, at: self.coaPublicPath)
        }

        // Setup the VaultManager
        let manager <- create VaultManager()
        self.account.storage.save(<-manager, to: /storage/flowTalosVaultManager)
    }
}
