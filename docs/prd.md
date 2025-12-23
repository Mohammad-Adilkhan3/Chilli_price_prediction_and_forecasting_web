# AI-Driven Agricultural Intelligence Mobile Application Requirements Document

## 1. Project Overview

### 1.1 Project Name
AI-Driven Agricultural Intelligence Mobile App – Chilli Price Forecasting

### 1.2 Project Description
A professional AI-powered mobile application for agricultural price intelligence, specifically focused on chilli price forecasting. The app provides data-driven insights, predictive analytics, and AI-powered assistance for agricultural market decision-making on iOS and Android devices. Designed as an enterprise-ready mobile solution with modern AI platform aesthetics optimized for touch interfaces.

### 1.3 Core Objectives
- Deliver accurate AI-powered price predictions for agricultural commodities using large-scale training datasets (100,000+ samples)
- Provide intelligent insights and risk alerts for market trends on mobile devices
- Enable interactive data exploration through touch-optimized visualizations
- Offer conversational AI assistance for market analysis\n- Present a professional, mobile-first interface suitable for field use
- Support custom dataset uploads via mobile file system
- Train models on comprehensive historical data to ensure high prediction accuracy
- Enable offline access to recent predictions and cached data
- **Automatically sync and update when backend datasets are modified**
- **Notify users of dataset updates and trigger model retraining**

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
- **ML Models**: Scikit-learn, XGBoost, RandomForest, LSTM
- **Training Data Requirements**: Minimum 100,000+ samples for robust model training
- **Data Processing**: Pandas, NumPy for large-scale data handling
- **AI Features**: LLM-based AI Assistant (API ready)
- **Database**: PostgreSQL / MongoDB\n- **File Processing**: Pandas for CSV/Excel parsing and validation
- **Mobile API Optimization**: Compressed JSON responses, pagination for large datasets
- **Dataset Versioning**: Track dataset versions and update timestamps
- **Background Job Queue**: Celery or RQ for asynchronous model retraining
- **Real-time Notification Service**: WebSocket server or FCM for instant update alerts

### 2.3 Deployment Architecture
- Cross-platform mobile app (iOS App Store, Google Play Store)
- API-first design with mobile-optimized endpoints
- Offline-first architecture with data synchronization
- Push notification system for price alerts and dataset updates
- Optimized for low-bandwidth scenarios
- Real-time dataset update detection and synchronization

## 3. Core Features & Screens

### 3.1 Splash Screen & Onboarding
\n**Splash Screen**:\n- Animated app logo with AI pulse effect
- Loading indicator for initial data sync
- **Check for dataset updates on app launch**
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
- **'Sync Dataset' card with refresh icon (manual sync trigger)**

**Key Metrics Display** (grid layout):
- Prediction Accuracy card with circular progress indicator
- MAE (Mean Absolute Error) value
- R² Score visualization
- Training dataset size badge (e.g., 'Trained on 100,000+ samples')
- Last prediction timestamp
- **Dataset version indicator (e.g., 'Dataset v2.3- Updated 2 hours ago')**
- **Update status badge ('Up to date' or 'Update available')**

**Recent Predictions List**:
- Scrollable list of recent predictions with swipe-to-delete
- Each item shows: Date, Market, Variety, Predicted Price, Trend indicator (↑↓)
- Tap to view detailed prediction\n\n### 3.3 AI Prediction Screen

**Input Section** (collapsible accordion):
- **Dataset Selector**: Dropdown showing'Default Dataset' or uploaded dataset name with version number
- **Year Picker**: Scrollable year selector (wheel picker on iOS, dropdown on Android)
- **Month Picker**: Scrollable month selector (January - December)
- **Market/City Selector**: Searchable dropdown with autocomplete
- **Variety Filter**: Dropdown with crop varieties
- **Time Frequency Toggle**: Segmented control (Weekly / Monthly / Yearly)
- **Model Selector**: Dropdown with AI recommendation badge
- 'Run Prediction' button (full-width, primary color)

**Prediction Result Card** (appears after prediction):
- Large animated ₹ value display with currency symbol
- Confidence interval range (lower - upper bounds)
- Trend indicator (↑↓) with color coding (green for up, red for down)
- Prediction timestamp
- Selected year and month context display
- 'Save Prediction' button (bookmark icon)
-'Share' button (share icon for exporting result)
- **Dataset version used for prediction displayed at bottom**

**Interactive Charts** (swipeable tabs):
- **Price Trend Chart**: Line chart showing historical and predicted prices (pinch-to-zoom, pan gestures)
- **Forecast vs Actual**: Dual-axis comparison chart
- **Seasonal Heatmap**: Touch-interactive heatmap with color gradients
- **Correlation Chart**: Scatter plot showing rainfall vs price correlation
\n**Performance Metrics** (bottom section):
- Accuracy percentage with circular progress bar
- MAE, RMSE, R² Score cards in horizontal scroll
- AI Confidence Score meter
\n### 3.4 Dataset Upload Screen

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
- Success message with checkmark animation: 'Dataset uploaded successfully! 105,000 samples detected.'
- Error messages with detailed explanations:\n  - 'Dataset must contain at least 100,000 samples. Current: 85,000'\n  - 'Missing required columns: [Rainfall, Humidity]'
  - 'Invalid data format in Modal Price column'
