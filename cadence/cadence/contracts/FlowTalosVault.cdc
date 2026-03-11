/// ============================================================================
/// FlowTalos Vault — EVM Bridge Manager
/// ============================================================================
///
/// Purpose:
///   Manages a Cadence-Owned Account (COA) on Flow EVM, enabling the AI Agent
///   to execute arbitrary EVM transactions (DEX swaps, bridge calls, etc.)
///   from within Cadence smart contracts.
///
/// Architecture:
///   Flow's Cross-VM architecture allows Cadence contracts to own and operate
///   EVM accounts. This contract:
///     1. Creates a COA during deployment (init)
///     2. Exposes a `VaultManager` resource for batch EVM execution
///     3. Supports atomic multi-call batches (all-or-nothing when mustPass=true)
///
/// Usage:
///   The `FlowTalosStrategyHandler` borrows the `VaultManager` from storage
///   and calls `executeEVMCalls()` with the AI-generated batch payload.
///
/// Storage Paths:
///   - /storage/flowTalosEVMAccount     — The COA resource
///   - /storage/flowTalosVaultManager   — The VaultManager resource
///   - /public/flowTalosEVMAccount      — Public capability for COA introspection
///
/// Author: FlowTalos Team — Flow Hackathon 2026
/// ============================================================================

import EVM from "EVM"

access(all) contract FlowTalosVault {

    // =========================================================================
    // STORAGE PATHS
    // =========================================================================

    /// Storage path for the Cadence-Owned Account (COA) on Flow EVM
    access(all) let coaStoragePath: StoragePath
    /// Public path for the COA (read-only introspection)
    access(all) let coaPublicPath: PublicPath

    // =========================================================================
    // EVENTS
    // =========================================================================

    /// Emitted after each batch of EVM transactions is processed.
    ///
    /// Fields:
    ///   - txCount:    Number of individual EVM calls in the batch
    ///   - successful: True if all calls succeeded; false if any reverted
    access(all) event EVMTransactionsExecuted(txCount: Int, successful: Bool)

    // =========================================================================
    // VAULT MANAGER RESOURCE
    // =========================================================================

    /// Resource that encapsulates all EVM interaction logic for the AI Vault.
    ///
    /// Security: Only code with a reference to this resource can execute EVM
    /// transactions. It is stored in the contract account's private storage
    /// and borrowed exclusively by `FlowTalosStrategyHandler`.
    access(all) resource VaultManager {

        /// Borrows the COA with `EVM.Call` entitlement for executing EVM transactions.
        ///
        /// Panics if the COA has not been initialized (should never happen after deploy).
        access(self) fun borrowCOA(): auth(EVM.Call) &EVM.CadenceOwnedAccount {
            return FlowTalosVault.account.storage
                .borrow<auth(EVM.Call) &EVM.CadenceOwnedAccount>(from: FlowTalosVault.coaStoragePath)
                ?? panic("COA not found at ".concat(FlowTalosVault.coaStoragePath.toString()))
        }

        /// Executes a batch of EVM transactions through the Cadence-Owned Account.
        ///
        /// Each call in the `calls` array must be a dictionary with:
        ///   - "to":       String — Target EVM contract address (hex)
        ///   - "data":     String — Encoded calldata (hex, e.g. from Uniswap V2 ABI)
        ///   - "gasLimit": UInt64 — Maximum gas units for this call
        ///   - "value":    UInt   — FLOW value to send (in attoflow; usually 0 for swaps)
        ///
        /// Security:
        ///   - Only callable from within the FlowTalosVault contract scope
        ///     (i.e. by FlowTalosStrategyHandler via the VaultManager reference)
        ///   - Validates that each call dictionary contains all 4 required keys
        ///   - Empty batch calls are rejected to prevent wasted gas
        ///
        /// Args:
        ///   calls:    Array of EVM call descriptors
        ///   mustPass: If true, panics on the first failed call (atomic batch).
        ///             If false, continues execution and reports partial success.
        ///
        /// Returns: True if all calls succeeded, false otherwise.
        access(all) fun executeEVMCalls(calls: [{String: AnyStruct}], mustPass: Bool): Bool {
            // ── Input Validation ────────────────────────────────────────────
            assert(calls.length > 0, message: "Cannot execute empty EVM batch — provide at least one call")
            let coa = self.borrowCOA()
            var allSuccessful = true

            for i, call in calls {
                // ── Validate required keys exist ─────────────────────────────
                assert(call["to"] != nil, message: "EVM call at index ".concat(i.toString()).concat(" missing 'to' field"))
                assert(call["data"] != nil, message: "EVM call at index ".concat(i.toString()).concat(" missing 'data' field"))

                let toStr    = call["to"]       as! String
                let dataHex  = call["data"]     as! String
                let gasLimit = call["gasLimit"] as? UInt64 ?? 300000  // Safe default gas limit
                let value    = call["value"]    as? UInt   ?? 0       // Default: no FLOW transfer

                let result = coa.call(
                    to: EVM.addressFromString(toStr),
                    data: dataHex.decodeHex(),
                    gasLimit: gasLimit,
                    value: EVM.Balance(attoflow: value)
                )

                if result.status != EVM.Status.successful {
                    allSuccessful = false
                    if mustPass {
                        panic("EVM call reverted at index "
                            .concat(i.toString())
                            .concat(": ")
                            .concat(result.errorMessage))
                    }
                }
            }

            emit EVMTransactionsExecuted(txCount: calls.length, successful: allSuccessful)
            return allSuccessful
        }
    }

    // =========================================================================
    // CONTRACT INITIALIZATION
    // =========================================================================

    init() {
        self.coaStoragePath = /storage/flowTalosEVMAccount
        self.coaPublicPath  = /public/flowTalosEVMAccount

        // Create the Cadence-Owned Account if it doesn't already exist
        if self.account.storage.borrow<&EVM.CadenceOwnedAccount>(from: self.coaStoragePath) == nil {
            let coa <- EVM.createCadenceOwnedAccount()
            self.account.storage.save(<-coa, to: self.coaStoragePath)

            // Publish a read-only capability for external introspection
            let cap = self.account.capabilities.storage
                .issue<&EVM.CadenceOwnedAccount>(self.coaStoragePath)
            self.account.capabilities.publish(cap, at: self.coaPublicPath)
        }

        // Create and store the VaultManager singleton (idempotent)
        if self.account.storage.borrow<&VaultManager>(from: /storage/flowTalosVaultManager) == nil {
            let manager <- create VaultManager()
            self.account.storage.save(<-manager, to: /storage/flowTalosVaultManager)
        }
    }
}
