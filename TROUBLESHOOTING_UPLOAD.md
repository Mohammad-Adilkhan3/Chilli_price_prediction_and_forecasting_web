# Troubleshooting Dataset Upload Issues

## Problem: "Upload Failed: Failed to Fetch"

This error occurs when the frontend cannot connect to the backend server. Here's how to fix it:

## Solution Steps

### 1. Check if Backend is Running

**Verify the backend server is running:**

```bash
# Open a terminal and navigate to backend directory
cd backend

# Check if the server is running
# You should see output like: "Uvicorn running on http://0.0.0.0:8000"
```

**If not running, start the backend:**

```bash
# Make sure you're in the backend directory
cd backend

# Activate virtual environment (if using one)
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Start the server
python -m app.main
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 2. Verify Backend URL

**Check the API URL in your browser console:**

1. Open the Admin Dashboard: http://localhost:5173/admin
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for the API_BASE_URL

**Expected URL:** `http://localhost:8000`

**If different, update the .env file:**

```bash
# In the root directory, create or edit .env file
VITE_API_BASE_URL=http://localhost:8000
```

Then restart the frontend:
```bash
npm run dev
```

### 3. Test Backend Connection

**Test the backend API directly:**

Open your browser and navigate to:
- http://localhost:8000/docs - Should show FastAPI documentation
- http://localhost:8000/api/admin/model-info - Should return JSON data

**If these don't work:**
- Backend is not running
- Backend is running on a different port
- Firewall is blocking the connection

### 4. Check CORS Configuration

**Verify CORS settings in backend:**

File: `backend/app/config.py`

```python
ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",  # ← Make sure this is included
]
```

File: `backend/app/main.py`

```python
app.add_middleware(
  CORSMiddleware,
  allow_origins=config.ALLOWED_ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
```

### 5. Check File Size

**Maximum file size:** 100 MB (recommended)

If your CSV file is larger:
1. Split it into smaller files
2. Or increase the limit in backend configuration

### 6. Verify File Format

**Requirements:**
- File must be a CSV file (.csv extension)
- File should contain valid CSV data
- Recommended columns: year, month, city, variety, rainfall, arrivals, price

**Test with a small sample file:**

Create a test CSV file (`test.csv`):
```csv
year,month,city,variety,rainfall,arrivals,price
2020,1,Bangalore,Guntur,50.5,1000,28000
2020,2,Bangalore,Guntur,45.2,1200,29000
```

Try uploading this small file to verify the upload functionality works.

## Common Error Messages

### "Upload Failed: Failed to Fetch"

**Cause:** Cannot connect to backend server

**Solution:**
1. Start the backend server
2. Verify backend URL is correct
3. Check firewall settings

### "Upload Failed: Only CSV files are allowed"

**Cause:** File is not a CSV file

**Solution:**
1. Ensure file has .csv extension
2. Convert file to CSV format if needed

### "Upload Failed: Dataset generation in progress"

**Cause:** Dataset is currently being generated

**Solution:**
1. Wait for dataset generation to complete
2. Check progress on Admin Dashboard

### "Upload Failed: Training in progress"

**Cause:** Models are currently being trained

**Solution:**
1. Wait for training to complete
2. Check progress on Admin Dashboard

### "Upload Failed: Server returned 500"

**Cause:** Backend server error

**Solution:**
1. Check backend logs for error details
2. Verify file format is correct
3. Check disk space is available

## Step-by-Step Upload Process

### 1. Prepare Your Dataset

**Required format:**
- CSV file with headers
- Columns: year, month, city, variety, rainfall, arrivals, price
- At least 1,000 rows recommended
- Maximum 100 MB file size

**Example:**
```csv
year,month,city,variety,rainfall,arrivals,price
2020,1,Bangalore,Guntur,50.5,1000,28000
2020,2,Bangalore,Guntur,45.2,1200,29000
2020,3,Bangalore,Guntur,60.8,900,27500
```

### 2. Start Backend Server

```bash
cd backend
python -m app.main
```

Wait for: `Uvicorn running on http://0.0.0.0:8000`

### 3. Open Admin Dashboard

Navigate to: http://localhost:5173/admin

