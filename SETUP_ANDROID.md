# Android Setup & Configuration Guide

Complete guide for setting up your Android development environment for building the JioKidz APK.

## Quick Start (5 Minutes)

### For macOS
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install required tools
brew install openjdk@11
brew install android-sdk

# Add to ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### For Windows
1. Download Java JDK 11: https://www.oracle.com/java/technologies/downloads/#java11
2. Download Android Studio: https://developer.android.com/studio
3. Run installers and follow setup wizard
4. Set ANDROID_HOME in Environment Variables

### For Linux (Ubuntu/Debian)
```bash
# Install Java
sudo apt-get update
sudo apt-get install openjdk-11-jdk

# Install Android SDK
sudo apt-get install android-sdk

# Add to ~/.bashrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Detailed Setup

### 1. Java Development Kit (JDK) Setup

**Check if already installed:**
```bash
java -version
javac -version
```

**Install Java 11:**
- Download: https://www.oracle.com/java/technologies/downloads/#java11
- Accept license and select your platform
- Follow installation instructions

**Verify Installation:**
```bash
java -version
# Output should show: openjdk version "11.0.x" or higher
```

### 2. Android Studio Installation

#### Download & Install
1. Visit: https://developer.android.com/studio
2. Download for your OS
3. Run installer
4. Choose "Standard Installation"
5. Accept licenses
6. Wait for SDK downloads (~10GB)

#### Configure Android SDK
1. Open Android Studio
2. Go to: Preferences (macOS) / Settings (Windows) → Appearance & Behavior → System Settings → Android SDK
3. Check installed components:
   - Android SDK Platform 34 (or latest)
   - Android SDK Build-Tools 34.0.0
   - Android Emulator
   - Android SDK Platform-Tools
4. Click "Apply" and wait for installation

### 3. Environment Variables Setup

**macOS/Linux:**
```bash
# Edit ~/.bashrc or ~/.zshrc
nano ~/.zshrc

# Add these lines at the end:
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Save (Ctrl+O, Enter, Ctrl+X)

# Apply changes
source ~/.zshrc
```

**Windows:**
1. Right-click "This PC" → Properties
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", click "New"
5. Add:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\YourUsername\AppData\Local\Android\sdk`
6. Select "Path" and click "Edit"
7. Add: `%ANDROID_HOME%\platform-tools`
8. Click OK and restart terminal

### 4. Verify Setup

```bash
# Check Java
java -version
# Should show: openjdk version "11.0.x"

# Check Android SDK
ls $ANDROID_HOME/platforms
# Should list Android SDK versions

# Check ADB
adb --version
# Should show: Android Debug Bridge version x.x.x
```

### 5. Create Android Emulator (Optional)

```bash
# List available images
emulator -list-avds

# Create new emulator
avdmanager create avd -n test-emulator -k "system-images;android-34;google_apis;arm64-v8a"

# Start emulator
emulator -avd test-emulator
```

## Troubleshooting Setup

### Java Not Found
```bash
# macOS
export JAVA_HOME=$(/usr/libexec/java_home -v 11)

# Linux
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Windows - Set in Environment Variables
JAVA_HOME = C:\Program Files\Java\jdk-11.0.x
```

### Android SDK Not Found
```bash
# Verify SDK path
ls $ANDROID_HOME

# If empty, reinstall Android Studio and SDK
```

### ADB Not Working
```bash
# Check USB debugging on device
# Enable: Settings → Developer Options → USB Debugging

# Restart ADB server
adb kill-server
adb start-server
adb devices
```

### Emulator Won't Start
```bash
# Try older API level
emulator -avd test-emulator -feature disable-snapshot-load

# Or use physical device instead
```

## Testing the Setup

```bash
# Connect Android device or start emulator
adb devices
# Should list your device

# Try installing a test APK
adb install test.apk

# If successful, setup is complete! ✅
```

## File Locations Reference

| Item | macOS | Windows | Linux |
|------|-------|---------|-------|
| ANDROID_HOME | ~/Library/Android/sdk | C:\Users\USERNAME\AppData\Local\Android\sdk | ~/Android/Sdk |
| Java | /usr/libexec/java_home | C:\Program Files\Java\ | /usr/lib/jvm/ |
| Android Studio | /Applications/Android Studio.app | C:\Program Files\Android\Android Studio | ~/android-studio |

## Performance Optimization

```bash
# Increase build memory (for faster builds)
export _JAVA_OPTIONS="-Xmx4096m"

# Use parallel build
export GRADLE_OPTS="-Dorg.gradle.parallel=true"
```

## Next Steps

After setup is complete:

1. ✅ Verify all tools are installed
2. ✅ Connect Android device (or start emulator)
3. ✅ Navigate to project directory
4. ✅ Run: `npm install`
5. ✅ Build APK: `eas build --platform android`

---

**Status**: Setup Guide for JioKidz Android Build  
**Last Updated**: 2025-11-23
