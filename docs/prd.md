# AI-Driven Agricultural Intelligence Mobile Application Requirements Document

## 1. Project Overview

### 1.1 Project Name
AI-Driven Agricultural Intelligence Mobile App – Chilli Price Forecasting

### 1.2 Project Description
A professional AI-powered mobile application for agricultural price intelligence, specifically focused on chilli price forecasting. The app provides data-driven insights, predictive analytics, and AI-powered assistance for agricultural market decision-making on iOS and Android devices. Designed as an enterprise-ready mobile solution with modern AI platform aesthetics optimized for touch interfaces. The system is trained on 24million data points to achieve industry-leading prediction accuracy of 98.2%.
\n### 1.3 Core Objectives
- Deliver accurate AI-powered price predictions for agricultural commodities using large-scale training datasets (24M+ data points)
- Achieve 98.2% prediction accuracy using Random Forest as the best-performing model
- Provide intelligent insights and risk alerts for market trends on mobile devices
- Enable interactive data exploration through touch-optimized visualizations with frequency selection (Weekly, Monthly, Yearly)
- Offer conversational AI assistance for market analysis\n- Present a professional, mobile-first interface suitable for field use
- Support custom dataset uploads via mobile file system
- Train models on comprehensive historical data to ensure high prediction accuracy
- Enable offline access to recent predictions and cached data
- Automatically sync and update when backend datasets are modified
- Notify users of dataset updates and trigger model retraining

## 2. Technical Architecture
\n### 2.1 Mobile Frontend Stack
- **Framework**: React Native (cross-platform iOS/Android)
- **Alternative**: Flutter (Dart-based cross-platform)
- **State Management**: Redux or MobX\n- **Navigation**: React Navigation\n- **Charts & Visualization**: Victory Native, React Native Chart Kit
- **Animations**: React Native Reanimated, Lottie\n- **File Upload**: React Native Document Picker, React Native FS
- **Offline Storage**: AsyncStorage, SQLite, Realm
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Real-time Updates**: WebSocket or Server-Sent Events (SSE) for dataset change notifications

### 2.2 Backend Stack
- **API Framework**: Python FastAPI
- **ML Models**: Scikit-learn, XGBoost, RandomForest, LSTM, Linear Regression
- **Training Data Requirements**: Minimum 24M+ data points for robust model training
- **Data Processing**: Pandas, NumPy for large-scale data handling
- **AI Features**: LLM-based AI Assistant (API ready)
- **Database**: PostgreSQL / MongoDB\n- **File Processing**: Pandas for CSV/Excel parsing and validation
- **Mobile API Optimization**: Compressed JSON responses, pagination for large datasets
- **Dataset Versioning**: Track dataset versions and update timestamps
- **Background Job Queue**: Celery or RQ for asynchronous model retraining
- **Real-time Notification Service**: WebSocket server or FCM for instant update alerts
- **Code-Level Dataset Management**: Datasets added directly in codebase, triggering automatic model training

### 2.3 Deployment Architecture
- Cross-platform mobile app (iOS App Store, Google Play Store)
- API-first design with mobile-optimized endpoints
- Offline-first architecture with data synchronization
- Push notification system for price alerts and dataset updates
- Optimized for low-bandwidth scenarios
- Real-time dataset update detection and synchronization
- Code-based dataset deployment with automatic training pipeline

## 3. Core Features & Screens

### 3.1 Splash Screen & Onboarding
\n**Splash Screen**:\n- Animated app logo with AI pulse effect
- Loading indicator for initial data sync
- Check for dataset updates on app launch
\n**Onboarding Flow** (first-time users):
- Swipeable tutorial screens explaining key features
- Permission requests (storage access for file uploads, notifications)
- Optional account setup or guest mode

### 3.2 Home Dashboard Screen

**Top Navigation Bar**:
- App logo/title on the left
- Notification bell icon (price alerts and dataset update notifications)
- Settings/profile icon on the right
\n**Quick Action Cards** (scrollable horizontal):
- 'Run Prediction' card with icon\n- 'Upload Dataset' card with cloud icon
- 'AI Assistant' card with chat icon
- 'View Insights' card with lightbulb icon
- 'Sync Dataset' card with refresh icon (manual sync trigger)

**Key Metrics Display** (grid layout):
- **Best Performing Model Card**: \n  - Model name: Random Forest
  - Accuracy: 98.2% with circular progress indicator
  - Subtitle: 'Achieves 98.2% accuracy with exceptional reliability metrics'
