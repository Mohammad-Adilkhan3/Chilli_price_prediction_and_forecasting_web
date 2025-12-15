# AI-Driven Agricultural Intelligence Platform Requirements Document

## 1. Project Overview

### 1.1 Project Name
AI-Driven Agricultural Intelligence Platform – Chilli Price Forecasting

### 1.2 Project Description
A high-end professional AI product platform for agricultural price intelligence, specifically focused on chilli price forecasting. The platform provides data-driven insights, predictive analytics, and AI-powered assistance for agricultural market decision-making. Designed as an enterprise-ready solution with modern AI platform aesthetics similar to OpenAI, Anthropic, and NVIDIA dashboards.

### 1.3 Core Objectives
- Deliver accurate AI-powered price predictions for agricultural commodities using large-scale training datasets (100,000+ samples)
- Provide intelligent insights and risk alerts for market trends\n- Enable interactive data exploration through advanced visualizations
- Offer conversational AI assistance for market analysis
- Present a professional, futuristic interface suitable for enterprise use
- Support custom dataset uploads for flexible prediction scenarios
- Train models on comprehensive historical data to ensure high prediction accuracy

## 2. Technical Architecture

### 2.1 Frontend Stack
- **Framework**: React.js\n- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts & Visualization**: Recharts / Chart.js / D3.js
- **Typography**: Inter / Poppins fonts
- **File Upload**: React Dropzone or native file input with drag-and-drop support

### 2.2 Backend Stack
- **API Framework**: Python FastAPI
- **ML Models**: Scikit-learn, XGBoost, RandomForest, LSTM (optional)
- **Training Data Requirements**: Minimum 100,000+ samples for robust model training
- **Data Processing**: Pandas, NumPy for large-scale data handling and preprocessing
- **AI Features**: LLM-based AI Assistant (API ready)
- **Database**: PostgreSQL / MongoDB for storing large datasets
- **File Processing**: Pandas for CSV/Excel parsing, validation, and preprocessing of large-scale datasets

### 2.3 Deployment Architecture
- Modular, scalable architecture\n- API-first design\n- Ready for production deployment
- Optimized for handling large training datasets and real-time inference

## 3. Core Features & Pages

### 3.1 Landing Page
\n**Hero Section**:\n- Animated headline:'AI-Powered Agricultural Price Intelligence'
- Live moving AI charts preview with smooth transitions
- Dynamic background with subtle particle effects
\n**Key Metrics Display**:
- Prediction Accuracy card with glow effect
- MAE (Mean Absolute Error) indicator
- R² Score visualization
- Real-time data pulse animations
- Training dataset size indicator (e.g., 'Trained on 100,000+ samples')

**Call-to-Action Buttons**:
- 'Launch AI Dashboard' (primary CTA)
- 'Talk to AI Assistant' (secondary CTA)
\n### 3.2 AI Prediction Dashboard

**Header Bar**:
- **Platform Logo/Title**: Positioned on the left side
- **Dataset Upload Field**: \n  - Compact upload button with icon (cloud upload or file icon)
  - Label: 'Upload Dataset' or file icon with tooltip
  - Click to open file selector or drag-and-drop modal
  - Supported formats: CSV, Excel (.xlsx, .xls)
  - Visual indicator showing currently active dataset (default or uploaded)
  - Success notification badge when dataset is uploaded
  - Quick access without navigating to sidebar
- **Navigation Links**: Dashboard, Insights, Charts, Models (center-aligned)
- **User Profile/Settings**: Positioned on the right side
- **AI Assistant Quick Access**: Floating button on the right

**Left Sidebar (Minimal & Professional)**:
- **Dataset Upload Section** (retained for detailed upload management):
  - Upload button with file icon and 'Upload Custom Dataset' label
  - Supported formats: CSV, Excel (.xlsx, .xls)
  - Drag-and-drop zone with visual feedback
  - File validation and preview of uploaded data columns
  - Success/error notifications for upload status
  - Option to use default dataset or uploaded dataset
  - Display dataset size information (number of samples)\n\n- **Time Selection**:
  - Year dropdown selector (dynamic range based on available data)
  - Month dropdown selector (January - December)
  - Auto-update predictions when year/month changes
