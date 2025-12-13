import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions, Platform, FlatList, TextInput, Image } from 'react-native';
import { useNavigation, useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRODUCTS } from '@/data/mockData';
import { KIDS_FASHION_PRODUCTS } from '@/data/kidsFashionData';
import { wishlistStorage, cartStorage } from '@/utils/storage';
import { addToCart } from '@/store/cartSlice';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import { Product } from '@/data/types';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import { ZoomableImage } from '@/components/ZoomableImage';

const { width } = Dimensions.get('window');

const convertKidsFashionToProduct = (kfp: any): Product => ({
  id: kfp.product_id,
  name: kfp.product_name,
  brand: kfp.brand,
  price: kfp.price,
  mrp: kfp.original_price,
  discount: kfp.discount,
  rating: kfp.rating,
  reviewCount: kfp.reviews_count,
  images: kfp.images?.length > 0 ? kfp.images : [require('../../attached_assets/generated_images/toddler_boy_navy_outfit.png')],
  description: kfp.description,
  category: kfp.category,
  sizes: kfp.sizes,
  colors: [kfp.color],
  ageGroup: kfp.age_group,
  inStock: kfp.in_stock,
});

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'ProductDetail'>>();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<{ available: boolean; days: number; message: string } | null>(null);
  const imageCarouselRef = useRef<FlatList>(null);

  const productId = route.params?.productId;
  let product = PRODUCTS.find(p => p.id === productId);
  
  if (!product) {
    const kidsProduct = KIDS_FASHION_PRODUCTS.find(p => p.product_id === productId);
    if (kidsProduct) {
      product = convertKidsFashionToProduct(kidsProduct);
    }
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Product not found</ThemedText>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
        </Pressable>
      </View>
    );
  }

  const handleAddToCart = async () => {
    try {
      if (!product?.id) {
        console.error('Add to cart failed: Product ID is undefined');
        return;
      }
      
      // Dispatch to Redux
      dispatch(addToCart(
        product,
        quantity,
        selectedSize || undefined,
        selectedColor || undefined
      ) as any);
      
      // Also save to local storage
      await cartStorage.addToCart({
        id: Date.now().toString(),
        product,
        quantity,
        selectedSize: selectedSize || undefined,
        selectedColor: selectedColor || undefined,
      });
      
      // Navigate directly to Cart screen (it's in the same stack)
      (navigation as any).navigate('Cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Hide tab bar by accessing parent navigator
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: { display: 'none' },
      });
    }
    
    return () => {
      // Show tab bar when leaving screen
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: "#FFFFFF",
          }),
          borderTopWidth: 0,
          elevation: 0,
        },
      });
    };
  }, [isFocused, navigation]);

  const handleWishlistToggle = async () => {
    if (isWishlisted) {
      await wishlistStorage.removeFromWishlist(product.id);
    } else {
      await wishlistStorage.addToWishlist(product);
    }
    setIsWishlisted(!isWishlisted);
  };

  const discountPercentage = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const handleCheckDelivery = () => {
    if (pincode.length !== 6) {
      setDeliveryInfo({ available: false, days: 0, message: 'Please enter a valid 6-digit pincode' });
      return;
    }
    const deliveryDays = Math.floor(Math.random() * 5) + 2;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateString = `${weekdays[deliveryDate.getDay()]}, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;
    setDeliveryInfo({
      available: true,
      days: deliveryDays,
      message: `Delivery by ${dateString}`,
    });
  };

  const similarProducts = useMemo(() => {
    const allProducts = [
      ...PRODUCTS,
      ...KIDS_FASHION_PRODUCTS.map(convertKidsFashionToProduct),
    ];
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 6);
  }, [product.id, product.category]);

  const handleSimilarProductPress = (productId: string) => {
    (navigation as any).push('ProductDetail', { productId });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: insets.top }]}
      >
        {/* Product Image Carousel */}
        <View style={styles.imageSection}>
          <FlatList
            ref={imageCarouselRef}
            data={product.images || []}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `image-${index}`}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
            renderItem={({ item }) => (
              <View style={styles.carouselImageContainer}>
                <ZoomableImage 
                  source={typeof item === 'string' ? { uri: item } : item} 
                  width={width}
                  height={width}
                />
              </View>
            )}
          />
          
          {/* Pagination Dots */}
          {product.images && product.images.length > 1 && (
            <View style={styles.paginationContainer}>
              {product.images.map((_, index) => (
                <View
                  key={`dot-${index}`}
                  style={[
                    styles.paginationDot,
                    activeImageIndex === index && styles.paginationDotActive
                  ]}
                />
              ))}
            </View>
          )}
          
          {/* Header Buttons Overlay */}
          <View style={[styles.headerOverlay, { top: insets.top + 8 }]}>
            <Pressable style={styles.headerButton} onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.headerButton} onPress={handleWishlistToggle}>
              <Feather
                name="heart"
                size={22}
                color="#FFFFFF"
                fill={isWishlisted ? '#FFFFFF' : 'transparent'}
              />
            </Pressable>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.detailsSection}>
          {/* Category */}
          <ThemedText style={styles.category}>{product.brand}</ThemedText>

          {/* Product Name */}
          <ThemedText style={styles.productName}>{product.name}</ThemedText>

          {/* Rating & Reviews */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Feather name="star" size={14} color="#FFC107" fill="#FFC107" />
              <ThemedText style={styles.ratingValue}>{product.rating}</ThemedText>
            </View>
            <ThemedText style={styles.reviewsCount}>({product.reviewCount} reviews)</ThemedText>
          </View>

          {/* Price Section - Enhanced Hierarchy */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <ThemedText style={styles.salePrice}>₹{product.price}</ThemedText>
              {product.mrp && (
                <View style={styles.mrpContainer}>
                  <ThemedText style={styles.mrpLabel}>MRP</ThemedText>
                  <ThemedText style={styles.originalPrice}>₹{product.mrp}</ThemedText>
                </View>
              )}
            </View>
            {discountPercentage > 0 && (
              <View style={styles.savingsRow}>
                <View style={styles.discountBadge}>
                  <ThemedText style={styles.discountText}>{discountPercentage}% OFF</ThemedText>
                </View>
                <ThemedText style={styles.savingsText}>
                  You save ₹{product.mrp ? product.mrp - product.price : 0}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Key Highlights */}
          <View style={styles.highlightsSection}>
            <View style={styles.highlightItem}>
              <Feather name="truck" size={18} color="#FF8C00" />
              <ThemedText style={styles.highlightText}>Free Delivery</ThemedText>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="shield" size={18} color="#FF8C00" />
              <ThemedText style={styles.highlightText}>Secure Checkout</ThemedText>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="rotate-ccw" size={18} color="#FF8C00" />
              <ThemedText style={styles.highlightText}>Easy Returns</ThemedText>
            </View>
          </View>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.sectionContainer}>
              <ThemedText style={styles.sectionTitle}>Select Color</ThemedText>
              <View style={styles.optionsRow}>
                {product.colors.map(color => (
                  <Pressable
                    key={color}
                    style={[
                      styles.colorOption,
                      selectedColor === color && styles.optionSelected
                    ]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <ThemedText style={[
                      styles.optionText,
                      selectedColor === color && styles.optionTextSelected
                    ]}>
                      {color}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.sectionContainer}>
              <ThemedText style={styles.sectionTitle}>Select Size</ThemedText>
              <View style={styles.optionsRow}>
                {product.sizes.map(size => (
                  <Pressable
                    key={size}
                    style={[
                      styles.sizeOption,
                      selectedSize === size && styles.optionSelected
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <ThemedText style={[
                      styles.optionText,
                      selectedSize === size && styles.optionTextSelected
                    ]}>
                      {size}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Quantity Selector */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Quantity</ThemedText>
            <View style={styles.quantityContainer}>
              <Pressable 
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Feather name="minus" size={18} color="#FF8C00" />
              </Pressable>
              <ThemedText style={styles.quantityValue}>{quantity}</ThemedText>
              <Pressable 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Feather name="plus" size={18} color="#FF8C00" />
              </Pressable>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>About This Product</ThemedText>
            <ThemedText style={styles.description}>{product.description}</ThemedText>
          </View>

          {/* Delivery Estimate Section */}
          <View style={styles.deliverySection}>
            <View style={styles.deliveryHeader}>
              <Feather name="map-pin" size={18} color={Colors.light.primary} />
              <ThemedText style={styles.deliverySectionTitle}>Check Delivery</ThemedText>
            </View>
            <View style={styles.pincodeRow}>
              <TextInput
                style={styles.pincodeInput}
                placeholder="Enter Pincode"
                placeholderTextColor={Colors.light.textTertiary}
                value={pincode}
                onChangeText={setPincode}
                keyboardType="number-pad"
                maxLength={6}
              />
              <Pressable style={styles.checkButton} onPress={handleCheckDelivery}>
                <ThemedText style={styles.checkButtonText}>CHECK</ThemedText>
              </Pressable>
            </View>
            {deliveryInfo && (
              <View style={[
                styles.deliveryResult,
                deliveryInfo.available ? styles.deliveryAvailable : styles.deliveryUnavailable
              ]}>
                <Feather 
                  name={deliveryInfo.available ? "check-circle" : "alert-circle"} 
                  size={16} 
                  color={deliveryInfo.available ? Colors.light.success : Colors.light.error} 
                />
                <ThemedText style={[
                  styles.deliveryResultText,
                  deliveryInfo.available ? styles.deliveryTextSuccess : styles.deliveryTextError
                ]}>
                  {deliveryInfo.message}
                </ThemedText>
              </View>
            )}
            {deliveryInfo?.available && (
              <View style={styles.deliveryFeatures}>
                <View style={styles.deliveryFeature}>
                  <Feather name="package" size={14} color={Colors.light.textTertiary} />
                  <ThemedText style={styles.deliveryFeatureText}>Cash on Delivery Available</ThemedText>
                </View>
                <View style={styles.deliveryFeature}>
                  <Feather name="repeat" size={14} color={Colors.light.textTertiary} />
                  <ThemedText style={styles.deliveryFeatureText}>7 Days Easy Returns</ThemedText>
                </View>
              </View>
            )}
          </View>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <View style={styles.similarSection}>
              <ThemedText style={styles.similarSectionTitle}>Similar Products</ThemedText>
              <FlatList
                data={similarProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.similarList}
                renderItem={({ item }) => (
                  <Pressable 
                    style={styles.similarCard}
                    onPress={() => handleSimilarProductPress(item.id)}
                  >
                    <Image
                      source={
                        item.images && item.images.length > 0
                          ? typeof item.images[0] === 'string'
                            ? { uri: item.images[0] }
                            : item.images[0]
                          : require('../../attached_assets/generated_images/toddler_boy_navy_outfit.png')
                      }
                      style={styles.similarImage}
                      resizeMode="cover"
                    />
                    <View style={styles.similarInfo}>
                      <ThemedText style={styles.similarBrand} numberOfLines={1}>{item.brand}</ThemedText>
                      <ThemedText style={styles.similarName} numberOfLines={2}>{item.name}</ThemedText>
                      <View style={styles.similarPriceRow}>
                        <ThemedText style={styles.similarPrice}>₹{item.price}</ThemedText>
                        {item.mrp && item.mrp > item.price && (
                          <ThemedText style={styles.similarMrp}>₹{item.mrp}</ThemedText>
                        )}
                      </View>
                    </View>
                  </Pressable>
                )}
              />
            </View>
          )}

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable 
          style={styles.wishlistButton}
          onPress={handleWishlistToggle}
        >
          <Feather 
            name="heart" 
            size={22} 
            color={isWishlisted ? '#FF8C00' : '#999999'}
            fill={isWishlisted ? '#FF8C00' : 'transparent'}
          />
        </Pressable>
        
        <Pressable 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <LinearGradient
            colors={['#FF8C00', '#FF6B9D']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Feather name="shopping-cart" size={20} color="#FFFFFF" />
            <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  imageSection: {
    width: '100%',
    height: width,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  carouselImageContainer: {
    width: width,
    height: width,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  headerOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsSection: {
    padding: 16,
    paddingTop: 20,
  },
  category: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 24,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.light.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.buttonText,
  },
  reviewsCount: {
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  priceSection: {
    marginBottom: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.divider,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  salePrice: {
    ...Typography.priceLarge,
    fontSize: 28,
    fontWeight: '800',
    color: Colors.light.text,
  },
  mrpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  mrpLabel: {
    fontSize: 12,
    color: Colors.light.textTertiary,
    fontWeight: '500',
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.light.textTertiary,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  discountBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.light.success,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  savingsText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.success,
  },
  highlightsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xxl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.sm,
  },
  highlightItem: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  colorOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minWidth: '30%',
    alignItems: 'center',
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minWidth: '22%',
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#FF8C00',
    backgroundColor: 'rgba(255,107,157,0.08)',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  optionTextSelected: {
    color: '#FF8C00',
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '40%',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  quantityValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  description: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  wishlistButton: {
    width: 52,
    height: 52,
    borderWidth: 1.5,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  deliverySection: {
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.sm,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  deliverySectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
  },
  pincodeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  pincodeInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    color: Colors.light.text,
  },
  checkButton: {
    paddingHorizontal: Spacing.lg,
    height: 44,
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  deliveryResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
  },
  deliveryAvailable: {
    backgroundColor: '#E8F5E9',
  },
  deliveryUnavailable: {
    backgroundColor: '#FFEBEE',
  },
  deliveryResultText: {
    fontSize: 13,
    fontWeight: '600',
  },
  deliveryTextSuccess: {
    color: Colors.light.success,
  },
  deliveryTextError: {
    color: Colors.light.error,
  },
  deliveryFeatures: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  deliveryFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  deliveryFeatureText: {
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  similarSection: {
    marginBottom: Spacing.xl,
  },
  similarSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  similarList: {
    paddingRight: Spacing.lg,
  },
  similarCard: {
    width: 140,
    marginRight: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  similarImage: {
    width: '100%',
    height: 140,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  similarInfo: {
    padding: Spacing.sm,
  },
  similarBrand: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.light.textTertiary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  similarName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.text,
    lineHeight: 16,
    marginBottom: Spacing.xs,
  },
  similarPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  similarPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
  },
  similarMrp: {
    fontSize: 11,
    color: Colors.light.textTertiary,
    textDecorationLine: 'line-through',
  },
});
