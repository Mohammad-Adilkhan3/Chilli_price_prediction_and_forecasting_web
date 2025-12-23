"""
Admin Routes for Dataset Management and Model Training
Provides endpoints for dataset upload, generation, and model retraining
"""
from fastapi import APIRouter, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
import subprocess
import json
import os
from datetime import datetime
from typing import Dict, Any
import shutil

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Global status tracking
training_status = {
  "is_training": False,
  "current_step": "",
  "progress": 0,
  "message": "",
  "started_at": None,
  "completed_at": None,
  "error": None
}

dataset_status = {
  "is_generating": False,
  "progress": 0,
  "message": "",
  "started_at": None,
  "completed_at": None,
  "error": None
}


def get_model_info() -> Dict[str, Any]:
  """Get information about trained models"""
  models_dir = Path(__file__).parent.parent / "models"
  data_dir = Path(__file__).parent.parent / "data"
  
  info = {
    "models": {},
    "dataset": {},
    "last_updated": None
  }
  
  # Check models
  model_files = ["random_forest.pkl", "xgboost.pkl", "linear_regression.pkl"]
  for model_file in model_files:
    model_path = models_dir / model_file
    if model_path.exists():
      stat = model_path.stat()
      model_name = model_file.replace(".pkl", "").replace("_", " ").title()
      info["models"][model_file] = {
        "name": model_name,
        "exists": True,
        "size": f"{stat.st_size / 1024 / 1024:.2f} MB",
        "modified": datetime.fromtimestamp(stat.st_mtime).isoformat()
      }
      if not info["last_updated"] or stat.st_mtime > datetime.fromisoformat(info["last_updated"]).timestamp():
        info["last_updated"] = datetime.fromtimestamp(stat.st_mtime).isoformat()
    else:
      info["models"][model_file] = {
        "name": model_file.replace(".pkl", "").replace("_", " ").title(),
        "exists": False
      }
  
  # Check dataset
  dataset_path = data_dir / "agricultural_data.csv"
  if dataset_path.exists():
    stat = dataset_path.stat()
    info["dataset"] = {
      "exists": True,
      "size": f"{stat.st_size / 1024 / 1024:.2f} MB",
      "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
      "path": str(dataset_path)
    }
  else:
    info["dataset"] = {"exists": False}
  
  return info


@router.get("/model-info")
async def get_models_info():
  """Get information about trained models and dataset"""
  try:
    info = get_model_info()
    return JSONResponse(content=info)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


@router.get("/training-status")
async def get_training_status():
  """Get current training status"""
  return JSONResponse(content=training_status)


@router.get("/dataset-status")
async def get_dataset_generation_status():
  """Get current dataset generation status"""
  return JSONResponse(content=dataset_status)


def run_dataset_generation():
  """Background task to generate dataset"""
  global dataset_status
  
  try:
    dataset_status["is_generating"] = True
    dataset_status["progress"] = 0
    dataset_status["message"] = "Starting dataset generation..."
    dataset_status["started_at"] = datetime.now().isoformat()
    dataset_status["completed_at"] = None
    dataset_status["error"] = None
    
    # Run dataset generation script
    script_path = Path(__file__).parent.parent / "scripts" / "generate_dataset.py"
    
    dataset_status["progress"] = 10
    dataset_status["message"] = "Generating 500,000 samples..."
    
    result = subprocess.run(
      ["python", str(script_path)],
      capture_output=True,
      text=True,
      cwd=str(script_path.parent.parent)
    )
    
    if result.returncode == 0:
      dataset_status["progress"] = 100
      dataset_status["message"] = "Dataset generated successfully!"
      dataset_status["completed_at"] = datetime.now().isoformat()
    else:
      dataset_status["error"] = result.stderr or "Dataset generation failed"
      dataset_status["message"] = "Dataset generation failed"
    
  except Exception as e:
    dataset_status["error"] = str(e)
    dataset_status["message"] = f"Error: {str(e)}"
  finally:
    dataset_status["is_generating"] = False


