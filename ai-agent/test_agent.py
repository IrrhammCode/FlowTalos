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

    def test_hold_on_bullish_negative_conflict(self):
        """Signal conflict: Bullish technicals + negative sentiment → HOLD (preserves capital)."""
        market = {
            "symbol": "FLOW", "price": 0.03, "change_24h": -8.0,
            "rsi": 20.0, "trend": "bullish"
        }
        news = {
            "overall_sentiment": "negative",
            "headlines": ["Flow hacked!", "Major exploit discovered"]
        }

        signal = impulse_ai_analyze(market, news)

        assert signal["action"] == "HOLD"
        assert signal["amount"] == 0.0
        assert "Signal Conflict" in signal["reasoning"]

    def test_hold_on_bearish_positive_conflict(self):
        """Signal conflict: Bearish technicals + positive sentiment → HOLD (ride catalyst)."""
        market = {
            "symbol": "FLOW", "price": 0.08, "change_24h": 20.0,
            "rsi": 90.0, "trend": "bearish"
        }
        news = {
            "overall_sentiment": "positive",
            "headlines": ["Flow partners with Google Cloud", "Flow TVL hits $1B"]
        }

        signal = impulse_ai_analyze(market, news)

        assert signal["action"] == "HOLD"
        assert signal["amount"] == 0.0
        assert "Signal Conflict" in signal["reasoning"]


# =============================================================================
# Fallback Function Tests
# =============================================================================

class TestFallbackFunctions:
    """Tests for the security-critical fallback functions."""

    def test_fallback_cid_deterministic(self):
        """Fallback CID must be deterministic for the same input."""
        from main import _storacha_fallback_cid
        cid1 = _storacha_fallback_cid('{"test": 1}', "test reason")
        cid2 = _storacha_fallback_cid('{"test": 1}', "test reason")
        assert cid1 == cid2

    def test_fallback_signature_format(self):
        """Fallback signature must be 0x-prefixed hex of correct length."""
        from main import _generate_fallback_signature
        sig = _generate_fallback_signature('{"action":"BUY"}', "test")
        assert sig.startswith("0x")
        assert len(sig) == 68  # 0x + 64 SHA-256 hex + 2 verification chars

    def test_fallback_signature_deterministic(self):
        """Same payload must produce same fallback signature."""
        from main import _generate_fallback_signature
        sig1 = _generate_fallback_signature('{"action":"BUY"}', "test")
        sig2 = _generate_fallback_signature('{"action":"BUY"}', "test")
        assert sig1 == sig2


# =============================================================================
# Security Tests
# =============================================================================

class TestSecurityGuards:
    """Tests for security hardening measures."""

    def test_symbol_whitelist_allows_flow(self):
        """The 'flow' symbol should pass the whitelist check."""
        from main import ALLOWED_SYMBOLS
        assert "flow" in ALLOWED_SYMBOLS

    def test_symbol_whitelist_blocks_injection(self):
        """Malicious symbol strings should not be in the whitelist."""
        from main import ALLOWED_SYMBOLS
        assert "flow&inject=true" not in ALLOWED_SYMBOLS
        assert "../etc/passwd" not in ALLOWED_SYMBOLS

    def test_sanitized_env_excludes_secrets(self):
        """Sanitized env should NOT forward dangerous keys."""
        import os
        os.environ["AWS_SECRET_KEY"] = "super_secret"
        os.environ["OPENAI_API_KEY"] = "sk-test"

        from main import _sanitize_env_for_subprocess
        safe_env = _sanitize_env_for_subprocess()

        assert "AWS_SECRET_KEY" not in safe_env
        assert "OPENAI_API_KEY" not in safe_env
        assert "PATH" in safe_env

        # Cleanup
        del os.environ["AWS_SECRET_KEY"]
        del os.environ["OPENAI_API_KEY"]

