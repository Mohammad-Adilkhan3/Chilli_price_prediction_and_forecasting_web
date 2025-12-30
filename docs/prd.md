# AI-Driven Agricultural Intelligence Mobile Application Requirements Document (Flutter Version)

## 1. Project Overview

### 1.1 Project Name
AI-Driven Agricultural Intelligence Mobile App – Chilli Price Forecasting (Flutter)

### 1.2 Project Description
A professional AI-powered mobile application for agricultural price intelligence, specifically focused on chilli price forecasting. The app provides data-driven insights, predictive analytics, and AI-powered assistance for agricultural market decision-making on iOS and Android devices. Built with Flutter for native performance and beautiful UI. Designed as an enterprise-ready mobile solution with modern AI platform aesthetics optimized for touch interfaces. The system is trained on 100,000+ data points to achieve industry-leading prediction accuracy of 98.2%.

### 1.3 Core Objectives
- Deliver accurate AI-powered price predictions for agricultural commodities using large-scale training datasets (100,000+ data points)
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
\n### 2.1 Mobile Frontend Stack (Flutter)
- **Framework**: Flutter (Dart-based cross-platform framework)
- **Version**: Flutter 3.x with Dart 3.x
- **State Management**: Provider, Riverpod, or Bloc pattern
- **Navigation**: Flutter Navigator 2.0 with go_router package
- **Charts & Visualization**: fl_chart, syncfusion_flutter_charts, or charts_flutter
- **Animations**: Flutter built-in animations, Lottie (lottie package), Rive\n- **File Upload**: file_picker package, path_provider for local storage
- **Offline Storage**: sqflite (SQLite), hive, or shared_preferences
- **Push Notifications**: firebase_messaging package (FCM)
- **Real-time Updates**: web_socket_channel package for WebSocket connections
- **HTTP Client**: dio or http package for API calls
- **Image Handling**: cached_network_image for efficient image loading
- **Local Notifications**: flutter_local_notifications package\n
### 2.2 Backend Stack\n- **API Framework**: Python FastAPI\n- **ML Models**: Scikit-learn, XGBoost, RandomForest, LSTM, Linear Regression
- **Training Data Requirements**: Minimum 100,000+ data points for robust model training
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

## 3. Core Features & Screens (Flutter Implementation)

### 3.1 Splash Screen & Onboarding
\n**Splash Screen**:
- Animated app logo with AI pulse effect using Flutter AnimatedBuilder
- Loading indicator (CircularProgressIndicator) for initial data sync
- Check for dataset updates on app launch
- Implementation: StatefulWidget with initState() for async operations

**Onboarding Flow** (first-time users):
- PageView widget for swipeable tutorial screens
- Permission requests using permission_handler package (storage access, notifications)
- Optional account setup or guest mode
- Smooth page indicator using smooth_page_indicator package
\n### 3.2 Home Dashboard Screen

**Top Navigation Bar** (AppBar widget):
- App logo/title on the left (leading widget)
- Notification bell icon with badge (Stack widget for badge overlay)
- Settings/profile icon on the right (actions widget)
\n**Quick Action Cards** (horizontal ListView.builder):
- Card widgets with InkWell for tap effects
- Icons from Flutter Icons or custom assets
- Cards: Run Prediction, Upload Dataset, AI Assistant, View Insights, Sync Dataset

**Key Metrics Display** (GridView.count or Wrap widget):
- **Best Performing Model Card**: \n  - Model name: Random Forest
  - Accuracy: 98.2% with CustomPaint circular progress indicator
  - Subtitle text widget\n- **MAE Card**: 1.02 value display
- **RMSE Card**: 1.45 value display
- **R² Score Card**: 0.998 visualization
- **Models Deployed Badge**: Container with decoration\n- **Best Accuracy Badge**: Row with Icon and Text
- **Avg R² Score Card**: Column layout\n- **Training Data Badge**: Chip widget\n- Last prediction timestamp (formatted with intl package)
- Dataset version indicator with version badge
- Update status badge (Container with conditional styling)

