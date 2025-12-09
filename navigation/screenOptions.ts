
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

interface ScreenOptionsParams {
  theme: any;
  isDark: boolean;
}

export function getCommonScreenOptions({
  theme,
  isDark,
}: ScreenOptionsParams): NativeStackNavigationOptions {
  return {
    headerShown: false,
    gestureEnabled: true,
    animation: 'slide_from_right',
    contentStyle: {
      backgroundColor: theme.backgroundRoot,
    },
  };
}
