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

## 2. Technical Architecture
\n### 2.1 Mobile Frontend Stack
- **Framework**: React Native (cross-platform iOS/Android)
- **Alternative**: Flutter (Dart-based cross-platform)
- **State Management**: Redux or MobX\n- **Navigation**: React Navigation\n- **Charts & Visualization**: Victory Native, React Native Chart Kit
- **Animations**: React Native Reanimated, Lottie
- **File Upload**: React Native Document Picker, React Native FS
- **Offline Storage**: AsyncStorage, SQLite, Realm
- **Push Notifications**: Firebase Cloud Messaging (FCM)

### 2.2 Backend Stack
- **API Framework**: Python FastAPI
- **ML Models**: Scikit-learn, XGBoost, RandomForest, LSTM
- **Training Data Requirements**: Minimum 100,000+ samples for robust model training
- **Data Processing**: Pandas, NumPy for large-scale data handling
- **AI Features**: LLM-based AI Assistant (API ready)
- **Database**: PostgreSQL / MongoDB
- **File Processing**: Pandas for CSV/Excel parsing and validation
- **Mobile API Optimization**: Compressed JSON responses, pagination for large datasets

### 2.3 Deployment Architecture
- Cross-platform mobile app (iOS App Store, Google Play Store)
- API-first design with mobile-optimized endpoints
- Offline-first architecture with data synchronization
- Push notification system for price alerts
- Optimized for low-bandwidth scenarios

## 3. Core Features & Screens

### 3.1 Splash Screen & Onboarding
\n**Splash Screen**:\n- Animated app logo with AI pulse effect
- Loading indicator for initial data sync
\n**Onboarding Flow** (first-time users):
- Swipeable tutorial screens explaining key features
- Permission requests (storage access for file uploads, notifications)
- Optional account setup or guest mode

### 3.2 Home Dashboard Screen

**Top Navigation Bar**:
- App logo/title on the left
- Notification bell icon (price alerts)
- Settings/profile icon on the right
\n**Quick Action Cards** (scrollable horizontal):
- 'Run Prediction' card with icon
- 'Upload Dataset' card with cloud icon
- 'AI Assistant' card with chat icon
- 'View Insights' card with lightbulb icon

**Key Metrics Display** (grid layout):
- Prediction Accuracy card with circular progress indicator
- MAE (Mean Absolute Error) value
- R² Score visualization
- Training dataset size badge (e.g., 'Trained on 100,000+ samples')\n- Last prediction timestamp

**Recent Predictions List**:
- Scrollable list of recent predictions with swipe-to-delete
- Each item shows: Date, Market, Variety, Predicted Price, Trend indicator (↑↓)\n- Tap to view detailed prediction\n
### 3.3 AI Prediction Screen

**Input Section** (collapsible accordion):
- **Dataset Selector**: Dropdown showing'Default Dataset' or uploaded dataset name
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
- Trend indicator (↑ ↓) with color coding (green for up, red for down)
- Prediction timestamp
- Selected year and month context display
-'Save Prediction' button (bookmark icon)
- 'Share' button (share icon for exporting result)

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
- Supported formats label:'CSV, Excel (.xlsx, .xls)'
- Drag-and-drop not applicable (mobile limitation)
\n**File Selection Flow**:
- Opens native file picker (iOS Files app, Android file manager)
- Shows file name and size after selection
- 'Upload' button to confirm
\n**Upload Progress**:
- Progress bar with percentage indicator
- 'Cancel Upload' option
- Estimated time remaining

**Validation Feedback**:
- Success message with checkmark animation: 'Dataset uploaded successfully! 105,000 samples detected.'
- Error messages with detailed explanations:\n  - 'Dataset must contain at least 100,000 samples. Current: 85,000'\n  - 'Missing required columns: [Rainfall, Humidity]'
  - 'Invalid data format in Modal Price column'

