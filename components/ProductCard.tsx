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
import { useResponsive } from "@/hooks/useResponsive";
import { Product } from "@/data/types";
import { Spacing } from "@/constants/theme";

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
  const imageHeight = cardWidth * 1.25;

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
        </View>

        <View style={styles.infoContainer}>
          <ThemedText style={styles.brandText} numberOfLines={1}>
            {product.brand}
          </ThemedText>
          
          <ThemedText style={styles.nameText} numberOfLines={2}>
            {product.name}
          </ThemedText>

          <View style={styles.priceRow}>
            <ThemedText style={styles.priceText}>₹{product.price}</ThemedText>
            {product.originalPrice && product.originalPrice > product.price && (
              <ThemedText style={styles.originalPriceText}>
                ₹{product.originalPrice}
              </ThemedText>
            )}
          </View>

          {discount > 0 && (
            <ThemedText style={styles.discountText}>
              {discount}% OFF
            </ThemedText>
          )}

          <View style={styles.bottomRow}>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBadge}>
                <ThemedText style={styles.ratingText}>{product.rating}</ThemedText>
                <Feather name="star" size={10} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.reviewsText}>
                ({product.reviews})
              </ThemedText>
            </View>
            
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

          {product.stock === 0 && (
            <View style={styles.outOfStockBadge}>
              <ThemedText style={styles.outOfStockText}>Out of Stock</ThemedText>
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
  infoContainer: {
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9E9E9E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  nameText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    lineHeight: 18,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    color: '#E53935',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  },
  wishlistButton: {
    padding: 4,
  },
  outOfStockBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  outOfStockText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E53935',
  },
});