- **MAE Card**: 1.02 value display
- **RMSE Card**: 1.45 value display
- **R² Score Card**: 0.998 visualization
- **Models Deployed Badge**: '4 Active ML Algorithms'
- **Best Accuracy Badge**: '98.2% Random Forest ↑ +1.2%'
- **Avg R² Score Card**: '0.983 Across All Models'
- **Training Data Badge**: '24M Data Points'
- Last prediction timestamp
- Dataset version indicator (e.g., 'Dataset v2.3- Updated 2 hours ago')
- Update status badge ('Up to date' or 'Update available')

**Recent Predictions List**:
- Scrollable list of recent predictions with swipe-to-delete
- Each item shows: Date, Market, Variety, Predicted Price, Trend indicator (↑↓)
- Tap to view detailed prediction\n\n### 3.3 AI Prediction Screen

**Input Section** (collapsible accordion):
- **Dataset Selector**: Dropdown showing'Default Dataset' or uploaded dataset name with version number
- **Year Picker**: Scrollable year selector (wheel picker on iOS, dropdown on Android)
- **Month Picker**: Scrollable month selector (January - December)
- **Market/City Selector**: Searchable dropdown with autocomplete
- **Variety Filter**: Dropdown with crop varieties\n- **Time Frequency Toggle**: Segmented control (Weekly / Monthly / Yearly)
- **Model Selector**: Dropdown with AI recommendation badge (default: Random Forest)
- 'Run Prediction' button (full-width, primary color)

**Prediction Result Card** (appears after prediction):
- Large animated ₹ value display with currency symbol
- Confidence interval range (lower - upper bounds)
- Trend indicator (↑↓) with color coding (green for up, red for down)
- Prediction timestamp
- Selected year, month, and frequency context display
- Model used badge (e.g., 'Random Forest - 98.2% Accuracy')
- 'Save Prediction' button (bookmark icon)
- 'Share' button (share icon for exporting result)
- Dataset version used for prediction displayed at bottom

**Interactive Charts** (swipeable tabs):
- **Price Trend Chart**: Line chart showing historical and predicted prices with frequency selector (Weekly/Monthly/Yearly view, pinch-to-zoom, pan gestures)
- **Forecast vs Actual**: Dual-axis comparison chart with frequency toggle
- **Seasonal Heatmap**: Touch-interactive heatmap with color gradients
- **Correlation Chart**: Scatter plot showing rainfall vs price correlation
\n**Performance Metrics** (bottom section):
- Accuracy percentage with circular progress bar (98.2%)
- MAE (1.02), RMSE (1.45), R² Score (0.998) cards in horizontal scroll
- AI Confidence Score meter\n\n### 3.4 Dataset Upload Screen

**Upload Zone**:
- Largedashed border area with cloud upload icon
- 'Tap to Select File' or 'Choose from Files' button
- Supported formats label: 'CSV, Excel (.xlsx, .xls)'
- Drag-and-drop not applicable (mobile limitation)
\n**File Selection Flow**:
- Opens native file picker (iOS Files app, Android file manager)
- Shows file name and size after selection
- 'Upload' button to confirm
\n**Upload Progress**:
- Progress bar with percentage indicator
- 'Cancel Upload' option
- Estimated time remaining
\n**Validation Feedback**:
- Success message with checkmark animation: 'Dataset uploaded successfully! 24M+ samples detected.'
- Error messages with detailed explanations:\n  - 'Dataset must contain at least 100,000 samples. Current: 85,000'\n  - 'Missing required columns: [Rainfall, Humidity]'
  - 'Invalid data format in Modal Price column'
\n**Dataset Management**:
- List of uploaded datasets with metadata (name, sample count, upload date, version)
- Swipe-to-delete gesture for removing datasets
- 'Set as Active' button to switch between datasets
- 'Check for Updates' button to manually trigger sync
- Auto-update toggle switch (enable/disable automatic dataset updates)
- Last sync timestamp displayed for each dataset

### 3.5 AI Insights Screen

**Auto-Generated Insights Section**:
- Card-based layout with natural language explanations
- Example: 'Price is expected to increase by 12% due to lower arrivals and reduced rainfall in the region'
- Context-aware analysis based on current prediction, selected time period, and frequency
\n**Risk Alerts Section**:
- Warning cards with alert icons\n- Examples:\n  - 'Supply volatility warning: Arrivals 15% below average'
  - 'Weather anomaly detected: Rainfall 30% lower than historical average'
  - 'Market disruption alert: Unusual price spike detected'

**Future Trend Highlights**:
- Timeline view showing 3-6 month forecast summaries with frequency selector
- Key inflection points marked with icons
- Seasonal pattern predictions with visual indicators
\n**Actionable Recommendations** (optional):
- Suggested actions based on predictions (e.g., 'Consider selling in March for higher returns')
\n### 3.6 AI Chat Assistant Screen