**Dataset Management**:
- List of uploaded datasets with metadata (name, sample count, upload date)
- Swipe-to-delete gesture for removing datasets
- 'Set as Active' button to switch between datasets

### 3.5 AI Insights Screen

**Auto-Generated Insights Section**:
- Card-based layout with natural language explanations
- Example: 'Price is expected to increase by 12% due to lower arrivals and reduced rainfall in the region'
- Context-aware analysis based on current prediction and selected time period

**Risk Alerts Section**:
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

**Chat History**:
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
- 'Reset to Default' button\n
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
\n### 3.9 Settings Screen

**Account Section** (if applicable):
- Profile picture and name
- 'Edit Profile' option
- 'Sign Out' button
\n**Preferences**:
- Language selection (if multi-language support)
- Theme toggle (Light / Dark mode)
- Notification preferences (price alerts, insights updates)
- Default dataset selection

**Data Management**:
- 'Clear Cache' button
- 'Delete All Predictions' button
- 'Manage Uploaded Datasets' link

**About Section**:
- App version number
- 'Privacy Policy' link
- 'Terms of Service' link
-'Contact Support' button
- 'Rate App' button (links to App Store/Play Store)

### 3.10 Notifications & Alerts

**Push Notifications**:
- Price alert notifications when significant changes detected
- Daily/weekly summary notifications (configurable)
- Dataset upload completion notifications
- Model training completion notifications

**In-App Notifications**:
- Toast messages for quick feedback (e.g., 'Prediction saved successfully')
- Alert dialogs for critical actions (e.g., 'Delete dataset?')
\n## 4. Mobile Design System

