# AgriAI Platform - Quick Start Guide

## 🚀 What's New

### Latest Features Added

#### 1. 🌓 Dark/Light Mode Toggle
**Location**: Header (top-right corner)
- Click sun/moon icon to switch themes
- Preference saved automatically
- Works across all pages

#### 2. 📤 Global Dataset Upload
**Location**: Header (next to theme toggle)
- Upload CSV from any page
- Data available everywhere
- See record count in header
- Click X to clear dataset

#### 3. 📅 Year & Month Selection
**Location**: Dashboard sidebar
- Select years 2020-2027
- Choose any month
- View historical/future data

#### 4. 📊 Local Dataset Upload
**Location**: Dashboard sidebar
- Alternative upload option
- Page-specific data
- Same CSV format support

---

## 🎯 Quick Actions

### Upload a Dataset (Global)
1. Click "Upload Dataset" in header
2. Select your CSV file
3. See green indicator with record count
4. Navigate to any page - data follows you!

### Change Theme
1. Click sun/moon icon in header
2. Theme switches instantly
3. Enjoy your preferred mode!

### View Predictions for Specific Period
1. Go to Dashboard
2. Select year (2020-2027)
3. Select month (Jan-Dec)
4. Click "Run Prediction"
5. View updated charts

### Upload Dataset Locally (Dashboard Only)
1. Go to Dashboard
2. Scroll to "Upload Dataset" section
3. Click "Choose CSV File"
4. Select your data
5. View predictions

---

## 📁 CSV Format

### Required Columns
```csv
date,price
2024-01-01,28500
2024-01-02,28750
```

### Full Format (Optional Columns)
```csv
date,price,rainfall,arrivals,temperature
2024-01-01,28500,45.2,2100,29.5
2024-01-02,28750,38.1,2250,30.1
```

### Sample File
Download: `public/sample_dataset.csv`

---

## 🎨 Header Features

```
Desktop View:
┌────────────────────────────────────────────────────────────┐
│ [AgriAI] [Dashboard] [AI Insights] [Chat] [Charts] [Models]│
│                                                              │
│                    | [📤 Upload Dataset] [🌓 Theme]         │
└────────────────────────────────────────────────────────────┘

With Dataset Uploaded:
┌────────────────────────────────────────────────────────────┐
│ [AgriAI] [Dashboard] [AI Insights] [Chat] [Charts] [Models]│
│                                                              │
│                    | [✓ 31 records] [X] [🌓 Theme]         │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Priority

When multiple data sources exist:

1. **Global Upload** (Header) - Highest priority
2. **Local Upload** (Dashboard) - Medium priority  
3. **Generated Data** (Default) - Fallback

**Tip**: Use global upload for data you want across all pages!

---

## 💡 Pro Tips

### Tip 1: Global vs Local Upload
- **Global** (Header): Use for main dataset, available everywhere
- **Local** (Dashboard): Use for quick tests, page-specific

### Tip 2: Theme Selection
- **Dark Mode**: Best for low-light environments
- **Light Mode**: Best for bright environments, presentations

### Tip 3: Year/Month Selection
- Select past years (2020-2023) for historical analysis
- Select future years (2025-2027) for forecasting
- Combine with uploaded data for custom periods

### Tip 4: CSV Preparation
- Keep files under 5MB
- Remove unnecessary columns
- Ensure date format consistency
- Test with sample data first

---

## 🎯 Common Workflows

### Workflow 1: Quick Analysis
```
1. Open Dashboard
2. Select year/month
3. Run prediction
4. View results
```

### Workflow 2: Custom Data Analysis
```
1. Click "Upload Dataset" in header
2. Select CSV file
3. Navigate to Dashboard
4. View predictions
5. Check AI Insights
6. Ask AI Assistant questions
```

### Workflow 3: Theme Customization
```
1. Click theme toggle in header
2. Choose preferred mode
3. Continue working
```

---

## 📊 Available Pages

1. **Landing Page** - Overview and features
2. **Dashboard** - Main prediction interface
3. **AI Insights** - Market analysis
4. **AI Chat** - Ask questions
5. **Advanced Charts** - Scenario simulation
6. **Model Intelligence** - ML comparison

---

## ✅ Feature Checklist

- ✅ 6 fully functional pages
- ✅ Dark/Light mode toggle
- ✅ Global dataset upload (header)
- ✅ Local dataset upload (dashboard)
- ✅ Year/month selection
- ✅ Interactive charts
- ✅ AI-powered insights
- ✅ Conversational AI assistant
- ✅ Model comparison
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Error handling

---

## 🆘 Troubleshooting

### Upload Not Working?
- Check file is .csv format
- Ensure file has date and price columns
- Verify file size is reasonable (<5MB)
- Try sample_dataset.csv first

### Theme Not Changing?
- Clear browser cache
- Check browser supports CSS variables
- Try hard refresh (Ctrl+F5)

### Data Not Showing?
- Verify upload was successful (green indicator)
- Check toast notifications for errors
- Try clearing and re-uploading
- Use sample data to test

---

## 📚 Full Documentation

For detailed information, see:
- `HEADER_DATASET_UPLOAD.md` - Global upload guide
- `THEME_TOGGLE_FEATURE.md` - Theme switching
- `DATASET_GUIDE.md` - CSV format details
- `COMPLETE_FEATURES_LIST.md` - All features

---

## 🎉 Ready to Go!

Your AgriAI platform is fully set up with:
- ✨ Beautiful dark/light themes
- ✨ Global dataset management
- ✨ Flexible data upload options
- ✨ Comprehensive predictions
- ✨ AI-powered insights

**Start exploring now! 🚀**
