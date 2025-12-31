"""
Train Machine Learning Models
Trains Random Forest, XGBoost, and Linear Regression models
Enhanced for 500,000+ training samples with optimized hyperparameters
"""
import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor
import warnings
warnings.filterwarnings('ignore')


class ModelTrainer:
  """Train and evaluate ML models for price prediction"""
  
  def __init__(self, data_path: str):
    self.data_path = Path(data_path)
    self.df = None
    self.X_train = None
    self.X_test = None
    self.y_train = None
    self.y_test = None
    self.models = {}
    self.encoders = {}
    self.results = {}
  
  def load_data(self):
    """Load dataset from CSV"""
    print(f"📂 Loading dataset from: {self.data_path}")
    
    if not self.data_path.exists():
      raise FileNotFoundError(f"Dataset not found: {self.data_path}")
    
    self.df = pd.read_csv(self.data_path)
    print(f"✓ Loaded {len(self.df):,} samples")
    print(f"  Columns: {list(self.df.columns)}")
    
    return self
  
  def preprocess_data(self):
    """Preprocess data and create features"""
    print("\n🔧 Preprocessing data...")
    
    # Create label encoders for categorical variables
    self.encoders["city"] = {
      city: idx for idx, city in enumerate(self.df["city"].unique())
    }
    self.encoders["variety"] = {
      variety: idx for idx, variety in enumerate(self.df["variety"].unique())
    }
    
    # Encode categorical features
    self.df["city_encoded"] = self.df["city"].map(self.encoders["city"])
    self.df["variety_encoded"] = self.df["variety"].map(self.encoders["variety"])
    
    # Select features
    feature_columns = [
      "arrivals",
      "rainfall",
      "temperature",
      "month",
      "city_encoded",
      "variety_encoded"
    ]
    
    X = self.df[feature_columns]
    y = self.df["price"]
    
    # Train-test split (80-20)
    self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
      X, y, test_size=0.2, random_state=42
    )
    
    print(f"✓ Training samples: {len(self.X_train):,}")
    print(f"✓ Testing samples: {len(self.X_test):,}")
    print(f"✓ Features: {feature_columns}")
    
    return self
  
  def train_random_forest(self):
    """Train Random Forest model with enhanced parameters for 500K+ samples"""
    print("\n🌲 Training Random Forest...")
    print("  Using 200 estimators for better accuracy with large dataset...")
    
    model = RandomForestRegressor(
      n_estimators=200,      # Increased from 100 to 200 for better accuracy
      max_depth=25,          # Increased from 20 to 25 for deeper trees
      min_samples_split=5,
      min_samples_leaf=2,
      max_features='sqrt',   # Added for better generalization
      random_state=42,
      n_jobs=-1,
      verbose=1              # Show progress during training
    )
    
    model.fit(self.X_train, self.y_train)
    self.models["random_forest"] = model
    
    # Evaluate
    y_pred = model.predict(self.X_test)
    self.results["random_forest"] = self._evaluate_model(y_pred, "Random Forest")
    
    print("✓ Random Forest trained successfully")
    
    return self
  
  def train_xgboost(self):
    """Train XGBoost model with enhanced parameters for 500K+ samples"""
    print("\n🚀 Training XGBoost...")
    print("  Using 200 estimators for better accuracy with large dataset...")
    
    model = XGBRegressor(
      n_estimators=200,      # Increased from 100 to 200
      max_depth=12,          # Increased from 10 to 12 for deeper trees
      learning_rate=0.1,
      subsample=0.8,         # Added for better generalization
      colsample_bytree=0.8,  # Added for better generalization
      random_state=42,
      n_jobs=-1,
      verbosity=1            # Show progress during training
    )
    
    model.fit(self.X_train, self.y_train)
    self.models["xgboost"] = model
    
    # Evaluate
    y_pred = model.predict(self.X_test)
    self.results["xgboost"] = self._evaluate_model(y_pred, "XGBoost")
    
    print("✓ XGBoost trained successfully")
    
    return self
  
  def train_linear_regression(self):
    """Train Linear Regression model"""
    print("\n📈 Training Linear Regression...")
    
    model = LinearRegression()
    
    model.fit(self.X_train, self.y_train)
    self.models["linear_regression"] = model
    
    # Evaluate
    y_pred = model.predict(self.X_test)
    self.results["linear_regression"] = self._evaluate_model(y_pred, "Linear Regression")
    
    print("✓ Linear Regression trained successfully")
    
    return self
  
  def _evaluate_model(self, y_pred, model_name: str) -> dict:
    """Evaluate model performance"""
    mae = mean_absolute_error(self.y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(self.y_test, y_pred))
    r2 = r2_score(self.y_test, y_pred)
    accuracy = r2 * 100
    
    print(f"\n  📊 {model_name} Performance:")
    print(f"     Accuracy: {accuracy:.2f}%")
    print(f"     MAE: {mae:.2f}")
    print(f"     RMSE: {rmse:.2f}")
    print(f"     R² Score: {r2:.4f}")
    
    return {
      "accuracy": accuracy,
      "mae": mae,
      "rmse": rmse,
      "r2_score": r2
    }
  
  def save_models(self, output_dir: str = None):
    """Save trained models and encoders"""
    if output_dir is None:
      output_dir = Path(__file__).parent.parent / "data" / "models"
    else:
      output_dir = Path(output_dir)
    
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"\n💾 Saving models to: {output_dir}")
    
    # Save each model
    for model_name, model in self.models.items():
      filepath = output_dir / f"{model_name}.pkl"
      joblib.dump(model, filepath)
      print(f"  ✓ Saved {model_name}.pkl")
    
    # Save encoders
    encoder_path = output_dir / "encoders.pkl"
    joblib.dump(self.encoders, encoder_path)
    print(f"  ✓ Saved encoders.pkl")
    
    print("\n✅ All models saved successfully!")
    
    return self
  
  def print_summary(self):
    """Print training summary"""
    print("\n" + "=" * 60)
    print("📊 TRAINING SUMMARY")
    print("=" * 60)
    
    print(f"\nDataset: {len(self.df):,} samples")
    print(f"Training: {len(self.X_train):,} samples")
    print(f"Testing: {len(self.X_test):,} samples")
    
    print("\n🏆 Model Performance Comparison:")
    print("-" * 60)
    print(f"{'Model':<20} {'Accuracy':<12} {'MAE':<10} {'R² Score':<10}")
    print("-" * 60)
    
    for model_name, metrics in self.results.items():
      print(
        f"{model_name:<20} "
        f"{metrics['accuracy']:>10.2f}% "
        f"{metrics['mae']:>9.2f} "
        f"{metrics['r2_score']:>9.4f}"
      )
    
    print("-" * 60)
    
    # Best model
    best_model = max(self.results.items(), key=lambda x: x[1]["accuracy"])
    print(f"\n🥇 Best Model: {best_model[0]} ({best_model[1]['accuracy']:.2f}% accuracy)")
    
    print("\n" + "=" * 60)


def main():
  """Main training pipeline"""
  
  print("=" * 60)
  print("AgriAI Model Training Pipeline")
  print("Enhanced Training with 500,000+ Samples")
  print("=" * 60)
  print()
  
  # Get data path
  data_dir = Path(__file__).parent.parent / "data"
  data_path = data_dir / "agricultural_data.csv"
  
  if not data_path.exists():
    print("❌ Dataset not found!")
    print(f"   Expected: {data_path}")
    print("\n💡 Run 'python scripts/generate_dataset.py' first to create the dataset.")
    return
  
  # Initialize trainer
  trainer = ModelTrainer(data_path)
  
  # Training pipeline
  try:
    trainer.load_data()
    trainer.preprocess_data()
    trainer.train_random_forest()
    trainer.train_xgboost()
    trainer.train_linear_regression()
    trainer.save_models()
    trainer.print_summary()
    
    print("\n✨ Training complete! Models are ready for use.")
    print("🚀 Start the API server with: python -m app.main")
    
  except Exception as e:
    print(f"\n❌ Training failed: {e}")
    import traceback
    traceback.print_exc()


if __name__ == "__main__":
  main()