### 4.1 Color Palette
- **Primary Background**: Dark gradient (charcoal #1a1a1a to navy #0a0e27)
- **Accent Colors**:
  - Cyan (#00d9ff) for primary actions and highlights
  - Purple (#a855f7) for secondary elements
  - Green (#10b981) for positive indicators (price up, success)
  - Red (#ef4444) for negative indicators (price down, errors)
- **Text**: White (#ffffff) primary, gray (#9ca3af) secondary
- **Card Background**: Semi-transparent dark (#1f2937 with 80% opacity)
\n### 4.2 Visual Style
- **Card Design**: Rounded corners (12px border-radius), subtle shadows, glassmorphism effect
- **Buttons**: Full-width primary buttons (48px height), rounded (8px), gradient backgrounds
- **Icons**: Outlined style with consistent2px stroke width,24px size
- **Typography**: \n  - Headings: Bold, 20-24px\n  - Body text: Regular, 14-16px
  - Captions: Light, 12px
- **Spacing**: Consistent 8px/16px/24px spacing scale

### 4.3 Touch Interactions
- **Tap Targets**: Minimum 44x44px for all interactive elements (iOS HIG standard)
- **Gestures**:
  - Swipe-to-delete for list items
  - Pull-to-refresh for data updates
  - Pinch-to-zoom for charts
  - Long-press for contextual menus
- **Feedback**: Haptic feedback on button taps (iOS), ripple effect on Android
- **Animations**: Smooth transitions (200-300ms), spring animations for modals

### 4.4 Responsive Layout
- **Portrait Mode**: Primary layout orientation
- **Landscape Mode**: Optimized chart viewing, side-by-side layouts where applicable
- **Tablet Support**: Adaptive layouts with larger cards and multi-column grids
- **Safe Area Handling**: Respect notch/status bar/navigation bar insets on all devices

### 4.5 Accessibility\n- **Font Scaling**: Support for system font size preferences
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Screen Reader Support**: Proper labels for all interactive elements
- **Voice Control**: Compatible with iOS VoiceOver and Android TalkBack

## 5. Reference Materials

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

## 7. Backend API Adaptations for Mobile

### 7.1 Mobile-Optimized Endpoints
- **Compressed Responses**: Use gzip compression for API responses
- **Pagination**: Implement pagination for large datasets (e.g., 50records per page)
- **Incremental Data Sync**: Provide endpoints for syncing only new/updated data
- **Reduced Payload Size**: Return only essential fields for mobile screens

### 7.2 Authentication & Security
- **Token-Based Auth**: JWT tokens for secure API access
- **Refresh Tokens**: Long-lived refresh tokens for seamless re-authentication
- **SSL Pinning**: Prevent man-in-the-middle attacks\n\n### 7.3 Push Notification Backend
- **FCM Integration**: Firebase Cloud Messaging for cross-platform notifications
- **Notification Triggers**: Price alerts, dataset upload completion, model training updates
- **User Preferences**: API endpoints for managing notification settings

## 8. Project Deliverables

- Fully functional React Native mobile app (iOS and Android)
- Complete backend API with mobile-optimized endpoints (see Backend Requirements Document)
- Integrated ML models with prediction pipeline trained on 100,000+ sample datasets
- AI chat assistant functionality\n- Dataset upload and processing system for mobile
- Year/month-based prediction filtering
- Offline mode with local data caching
- Push notification system\n- Clean, modular, production-ready code
- Responsive design for all mobile screen sizes (phones and tablets)
- App Store and Google Play Store submission-ready builds
- Documentation for deployment and maintenance
- Model training pipeline optimized for large datasets (100,000+ samples)
- Data validation system ensuring compliance with required format and sample size

## 9. Use Cases

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

---

# Backend Requirements Document for Mobile Application

## 1. Backend Overview

The backend system powers the AI-driven agricultural price prediction mobile application. It handles data processing, machine learning model training and inference, mobile-optimized API endpoints, push notifications, and AI assistant functionality.

**Technology Stack**:
- **Framework**: Python FastAPI (fast, modern, mobile-friendly)
- **Machine Learning**: Scikit-learn, XGBoost, RandomForest, LSTM
- **Data Processing**: Pandas, NumPy\n- **Database**: PostgreSQL or MongoDB
- **AI Assistant**: LLM-based conversational AI (API integration)
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Authentication**: JWT tokens\n- **File Storage**: AWS S3 or Google Cloud Storage for uploaded datasets

---

## 2. Core Backend Components

### 2.1 Mobile-Optimized API Endpoints\n
#### **Endpoint1: `/predict` (POST)**
- **Purpose**: Generate price predictions based on user inputs
- **Input Parameters**:
  - `year` (integer): Selected year for prediction
  - `month` (integer): Selected month (1-12)
  - `market` (string): Market/city name
  - `variety` (string): Crop variety
  - `model_type` (string): ML model to use
  - `dataset_id` (optional): ID of uploaded custom dataset
- **Output** (compressed JSON):
  - `predicted_price` (float)\n  - `confidence_interval` (object)
  - `trend` (string)
  - `timestamp` (datetime)
- **Mobile Optimization**: Gzip compression, reduced payload size

#### **Endpoint 2: `/upload-dataset` (POST)**
- **Purpose**: Handle custom dataset uploads from mobile devices
- **Input**: Multipart form data with CSV/Excel file
- **Processing Steps**:
  1. Validate file format and size
  2. Check row count (minimum 100,000 samples)
  3. Validate required columns\n  4. Store dataset in cloud storage (S3/GCS)
  5. Return dataset metadata
- **Output**:
  - `dataset_id` (string)
  - `sample_count` (integer)
  - `status` (string)
  - `message` (string)
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
- **Mobile Optimization**: Downsampled data points for performance (e.g., 100 points instead of 1000)

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
\n---

### 2.2 Machine Learning Pipeline

(Same as web version, no changes required)

#### **Step 1: Data Preprocessing**
- Load dataset (CSV/Excel) using Pandas
- Handle missing values\n- Normalize numerical features
- Encode categorical features
- Create time-based features\n- Split data: 80% training, 10% validation, 10% testing

#### **Step 2: Model Training**
- Train RandomForest, XGBoost, LSTM models
- Use cross-validation with temporal splits
- Hyperparameter tuning\n- Save trained models
\n#### **Step 3: Model Evaluation**
- Calculate MAE, RMSE, R² Score, MAPE
- Compare models and select best performer
- Generate feature importance rankings
\n#### **Step 4: Prediction Inference**
- Load trained model
- Preprocess input features
- Generate prediction with confidence intervals
- Return result to API endpoint

---
\n### 2.3 Dataset Upload Processing for Mobile

**Workflow**:
1. **File Reception**: Receive uploaded file via `/upload-dataset` endpoint
2. **Chunked Upload Support**: Handle large files in chunks (5MB per chunk)
3. **Format Validation**: Check file extension (CSV, .xlsx, .xls)
4. **Size Check**: Verify file contains minimum 100,000 rows
5. **Column Validation**: Ensure all required columns are present
6. **Data Quality Checks**: Missing values, data types, value ranges
7. **Cloud Storage**: Upload validated dataset to S3/GCS
8. **Metadata Extraction**: Calculate statistics\n9. **Response**: Return success message with dataset ID or detailed error

**Mobile-Specific Considerations**:
- Support for resumable uploads (in case of network interruption)
- Progress tracking with percentage updates
- Background upload support (continue upload when app is backgrounded)
\n---

### 2.4 Push Notification System

**Architecture**:
- Integrate Firebase Cloud Messaging (FCM) for cross-platform notifications
- Store device tokens in database (linked to user accounts)
- Trigger notifications based on events:\n  - Price alerts (significant price changes)
  - Dataset upload completion
  - Model training completion
  - Daily/weekly summary notifications

**Notification Payload**:
```json
{
  'title': 'Price Alert',
  'body': 'Chilli price increased by 12% in Bengaluru',
  'data': {
    'type': 'price_alert',
    'market': 'Bengaluru',
    'variety': 'Guntur',
    'predicted_price': 28404.8,
    'trend': 'up'\n  }
}
```

**User Preferences**:
- API endpoints for managing notification settings
- Allow users to enable/disable specific notification types
- Set notification frequency (real-time, daily, weekly)
\n---

### 2.5 Authentication & Security

**JWT Token-Based Authentication**:
- User login endpoint: `/auth/login` (POST)
- Input: `email`, `password`
- Output: `access_token` (short-lived,15minutes), `refresh_token` (long-lived, 7 days)
- Protected endpoints require `Authorization: Bearer <access_token>` header

**Token Refresh**:
- Endpoint: `/auth/refresh` (POST)
- Input: `refresh_token`
- Output: New `access_token`
\n**Security Measures**:
- SSL/TLS encryption for all API requests
- Rate limiting to prevent abuse (e.g., 100 requests per minute per user)
- Input validation and sanitization
- SQL injection prevention
- CORS configuration for mobile app origins

---
\n## 3. Training Data Specifications

(Same as web version, no changes required)

### 3.1 Mandatory Requirements
- **Sample Size**: Minimum 100,000 records
- **Data Format**: CSV or Excel (.xlsx, .xls)
- **Required Columns**: Date, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max/Min, Humidity, Area, Production
\n### 3.2 Data Quality Standards
- **Missing Values**:<5% per column
- **Date Consistency**: Chronological ordering, no duplicates
- **Valid Ranges**: Positive prices, non-negative arrivals, valid temperature/humidity ranges
- **Temporal Coverage**: Minimum 5+ years of historical data

### 3.3 Model Training Process
- Load 100,000+ samples from dataset
- Preprocess and clean data
- Split into training/validation/testing sets
- Train ensemble models\n- Evaluate and save trained models
- Enable incremental learning\n
---

## 4. Database Schema

### 4.1 Datasets Table
- `id` (primary key)
- `filename` (string)
- `upload_date` (datetime)
- `sample_count` (integer)
- `date_range_start` (date)
- `date_range_end` (date)
- `markets` (array)\n- `varieties` (array)\n- `status` (string)
- `cloud_storage_url` (string): S3/GCS URL
\n### 4.2 Predictions Table
- `id` (primary key)
- `user_id` (foreign key)
- `dataset_id` (foreign key)
- `year` (integer)
- `month` (integer)
- `market` (string)
- `variety` (string)
- `model_type` (string)
- `predicted_price` (float)\n- `confidence_lower` (float)
- `confidence_upper` (float)
- `timestamp` (datetime)
\n### 4.3 Users Table (if authentication is implemented)
- `id` (primary key)
- `email` (string, unique)
- `password_hash` (string)
- `created_at` (datetime)
- `last_login` (datetime)
\n### 4.4 Devices Table (for push notifications)
- `id` (primary key)
- `user_id` (foreign key)
- `device_token` (string): FCM token
- `platform` (string): 'iOS' or 'Android'
- `registered_at` (datetime)
\n### 4.5 Notifications Table
- `id` (primary key)
- `user_id` (foreign key)
- `type` (string): 'price_alert', 'dataset_upload', etc.
- `title` (string)
- `body` (string)
- `data` (JSON)
- `sent_at` (datetime)
- `read` (boolean)

---

## 5. Deployment & Scalability

### 5.1 Deployment Steps
1. Set up Python environment with required libraries
2. Configure database (PostgreSQL or MongoDB)
3. Set up cloud storage (AWS S3 or Google Cloud Storage)
4. Configure Firebase Cloud Messaging (FCM)
5. Load pre-trained models or train new models on 100,000+ sample dataset
6. Start FastAPI server (e.g., `uvicorn main:app --host 0.0.0.0 --port 8000`)\n7. Deploy to cloud platform (AWS, Google Cloud, Heroku, etc.)
8. Configure SSL certificate for HTTPS
9. Set up monitoring and logging (e.g., Sentry, CloudWatch)

### 5.2 Scalability Considerations
- Use asynchronous processing for model training and large file uploads
- Implement caching for frequently requested predictions (Redis)
- Use load balancers for handling multiple concurrent requests
- Optimize database queries with indexing
- Consider distributed training for very large datasets (>1million samples)
- Use CDN for serving static assets (if applicable)

---

## 6. Error Handling & Logging
\n### 6.1 Error Responses
- Return clear, actionable error messages to mobile app
- Use HTTP status codes appropriately (400, 401, 403, 404, 500)
- Log all errors with timestamps and stack traces
\n### 6.2 Logging\n- Log all API requests with parameters and response times
- Log dataset uploads with validation results
- Log model training progress and performance metrics
- Use structured logging (JSON format) for easy parsing
- Integrate with monitoring tools (e.g., Sentry, CloudWatch)

---

## 7. Security & Best Practices

- Validate all user inputs to prevent injection attacks
- Limit file upload sizes to prevent abuse (e.g., max 100MB)
- Use JWT tokens for API access\n- Sanitize file uploads to prevent malicious code execution
- Implement rate limiting to prevent API abuse
- Use HTTPS for secure data transmission
- Encrypt sensitive data at rest (e.g., user passwords)
- Regular security audits and penetration testing\n
---

## 8. Backend Deliverables

- Fully functional FastAPI backend with all mobile-optimized endpoints implemented
- ML pipeline for training and inference on 100,000+ sample datasets\n- Dataset upload and validation system with cloud storage integration
- AI assistant integration\n- Push notification system with FCM\n- JWT-based authentication system
- Database schema and migrations
- Comprehensive error handling and logging
- API documentation (auto-generated by FastAPI)
- Deployment guide and configuration files
- Unit tests for critical functions
- Performance optimization for mobile scenarios (low bandwidth, offline mode)

---

This mobile application requirements document provides a complete conversion of the web application into a cross-platform mobile app (iOS and Android) using React Native, with all features adapted for touch interfaces, offline mode, push notifications, and mobile-optimized backend APIs.