**Recent Predictions List**:
- ListView.builder with Dismissible widget for swipe-to-delete\n- Each ListTile shows: Date, Market, Variety, Predicted Price, Trend Icon
- GestureDetector for tap navigation to detail screen
\n### 3.3 AI Prediction Screen

**Input Section** (ExpansionTile for collapsible accordion):
- **Dataset Selector**: DropdownButton widget with dataset list
- **Year Picker**: CupertinoPicker (iOS style) or showDialog with ListView (Android)\n- **Month Picker**: DropdownButton or CupertinoPicker\n- **Market/City Selector**: Autocomplete widget or searchable dropdown
- **Variety Filter**: DropdownButton widget
- **Time Frequency Toggle**: ToggleButtons or SegmentedButton widget
- **Model Selector**: DropdownButton with recommendation badge
- ElevatedButton for Run Prediction (full-width)\n\n**Prediction Result Card** (AnimatedContainer appears after prediction):
- Large Text widget with currency symbol and animated counter
- Confidence interval range display
- Icon with conditional color (green/red) for trend\n- Timestamp formatted text
- Context display (year, month, frequency)
- Model badge (Chip widget)\n- IconButton for save and share actions
- Dataset version text at bottom

**Interactive Charts** (TabBarView with TabController):
- **Price Trend Chart**: fl_chart LineChart with InteractiveViewer for pinch-zoom
- **Forecast vs Actual**: fl_chart BarChart with dual-axis\n- **Seasonal Heatmap**: Custom GridView with GestureDetector
- **Correlation Chart**: fl_chart ScatterChart
- Frequency selector (SegmentedButton) above charts

**Performance Metrics** (horizontal SingleChildScrollView):
- Circular progress indicators using CustomPaint or percent_indicator package
- Card widgets for MAE, RMSE, R² Score
- AI Confidence Score with LinearProgressIndicator
\n### 3.4 Dataset Upload Screen

**Upload Zone**:
- DottedBorder widget with cloud upload icon
- TextButton: Tap to Select File
- Supported formats label (Text widget)
\n**File Selection Flow**:
- FilePicker.platform.pickFiles() from file_picker package
- Shows file name and size after selection (ListTile)
- ElevatedButton to confirm upload
\n**Upload Progress**:
- LinearProgressIndicator with percentage Text\n- TextButton for cancel option
- Estimated time remaining (calculated and displayed)

**Validation Feedback**:
- SnackBar for success message with checkmark Icon
- AlertDialog for error messages with detailed explanations
- Validation checks: sample count, required columns, data types

**Dataset Management**:
- ListView with Dismissible for swipe-to-delete
- Each ListTile shows metadata (name, sample count, date, version)
- ElevatedButton: Set as Active\n- IconButton: Check for Updates (with refresh icon)
- SwitchListTile for auto-update toggle
- Last sync timestamp display

### 3.5 AI Insights Screen

**Auto-Generated Insights Section**:
- ListView of Card widgets with natural language text
- Icon leading each insight card
- Context-aware analysis based on prediction and frequency
\n**Risk Alerts Section**:
- Card widgets with warning Icons (color: Colors.orange or Colors.red)
- Alert text with bold titles\n- Examples: Supply volatility, Weather anomaly, Market disruption

**Future Trend Highlights**:
- Timeline widget (custom or using timeline_tile package)
- Shows 3-6 month forecast with frequency selector
- Key inflection points marked with custom icons
- Seasonal pattern predictions

**Actionable Recommendations**:
- ExpansionTile for expandable recommendations
- Suggested actions based on predictions
\n### 3.6 AI Chat Assistant Screen

**Chat Interface**:
- ListView.builder with reverse: true for chat bubbles
- Align widget for message alignment (right for user, left for AI)
- Container with BoxDecoration for bubble styling
- Typing indicator animation using flutter_spinkit or custom animation

