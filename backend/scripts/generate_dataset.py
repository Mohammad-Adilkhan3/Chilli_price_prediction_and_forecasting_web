"""
Generate Sample Agricultural Dataset
Creates 500,000+ sample records for model training
High-quality dataset with comprehensive coverage of all scenarios
"""
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from pathlib import Path

# Configuration
NUM_SAMPLES = 145152  # Match frontend dataset size (21 years × 12 months × 24 cities × 12 varieties × 2 samples)
START_DATE = datetime(2005, 1, 1)
END_DATE = datetime(2025, 12, 31)

# Markets and varieties (match frontend exactly)
MARKETS = [
  'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi'
]
VARIETIES = [
  'Guntur', 'Teja', 'Byadgi', 'Kashmiri', 'Sannam', 'Wonder Hot',
  'Pusa Jwala', 'Bhut Jolokia', 'Kanthari', 'Dhani', 'Reshampatti', 'Ellachipur'
]

# Base prices for different varieties (₹ per quintal) - match frontend realistic range
BASE_PRICES = {
  "Guntur": 24000,
  "Teja": 25200,
  "Byadgi": 24720,
  "Kashmiri": 25920,
  "Sannam": 23520,
  "Wonder Hot": 24480,
  "Pusa Jwala": 24960,
  "Bhut Jolokia": 26400,
  "Kanthari": 24960,
  "Dhani": 23760,
  "Reshampatti": 24720,
  "Ellachipur": 24240
}

def generate_dataset(num_samples: int = NUM_SAMPLES) -> pd.DataFrame:
  """Generate synthetic agricultural dataset"""
  
  print(f"🌾 Generating {num_samples:,} agricultural data samples...")
  
  data = []
  date_range = (END_DATE - START_DATE).days
  
  for i in range(num_samples):
    # Random date between start and end
    random_days = random.randint(0, date_range)
    date = START_DATE + timedelta(days=random_days)
    
    # Random market and variety
    market = random.choice(MARKETS)
    variety = random.choice(VARIETIES)
    
    # Base price for variety
    base_price = BASE_PRICES[variety]
    
    # Month for seasonal patterns
    month = date.month
    
    # Seasonal factor (higher prices in winter, lower in monsoon)
    seasonal_factor = np.sin((month / 12) * np.pi * 2) * 0.08
    
    # Year trend (gradual increase over years)
    year_factor = (date.year - 2010) / 15 * 0.1
    
    # Arrivals (quintals) - affects price inversely
    arrivals = np.random.normal(2000, 400)
    arrivals = max(500, min(arrivals, 4000))  # Clamp between 500-4000
    arrivals_factor = (2500 - arrivals) / 2500 * 0.08
    
    # Rainfall (mm) - affects price inversely
    # More rain in monsoon months (June-September)
    if month in [6, 7, 8, 9]:
      rainfall = np.random.normal(150, 50)
    else:
      rainfall = np.random.normal(30, 20)
    rainfall = max(0, min(rainfall, 300))  # Clamp between 0-300
    rainfall_factor = (100 - rainfall) / 100 * 0.05
    
    # Temperature (°C) - seasonal variation
    base_temp = 25
    temp_seasonal = np.sin((month / 12) * np.pi * 2) * 5
    temperature = base_temp + temp_seasonal + np.random.normal(0, 2)
    temperature = max(15, min(temperature, 40))  # Clamp between 15-40
    
    # Market factor (some markets have premium prices) - match frontend
    market_factors = {
      'Bangalore': 0.02,
      'Mumbai': 0.04,
      'Delhi': 0.03,
      'Chennai': 0.0,
      'Kolkata': -0.01,
      'Hyderabad': 0.01,
      'Pune': 0.02,
      'Ahmedabad': 0.02,
      'Jaipur': 0.01,
      'Lucknow': -0.01,
      'Kanpur': -0.02,
      'Nagpur': 0.0,
      'Indore': 0.01,
      'Bhopal': -0.01,
      'Visakhapatnam': 0.02,
      'Patna': -0.02,
      'Vadodara': 0.01,
      'Ludhiana': 0.03,
      'Agra': -0.01,
      'Nashik': 0.0,
      'Faridabad': 0.02,
      'Meerut': -0.01,
      'Rajkot': 0.01,
      'Varanasi': -0.02
    }
    market_factor = market_factors.get(market, 0)
    
    # Random noise
    noise = np.random.normal(0, 0.03)
    
    # Calculate final price
    total_factor = (
      1 + seasonal_factor + year_factor + arrivals_factor + 
      rainfall_factor + market_factor + noise
    )
    price = base_price * total_factor
    price = max(20000, min(30000, price))  # Realistic price range 20k-30k
    
    # Round values
    price = round(price, 2)
    arrivals = round(arrivals, 0)
    rainfall = round(rainfall, 1)
    temperature = round(temperature, 1)
    
    # Append record
    data.append({
      "date": date.strftime("%Y-%m-%d"),
      "city": market,  # Changed from "market" to "city" to match frontend
      "variety": variety,
      "price": price,
      "arrivals": arrivals,
      "rainfall": rainfall,
      "temperature": temperature,
      "month": month,
      "year": date.year
    })
    
    # Progress indicator
    if (i + 1) % 10000 == 0:
      print(f"  ✓ Generated {i + 1:,} samples...")
  
  # Create DataFrame
  df = pd.DataFrame(data)
  
  print(f"\n✅ Dataset generated successfully!")
  print(f"   Total samples: {len(df):,}")
  print(f"   Date range: {df['date'].min()} to {df['date'].max()}")
  print(f"   Cities: {df['city'].nunique()}")
  print(f"   Varieties: {df['variety'].nunique()}")
  print(f"   Price range: ₹{df['price'].min():.2f} - ₹{df['price'].max():.2f}")
  
  return df


def save_dataset(df: pd.DataFrame, filename: str = "agricultural_data.csv"):
  """Save dataset to CSV file"""
  
  # Get data directory
  data_dir = Path(__file__).parent.parent / "data"
  data_dir.mkdir(parents=True, exist_ok=True)
  
  filepath = data_dir / filename
  
  # Save to CSV
  df.to_csv(filepath, index=False)
  
  print(f"\n💾 Dataset saved to: {filepath}")
  print(f"   File size: {filepath.stat().st_size / 1024 / 1024:.2f} MB")
  
  return filepath


def main():
  """Main function to generate and save dataset"""
  
  print("=" * 60)
  print("AgriAI Dataset Generator")
  print("=" * 60)
  print()
  
  # Generate dataset
  df = generate_dataset(NUM_SAMPLES)
  
  # Save dataset
  filepath = save_dataset(df)
  
  # Display sample data
  print("\n📊 Sample Data (first 5 rows):")
  print(df.head().to_string())
  
  print("\n📈 Dataset Statistics:")
  print(df.describe().to_string())
  
  print("\n" + "=" * 60)
  print("✨ Dataset generation complete!")
  print("=" * 60)


if __name__ == "__main__":
  main()
