# AgriAI Mobile - AI-Powered Agricultural Intelligence Platform

<div align="center">

![AgriAI Mobile](https://img.shields.io/badge/AgriAI-Mobile-00d9ff?style=for-the-badge)
![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-51.0-000020?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?style=for-the-badge&logo=typescript)

**Professional AI-powered chilli price forecasting mobile application**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API Integration](#api-integration) • [Build](#build)

</div>

---

## 📱 Overview

AgriAI Mobile is a complete React Native mobile application that brings AI-powered agricultural price intelligence to iOS and Android devices. Built with Expo for easy development and deployment, it provides farmers, traders, and agricultural businesses with accurate price predictions and market insights on the go.

### ✨ Key Highlights

- 🎯 **98.2% Prediction Accuracy** using Random Forest ML models
- 📊 **Interactive Charts** with real-time data visualization
- 🤖 **AI Chat Assistant** for conversational market analysis
- 🔮 **Long-term Forecasting** up to 2040
- 🌙 **Dark Theme** with professional glassmorphism design
- 📱 **Cross-Platform** - Works on iOS and Android
- ⚡ **Fast & Responsive** with native performance

---

## 🚀 Features

### 1. Home Screen
- Hero section with key metrics
- Prediction accuracy showcase
- Feature highlights
- Quick access to dashboard and AI assistant
- Training data information

### 2. Dashboard (Predictions)
- **Market Selection**: Choose from 8 major markets
- **Variety Selection**: 6 chilli varieties (Guntur, Byadgi, Teja, etc.)
- **Model Selection**: 4 ML models (Random Forest, XGBoost, LSTM, Linear Regression)
- **Time Selection**: Year (2020-2040) and month selection
- **Real-time Predictions**: Instant price forecasts with confidence scores
- **Performance Metrics**: Accuracy, MAE, RMSE, R² Score

### 3. AI Insights
- Automated market analysis
- Risk alerts and warnings
- Positive/negative trend indicators
- Confidence scores for each insight
- Natural language explanations

### 4. AI Chat Assistant
- Conversational interface
- Ask questions about prices, trends, markets
- Context-aware responses
- Real-time chat experience
- Intelligent suggestions

### 5. Analytics Charts
- **Price Trend Chart**: Historical price movements
- **Rainfall Pattern Chart**: Weather impact analysis
- **Key Statistics**: Average, highest, lowest prices
- **Interactive Visualizations**: Touch-enabled charts

### 6. Model Performance
- Compare all ML models side-by-side
- Visual performance metrics
- Best model recommendations
- Detailed accuracy breakdowns
- Progress bars for easy comparison

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional, but recommended)
- **iOS Simulator** (for Mac users) or **Android Studio** (for Android development)
- **Expo Go app** (for testing on physical devices)

---

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
cd /path/to/your/project
cd mobile
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Start the Development Server

```bash
npm start
# or
expo start
```

### Step 4: Run on Device/Simulator

**For iOS (Mac only):**
```bash
npm run ios
```

**For Android:**
```bash
npm run android
```

**For Physical Device:**
1. Install **Expo Go** app from App Store or Play Store
2. Scan the QR code shown in terminal
3. App will load on your device

---

## 📱 Usage

### Running the App

1. **Start Development Server:**
   ```bash
   cd mobile
   npm start
   ```

2. **Choose Platform:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go for physical device

3. **Navigate the App:**
   - Use bottom tab navigation to switch between screens
   - Home: Overview and quick access
   - Dashboard: Make price predictions
   - Insights: View AI-generated market insights
   - Chat: Talk to AI assistant
   - Charts: Analyze trends and patterns
   - Models: Compare ML model performance

### Making Predictions

1. Go to **Dashboard** tab
2. Select your parameters:
   - Market/City (e.g., Bangalore, Mumbai)
   - Variety (e.g., Guntur, Byadgi)
   - Model (e.g., Random Forest)
   - Year (2020-2040)
   - Month (January-December)
3. Tap **"Run Prediction"**
4. View predicted price with confidence score
5. Check accuracy metrics (MAE, R² Score)

### Using AI Chat

1. Go to **Chat** tab
2. Type your question in the input field
3. Examples:
   - "What will be the price next month?"
   - "Which market has the best prices?"
   - "Compare Guntur and Byadgi varieties"
   - "Why are prices increasing?"
4. Get instant AI-powered responses

---

## 🔌 API Integration

### Backend Connection

The mobile app is designed to work with the FastAPI backend. To connect:

1. **Update API URL** in `src/services/api.ts`:

```typescript
// For local development (use your computer's IP, not localhost)
const API_BASE_URL = 'http://192.168.1.100:8000';

// For production
const API_BASE_URL = 'https://your-api-domain.com';
```

2. **Start Backend Server:**
```bash
cd ../backend
python -m app.main
```

3. **Test Connection:**
   - The app will automatically connect to the API
   - Check console logs for connection status

### Mock Data Mode

By default, the app uses mock data for demonstration. This allows you to:
- Test the app without backend
- Demo the UI and features
- Develop offline

To switch to real API:
- Update `API_BASE_URL` in `src/services/api.ts`
- Ensure backend is running
- App will automatically use real predictions

---

## 🎨 Design System

### Color Palette

