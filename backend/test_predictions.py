"""
Test Price Predictions
Verify that predictions are in the correct price range (₹28,000-₹30,000)
"""
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent))

from app.ml_models import model_manager

def test_predictions():
  """Test predictions for different scenarios"""
  
  print("=" * 70)
  print("AgriAI - Price Prediction Test")
  print("=" * 70)
  print()
  
  # Test scenarios
  test_cases = [
    {
      "name": "Guntur variety in Bangalore (January)",
      "model": "random_forest",
      "year": 2025,
      "month": 1,
      "city": "Bangalore",
      "variety": "Guntur",
      "arrivals": 2000,
      "rainfall": 50,
      "temperature": 28
    },
    {
      "name": "Guntur variety in Mumbai (June - Monsoon)",
      "model": "random_forest",
      "year": 2025,
      "month": 6,
      "city": "Mumbai",
      "variety": "Guntur",
      "arrivals": 2500,
      "rainfall": 150,
      "temperature": 30
    },
    {
      "name": "Byadgi variety in Delhi (December)",
      "model": "random_forest",
      "year": 2025,
      "month": 12,
      "city": "Delhi",
      "variety": "Byadgi",
      "arrivals": 1800,
      "rainfall": 20,
      "temperature": 18
    },
    {
      "name": "Kashmiri variety in Chennai (March)",
      "model": "random_forest",
      "year": 2025,
      "month": 3,
      "city": "Chennai",
      "variety": "Kashmiri",
      "arrivals": 2200,
      "rainfall": 40,
      "temperature": 32
    },
    {
      "name": "Low arrivals scenario (High price expected)",
      "model": "random_forest",
      "year": 2025,
      "month": 4,
      "city": "Bangalore",
      "variety": "Guntur",
      "arrivals": 1000,  # Very low arrivals
      "rainfall": 20,    # Low rainfall
      "temperature": 28
    },
    {
      "name": "High arrivals scenario (Lower price expected)",
      "model": "random_forest",
      "year": 2025,
      "month": 8,
      "city": "Guntur",
      "variety": "Guntur",
      "arrivals": 3500,  # High arrivals
      "rainfall": 180,   # High rainfall
      "temperature": 26
    }
  ]
  
  print("Testing Random Forest predictions...\n")
  
  all_prices = []
  
  for i, test_case in enumerate(test_cases, 1):
    name = test_case.pop("name")
    model_key = test_case.pop("model")
    result = model_manager.predict(model_key, **test_case)
    
    price = result["predicted_price"]
    all_prices.append(price)
    
    print(f"Test {i}: {name}")
    print(f"  Predicted Price: ₹{price:,.2f}")
    print(f"  Confidence: {result['confidence']}%")
    print(f"  Model: {result['model_used']}")
    print(f"  MAE: {result['mae']}")
    print(f"  R² Score: {result['r2_score']}")
    print()
  
  # Summary
  print("=" * 70)
  print("SUMMARY")
  print("=" * 70)
  print(f"Total tests: {len(all_prices)}")
  print(f"Minimum price: ₹{min(all_prices):,.2f}")
  print(f"Maximum price: ₹{max(all_prices):,.2f}")
  print(f"Average price: ₹{sum(all_prices)/len(all_prices):,.2f}")
  print()
  
  # Validation
  expected_min = 25000
  expected_max = 40000
  
  if min(all_prices) < expected_min:
    print(f"⚠️  WARNING: Minimum price (₹{min(all_prices):,.2f}) is below expected range (₹{expected_min:,})")
  elif max(all_prices) > expected_max:
    print(f"⚠️  WARNING: Maximum price (₹{max(all_prices):,.2f}) is above expected range (₹{expected_max:,})")
  else:
    print(f"✅ All prices are within expected range (₹{expected_min:,} - ₹{expected_max:,})")
  
  # Check if prices are in the correct range for Guntur variety
  guntur_prices = [all_prices[0], all_prices[1], all_prices[4], all_prices[5]]
  guntur_avg = sum(guntur_prices) / len(guntur_prices)
  
  print()
  print(f"Guntur variety average: ₹{guntur_avg:,.2f}")
  
  if 27000 <= guntur_avg <= 31000:
    print("✅ Guntur prices are in the correct range (₹27,000 - ₹31,000)")
  else:
    print(f"❌ ERROR: Guntur prices are OUT OF RANGE! Expected ₹27,000-₹31,000, got ₹{guntur_avg:,.2f}")
  
  print()
  print("=" * 70)
  print("Test complete!")
  print("=" * 70)

if __name__ == "__main__":
  test_predictions()
