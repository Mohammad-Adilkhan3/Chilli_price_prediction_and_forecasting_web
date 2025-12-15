#!/bin/bash

# AgriAI Backend Quick Start Script

echo "=========================================="
echo "AgriAI Backend - Quick Start"
echo "=========================================="
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
  echo "📦 Creating virtual environment..."
  python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if dataset exists
if [ ! -f "data/agricultural_data.csv" ]; then
  echo ""
  echo "📊 Generating dataset (100,000+ samples)..."
  python scripts/generate_dataset.py
fi

# Check if models exist
if [ ! -f "models/random_forest.pkl" ]; then
  echo ""
  echo "🤖 Training ML models..."
  python scripts/train_models.py
fi

# Start server
echo ""
echo "🚀 Starting API server..."
echo "   API: http://localhost:8000"
echo "   Docs: http://localhost:8000/docs"
echo ""
python -m app.main
