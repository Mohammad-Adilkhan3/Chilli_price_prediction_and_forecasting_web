# Admin Dashboard Workflow

## Visual Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                             │
│                  http://localhost:5173/admin                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │     DATASET MANAGEMENT SECTION          │
        ├─────────────────────────────────────────┤
        │  ┌────────────────────────────────┐    │
        │  │  Dataset Status Card            │    │
        │  │  • Exists: Yes/No               │    │
        │  │  • Size: XX MB                  │    │
        │  │  • Last Modified: Date/Time     │    │
        │  └────────────────────────────────┘    │
        │                                          │
        │  ┌────────────────────────────────┐    │
        │  │  Actions:                       │    │
        │  │  [Generate Dataset (500K)]      │────┼──┐
        │  │  [Upload Custom Dataset]        │────┼──┼──┐
        │  │  [Delete Dataset]               │────┼──┼──┼──┐
        │  └────────────────────────────────┘    │  │  │  │
        └─────────────────────────────────────────┘  │  │  │
                                                      │  │  │
        ┌─────────────────────────────────────────┐  │  │  │
        │     MODEL TRAINING SECTION              │  │  │  │
        ├─────────────────────────────────────────┤  │  │  │
        │  ┌────────────────────────────────┐    │  │  │  │
        │  │  Model Status Cards             │    │  │  │  │
        │  │  • Random Forest: Trained/Not   │    │  │  │  │
        │  │  • XGBoost: Trained/Not         │    │  │  │  │
        │  │  • Linear Regression: Trained/Not│   │  │  │  │
        │  └────────────────────────────────┘    │  │  │  │
        │                                          │  │  │  │
        │  ┌────────────────────────────────┐    │  │  │  │
        │  │  Actions:                       │    │  │  │  │
        │  │  [Train All Models (10-15 min)] │────┼──┼──┼──┼──┐
        │  │  [Delete All Models]            │────┼──┼──┼──┼──┼──┐
        │  └────────────────────────────────┘    │  │  │  │  │  │
        └─────────────────────────────────────────┘  │  │  │  │  │
                                                      │  │  │  │  │
                                                      ▼  ▼  ▼  ▼  ▼
                                                   ┌──────────────┐
                                                   │   BACKEND    │
                                                   │   FastAPI    │
                                                   └──────────────┘
                                                          │
                    ┌─────────────────────────────────────┼─────────────────────────────────────┐
                    │                                     │                                     │
                    ▼                                     ▼                                     ▼
        ┌───────────────────────┐          ┌───────────────────────┐          ┌───────────────────────┐
        │  POST /generate-dataset│          │  POST /train-models   │          │  POST /upload-dataset │
        └───────────────────────┘          └───────────────────────┘          └───────────────────────┘
                    │                                     │                                     │
                    ▼                                     ▼                                     ▼
        ┌───────────────────────┐          ┌───────────────────────┐          ┌───────────────────────┐
        │  Background Task:      │          │  Background Task:      │          │  Validate & Save:     │
        │  run_dataset_generation│          │  run_model_training    │          │  • Check file type    │
        └───────────────────────┘          └───────────────────────┘          │  • Backup old dataset │
                    │                                     │                    │  • Save new file      │
                    ▼                                     ▼                    └───────────────────────┘
        ┌───────────────────────┐          ┌───────────────────────┐                    │
        │  Execute:              │          │  Execute:              │                    ▼
        │  generate_dataset.py   │          │  train_models.py       │          ┌───────────────────────┐
        │  • Create 500K samples │          │  • Train Random Forest │          │  Return success       │
        │  • Save to CSV         │          │  • Train XGBoost       │          │  with file info       │
        └───────────────────────┘          │  • Train Linear Reg    │          └───────────────────────┘
                    │                       │  • Save models         │
                    ▼                       └───────────────────────┘
        ┌───────────────────────┐                    │
        │  Update Status:        │                    ▼
        │  dataset_status        │          ┌───────────────────────┐
        │  • is_generating       │          │  Update Status:        │
        │  • progress            │          │  training_status       │
        │  • message             │          │  • is_training         │
        └───────────────────────┘          │  • current_step        │
                    │                       │  • progress            │
                    │                       │  • message             │
                    │                       └───────────────────────┘
                    │                                     │
                    └─────────────────┬───────────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │  Frontend Polling:       │
                        │  Every 2 seconds         │
                        │  • GET /dataset-status   │
                        │  • GET /training-status  │
                        └──────────────────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │  Update UI:              │
                        │  • Progress bars         │
                        │  • Status messages       │
                        │  • Time stamps           │
                        │  • Success/Error alerts  │
                        └──────────────────────────┘
