#!/usr/bin/env python3
"""
Quick Start Script - Generates minimal dataset and starts server immediately
This allows the backend to start without waiting for full dataset generation
"""

import pandas as pd
import numpy as np
from pathlib import Path
import sys

print("=" * 60)
print("AgriAI Backend - Quick Start")
print("=" * 60)
print()

# Create directories
data_dir = Path(__file__).parent / "data"
models_dir = Path(__file__).parent / "models"
data_dir.mkdir(exist_ok=True)
models_dir.mkdir(exist_ok=True)

# Check if dataset exists
dataset_path = data_dir / "agricultural_data.csv"

if not dataset_path.exists():
    print("📊 Generating minimal dataset (1,000 samples)...")
    print("   (You can generate full 500K dataset from Admin Dashboard)")
    print()
    
    # Generate minimal dataset for quick start
    np.random.seed(42)
    n_samples = 1000
    
    years = np.random.choice(range(2010, 2026), n_samples)
    months = np.random.choice(range(1, 13), n_samples)
    cities = np.random.choice(['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata'], n_samples)
    varieties = np.random.choice(['Guntur', 'Teja', 'Byadgi', 'Kashmiri'], n_samples)
    
    # Generate correlated features
    base_rainfall = np.random.uniform(20, 150, n_samples)
    base_arrivals = np.random.uniform(500, 5000, n_samples)
    
    # Price depends on rainfall (inverse) and arrivals (inverse)
    base_price = 25000 + (150 - base_rainfall) * 50 + (5000 - base_arrivals) * 2
    price = base_price + np.random.normal(0, 2000, n_samples)
    price = np.clip(price, 15000, 45000)
    
    temperature = np.random.uniform(15, 35, n_samples)
    
    df = pd.DataFrame({
        'year': years,
        'month': months,
        'city': cities,
        'variety': varieties,
        'rainfall': base_rainfall,
        'arrivals': base_arrivals,
        'temperature': temperature,
        'price': price
    })
    
    df.to_csv(dataset_path, index=False)
    print(f"✅ Minimal dataset created: {dataset_path}")
    print(f"   Samples: {len(df):,}")
    print()
else:
    print(f"✅ Dataset already exists: {dataset_path}")
    print()

# Check if models exist
rf_model = models_dir / "random_forest.pkl"
if not rf_model.exists():
    print("ℹ️  ML models not trained yet")
    print("   You can train models from Admin Dashboard")
    print("   The API will work with limited functionality")
    print()
else:
    print("✅ ML models already trained")
    print()

print("🚀 Starting API server...")
print("   API: http://localhost:8000")
print("   Docs: http://localhost:8000/docs")
print("   Admin: http://localhost:5173/admin")
print()
print("Press CTRL+C to stop the server")
print("=" * 60)
print()

# Start the server
import uvicorn
from app.main import app

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