def run_model_training():
  """Background task to train models"""
  global training_status
  
  try:
    training_status["is_training"] = True
    training_status["progress"] = 0
    training_status["current_step"] = "Initializing"
    training_status["message"] = "Starting model training..."
    training_status["started_at"] = datetime.now().isoformat()
    training_status["completed_at"] = None
    training_status["error"] = None
    
    # Run training script
    script_path = Path(__file__).parent.parent / "scripts" / "train_models.py"
    
    training_status["progress"] = 10
    training_status["current_step"] = "Loading Data"
    training_status["message"] = "Loading dataset..."
    
    training_status["progress"] = 20
    training_status["current_step"] = "Training Random Forest"
    training_status["message"] = "Training Random Forest (200 estimators)..."
    
    result = subprocess.run(
      ["python", str(script_path)],
      capture_output=True,
      text=True,
      cwd=str(script_path.parent.parent)
    )
    
    if result.returncode == 0:
      training_status["progress"] = 100
      training_status["current_step"] = "Complete"
      training_status["message"] = "All models trained successfully!"
      training_status["completed_at"] = datetime.now().isoformat()
    else:
      training_status["error"] = result.stderr or "Training failed"
      training_status["message"] = "Training failed"
      training_status["current_step"] = "Failed"
    
  except Exception as e:
    training_status["error"] = str(e)
    training_status["message"] = f"Error: {str(e)}"
    training_status["current_step"] = "Failed"
  finally:
    training_status["is_training"] = False


@router.post("/generate-dataset")
async def generate_dataset(background_tasks: BackgroundTasks):
  """Trigger dataset generation"""
  global dataset_status
  
  if dataset_status["is_generating"]:
    raise HTTPException(status_code=400, detail="Dataset generation already in progress")
  
  if training_status["is_training"]:
    raise HTTPException(status_code=400, detail="Cannot generate dataset while training is in progress")
  
  # Start background task
  background_tasks.add_task(run_dataset_generation)
  
  return JSONResponse(content={
    "message": "Dataset generation started",
    "status": "started"
  })


@router.post("/train-models")
async def train_models(background_tasks: BackgroundTasks):
  """Trigger model training"""
  global training_status
  
  if training_status["is_training"]:
    raise HTTPException(status_code=400, detail="Training already in progress")
  
  if dataset_status["is_generating"]:
    raise HTTPException(status_code=400, detail="Cannot train while dataset generation is in progress")
  
  # Check if dataset exists
  data_dir = Path(__file__).parent.parent / "data"
  dataset_path = data_dir / "agricultural_data.csv"
  
  if not dataset_path.exists():
    raise HTTPException(status_code=400, detail="Dataset not found. Please generate or upload dataset first.")
  
  # Start background task
  background_tasks.add_task(run_model_training)
  
  return JSONResponse(content={
    "message": "Model training started",
    "status": "started"
  })


@router.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...)):
  """Upload custom dataset CSV file"""
  global dataset_status
  
  if dataset_status["is_generating"]:
    raise HTTPException(status_code=400, detail="Dataset generation in progress")
  
  if training_status["is_training"]:
    raise HTTPException(status_code=400, detail="Training in progress")
  
  # Validate file type
  if not file.filename.endswith('.csv'):
    raise HTTPException(status_code=400, detail="Only CSV files are allowed")
  
  try:
    # Save uploaded file
    data_dir = Path(__file__).parent.parent / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    
    dataset_path = data_dir / "agricultural_data.csv"
    
    # Backup existing dataset if it exists
    if dataset_path.exists():
      backup_path = data_dir / f"agricultural_data_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
      shutil.copy(dataset_path, backup_path)
    
    # Save new dataset
    with open(dataset_path, "wb") as buffer:
      content = await file.read()
      buffer.write(content)
    
    # Get file info
    stat = dataset_path.stat()
    
    return JSONResponse(content={
      "message": "Dataset uploaded successfully",
      "filename": file.filename,
      "size": f"{stat.st_size / 1024 / 1024:.2f} MB",
      "path": str(dataset_path)
    })
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.delete("/delete-models")
async def delete_models():
  """Delete all trained models"""
  global training_status
  
  if training_status["is_training"]:
    raise HTTPException(status_code=400, detail="Cannot delete models while training is in progress")
  
  try:
    models_dir = Path(__file__).parent.parent / "models"
    deleted_files = []
    
    if models_dir.exists():
      for pkl_file in models_dir.glob("*.pkl"):
        pkl_file.unlink()
        deleted_files.append(pkl_file.name)
    
    return JSONResponse(content={
      "message": f"Deleted {len(deleted_files)} model files",
      "deleted_files": deleted_files
    })
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")


@router.delete("/delete-dataset")
async def delete_dataset():
  """Delete dataset file"""
  global dataset_status, training_status
  
  if dataset_status["is_generating"]:
    raise HTTPException(status_code=400, detail="Cannot delete dataset while generation is in progress")
  
  if training_status["is_training"]:
    raise HTTPException(status_code=400, detail="Cannot delete dataset while training is in progress")
  
  try:
    data_dir = Path(__file__).parent.parent / "data"
    dataset_path = data_dir / "agricultural_data.csv"
    
    if dataset_path.exists():
      dataset_path.unlink()
      return JSONResponse(content={"message": "Dataset deleted successfully"})
    else:
      raise HTTPException(status_code=404, detail="Dataset not found")
    
  except Exception as e:
    raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")