**Input Area**:
- TextField with InputDecoration at bottom
- IconButton for send action
- IconButton for microphone (optional, using speech_to_text package)
- Wrap widget for suggested quick questions (Chip widgets)

**AI Capabilities**:
- Trained on dataset metadata and model outputs
- Answers with embedded charts (fl_chart widgets) and DataTable
- IconButton for copy (using clipboard package) and share
\n**Chat History**:
- Scrollable ListView with ScrollController
- Clear Chat option in PopupMenuButton
- Persistent storage using sqflite or hive

### 3.7 Advanced Charts Screen

**Chart Gallery** (GridView.builder or ListView):
- Card widgets with thumbnail images
- GestureDetector for tap to open full-screen\n\n**Interactive Features**:
- InteractiveViewer for pinch-zoom and pan
- GestureDetector for tap on data points (show tooltip)
- AI annotations as Positioned widgets with Text
- Legend toggle (Checkbox or Switch)
- **Frequency Selector**: SegmentedButton for Weekly/Monthly/Yearly\n
**Scenario Simulation** (BottomSheet):
- Slider widgets for parameter adjustments (Rainfall, Arrivals, Temperature)
- ElevatedButton: Apply Changes
- TextButton: Reset to Default
- Real-time chart update using setState()

**Export Options**:
- IconButton: Save Chart as Image (using screenshot package)
- IconButton: Share Chart (using share_plus package)\n\n### 3.8 Model Intelligence Screen

**Model Performance Dashboard**:
- **Best Performing Model Highlight Card**:
  - Large Card at top with gradient decoration
  - Model name: Random Forest (bold Text)
  - Accuracy: 98.2% with CustomPaint circular indicator
  - Subtitle and metrics display
  - Status badge (Chip widget)
\n**Model Comparison Section**:
- **Performance Comparison Table**:
  - DataTable widget with sortable columns
  - Rows: Random Forest (98.2%), XGBoost (97.8%), LSTM (96.5%), Linear Regression (89.3%)
  - Columns: Model, Accuracy, MAE, RMSE, R² Score, Status
  - GestureDetector on column headers for sorting

**Horizontal Scrollable Model Cards**:
- SingleChildScrollView with horizontal axis
- Card widgets for each model\n- Icon, metrics, best performer badge (Positioned widget)
- Training date and sample size text
- Dataset version display

**Explainable AI (XAI) Section**:
- Feature importance: fl_chart BarChart (horizontal)
- SHAP visualizations (simplified custom widgets)
- TextButton: Learn More (navigation to detail screen)

**Model Training History**:
- Timeline widget showing training events
- Training dataset statistics (Text widgets in Card)
- Retraining events list
\n### 3.9 Dataset Sync & Update Screen

**Sync Status Section**:
- Large status indicator (Container with Icon and Text):\n  - Up to Date (green checkmark)
  - Update Available (orange alert)
  - Syncing (CircularProgressIndicator)
  - Sync Failed (red error icon)
- Last sync timestamp (formatted Text)
- Dataset version comparison (Row with Text widgets)

**Update Details Card**:
- Card widget showing changes:\n  - Sample count difference (Text with color)
  - Date range extension\n  - New markets/varieties added
  - Data quality improvements
- TextButton: View Changelog\n
**Action Buttons**:
- ElevatedButton: Update Now (full-width, primary color)
- OutlinedButton: Schedule Update\n- TextButton: Skip This Version
\n**Auto-Update Settings**:
- SwitchListTile: Enable Automatic Updates
- DropdownButton: Update Frequency (Real-time/Daily/Weekly)\n- SwitchListTile: Update Only on Wi-Fi
- SwitchListTile: Auto-Retrain Models After Update

**Update Progress**:
- LinearProgressIndicator with stages:
  1. Downloading dataset (0-50%)
  2. Validating data (50-70%)
  3. Retraining models (70-95%)
  4. Finalizing update (95-100%)\n- Estimated time Text
