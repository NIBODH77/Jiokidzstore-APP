
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useTheme() {
  const colorScheme = useColorScheme();
  // Always use light mode by default
  const isDark = false;
  const theme = Colors.light;

  return {
    theme,
    isDark,
  };
}
