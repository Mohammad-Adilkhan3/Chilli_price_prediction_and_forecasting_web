"""
AgriAI Backend - FastAPI Application
Main entry point for the API server
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import logging

from app.config import ALLOWED_ORIGINS, AVAILABLE_MODELS
from app.models import (
  PredictionRequest,
  PredictionResponse,
  InsightResponse,
  ModelPerformance,
  HealthResponse
)
from app.ml_models import model_manager

# Configure logging
logging.basicConfig(
  level=logging.INFO,
  format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
  title="AgriAI Backend API",
  description="AI-powered agricultural price prediction API",
  version="1.0.0",
  docs_url="/docs",
  redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
  CORSMiddleware,
  allow_origins=ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def root():
  """Root endpoint - API information"""
  return {
    "message": "AgriAI Backend API",
    "version": "1.0.0",
    "status": "running",
    "docs": "/docs",
    "health": "/health"
  }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
  """Health check endpoint"""
  loaded_models = model_manager.get_loaded_models()
  
  return HealthResponse(
    status="healthy" if loaded_models else "degraded",
    message="API is running" if loaded_models else "API running with mock predictions",
    models_loaded=loaded_models,
    timestamp=datetime.now()
  )


@app.post("/api/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict_price(request: PredictionRequest):
  """
  Predict chilli price based on input parameters
  
  This endpoint uses trained ML models to predict agricultural commodity prices.
  Models are trained on 100,000+ historical samples (2010-2024).
  
  Parameters:
  - year: Year for prediction (2020-2030)
  - month: Month for prediction (1-12)
  - city: Market city (e.g., Bangalore, Delhi)
  - variety: Chilli variety (e.g., Guntur, Byadgi)
  - model: ML model to use (random_forest, xgboost, linear_regression)
  - arrivals: Expected arrivals in quintals (optional)
  - rainfall: Expected rainfall in mm (optional)
  - temperature: Expected temperature in °C (optional)
  
  Returns:
  - predicted_price: Predicted price per quintal in ₹
  - confidence: Prediction confidence percentage
  - model_used: ML model used for prediction
  - accuracy: Model accuracy percentage
  - mae: Mean Absolute Error
  - r2_score: R² Score
  """
  
  # Validate model
  if request.model not in AVAILABLE_MODELS:
    raise HTTPException(
      status_code=400,
      detail=f"Invalid model. Available models: {list(AVAILABLE_MODELS.keys())}"
    )
  
  try:
    # Make prediction
    result = model_manager.predict(
      model_key=request.model,
      year=request.year,
      month=request.month,
      city=request.city,
      variety=request.variety,
      arrivals=request.arrivals,
      rainfall=request.rainfall,
      temperature=request.temperature
    )
    
    logger.info(
      f"Prediction: {request.city} {request.variety} "
      f"{request.year}-{request.month:02d} = ₹{result['predicted_price']:.2f}"
    )
    
    return PredictionResponse(
      predicted_price=result["predicted_price"],
      confidence=result["confidence"],
      model_used=result["model_used"],
      accuracy=result["accuracy"],
      mae=result["mae"],
      r2_score=result["r2_score"],
      timestamp=datetime.now()
    )
  
  except Exception as e:
    logger.error(f"Prediction error: {e}")
    raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/api/insights", response_model=InsightResponse, tags=["Insights"])
async def get_insights(
  city: str = "Bangalore",
  variety: str = "Guntur",
  month: int = 1
):
  """
  Get AI-generated market insights and risk alerts
  
  Parameters:
  - city: Market city
  - variety: Chilli variety
  - month: Month for analysis
  
  Returns:
  - insights: List of market insights
  - risk_alerts: Risk and warning alerts
  - trend_summary: Overall trend summary
  """
  
  # Generate insights based on seasonal patterns
  insights = []
  risk_alerts = []
  
  # Seasonal insights
  if month in [12, 1, 2]:  # Winter
    insights.append(
      f"Winter season typically shows higher prices for {variety} in {city} "
      "due to reduced supply and increased demand."
    )
  elif month in [6, 7, 8, 9]:  # Monsoon
    insights.append(
      f"Monsoon season may impact {variety} arrivals in {city}. "
      "Expect price volatility due to weather conditions."
    )
    risk_alerts.append(
      "Weather Alert: Heavy rainfall may affect transportation and supply chain."
    )
  
  # Market-specific insights
  if city in ["Bangalore", "Delhi", "Mumbai"]:
    insights.append(
      f"{city} is a major consumption market with consistent demand throughout the year."
    )
  
  # Variety-specific insights
  if variety == "Guntur":
    insights.append(
      "Guntur variety is highly sought after for its pungency and color, "
      "commanding premium prices in export markets."
    )
  
  # General trend
  trend_summary = (
    f"Based on historical patterns, {variety} prices in {city} "
    f"are expected to remain stable with seasonal variations. "
    f"Monitor arrivals and weather conditions for price movements."
  )
  
  return InsightResponse(
    insights=insights,
    risk_alerts=risk_alerts,
    trend_summary=trend_summary
  )


@app.get("/api/models", response_model=list[ModelPerformance], tags=["Models"])
async def get_models():
  """
  Get performance metrics for all available ML models
  
  Returns list of models with their performance metrics:
  - name: Model name
  - accuracy: Prediction accuracy percentage
  - mae: Mean Absolute Error
  - rmse: Root Mean Squared Error
  - r2_score: R² Score (coefficient of determination)
  - training_samples: Number of samples used for training
  """
  
  models_performance = model_manager.get_all_models_performance()
  
  return [
    ModelPerformance(
      name=model["name"],
      accuracy=model["accuracy"],
      mae=model["mae"],
      rmse=model["rmse"],
      r2_score=model["r2_score"],
      training_samples=model["training_samples"]
    )
    for model in models_performance
  ]


@app.get("/api/models/{model_name}", response_model=ModelPerformance, tags=["Models"])
async def get_model_performance(model_name: str):
  """
  Get performance metrics for a specific model
  
  Parameters:
  - model_name: Model identifier (random_forest, xgboost, linear_regression)
  
  Returns:
  - Model performance metrics
  """
  
  if model_name not in AVAILABLE_MODELS:
    raise HTTPException(
      status_code=404,
      detail=f"Model not found. Available models: {list(AVAILABLE_MODELS.keys())}"
    )
  
  performance = model_manager.get_model_performance(model_name)
  
  if not performance:
    raise HTTPException(status_code=404, detail="Model performance data not found")
  
  return ModelPerformance(
    name=AVAILABLE_MODELS[model_name],
    accuracy=performance["accuracy"],
    mae=performance["mae"],
    rmse=performance["rmse"],
    r2_score=performance["r2_score"],
    training_samples=performance["training_samples"]
  )


if __name__ == "__main__":
  import uvicorn
  from app.config import API_HOST, API_PORT, API_RELOAD
  
  logger.info("🚀 Starting AgriAI Backend API...")
  logger.info(f"📍 Server: http://{API_HOST}:{API_PORT}")
  logger.info(f"📚 Docs: http://{API_HOST}:{API_PORT}/docs")
  
  uvicorn.run(
    "app.main:app",
    host=API_HOST,
    port=API_PORT,
    reload=API_RELOAD,
    log_level="info"
  )
