# JioKidz - Android APK Build Guide

Complete step-by-step guide to build and deploy the Android APK locally using VS Code.

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js 18+ (`node -v`)
- [ ] npm 8+ (`npm -v`)
- [ ] Git installed
- [ ] VS Code installed
- [ ] Android Studio installed (or Android SDK)
- [ ] Java JDK 11+ (`java -version`)
- [ ] 10GB free disk space for Android build tools

## 📱 Step-by-Step Build Process

### 1. Setup Development Environment

#### Install Java JDK
```bash
# macOS (Homebrew)
brew install openjdk@11

# Windows - Download from: https://www.oracle.com/java/technologies/downloads/#java11
# Linux (Ubuntu/Debian)
sudo apt-get install openjdk-11-jdk
```

#### Verify Java Installation
```bash
java -version
# Should output: openjdk version "11.0.x" or higher
```

#### Install Android Studio
- Download: https://developer.android.com/studio
- Follow installation wizard
- Install SDK tools when prompted

#### Setup Android SDK Path

**macOS/Linux:**
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Windows:**
```
Set environment variables:
ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\sdk
Add to PATH: %ANDROID_HOME%\platform-tools
```

### 2. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/yourusername/jiokidz-app.git
cd jiokidz-app

# Install all dependencies
npm install

# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
```

### 3. Configure app.json (Already Done ✅)

Your `app.json` is already configured with:

```json
{
  "expo": {
    "name": "JioKidz",
    "slug": "jiokidz",
    "version": "1.0.0",
    "android": {
      "package": "com.jiokidz.app",
      "adaptiveIcon": {
        "backgroundColor": "#FF6B9D"
      },
      "edgeToEdgeEnabled": true
    }
  }
}
```

**No changes needed!** ✅

### 4. Build Android APK

#### Option A: Using Expo EAS Build (Recommended - Cloud)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build APK
eas build --platform android --profile preview

# Monitor build progress in terminal
# Download APK when ready (link provided)
```

**Advantages:**
- No local setup needed
- Automatic code signing
- Faster builds
- Ready for Play Store

#### Option B: Local Build (Requires Android Studio)

```bash
# Generate APK locally
npx expo build:android --type apk

# This will guide you through signing process
# APK will be saved to ./android/app/build/outputs/apk/
```

**Steps during local build:**
1. Choose keystore (new or existing)
2. Set password
3. Wait for build (~10-15 minutes)
4. Download APK from provided link

### 5. Install APK on Device/Emulator

#### On Physical Device (USB)

```bash
# Connect Android device via USB cable
# Enable USB Debugging on device

# Verify device is connected
adb devices

# Install APK
adb install app-release.apk

# Or drag-and-drop APK to device file manager
```

#### On Android Emulator

```bash
# Start emulator
emulator -avd YourEmulatorName

# Wait for emulator to fully load

# Install APK
adb install app-release.apk

# App will appear in your home screen
```

### 6. Build for Google Play Store

```bash
# Create signed production APK
eas build --platform android --profile production

# This generates a Play Store-ready build
# Can be uploaded directly to Google Play Console
```

### 7. Troubleshooting

#### Build Fails with "Java not found"
```bash
# Update JAVA_HOME variable
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
```

#### APK Too Large
- Normal size: 60-80 MB
- Use App Bundle for Play Store (produces smaller download)

#### Package Name Already Exists on Play Store
```bash
# Change package name in app.json
"android": {
  "package": "com.jiokidz.v2"
}
```

#### Build Stuck at "Waiting for Metro Bundler"
```bash
# Clear cache and rebuild
rm -rf node_modules .expo
npm install
npm start --clear
```

## 📊 Build Output Information

### APK File Details
- **Filename**: app-release.apk
- **Size**: 60-80 MB
- **Supports**: Android 5.0+ (API 21+)
- **Architectures**: ARM64, ARMv7 (universal build)

### Build Artifacts
```
jiokidz-app/
├── android/
│   └── app/build/outputs/apk/
│       ├── release/
│       │   └── app-release.apk       ← Your final APK
│       └── debug/
│           └── app-debug.apk
```

## 🚀 Distribution Options

### 1. Google Play Store
```
1. Create Google Play Developer account ($25 one-time)
2. Create new app in Play Console
3. Upload app-release.apk
4. Fill app details and screenshots
5. Submit for review (24-72 hours)
```

### 2. Direct Distribution
- Share APK file via email/cloud storage
- Users install with: `adb install app-release.apk`
- Or side-load via Android file manager

### 3. Firebase App Distribution
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Distribute APK
firebase appdistribution:distribute app-release.apk \
  --app 1:12345:android:abcdef

# Testers receive email with install link
```

## ✅ Final Checklist Before Release

- [ ] App tested on multiple Android devices/versions
- [ ] All screens working correctly
- [ ] No console errors or warnings
- [ ] App version updated in app.json
- [ ] Icons and splash screens look good
- [ ] APK file size acceptable
- [ ] Permissions configured correctly
- [ ] App runs offline (if applicable)
- [ ] Battery/storage usage optimized

## 📞 Need Help?

### Common Issues & Solutions

**Issue**: "Gradle build failed"
**Solution**: 
```bash
cd android
./gradlew clean
cd ..
npm install
```

**Issue**: "Module not found" error
**Solution**:
```bash
npm install --save-dev @babel/plugin-syntax-bigint
npm start --clear
```

**Issue**: "Out of Memory" during build
**Solution**:
```bash
export _JAVA_OPTIONS="-Xmx2048m"
eas build --platform android
```

## 🔗 Useful Resources

- Expo Documentation: https://docs.expo.dev/build/setup/
- Android Studio Setup: https://developer.android.com/studio/install
- React Native CLI: https://reactnative.dev/docs/environment-setup
- Google Play Console: https://play.google.com/console
- EAS Build Docs: https://docs.expo.dev/build/introduction/

---

**Version**: 1.0  
**Last Updated**: 2025-11-23  
**App**: JioKidz v1.0.0  
**Status**: Ready for Production Build ✅
