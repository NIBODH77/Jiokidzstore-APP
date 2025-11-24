import { Platform } from "react-native";

const primaryPink = "#FF6B9D";
const secondaryPink = "#FFE5EE";
const accentPurple = "#9B59B6";

export const Colors = {
  light: {
    primary: primaryPink,
    secondary: secondaryPink,
    accent: accentPurple,
    text: "#2C3E50",
    textGray: "#7F8C8D",
    buttonText: "#FFFFFF",
    tabIconDefault: "#7F8C8D",
    tabIconSelected: primaryPink,
    link: primaryPink,
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F8F9FA",
    backgroundSecondary: secondaryPink,
    backgroundTertiary: "#E8E8E8",
    border: "#E8E8E8",
    success: "#27AE60",
    warning: "#F39C12",
    error: "#E74C3C",
    info: "#3498DB",
    boyFashion: "#3498DB",
    girlFashion: "#FF6B9D",
    footwear: "#F39C12",
    toys: "#9B59B6",
    diapers: "#27AE60",
  },
  dark: {
    primary: primaryPink,
    secondary: "#4A2A3E",
    accent: accentPurple,
    text: "#ECEDEE",
    textGray: "#9BA1A6",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryPink,
    link: primaryPink,
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
    border: "#404244",
    success: "#27AE60",
    warning: "#F39C12",
    error: "#E74C3C",
    info: "#3498DB",
    boyFashion: "#3498DB",
    girlFashion: "#FF6B9D",
    footwear: "#F39C12",
    toys: "#9B59B6",
    diapers: "#27AE60",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: "700" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  h2: {
    fontSize: 22,
    fontWeight: "600" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  h3: {
    fontSize: 18,
    fontWeight: "600" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  h4: {
    fontSize: 16,
    fontWeight: "600" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
  button: {
    fontSize: 16,
    fontWeight: "600" as const,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Poppins',
  },
};

export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: primaryPink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
