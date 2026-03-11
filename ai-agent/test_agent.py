"""
FlowTalos — Impulse AI Agent Unit Tests
========================================
Comprehensive test suite for the core AI Agent functions.

Tests cover:
    - CID hashing consistency (compute_local_cid)
    - EVM calldata generation for BUY and SELL actions
    - Dual-signal decision matrix (BUY, SELL, HOLD scenarios)

Run:
    $ python3 -m pytest test_agent.py -v

Author: FlowTalos Team — Flow Hackathon 2026
"""

import pytest
from main import compute_local_cid, generate_evm_calldata, impulse_ai_analyze


# =============================================================================
# CID Hashing Tests
# =============================================================================

class TestComputeLocalCID:
    """Tests for the pure-Python SHA-256 CID fallback function."""

    def test_consistency(self):
        """Identical inputs must always produce identical CIDs."""
        test_data = "hello world"
        cid1 = compute_local_cid(test_data)
        cid2 = compute_local_cid(test_data)

        assert cid1 == cid2, "CID should be deterministic for the same input"

    def test_format(self):
        """CID must start with 'bafy' prefix and be reasonably long."""
        cid = compute_local_cid("hello world")

        assert cid.startswith("bafy"), "CID must use CIDv1-compatible 'bafy' prefix"
        assert len(cid) > 20, "CID should be at least 20 characters"

    def test_uniqueness(self):
        """Different inputs must produce different CIDs."""
        cid1 = compute_local_cid("input-a")
        cid2 = compute_local_cid("input-b")

        assert cid1 != cid2, "Different inputs should produce different CIDs"


# =============================================================================
# EVM Calldata Generation Tests
# =============================================================================

class TestGenerateEVMCalldata:
    """Tests for the Uniswap V2 ABI-encoded DEX swap calldata generator."""

    def test_buy_routes_to_incrementfi(self):
        """BUY action should route through the IncrementFi DEX router."""
        calldata, router = generate_evm_calldata("BUY", 100.0)

        assert router == "0x2A5Ade7d26c2F9C9eD59e19D642e5a8b6b3B9d5F"
        assert isinstance(calldata, str)
        assert calldata.startswith("0x"), "Calldata must be hex-encoded"

    def test_sell_routes_to_metapier(self):
        """SELL action should route through the Metapier DEX router."""
        calldata, router = generate_evm_calldata("SELL", 50.0)

        assert router == "0x7F4C61116729d5b27E5f734E8C92b2E5F0a0B3c1"
        assert isinstance(calldata, str)
        assert calldata.startswith("0x"), "Calldata must be hex-encoded"


# =============================================================================
# AI Signal Matrix Tests (Decision Engine)
# =============================================================================

class TestImpulseAIAnalyze:
    """Tests for the dual-signal (technicals + sentiment) decision matrix.

    Decision Matrix:
        ┌───────────┬───────────────┬───────────────┬───────────┐
        │           │ Positive News │ Neutral News  │ Neg News  │
        ├───────────┼───────────────┼───────────────┼───────────┤
        │ Bullish   │ BUY           │ BUY           │ HOLD      │
        │ Neutral   │ HOLD          │ HOLD          │ HOLD      │
        │ Bearish   │ HOLD          │ SELL          │ SELL      │
        └───────────┴───────────────┴───────────────┴───────────┘
    """

    def test_buy_on_bullish_positive(self):
        """Bullish technicals + positive sentiment → BUY signal."""
        market = {
            "symbol": "FLOW", "price": 0.04, "change_24h": -5.0,
            "rsi": 25.0, "trend": "bullish"
        }
        news = {
            "overall_sentiment": "positive",
            "headlines": ["Flow announces massive partnership", "Network activity ATH"]
        }

        signal = impulse_ai_analyze(market, news)

        assert signal["action"] == "BUY"
        assert signal["token"] == "FLOW"
        assert signal["price_snapshot"] == 0.04
        assert signal["news_sentiment"] == "positive"
        assert signal["evm_calldata"].startswith("0x")
        assert signal["dex_router"] == "0x2A5Ade7d26c2F9C9eD59e19D642e5a8b6b3B9d5F"
        assert "reasoning" in signal

    def test_sell_on_bearish_negative(self):
        """Bearish technicals + negative sentiment → SELL signal."""
        market = {
            "symbol": "FLOW", "price": 0.06, "change_24h": 15.0,
            "rsi": 75.0, "trend": "bearish"
        }
        news = {
            "overall_sentiment": "negative",
            "headlines": ["Flow network latency", "Whales moving to exchanges"]
        }

        signal = impulse_ai_analyze(market, news)

        assert signal["action"] == "SELL"
        assert signal["token"] == "FLOW"
        assert signal["price_snapshot"] == 0.06
        assert signal["news_sentiment"] == "negative"
        assert signal["evm_calldata"].startswith("0x")
        assert signal["dex_router"] == "0x7F4C61116729d5b27E5f734E8C92b2E5F0a0B3c1"
        assert "reasoning" in signal

    def test_hold_on_neutral_neutral(self):
        """Neutral technicals + neutral sentiment → HOLD signal."""
        market = {
            "symbol": "FLOW", "price": 0.05, "change_24h": 1.0,
            "rsi": 50.0, "trend": "neutral"
        }
        news = {
            "overall_sentiment": "neutral",
            "headlines": ["Crypto markets flat today", "Bitcoin stable around 60k"]
        }

        signal = impulse_ai_analyze(market, news)

        assert signal["action"] == "HOLD"
        assert signal["amount"] == 0.0
        assert signal["evm_calldata"] == "0x"
        assert signal["dex_router"] is None
