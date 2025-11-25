import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions, Image, Platform, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage, cartStorage } from '@/utils/storage';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'ProductDetail'>>();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = PRODUCTS.find(p => p.id === route.params?.productId);

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
      
      await cartStorage.addToCart({
        id: Date.now().toString(),
        product,
        quantity,
        selectedSize: selectedSize || undefined,
        selectedColor: selectedColor || undefined,
      });
      
      const parentNav = navigation.getParent();
      if (parentNav) {
        (parentNav as any).navigate('HomeTab', { screen: 'Cart' });
      } else {
        (navigation as any).navigate('Cart');
      }
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

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: insets.top }]}
      >
        {/* Product Image */}
        <View style={styles.imageSection}>
          <Image 
            source={typeof product.images?.[0] === 'string' ? { uri: product.images[0] } : product.images?.[0]} 
            style={styles.productImage}
            resizeMode="cover"
          />
          
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

          {/* Price Section */}
          <View style={styles.priceSection}>
            <ThemedText style={styles.salePrice}>₹{product.price}</ThemedText>
            {product.mrp && <ThemedText style={styles.originalPrice}>₹{product.mrp}</ThemedText>}
            <LinearGradient
              colors={['#28A745', '#20C997']}
              style={styles.discountBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <ThemedText style={styles.discountText}>{discountPercentage}% OFF</ThemedText>
            </LinearGradient>
          </View>

          {/* Key Highlights */}
          <View style={styles.highlightsSection}>
            <View style={styles.highlightItem}>
              <Feather name="truck" size={18} color="#FF6B9D" />
              <ThemedText style={styles.highlightText}>Free Delivery</ThemedText>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="shield" size={18} color="#FF6B9D" />
              <ThemedText style={styles.highlightText}>Secure Checkout</ThemedText>
            </View>
            <View style={styles.highlightItem}>
              <Feather name="rotate-ccw" size={18} color="#FF6B9D" />
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
                <Feather name="minus" size={18} color="#FF6B9D" />
              </Pressable>
              <ThemedText style={styles.quantityValue}>{quantity}</ThemedText>
              <Pressable 
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Feather name="plus" size={18} color="#FF6B9D" />
              </Pressable>
            </View>
          </View>

          {/* Description */}
          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>About This Product</ThemedText>
            <ThemedText style={styles.description}>{product.description}</ThemedText>
          </View>

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
            color={isWishlisted ? '#FF6B9D' : '#999999'}
            fill={isWishlisted ? '#FF6B9D' : 'transparent'}
          />
        </Pressable>
        
        <Pressable 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <LinearGradient
            colors={['#FF6B9D', '#FF8FB3']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Feather name="shopping-cart" size={20} color="#FFFFFF" />
            <ThemedText style={styles.buttonText}>Add to Cart</ThemedText>
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
    paddingBottom: 16,
  },
  imageSection: {
    width: '100%',
    height: width,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
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
    gap: 8,
    marginBottom: 16,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#28A745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999999',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  salePrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF6B9D',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  highlightsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  highlightItem: {
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
    borderColor: '#FF6B9D',
    backgroundColor: 'rgba(255,107,157,0.08)',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  optionTextSelected: {
    color: '#FF6B9D',
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
    backgroundColor: '#FF6B9D',
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
});
