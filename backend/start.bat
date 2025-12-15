@echo off
REM AgriAI Backend Quick Start Script for Windows

echo ==========================================
echo AgriAI Backend - Quick Start
echo ==========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
  echo Creating virtual environment...
  python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if dataset exists
if not exist "data\agricultural_data.csv" (
  echo.
  echo Generating dataset (100,000+ samples)...
  python scripts\generate_dataset.py
)

REM Check if models exist
if not exist "models\random_forest.pkl" (
  echo.
  echo Training ML models...
  python scripts\train_models.py
)

REM Start server
echo.
echo Starting API server...
echo    API: http://localhost:8000
echo    Docs: http://localhost:8000/docs
echo.
python -m app.main

pause