**Chat Interface**:
- Full-screen chat layout with message bubbles
- User messages aligned right (blue bubbles)
- AI responses aligned left (gray bubbles)
- Typing indicator animation when AI is processing
\n**Input Area**:
- Text input field at bottom with'Send' button
- Microphone icon for voice input (optional)
- Suggested quick questions as chips above input field:\n  - 'Why is price high next month?'
  - 'Compare2024 vs 2027 prices'
  - 'Which market is better to sell?'
  - 'Show predictions for January 2025'
  - 'Show weekly trends for this month'

**AI Capabilities**:
- Trained on dataset metadata, market history, and model outputs
- Answers complex queries with embedded charts and data tables
- Contextual follow-up questions\n- 'Copy Response' and 'Share' options for each AI message
\n**Chat History**:
- Scrollable conversation history\n- 'Clear Chat' option in settings
- Persistent chat sessions (saved locally)
\n### 3.7 Advanced Charts Screen

**Chart Gallery** (grid or list view):
- Thumbnail previews of available charts
- Tap to open full-screen interactive chart
\n**Interactive Features**:
- Pinch-to-zoom and pan gestures
- Tap on data points for detailed tooltips
- AI-annotated graphs with contextual explanations
- Legend toggle for multi-series charts
- **Frequency Selector**: Toggle between Weekly, Monthly, and Yearly views for all time-series charts

**Scenario Simulation** (bottom sheet):
- Sliders for adjusting parameters:\n  - Rainfall adjustment (↑↓)
  - Arrivals adjustment (↑↓)\n  - Temperature adjustment (↑↓)
-'Apply Changes' button to update chart in real-time
- 'Reset to Default' button\n
**Export Options**:
- 'Save Chart as Image' button
- 'Share Chart' button (exports as PNG or PDF)
\n### 3.8 Model Intelligence Screen

**Model Performance Dashboard**:
- **Best Performing Model Highlight Card**:
  - Large card at top showing Random Forest\n  - Accuracy: 98.2%
  - Subtitle: 'Achieves 98.2% accuracy with exceptional reliability metrics'
- Metrics: MAE 1.02, RMSE 1.45, R² Score 0.998
  - Status badge: 'Active'\n
**Model Comparison Section**:
- **Performance Comparison Table**:
  - Sortable table with columns: Model, Accuracy, MAE, RMSE, R² Score, Status
  - Row1: Random Forest - 98.2%, 1.02, 1.45, 0.998, Active
  - Row 2: XGBoost - 97.8%, 1.15, 1.58, 0.996, Active\n  - Row 3: LSTM Neural Network - 96.5%, 1.48, 1.92, 0.992, Active
  - Row 4: Linear Regression - 89.3%, 3.21, 4.15, 0.945, Active
  - Tap column headers to sort by metric

**Horizontal Scrollable Model Cards**:
- Each card displays:\n  - Model name with icon
  - Performance metrics (MAE, RMSE, R² Score)
  - 'Best Performer' badge on Random Forest\n  - Training date and sample size (24M data points)
  - Dataset version used for training
\n**Explainable AI (XAI) Section**:
- Feature importance bar chart (horizontal bars)
- SHAP value visualizations (simplified for mobile)
- 'Learn More' button linking to detailed explanations

**Model Training History**:
- Timeline view showing training accuracy trends over time
- Training dataset statistics (24M samples, feature distribution)
- Retraining events triggered by dataset updates

### 3.9 Dataset Sync & Update Screen

**Sync Status Section**:
- Large status indicator showing current sync state:\n  - 'Up to Date' (green checkmark)
  - 'Update Available' (orange alert icon)
  - 'Syncing...' (animated spinner)
  - 'Sync Failed' (red error icon)
- Last successful sync timestamp
- Dataset version comparison (Current vs Available)

**Update Details Card**:
- Shows changes in new dataset version:\n  - Sample count difference (e.g., '+5M new records')
  - Date range extension\n  - New markets or varieties added
  - Data quality improvements
- 'View Changelog' button for detailed update notes

**Action Buttons**:
- 'Update Now' button (primary, full-width) - downloads and applies update
- 'Schedule Update' button - set preferred update time
- 'Skip This Version' button (secondary)\n\n**Auto-Update Settings**:
- Toggle switch: 'Enable Automatic Updates'
- Dropdown: 'Update Frequency' (Real-time / Daily / Weekly)\n- Toggle switch: 'Update Only on Wi-Fi'
- Toggle switch: 'Auto-Retrain Models After Update'

**Update Progress**:
- Progress bar showing download and processing stages:\n  1. Downloading dataset (0-50%)
  2. Validating data (50-70%)
  3. Retraining models (70-95%)
  4. Finalizing update (95-100%)\n- Estimated time remaining