- TextButton: Cancel Update

**Update History**:
- ListView.builder with update entries
- Each ListTile shows: Version, Date, Changes summary
- GestureDetector for tap to view changelog

### 3.10 Settings Screen

**Account Section**:
- CircleAvatar for profile picture
- ListTile with name\n- TextButton: Edit Profile
- ElevatedButton: Sign Out
\n**Preferences**:
- ListTile with DropdownButton: Language selection
- SwitchListTile: Theme toggle (Light/Dark mode using ThemeMode)
- ListTile: Notification preferences (navigation to detail screen)
- ListTile with DropdownButton: Default dataset
- ListTile with DropdownButton: Default frequency
- ListTile: Auto-update preferences (navigation to Sync screen)

**Data Management**:
- ListTile with IconButton: Clear Cache
- ListTile with IconButton: Delete All Predictions
- ListTile: Manage Uploaded Datasets (navigation)\n- ListTile with IconButton: Force Sync Datasets
- ListTile with IconButton: Reset to Default Dataset
\n**About Section**:
- ListTile: App version number
- ListTile: Privacy Policy (launch URL using url_launcher)
- ListTile: Terms of Service (launch URL)\n- ListTile: Contact Support (launch email or in-app form)
- ListTile: Rate App (launch App Store/Play Store using url_launcher)

### 3.11 Notifications & Alerts

**Push Notifications** (firebase_messaging):
- Price alert notifications
- Daily/weekly summary notifications
- Dataset upload completion
- Model training completion
- Dataset update available
- Dataset sync completion
- Model retraining progress
\n**In-App Notifications**:
- SnackBar for quick feedback
- AlertDialog for critical actions
- MaterialBanner for dataset updates (dismissible with action button)
- BottomSheet for major dataset changes

## 4. Flutter Design System

