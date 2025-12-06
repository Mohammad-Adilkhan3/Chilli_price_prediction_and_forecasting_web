# Dataset Upload Guide

## Overview

The AgriAI platform now supports custom dataset uploads, allowing you to use your own agricultural price data for predictions. This guide explains how to prepare and upload your dataset.

## Supported Format

**File Type**: CSV (Comma-Separated Values)

## Required Columns

Your CSV file must include the following columns (column names are case-insensitive):

### 1. **date** (Required)
- Format: YYYY-MM-DD (e.g., 2025-01-15)
- Description: The date of the price record
- Example: `2025-01-15`, `2024-12-20`

### 2. **price** (Required)
- Format: Numeric (integer or decimal)
- Description: Chilli price in ₹ per quintal
- Example: `28500`, `29350.50`

### 3. **rainfall** (Optional but Recommended)
- Format: Numeric (decimal)
- Description: Rainfall in millimeters
- Example: `65.5`, `120.3`
- Alternative column names: `rain`

### 4. **arrivals** (Optional but Recommended)
- Format: Numeric (integer)
- Description: Market arrivals in quintals
- Example: `2150`, `1980`
- Alternative column names: `supply`

### 5. **temperature** (Optional)
- Format: Numeric (decimal)
- Description: Temperature in Celsius
- Example: `26.3`, `30.5`
- Alternative column names: `temp`

## Sample CSV Format

```csv
date,price,rainfall,arrivals,temperature
2025-01-01,28500,65.5,2150,26.3
2025-01-02,28450,68.2,2180,26.8
2025-01-03,28600,62.1,2100,27.1
2025-01-04,28700,59.8,2050,27.5
2025-01-05,28550,71.3,2200,26.2
```

## Download Sample Dataset

A sample dataset is available at: `/public/sample_dataset.csv`

You can use this as a template for your own data.

## How to Upload

### Step 1: Prepare Your CSV File
1. Ensure your data is in CSV format
2. Include required columns: `date` and `price`
3. Add optional columns for better predictions: `rainfall`, `arrivals`, `temperature`
4. Save the file with a `.csv` extension

### Step 2: Upload in Dashboard
1. Navigate to the **AI Dashboard** page
2. Look for the **Upload Dataset** section in the left sidebar
3. Click **"Choose CSV File"** button
4. Select your prepared CSV file
5. Wait for the upload confirmation

### Step 3: Verify Upload
- You'll see a success message with the number of records loaded
- The uploaded filename will be displayed in a green box
- The prediction card will show "Using uploaded dataset: [filename]"

### Step 4: Run Predictions
1. Select your desired year and month
2. Choose model, city, and variety
3. Click **"Run Prediction"** to generate forecasts based on your data

### Step 5: Clear Dataset (Optional)
- Click **"Clear Dataset"** button to remove uploaded data
- The system will revert to using default prediction data

## Data Validation

The system automatically validates your uploaded data:

### ✅ Valid Data
- CSV file with proper format
- At least `date` and `price` columns present
- Valid date formats (YYYY-MM-DD)
- Numeric values for price and other metrics

### ❌ Invalid Data
- Non-CSV files (will be rejected)
- Missing required columns
- Empty or corrupted files
- Invalid date formats

## Error Messages

### "Invalid File Format"
- **Cause**: File is not a CSV
- **Solution**: Convert your file to CSV format

### "No Data Found"
- **Cause**: CSV file is empty or doesn't contain valid data
- **Solution**: Check that your CSV has data rows and proper column headers

### "Upload Failed"
- **Cause**: Error parsing the CSV file
- **Solution**: Verify CSV format, check for special characters or encoding issues

## Best Practices

### 1. Data Quality
- Ensure dates are in chronological order
- Remove duplicate date entries
- Fill missing values or mark them appropriately
- Use consistent units (₹ per quintal for price)

### 2. Data Quantity
- **Minimum**: 7 days of data for meaningful predictions
- **Recommended**: 30+ days for better accuracy
- **Optimal**: 90+ days for seasonal pattern analysis

### 3. Data Completeness
- Include all optional columns when available
- More features = better predictions
- Rainfall and arrivals are particularly important

### 4. Data Accuracy
- Verify price values are realistic
- Check rainfall values are in mm
- Ensure arrivals are in quintals
- Temperature should be in Celsius

## Example Use Cases

### Use Case 1: Historical Analysis
Upload 1-2 years of historical data to:
- Analyze long-term price trends
- Identify seasonal patterns
- Compare year-over-year changes

### Use Case 2: Recent Market Data
Upload last 30-60 days of data to:
- Get current market predictions
- Analyze recent price movements
- Make short-term trading decisions

### Use Case 3: Regional Comparison
Upload data from different markets to:
- Compare price variations across cities
- Identify best markets for selling
- Analyze regional supply-demand dynamics

## Tips for Better Predictions

1. **Include Weather Data**: Rainfall significantly impacts predictions
2. **Add Supply Information**: Market arrivals help forecast price changes
3. **Use Recent Data**: More recent data provides better short-term forecasts
4. **Consistent Updates**: Regularly update your dataset for accurate predictions
5. **Clean Data**: Remove outliers and verify data accuracy

## Data Sources

You can collect data from:
- **Agmarknet**: Government agricultural market data portal
- **NICRA**: National Innovations in Climate Resilient Agriculture
- **Local Market Records**: Your own market transaction records
- **Weather Stations**: Local meteorological department data
- **Agricultural Departments**: State/district agricultural offices

## Privacy & Security

- **Local Processing**: All data is processed in your browser
- **No Server Storage**: Uploaded files are not stored on servers
- **Session Only**: Data persists only during your current session
- **Clear Anytime**: You can clear uploaded data at any time

## Troubleshooting

### Problem: Charts not updating after upload
**Solution**: Click "Run Prediction" button to refresh visualizations

### Problem: Predictions seem incorrect
**Solution**: 
- Verify your data quality and format
- Check if date ranges match selected year/month
- Ensure price values are in correct units

### Problem: Upload button not responding
**Solution**: 
- Refresh the page
- Check file size (should be under 5MB)
- Try a different browser

## Advanced Features

### Combining with Year/Month Selection
- Upload comprehensive dataset covering multiple months
- Use year/month selectors to filter specific time periods
- Compare predictions across different time ranges

### Model Comparison
- Upload same dataset
- Try different ML models (Random Forest, XGBoost, LSTM)
- Compare prediction accuracy across models

### Scenario Analysis
- Upload baseline data
- Navigate to Advanced Charts
- Run what-if scenarios with your actual data

## Support

For issues or questions about dataset uploads:
1. Check this guide for common solutions
2. Verify your CSV format matches the sample
3. Use the AI Assistant to ask specific questions
4. Review error messages for specific guidance

---

**Ready to upload your data? Head to the AI Dashboard and start making predictions with your own agricultural data! 📊🌾**
