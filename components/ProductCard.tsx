import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useResponsive } from "@/hooks/useResponsive";
import { Product } from "@/data/types";
import { Colors, Spacing, Typography } from "@/constants/theme";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onWishlistPress?: () => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onPress,
  onWishlistPress,
  isWishlisted = false,
}: ProductCardProps) {
  const { theme } = useTheme();
  const { width } = useResponsive();
  const scale = useSharedValue(1);
  const imageOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  
  const handleImageLoad = () => {
    imageOpacity.value = withTiming(1, { duration: 250 });
  };

  const cardWidth = width / 2;
  const imageHeight = cardWidth * 1.15;

  const discount = (product?.originalPrice && product?.price) ? Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  ) : 0;
  
  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const imageSource = typeof firstImage === 'string' ? { uri: firstImage } : firstImage;

  return (
    <Animated.View style={[animatedStyle, { width: cardWidth }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}
      >
        {/* IMAGE ONLY - No badges, no icons inside */}
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          {imageSource ? (
            <Animated.Image 
              source={imageSource} 
              style={[styles.image, imageAnimatedStyle]}
              onLoad={handleImageLoad}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Feather name="image" size={32} color="#D1D5DB" />
            </View>
          )}
          
          {/* Out of stock overlay - keep this for UX */}
          {product.stock === 0 && (
            <View style={styles.stockOverlay}>
              <ThemedText style={styles.stockText}>Out of Stock</ThemedText>
            </View>
          )}
        </View>

        {/* PRODUCT INFO - All info appears BELOW the image */}
        <View style={styles.infoContainer}>
          {/* Brand */}
          <ThemedText style={styles.brandText} numberOfLines={1}>
            {product.brand}
          </ThemedText>
          
          {/* Product Name */}
          <ThemedText style={styles.nameText} numberOfLines={2}>
            {product.name}
          </ThemedText>

          {/* Price Row */}
          <View style={styles.priceRow}>
            <ThemedText style={styles.priceText}>₹{product.price}</ThemedText>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <ThemedText style={styles.originalPriceText}>
                  ₹{product.originalPrice}
                </ThemedText>
                <ThemedText style={styles.discountText}>
                  {discount}% OFF
                </ThemedText>
              </>
            )}
          </View>

          {/* Rating Row */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <ThemedText style={styles.ratingText}>{product.rating}</ThemedText>
              <Feather name="star" size={10} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.reviewsText}>
              ({product.reviews})
            </ThemedText>
            
            {/* Wishlist button moved outside image */}
            {onWishlistPress && (
              <Pressable 
                onPress={onWishlistPress} 
                style={styles.wishlistButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather
                  name="heart"
                  size={18}
                  color={isWishlisted ? "#EF4444" : "#9CA3AF"}
                />
              </Pressable>
            )}
          </View>

          {/* Savings Tag */}
          {product.originalPrice && product.originalPrice > product.price && (
            <View style={styles.savingsContainer}>
              <ThemedText style={styles.savingsText}>
                Save ₹{product.originalPrice - product.price}
              </ThemedText>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#F0F0F0',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  infoContainer: {
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    lineHeight: 18,
    marginBottom: Spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  originalPriceText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewsText: {
    fontSize: 11,
    color: '#6B7280',
    flex: 1,
  },
  wishlistButton: {
    padding: 4,
  },
  savingsContainer: {
    marginTop: Spacing.xs,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});
