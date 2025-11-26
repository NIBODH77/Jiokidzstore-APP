import React from "react";
import { StyleSheet, Image, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, Colors } from "@/constants/theme";
import { Product } from "@/data/types"; // Assuming Product interface is defined here

interface ProductCardDetailsProps {
  product: Product;
  onPress?: (product: Product) => void;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
  energyThreshold: 0.001,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ProductCardDetails({ product, onPress }: ProductCardDetailsProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  return (
    <AnimatedPressable
      onPress={() => onPress && onPress(product)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        Shadows.medium, // Using medium shadow for premium feel
        {
          backgroundColor: theme.backgroundDefault,
          borderRadius: BorderRadius.lg, // Rounded corners
        },
        useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        })),
      ]}
    >
      <Image
        source={product.images && product.images.length > 0 ? product.images[0] : require('../assets/images/icon.png')} // Fallback image
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <ThemedText type="h4" numberOfLines={1} ellipsizeMode="tail" style={styles.productTitle}>
          {product.name}
        </ThemedText>
        <ThemedText type="small" numberOfLines={2} ellipsizeMode="tail" style={styles.productDescription}>
          {product.description}
        </ThemedText>
        <View style={styles.priceContainer}>
          <ThemedText type="h3" style={styles.productPrice}>
            ₹{product.price}
          </ThemedText>
          {product.mrp && product.mrp > product.price && (
            <ThemedText type="caption" style={styles.productMRP}>
              M.R.P: <ThemedText style={styles.strikethrough}>₹{product.mrp}</ThemedText>
            </ThemedText>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // Allows cards to share space in a grid
    margin: Spacing.sm, // Smooth spacing between cards
    overflow: 'hidden', // Ensures rounded corners clip content
  },
  productImage: {
    width: "100%",
    height: 120, // Fixed height for consistency
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    backgroundColor: Colors.light.backgroundDefault, // A neutral background for image area
  },
  detailsContainer: {
    padding: Spacing.sm,
  },
  productTitle: {
    marginBottom: Spacing.xs,
    fontSize: Typography.h4.fontSize,
    fontWeight: Typography.h4.fontWeight,
    color: Colors.light.text,
  },
  productDescription: {
    marginBottom: Spacing.sm,
    color: Colors.light.textGray,
    fontSize: Typography.small.fontSize,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: Spacing.xs,
  },
  productPrice: {
    fontSize: Typography.h3.fontSize,
    fontWeight: Typography.h3.fontWeight,
    color: Colors.light.primary,
    marginRight: Spacing.sm,
  },
  productMRP: {
    color: Colors.light.textGray,
    fontSize: Typography.caption.fontSize,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
});