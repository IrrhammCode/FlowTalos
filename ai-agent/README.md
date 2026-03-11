# 🧠 FlowTalos AI Agent

> **The Brain** — Autonomous DeFi strategy engine that combines quantitative market analysis with qualitative news sentiment to generate actionable on-chain signals.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FlowTalos AI Agent                        │
├─────────────────────────────────────────────────────────────┤
│  1. fetch_market_data()    → CoinGecko real-time price      │
│  2. fetch_news_sentiment() → CryptoCompare headline scoring │
│  3. impulse_ai_analyze()   → Dual-signal matrix decision    │
│  4. upload_to_storacha()   → Immutable IPFS proof (CID)     │
│  5. trigger_lit_action()   → Lit Protocol threshold signing │
│  6. submit_to_flow()       → Flow Scheduled Transaction     │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
ai-agent/
├── main.py             # Core agent logic — 6-step pipeline
├── test_agent.py       # Pytest suite — 8 tests (3 classes)
├── requirements.txt    # Python dependencies
├── .env.example        # Environment variable template
└── README.md           # This file
```

## Decision Matrix

The Impulse AI engine uses a dual-signal matrix to produce actionable signals:

|           | Positive News | Neutral News | Negative News |
|-----------|:------------:|:------------:|:-------------:|
| Bullish   | **BUY**      | **BUY**      | HOLD          |
| Neutral   | HOLD         | HOLD         | HOLD          |
| Bearish   | HOLD         | **SELL**     | **SELL**      |

## Tech Stack

| Technology | Purpose |
|---|---|
| Python 3.9+ | Core language |
| `requests` | CoinGecko & CryptoCompare API calls |
| `web3.py` | EVM calldata encoding (Uniswap V2 ABI) |
| `subprocess` | Orchestrates Node.js subprocesses for Lit & Storacha |
| `hashlib` | SHA-256 fallback CID & signature generation |
| `fcntl` | File locking for concurrent trade log writes |

## Fallback Strategy

Every external dependency has a graceful degradation path — the agent **never crashes** mid-execution:

| Dependency | Fallback |
|---|---|
| CoinGecko API | Aborts cleanly (refuses to trade on stale data) |
| Storacha Upload | Local SHA-256 CID computation (`bafylocal...`) |
| Lit Protocol | Deterministic double-SHA-256 signature (`0x...`) |
| Flow CLI | Offline payload construction (state machine preserved) |

## Security Measures

- **Symbol Whitelist** — Only `ALLOWED_SYMBOLS` can be queried from CoinGecko (prevents URL injection)
- **Sanitized Subprocess Environment** — `_sanitize_env_for_subprocess()` forwards only `PATH`, `HOME`, `NODE_PATH` to Node.js child processes; no API keys or tokens leak
- **Unpredictable Temp Files** — Uses `tempfile.mkstemp()` instead of hardcoded filenames
- **File Locking** — `fcntl.flock(LOCK_EX)` prevents race conditions on `trade_log.json`
- **Payload Truncation** — Reasoning strings capped at `MAX_REASONING_FOR_SUBPROCESS` (200 chars)

## Getting Started

### Prerequisites
- Python 3.9 or later
- `pip` package manager
- Node.js 18+ (for Lit Action & Storacha subprocesses)

### Installation

```bash
cd ai-agent
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

### Running the Agent

```bash
python3 main.py
```

The agent will:
1. Fetch live FLOW market data from CoinGecko
2. Analyze news sentiment from CryptoCompare
3. Generate a BUY/SELL/HOLD signal
4. Upload reasoning proof to Storacha IPFS
5. Sign via Lit Protocol threshold network
6. Schedule the transaction on Flow Testnet

### Running Tests

```bash
python3 -m pytest test_agent.py -v
```

**Expected output:** 8 tests, 3 test classes:
- `TestGenerateEVMCalldata` — Validates Uniswap V2 calldata encoding
- `TestComputeLocalCID` — Validates deterministic CID generation
- `TestImpulseAIAnalyze` — Validates the decision matrix logic

## Environment Variables

See `.env.example` for full documentation. The agent runs without any environment variables (all external calls have fallbacks), but for full functionality:

| Variable | Required | Description |
|---|---|---|
| `FLOW_TESTNET_SIGNER` | Optional | Flow Testnet account address |
| Node.js in `PATH` | Recommended | Required for Lit & Storacha subprocesses |
