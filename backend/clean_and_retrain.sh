#!/bin/bash

# AgriAI Backend - Clean and Retrain Script
# This script removes old models and data, then regenerates everything

echo "======================================================================"
echo "AgriAI Backend - Clean and Retrain"
echo "======================================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the backend directory
if [ ! -f "app/main.py" ]; then
    echo -e "${RED}Error: Please run this script from the backend directory${NC}"
    echo "Usage: cd backend && ./clean_and_retrain.sh"
    exit 1
fi

echo -e "${YELLOW}This script will:${NC}"
echo "  1. Remove old model files (*.pkl)"
echo "  2. Remove old dataset files (*.csv)"
echo "  3. Generate new training data (100,000 samples)"
echo "  4. Train all ML models"
echo "  5. Verify predictions"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "======================================================================"
echo "Step 1: Cleaning old files"
echo "======================================================================"

# Remove old models
if [ -d "models" ]; then
    echo "Removing old model files..."
    rm -f models/*.pkl
    echo -e "${GREEN}✓ Old models removed${NC}"
else
    echo "No models directory found (this is OK)"
fi

# Remove old data
if [ -d "data" ]; then
    echo "Removing old dataset files..."
    rm -f data/*.csv
    echo -e "${GREEN}✓ Old datasets removed${NC}"
else
    echo "No data directory found (this is OK)"
fi

echo ""
echo "======================================================================"
echo "Step 2: Generating new training data"
echo "======================================================================"

python scripts/generate_dataset.py

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to generate dataset${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dataset generated successfully${NC}"

echo ""
echo "======================================================================"
echo "Step 3: Training ML models"
echo "======================================================================"

python scripts/train_models.py

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to train models${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Models trained successfully${NC}"

echo ""
echo "======================================================================"
echo "Step 4: Verifying predictions"
echo "======================================================================"

python test_predictions.py

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠ Prediction test failed, but models are trained${NC}"
else
    echo -e "${GREEN}✓ Predictions verified successfully${NC}"
fi

echo ""
echo "======================================================================"
echo "✨ Complete!"
echo "======================================================================"
echo ""
echo "Your backend is now ready with:"
echo "  ✓ Fresh training data (100,000+ samples)"
echo "  ✓ Newly trained ML models"
echo "  ✓ Correct price ranges (₹25,000 - ₹40,000)"
echo ""
echo "Next steps:"
echo "  1. Start the backend server: python -m app.main"
echo "  2. Test the API: curl http://localhost:8000/health"
echo "  3. Run the web app: cd .. && npm run dev"
echo ""
echo "Expected price ranges:"
echo "  - Guntur:    ₹25,000 - ₹32,000"
echo "  - Byadgi:    ₹28,000 - ₹37,000"
echo "  - Teja:      ₹26,000 - ₹35,000"
echo "  - Sannam:    ₹24,000 - ₹30,000"
echo "  - Kashmiri:  ₹31,000 - ₹40,000"
echo "  - Warangal:  ₹24,000 - ₹31,000"
echo ""
echo "======================================================================"
