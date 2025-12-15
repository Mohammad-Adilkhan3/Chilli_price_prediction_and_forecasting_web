"""
Simple API Tests
Test the backend API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"


def test_health():
  """Test health check endpoint"""
  print("🔍 Testing /health endpoint...")
  
  response = requests.get(f"{BASE_URL}/health")
  
  if response.status_code == 200:
    data = response.json()
    print(f"✅ Health check passed!")
    print(f"   Status: {data['status']}")
    print(f"   Models loaded: {len(data['models_loaded'])}")
  else:
    print(f"❌ Health check failed: {response.status_code}")


def test_predict():
  """Test prediction endpoint"""
  print("\n🔍 Testing /api/predict endpoint...")
  
  payload = {
    "year": 2025,
    "month": 3,
    "city": "Bangalore",
    "variety": "Guntur",
    "model": "random_forest",
    "arrivals": 2100,
    "rainfall": 45.2,
    "temperature": 28.5
  }
  
  response = requests.post(
    f"{BASE_URL}/api/predict",
    json=payload
  )
  
  if response.status_code == 200:
    data = response.json()
    print(f"✅ Prediction successful!")
    print(f"   Predicted Price: ₹{data['predicted_price']:.2f}")
    print(f"   Confidence: {data['confidence']}%")
    print(f"   Model: {data['model_used']}")
    print(f"   Accuracy: {data['accuracy']}%")
  else:
    print(f"❌ Prediction failed: {response.status_code}")
    print(f"   Error: {response.text}")


def test_insights():
  """Test insights endpoint"""
  print("\n🔍 Testing /api/insights endpoint...")
  
  response = requests.get(
    f"{BASE_URL}/api/insights",
    params={
      "city": "Bangalore",
      "variety": "Guntur",
      "month": 3
    }
  )
  
  if response.status_code == 200:
    data = response.json()
    print(f"✅ Insights retrieved!")
    print(f"   Insights: {len(data['insights'])}")
    print(f"   Risk Alerts: {len(data['risk_alerts'])}")
  else:
    print(f"❌ Insights failed: {response.status_code}")


def test_models():
  """Test models endpoint"""
  print("\n🔍 Testing /api/models endpoint...")
  
  response = requests.get(f"{BASE_URL}/api/models")
  
  if response.status_code == 200:
    data = response.json()
    print(f"✅ Models retrieved!")
    print(f"   Total models: {len(data)}")
    for model in data:
      print(f"   - {model['name']}: {model['accuracy']}% accuracy")
  else:
    print(f"❌ Models failed: {response.status_code}")


def main():
  """Run all tests"""
  print("=" * 60)
  print("AgriAI Backend API Tests")
  print("=" * 60)
  print(f"\nTesting API at: {BASE_URL}")
  print("Make sure the server is running: python -m app.main")
  print()
  
  try:
    test_health()
    test_predict()
    test_insights()
    test_models()
    
    print("\n" + "=" * 60)
    print("✨ All tests completed!")
    print("=" * 60)
  
  except requests.exceptions.ConnectionError:
    print("\n❌ Connection Error!")
    print("   Make sure the API server is running:")
    print("   python -m app.main")
  except Exception as e:
    print(f"\n❌ Test failed: {e}")


if __name__ == "__main__":
  main()
