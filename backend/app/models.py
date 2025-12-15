"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class PredictionRequest(BaseModel):
  """Request model for price prediction"""
  year: int = Field(..., ge=2020, le=2030, description="Year for prediction")
  month: int = Field(..., ge=1, le=12, description="Month for prediction (1-12)")
  city: str = Field(..., description="Market city (e.g., Bangalore, Delhi)")
  variety: str = Field(..., description="Chilli variety (e.g., Guntur, Byadgi)")
  model: str = Field(default="random_forest", description="ML model to use")
  arrivals: Optional[float] = Field(default=2000, description="Expected arrivals in quintals")
  rainfall: Optional[float] = Field(default=50, description="Expected rainfall in mm")
  temperature: Optional[float] = Field(default=28, description="Expected temperature in °C")

  class Config:
    json_schema_extra = {
      "example": {
        "year": 2025,
        "month": 3,
        "city": "Bangalore",
        "variety": "Guntur",
        "model": "random_forest",
        "arrivals": 2100,
        "rainfall": 45.2,
        "temperature": 28.5
      }
    }


class PredictionResponse(BaseModel):
  """Response model for price prediction"""
  predicted_price: float = Field(..., description="Predicted price per quintal in ₹")
  confidence: float = Field(..., ge=0, le=100, description="Prediction confidence percentage")
  model_used: str = Field(..., description="ML model used for prediction")
  accuracy: float = Field(..., description="Model accuracy percentage")
  mae: float = Field(..., description="Mean Absolute Error")
  r2_score: float = Field(..., description="R² Score")
  timestamp: datetime = Field(default_factory=datetime.now, description="Prediction timestamp")

  class Config:
    json_schema_extra = {
      "example": {
        "predicted_price": 28404.8,
        "confidence": 98.2,
        "model_used": "Random Forest",
        "accuracy": 98.2,
        "mae": 1.02,
        "r2_score": 0.998,
        "timestamp": "2025-12-06T10:30:00"
      }
    }


class InsightResponse(BaseModel):
  """Response model for AI insights"""
  insights: List[str] = Field(..., description="List of market insights")
  risk_alerts: List[str] = Field(..., description="Risk and warning alerts")
  trend_summary: str = Field(..., description="Overall trend summary")


class ModelPerformance(BaseModel):
  """Model performance metrics"""
  name: str
  accuracy: float
  mae: float
  rmse: float
  r2_score: float
  training_samples: int = Field(default=100000, description="Number of training samples")


class HealthResponse(BaseModel):
  """Health check response"""
  status: str
  message: str
  models_loaded: List[str]
  timestamp: datetime = Field(default_factory=datetime.now)