\n- Crop Selection dropdown
- Market / City selector
- Variety filter\n- Time Frequency options: Weekly / Monthly / Yearly
- Model Selector with AI recommendation badge
-'Run Prediction' button with loading animation

**Main Content Area**:
\n*AI Price Prediction Card*:
- Large animated ₹ value display\n- Confidence interval range
- Trend indicator (↑ ↓) with color coding
- Prediction timestamp
- Display selected year and month context
\n*Interactive Charts*:
- Price trend over time (line chart) - filtered by selected year/month
- Forecast vs Actual comparison (dual-axis chart)
- Seasonal demand heatmap
- Rainfall vs Price correlation scatter plot

**KPI AI Widgets**:
- Accuracy percentage with circular progress\n- MAE value card
- RMSE indicator
- AI Confidence Score meter
- Training dataset size badge

### 3.3 AI Insights Engine

**Auto-Generated Explanations**:
- Natural language insights: 'Price is expected to increase due to lower arrivals and reduced rainfall'
- Context-aware analysis based on current data and selected time period
\n**Risk Alerts**:
- Supply volatility warnings
- Weather anomaly notifications
- Market disruption alerts
\n**Future Trend Highlights**:
- 3-6 month forecast summaries
- Key inflection points
- Seasonal pattern predictions
\n### 3.4 AI Chat Assistant

**Capabilities**:
- Trained on dataset metadata, market history, and model outputs
- Answers questions like:\n  - 'Why is price high next month?'
  - 'Compare2024 vs 2027 prices'
  - 'Which market is better to sell?'
  - 'Show predictions for January 2025'
  - 'How many samples was the model trained on?'

**UI Components**:
- Floating AI bubble for quick access
- Expandable full chat window
- Responses with embedded charts and explanations
- Typing indicators and smooth message animations

### 3.5 Advanced AI Charts Page

**Features**:
- AI-annotated graphs with contextual explanations
- Hover tooltips with detailed insights
- Scenario simulation sliders:\n  - Rainfall adjustment (↑ ↓)
  - Arrivals adjustment (↑ ↓)
-'What-if analysis' powered by AI
- Real-time chart updates based on parameter changes
- Year/month filter integration

### 3.6 Model Intelligence Page

**Model Comparison**:
- Visual comparison of ML models
- Auto-highlight best performing model
- Performance metrics table
\n**Explainable AI (XAI)**:
- Feature importance charts
- SHAP (SHapley Additive exPlanations) visualizations
- Model performance leaderboard
- Training accuracy trends
- Training dataset statistics (sample size, feature distribution)

### 3.7 Professional Enhancements

**UI/UX Polish**:
- Loading animations with AI pulse effect
- Skeleton loaders for content\n- Comprehensive error-handling UI
- Fully responsive design for all screen sizes
- Admin-ready architecture for future expansion
- Smooth transitions when switching between years/months
- Visual feedback for dataset upload progress
- Header bar upload field with quick access and visual status indicators
- Progress indicators for large dataset processing
- Real-time display of training dataset size and model performance metrics

## 4. Design System

