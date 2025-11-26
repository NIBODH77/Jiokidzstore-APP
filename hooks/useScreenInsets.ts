import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Spacing } from "@/constants/theme";

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
    paddingTop: insets.top + headerHeight,
    paddingBottom: tabBarHeight > 0 ? tabBarHeight : insets.bottom,
    scrollInsetBottom: insets.bottom + Spacing.sm,
  };
}