```

## Detailed Flow Descriptions

### 1. Generate Dataset Flow

```
User Action
    │
    ▼
Click "Generate Dataset (500K samples)"
    │
    ▼
Frontend: POST /api/admin/generate-dataset
    │
    ▼
Backend: Start background task
    │
    ├─► Update dataset_status.is_generating = True
    ├─► Update dataset_status.progress = 0
    ├─► Update dataset_status.message = "Starting..."
    │
    ▼
Execute: python scripts/generate_dataset.py
    │
    ├─► Generate 500,000 samples
    ├─► Apply realistic patterns
    ├─► Save to data/agricultural_data.csv
    │
    ▼
Update Status (on completion)
    │
    ├─► dataset_status.progress = 100
    ├─► dataset_status.message = "Complete!"
    ├─► dataset_status.completed_at = timestamp
    ├─► dataset_status.is_generating = False
    │
    ▼
Frontend: Poll every 2 seconds
    │
    ├─► GET /api/admin/dataset-status
    ├─► Update progress bar
    ├─► Update status message
    │
    ▼
Show Success Toast
    │
    ▼
Refresh Model Info
```

### 2. Train Models Flow

```
User Action
    │
    ▼
Click "Train All Models (10-15 min)"
    │
    ▼
Frontend: Check dataset exists
    │
    ├─► If no dataset: Show error
    └─► If dataset exists: Continue
        │
        ▼
    POST /api/admin/train-models
        │
        ▼
    Backend: Start background task
        │
        ├─► Update training_status.is_training = True
        ├─► Update training_status.progress = 0
        ├─► Update training_status.current_step = "Initializing"
        │
        ▼
    Execute: python scripts/train_models.py
        │
        ├─► Step 1: Load Data (progress: 10%)
        │   └─► training_status.current_step = "Loading Data"
        │
        ├─► Step 2: Train Random Forest (progress: 20-50%)
        │   ├─► training_status.current_step = "Training Random Forest"
        │   ├─► 200 estimators, max_depth=25
        │   └─► Takes 4-6 minutes
        │
        ├─► Step 3: Train XGBoost (progress: 50-80%)
        │   ├─► training_status.current_step = "Training XGBoost"
        │   ├─► 200 estimators, max_depth=12
        │   └─► Takes 3-4 minutes
        │
        ├─► Step 4: Train Linear Regression (progress: 80-95%)
        │   ├─► training_status.current_step = "Training Linear Regression"
        │   └─► Takes 1 minute
        │
        └─► Step 5: Save Models (progress: 95-100%)
            ├─► Save random_forest.pkl
            ├─► Save xgboost.pkl
            ├─► Save linear_regression.pkl
            └─► Save encoders.pkl
        │
        ▼
    Update Status (on completion)
        │
        ├─► training_status.progress = 100
        ├─► training_status.current_step = "Complete"
        ├─► training_status.message = "All models trained!"
        ├─► training_status.completed_at = timestamp
        ├─► training_status.is_training = False
        │
        ▼
    Frontend: Poll every 2 seconds
        │
        ├─► GET /api/admin/training-status
        ├─► Update progress bar
        ├─► Update current step
        ├─► Update status message
        │
        ▼
    Show Success Toast
        │
        ▼
    Refresh Model Info
```

### 3. Upload Dataset Flow

```
User Action
    │
    ▼
Click "Upload Custom Dataset (.csv)"
    │
    ▼
Select CSV file from file picker
    │
    ▼
