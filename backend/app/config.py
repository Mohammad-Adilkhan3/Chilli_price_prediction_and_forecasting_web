"""
Configuration settings for AgriAI Backend
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# API Configuration
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("API_PORT", 8000))
API_RELOAD = os.getenv("API_RELOAD", "True").lower() == "true"

# CORS Settings
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
ALLOWED_ORIGINS = [
  FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:5173",
]

# Model Settings
MODEL_PATH = BASE_DIR / "data" / "models"
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "random_forest")

# Data Settings
DATA_PATH = BASE_DIR / "data"
DATASET_FILE = os.getenv("DATASET_FILE", "agricultural_data.csv")

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

# Model Names
AVAILABLE_MODELS = {
  "random_forest": "Random Forest",
  "xgboost": "XGBoost",
  "linear_regression": "Linear Regression",
}

# Feature columns for prediction
FEATURE_COLUMNS = [
  "arrivals",
  "rainfall",
  "temperature",
  "month",
  "city_encoded",
  "variety_encoded",
]

# Target column
TARGET_COLUMN = "price"

# Create directories if they don't exist
MODEL_PATH.mkdir(parents=True, exist_ok=True)
DATA_PATH.mkdir(parents=True, exist_ok=True)
