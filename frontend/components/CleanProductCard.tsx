import React, { memo } from "react";
import { StyleSheet, Pressable, View, Dimensions, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";

interface CleanProductCardProps {
  product: {
    id: string;
    name: string;
    brand?: string;
    price: number;
    mrp?: number;
    originalPrice?: number;
    discount?: number;
    rating?: number;
    reviewCount?: number;
    reviews?: number;
    images?: any[];
    inStock?: boolean;
  };
  onPress: () => void;
  onWishlistPress?: () => void;
  isWishlisted?: boolean;
  width?: number;
  showRating?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 1;
const DEFAULT_CARD_WIDTH = (SCREEN_WIDTH - CARD_GAP) / 2;

function CleanProductCardComponent({
  product,
  onPress,
  onWishlistPress,
  isWishlisted = false,
  width = DEFAULT_CARD_WIDTH,
  showRating = true,
}: CleanProductCardProps) {
  const scale = useSharedValue(1);
  const imageOpacity = useSharedValue(0);
  const heartScale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handleImageLoad = () => {
    imageOpacity.value = withTiming(1, { duration: 250 });
  };

  const handleWishlistPress = () => {
    heartScale.value = withSpring(1.3, { damping: 10 }, () => {
      heartScale.value = withSpring(1, { damping: 10 });
    });
    onWishlistPress?.();
  };

  const originalPrice = product.mrp || product.originalPrice;
  const discount = product.discount || 
    (originalPrice && product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0);
  const reviewCount = product.reviewCount || product.reviews || 0;

  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;
  const imageSource = typeof firstImage === "string" ? { uri: firstImage } : firstImage;

  const imageHeight = width * 1.25;

  return (
    <Animated.View style={[styles.cardWrapper, animatedCardStyle, { width }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          {imageSource ? (
            <Animated.Image
              source={imageSource}
              style={[styles.image, animatedImageStyle]}
              onLoad={handleImageLoad}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Feather name="image" size={32} color="#E0E0E0" />
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          {product.brand && (
            <ThemedText style={styles.brandText} numberOfLines={1}>
              {product.brand}
            </ThemedText>
          )}
          
          <View style={styles.nameRow}>
            <ThemedText style={styles.nameText} numberOfLines={2}>
              {product.name}
            </ThemedText>
          </View>

          <View style={styles.priceRow}>
            <ThemedText style={styles.priceText}>₹{product.price.toLocaleString()}</ThemedText>
            {originalPrice && originalPrice > product.price && (
              <ThemedText style={styles.originalPrice}>₹{originalPrice.toLocaleString()}</ThemedText>
            )}
          </View>

          {discount > 0 && (
            <ThemedText style={styles.discountText}>{discount}% OFF</ThemedText>
          )}

          <View style={styles.bottomRow}>
            {showRating && product.rating && (
              <View style={styles.ratingContainer}>
                <View style={styles.ratingBadge}>
                  <ThemedText style={styles.ratingValue}>{product.rating}</ThemedText>
                  <Feather name="star" size={10} color="#FFFFFF" />
                </View>
                {reviewCount > 0 && (
                  <ThemedText style={styles.reviewCount}>
                    ({reviewCount.toLocaleString()})
                  </ThemedText>
                )}
              </View>
            )}
            
            {onWishlistPress && (
              <Pressable
                onPress={handleWishlistPress}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.wishlistButton}
              >
                <Animated.View style={animatedHeartStyle}>
                  <Feather
                    name="heart"
                    size={18}
                    color={isWishlisted ? "#E53935" : "#BDBDBD"}
                  />
                </Animated.View>
              </Pressable>
            )}
          </View>

          {!product.inStock && product.inStock !== undefined && (
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
  cardWrapper: {
    backgroundColor: "#FFFFFF",
  },
  pressable: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: "#FFFFFF",
  },
  brandText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9E9E9E",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  nameRow: {
    marginBottom: 4,
  },
  nameText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#212121",
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  priceText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#212121",
  },
  originalPrice: {
    fontSize: 12,
    fontWeight: "400",
    color: "#9E9E9E",
    textDecorationLine: "line-through",
  },
  discountText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#E53935",
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  reviewCount: {
    fontSize: 11,
    color: "#9E9E9E",
  },
  wishlistButton: {
    padding: 4,
  },
  outOfStockBadge: {
    backgroundColor: "#FFEBEE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: Spacing.xs,
    alignSelf: "flex-start",
  },
  outOfStockText: {
    color: "#E53935",
    fontSize: 11,
    fontWeight: "600",
  },
});

export const CleanProductCard = memo(CleanProductCardComponent);
export default CleanProductCard;
