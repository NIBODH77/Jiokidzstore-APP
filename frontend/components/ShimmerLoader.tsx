import React from 'react';
import { View, StyleSheet, Dimensions, ViewStyle, DimensionValue } from 'react-native';
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
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
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
      <ShimmerLoader width="100%" height={180} borderRadius={0} />
      <View style={styles.skeletonContent}>
        <ShimmerLoader
          width="50%"
          height={10}
          borderRadius={4}
          style={{ marginTop: Spacing.sm }}
        />
        <ShimmerLoader
          width="90%"
          height={14}
          borderRadius={4}
          style={{ marginTop: Spacing.xs }}
        />
        <ShimmerLoader
          width="60%"
          height={16}
          borderRadius={4}
          style={{ marginTop: Spacing.sm }}
        />
        <ShimmerLoader
          width="40%"
          height={12}
          borderRadius={4}
          style={{ marginTop: Spacing.xs }}
        />
      </View>
    </View>
  );
}

export function BannerSkeleton() {
  return (
    <View style={styles.bannerSkeleton}>
      <ShimmerLoader width="100%" height={180} borderRadius={12} />
    </View>
  );
}

export function CategorySkeleton() {
  return (
    <View style={styles.categorySkeleton}>
      <ShimmerLoader width={80} height={80} borderRadius={12} />
      <ShimmerLoader
        width={70}
        height={12}
        borderRadius={4}
        style={{ marginTop: Spacing.xs }}
      />
    </View>
  );
}

export function ProductGridSkeleton() {
  return (
    <View style={styles.gridContainer}>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.skeleton,
    overflow: 'hidden',
  },
  skeletonCard: {
    width: '48%',
    marginBottom: Spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  skeletonContent: {
    padding: Spacing.sm,
  },
  bannerSkeleton: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  categorySkeleton: {
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
});
