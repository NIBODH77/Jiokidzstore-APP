
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, FlatList, Text, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const TRENDING_SEARCHES = ['Toys', 'Girl Clothes', 'Baby Diapers', 'Boy Shoes'];

interface ModernSearchBarProps {
  onSearch?: (text: string) => void;
  onProductSelect?: (productId: string) => void;
  products?: any[];
  onMicPress?: () => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onCartPress?: () => void;
  onWishlistPress?: () => void;
  onProfilePress?: () => void;
  notificationCount?: number;
  cartCount?: number;
}

// Banner data for auto-scroll
const BANNERS = [
  { id: '1', image: require('@/attached_assets/WhatsApp Image 2025-11-29 at 3.25.16 PM_1764410805074.jpeg') },
  { id: '2', image: require('@/attached_assets/generated_images/baby_girl_discount_banner.png') },
  { id: '3', image: require('@/attached_assets/generated_images/baby_boy_winter_sale_banner.png') },
  { id: '4', image: require('@/attached_assets/generated_images/mega_kids_fashion_sale.png') },
];

export function ModernSearchBar({ 
  onSearch, 
  onProductSelect,
  products = [],
  onMicPress,
  onLocationPress,
  onNotificationPress,
  onCartPress,
  onWishlistPress,
  onProfilePress,
  notificationCount = 0,
  cartCount = 0
}: ModernSearchBarProps) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const bannerScrollRef = useRef<FlatList>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % BANNERS.length;
      setCurrentBannerIndex(nextIndex);
      bannerScrollRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  // Filter products based on search text
  const filteredProducts = useMemo(() => {
    if (!text.trim()) return [];
    if (!products || products.length === 0) {
      return [];
    }
    const query = text.toLowerCase();
    const results = products.filter((p: any) => {
      const name = p.name?.toLowerCase() || '';
      const brand = p.brand?.toLowerCase() || '';
      const category = p.category?.toLowerCase() || '';
      return name.includes(query) || brand.includes(query) || category.includes(query);
    });
    return results.slice(0, 8);
  }, [text, products]);

  const handleSelectProduct = (productId: string) => {
    onProductSelect?.(productId);
    setText('');
    setShowResults(false);
  };

  const renderBanner = ({ item }: any) => (
    <View style={styles.bannerItem}>
      <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
    </View>
  );

  return (
    <LinearGradient
      colors={['#FFB6D9', '#FF6B9D']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top Row: Logo and Icons */}
      <View style={styles.topRow}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/attached_assets/JioKidslogo_1763923777175.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Pressable style={styles.locationRow} onPress={onLocationPress}>
            <Feather name="map-pin" size={12} color="#FFFFFF" />
            <Text style={styles.locationText}>Delhi, India</Text>
          </Pressable>
        </View>
        
        <View style={styles.iconsContainer}>
          <Pressable style={styles.headerIconBtn} onPress={onWishlistPress}>
            <Feather name="heart" size={20} color="#FFFFFF" />
          </Pressable>
          
          <Pressable style={styles.headerIconBtn} onPress={onNotificationPress}>
            <Feather name="bell" size={20} color="#FFFFFF" />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </Pressable>
          
          <Pressable style={styles.headerIconBtn} onPress={onProfilePress}>
            <Feather name="user" size={20} color="#FFFFFF" />
          </Pressable>
          
          <Pressable style={styles.headerIconBtn} onPress={onCartPress}>
            <Feather name="shopping-cart" size={20} color="#FFFFFF" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Search Box */}
      <View style={[styles.searchBox, isFocused && styles.searchBoxFocused]}>
        <View style={styles.content}>
          <Feather name="search" size={18} color={Colors.light.textGray} />
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            placeholderTextColor={Colors.light.textGray}
            value={text}
            onChangeText={(newText) => {
              setText(newText);
              setShowResults(newText.length > 0);
            }}
            onFocus={() => {
              setIsFocused(true);
              if (text.length > 0) setShowResults(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          {text.length > 0 && (
            <Pressable onPress={() => {
              setText('');
              setShowResults(false);
            }}>
              <Feather name="x" size={18} color={Colors.light.textGray} />
            </Pressable>
          )}
          <Pressable onPress={onMicPress}>
            <Feather name="mic" size={18} color={Colors.light.primary} />
          </Pressable>
        </View>
      </View>

      {/* Location Box */}
      <Pressable style={styles.locationBox} onPress={onLocationPress}>
        <Feather name="map-pin" size={18} color="#666666" />
        <Text style={styles.locationBoxText}>Deliver to 201307</Text>
        <Feather name="chevron-down" size={18} color="#666666" style={{ marginLeft: 'auto' }} />
      </Pressable>

      {/* Search Results */}
      {showResults && (
        <View style={styles.suggestionsContainer}>
          {filteredProducts.length > 0 ? (
            <>
              <Text style={styles.suggestionsTitle}>Search Results ({filteredProducts.length})</Text>
              {filteredProducts.map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.productResultItem}
                  onPress={() => handleSelectProduct(product.id)}
                >
                  {product.images && product.images[0] && (
                    <Image
                      source={product.images[0]}
                      style={styles.resultProductImage}
                    />
                  )}
                  <View style={styles.resultProductInfo}>
                    <Text style={styles.resultProductName} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.resultProductBrand}>{product.brand}</Text>
                    <Text style={styles.resultProductPrice}>₹{product.price}</Text>
                  </View>
                </Pressable>
              ))}
            </>
          ) : text.length > 0 ? (
            <Text style={styles.noResultsText}>No products found for "{text}"</Text>
          ) : null}
        </View>
      )}

      {/* Auto-scrolling Banners */}
      <View style={styles.bannersContainer}>
        <FlatList
          ref={bannerScrollRef}
          data={BANNERS}
          renderItem={renderBanner}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={screenWidth - 32}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (screenWidth - 32));
            setCurrentBannerIndex(index);
          }}
        />
        
        {/* Pagination Dots */}
        <View style={styles.paginationDots}>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentBannerIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 20,
    paddingBottom: 16,
    zIndex: 100,
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'visible',
    position: 'relative' as any,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 90,
    height: 40,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchBox: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  searchBoxFocused: {
    borderColor: Colors.light.primary,
    shadowOpacity: 0.15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 15,
    fontWeight: '500',
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    marginBottom: 16,
  },
  locationBoxText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  suggestionsContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 10000,
    position: 'absolute' as any,
    top: 140,
    left: 16,
    right: 16,
    width: 'auto',
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.textGray,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.md,
  },
  productResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5EE',
    backgroundColor: '#FFFFFF',
  },
  resultProductImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: Spacing.md,
    backgroundColor: '#FFE5EE',
  },
  resultProductInfo: {
    flex: 1,
  },
  resultProductName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
  },
  resultProductBrand: {
    fontSize: 11,
    color: Colors.light.textGray,
    marginTop: 2,
  },
  resultProductPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.primary,
    marginTop: 2,
  },
  noResultsText: {
    fontSize: 14,
    color: Colors.light.textGray,
    textAlign: 'center',
    paddingVertical: Spacing.lg,
  },
  bannersContainer: {
    height: 200,
    marginBottom: 8,
  },
  bannerItem: {
    width: screenWidth - 32,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#FFFFFF',
  },
});