-'Cancel Update' option
\n**Update History**:
- Scrollable list of past updates with timestamps
- Each entry shows: Version number, Update date, Changes summary
- Tap to view detailed changelog

### 3.10 Settings Screen

**Account Section** (if applicable):
- Profile picture and name
- 'Edit Profile' option
- 'Sign Out' button
\n**Preferences**:
- Language selection (if multi-language support)
- Theme toggle (Light / Dark mode)
- Notification preferences (price alerts, insights updates, dataset update notifications)
- Default dataset selection
- Default frequency selection (Weekly / Monthly / Yearly)
- Auto-update preferences (link to Dataset Sync screen)

**Data Management**:
- 'Clear Cache' button
- 'Delete All Predictions' button
- 'Manage Uploaded Datasets' link
- 'Force Sync Datasets' button
- 'Reset to Default Dataset' button

**About Section**:
- App version number
- 'Privacy Policy' link
- 'Terms of Service' link
- 'Contact Support' button
- 'Rate App' button (links to App Store/Play Store)

### 3.11 Notifications & Alerts

**Push Notifications**:
- Price alert notifications when significant changes detected
- Daily/weekly summary notifications (configurable)
- Dataset upload completion notifications
- Model training completion notifications
- Dataset update available notifications
- Dataset sync completion notifications
- Model retraining progress notifications

**In-App Notifications**:
- Toast messages for quick feedback (e.g., 'Prediction saved successfully')
- Alert dialogs for critical actions (e.g., 'Delete dataset?')
- Banner notifications for dataset updates (dismissible, with'Update Now' action)
- Bottom sheet prompts for major dataset changes requiring user attention

## 4. Mobile Design System

