# ✅ Pre-Upload Checklist

## Before Uploading Files to Admin Dashboard

### 1. Backend Server Status

**Check if backend is running:**

Open terminal and run:
```bash
curl http://localhost:8000/api/admin/model-info
```

**Expected Result:**
- ✅ **GOOD**: You get JSON response with model info
- ❌ **BAD**: "Connection refused" or "Failed to connect"

**If BAD, start the backend:**
```bash
cd backend
./start.sh  # Linux/Mac
# OR
start.bat   # Windows
```

### 2. Backend Terminal Check

**Look at your backend terminal:**

✅ **GOOD - Backend is running:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [12345] with StatReload
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

❌ **BAD - Backend is NOT running:**
```
(Empty terminal or no backend terminal open)
```

### 3. Browser Check

**Open browser and visit:**
- http://localhost:8000/docs

✅ **GOOD**: FastAPI documentation page loads  
❌ **BAD**: "This site can't be reached" or connection error

### 4. Admin Dashboard Check

**Visit:**
- http://localhost:5173/admin

✅ **GOOD**: No red warning banner at top  
❌ **BAD**: Red banner saying "Cannot connect to backend server"

### 5. File Check

**Verify your file:**

- [ ] File has `.csv` extension
- [ ] File size is under 100 MB
- [ ] File contains valid CSV data
- [ ] File has headers (first row with column names)

### 6. No Operations in Progress

**Check Admin Dashboard:**

- [ ] No "Generating dataset" progress bar
- [ ] No "Training models" progress bar
- [ ] All previous operations completed

## Quick Visual Check

### ✅ Everything is Ready

```
Terminal 1 (Backend):
INFO:     Uvicorn running on http://0.0.0.0:8000 ✅

Terminal 2 (Frontend):
VITE v5.x.x  ready in xxx ms ✅

Browser (http://localhost:8000/docs):
FastAPI Documentation Page ✅

Browser (http://localhost:5173/admin):
Admin Dashboard - No red warning banner ✅

File:
my_dataset.csv (45 MB) ✅
```

**Result:** Upload will work! 🎉

### ❌ Something is Wrong

```
Terminal 1 (Backend):
(Empty or closed) ❌

Browser (http://localhost:8000/docs):
This site can't be reached ❌

Browser (http://localhost:5173/admin):
🔴 Cannot connect to backend server ❌
```

**Result:** Upload will fail! ⚠️

**Fix:** Start the backend!
```bash
cd backend && ./start.sh
```

## Common Mistakes

### Mistake 1: Backend Not Started
**Symptom:** Red warning banner on Admin Dashboard  
**Fix:** `cd backend && ./start.sh`

### Mistake 2: Backend Terminal Closed
**Symptom:** Upload was working, now it's not  
**Fix:** Restart backend: `cd backend && ./start.sh`

### Mistake 3: Wrong File Type
**Symptom:** "Please upload a CSV file" error  
**Fix:** Convert file to CSV format

### Mistake 4: Operation in Progress
**Symptom:** "Dataset generation in progress" error  
**Fix:** Wait for current operation to complete

### Mistake 5: Wrong Directory
**Symptom:** Backend won't start  
**Fix:** Make sure you're in the `backend` directory

## Step-by-Step Upload Process

### Step 1: Verify Backend
```bash
# Check if running
curl http://localhost:8000/api/admin/model-info

# If not running, start it
cd backend
./start.sh
```

### Step 2: Open Admin Dashboard
```
http://localhost:5173/admin
```

### Step 3: Check for Red Banner
- ✅ No banner → Proceed to upload
- ❌ Red banner → Backend not running, go back to Step 1

### Step 4: Prepare File
- Ensure file is `.csv` format
- Check file size (< 100 MB)
- Verify file has valid CSV data

### Step 5: Upload
1. Click "Upload Custom Dataset (.csv)"
2. Select your file
3. Wait for upload to complete
4. See success message: "Dataset Uploaded: filename.csv (XX MB) uploaded successfully"

### Step 6: Verify Upload
- Dataset status card shows "Available"
- File size matches your file
- Last Modified shows current date/time

## Troubleshooting

### Upload Still Fails After Starting Backend

**1. Check backend URL:**
```bash
# In browser console (F12)
# Look for API_BASE_URL
# Should be: http://localhost:8000
```

**2. Check CORS:**
```bash
# Backend should allow localhost:5173
# Check backend/app/config.py
```

**3. Check firewall:**
```bash
# Make sure localhost connections are allowed
```

**4. Restart everything:**
```bash
# Close all terminals
# Start backend: cd backend && ./start.sh
# Start frontend: npm run dev
# Try again
```

### Backend Won't Start

**1. Check Python version:**
```bash
python --version
# Should be 3.8 or higher
```

**2. Check dependencies:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**3. Check port 8000:**
```bash
# Make sure nothing else is using port 8000
lsof -ti:8000  # Linux/Mac
netstat -ano | findstr :8000  # Windows
```

**4. Check for errors:**
```bash
# Look at backend terminal for error messages
# Common: ModuleNotFoundError, Port in use, Permission denied
```

## Final Checklist

Before clicking upload, verify:

- [ ] Backend terminal shows "Uvicorn running on..."
- [ ] http://localhost:8000/docs loads successfully
- [ ] Admin Dashboard has NO red warning banner
- [ ] File is in CSV format
- [ ] File size is reasonable (< 100 MB)
- [ ] No operations currently in progress
- [ ] You're on the correct page (http://localhost:5173/admin)

**If all checked:** Upload will work! ✅

**If any unchecked:** Fix the issue first, then try upload.

## Quick Commands Reference

### Start Backend
```bash
cd backend && ./start.sh
```

### Check Backend Status
```bash
curl http://localhost:8000/api/admin/model-info
```

### Start Frontend
```bash
npm run dev
```

### Open Admin Dashboard
```
http://localhost:5173/admin
```

### Check Backend Logs
```bash
# Look at the terminal where you ran ./start.sh
# Check for errors or "Uvicorn running on..."
```

## Summary

**The #1 reason uploads fail:** Backend is not running!

**The #1 solution:** Start the backend!

```bash
cd backend && ./start.sh
```

**How to know backend is running:**
- Terminal shows "Uvicorn running on..."
- http://localhost:8000/docs loads
- No red banner on Admin Dashboard

**Then upload will work!** 🚀

---

**Remember:** Keep the backend terminal open while using the application!
