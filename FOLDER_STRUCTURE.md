# JioKidz - Folder Structure Guide

Production-ready folder structure optimized for VS Code development and Android APK building.

## 📁 Complete Folder Structure

```
jiokidz-app/
├── 📂 src/                              # Source code root
│   ├── 📂 screens/                      # All screen components
│   │   ├── 📂 auth/                     # Authentication screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── OTPScreen.tsx
│   │   │   └── SplashScreen.tsx
│   │   │
│   │   ├── 📂 home/                     # Home tab screens
│   │   │   └── HomeScreen.tsx
│   │   │
│   │   ├── 📂 product/                  # Product-related screens
│   │   │   ├── ProductDetailScreen.tsx
│   │   │   ├── AllProductsScreen.tsx
│   │   │   ├── CategoryListingScreen.tsx
│   │   │   ├── FlashSaleScreen.tsx
│   │   │   ├── SearchScreen.tsx
│   │   │   ├── ReviewsScreen.tsx
│   │   │   └── ReviewsForm.tsx
│   │   │
│   │   ├── 📂 deals/                    # Deals tab screens
│   │   │   └── DealsScreen.tsx
│   │   │
│   │   ├── 📂 cart/                     # Shopping cart & checkout
│   │   │   ├── CartScreen.tsx
│   │   │   ├── CheckoutAddressScreen.tsx
│   │   │   ├── CheckoutPaymentScreen.tsx
│   │   │   ├── AddEditAddressScreen.tsx
│   │   │   ├── OrderSummaryScreen.tsx
│   │   │   └── OrderConfirmationScreen.tsx
│   │   │
│   │   ├── 📂 account/                  # Account & profile screens
│   │   │   ├── EditProfileScreen.tsx
│   │   │   ├── OrderHistoryScreen.tsx
│   │   │   ├── OrderTrackingScreen.tsx
│   │   │   ├── NotificationsScreen.tsx
│   │   │   ├── SavedAddressesScreen.tsx
│   │   │   ├── HelpSupportScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   │
│   │   ├── 📂 main/                     # Main navigation screens
│   │   │   ├── WishlistScreen.tsx
│   │   │   └── CategoriesScreen.tsx
│   │   │
│   │   └── ProfileScreen.tsx             # Main profile tab
│   │
│   ├── 📂 components/                    # Reusable UI components
│   │   ├── 📂 common/                    # Common shared components
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Spacer.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   │
│   │   ├── 📂 themed/                    # Theme-aware components
│   │   │   ├── ThemedText.tsx
│   │   │   ├── ThemedView.tsx
│   │   │   └── HeaderTitle.tsx
│   │   │
│   │   ├── 📂 screen-wrappers/          # Screen wrapper components
│   │   │   ├── ScreenScrollView.tsx
│   │   │   ├── ScreenFlatList.tsx
│   │   │   └── ScreenKeyboardAwareScrollView.tsx
│   │   │
│   │   ├── 📂 custom/                    # Custom feature components
│   │   │   ├── ModernSearchBar.tsx
│   │   │   ├── ModernCategory.tsx
│   │   │   ├── ModernHeroSection.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── BestSellersCarousel.tsx
│   │   │   ├── PersonalizedSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── TwoColumnPromo.tsx
│   │   │
│   │   └── 📂 inputs/                    # Input components
│   │       ├── ModernInput.tsx
│   │       └── SearchBar.tsx
│   │
│   ├── 📂 navigation/                    # React Navigation setup
│   │   ├── RootNavigator.tsx             # Main app navigator
│   │   ├── MainTabNavigator.tsx          # Bottom tab navigator
│   │   ├── HomeStackNavigator.tsx        # Home tab stack
│   │   ├── DealsStackNavigator.tsx       # Deals tab stack
│   │   ├── CategoriesStackNavigator.tsx  # Categories tab stack
│   │   ├── WishlistStackNavigator.tsx    # Wishlist tab stack
│   │   ├── ProfileStackNavigator.tsx     # Profile tab stack
│   │   └── screenOptions.ts              # Common screen options
│   │
│   ├── 📂 hooks/                         # Custom React hooks
│   │   ├── useAuth.tsx                   # Authentication context
│   │   ├── useTheme.ts                   # Theme context
│   │   ├── useColorScheme.ts             # Color scheme detection
│   │   ├── useColorScheme.web.ts         # Web-specific color scheme
│   │   ├── useScreenInsets.ts            # Safe area insets
│   │   └── useResponsive.ts              # Responsive design
│   │
│   ├── 📂 constants/                     # App constants & theme
│   │   └── theme.ts                      # Colors, spacing, typography
│   │
│   ├── 📂 data/                          # Mock data & types
│   │   ├── mockData.ts                   # Sample product/category data
│   │   └── types.ts                      # TypeScript interfaces
│   │
│   ├── 📂 utils/                         # Utility functions
│   │   └── storage.ts                    # AsyncStorage management
│   │
│   ├── App.tsx                           # Root app component
│   └── index.js                          # App entry point
│
├── 📂 assets/                             # Static assets
│   └── 📂 images/                        # App icons & splash
│       ├── icon.png                      # App icon
│       ├── splash-icon.png               # Splash screen icon
│       ├── favicon.png                   # Web favicon
│       ├── android-icon-foreground.png   # Android adaptive icon
│       ├── android-icon-background.png   # Android background
│       └── android-icon-monochrome.png   # Android monochrome
│
├── 📂 attached_assets/                    # Generated/stock assets
│   ├── 📂 generated_images/              # AI-generated images
│   └── 📂 stock_images/                  # Stock photos
│
├── 📂 public/                             # Web-specific assets
│   └── 📂 images/                        # Web images
│
├── 📂 scripts/                            # Build & utility scripts
│   ├── build.js                          # Custom build script
│   └── landing-page-template.html        # Web landing page
│
├── 📄 app.json                            # Expo config (iOS/Android/Web)
├── 📄 package.json                        # Dependencies
├── 📄 package-lock.json                   # Lock file
├── 📄 tsconfig.json                       # TypeScript config
├── 📄 babel.config.js                     # Babel config
├── 📄 eslint.config.js                    # ESLint config
├── 📄 eas.json                            # EAS Build config
├── 📄 .gitignore                          # Git ignore rules
├── 📄 design_guidelines.md                # UI/UX guidelines
├── 📄 replit.md                           # Project documentation
├── 📄 FOLDER_STRUCTURE.md                 # This file
├── 📄 SETUP_ANDROID.md                    # Android setup guide
└── 📄 BUILD_INSTRUCTIONS.md               # Build guide
```