### 4.1 Color Palette
- **Primary Background**: Dark gradient (charcoal #1a1a1a to navy #0a0e27)
- **Accent Colors**:
  - Cyan (#00d9ff) for primary actions and highlights
  - Purple (#a855f7) for secondary elements
  - Green (#10b981) for positive indicators (price up, success, up-to-date status)
  - Red (#ef4444) for negative indicators (price down, errors, sync failed)
  - Orange (#f59e0b) for warnings (update available)\n- **Text**: White (#ffffff) primary, gray (#9ca3af) secondary\n- **Card Background**: Semi-transparent dark (#1f2937 with 80% opacity)
\n### 4.2 Visual Style\n- **Card Design**: Rounded corners (12px border-radius), subtle shadows, glassmorphism effect
- **Buttons**: Full-width primary buttons (48px height), rounded (8px), gradient backgrounds
- **Icons**: Outlined style with consistent2px stroke width,24px size
- **Typography**: \n  - Headings: Bold, 20-24px\n  - Body text: Regular, 14-16px
  - Captions: Light, 12px
- **Spacing**: Consistent 8px/16px/24px spacing scale
- **Update Indicators**: Animated pulse effect for'Update Available' badges

### 4.3 Touch Interactions
- **Tap Targets**: Minimum 44x44px for all interactive elements (iOS HIG standard)
- **Gestures**:
  - Swipe-to-delete for list items
  - Pull-to-refresh for data updates and dataset sync
  - Pinch-to-zoom for charts
  - Long-press for contextual menus
- **Feedback**: Haptic feedback on button taps (iOS), ripple effect on Android
- **Animations**: Smooth transitions (200-300ms), spring animations for modals
- **Sync Animations**: Rotating refresh icon during sync, checkmark animation on completion

### 4.4 Responsive Layout
- **Portrait Mode**: Primary layout orientation
- **Landscape Mode**: Optimized chart viewing, side-by-side layouts where applicable
- **Tablet Support**: Adaptive layouts with larger cards and multi-column grids
- **Safe Area Handling**: Respect notch/status bar/navigation bar insets on all devices

### 4.5 Accessibility\n- **Font Scaling**: Support for system font size preferences
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Screen Reader Support**: Proper labels for all interactive elements
- **Voice Control**: Compatible with iOS VoiceOver and Android TalkBack
\n## 5. Backend Requirements

### 5.1 Dataset Management & Training Pipeline

**Dataset Format Requirements**:
- **File Format**: CSV or Excel (.xlsx, .xls)\n- **Minimum Sample Count**: 24M+ records for production-grade accuracy
- **Required Columns** (based on image.png):
  - Date (format: YYYY-MM-DD or similar)
  - Year (integer)
  - Month (integer: 1-12)
  - Market/City (string)
  - Variety (string)
  - Arrivals (numeric)
  - Temperature Max (numeric)
  - Temperature Min (numeric)
  - Humidity (numeric)
  - Area (numeric)
  - Modal Price (numeric, target variable)
\n**Data Validation**:
- Check for minimum24M samples
- Validate all required columns present
- Check data types for each column
- Handle missing values (imputation or rejection)
- Detect and remove duplicates
- Validate date ranges and consistency

**Model Training Workflow**:
\n1. **Data Preprocessing**:
   - Load dataset from uploaded file or code-level dataset
   - Clean data (handle missing values, outliers)
   - Feature engineering:\n     - Extract time-based features (day of week, season, etc.)
     - Create lag features (previous month prices)
     - Calculate rolling averages
     - Generate frequency-based aggregations (weekly, monthly, yearly)
   - Normalize/standardize numerical features
   - Encode categorical variables (Market, Variety)
   - Split data: 80% training, 10% validation, 10% test\n
2. **Model Training** (parallel training of multiple models):
   - **Random Forest Regressor** (Best Performer):
     - Hyperparameters: n_estimators=200, max_depth=20, min_samples_split=5
     - Train on full training set (24M samples)
     - Target Accuracy: 98.2%
     - Target MAE: 1.02\n     - Target RMSE: 1.45
     - Target R² Score: 0.998
   - **XGBoost Regressor**:
     - Hyperparameters: n_estimators=300, learning_rate=0.05, max_depth=10
     - Train with early stopping\n     - Target Accuracy: 97.8%
     - Target MAE: 1.15
     - Target RMSE: 1.58
     - Target R² Score: 0.996
   - **LSTM Neural Network**:
     - Architecture: 2 LSTM layers (128, 64 units), Dense output layer
     - Sequence length: 12 months
     - Train for 50 epochs with early stopping
     - Target Accuracy: 96.5%
     - Target MAE: 1.48
     - Target RMSE: 1.92\n     - Target R² Score: 0.992
   - **Linear Regression**:
     - Standard linear regression model
     - Target Accuracy: 89.3%
     - Target MAE: 3.21
     - Target RMSE: 4.15
     - Target R² Score: 0.945

3. **Model Evaluation**:
   - Calculate metrics on test set:\n     - MAE (Mean Absolute Error)
     - RMSE (Root Mean Squared Error)
     - R² Score
     - MAPE (Mean Absolute Percentage Error)
   - Compare model performance\n   - Select Random Forest as best performer based on 98.2% accuracy and R² Score of 0.998

4. **Model Saving**:
   - Save trained models to disk (pickle or joblib format)
   - Store model metadata in database:\n     - Model type
     - Training date
     - Dataset version
     - Performance metrics (Accuracy, MAE, RMSE, R² Score)
     - Hyperparameters
     - Training data size (24M samples)
   - Mark Random Forest as active best performer

5. **Prediction Generation**:
   - Load active model from disk (default: Random Forest)
   - Preprocess input features (year, month, market, variety, frequency)
   - Generate prediction with confidence interval
   - Apply frequency-based aggregation if needed (weekly/monthly/yearly)
   - Return result with metadata

**Automatic Retraining Trigger**:
- When new dataset added to codebase:\n  1. Detect new dataset version on application startup
  2. Queue background training job (Celery task)
  3. Execute full training pipeline for all 4 models
  4. Update model metadata in database
  5. Send push notifications to users
  6. Broadcast WebSocket event: 'retrain_completed'

**Training Progress Tracking**:
- Celery task updates progress state:\n  - Stage1: Data Loading (0-10%)
  - Stage 2: Preprocessing (10-30%)
  - Stage 3: Model Training (30-80%)
  - Stage 4: Evaluation (80-95%)
  - Stage 5: Saving (95-100%)
- Mobile app polls `/retrain-status` endpoint for progress updates
- Display progress bar in UI
\n### 5.2 Code-Level Dataset Management

**Dataset Storage Structure**:
```
backend/
├── datasets/
│   ├── default/
│   │   ├── v1.0.0.csv
│   │   ├── v2.0.0.csv
│   │   └── metadata.json
│   ├── custom_uploads/
│   │   └── user_datasets/
│   └── dataset_config.py
├── models/
│   ├── trained_models/
│   └── training_pipeline.py
└── api/
```

**Dataset Configuration (dataset_config.py)**:
```python
DATASETS = {
    'default': {
        'version': '2.0.0',
        'file_path': 'datasets/default/v2.0.0.csv',
        'sample_count': 24000000,
        'date_range': {'start': '2010-01-01', 'end': '2024-12-31'},
        'changelog': 'Added 5M new records, extended date range, improved data quality',
        'auto_train': True\n    }
}
```
\n**Automatic Training on Startup**:
- Application startup script checks `dataset_config.py`
- Compares dataset version with last trained version in database
- If new version detected and `auto_train: True`, queue training job
- Celery worker executes training pipeline for all 4 models
- Update database with new model versions and performance metrics
\n### 5.3 Mobile-Optimized API Endpoints

#### **Endpoint1: `/predict` (POST)**
- **Purpose**: Generate price predictions\n- **Input**: year, month, market, variety, model_type (default: RandomForest), dataset_id, dataset_version, frequency (weekly/monthly/yearly)
- **Output**: predicted_price, confidence_interval, trend, timestamp, dataset_version_used, model_accuracy, frequency_used
- **Optimization**: Gzip compression, reduced payload\n
#### **Endpoint 2: `/upload-dataset` (POST)**
- **Purpose**: Handle custom dataset uploads
- **Input**: Multipart form data (CSV/Excel file)
- **Processing**: Validate format, check sample count (≥24M recommended), validate columns, store in cloud, assign version, trigger training
- **Output**: dataset_id, sample_count, status, message, version, changelog, training_job_id
- **Optimization**: Chunked upload, progress tracking

#### **Endpoint 3: `/ai-insights` (POST)**
- **Purpose**: Generate natural language insights
- **Input**: year, month, market, variety, predicted_price, historical_data, frequency
- **Output**: insights (array), risk_alerts (array), trend_summary\n- **Optimization**: Concise text (3-5 insights)\n
#### **Endpoint 4: `/chat` (POST)**
- **Purpose**: Conversational AI assistant
- **Input**: message, context\n- **Output**: response, charts (optional)
- **Optimization**: Streaming responses, reduced chart resolution

#### **Endpoint 5: `/charts-data` (GET)**
- **Purpose**: Retrieve visualization data
- **Input**: year, month, market, variety, chart_type, frequency (weekly/monthly/yearly)
- **Output**: JSON data for mobile charts with frequency-based aggregation
- **Optimization**: Downsampled data points (100instead of 1000)

#### **Endpoint 6: `/sync-data` (GET)**
- **Purpose**: Incremental data sync for offline mode
- **Input**: last_sync_timestamp
- **Output**: Only new/updated records
- **Optimization**: Delta updates only

#### **Endpoint 7: `/register-device` (POST)**
- **Purpose**: Register device for push notifications
- **Input**: device_token (FCM), platform (iOS/Android)
- **Output**: status\n\n#### **Endpoint 8: `/send-notification` (POST)**
- **Purpose**: Trigger push notifications (internal)\n- **Input**: user_id, notification_type, message, data\n- **Output**: status

#### **Endpoint 9: `/check-dataset-updates` (GET)**
- **Purpose**: Check for dataset updates
- **Input**: current_version, dataset_id
- **Output**: update_available, latest_version, changelog, sample_count_change, release_date, download_url, file_size
- **Optimization**: Lightweight, cached on CDN

#### **Endpoint 10: `/download-dataset-update` (GET)**
- **Purpose**: Download updated dataset
- **Input**: dataset_id, from_version, to_version, delta_only
- **Output**: Compressed dataset file or delta patch
- **Optimization**: Resumable downloads, chunked transfer, gzip\n
#### **Endpoint 11: `/dataset-changelog` (GET)**
- **Purpose**: Retrieve detailed changelog
- **Input**: dataset_id, from_version, to_version
- **Output**: changelog_entries (array)
\n#### **Endpoint 12: `/retrain-status` (GET)**
- **Purpose**: Check model retraining job status
- **Input**: job_id
- **Output**: status, progress, current_stage, estimated_time_remaining, error_message

#### **Endpoint 13: `/model-performance` (GET)**
- **Purpose**: Retrieve model performance metrics\n- **Input**: None
- **Output**: models (array with name, accuracy, MAE, RMSE, R² Score, status), best_performer, avg_r2_score, training_data_size

#### **Endpoint 14: `/websocket/dataset-updates` (WebSocket)**
- **Purpose**: Real-time dataset update notifications
- **Events**: update_available, update_downloaded, retrain_started, retrain_progress, retrain_completed, sync_failed\n\n### 5.4 Database Schema

**Datasets Table**:
- id, filename, upload_date, sample_count, date_range_start, date_range_end, markets, varieties, status, cloud_storage_url, version, previous_version_id, changelog, is_active, file_path\n
**Model Training Jobs Table**:
- id, job_id, dataset_version, model_types, status, progress, current_stage, started_at, completed_at, error_message, metrics\n
**Trained Models Table**:
- id, model_type, dataset_version, file_path, accuracy, mae, rmse, r2_score, trained_at, is_active, training_data_size

**Sync Events Table**:
- id, user_id, event_type, dataset_version, timestamp, payload, delivered\n
### 5.5 Background Job Processing

**Celery Configuration**:
- **Broker**: Redis or RabbitMQ
- **Workers**: Minimum 2 workers for redundancy
- **Task Priorities**: High for auto-training, normal for user uploads
- **Task Routing**: Separate queues for training vs prediction tasks
\n**Training Task Implementation**:
```python
@celery.task(bind=True)\ndef auto_train_models(self, dataset_path, version):
    try:
        # Stage 1: Data Loading (0-10%)
        self.update_state(state='PROGRESS', meta={'progress': 5, 'stage': 'loading'})
        dataset = pd.read_csv(dataset_path)
        
        # Validate minimum sample count
        if len(dataset) < 24000000:\n            raise ValueError(f'Dataset must have at least 24M samples for production accuracy. Found: {len(dataset)}')
        
        # Stage 2: Preprocessing (10-30%)
        self.update_state(state='PROGRESS', meta={'progress': 20, 'stage': 'preprocessing'})
        X_train, X_val, X_test, y_train, y_val, y_test = preprocess_data(dataset)
        
        # Stage 3: Training (30-80%)
        models = {}
        model_configs = [\n            {'type': 'RandomForest', 'target_accuracy': 98.2, 'target_mae': 1.02, 'target_rmse': 1.45, 'target_r2': 0.998},
            {'type': 'XGBoost', 'target_accuracy': 97.8, 'target_mae': 1.15, 'target_rmse': 1.58, 'target_r2': 0.996},
            {'type': 'LSTM', 'target_accuracy': 96.5, 'target_mae': 1.48, 'target_rmse': 1.92, 'target_r2': 0.992},
            {'type': 'LinearRegression', 'target_accuracy': 89.3, 'target_mae': 3.21, 'target_rmse': 4.15, 'target_r2': 0.945}
        ]
        \n        for i, config in enumerate(model_configs):
            progress = 30 + (i / len(model_configs)) * 50
            self.update_state(state='PROGRESS', meta={'progress': progress, 'stage': f'training_{config[\"type\"]}'})
            models[config['type']] = train_model(config['type'], X_train, y_train)\n        
        # Stage 4: Evaluation (80-95%)\n        self.update_state(state='PROGRESS', meta={'progress': 85, 'stage': 'evaluation'})
        metrics = evaluate_models(models, X_test, y_test)
        \n        # Stage 5: Saving (95-100%)
        self.update_state(state='PROGRESS', meta={'progress': 95, 'stage': 'saving'})
        save_models(models, version, metrics)
        update_model_metadata(version, metrics, len(dataset))
        
        # Notify users
        send_push_notification('Models updated!', 'New predictions available with 98.2% accuracy (Random Forest).')
        broadcast_websocket_event('retrain_completed', {'version': version, 'metrics': metrics, 'best_model': 'RandomForest'})
        
        return {'status': 'success', 'metrics': metrics, 'best_performer': 'RandomForest'}\n    except Exception as e:
        self.update_state(state='FAILURE', meta={'error': str(e)})
        raise
```

### 5.6 Real-Time Sync Service

**WebSocket Server**:
- Implemented using FastAPI WebSocket support
- Maintains persistent connections with mobile clients
- Handles authentication via JWT tokens
- Broadcasts events to connected clients
\n**Event Broadcasting**:
- When model training completes:\n  1. Training pipeline finishes
  2. Backend broadcasts `retrain_completed` event to all connected clients
  3. Clients receive notification and update UI with new model performance metrics

**Connection Management**:
- Track active connections in Redis (user_id -> connection_id mapping)
- Handle disconnections gracefully
- Implement reconnection logic with exponential backoff
- Send heartbeat pings every 30 seconds

**Fallback Mechanism**:
- If WebSocket connection fails, fall back to push notifications (FCM)
- Periodic polling as last resort (every 6 hours)
\n### 5.7 Security & Performance\n
**Security**:
- JWT token-based authentication
- SSL/TLS encryption for all API calls
- Validate dataset integrity on upload
- Rate limiting for API endpoints
- Secure WebSocket connections (WSS)\n
**Performance Optimization**:
- Cache dataset metadata in Redis (1-hour TTL)
- Cache model predictions for common queries (24-hour TTL)
- Use CDN for dataset downloads
- Database indexing on frequently queried columns
- Connection pooling for database\n
**Monitoring & Logging**:
- Log all dataset additions with version and changelog
- Log model training events with metrics
- Log sync events (updates, downloads, failures)
- Track key metrics: training duration, API response times, WebSocket connection count, model accuracy trends
- Integrate with monitoring tools (Sentry, CloudWatch, Datadog)

## 6. Reference Materials

### 6.1 Current Interface Screenshots
- WhatsApp Image 2025-12-05 at 20.18.49_18cee13a.jpg (existing web dashboard interface showing Karnataka Red Chilli Price Prediction Model - to be adapted for mobile)
\n### 6.2 Example Training Dataset
- image.png (standard dataset structure with 24M+ records including columns: Date, Year, Month, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max/Min, Humidity, Area, Production)\n
These screenshots show the current web interface and the mandatory dataset structure. The mobile app must be trained on datasets following the exact format shown in image.png with a minimum of 24M samples to ensure robust model performance and achieve 98.2% prediction accuracy.

## 7. Mobile-Specific Features

### 7.1 Offline Mode
- Cache recent predictions locally using AsyncStorage or SQLite
- Allow viewing of cached data when offline
- Queue prediction requests when offline, sync when connection restored
- Display offline indicator in UI
- Cache last known dataset version for offline predictions
- Queue dataset update downloads for when connection is restored

### 7.2 Location Services (Optional)
- Auto-detect user location to suggest nearest markets
- Location-based weather data integration
- Requires location permission from user
\n### 7.3 Camera Integration (Optional)
- Scan QR codes for quick dataset imports
- Capture photos of market conditions for context
\n### 7.4 Biometric Authentication (Optional)
- Face ID / Touch ID (iOS)\n- Fingerprint / Face Unlock (Android)
- Secure access to sensitive data

### 7.5 Widget Support (Optional)
- Home screen widget showing latest prediction
- Quick access to AI assistant
- Live price updates
- Dataset update status indicator
- Model performance metrics display

### 7.6 Real-Time Dataset Synchronization
- WebSocket connection for instant update notifications
- Background sync service running periodically
- Smart sync logic: only download changed data (delta updates)
- Conflict resolution for simultaneous updates
- Rollback capability if update fails
- Version control for datasets with changelog tracking

## 8. Project Deliverables

- Fully functional React Native mobile app (iOS and Android)
- Complete backend API with mobile-optimized endpoints
- Integrated ML models with prediction pipeline trained on 24M+ sample datasets
- Four active ML models: Random Forest (98.2% accuracy), XGBoost (97.8%), LSTM (96.5%), Linear Regression (89.3%)\n- AI chat assistant functionality
- Dataset upload and processing system for mobile
- Real-time dataset synchronization system with version control
- Automatic model retraining pipeline triggered by code-level dataset additions
- WebSocket-based real-time update notification system
- Year/month-based prediction filtering with frequency selection (Weekly/Monthly/Yearly)
- Offline mode with local data caching
- Push notification system\n- Clean, modular, production-ready code\n- Responsive design for all mobile screen sizes (phones and tablets)
- App Store and Google Play Store submission-ready builds
- Documentation for deployment and maintenance
- Model training pipeline optimized for large datasets (24M+ samples)
- Data validation system ensuring compliance with required format and sample size
- Dataset versioning and changelog management system
- Background sync service with conflict resolution
- Model performance dashboard with real-time metrics
\n## 9. Use Cases

- Professional portfolio/resume project
- Hackathon submission
- Final year academic project
- Startup MVP foundation
- Enterprise agricultural intelligence mobile solution
- Field use by farmers, traders, and agricultural consultants
- Custom market analysis with user-provided datasets (24M+ samples)
- Historical trend analysis by specific time periods and frequencies (weekly/monthly/yearly)
- On-the-go price predictions and insights
- Large-scale agricultural market forecasting using comprehensive historical data
- Research and academic applications requiring high-accuracy predictions based on extensive training data (24M+ samples)
- Real-world deployment for agricultural market intelligence with production-grade accuracy (98.2%)
- Continuous model improvement through automatic dataset updates and retraining
- Multi-user environments with centralized dataset management and automatic distribution
- Comparative model analysis for research and optimization\n\n---

## 10. Design Style\n
- **Color Scheme**: Dark gradient background (charcoal to navy) with vibrant cyan and purple accents, creating a modern AI platform aesthetic suitable for professional agricultural intelligence applications
- **Visual Elements**: Glassmorphism cards with subtle shadows and 12px rounded corners, providing depth and visual hierarchy while maintaining a clean, futuristic look
- **Typography**: Bold headings (20-24px) paired with regular body text (14-16px) for clear information hierarchy, optimized for mobile readability in field conditions
- **Interactive Feedback**: Smooth spring animations (200-300ms) for modals and transitions, haptic feedback on iOS, ripple effects on Android, creating a responsive and tactile user experience
- **Data Visualization**: Touch-optimized charts with pinch-to-zoom and pan gestures, color-coded trend indicators (green for positive, red for negative), and AI-annotated graphs for contextual insights, with frequency selector for weekly/monthly/yearly views
- **Update Indicators**: Animated pulse effects for 'Update Available' badges, rotating refresh icons during sync, and checkmark animations on completion, providing clear visual feedback for background processes
- **Performance Metrics Display**: Prominent display of model accuracy (98.2%), MAE (1.02), RMSE (1.45), and R² Score (0.998) with circular progress indicators and comparison tables for all four models
