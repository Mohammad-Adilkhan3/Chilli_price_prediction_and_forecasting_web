#!/bin/bash

# AgriAI Mobile - Setup Verification Script
# This script checks if your environment is ready for mobile development

echo "🚀 AgriAI Mobile - Setup Verification"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found."
    exit 1
fi

# Check if in mobile directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗${NC} Not in mobile directory. Please run from mobile/ folder."
    exit 1
fi

# Check if dependencies are installed
echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Dependencies not installed. Run: npm install"
fi

# Check Expo CLI
echo ""
echo "📱 Checking Expo..."
if command -v expo &> /dev/null; then
    EXPO_VERSION=$(expo --version)
    echo -e "${GREEN}✓${NC} Expo CLI installed: $EXPO_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Expo CLI not installed globally (optional)"
    echo "   You can install it with: npm install -g expo-cli"
fi

# Check for iOS development (Mac only)
echo ""
echo "🍎 Checking iOS development tools..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v xcodebuild &> /dev/null; then
        XCODE_VERSION=$(xcodebuild -version | head -n 1)
        echo -e "${GREEN}✓${NC} Xcode installed: $XCODE_VERSION"
    else
        echo -e "${YELLOW}⚠${NC} Xcode not found (needed for iOS development)"
    fi
    
    if command -v pod &> /dev/null; then
        POD_VERSION=$(pod --version)
        echo -e "${GREEN}✓${NC} CocoaPods installed: $POD_VERSION"
    else
        echo -e "${YELLOW}⚠${NC} CocoaPods not found (needed for iOS development)"
        echo "   Install with: sudo gem install cocoapods"
    fi
else
    echo -e "${YELLOW}⚠${NC} Not on macOS - iOS development not available"
fi

# Check for Android development
echo ""
echo "🤖 Checking Android development tools..."
if [ -d "$HOME/Library/Android/sdk" ] || [ -d "$ANDROID_HOME" ]; then
    echo -e "${GREEN}✓${NC} Android SDK found"
else
    echo -e "${YELLOW}⚠${NC} Android SDK not found (needed for Android development)"
    echo "   Install Android Studio from: https://developer.android.com/studio"
fi

# Summary
echo ""
echo "======================================"
echo "📋 Summary"
echo "======================================"
echo ""

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Ready to start development!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm start"
    echo "  2. Scan QR code with Expo Go app"
    echo "  3. Or press 'i' for iOS, 'a' for Android"
else
    echo -e "${YELLOW}⚠${NC} Almost ready!"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm install"
    echo "  2. Run: npm start"
    echo "  3. Scan QR code with Expo Go app"
fi

echo ""
echo "📚 Documentation:"
echo "  - Quick Start: QUICKSTART.md"
echo "  - Full Guide: README.md"
echo "  - Comparison: WEB_VS_MOBILE_COMPARISON.md"
echo ""
echo "🎉 Happy mobile development!"
