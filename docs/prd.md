# AI-Driven Agricultural Intelligence Platform Requirements Document

## 1. Project Overview

### 1.1 Project Name
AI-Driven Agricultural Intelligence Platform – Chilli Price Forecasting

### 1.2 Project Description
A high-end professional AI product platform for agricultural price intelligence, specifically focused on chilli price forecasting. The platform provides data-driven insights, predictive analytics, and AI-powered assistance for agricultural market decision-making. Designed as an enterprise-ready solution with modern AI platform aesthetics similar to OpenAI, Anthropic, and NVIDIA dashboards.

### 1.3 Core Objectives
- Deliver accurate AI-powered price predictions for agricultural commodities
- Provide intelligent insights and risk alerts for market trends
- Enable interactive data exploration through advanced visualizations
- Offer conversational AI assistance for market analysis
- Present a professional, futuristic interface suitable for enterprise use
- Support custom dataset uploads for flexible prediction scenarios

## 2. Technical Architecture
\n### 2.1 Frontend Stack
- **Framework**: React.js\n- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts & Visualization**: Recharts / Chart.js / D3.js
- **Typography**: Inter / Poppins fonts
- **File Upload**: React Dropzone or native file input with drag-and-drop support

### 2.2 Backend Stack
- **API Framework**: Python FastAPI
- **ML Models**: Scikit-learn, XGBoost, RandomForest, LSTM (optional)
- **AI Features**: LLM-based AI Assistant (API ready)
- **Database**: PostgreSQL / MongoDB
- **File Processing**: Pandas for CSV/Excel parsing, validation, and preprocessing

### 2.3 Deployment Architecture
- Modular, scalable architecture\n- API-first design
- Ready for production deployment
\n## 3. Core Features & Pages

### 3.1 Landing Page
\n**Hero Section**:\n- Animated headline:'AI-Powered Agricultural Price Intelligence'
- Live moving AI charts preview with smooth transitions
- Dynamic background with subtle particle effects
\n**Key Metrics Display**:
- Prediction Accuracy card with glow effect
- MAE (Mean Absolute Error) indicator
- R² Score visualization
- Real-time data pulse animations

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
\n- **Time Selection**:
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
- Large animated ₹ value display
- Confidence interval range
- Trend indicator (↑ ↓) with color coding
- Prediction timestamp
- Display selected year and month context

*Interactive Charts*:
- Price trend over time (line chart) - filtered by selected year/month
- Forecast vs Actual comparison (dual-axis chart)
- Seasonal demand heatmap
- Rainfall vs Price correlation scatter plot

**KPI AI Widgets**:
- Accuracy percentage with circular progress\n- MAE value card
- RMSE indicator
- AI Confidence Score meter
\n### 3.3 AI Insights Engine

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

### 3.4 AI Chat Assistant

**Capabilities**:
- Trained on dataset metadata, market history, and model outputs
- Answers questions like:\n  - 'Why is price high next month?'
  - 'Compare2024 vs 2027 prices'
  - 'Which market is better to sell?'
  - 'Show predictions for January 2025'

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

### 3.7 Backend AI System

**API Endpoints**:
- `/predict` - Price prediction inference (accepts year, month, and dataset parameters)
- `/upload-dataset` - Handle custom dataset uploads, validation, and storage
- `/ai-insights` - Generate AI explanations\n- `/chat` - Conversational AI assistant\n- `/charts-data` - Visualization data retrieval (filtered by year/month)

**ML Pipeline**:
- Data cleaning and preprocessing
- Feature engineering\n- Model training and validation
- Real-time inference based on selected year/month
- Integration with Agmarknet and NICRA datasets
- Custom dataset processing and integration

**Dataset Upload Processing**:
- File validation (format, size, required columns)
- Data quality checks (missing values, outliers, data types)
- Automatic feature extraction and alignment with model requirements
- Temporary or persistent storage based on user preference
- Error handling with detailed feedback messages

### 3.8 Professional Enhancements

**UI/UX Polish**:
- Loading animations with AI pulse effect
- Skeleton loaders for content\n- Comprehensive error-handling UI
- Fully responsive design for all screen sizes
- Admin-ready architecture for future expansion
- Smooth transitions when switching between years/months
- Visual feedback for dataset upload progress
- Header bar upload field with quick access and visual status indicators

## 4. Design System

### 4.1 Color Palette
- **Primary Background**: Charcoal black (#1a1a1a) to navy (#0a0e27) gradient
- **Accent Colors**: \n  - Cyan (#00d9ff) for primary actions and highlights
  - Purple (#a855f7) for secondary elements
  - Green (#10b981) for positive indicators
- **Text**: White (#ffffff) primary, gray (#9ca3af) secondary
\n### 4.2 Visual Style\n- **Card Design**: Glassmorphism effect with subtle backdrop blur and border glow
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
\nThese screenshots show the current interface, which will be redesigned and enhanced according to the specifications above to achieve a professional AI platform aesthetic with added year/month selection, dataset upload capabilities in both header bar and sidebar.\n
## 6. Project Deliverables

- Fully implemented frontend with React.js + Tailwind CSS
- Complete backend API with FastAPI\n- Integrated ML models with prediction pipeline
- AI chat assistant functionality
- Dataset upload and processing system (header bar + sidebar)
- Year/month-based prediction filtering
- Clean, modular, production-ready code
- Responsive design for all devices
- Documentation for deployment and maintenance

## 7. Use Cases

- Professional portfolio/resume project
- Hackathon submission
- Final year academic project
- Startup MVP foundation
- Enterprise agricultural intelligence solution
- Custom market analysis with user-provided datasets
- Historical trend analysis by specific time periods
- Quick dataset switching via header bar for rapid prediction comparisons