### 4.1 Color Palette
- **Primary Background**: Charcoal black (#1a1a1a) to navy (#0a0e27) gradient
- **Accent Colors**: \n  - Cyan (#00d9ff) for primary actions and highlights
  - Purple (#a855f7) for secondary elements
  - Green (#10b981) for positive indicators
- **Text**: White (#ffffff) primary, gray (#9ca3af) secondary
\n### 4.2 Visual Style
- **Card Design**: Glassmorphism effect with subtle backdrop blur and border glow
- **Shadows**: Multi-layer shadows with neon accent glow on interactive elements
- **Borders**: 1px solid with gradient overlays,8px border-radius
- **Icons**: Outlined style with consistent2px stroke width
- **Upload Zone**: Dashed border with hover state, icon-centered layout
- **Header Upload Button**: Compact design with icon, subtle glow on hover, badge indicator for active dataset

### 4.3 Animation & Interaction
- **Micro-interactions**: Smooth hover states with200ms transitions
- **Page Transitions**: Fade and slide effects using Framer Motion
- **Chart Animations**: Staggered entry animations for data points
- **Loading States**: Pulsing gradient animations
- **Upload Feedback**: Progress bar with percentage indicator, success checkmark animation
- **Header Upload**: Smooth modal/dropdown expansion, file upload progress indicator

### 4.4 Layout Structure
- **Dashboard Layout**: Header bar + sidebar + main content grid system
- **Header Bar**: Fixed top position, full-width, with logo, upload field, navigation, and user controls
- **Card Grid**: Responsive 12-column grid with auto-fit\n- **Spacing**: Consistent 16px/24px/32px spacing scale
- **Content Density**: Balanced information hierarchy with clear visual separation

## 5. Reference Materials

### 5.1 Current Interface Screenshots
- WhatsApp Image 2025-12-05 at 20.18.49_18cee13a.jpg (existing dashboard interface showing Karnataka Red Chilli Price Prediction Model)
\n### 5.2 Example Training Dataset
- image.png (standard dataset structure with 100,000+ records including columns: Date, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max/Min, Humidity, Area, Production)\n
These screenshots show the current interface and the mandatory dataset structure. The platform must be trained on datasets following the exact format shown in image.png with a minimum of 100,000 samples to ensure robust model performance and accurate predictions.

## 6. Project Deliverables

- Fully implemented frontend with React.js + Tailwind CSS
- Complete backend API with FastAPI (see separate Backend Requirements Document below)
- Integrated ML models with prediction pipeline trained on 100,000+ sample datasets (following image.png format)
- AI chat assistant functionality\n- Dataset upload and processing system (header bar + sidebar) supporting large-scale data\n- Year/month-based prediction filtering
- Clean, modular, production-ready code\n- Responsive design for all devices
- Documentation for deployment and maintenance
- Model training pipeline optimized for large datasets (100,000+ samples)
- Data validation system ensuring compliance with required format and sample size

## 7. Use Cases

- Professional portfolio/resume project
- Hackathon submission
- Final year academic project
- Startup MVP foundation
- Enterprise agricultural intelligence solution
- Custom market analysis with user-provided datasets (100,000+ samples)
- Historical trend analysis by specific time periods
- Quick dataset switching via header bar for rapid prediction comparisons
- Large-scale agricultural market forecasting using comprehensive historical data
- Research and academic applications requiring high-accuracy predictions based on extensive training data (100,000+ samples)
- Real-world deployment for agricultural market intelligence with production-grade accuracy

---

# Backend Requirements Document (Separate & Easy to Understand)

## 1. Backend Overview

The backend system powers the AI-driven agricultural price prediction platform. It handles data processing, machine learning model training and inference, API endpoints for frontend communication, and AI assistant functionality.

**Technology Stack**:
- **Framework**: Python FastAPI (fast, modern, easy to use)
- **Machine Learning**: Scikit-learn, XGBoost, RandomForest, LSTM\n- **Data Processing**: Pandas, NumPy\n- **Database**: PostgreSQL or MongoDB
- **AI Assistant**: LLM-based conversational AI (API integration)
\n---

## 2. Core Backend Components

### 2.1 API Endpoints (FastAPI)

The backend exposes RESTful API endpoints for the frontend to interact with:\n\n#### **Endpoint1: `/predict` (POST)**
- **Purpose**: Generate price predictions based on user inputs
- **Input Parameters**:
  - `year` (integer): Selected year for prediction
  - `month` (integer): Selected month (1-12)
  - `market` (string): Market/city name (e.g., 'Bengaluru')
  - `variety` (string): Crop variety (e.g., 'Guntur', 'Byadgi')
  - `model_type` (string): ML model to use ('RandomForest', 'XGBoost', 'LSTM')\n  - `dataset_id` (optional): ID of uploaded custom dataset (if applicable)
- **Output**:
  - `predicted_price` (float): Predicted modal price in ₹ per quintal
  - `confidence_interval` (object): Lower and upper bounds of prediction
  - `trend` (string): 'up' or 'down' indicator
  - `timestamp` (datetime): Prediction generation time
- **Example Response**:
```json
{
  'predicted_price': 28404.8,
  'confidence_interval': {'lower': 27500, 'upper': 29300},
  'trend': 'up',
  'timestamp': '2025-12-15T06:36:28Z'
}
```
\n#### **Endpoint 2: `/upload-dataset` (POST)**
- **Purpose**: Handle custom dataset uploads from users
- **Input**: Multipart form data with CSV/Excel file
- **Processing Steps**:
  1. Validate file format (CSV, .xlsx, .xls)
  2. Check file size and row count (minimum 100,000 samples)\n  3. Validate required columns (Date, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max/Min, Humidity, Area, Production)
  4. Check data quality (missing values, data types, valid ranges)
  5. Store dataset in database with unique ID
  6. Return dataset metadata\n- **Output**:
  - `dataset_id` (string): Unique identifier for uploaded dataset
  - `sample_count` (integer): Number of records in dataset
  - `status` (string): 'success' or 'error'
  - `message` (string): Detailed feedback or error description
- **Example Response**:
```json
{
  'dataset_id': 'ds_12345',
  'sample_count': 105000,
  'status': 'success',
  'message': 'Dataset uploaded and validated successfully'
}
```

#### **Endpoint 3: `/ai-insights` (POST)**
- **Purpose**: Generate natural language insights and explanations
- **Input Parameters**:
  - `year` (integer)\n  - `month` (integer)
  - `market` (string)
  - `variety` (string)
  - `predicted_price` (float)
  - `historical_data` (array): Recent price trends\n- **Output**:
  - `insights` (array of strings): AI-generated explanations
  - `risk_alerts` (array): Warning messages if applicable
  - `trend_summary` (string): 3-6 month forecast summary
- **Example Response**:
```json
{
  'insights':[
    'Price is expected to increase by 12% due to lower arrivals and reduced rainfall in the region',
    'Historical data shows similar patterns during January in previous years'\n  ],
  'risk_alerts': ['Supply volatility warning: Arrivals 15% below average'],
  'trend_summary': 'Prices likely to remain high through Q1 2025 due to weather conditions'
}
```

#### **Endpoint 4: `/chat` (POST)**
- **Purpose**: Conversational AI assistant for user queries
- **Input**:
  - `message` (string): User question\n  - `context` (object): Current dashboard state (selected year, month, market, etc.)
- **Output**:\n  - `response` (string): AI-generated answer
  - `charts` (optional array): Embedded chart data if relevant
- **Example Response**:
```json
{
  'response': 'In January 2025, the predicted price for Guntur variety in Bengaluru is ₹28,404.8 per quintal, which is 8% higher than December 2024 due to reduced rainfall and lower market arrivals.',
  'charts': [{'type': 'line', 'data': [...]}]
}
```

#### **Endpoint 5: `/charts-data` (GET)**
- **Purpose**: Retrieve visualization data for charts
- **Input Parameters**:
  - `year` (integer)\n  - `month` (integer)
  - `market` (string)
  - `variety` (string)
  - `chart_type` (string): 'price_trend', 'forecast_vs_actual', 'heatmap', 'correlation'
- **Output**: JSON data formatted for frontend chart libraries
\n#### **Endpoint 6: `/dataset-stats` (GET)**
- **Purpose**: Retrieve training dataset statistics
- **Input**: `dataset_id` (optional, defaults to main training dataset)
- **Output**:
  - `sample_count` (integer)
  - `date_range` (object): Start and end dates
  - `markets` (array): List of markets in dataset
  - `varieties` (array): List of crop varieties
  - `feature_statistics` (object): Mean, min, max for numerical features
\n---

### 2.2 Machine Learning Pipeline

#### **Step 1: Data Preprocessing**\n- Load dataset (CSV/Excel) using Pandas
- Handle missing values (imputation or removal based on threshold)
- Convert date strings to datetime objects
- Normalize numerical features (rainfall, temperature, humidity, area, production)
- Encode categorical features (market, variety) using label encoding or one-hot encoding
- Create time-based features (month, quarter, year, day_of_year)
- Split data: 80% training, 10% validation, 10% testing (temporal split to prevent data leakage)

#### **Step 2: Model Training**
- Train multiple models in parallel:\n  - **RandomForest**: Ensemble of decision trees, robust to overfitting
  - **XGBoost**: Gradient boosting, high accuracy for tabular data
  - **LSTM** (optional): Recurrent neural network for time-series patterns
- Use cross-validation with temporal splits (5-fold recommended)
- Hyperparameter tuning using GridSearchCV or RandomizedSearchCV
- Save trained models as pickle files or joblib format

#### **Step 3: Model Evaluation**
- Calculate performance metrics:
  - **MAE** (Mean Absolute Error): Average prediction error in ₹
  - **RMSE** (Root Mean Squared Error): Penalizes large errors
  - **R² Score**: Proportion of variance explained by model (0.998target)
  - **MAPE** (Mean Absolute Percentage Error): Percentage-based accuracy
- Compare models and select best performer
- Generate feature importance rankings using SHAP values

#### **Step 4: Prediction Inference**
- Load trained model from storage
- Preprocess input features (year, month, market, variety, etc.)
- Generate prediction with confidence intervals (using quantile regression or bootstrapping)
- Return prediction result to API endpoint

---

### 2.3 Dataset Upload Processing

**Workflow**:
1. **File Reception**: Receive uploaded file via `/upload-dataset` endpoint
2. **Format Validation**: Check file extension (CSV, .xlsx, .xls)
3. **Size Check**: Verify file contains minimum 100,000 rows
4. **Column Validation**: Ensure all required columns are present:\n   - Date, Market, Variety, Modal Price, Arrivals, Rainfall, Temperature Max, Temperature Min, Humidity, Area, Production
5. **Data Quality Checks**:
   - Missing values: Reject if >5% missing per column
   - Data types: Ensure numerical columns contain valid numbers
   - Date format: Parse and validate date strings
   - Value ranges: Check for outliers or invalid values (e.g., negative prices)
6. **Storage**: Save validated dataset to database with unique ID
7. **Metadata Extraction**: Calculate statistics (sample count, date range, markets, varieties)
8. **Response**: Return success message with dataset ID or detailed error message

**Error Handling Examples**:
- 'Dataset must contain at least 100,000 samples. Current: 85,000'\n- 'Missing required columns: [Rainfall, Humidity]'
- 'Invalid data format in column Modal Price: Non-numeric values found'
- 'Date column contains invalid formats. Expected: YYYY-MM-DD or DD/MM/YYYY'
\n---

### 2.4 AI Assistant Implementation

**Architecture**:
- Integrate with LLM API (e.g., OpenAI GPT, Anthropic Claude, or open-source models)
- Provide context to LLM:\n  - Dataset metadata (markets, varieties, date ranges)
  - Current prediction results
  - Historical price trends
  - Model performance metrics
- Parse user questions and generate relevant responses
- Embed charts or data tables in responses when appropriate

**Example Queries Handled**:
- 'Why is price high next month?' → Analyze arrivals, rainfall, and historical patterns
- 'Compare2024 vs 2027 prices' → Retrieve data for both years and generate comparison
- 'Which market is better to sell?' → Compare predicted prices across markets
- 'Show predictions for January 2025' → Fetch and display prediction data

---
\n## 3. Training Data Specifications

### 3.1 Mandatory Requirements
- **Sample Size**: Minimum 100,000 records (as shown in image.png)
- **Data Format**: CSV or Excel (.xlsx, .xls)
- **Required Columns**:
  1. **Date**: YYYY-MM-DD or DD/MM/YYYY format\n  2. **Market**: City/market name (e.g., Bengaluru, Hubli, Mysore)
  3. **Variety**: Crop variety (e.g., Guntur, Byadgi, Teja)
  4. **Modal Price**: ₹ per quintal (target variable)
  5. **Arrivals**: Quintals (market supply)
  6. **Rainfall**: Millimeters (weather impact)
  7. **Temperature Max**: °C (maximum temperature)
  8. **Temperature Min**: °C (minimum temperature)\n  9. **Humidity**: Percentage (0-100%)
  10. **Area**: Hectares (cultivation area)
  11. **Production**: Tonnes (yield data)
\n### 3.2 Data Quality Standards
- **Missing Values**:<5% per column\n- **Date Consistency**: Chronological ordering, no duplicates for same date-market-variety
- **Valid Ranges**:
  - Price: Positive values\n  - Arrivals: Non-negative integers
  - Rainfall: Non-negative values
  - Temperature: 0-50°C
  - Humidity: 0-100%
  - Area: Positive values\n  - Production: Non-negative values
- **Temporal Coverage**: Minimum 5+ years of historical data recommended

### 3.3 Model Training Process
- Load 100,000+ samples from dataset (image.png format)
- Preprocess and clean data
- Split into training (80%), validation (10%), testing (10%)
- Train ensemble models (RandomForest, XGBoost, LSTM)
- Evaluate on test set and calculate metrics (MAE, RMSE, R²)
- Save trained models with metadata (training size, accuracy, feature importance)
- Enable incremental learning when new data is added

---

## 4. Database Schema

### 4.1 Datasets Table
- `id` (primary key): Unique dataset identifier
- `filename` (string): Original uploaded filename
- `upload_date` (datetime): Upload timestamp
- `sample_count` (integer): Number of records
- `date_range_start` (date): Earliest date in dataset
- `date_range_end` (date): Latest date in dataset
- `markets` (array): List of markets
- `varieties` (array): List of varieties
- `status` (string): 'active', 'archived', 'processing'
\n### 4.2 Predictions Table
- `id` (primary key)\n- `dataset_id` (foreign key): Reference to dataset used\n- `year` (integer)\n- `month` (integer)\n- `market` (string)\n- `variety` (string)\n- `model_type` (string)\n- `predicted_price` (float)
- `confidence_lower` (float)
- `confidence_upper` (float)
- `timestamp` (datetime)
\n### 4.3 Models Table
- `id` (primary key)
- `model_name` (string): 'RandomForest', 'XGBoost', 'LSTM'
- `training_date` (datetime)\n- `training_samples` (integer)
- `mae` (float)
- `rmse` (float)
- `r2_score` (float)
- `model_file_path` (string): Path to saved model file

---
\n## 5. Deployment & Scalability

### 5.1 Deployment Steps
1. Set up Python environment with required libraries (FastAPI, Scikit-learn, Pandas, etc.)
2. Configure database (PostgreSQL or MongoDB)
3. Load pre-trained models or train new models on100,000+ sample dataset
4. Start FastAPI server (e.g., `uvicorn main:app --host 0.0.0.0 --port 8000`)\n5. Connect frontend to backend API endpoints
6. Set up file storage for uploaded datasets (local or cloud storage)
7. Configure LLM API keys for AI assistant

### 5.2 Scalability Considerations
- Use asynchronous processing for model training and large file uploads
- Implement caching for frequently requested predictions
- Use load balancers for handling multiple concurrent requests
- Optimize database queries with indexing on frequently queried columns
- Consider distributed training for very large datasets (>1million samples)

---\n
## 6. Error Handling & Logging
\n### 6.1 Error Responses
- Return clear, actionable error messages to frontend
- Use HTTP status codes appropriately (400 for bad requests, 500 for server errors)
- Log all errors with timestamps and stack traces for debugging
\n### 6.2 Logging\n- Log all API requests with parameters and response times
- Log dataset uploads with validation results
- Log model training progress and performance metrics
- Use structured logging (JSON format) for easy parsing\n
---

## 7. Security & Best Practices

- Validate all user inputs to prevent injection attacks
- Limit file upload sizes to prevent abuse (e.g., max 100MB)
- Use authentication tokens for API access (optional for MVP)
- Sanitize file uploads to prevent malicious code execution
- Implement rate limiting to prevent API abuse
- Use HTTPS for secure data transmission

---\n
## 8. Backend Deliverables

- Fully functional FastAPI backend with all endpoints implemented
- ML pipeline for training and inference on100,000+ sample datasets
- Dataset upload and validation system
- AI assistant integration\n- Database schema and migrations
- Comprehensive error handling and logging
- API documentation (auto-generated by FastAPI)
- Deployment guide and configuration files
- Unit tests for critical functions
- Performance optimization for large-scale data processing

---

This backend document is designed to be easy to understand and implement separately from the frontend. Each component is clearly explained with examples and step-by-step instructions.