\n**Dataset Management**:
- List of uploaded datasets with metadata (name, sample count, upload date, version)
- Swipe-to-delete gesture for removing datasets
- 'Set as Active' button to switch between datasets
- **'Check for Updates' button to manually trigger sync**
- **Auto-update toggle switch (enable/disable automatic dataset updates)**
- **Last sync timestamp displayed for each dataset**

### 3.5 AI Insights Screen

**Auto-Generated Insights Section**:
- Card-based layout with natural language explanations
- Example: 'Price is expected to increase by 12% due to lower arrivals and reduced rainfall in the region'
- Context-aware analysis based on current prediction and selected time period
\n**Risk Alerts Section**:
- Warning cards with alert icons\n- Examples:\n  - 'Supply volatility warning: Arrivals 15% below average'
  - 'Weather anomaly detected: Rainfall 30% lower than historical average'
  - 'Market disruption alert: Unusual price spike detected'

**Future Trend Highlights**:
- Timeline view showing 3-6 month forecast summaries
- Key inflection points marked with icons
- Seasonal pattern predictions with visual indicators

**Actionable Recommendations** (optional):
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
  - 'Show predictions for January2025'

**AI Capabilities**:
- Trained on dataset metadata, market history, and model outputs
- Answers complex queries with embedded charts and data tables
- Contextual follow-up questions\n- 'Copy Response' and 'Share' options for each AI message
\n**Chat History**:
- Scrollable conversation history\n- 'Clear Chat' option in settings
- Persistent chat sessions (saved locally)

### 3.7 Advanced Charts Screen

**Chart Gallery** (grid or list view):
- Thumbnail previews of available charts
- Tap to open full-screen interactive chart
\n**Interactive Features**:
- Pinch-to-zoom and pan gestures
- Tap on data points for detailed tooltips
- AI-annotated graphs with contextual explanations
- Legend toggle for multi-series charts

**Scenario Simulation** (bottom sheet):
- Sliders for adjusting parameters:\n  - Rainfall adjustment (↑ ↓)
  - Arrivals adjustment (↑ ↓)
  - Temperature adjustment (↑ ↓)
-'Apply Changes' button to update chart in real-time
-'Reset to Default' button\n
**Export Options**:
- 'Save Chart as Image' button
- 'Share Chart' button (exports as PNG or PDF)
\n### 3.8 Model Intelligence Screen

**Model Comparison Section**:
- Horizontal scrollable cards showing each model (RandomForest, XGBoost, LSTM)\n- Each card displays:
  - Model name with icon
  - Performance metrics (MAE, RMSE, R² Score)
  - 'Best Performer' badge on top model
  - Training date and sample size
  - **Dataset version used for training**

**Performance Metrics Table**:
- Sortable table comparing models
- Tap column headers to sort by metric
\n**Explainable AI (XAI) Section**:
- Feature importance bar chart (horizontal bars)
- SHAP value visualizations (simplified for mobile)
- 'Learn More' button linking to detailed explanations

**Model Training History**:
- Timeline view showing training accuracy trends over time
- Training dataset statistics (sample size, feature distribution)
- **Retraining events triggered by dataset updates**

### 3.9 Dataset Sync & Update Screen (NEW)

**Sync Status Section**:
- Large status indicator showing current sync state:\n  - 'Up to Date' (green checkmark)
  - 'Update Available' (orange alert icon)
  - 'Syncing...' (animated spinner)
  - 'Sync Failed' (red error icon)
- Last successful sync timestamp
- Dataset version comparison (Current vs Available)

**Update Details Card**:
- Shows changes in new dataset version:\n  - Sample count difference (e.g., '+5,000 new records')
  - Date range extension\n  - New markets or varieties added
  - Data quality improvements
-'View Changelog' button for detailed update notes

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
- Notification preferences (price alerts, insights updates, **dataset update notifications**)
- Default dataset selection
- **Auto-update preferences (link to Dataset Sync screen)**

**Data Management**:
- 'Clear Cache' button\n- 'Delete All Predictions' button
- 'Manage Uploaded Datasets' link
- **'Force Sync Datasets' button**
- **'Reset to Default Dataset' button**

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
- **Dataset update available notifications**
- **Dataset sync completion notifications**
- **Model retraining progress notifications**

**In-App Notifications**:
- Toast messages for quick feedback (e.g., 'Prediction saved successfully')
- Alert dialogs for critical actions (e.g., 'Delete dataset?')
- **Banner notifications for dataset updates (dismissible, with'Update Now' action)**
- **Bottom sheet prompts for major dataset changes requiring user attention**

## 4. Mobile Design System

