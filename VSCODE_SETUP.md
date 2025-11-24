# VS Code Setup Guide for JioKidz Development

## 🚀 Quick Setup (2 minutes)

### 1. Install Recommended Extensions
Open VS Code and press `Ctrl+Shift+X` (or Cmd+Shift+X on Mac), then search for:

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Prettier - Code formatter** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint
- **Path Intellisense** - formulahendry.path-intellisense
- **Thunder Client** - rangav.vscode-thunder-client (for API testing)
- **Expo Tools** - expo.vscode-expo
- **React Native Tools** - msjsdiag.debugger-for-react-native

Or VS Code will automatically suggest them when you open the project!

### 2. Settings Applied
The `.vscode/settings.json` file automatically applies:
- ✅ Auto-format on save with Prettier
- ✅ ESLint auto-fix on save
- ✅ Proper indentation (2 spaces)
- ✅ TypeScript support configured
- ✅ File exclude rules (faster search)

### 3. Debugging
Open Debug tab (Ctrl+Shift+D) and select:
- **Expo (Web)** - Debug on web
- **Expo (Android)** - Debug on Android
- **Expo (iOS)** - Debug on iOS

---

## 📁 Project Structure in VS Code

When you open the project, you'll see:

```
JioKidz/
├── .vscode/               ← VS Code configs (auto-loaded)
├── src/                   ← Your main code here
│   ├── screens/          ← Screen components
│   ├── components/       ← Reusable components
│   ├── navigation/       ← Navigation setup
│   ├── hooks/            ← Custom hooks
│   ├── constants/        ← Theme & constants
│   ├── utils/            ← Helper functions
│   └── App.tsx           ← Root component
├── assets/               ← App icons & splash
├── app.json             ← Expo config
└── package.json         ← Dependencies
```

---

## ⌨️ VS Code Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick file open |
| `Ctrl+/` | Toggle comment |
| `Ctrl+D` | Select word occurrence |
| `Ctrl+Shift+L` | Select all occurrences |
| `Alt+Up/Down` | Move line up/down |
| `Ctrl+H` | Find & replace |
| `F2` | Rename symbol |
| `Ctrl+Shift+F` | Find in all files |
| `Ctrl+J` | Toggle terminal |
| `Ctrl+Shift+D` | Debug panel |

---

## 🎨 Recommended VS Code Theme

Install a theme for better readability:

1. Open Extensions (`Ctrl+Shift+X`)
2. Search "Material Theme" or "Dracula"
3. Install and enable

Recommended: **Material Theme** for modern look

---

## 💡 Smart IntelliSense Tips

### Auto-import components
```typescript
// Start typing a component name
ProductCard

// Press Ctrl+Space for suggestions
// Select component and it auto-imports!
```

### Path aliases work perfectly
```typescript
// Type @ and autocomplete shows all options
import { ProductCard } from '@/components/ProductCard'
//                           ↑ autocomplete works!
```

### React snippets
```typescript
// Type 'rfc' and press Tab
// Auto-generates full functional component!

rfc → (expands to React Functional Component)
```

---

## 🔍 Finding Files Fast

### Method 1: Quick Open
```
Ctrl+P → type filename
```

### Method 2: Go to Definition
```
Right-click component → "Go to Definition"
Or press Ctrl+Click on import
```

### Method 3: Find All References
```
Right-click function name → "Find All References"
```

---

## 🐛 Debugging in VS Code

### 1. Set Breakpoints
Click on line number to add red dot (breakpoint)

### 2. Start Debugger
Press `F5` or click Debug icon in sidebar

### 3. Debug Console
Use `Debug Console` tab to type JavaScript

### 4. Watch Variables
Add variables to "Watch" panel to see values

### 5. Step Through Code
- Step Over (F10) - execute next line
- Step Into (F11) - enter function
- Step Out (Shift+F11) - exit function

---

## 🚀 Running from VS Code

### Terminal Method
```bash
# Open terminal: Ctrl+J
npm start        # Start Expo
npm run web      # Web version
npm run android  # Android (if configured)
npm run lint     # Check code quality
```

