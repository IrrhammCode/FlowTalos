const fs = require('fs');
const path = require('path');

// Load the raw content of the Lit Action script
const actionScriptPath = path.join(__dirname, '../src/action.js');
const actionScript = fs.readFileSync(actionScriptPath, 'utf8');

describe('FlowTalos Lit Action (action.js)', () => {
    let mockLitActions;
    let mockConsoleLog;
    let setResponseData;

    beforeEach(() => {
        // Mock LitActions global object injected by the Lit Node environment
        setResponseData = null;
        mockLitActions = {
            setResponse: jest.fn((args) => {
                setResponseData = args.response;
            }),
            signEcdsa: jest.fn(async () => {
                return {
                    signature: "mock_signature_share",
                    publicKey: "mock_pubkey"
                }
            })
        };

        // Mock Ethers.js
        const mockEthers = {
            utils: {
                toUtf8Bytes: jest.fn((str) => str),
                keccak256: jest.fn(() => "0xmock_hash"),
                arrayify: jest.fn(() => new Uint8Array([1, 2, 3]))
            }
        };

        // Suppress console.log for clean test output
        mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

        // Set up globals that the script expects
        global.LitActions = mockLitActions;
        global.ethers = mockEthers;
    });

    afterEach(() => {
        mockConsoleLog.mockRestore();
        jest.clearAllMocks();

        // Clean up all the parameter globals
        delete global.delaySeconds;
        delete global.executionEffort;
        delete global.transactionData;
        delete global.ipfsProofCID;
        delete global.signalAction;
        delete global.signalToken;
        delete global.signalAmount;
        delete global.pkpPublicKey;
        delete global.sigName;
    });

    // Helper function to safely execute the script within the Jest environment
    const executeLitAction = async () => {
        // Create an async function context that runs the Lit Action code
        // The script already ends with `go();` naturally
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
        const executor = new AsyncFunction(actionScript);
        await executor();
    };

    it('should fail and return ERROR if required parameters are missing', async () => {
        // Missing ipfsProofCID and others
        global.delaySeconds = "5.0";
        global.executionEffort = "1000";
        global.transactionData = "[]";

        await executeLitAction();

        expect(mockLitActions.setResponse).toHaveBeenCalled();
        const responseData = JSON.parse(setResponseData);
        expect(responseData.status).toBe("ERROR");
        expect(responseData.message).toContain("Lit Action failed");
        expect(responseData.fallback).toBe(true);
    });

    it('should construct Cadence payload and sign successfully with valid inputs', async () => {
        // Provide all required inputs
        global.delaySeconds = "5.0";
        global.executionEffort = "1000";
        global.transactionData = '[{"target":"0x12..","data":"0x38.."}]';
        global.ipfsProofCID = "bafybeig...";
        global.signalAction = "BUY";
        global.signalToken = "FLOW";
        global.signalAmount = "500.0";
        global.pkpPublicKey = "04abcd1234...";
        global.sigName = "flowtalos_strategy_123";

        await executeLitAction();

        // Check if LitActions.signEcdsa was called to sign the payload
        expect(mockLitActions.signEcdsa).toHaveBeenCalled();

        // Validate the structure of the returned payload
        expect(mockLitActions.setResponse).toHaveBeenCalled();
        const responseData = JSON.parse(setResponseData);

        expect(responseData.status).toBe("SUCCESS");
        expect(responseData.payload).toBeDefined();

        // Validate that Cadence script construction occurred correctly
        const payload = responseData.payload;
        expect(payload.script).toContain("import FlowTransactionScheduler");
        expect(payload.script).toContain("FlowTalosStrategyHandler");
        expect(payload.arguments).toHaveLength(7);

        // Check argument mappings
        expect(payload.arguments[0].value).toBe("5.0");       // delay
        expect(payload.arguments[3].value).toBe("bafybeig..."); // ipfs CID
        expect(payload.arguments[4].value).toBe("BUY");         // action
    });

    it('should return ERROR fallback if LitActions.signEcdsa fails', async () => {
        // Provide all required inputs
        global.delaySeconds = "5.0";
        global.executionEffort = "1000";
        global.transactionData = "[]";
        global.ipfsProofCID = "bafybeig...";
        global.signalAction = "BUY";
        global.signalToken = "FLOW";
        global.signalAmount = "500.0";
        global.pkpPublicKey = "04abcd1234...";
        global.sigName = "flowtalos_strategy_123";

        // Mock signing failure
        mockLitActions.signEcdsa.mockRejectedValue(new Error("Network timeout from Lit Nodes"));

        await executeLitAction();

        // Should be caught and returned cleanly as a fallback response
        expect(mockLitActions.setResponse).toHaveBeenCalled();
        const responseData = JSON.parse(setResponseData);

        expect(responseData.status).toBe("ERROR");
        expect(responseData.message).toContain("Lit Action failed");
        expect(responseData.message).toContain("Network timeout");
        expect(responseData.fallback).toBe(true);
    });
});