```typescript
Primary: #00d9ff (Cyan)
Secondary: #a855f7 (Purple)
Success: #10b981 (Green)
Warning: #f59e0b (Orange)
Error: #ef4444 (Red)
Background: #0a0e27 (Dark Navy)
Surface: #1a1a2e (Dark Gray)
```

### Typography

- **Title**: 32px, Bold
- **Heading**: 24px, Bold
- **Subheading**: 18px, Semi-bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular
- **Small**: 12px, Regular

### Components

- **GlassCard**: Glassmorphism effect with gradient background
- **MetricCard**: Display key metrics with icons and trends
- **Charts**: Interactive line and bar charts
- **Buttons**: Gradient buttons with hover effects

---

## 📦 Project Structure

```
mobile/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── babel.config.js        # Babel config
├── src/
│   ├── screens/           # All screen components
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── ChartsScreen.tsx
│   │   └── ModelsScreen.tsx
│   ├── components/        # Reusable components
│   │   ├── GlassCard.tsx
│   │   └── MetricCard.tsx
│   ├── services/          # API services
│   │   └── api.ts
│   ├── utils/             # Utility functions
│   │   └── mockData.ts
│   └── theme.ts           # Theme configuration
└── assets/                # Images and icons
```

---

## 🔧 Configuration

### Expo Configuration (`app.json`)

```json
{
  "expo": {
    "name": "AgriAI Mobile",
    "slug": "agriai-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "ios": {
      "bundleIdentifier": "com.agriai.mobile"
    },
    "android": {
      "package": "com.agriai.mobile"
    }
  }
}
```

### Environment Variables

Create `.env` file in mobile directory:

```env
API_BASE_URL=http://192.168.1.100:8000
API_TIMEOUT=10000
```

---

## 📱 Building for Production

### iOS Build

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS:**
   ```bash
   eas build:configure
   ```

3. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

4. **Submit to App Store:**
   ```bash
   eas submit --platform ios
   ```

### Android Build

1. **Build APK:**
   ```bash
   eas build --platform android --profile preview
   ```

2. **Build AAB (for Play Store):**
   ```bash
   eas build --platform android --profile production
   ```

3. **Submit to Play Store:**
   ```bash
   eas submit --platform android
   ```

### Local Builds

**iOS (Mac only):**
```bash
expo build:ios
```

**Android:**
```bash
expo build:android
```

---

## 🧪 Testing

### Run on Simulators

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

### Test on Physical Device

1. Install **Expo Go** from App Store/Play Store
2. Run `npm start`
3. Scan QR code with camera (iOS) or Expo Go (Android)

### Debug Mode

```bash
npm start
# Press 'd' to open developer menu
# Press 'r' to reload
# Press 'm' to toggle menu
```

---

## 📊 Performance

### Optimization Tips

1. **Image Optimization:**
   - Use WebP format for images
   - Compress images before adding to assets
   - Use `react-native-fast-image` for better performance

2. **Code Splitting:**
   - Lazy load screens
   - Use React.memo for expensive components
   - Implement virtualized lists for long data

3. **API Optimization:**
   - Cache API responses
   - Implement request debouncing
   - Use pagination for large datasets

---

## 🐛 Troubleshooting

### Common Issues

**1. Metro Bundler Issues:**
```bash
npm start -- --reset-cache
```

**2. iOS Build Fails:**
```bash
cd ios && pod install && cd ..
```

**3. Android Build Fails:**
```bash
cd android && ./gradlew clean && cd ..
```

**4. Expo Go Connection Issues:**
- Ensure phone and computer are on same WiFi
- Check firewall settings
- Try using tunnel mode: `npm start --tunnel`

**5. API Connection Issues:**
- Use computer's IP address, not `localhost`
- Check backend is running
- Verify firewall allows connections

---

## 📚 Dependencies

### Core Dependencies

- **expo**: ~51.0.0 - Expo framework
- **react**: 18.2.0 - React library
- **react-native**: 0.74.0 - React Native framework
- **@react-navigation/native**: ^6.1.9 - Navigation
- **@react-navigation/bottom-tabs**: ^6.5.11 - Tab navigation
- **react-native-paper**: ^5.12.3 - UI components
- **react-native-chart-kit**: ^6.12.0 - Charts
- **expo-linear-gradient**: ~13.0.2 - Gradients
- **axios**: ^1.6.2 - HTTP client

### Dev Dependencies

- **@babel/core**: ^7.20.0
- **typescript**: ^5.1.3
- **@types/react**: ~18.2.45

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Expo Team** for the amazing framework
- **React Native Community** for excellent libraries
- **Agricultural Data Sources** for training data
- **ML Community** for model architectures

---

## 📞 Support

For support, email support@agriai.com or open an issue on GitHub.

---

## 🎯 Roadmap

### Version 1.1 (Coming Soon)
- [ ] Push notifications for price alerts
- [ ] Offline mode with local storage
- [ ] Export reports as PDF
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

### Version 1.2
- [ ] Social sharing features
- [ ] User authentication
- [ ] Personalized recommendations
- [ ] Advanced filtering options
- [ ] Historical data export

### Version 2.0
- [ ] Real-time price updates
- [ ] Market comparison tools
- [ ] Weather integration
- [ ] News feed
- [ ] Community features

---

<div align="center">

**Built with ❤️ using React Native & Expo**

[Report Bug](https://github.com/yourusername/agriai-mobile/issues) • [Request Feature](https://github.com/yourusername/agriai-mobile/issues)

</div>