### Debug Config Method
1. Open Debug panel (`Ctrl+Shift+D`)
2. Select "Expo (Web)" or "Expo (Android)"
3. Press Play button (F5)

---

## ⚙️ Configure ESLint

Files are already configured:
- `.eslintrc.js` - ESLint rules
- `eslint.config.js` - Config file

Auto-fixes on save! Errors show as red squiggles.

---

## 📝 File Templates

Create common file types quickly:

1. Right-click folder
2. Select "New File"
3. Name with proper extension:
   - `ComponentName.tsx` → React component
   - `useCustomHook.ts` → Custom hook
   - `type.ts` → TypeScript types

---

## 🔗 Useful Extensions Explained

| Extension | What it does |
|-----------|-------------|
| React Snippets | Autocomplete for React code |
| Prettier | Auto-format code beautifully |
| ESLint | Find code issues |
| Path Intellisense | Autocomplete file paths |
| Thunder Client | Test APIs without Postman |
| Expo Tools | Expo-specific helpers |

---

## 🎯 Pro Tips

### 1. Format on Save
Already enabled! Your code auto-formats when you save.

### 2. See Errors Before Running
Red squiggles show TypeScript errors immediately.

### 3. Use Command Palette
Press `Ctrl+Shift+P` to search VS Code commands:
- Format Document
- Rename Symbol
- Sort Imports
- etc.

### 4. Organize Imports
Press `Ctrl+Shift+P` → type "Organize Imports"

### 5. Delete Unused Code
Hover over gray code → click 💡 → "Remove unused"

---

## ❌ Common Issues & Fixes

### Issue: Prettier not formatting
**Solution:**
1. Install Prettier extension
2. Restart VS Code
3. Check `.vscode/settings.json` exists

### Issue: ESLint showing old errors
**Solution:**
1. Reload window (`Ctrl+Shift+P` → "Reload Window")
2. Or restart VS Code

### Issue: Path autocomplete not working
**Solution:**
1. Check `tsconfig.json` has proper paths
2. Restart VS Code
3. Check `@` alias is set

### Issue: Can't find component
**Solution:**
1. Use `Ctrl+P` to search filename
2. Check spelling (PascalCase)
3. Check file is in correct folder

---

## 📱 Testing on Phone

### Android Phone via USB
1. Enable Developer Mode (tap Build Number 7 times)
2. Enable USB Debugging
3. Connect to computer
4. Run: `npm start` then press `a`

### iOS Phone (Mac only)
1. Run: `npm start` then press `i`
2. Opens Xcode simulator

### Expo Go App
1. Download Expo Go from Play Store/App Store
2. Scan QR code from `npm start`
3. App opens on your phone!

---

## 🏗️ Build Process from VS Code

### Android APK
```bash
# Terminal (Ctrl+J)
eas build --platform android --profile preview
```

### Check Build Status
```bash
eas build --status
```

---

## 📚 Quick Reference

**Terminal Commands from VS Code:**
```bash
npm start           # Start Expo
npm run web         # Run on web
npm run lint        # Check code quality
npm run android     # Run on Android
npm run ios         # Run on iOS
npm install         # Install dependencies
npm update          # Update packages
```

**File Organization:**
- Components → `src/components/`
- Screens → `src/screens/`
- Hooks → `src/hooks/`
- Constants → `src/constants/`

**Import Pattern:**
```typescript
import { Component } from '@/components/ComponentName'
import { useHook } from '@/hooks/useHook'
import { Colors } from '@/constants/theme'
```

---

## 🎓 Next Steps

1. ✅ Install extensions from `.vscode/extensions.json`
2. ✅ Restart VS Code
3. ✅ Open folder: `File → Open Folder → select jiokidz-app`
4. ✅ Open terminal: `Ctrl+J`
5. ✅ Run: `npm install` (if first time)
6. ✅ Start: `npm start`
7. ✅ Start coding!

---

**Ready to develop!** 🚀