### 4.1 Color Palette
- **Primary Background**: Dark gradient (charcoal #1a1a1a to navy #0a0e27)
- **Accent Colors**:
  - Cyan (#00d9ff) for primary actions and highlights
  - Purple (#a855f7) for secondary elements
  - Green (#10b981) for positive indicators (price up, success, up-to-date status)
  - Red (#ef4444) for negative indicators (price down, errors, sync failed)
  - Orange (#f59e0b) for warnings (update available)\n- **Text**: White (#ffffff) primary, gray (#9ca3af) secondary
- **Card Background**: Semi-transparent dark (#1f2937 with 80% opacity)
\n### 4.2 Visual Style
- **Card Design**: Rounded corners (12px border-radius), subtle shadows, glassmorphism effect
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
\n## 5. Reference Materials

### 5.1 Current Interface Screenshots
- WhatsApp Image 2025-12-05 at 20.18.49_18cee13a.jpg (existing web dashboard interface showing Karnataka Red Chilli Price Prediction Model - to be adapted for mobile)
\n### 5.2 Example Training Dataset
- image.png (standard dataset structure with 100,000+ records including columns: Date, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max/Min, Humidity, Area, Production)\n
These screenshots show the current web interface and the mandatory dataset structure. The mobile app must be trained on datasets following the exact format shown in image.png with a minimum of 100,000 samples to ensure robust model performance and accurate predictions.

## 6. Mobile-Specific Features

### 6.1 Offline Mode
- Cache recent predictions locally using AsyncStorage or SQLite
- Allow viewing of cached data when offline
- Queue prediction requests when offline, sync when connection restored
- Display offline indicator in UI
- **Cache last known dataset version for offline predictions**
- **Queue dataset update downloads for when connection is restored**

### 6.2 Location Services (Optional)
- Auto-detect user location to suggest nearest markets
- Location-based weather data integration
- Requires location permission from user
\n### 6.3 Camera Integration (Optional)
- Scan QR codes for quick dataset imports
- Capture photos of market conditions for context
\n### 6.4 Biometric Authentication (Optional)
- Face ID / Touch ID (iOS)\n- Fingerprint / Face Unlock (Android)
- Secure access to sensitive data

### 6.5 Widget Support (Optional)
- Home screen widget showing latest prediction
- Quick access to AI assistant
- Live price updates
- **Dataset update status indicator**

### 6.6 Real-Time Dataset Synchronization (NEW)
- **WebSocket connection for instant update notifications**
- **Background sync service running periodically**
- **Smart sync logic: only download changed data (delta updates)**
- **Conflict resolution for simultaneous updates**
- **Rollback capability if update fails**
- **Version control for datasets with changelog tracking**

## 7. Backend API Adaptations for Mobile

### 7.1 Mobile-Optimized Endpoints

#### **Endpoint1: `/predict` (POST)**
- **Purpose**: Generate price predictions based on user inputs
- **Input Parameters**:
  - `year` (integer): Selected year for prediction
  - `month` (integer): Selected month (1-12)
  - `market` (string): Market/city name
  - `variety` (string): Crop variety
  - `model_type` (string): ML model to use
  - `dataset_id` (optional): ID of uploaded custom dataset
  - **`dataset_version` (optional): Specific dataset version to use**
- **Output** (compressed JSON):
  - `predicted_price` (float)\n  - `confidence_interval` (object)
  - `trend` (string)
  - `timestamp` (datetime)
  - **`dataset_version_used` (string)**
- **Mobile Optimization**: Gzip compression, reduced payload size

#### **Endpoint 2: `/upload-dataset` (POST)**
- **Purpose**: Handle custom dataset uploads from mobile devices
- **Input**: Multipart form data with CSV/Excel file
- **Processing Steps**:
  1. Validate file format and size
  2. Check row count (minimum 100,000 samples)
  3. Validate required columns\n  4. Store dataset in cloud storage (S3/GCS)
  5. **Assign version number and create changelog**
  6. Return dataset metadata
- **Output**:
  - `dataset_id` (string)
  - `sample_count` (integer)
  - `status` (string)
  - `message` (string)
  - **`version` (string)**
  - **`changelog` (string)**
- **Mobile Optimization**: Chunked upload support for large files, progress tracking

#### **Endpoint 3: `/ai-insights` (POST)**
- **Purpose**: Generate natural language insights\n- **Input Parameters**: Year, month, market, variety, predicted_price, historical_data
- **Output**:
  - `insights` (array of strings)
  - `risk_alerts` (array)\n  - `trend_summary` (string)
- **Mobile Optimization**: Concise text responses, limited to 3-5 insights

#### **Endpoint 4: `/chat` (POST)**
- **Purpose**: Conversational AI assistant
- **Input**: `message` (string), `context` (object)
- **Output**: `response` (string), `charts` (optional array)
- **Mobile Optimization**: Streaming responses for long answers, reduced chart data resolution

#### **Endpoint 5: `/charts-data` (GET)**
- **Purpose**: Retrieve visualization data for mobile charts
- **Input Parameters**: Year, month, market, variety, chart_type
- **Output**: JSON data formatted for mobile chart libraries
- **Mobile Optimization**: Downsampled data points for performance (e.g., 100points instead of 1000)

#### **Endpoint 6: `/sync-data` (GET)**
- **Purpose**: Incremental data sync for offline mode
- **Input**: `last_sync_timestamp` (datetime)
- **Output**: Only new/updated records since last sync
- **Mobile Optimization**: Minimal payload, delta updates only

#### **Endpoint 7: `/register-device` (POST)**
- **Purpose**: Register mobile device for push notifications
- **Input**: `device_token` (FCM token), `platform` (iOS/Android)\n- **Output**: `status` (success/error)
\n#### **Endpoint 8: `/send-notification` (POST)**
- **Purpose**: Trigger push notifications (internal use)
- **Input**: `user_id`, `notification_type`, `message`, `data`
- **Output**: `status` (success/error)

#### **Endpoint 9: `/check-dataset-updates` (GET) - NEW**
- **Purpose**: Check if dataset updates are available
- **Input Parameters**:
  - `current_version` (string): User's current dataset version
  - `dataset_id` (optional): Specific dataset to check
- **Output**:
  - `update_available` (boolean)
  - `latest_version` (string)
  - `changelog` (string)
- `sample_count_change` (integer)
  - `release_date` (datetime)
  - `download_url` (string)
  - `file_size` (integer in bytes)
- **Mobile Optimization**: Lightweight response, cached on CDN

#### **Endpoint 10: `/download-dataset-update` (GET) - NEW**
- **Purpose**: Download updated dataset (delta or full)
- **Input Parameters**:
  - `dataset_id` (string)\n  - `from_version` (string): Current version\n  - `to_version` (string): Target version
  - `delta_only` (boolean): If true, return only changes
- **Output**: Compressed dataset file (CSV/Excel) or delta patch
- **Mobile Optimization**: Resumable downloads, chunked transfer, gzip compression

#### **Endpoint 11: `/dataset-changelog` (GET) - NEW**
- **Purpose**: Retrieve detailed changelog for dataset versions
- **Input Parameters**:\n  - `dataset_id` (string)
  - `from_version` (optional): Start version
  - `to_version` (optional): End version\n- **Output**:
  - `changelog_entries` (array of objects):
    - `version` (string)
    - `release_date` (datetime)
    - `changes` (array of strings)
    - `sample_count` (integer)
    - `breaking_changes` (boolean)
\n#### **Endpoint 12: `/trigger-model-retrain` (POST) - NEW**
- **Purpose**: Manually trigger model retraining after dataset update
- **Input Parameters**:
  - `dataset_id` (string)
  - `dataset_version` (string)
  - `model_types` (array): Models to retrain (e.g., ['RandomForest', 'XGBoost'])
- **Output**:
  - `job_id` (string): Background job identifier
  - `status` (string): 'queued' or 'started'
  - `estimated_duration` (integer in seconds)
\n#### **Endpoint 13: `/retrain-status` (GET) - NEW**\n- **Purpose**: Check status of model retraining job
- **Input Parameters**: `job_id` (string)
- **Output**:
  - `status` (string): 'queued', 'running', 'completed', 'failed'
  - `progress` (integer): Percentage (0-100)
  - `current_stage` (string): e.g., 'preprocessing', 'training', 'evaluation'
  - `estimated_time_remaining` (integer in seconds)
- `error_message` (string, if failed)

#### **Endpoint 14: `/websocket/dataset-updates` (WebSocket) - NEW**
- **Purpose**: Real-time dataset update notifications
- **Connection**: Persistent WebSocket connection
- **Events Sent to Client**:
  - `update_available`: New dataset version released
  - `update_downloaded`: Dataset download completed
  - `retrain_started`: Model retraining initiated
  - `retrain_progress`: Retraining progress update
  - `retrain_completed`: Model retraining finished
  - `sync_failed`: Error during sync process
- **Event Payload**: JSON object with relevant details

### 7.2 Authentication & Security
- **Token-Based Auth**: JWT tokens for secure API access
- **Refresh Tokens**: Long-lived refresh tokens for seamless re-authentication
- **SSL Pinning**: Prevent man-in-the-middle attacks
\n### 7.3 Push Notification Backend
- **FCM Integration**: Firebase Cloud Messaging for cross-platform notifications
- **Notification Triggers**: Price alerts, dataset upload completion, model training updates, **dataset update notifications**
- **User Preferences**: API endpoints for managing notification settings

## 8. Project Deliverables

- Fully functional React Native mobile app (iOS and Android)
- Complete backend API with mobile-optimized endpoints (see Backend Requirements Document)
- Integrated ML models with prediction pipeline trained on 100,000+ sample datasets
- AI chat assistant functionality\n- Dataset upload and processing system for mobile\n- **Real-time dataset synchronization system with version control**
- **Automatic model retraining pipeline triggered by dataset updates**
- **WebSocket-based real-time update notification system**
- Year/month-based prediction filtering
- Offline mode with local data caching
- Push notification system\n- Clean, modular, production-ready code
- Responsive design for all mobile screen sizes (phones and tablets)
- App Store and Google Play Store submission-ready builds
- Documentation for deployment and maintenance
- Model training pipeline optimized for large datasets (100,000+ samples)
- Data validation system ensuring compliance with required format and sample size
- **Dataset versioning and changelog management system**
- **Background sync service with conflict resolution**
\n## 9. Use Cases

- Professional portfolio/resume project
- Hackathon submission
- Final year academic project
- Startup MVP foundation
- Enterprise agricultural intelligence mobile solution
- Field use by farmers, traders, and agricultural consultants
- Custom market analysis with user-provided datasets (100,000+ samples)
- Historical trend analysis by specific time periods
- On-the-go price predictions and insights
- Large-scale agricultural market forecasting using comprehensive historical data
- Research and academic applications requiring high-accuracy predictions based on extensive training data (100,000+ samples)
- Real-world deployment for agricultural market intelligence with production-grade accuracy
- **Continuous model improvement through automatic dataset updates and retraining**
- **Multi-user environments with centralized dataset management and automatic distribution**
\n---

# Backend Requirements Document for Mobile Application

## 1. Backend Overview

The backend system powers the AI-driven agricultural price prediction mobile application. It handles data processing, machine learning model training and inference, mobile-optimized API endpoints, push notifications, AI assistant functionality, and **real-time dataset synchronization with automatic model retraining**.

**Technology Stack**:
- **Framework**: Python FastAPI (fast, modern, mobile-friendly)
- **Machine Learning**: Scikit-learn, XGBoost, RandomForest, LSTM\n- **Data Processing**: Pandas, NumPy\n- **Database**: PostgreSQL or MongoDB
- **AI Assistant**: LLM-based conversational AI (API integration)
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Authentication**: JWT tokens\n- **File Storage**: AWS S3 or Google Cloud Storage for uploaded datasets
- **Background Jobs**: Celery with Redis/RabbitMQ for asynchronous tasks
- **Real-time Communication**: WebSocket (using FastAPI WebSocket support) or Server-Sent Events
- **Version Control**: Git-based dataset versioning or custom versioning system
- **Caching**: Redis for API response caching and session management

---

## 2. Core Backend Components

### 2.1 Mobile-Optimized API Endpoints

(All previous endpoints remain unchanged, with additions noted below)

#### **NEW Endpoint 9: `/check-dataset-updates` (GET)**
- **Purpose**: Check if dataset updates are available
- **Input Parameters**:
  - `current_version` (string): User's current dataset version
  - `dataset_id` (optional): Specific dataset to check
- **Processing Logic**:
  1. Query database for latest dataset version
  2. Compare with user's current version
  3. If newer version exists, retrieve changelog and metadata
  4. Return update availability status
- **Output**:
  - `update_available` (boolean)
  - `latest_version` (string)
  - `changelog` (string)\n  - `sample_count_change` (integer)
  - `release_date` (datetime)\n  - `download_url` (string)
  - `file_size` (integer in bytes)\n- **Mobile Optimization**: Cached response (5-minute TTL), CDN delivery

#### **NEW Endpoint 10: `/download-dataset-update` (GET)**
- **Purpose**: Download updated dataset (delta or full)
- **Input Parameters**:
  - `dataset_id` (string)
  - `from_version` (string): Current version
  - `to_version` (string): Target version
  - `delta_only` (boolean): If true, return only changes
- **Processing Logic**:
  1. Validate version numbers
  2. If delta_only=true, compute diff between versions
  3. Compress dataset file (gzip)
  4. Generate signed download URL (S3/GCS)
  5. Return download link with expiration time
- **Output**: Compressed dataset file or delta patch
- **Mobile Optimization**: Resumable downloads (HTTP Range requests), chunked transfer encoding,24-hour signed URL expiration

#### **NEW Endpoint 11: `/dataset-changelog` (GET)**
- **Purpose**: Retrieve detailed changelog for dataset versions
- **Input Parameters**:
  - `dataset_id` (string)
  - `from_version` (optional): Start version
  - `to_version` (optional): End version
- **Processing Logic**:\n  1. Query changelog table for specified version range
  2. Format changelog entries with markdown support
  3. Return structured changelog data
- **Output**:
  - `changelog_entries` (array of objects):
    - `version` (string)
    - `release_date` (datetime)
    - `changes` (array of strings)\n    - `sample_count` (integer)
    - `breaking_changes` (boolean)
\n#### **NEW Endpoint 12: `/trigger-model-retrain` (POST)**
- **Purpose**: Manually trigger model retraining after dataset update
- **Input Parameters**:
  - `dataset_id` (string)
  - `dataset_version` (string)
  - `model_types` (array): Models to retrain (e.g., ['RandomForest', 'XGBoost'])
- **Processing Logic**:
  1. Validate dataset version exists
  2. Create background job in Celery queue
  3. Return job ID for status tracking
- **Output**:
  - `job_id` (string): Background job identifier
  - `status` (string): 'queued' or 'started'
  - `estimated_duration` (integer in seconds)

#### **NEW Endpoint 13: `/retrain-status` (GET)**
- **Purpose**: Check status of model retraining job
- **Input Parameters**: `job_id` (string)
- **Processing Logic**:
  1. Query Celery job status
  2. Retrieve progress metadata from Redis cache
  3. Return current status and progress
- **Output**:
  - `status` (string): 'queued', 'running', 'completed', 'failed'
  - `progress` (integer): Percentage (0-100)
  - `current_stage` (string): e.g., 'preprocessing', 'training', 'evaluation'
  - `estimated_time_remaining` (integer in seconds)
  - `error_message` (string, if failed)

#### **NEW Endpoint 14: `/websocket/dataset-updates` (WebSocket)**
- **Purpose**: Real-time dataset update notifications
- **Connection**: Persistent WebSocket connection
- **Authentication**: JWT token passed in connection handshake
- **Events Sent to Client**:
  - `update_available`: New dataset version released
    - Payload: `{version, changelog, download_url, file_size}`\n  - `update_downloaded`: Dataset download completed
    - Payload: `{version, status}`
  - `retrain_started`: Model retraining initiated\n    - Payload: `{job_id, models, estimated_duration}`
  - `retrain_progress`: Retraining progress update
    - Payload: `{job_id, progress, current_stage}`
  - `retrain_completed`: Model retraining finished
    - Payload: `{job_id, models, new_metrics}`
  - `sync_failed`: Error during sync process
    - Payload: `{error_code, error_message}`
- **Heartbeat**: Ping/pong every 30 seconds to keep connection alive
- **Reconnection Logic**: Exponential backoff on client side

---

### 2.2 Dataset Versioning System (NEW)

**Purpose**: Track dataset versions, manage updates, and maintain changelog history.\n
**Components**:
\n#### **Version Numbering Scheme**
- Semantic versioning: `MAJOR.MINOR.PATCH`
  - MAJOR: Breaking changes (column schema changes)
  - MINOR: New data added (more samples, new markets/varieties)
  - PATCH: Bug fixes (data corrections, duplicate removal)
- Example: `2.3.1`

#### **Changelog Generation**
- Automated changelog creation on dataset upload:\n  - Compare new dataset with previous version
  - Detect changes:\n    - Sample count difference
    - New/removed columns
    - New markets or varieties
    - Date range extension
    - Data quality improvements (e.g., reduced missing values)
  - Generate human-readable changelog
- Manual changelog editing by admin (optional)

#### **Version Storage**
- Store each dataset version in cloud storage (S3/GCS)
- Naming convention: `dataset_{id}_v{version}.csv`
- Metadata stored in database (Datasets table)
\n#### **Delta Updates**
- Compute diff between versions for efficient updates
- Store delta patches for incremental updates
- Fallback to full download if delta is too large (>50% of full size)

---

### 2.3 Automatic Model Retraining Pipeline (NEW)

**Purpose**: Automatically retrain ML models when backend dataset is updated.

**Workflow**:
\n1. **Dataset Update Detection**\n   - Admin uploads new dataset via admin panel or API
   - System validates dataset (format, sample count, columns)
   - Assign new version number based on changes
   - Store dataset in cloud storage
   - Update database with new version metadata

2. **Trigger Retraining**
   - Automatically create Celery background job for model retraining
   - Or allow manual trigger via `/trigger-model-retrain` endpoint
   - Job parameters: dataset_id, version, model_types
\n3. **Retraining Process** (Celery Task)
   - **Stage 1: Data Loading** (0-10%)
     - Download dataset from cloud storage
     - Load into Pandas DataFrame
   - **Stage 2: Preprocessing** (10-30%)\n     - Handle missing values\n     - Normalize features
     - Encode categorical variables
     - Create time-based features
     - Split data (80/10/10)\n   - **Stage 3: Model Training** (30-80%)
     - Train each model (RandomForest, XGBoost, LSTM)
     - Update progress after each model
     - Use cross-validation\n   - **Stage 4: Evaluation** (80-95%)
     - Calculate metrics (MAE, RMSE, R², MAPE)
     - Compare with previous model performance
     - Select best performer
   - **Stage 5: Model Saving** (95-100%)
     - Save trained models to disk
     - Update model metadata in database
     - Generate performance report

4. **Notification**
   - Send push notification to all users:'Models updated with new data!'
   - Send WebSocket event: `retrain_completed`
   - Update app dashboard with new model metrics

5. **Rollback Mechanism**
   - If retraining fails or performance degrades significantly:\n     - Keep previous model version active
     - Log error details
     - Notify admin
     - Allow manual rollback via admin panel

**Celery Task Implementation**:\n```python
@celery.task(bind=True)\ndef retrain_models(self, dataset_id, version, model_types):
    try:
        # Stage 1: Data Loading
        self.update_state(state='PROGRESS', meta={'progress': 5, 'stage': 'loading'})
        dataset = load_dataset(dataset_id, version)
        
        # Stage 2: Preprocessing
        self.update_state(state='PROGRESS', meta={'progress': 20, 'stage': 'preprocessing'})
        X_train, X_val, X_test, y_train, y_val, y_test = preprocess_data(dataset)
        
        # Stage 3: Training
        models = {}
        for i, model_type in enumerate(model_types):
            progress = 30 + (i / len(model_types)) * 50
            self.update_state(state='PROGRESS', meta={'progress': progress, 'stage': f'training_{model_type}'})
            models[model_type] = train_model(model_type, X_train, y_train)\n        
        # Stage 4: Evaluation
        self.update_state(state='PROGRESS', meta={'progress': 85, 'stage': 'evaluation'})
        metrics = evaluate_models(models, X_test, y_test)
        
        # Stage 5: Saving\n        self.update_state(state='PROGRESS', meta={'progress': 95, 'stage': 'saving'})
        save_models(models, dataset_id, version)\n        update_model_metadata(dataset_id, version, metrics)
        
        # Notify users
        send_push_notification('Models updated!', 'New predictions available with improved accuracy.')
        broadcast_websocket_event('retrain_completed', {'version': version, 'metrics': metrics})
        \n        return {'status': 'success', 'metrics': metrics}
    except Exception as e:
        self.update_state(state='FAILURE', meta={'error': str(e)})
        raise
```

---
\n### 2.4 Real-Time Sync Service (NEW)

**Purpose**: Enable mobile apps to receive instant notifications when backend datasets are updated.

**Architecture**:

#### **WebSocket Server**
- Implemented using FastAPI WebSocket support
- Maintains persistent connections with mobile clients
- Handles authentication via JWT tokens
- Broadcasts events to connected clients
\n#### **Event Broadcasting**
- When dataset is updated:
  1. Admin uploads new dataset
  2. Backend validates and stores dataset
  3. Broadcast `update_available` event to all connected clients
  4. Clients receive notification and prompt user to update

#### **Connection Management**
- Track active connections in Redis (user_id -> connection_id mapping)
- Handle disconnections gracefully
- Implement reconnection logic with exponential backoff
- Send heartbeat pings every 30 seconds

#### **Fallback Mechanism**
- If WebSocket connection fails, fall back to push notifications (FCM)
- Periodic polling as last resort (every 6 hours)
\n---

### 2.5 Background Sync Service (NEW)
\n**Purpose**: Periodically check for dataset updates and sync data in the background.

**Implementation**:

#### **Celery Periodic Task**
- Scheduled task runs every 1 hour (configurable)
- Checks for new dataset versions
- If update found:\n  - Send push notification to users
  - Broadcast WebSocket event
  - Log update event\n\n#### **Smart Sync Logic**
- Only download changed data (delta updates)
- Compress data before transmission
- Resume interrupted downloads
- Validate data integrity after download

#### **Conflict Resolution**
- If user has local modifications (custom datasets):
  - Preserve user data
  - Offer merge options
  - Allow user to choose: keep local, use remote, or merge

---

## 3. Database Schema Updates

### 3.1 Datasets Table (Updated)
- `id` (primary key)
- `filename` (string)
- `upload_date` (datetime)
- `sample_count` (integer)
- `date_range_start` (date)
- `date_range_end` (date)
- `markets` (array)\n- `varieties` (array)\n- `status` (string)
- `cloud_storage_url` (string): S3/GCS URL
- **`version` (string): Semantic version number**
- **`previous_version_id` (foreign key): Link to previous version**
- **`changelog` (text): Human-readable changelog**
- **`is_active` (boolean): Whether this version is currently active**
- **`created_by` (string): Admin user who uploaded**
\n### 3.2 Dataset Versions Table (NEW)
- `id` (primary key)
- `dataset_id` (foreign key to Datasets)\n- `version` (string)\n- `release_date` (datetime)
- `sample_count` (integer)
- `file_size` (integer in bytes)\n- `download_url` (string)
- `delta_patch_url` (string, optional)
- `changelog` (text)\n- `breaking_changes` (boolean)
- `is_active` (boolean)
\n### 3.3 Model Training Jobs Table (NEW)
- `id` (primary key)
- `job_id` (string): Celery task ID
- `dataset_id` (foreign key)\n- `dataset_version` (string)
- `model_types` (array)\n- `status` (string): 'queued', 'running', 'completed', 'failed'
- `progress` (integer):0-100
- `current_stage` (string)\n- `started_at` (datetime)
- `completed_at` (datetime, nullable)
- `error_message` (text, nullable)
- `metrics` (JSON): Final model performance metrics
\n### 3.4 Sync Events Table (NEW)
- `id` (primary key)
- `user_id` (foreign key)\n- `event_type` (string): 'update_available', 'update_downloaded', 'retrain_completed', etc.
- `dataset_version` (string)
- `timestamp` (datetime)
- `payload` (JSON): Event-specific data
- `delivered` (boolean): Whether notification was successfully delivered

---

## 4. Admin Panel Features (NEW)

**Purpose**: Provide admin interface for managing datasets and monitoring system.

**Features**:

### 4.1 Dataset Management\n- Upload new dataset versions
- Edit changelog manually
- Set active dataset version
- Rollback to previous version
- View dataset statistics and metadata
- Delete old versions (with confirmation)

### 4.2 Model Training Control
- Trigger manual retraining
- View retraining job status and logs
- Compare model performance across versions
- Rollback to previous model version
- Schedule automatic retraining

### 4.3 User Monitoring
- View active WebSocket connections
- See user sync status (up-to-date vs outdated)
- Send manual notifications to users
- View sync event logs
\n### 4.4 System Health
- Monitor Celery queue length
- View background job success/failure rates
- Check cloud storage usage
- Monitor API response times
- View error logs and alerts

---
\n## 5. Security Considerations

### 5.1 Dataset Update Security
- Only authenticated admins can upload datasets
- Validate dataset integrity (checksums)\n- Scan uploaded files for malware
- Rate limit update checks to prevent abuse
- Signed URLs for dataset downloads (time-limited)

### 5.2 WebSocket Security
- Require JWT authentication for WebSocket connections
- Validate tokens on each message
- Implement rate limiting for WebSocket messages
- Encrypt WebSocket traffic (WSS)\n
### 5.3 Model Security
- Store trained models securely (encrypted at rest)
- Prevent unauthorized access to model files
- Log all model training and deployment events
- Implement model versioning and rollback

---

## 6. Performance Optimization

### 6.1 Caching Strategy
- Cache dataset metadata in Redis (1-hour TTL)
- Cache model predictions for common queries (24-hour TTL)
- Cache changelog responses (5-minute TTL)
- Use CDN for dataset downloads

### 6.2 Database Optimization
- Index frequently queried columns (dataset_id, version, user_id)
- Partition large tables by date\n- Use read replicas for heavy read operations
- Implement connection pooling

### 6.3 Background Job Optimization
- Use Celery task priorities (high for user-triggered, low for scheduled)
- Implement task result expiration (7 days)
- Use task routing for different job types
- Monitor queue length and scale workers dynamically

---

## 7. Monitoring & Logging

### 7.1 Key Metrics to Track
- Dataset update frequency
- Model retraining duration and success rate
- WebSocket connection count and stability
- API response times for sync endpoints
- Push notification delivery rate
- User sync status distribution (up-to-date vs outdated)\n
### 7.2 Logging\n- Log all dataset uploads with version and changelog
- Log model retraining events with metrics
- Log sync events (updates, downloads, failures)
- Log WebSocket connection events
- Use structured logging (JSON format)
- Integrate with monitoring tools (Sentry, CloudWatch, Datadog)

### 7.3 Alerts
- Alert on model retraining failures
- Alert on high sync failure rate
- Alert on WebSocket connection drops
- Alert on abnormal dataset upload patterns
- Alert on low disk space or high CPU usage

---

## 8. Deployment Considerations

### 8.1 Infrastructure Requirements
- **Web Server**: Uvicorn/Gunicorn for FastAPI\n- **Background Workers**: Celery workers (minimum 2 for redundancy)
- **Message Broker**: Redis or RabbitMQ for Celery
- **Database**: PostgreSQL with replication
- **Cloud Storage**: AWS S3 or Google Cloud Storage\n- **WebSocket Server**: Separate process or integrated with FastAPI
- **Load Balancer**: Nginx or AWS ALB for distributing traffic
- **CDN**: CloudFront or Cloudflare for dataset downloads

### 8.2 Scaling Strategy
- Horizontal scaling for API servers (add more instances)
- Vertical scaling for database (increase resources)
- Auto-scaling for Celery workers based on queue length
- Use managed services (AWS RDS, ElastiCache) for easier scaling
\n### 8.3 Backup & Recovery
- Daily automated backups of database\n- Versioned backups of datasets in S3 (with lifecycle policies)
- Backup trained models regularly
- Test recovery procedures quarterly
- Implement disaster recovery plan

---

## 9. Testing Strategy

### 9.1 Unit Tests
- Test dataset validation logic
- Test version comparison and changelog generation
- Test model retraining pipeline stages
- Test WebSocket event broadcasting
- Test delta update computation

### 9.2 Integration Tests
- Test end-to-end dataset update flow
- Test model retraining triggered by dataset update
- Test WebSocket connection and event delivery
- Test push notification delivery
- Test sync conflict resolution

### 9.3 Load Tests
- Simulate 1000+ concurrent WebSocket connections
- Test API performance under high load (1000 req/sec)
- Test background job queue with 100+ simultaneous tasks
- Test dataset download performance with 100+ concurrent users

### 9.4 User Acceptance Testing
- Test mobile app sync flow with real users
- Verify notification delivery on iOS and Android
- Test offline mode and sync after reconnection
- Verify UI updates after dataset sync

---
\n## 10. Documentation Deliverables

- API documentation (auto-generated by FastAPI)
- Dataset versioning guide for admins
- Model retraining pipeline documentation
- WebSocket event reference\n- Admin panel user guide
- Deployment and configuration guide
- Troubleshooting guide for common issues
- Performance tuning recommendations

---
\nThis updated requirements document now includes comprehensive support for automatic dataset synchronization and model retraining when the backend dataset is updated. The mobile app will receive real-time notifications, download updates efficiently, and automatically retrain models to ensure predictions are always based on the latest data.