## 📋 Key Points

### File Organization Rules

1. **One Component Per File**
   - Each component in its own file
   - File name matches component name (PascalCase)
   - Example: `ProductCard.tsx` exports `ProductCard` component

2. **Imports Should Be Organized**
   ```tsx
   // 1. React & React Native
   import React, { useState } from 'react';
   import { View, StyleSheet } from 'react-native';
   
   // 2. Third-party libraries
   import { LinearGradient } from 'expo-linear-gradient';
   import { Feather } from '@expo/vector-icons';
   
   // 3. Local imports (use @ alias)
   import { ThemedText } from '@/components/ThemedText';
   import { Colors } from '@/constants/theme';
   
   // 4. Relative imports (for same folder)
   import { helper } from './helper';
   ```

3. **Path Aliases (Use @)**
   - `@/components/ProductCard.tsx`
   - `@/screens/home/HomeScreen.tsx`
   - `@/hooks/useAuth.tsx`
   - Configured in `tsconfig.json` and `babel.config.js`

### Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `src/screens/*` | Full-screen components for navigation |
| `src/components/` | Reusable UI components |
| `src/navigation/` | React Navigation setup |
| `src/hooks/` | Custom React hooks & context |
| `src/constants/` | Static values, theme, colors |
| `src/data/` | Mock data & type definitions |
| `src/utils/` | Helper functions & utilities |
| `assets/` | App icons, splash screens |
| `public/` | Web-specific static assets |
| `scripts/` | Build & automation scripts |

## 🚀 VS Code Setup

### Recommended Extensions
```
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- TypeScript Vue Plugin
- Path Intellisense
- Thunder Client (API testing)
```

### VS Code Settings (`.vscode/settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "node_modules": true,
    ".expo": true,
    "dist": true,
    "build": true
  }
}
```

### VS Code Launch Config (`.vscode/launch.json`)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Expo",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/expo",
      "args": ["start"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 📱 Development Workflow

### 1. Setting Up Locally
```bash
# Clone repository
git clone <repo-url>
cd jiokidz-app

# Install dependencies
npm install

# Start Expo dev server
npm start

# Or specific platforms
npm run web      # Web version
npm run android  # Android
npm run ios      # iOS
```

### 2. Building APK
```bash
# Preview build (APK for testing)
eas build --platform android --profile preview

# Production build (for Play Store)
eas build --platform android --profile production
```

### 3. Development Tips
- Use `npm run lint` before commits
- Keep components small & reusable
- Use TypeScript for type safety
- Test on both web and mobile
- Follow the folder structure

## 📦 File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Screens | PascalCase + Screen | `ProductDetailScreen.tsx` |
| Hooks | camelCase + use | `useAuth.ts` |
| Utils | camelCase | `storage.ts` |
| Constants | camelCase | `theme.ts` |
| Types | PascalCase | `types.ts` |

## ✅ Pre-Build Checklist

Before building APK:
- [ ] All imports use correct paths
- [ ] No circular dependencies
- [ ] TypeScript has no errors (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] All screens tested on web & mobile
- [ ] Assets compressed & optimized
- [ ] No console errors/warnings
- [ ] Build version updated in `app.json`

## 🔧 Troubleshooting

### Import Errors
```
If you see: Cannot find module '@/...'
Solution: Check tsconfig.json has correct paths configured
```

### Build Failures
```
If Metro bundler fails:
1. Clear cache: rm -rf node_modules .expo
2. Reinstall: npm install
3. Start fresh: npm start --clear
```

### Large APK Size
```
Normal: 60-80 MB
If larger, check for:
- Duplicate dependencies
- Large static assets
- Unoptimized images
```

## 📚 Related Documentation
- `BUILD_INSTRUCTIONS.md` - Step-by-step APK build
- `SETUP_ANDROID.md` - Android environment setup
- `replit.md` - Project overview
- `design_guidelines.md` - UI/UX standards

---

**Version**: 1.0  
**Last Updated**: 2025-11-24  
**Status**: Production Ready ✅
