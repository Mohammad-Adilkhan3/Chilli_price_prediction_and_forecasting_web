# 🚀 AgriAI Mobile - Quick Start Guide

Get your AgriAI mobile app running in 5 minutes!

---

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Start Development Server

```bash
npm start
```

### 3. Run on Your Device

**Option A: Physical Device (Easiest)**
1. Install **Expo Go** app from App Store or Play Store
2. Scan the QR code shown in your terminal
3. App will load automatically!

**Option B: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

---

## 📱 First Time Setup

### For iOS (Mac Users)

1. **Install Xcode** from App Store
2. **Install Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```
3. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```
4. **Run the app:**
   ```bash
   npm run ios
   ```

### For Android

1. **Install Android Studio** from https://developer.android.com/studio
2. **Setup Android SDK:**
   - Open Android Studio
   - Go to Preferences → Appearance & Behavior → System Settings → Android SDK
   - Install Android 13 (API 33) or higher
3. **Create Virtual Device:**
   - Open AVD Manager in Android Studio
   - Create a new virtual device (Pixel 5 recommended)
4. **Run the app:**
   ```bash
   npm run android
   ```

---

## 🎯 Using the App

### Home Screen
- View key metrics and features
- Tap **"Launch Dashboard"** to make predictions
- Tap **"Talk to AI Assistant"** for chat

### Dashboard
1. Select **Market** (e.g., Bangalore)
2. Select **Variety** (e.g., Guntur)
3. Select **Model** (e.g., Random Forest)
4. Select **Year** and **Month**
5. Tap **"Run Prediction"**
6. View predicted price and metrics!

### AI Chat
- Ask questions like:
  - "What will be the price next month?"
  - "Which market has better prices?"
  - "Why are prices increasing?"
- Get instant AI-powered answers!

### Charts
- View price trends over time
- Analyze rainfall patterns
- Check key statistics

### Models
- Compare all ML models
- See accuracy metrics
- Choose the best model for your needs

---

## 🔌 Connect to Backend (Optional)

### Step 1: Start Backend Server

```bash
cd ../backend
python -m app.main
```

Backend will run on `http://localhost:8000`

### Step 2: Get Your Computer's IP Address

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```bash
ipconfig
```

Look for your local IP (e.g., `192.168.1.100`)

### Step 3: Update API URL

Edit `mobile/src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://192.168.1.100:8000'; // Use your IP
```

### Step 4: Restart App

```bash
npm start
```

Now the app will use real ML predictions from the backend!

---

## 🐛 Common Issues & Solutions

### Issue: "Unable to resolve module"
**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: "Expo Go can't connect"
**Solution:**
- Ensure phone and computer are on same WiFi
- Try tunnel mode: `npm start --tunnel`

### Issue: "Metro bundler error"
**Solution:**
```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Issue: "iOS build fails"
**Solution:**
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: "Android emulator not found"
**Solution:**
1. Open Android Studio
2. Start AVD Manager
3. Launch a virtual device
4. Run `npm run android` again

---

## 📊 App Features Overview

| Feature | Description | Screen |
|---------|-------------|--------|
| **Price Predictions** | AI-powered price forecasts | Dashboard |
| **Market Insights** | Automated analysis & alerts | Insights |
| **AI Chat** | Conversational assistant | Chat |
| **Analytics** | Interactive charts | Charts |
| **Model Comparison** | Compare ML models | Models |

---

## 🎨 Customization

### Change Theme Colors

Edit `mobile/src/theme.ts`:

```typescript
export const colors = {
  primary: '#00d9ff',    // Change to your brand color
  secondary: '#a855f7',  // Change to your accent color
  // ... other colors
};
```

### Change App Name

Edit `mobile/app.json`:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change App Icon

1. Replace `mobile/assets/icon.png` with your icon (1024x1024px)
2. Replace `mobile/assets/splash.png` with your splash screen
3. Run `npm start` to see changes

---

## 📱 Testing on Physical Device

### iOS (iPhone/iPad)

1. **Install Expo Go** from App Store
2. **Run development server:**
   ```bash
   npm start
   ```
3. **Scan QR code** with Camera app
4. App opens in Expo Go automatically!

### Android

1. **Install Expo Go** from Play Store
2. **Run development server:**
   ```bash
   npm start
   ```
3. **Open Expo Go** app
4. **Scan QR code** from the app
5. App loads automatically!

---

## 🚀 Building Production App

### Build APK (Android)

```bash
npm install -g eas-cli
eas build:configure
eas build --platform android --profile preview
```

Download APK and install on any Android device!

### Build for App Store (iOS)

```bash
eas build --platform ios
```

Follow prompts to submit to App Store.

---

## 📚 Next Steps

1. ✅ **Explore all screens** - Navigate through all tabs
2. ✅ **Make predictions** - Try different markets and varieties
3. ✅ **Chat with AI** - Ask questions about prices
4. ✅ **View charts** - Analyze trends and patterns
5. ✅ **Compare models** - See which model is most accurate
6. ✅ **Connect backend** - Use real ML predictions
7. ✅ **Customize theme** - Make it your own
8. ✅ **Build production app** - Deploy to App Store/Play Store

---

## 💡 Pro Tips

- **Use Random Forest model** for best accuracy (98.2%)
- **Check insights regularly** for market alerts
- **Ask AI specific questions** for better responses
- **Compare multiple markets** to find best prices
- **Use charts** to identify seasonal patterns
- **Test on real device** for best experience

---

## 🆘 Need Help?

- **Documentation:** See `README.md` for detailed docs
- **Backend Setup:** See `../backend/README.md`
- **Issues:** Check troubleshooting section above
- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev

---

## 🎉 You're All Set!

Your AgriAI mobile app is ready to use. Start making predictions and exploring AI-powered agricultural intelligence!

**Happy Farming! 🌾**
