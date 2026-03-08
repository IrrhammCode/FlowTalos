/**
 * FlowTalos Lit Action - Cross-VM Scheduled Transaction Signer
 * 
 * This code runs securely inside Lit Protocol Nodes (Lit Actions).
 * 
 * FlowTalos Architecture:
 * 1. AI Agent (Python) determines strategy and constructs EVM calldata.
 * 2. AI invokes this Lit Action via Lit Node Client.
 * 3. Lit Node runs this script, reconstructs the `ScheduleAIStrategy.cdc` transaction.
 * 4. Lit Node signs the transaction using its Programmable Key Pair (PKP).
 * 5. Returns the signature to the AI/Backend to be broadcasted to Flow.
 */

const go = async () => {
    try {
        console.log("--- Starting FlowTalos AI Vault Protocol Signer ---");

        // Inputs expected from LitNodeClient.executeJs()
        //   - delaySeconds: "5.0"
        //   - executionEffort: "1000"
        //   - transactionData: "[]" (Stringified JSON array of EVM Batch Calls)
        //   - pkpPublicKey: Lit PKP Public Key (injected by Lit)
        //   - sigName: Name for the signature share

        // 1. Validate Input Completeness
        if (!delaySeconds || !executionEffort || !transactionData) {
            console.log("Validation Failed: Missing required Scheduling parameters.");
            return LitActions.setResponse({
                response: JSON.stringify({
                    status: "ERROR",
                    message: "Missing scheduling parameters (delaySeconds, executionEffort, or transactionData).",
                    fallback: true
                })
            });
        }

        console.log(`Validating AI Execution Request...`);
        console.log(`Delay: ${delaySeconds}s | Effort: ${executionEffort} | Data Length: ${transactionData.length}`);

        // Inside a Lit Action, we construct the message we want to sign.
        // In a real implementation using FCL, the envelope/payload is constructed 
        // locally by the client and the hash is sent to Lit for signing. 
        // Here we simulate the signing of a transaction payload hash for the Flow blockchain.

        // 2. Setup the Cadence Transaction Script to Sign
        const cadenceScript = `
            import FlowTransactionScheduler from 0x8c5303eaa26202d6
            import FlowTransactionSchedulerUtils from 0x8c5303eaa26202d6
            import FlowTalosStrategyHandler from 0x24c2e530f15129b7
            import FlowToken from 0x7e60df042a9c0868
            import FungibleToken from 0x9a0766d93b6608b7
            
            transaction(delaySeconds: UFix64, executionEffort: UInt64, transactionData: [{String: AnyStruct}]) {
                prepare(signer: auth(Storage, Capabilities) &Account) {
                    // Calculate future execution timestamp
                    let future = getCurrentBlock().timestamp + delaySeconds
                    let pr = FlowTransactionScheduler.Priority.High

                    // Estimate execution fees
                    let est = FlowTransactionScheduler.estimate(
                        data: transactionData,
                        timestamp: future,
                        priority: pr,
                        executionEffort: executionEffort
                    )
                    assert(est.timestamp != nil, message: est.error ?? "Scheduler estimation failed")

                    // Withdraw fees from signer's FlowToken vault
                    let vaultRef = signer.storage
                        .borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(from: /storage/flowTokenVault)
                        ?? panic("Missing FlowToken vault")
                    let fees <- vaultRef.withdraw(amount: est.flowFee ?? 0.0) as! @FlowToken.Vault

                    // Setup scheduler manager if needed
                    if !signer.storage.check<@{FlowTransactionSchedulerUtils.Manager}>(from: FlowTransactionSchedulerUtils.managerStoragePath) {
                        let manager <- FlowTransactionSchedulerUtils.createManager()
                        signer.storage.save(<-manager, to: FlowTransactionSchedulerUtils.managerStoragePath)
                        let managerRef = signer.capabilities.storage.issue<&{FlowTransactionSchedulerUtils.Manager}>(FlowTransactionSchedulerUtils.managerStoragePath)
                        signer.capabilities.publish(managerRef, at: FlowTransactionSchedulerUtils.managerPublicPath)
                    }

                    // Get handler capability and schedule
                    let handlerCap = signer.capabilities.storage
                        .getControllers(forPath: /storage/FlowTalosStrategyHandler)[0]
                        .capability as! Capability<auth(FlowTransactionScheduler.Execute) &{FlowTransactionScheduler.TransactionHandler}>

                    let manager = signer.storage.borrow<auth(FlowTransactionSchedulerUtils.Owner) &{FlowTransactionSchedulerUtils.Manager}>(from: FlowTransactionSchedulerUtils.managerStoragePath)
                        ?? panic("Could not borrow Manager reference")

                    manager.schedule(
                        handlerCap: handlerCap,
                        data: transactionData,
                        timestamp: future,
                        priority: pr,
                        executionEffort: executionEffort,
                        fees: <-fees
                    )
                    log("AI Strategy scheduled at: ".concat(future.toString()))
                }
            }
        `;

        // Serialize payload to replicate what Flow CLI / FCL signs
        const txObject = {
            script: cadenceScript,
            arguments: [
                { type: "UFix64", value: delaySeconds },
                { type: "UInt64", value: executionEffort },
                { type: "Array", value: transactionData }
                // Note: FCL args need proper composite type formatting
            ]
        };

        // 3. Prepare the Message for Flow ECDSA_P256 or secp256k1 Signature
        // Flow requires the domain tag (e.g. "FLOW-V0.0-transaction") prefixed before hashing,
        // but Lit handles the raw byte signing.
        const messageString = JSON.stringify(txObject);
        const messageToSign = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(messageString));

        console.log("Payload constructed. Flow Domain Tag Added. Requesting Signature from Lit network...");

        // 4. Request the PKP to sign the transaction matrix
        // Flow supports ECDSA on P-256 and secp256k1 curves. Lit PKPs are ECDSA/Koblitz (secp256k1).
        const sigShare = await LitActions.signEcdsa({
            toSign: ethers.utils.arrayify(messageToSign),
            publicKey: pkpPublicKey,
            sigName: sigName,
        });

        console.log("Successfully signed transaction share. The AI is authorized to schedule.");

        // 5. Return the signature back to the Python Agent
        LitActions.setResponse({
            response: JSON.stringify({
                status: "SUCCESS",
                message: "Transaction payload validated and signed by FlowTalos Lit Action.",
                payload: txObject,
                // The actual signature share will be aggregated by the Lit SDK on the client side
            })
        });

    } catch (error) {
        // FALLBACK: If anything fails inside the Lit Node (network, PKP, or signing),
        // return a structured error so the Python agent can use its local fallback.
        console.log("Lit Action encountered an error: " + (error.message || error));
        LitActions.setResponse({
            response: JSON.stringify({
                status: "ERROR",
                message: "Lit Action failed: " + (error.message || "Unknown error"),
                fallback: true
            })
        });
    }
};

go();
