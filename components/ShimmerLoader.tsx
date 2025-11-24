import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { BorderRadius, Spacing, Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface ShimmerLoaderProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function ShimmerLoader({
  width: loaderWidth = '100%',
  height = 100,
  borderRadius = BorderRadius.md,
  style,
}: ShimmerLoaderProps) {
  const translateX = useSharedValue(-width);

  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          width: loaderWidth,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

export function ProductCardSkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <ShimmerLoader width="100%" height={150} borderRadius={BorderRadius.md} />
      <ShimmerLoader
        width="80%"
        height={12}
        borderRadius={4}
        style={{ marginTop: Spacing.md }}
      />
      <ShimmerLoader
        width="100%"
        height={12}
        borderRadius={4}
        style={{ marginTop: Spacing.sm }}
      />
      <ShimmerLoader
        width="60%"
        height={14}
        borderRadius={4}
        style={{ marginTop: Spacing.md }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.backgroundSecondary,
    overflow: 'hidden',
  },
  skeletonCard: {
    padding: Spacing.md,
  },
});
