# 🚀 How to Start the Backend Server

## Why You're Seeing the Error

The error message:
```
Upload failed: Cannot connect to backend server. 
Please ensure the backend is running at http://localhost:8000
```

This means **the backend server is NOT running**. This is the correct error message - it's telling you what to do!

## Solution: Start the Backend

### Quick Start (Easiest Way)

Open a terminal and run:

```bash
cd backend
chmod +x start.sh
./start.sh
```

**On Windows:**
```bash
cd backend
start.bat
```

Wait for this message:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

✅ **Backend is now running!**

### Manual Start (Step by Step)

**1. Open Terminal**

**2. Go to backend directory:**
```bash
cd backend
```

**3. Create virtual environment (first time only):**
```bash
python -m venv venv
```

**4. Activate virtual environment:**

Linux/Mac:
```bash
source venv/bin/activate
```

Windows:
```bash
venv\Scripts\activate
```

**5. Install dependencies (first time only):**
```bash
pip install -r requirements.txt
```

**6. Start the server:**
```bash
python -m app.main
```

## Verify It's Working

### Check 1: Terminal Output
You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Check 2: Open Browser
Visit: http://localhost:8000/docs

You should see the FastAPI documentation page.

### Check 3: Admin Dashboard
1. Go to: http://localhost:5173/admin
2. The red warning banner should be GONE
3. Upload should work now!

## Now Upload Your File

1. **Keep the backend terminal open** (don't close it!)
2. Go to Admin Dashboard: http://localhost:5173/admin
3. Click "Upload Custom Dataset (.csv)"
4. Select your CSV file
5. ✅ **Upload will work!**

## Common Problems

### "python: command not found"
Install Python 3.8+: https://www.python.org/downloads/

### "Port 8000 already in use"
Kill the process using port 8000:
```bash
# Linux/Mac
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
# Then: taskkill /PID <PID> /F
```

### "ModuleNotFoundError"
Install dependencies:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Backend starts but upload still fails
Check the URL in browser console:
- Should be: `http://localhost:8000`
- If different, update `.env` file

## Full Workflow

### Terminal 1 - Backend
```bash
cd backend
./start.sh
# Leave this running!
```

### Terminal 2 - Frontend
```bash
npm run dev
# Leave this running!
```

### Browser
```
http://localhost:5173/admin
```

## Quick Test

Run this command to test if backend is running:

```bash
curl http://localhost:8000/api/admin/model-info
```

**If you get JSON response** → Backend is running ✅  
**If you get "Connection refused"** → Backend is NOT running ❌

## Summary

1. **Open terminal**
2. **Run:** `cd backend && ./start.sh`
3. **Wait for:** "Uvicorn running on..."
4. **Try upload again** → It will work! ✅

---

**The error message is correct - it's telling you the backend needs to be started!**

Just run: `cd backend && ./start.sh`
