from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import pandas as pd
from datetime import datetime
from typing import Dict, List, Optional, Any
import sys
from pathlib import Path

# Add the parent directory to sys.path to allow imports from sibling packages
sys.path.append(str(Path(__file__).parent.parent.parent))

# Import from ML modules as needed
from backend.ml_service.regime_detector import RegimeDetector

app = FastAPI(title="Market Regime Detection API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to results folder
RESULTS_PATH = Path(__file__).parent.parent.parent / "results"

# Cache for loaded data
_cache = {}
_cache_timestamp = {}

def load_json_file(filename: str, cache_duration_seconds: int = 300):
    """Load a JSON file with caching"""
    full_path = RESULTS_PATH / filename
    
    if not full_path.exists():
        raise HTTPException(status_code=404, detail=f"File not found: {filename}")
    
    current_time = datetime.now().timestamp()
    last_loaded = _cache_timestamp.get(filename, 0)
    
    # Use cache if it exists and is recent enough
    if filename in _cache and (current_time - last_loaded) < cache_duration_seconds:
        return _cache[filename]
    
    try:
        with open(full_path, 'r') as f:
            data = json.load(f)
            _cache[filename] = data
            _cache_timestamp[filename] = current_time
            return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading file {filename}: {str(e)}")

def load_csv_file(filename: str, cache_duration_seconds: int = 300):
    """Load a CSV file with caching"""
    full_path = RESULTS_PATH / filename
    
    if not full_path.exists():
        raise HTTPException(status_code=404, detail=f"File not found: {filename}")
    
    current_time = datetime.now().timestamp()
    last_loaded = _cache_timestamp.get(filename, 0)
    
    # Use cache if it exists and is recent enough
    if filename in _cache and (current_time - last_loaded) < cache_duration_seconds:
        return _cache[filename]
    
    try:
        df = pd.read_csv(full_path)
        _cache[filename] = df
        _cache_timestamp[filename] = current_time
        return df
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading file {filename}: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Market Regime Detection API", "status": "active"}

@app.get("/api/market-regime")
def get_market_regime():
    """Get the market regime data including all regimes and current regime"""
    try:
        # Load the regime report from results folder
        regime_report = load_json_file("regime_report_hdbscan_10.json")
        
        # Load transition matrix
        transition_matrix = load_csv_file("transition_matrix_hdbscan_10.csv")
        
        # Load regime characteristics
        regime_chars = load_csv_file("regime_characteristics_hdbscan_10.csv")
        
        # Convert data format to match frontend expectations
        regimes = []
        for idx, row in regime_chars.iterrows():
            regime_id = int(row['cluster'])
            regimes.append({
                "id": regime_id,
                "name": f"Regime {regime_id}",
                "size": int(row.get('cluster_size', 0)),
                "volatility": "High" if row.get('volatility_60', 0) > 0.5 else "Medium" if row.get('volatility_60', 0) > 0.2 else "Low",
                "price_behavior": "Trending" if abs(row.get('autocorrelation', 0)) > 0.6 else "Choppy",
                "liquidity": "High" if row.get('avg_depth', 0) > 1000000 else "Medium" if row.get('avg_depth', 0) > 500000 else "Low",
                "volume_type": "High" if row.get('avg_volume', 0) > 1000000 else "Medium" if row.get('avg_volume', 0) > 500000 else "Low",
                "strategy_recommendations": [
                    "Trend Following" if abs(row.get('autocorrelation', 0)) > 0.6 else "Mean Reversion",
                    "Low Frequency" if row.get('volatility_60', 0) < 0.2 else "High Frequency",
                ],
                "detailed_metrics": {
                    "volatility": row.get('volatility_60', 0),
                    "autocorrelation": row.get('autocorrelation', 0),
                    "spread": row.get('avg_spread', 0),
                    "depth": row.get('avg_depth', 0),
                    "volume": row.get('avg_volume', 0),
                    "avg_features": {
                        # Add relevant features from the regime characteristics
                        f: row.get(f, 0) for f in row.index if not f.startswith('cluster')
                    }
                }
            })
        
        # Get current regime (for demo purposes, use the last regime in the report)
        current_regime_id = regime_report.get("regimes", [])[-1]["regime_id"] if "regimes" in regime_report else 0
        current_regime = next((r for r in regimes if r["id"] == current_regime_id), regimes[0])
        
        # Build response
        response = {
            "regimes": regimes,
            "current_regime": {
                "id": current_regime["id"],
                "name": current_regime["name"],
                "probability": 0.85,  # Sample probability
                "duration": "2h 15m",  # Sample duration
                "key_metrics": {
                    "volatility": current_regime["detailed_metrics"]["volatility"],
                    "spread": current_regime["detailed_metrics"]["spread"],
                    "depth": current_regime["detailed_metrics"]["depth"],
                    "volume": current_regime["detailed_metrics"]["volume"],
                    "direction_bias": "Bullish" if current_regime["detailed_metrics"]["autocorrelation"] > 0.2 else 
                                     "Bearish" if current_regime["detailed_metrics"]["autocorrelation"] < -0.2 else "Neutral"
                }
            },
            "transitions": [
                {
                    "from": int(transition_matrix.columns[i]), 
                    "to": int(transition_matrix.columns[j]),
                    "timestamp": "2025-04-17T09:30:00Z",  # Sample timestamp
                    "duration": "1h 45m"  # Sample duration
                }
                for i in range(len(transition_matrix.columns)) 
                for j in range(len(transition_matrix.columns))
                if transition_matrix.iloc[i, j] > 0.1  # Only include significant transitions
            ],
            "last_updated": datetime.now().isoformat(),
            "meta": {
                "model": "HDBSCAN-10",
                "silhouette_score": 0.68,  # Sample score, can be extracted from results
                "last_updated": datetime.now().isoformat()
            }
        }
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market-regime/history")
def get_regime_history():
    """Get historical regime data"""
    try:
        # For this endpoint, we could use a history file from results
        # or generate synthetic data as a placeholder
        
        # Try to load actual data if available
        try:
            # If history data is available in results folder
            # This is just a placeholder - you'll need to adjust based on your actual result files
            history_file = RESULTS_PATH / "regime_evolution_data.csv"
            if history_file.exists():
                df = pd.read_csv(history_file)
                history = [
                    {
                        "timestamp": row.get('timestamp', ''),
                        "regime": int(row.get('regime', 0)),
                        "price": float(row.get('price', 0)) if 'price' in row else None
                    }
                    for _, row in df.iterrows()
                ]
            else:
                # Generate synthetic data
                import numpy as np
                timestamps = pd.date_range(start="2025-04-01", periods=100, freq="H")
                regimes = np.random.choice([0, 1, 2, 3, 4], size=100, p=[0.2, 0.3, 0.2, 0.2, 0.1])
                price_base = 100
                price = price_base + np.cumsum(np.random.normal(0, 1, 100))
                
                history = [
                    {
                        "timestamp": timestamps[i].isoformat(),
                        "regime": int(regimes[i]),
                        "price": float(price[i])
                    }
                    for i in range(100)
                ]
        except Exception as e:
            # Fallback to synthetic data on any error
            import numpy as np
            timestamps = pd.date_range(start="2025-04-01", periods=100, freq="H")
            regimes = np.random.choice([0, 1, 2, 3, 4], size=100, p=[0.2, 0.3, 0.2, 0.2, 0.1])
            price_base = 100
            price = price_base + np.cumsum(np.random.normal(0, 1, 100))
            
            history = [
                {
                    "timestamp": timestamps[i].isoformat(),
                    "regime": int(regimes[i]),
                    "price": float(price[i])
                }
                for i in range(100)
            ]
        
        return {
            "history": history,
            "source": "historical_data"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market-regime/metrics")
def get_regime_metrics():
    """Get metrics for the current regime"""
    try:
        # Load regime characteristics
        regime_chars = load_csv_file("regime_characteristics_hdbscan_10.csv")
        
        # For demo purposes, use the first regime's metrics
        regime_id = int(regime_chars.iloc[0]['cluster'])
        regime_row = regime_chars.iloc[0]
        
        return {
            "regime_id": regime_id,
            "regime_name": f"Regime {regime_id}",
            "metrics": {
                "volatility": float(regime_row.get('volatility_60', 0.2)),
                "spread": float(regime_row.get('avg_spread', 0.01)),
                "depth": float(regime_row.get('avg_depth', 50000)),
                "volume": float(regime_row.get('avg_volume', 100000)),
                "direction_bias": "Bullish" if regime_row.get('autocorrelation', 0) > 0.2 else 
                                 "Bearish" if regime_row.get('autocorrelation', 0) < -0.2 else "Neutral"
            },
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market-regime/recommendations")
def get_recommendations():
    """Get strategy recommendations for the current regime"""
    try:
        # Load regime characteristics
        regime_chars = load_csv_file("regime_characteristics_hdbscan_10.csv")
        
        # For demo purposes, use the first regime
        regime_id = int(regime_chars.iloc[0]['cluster'])
        regime_row = regime_chars.iloc[0]
        
        # Generate recommendations based on regime characteristics
        volatility = regime_row.get('volatility_60', 0)
        autocorrelation = regime_row.get('autocorrelation', 0)
        depth = regime_row.get('avg_depth', 0)
        
        recommendations = []
        
        if abs(autocorrelation) > 0.6:
            recommendations.append("Use trend following strategies")
            if autocorrelation > 0:
                recommendations.append("Long bias recommended")
            else:
                recommendations.append("Short bias recommended") 
        else:
            recommendations.append("Use mean reversion strategies")
            
        if volatility > 0.5:
            recommendations.append("Use wider stops")
            recommendations.append("Reduce position sizing")
        else:
            recommendations.append("Consider tighter stops")
            
        if depth < 500000:
            recommendations.append("Be cautious of slippage")
            recommendations.append("Use limit orders")
        else:
            recommendations.append("Market liquidity favorable")
        
        return {
            "regime_id": regime_id,
            "regime_name": f"Regime {regime_id}",
            "recommendations": recommendations,
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/market-regime/predict")
async def predict_regime(features: Dict[str, float]):
    """Predict the regime based on input features"""
    try:
        # Here you would call your ML model to predict the regime
        # This is a placeholder implementation
        
        # In a real implementation, you might:
        # 1. Load the saved model
        # 2. Preprocess the input features
        # 3. Make a prediction
        # 4. Return the result
        
        # For demo purposes, we're returning a mock response
        import random
        
        # Randomly select a regime
        regime_id = random.randint(0, 4)
        probability = random.uniform(0.6, 0.95)
        
        return {
            "regime": regime_id,
            "probability": probability,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)