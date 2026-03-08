// FlowTalos.cdc
// Non-Custodial Vault for Autonomous Strategies

access(all) contract FlowTalos {

    // Event emitted when a strategy is automatically executed
    access(all) event StrategyExecuted(vaultID: UInt64, action: String, token: String, amount: UFix64, reasoningCID: String)

    // The authorized Lit Protocol PKP address
    access(all) var authorizedAgentAddress: Address

    // Vault resource to hold funds
    access(all) resource Vault {
        access(all) let id: UInt64
        access(all) var balance: UFix64 // Note: Simplified for hackathon scope. Use real FungibleToken interfaces in production.

        init() {
            self.id = self.uuid
            self.balance = 0.0
        }

        // Standard deposit
        access(all) fun deposit(amount: UFix64) {
            self.balance = self.balance + amount
        }

        // Standard withdraw (Non-custodial, user can withdraw anytime)
        access(all) fun withdraw(amount: UFix64) {
            pre {
                self.balance >= amount: "Insufficient balance for withdrawal"
            }
            self.balance = self.balance - amount
        }

        // Restricted execution called by the AI Agent (via Lit Protocol PKP)
        // Does not accept transfer parameters directly, only abstract actions.
        access(all) fun executeStrategy(action: String, token: String, amount: UFix64, reasoningCID: String, agentAddress: Address) {
            pre {
                FlowTalos.authorizedAgentAddress == agentAddress: "Unauthorized Execution Agent"
            }

            // In an actual integration, 'action' would map to a decentralized exchange swap or staking call.
            // Example:
            // if action == "SWAP_USDC_FLOW" {
            //      // Execute swap using borrowed references
            // }

            // Emit the audit log pointing to Storacha CID
            emit StrategyExecuted(vaultID: self.id, action: action, token: token, amount: amount, reasoningCID: reasoningCID)
        }
    }

    // Allow user to initialize their own Vault
    access(all) fun createVault(): @Vault {
        return <-create Vault()
    }

    // Admin function to update the agent address (for key rotation)
    access(all) fun updateAgentAddress(newAddress: Address) {
        // Warning: Simplified. Real implementation requires admin AuthAccount capability.
        self.authorizedAgentAddress = newAddress
    }

    init() {
        self.authorizedAgentAddress = 0x0 // Initialize to 0x0; update after Lit PKP generation
    }
}