Frontend: Validate file extension
    │
    ├─► If not .csv: Show error
    └─► If .csv: Continue
        │
        ▼
    Create FormData with file
        │
        ▼
    POST /api/admin/upload-dataset
    Content-Type: multipart/form-data
        │
        ▼
    Backend: Validate file
        │
        ├─► Check file type
        ├─► Check file size
        └─► If valid: Continue
            │
            ▼
        Backup existing dataset (if exists)
            │
            ├─► Copy to agricultural_data_backup_TIMESTAMP.csv
            │
            ▼
        Save new dataset
            │
            ├─► Write to data/agricultural_data.csv
            │
            ▼
        Get file info
            │
            ├─► Size
            ├─► Modified date
            │
            ▼
        Return success response
            │
            ▼
    Frontend: Show success toast
        │
        ├─► Display filename
        ├─► Display file size
        │
        ▼
    Refresh Model Info
```

### 4. Status Polling Flow

```
Component Mount
    │
    ▼
Initial Data Load
    │
    ├─► GET /api/admin/model-info
    ├─► GET /api/admin/training-status
    ├─► GET /api/admin/dataset-status
    │
    ▼
Set up polling interval
    │
    ▼
Every 2 seconds:
    │
    ├─► Check if training_status.is_training
    ├─► Check if dataset_status.is_generating
    │
    └─► If either is true:
        │
        ├─► GET /api/admin/training-status
        ├─► GET /api/admin/dataset-status
        ├─► GET /api/admin/model-info
        │
        ▼
    Update UI:
        │
        ├─► Progress bars
        ├─► Status messages
        ├─► Current step
        ├─► Time stamps
        │
        ▼
    If operation complete:
        │
        ├─► Show success/error alert
        ├─► Stop polling for that operation
        └─► Refresh model info
```

## State Management

### Backend State (Global Variables)

```python
# Dataset generation status
dataset_status = {
  "is_generating": False,    # Currently generating?
  "progress": 0,             # 0-100
  "message": "",             # Status message
  "started_at": None,        # ISO timestamp
  "completed_at": None,      # ISO timestamp
  "error": None              # Error message if failed
}

# Model training status
training_status = {
  "is_training": False,      # Currently training?
  "current_step": "",        # Current operation
  "progress": 0,             # 0-100
  "message": "",             # Status message
  "started_at": None,        # ISO timestamp
  "completed_at": None,      # ISO timestamp
  "error": None              # Error message if failed
}
```

### Frontend State (React Hooks)

```typescript
// Model and dataset information
const [modelInfo, setModelInfo] = useState<any>(null);

// Training status
const [trainingStatus, setTrainingStatus] = useState<TrainingStatus | null>(null);

// Dataset generation status
const [datasetStatus, setDatasetStatus] = useState<DatasetStatus | null>(null);

// Loading state
const [isLoading, setIsLoading] = useState(true);

// File upload state
const [uploadingFile, setUploadingFile] = useState(false);
```

## Error Handling

### Backend Error Responses

```python
# Concurrent operation prevention
if dataset_status["is_generating"]:
    raise HTTPException(
        status_code=400,
        detail="Dataset generation already in progress"
    )

# Missing dataset
if not dataset_path.exists():
    raise HTTPException(
        status_code=400,
        detail="Dataset not found. Please generate or upload dataset first."
    )

# Invalid file type
if not file.filename.endswith('.csv'):
    raise HTTPException(
        status_code=400,
        detail="Only CSV files are allowed"
    )
```

### Frontend Error Handling

```typescript
try {
  const response = await fetch(`${API_BASE_URL}/api/admin/train-models`, {
    method: 'POST'
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to start training');
  }

  toast({
    title: 'Model Training Started',
    description: 'Training will take 10-15 minutes.',
  });
} catch (error: any) {
  toast({
    title: 'Error',
    description: error.message,
    variant: 'destructive'
  });
}
```

## Performance Considerations

### Backend Optimization
- Background tasks prevent blocking
- Subprocess execution for CPU-intensive work
- Global state for fast status checks
- No database overhead

### Frontend Optimization
- Polling only when operations active
- 2-second interval (not too frequent)
- Cleanup on component unmount
- Conditional rendering

### Resource Usage
- Dataset generation: 50-70% CPU, 2-4 GB RAM
- Model training: 90-100% CPU, 6-8 GB RAM
- File upload: Minimal resources
- Status polling: Negligible overhead

---

**This workflow ensures**:
✅ Non-blocking operations  
✅ Real-time progress updates  
✅ Clear error handling  
✅ Concurrent operation prevention  
✅ User-friendly feedback  
✅ Production-ready architecture