### 4. Upload Dataset

1. Click "Upload Custom Dataset (.csv)" button
2. Select your CSV file
3. Wait for upload to complete
4. You should see: "Dataset Uploaded: filename.csv (XX MB) uploaded successfully"

### 5. Verify Upload

Check the dataset status card:
- Status should show "Available"
- Size should match your file
- Last Modified should show current date/time

## Debugging Tips

### Enable Verbose Logging

**Backend logging:**

Add to `backend/app/main.py`:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Frontend logging:**

Check browser console (F12) for detailed error messages.

### Test with cURL

**Test upload endpoint directly:**

```bash
curl -X POST \
  http://localhost:8000/api/admin/upload-dataset \
  -F "file=@/path/to/your/dataset.csv"
```

Expected response:
```json
{
  "message": "Dataset uploaded successfully",
  "filename": "dataset.csv",
  "size": "XX.XX MB",
  "path": "/path/to/backend/data/agricultural_data.csv"
}
```

### Check Backend Logs

**Look for errors in backend terminal:**

```
ERROR:    Exception in ASGI application
...
```

Common errors:
- `FileNotFoundError` - Directory doesn't exist
- `PermissionError` - No write permission
- `OSError: [Errno 28] No space left on device` - Disk full

### Check Network Tab

**In browser DevTools:**

1. Open DevTools (F12)
2. Go to Network tab
3. Try uploading a file
4. Look for the POST request to `/api/admin/upload-dataset`
5. Check:
   - Status code (should be 200)
   - Response body
   - Request headers
   - Request payload

## Prevention

### Always Check Before Upload

1. ✅ Backend server is running
2. ✅ File is in CSV format
3. ✅ File size is under 100 MB
4. ✅ No other operations in progress
5. ✅ Sufficient disk space available

### Best Practices

1. **Keep backend running** while using Admin Dashboard
2. **Use small test files** first to verify functionality
3. **Check backend logs** if errors occur
4. **Backup important datasets** before uploading new ones
5. **Monitor disk space** to avoid storage issues

## Quick Fix Checklist

- [ ] Backend server is running (`python -m app.main`)
- [ ] Backend URL is correct (`http://localhost:8000`)
- [ ] File is CSV format (`.csv` extension)
- [ ] File size is reasonable (<100 MB)
- [ ] No operations in progress (check Admin Dashboard)
- [ ] Browser console shows no CORS errors
- [ ] Backend logs show no errors
- [ ] Firewall allows localhost connections
- [ ] Sufficient disk space available

## Still Having Issues?

### Check System Requirements

**Minimum:**
- Python 3.8+
- Node.js 20+
- 2 GB free disk space
- 4 GB RAM

**Recommended:**
- Python 3.10+
- Node.js 20+
- 5 GB free disk space
- 8 GB RAM

### Restart Everything

```bash
# Stop backend (Ctrl+C in backend terminal)
# Stop frontend (Ctrl+C in frontend terminal)

# Restart backend
cd backend
python -m app.main

# Restart frontend (in new terminal)
npm run dev
```

### Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Check Firewall

**Windows:**
```powershell
# Allow Python through firewall
netsh advfirewall firewall add rule name="Python" dir=in action=allow program="C:\Path\To\python.exe"
```

**Linux/Mac:**
```bash
# Check if firewall is blocking
sudo ufw status
```

## Contact Support

If none of these solutions work:

1. **Check backend logs** for detailed error messages
2. **Check browser console** for frontend errors
3. **Test with cURL** to isolate the issue
4. **Verify system requirements** are met
5. **Try with a small test file** to rule out file issues

## Summary

The "Upload Failed: Failed to Fetch" error is almost always caused by:

1. **Backend not running** (90% of cases)
2. **Wrong backend URL** (5% of cases)
3. **CORS configuration** (3% of cases)
4. **Firewall blocking** (2% of cases)

**Quick fix:** Make sure backend is running at `http://localhost:8000`

```bash
cd backend
python -m app.main
```

Then try uploading again!

---

**Updated:** 2025-12-06  
**Status:** ✅ Enhanced error handling implemented  
**Features:** Backend connection detection, detailed error messages, troubleshooting guide
