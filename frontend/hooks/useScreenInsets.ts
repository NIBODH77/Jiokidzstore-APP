import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Platform } from 'react-native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Spacing } from "@/constants/theme";

const FIXED_HEADER_HEIGHT = 70; // Approximate TopHeader height

export function useScreenInsets() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch {
    // Not in a bottom tab navigator
    tabBarHeight = 0;
  }

  return {
    paddingTop: Platform.OS === 'web' ? FIXED_HEADER_HEIGHT : insets.top + FIXED_HEADER_HEIGHT,
    paddingBottom: tabBarHeight > 0 ? tabBarHeight : insets.bottom,
    scrollInsetBottom: insets.bottom + Spacing.sm,
  };
}