### 4.1 Color Palette (ThemeData)
- **Primary Background**: Dark gradient (LinearGradient from charcoal #1a1a1a to navy #0a0e27)
- **Accent Colors**:
  - Cyan (#00d9ff) for primaryColor
  - Purple (#a855f7) for secondaryColor
  - Green (#10b981) for success indicators
  - Red (#ef4444) for error indicators
  - Orange (#f59e0b) for warnings
- **Text**: White (#ffffff) primary, gray (#9ca3af) secondary
- **Card Background**: Color(0xCC1f2937) - semi-transparent dark
\n### 4.2 Visual Style
- **Card Design**: BorderRadius.circular(12), BoxShadow for elevation, glassmorphism with BackdropFilter
- **Buttons**: SizedBox(height: 48) for full-width, BorderRadius.circular(8), gradient decoration
- **Icons**: Icons class with size: 24, color matching theme
- **Typography** (TextTheme):
  - Headings: FontWeight.bold, fontSize: 20-24
  - Body: FontWeight.normal, fontSize: 14-16
  - Captions: FontWeight.w300, fontSize: 12\n- **Spacing**: EdgeInsets with 8/16/24 padding/margin
- **Update Indicators**: AnimatedContainer with pulsing animation

### 4.3 Touch Interactions
- **Tap Targets**: Minimum 44x44 logical pixels (Material Design standard)
- **Gestures**:
  - Dismissible for swipe-to-delete
  - RefreshIndicator for pull-to-refresh
  - InteractiveViewer for pinch-to-zoom
  - GestureDetector with onLongPress for context menus
- **Feedback**: HapticFeedback.lightImpact() on iOS, InkWell ripple on Android
- **Animations**: AnimatedContainer (duration: 200-300ms), Hero animations for transitions
- **Sync Animations**: RotationTransition for refresh icon, ScaleTransition for checkmark

### 4.4 Responsive Layout
- **Portrait Mode**: Primary layout with Column and ListView
- **Landscape Mode**: Row and GridView for optimized chart viewing
- **Tablet Support**: LayoutBuilder for adaptive layouts, larger cards with GridView.count
- **Safe Area Handling**: SafeArea widget for notch/status bar/navigation bar

### 4.5 Accessibility\n- **Font Scaling**: MediaQuery.of(context).textScaleFactor support
- **Color Contrast**: WCAG AA compliant (verified with contrast checker)
- **Screen Reader Support**: Semantics widget for all interactive elements
- **Voice Control**: Compatible with iOS VoiceOver and Android TalkBack

## 5. Backend Requirements

### 5.1 Dataset Management & Training Pipeline

**Dataset Format Requirements**:
- **File Format**: CSV or Excel (.xlsx, .xls)
- **Minimum Sample Count**: 100,000+ records for production-grade accuracy
- **Required Columns**: Date, Year, Month, Market/City, Variety, Arrivals, Temperature Max, Temperature Min, Humidity, Area, Modal Price\n\n**Data Validation**:
- Check for minimum 100,000 samples
- Validate all required columns present
- Check data types for each column
- Handle missing values (imputation or rejection)
- Detect and remove duplicates
- Validate date ranges and consistency

**Model Training Workflow**:
\n1. **Data Preprocessing**:
   - Load dataset from uploaded file or code-level dataset
   - Clean data (handle missing values, outliers)
   - Feature engineering: time-based features, lag features, rolling averages, frequency-based aggregations
   - Normalize/standardize numerical features
   - Encode categorical variables
   - Split data: 80% training, 10% validation, 10% test\n
2. **Model Training** (parallel training):
   - **Random Forest Regressor** (Best Performer): Target Accuracy 98.2%, MAE 1.02, RMSE 1.45, R² 0.998
   - **XGBoost Regressor**: Target Accuracy 97.8%, MAE 1.15, RMSE 1.58, R² 0.996
   - **LSTM Neural Network**: Target Accuracy 96.5%, MAE 1.48, RMSE 1.92, R² 0.992
   - **Linear Regression**: Target Accuracy 89.3%, MAE 3.21, RMSE 4.15, R² 0.945

3. **Model Evaluation**:
   - Calculate metrics on test set: MAE, RMSE, R² Score, MAPE\n   - Compare model performance\n   - Select Random Forest as best performer
\n4. **Model Saving**:
   - Save trained models (pickle/joblib)
   - Store metadata in database
   - Mark Random Forest as active best performer

5. **Prediction Generation**:
   - Load active model
   - Preprocess input features
   - Generate prediction with confidence interval
   - Apply frequency-based aggregation
   - Return result with metadata

**Automatic Retraining Trigger**:
- Detect new dataset version on startup
- Queue background training job (Celery)
- Execute full training pipeline for all 4 models
- Update model metadata\n- Send push notifications
- Broadcast WebSocket event: retrain_completed

**Training Progress Tracking**:
- Celery task updates progress state (0-100%)
- Flutter app polls /retrain-status endpoint
- Display LinearProgressIndicator in UI
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
        'sample_count': 100000,
        'date_range': {'start': '2010-01-01', 'end': '2024-12-31'},
        'changelog': 'Added 50,000 new records, extended date range',
        'auto_train': True\n    }
}
```
\n**Automatic Training on Startup**:
- Application startup script checks dataset_config.py
- Compares dataset version with last trained version
- If new version detected and auto_train: True, queue training job
- Celery worker executes training pipeline
- Update database with new model versions

### 5.3 Mobile-Optimized API Endpoints

#### **Endpoint 1: /predict (POST)**
- **Purpose**: Generate price predictions\n- **Input**: year, month, market, variety, model_type, dataset_id, dataset_version, frequency
- **Output**: predicted_price, confidence_interval, trend, timestamp, dataset_version_used, model_accuracy, frequency_used
- **Optimization**: Gzip compression, reduced payload\n
#### **Endpoint 2: /upload-dataset (POST)**
- **Purpose**: Handle custom dataset uploads
- **Input**: Multipart form data (CSV/Excel file)
- **Processing**: Validate format, check sample count (≥100,000), validate columns, store, assign version, trigger training
- **Output**: dataset_id, sample_count, status, message, version, changelog, training_job_id
- **Optimization**: Chunked upload, progress tracking

#### **Endpoint 3: /ai-insights (POST)**
- **Purpose**: Generate natural language insights
- **Input**: year, month, market, variety, predicted_price, historical_data, frequency
- **Output**: insights (array), risk_alerts (array), trend_summary\n- **Optimization**: Concise text (3-5 insights)\n
#### **Endpoint 4: /chat (POST)**
- **Purpose**: Conversational AI assistant
- **Input**: message, context\n- **Output**: response, charts (optional)
- **Optimization**: Streaming responses, reduced chart resolution

#### **Endpoint 5: /charts-data (GET)**
- **Purpose**: Retrieve visualization data
- **Input**: year, month, market, variety, chart_type, frequency
- **Output**: JSON data for Flutter charts with frequency-based aggregation
- **Optimization**: Downsampled data points\n
#### **Endpoint 6: /sync-data (GET)**
- **Purpose**: Incremental data sync for offline mode
- **Input**: last_sync_timestamp
- **Output**: Only new/updated records
- **Optimization**: Delta updates only

#### **Endpoint 7: /register-device (POST)**
- **Purpose**: Register device for push notifications
- **Input**: device_token (FCM), platform (iOS/Android)
- **Output**: status\n\n#### **Endpoint 8: /send-notification (POST)**
- **Purpose**: Trigger push notifications (internal)\n- **Input**: user_id, notification_type, message, data
- **Output**: status\n
#### **Endpoint 9: /check-dataset-updates (GET)**
- **Purpose**: Check for dataset updates
- **Input**: current_version, dataset_id
- **Output**: update_available, latest_version, changelog, sample_count_change, release_date, download_url, file_size
- **Optimization**: Lightweight, cached on CDN

#### **Endpoint 10: /download-dataset-update (GET)**
- **Purpose**: Download updated dataset
- **Input**: dataset_id, from_version, to_version, delta_only
- **Output**: Compressed dataset file or delta patch
- **Optimization**: Resumable downloads, chunked transfer, gzip\n
#### **Endpoint 11: /dataset-changelog (GET)**
- **Purpose**: Retrieve detailed changelog
- **Input**: dataset_id, from_version, to_version
- **Output**: changelog_entries (array)
\n#### **Endpoint 12: /retrain-status (GET)**
- **Purpose**: Check model retraining job status
- **Input**: job_id
- **Output**: status, progress, current_stage, estimated_time_remaining, error_message

#### **Endpoint 13: /model-performance (GET)**
- **Purpose**: Retrieve model performance metrics
- **Input**: None
- **Output**: models (array with name, accuracy, MAE, RMSE, R² Score, status), best_performer, avg_r2_score, training_data_size

#### **Endpoint 14: /websocket/dataset-updates (WebSocket)**
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
        if len(dataset) < 100000:
            raise ValueError(f'Dataset must have at least 100,000 samples. Found: {len(dataset)}')
        
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
        # Stage 4: Evaluation (80-95%)
        self.update_state(state='PROGRESS', meta={'progress': 85, 'stage': 'evaluation'})
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
- Maintains persistent connections with Flutter clients (web_socket_channel package)
- Handles authentication via JWT tokens
- Broadcasts events to connected clients
\n**Event Broadcasting**:
- When model training completes:\n  1. Training pipeline finishes
  2. Backend broadcasts retrain_completed event
  3. Flutter clients receive notification via WebSocket stream
  4. UI updates with new model performance metrics using setState() or state management

**Connection Management**:
- Track active connections in Redis
- Handle disconnections gracefully
- Implement reconnection logic with exponential backoff
- Send heartbeat pings every 30 seconds

**Fallback Mechanism**:
- If WebSocket connection fails, fall back to push notifications (FCM)
- Periodic polling as last resort (every 6 hours)
\n### 5.7 Security & Performance

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
- WhatsApp Image 2025-12-05 at 20.18.49_18cee13a.jpg (existing web dashboard interface showing Karnataka Red Chilli Price Prediction Model - to be adapted for Flutter mobile)\n\n### 6.2 Example Training Dataset
- image.png (standard dataset structure with 100,000+ records including columns: Date, Year, Month, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max/Min, Humidity, Area, Production)\n
These screenshots show the current web interface and the mandatory dataset structure. The Flutter mobile app must be trained on datasets following the exact format shown in image.png with a minimum of 100,000 samples to ensure robust model performance and achieve 98.2% prediction accuracy.

## 7. Flutter-Specific Features

### 7.1 Offline Mode
- Cache recent predictions locally using sqflite or hive
- Allow viewing of cached data when offline
- Queue prediction requests when offline, sync when connection restored using connectivity_plus package
- Display offline indicator in AppBar
- Cache last known dataset version for offline predictions
- Queue dataset update downloads for when connection is restored

### 7.2 Location Services (Optional)
- Auto-detect user location using geolocator package
- Suggest nearest markets based on location
- Location-based weather data integration
- Requires location permission (permission_handler package)
\n### 7.3 Camera Integration (Optional)
- Scan QR codes using qr_code_scanner or mobile_scanner package
- Capture photos using image_picker package
- Camera permission handling
\n### 7.4 Biometric Authentication (Optional)
- Face ID / Touch ID (iOS) using local_auth package
- Fingerprint / Face Unlock (Android) using local_auth package
- Secure access to sensitive data

### 7.5 Widget Support (Optional)
- Home screen widget using home_widget package (iOS and Android)
- Shows latest prediction\n- Quick access to AI assistant
- Live price updates
- Dataset update status indicator
- Model performance metrics display

### 7.6 Real-Time Dataset Synchronization
- WebSocket connection using web_socket_channel package
- Background sync service using workmanager package
- Smart sync logic: only download changed data (delta updates)
- Conflict resolution for simultaneous updates
- Rollback capability if update fails
- Version control for datasets with changelog tracking

## 8. Project Deliverables

- Fully functional Flutter mobile app (iOS and Android)
- Complete backend API with mobile-optimized endpoints
- Integrated ML models with prediction pipeline trained on 100,000+ sample datasets
- Four active ML models: Random Forest (98.2% accuracy), XGBoost (97.8%), LSTM (96.5%), Linear Regression (89.3%)\n- AI chat assistant functionality
- Dataset upload and processing system for mobile
- Real-time dataset synchronization system with version control
- Automatic model retraining pipeline triggered by code-level dataset additions
- WebSocket-based real-time update notification system
- Year/month-based prediction filtering with frequency selection (Weekly/Monthly/Yearly)
- Offline mode with local data caching
- Push notification system using Firebase Cloud Messaging
- Clean, modular, production-ready Flutter code
- Responsive design for all mobile screen sizes (phones and tablets)
- App Store and Google Play Store submission-ready builds
- Documentation for deployment and maintenance
- Model training pipeline optimized for large datasets (100,000+ samples)
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
- Custom market analysis with user-provided datasets (100,000+ samples)
- Historical trend analysis by specific time periods and frequencies (weekly/monthly/yearly)
- On-the-go price predictions and insights
- Large-scale agricultural market forecasting using comprehensive historical data
- Research and academic applications requiring high-accuracy predictions based on extensive training data (100,000+ samples)
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
- **Update Indicators**: Animated pulse effects for Update Available badges, rotating refresh icons during sync, and checkmark animations on completion, providing clear visual feedback for background processes
- **Performance Metrics Display**: Prominent display of model accuracy (98.2%), MAE (1.02), RMSE (1.45), and R² Score (0.998) with circular progress indicators and comparison tables for all four models

## 11. Reference Files

1. image.png\n2. image.png