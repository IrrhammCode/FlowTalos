import pytest
from main import compute_local_cid, generate_evm_calldata, impulse_ai_analyze

def test_compute_local_cid():
    # Test that the Python local CID fallback generates a consistent SHA-256 hash
    test_data = "hello world"
    cid1 = compute_local_cid(test_data)
    cid2 = compute_local_cid(test_data)
    
    assert cid1 == cid2
    assert cid1.startswith("bafy") # CIDv1 base32 prefix
    assert len(cid1) > 20

def test_generate_evm_calldata_buy():
    # Test BUY action (USDC -> FLOW)
    amount = 100.0
    calldata, router = generate_evm_calldata("BUY", amount)
    
    assert router == "0x2A5Ade7d26c2F9C9eD59e19D642e5a8b6b3B9d5F" # IncrementFi Router
    assert isinstance(calldata, str)
    assert calldata.startswith("0x")

def test_generate_evm_calldata_sell():
    # Test SELL action (FLOW -> USDC)
    amount = 50.0
    calldata, router = generate_evm_calldata("SELL", amount)
    
    assert router == "0x7F4C61116729d5b27E5f734E8C92b2E5F0a0B3c1" # Metapier Router
    assert isinstance(calldata, str)
    assert calldata.startswith("0x")

def test_impulse_ai_analyze_buy_signal():
    # Mock data that should trigger a BUY signal
    market_data = {
        "symbol": "FLOW",
        "price": 0.04,
        "change_24h": -5.0, # Price dropped
        "rsi": 25.0, # Oversold
        "trend": "bullish"
    }
    news_data = {
        "overall_sentiment": "positive",
        "headlines": ["Flow announces new massive partnership", "Network activity hits all time high"]
    }
    
    signal = impulse_ai_analyze(market_data, news_data)
    
    assert signal["action"] == "BUY"
    assert signal["token"] == "FLOW"
    assert signal["price_snapshot"] == 0.04
    assert signal["news_sentiment"] == "positive"
    assert "reasoning" in signal
    
    # EVM Calldata should be attached for BUY
    assert signal["evm_calldata"].startswith("0x")
    assert signal["dex_router"] == "0x2A5Ade7d26c2F9C9eD59e19D642e5a8b6b3B9d5F"

def test_impulse_ai_analyze_sell_signal():
    # Mock data that should trigger a SELL signal
    market_data = {
        "symbol": "FLOW",
        "price": 0.06,
        "change_24h": 15.0, # Price surged
        "rsi": 75.0, # Overbought
        "trend": "bearish"
    }
    news_data = {
        "overall_sentiment": "negative",
        "headlines": ["Flow network experiences minor latency", "Whales moving tokens to exchanges"]
    }
    
    signal = impulse_ai_analyze(market_data, news_data)
    
    assert signal["action"] == "SELL"
    assert signal["token"] == "FLOW"
    assert signal["price_snapshot"] == 0.06
    assert signal["news_sentiment"] == "negative"
    assert "reasoning" in signal
    
    # EVM Calldata should be attached for SELL
    assert signal["evm_calldata"].startswith("0x")
    assert signal["dex_router"] == "0x7F4C61116729d5b27E5f734E8C92b2E5F0a0B3c1"

def test_impulse_ai_analyze_hold_signal():
    # Mock data that should trigger a HOLD signal
    market_data = {
        "symbol": "FLOW",
        "price": 0.05,
        "change_24h": 1.0, # Stable
        "rsi": 50.0, # Neutral
        "trend": "neutral"
    }
    news_data = {
        "overall_sentiment": "neutral",
        "headlines": ["Crypto markets flat today", "Bitcoin stable around 60k"]
    }
    
    signal = impulse_ai_analyze(market_data, news_data)
    
    assert signal["action"] == "HOLD"
    assert signal["amount"] == 0.0
    assert signal["evm_calldata"] == "0x"
    assert signal["dex_router"] is None
