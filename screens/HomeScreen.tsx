import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions, FlatList, Platform, ScrollView, Text, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { ModernSearchBar } from '@/components/ModernSearchBar';
import { ModernHeroSection } from '@/components/ModernHeroSection';
import { BestSellersCarousel } from '@/components/BestSellersCarousel';
import { PersonalizedSection } from '@/components/PersonalizedSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { GIRLS_AGE_GROUPS, BOYS_AGE_GROUPS, AGE_WISE_CATEGORIES } from '@/data/ageGroupData';
import { wishlistStorage } from '@/utils/storage';
import { selectCartTotalItems } from '@/store/cartSlice';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import type { RootState } from '@/store/store';

import { categoryImages } from '../data/mockData';

const girlsImages: { [key: string]: any } = {
  'g1': require('../attached_assets/generated_images/newborn_girl_fashion.png'),
  'g2': require('../attached_assets/generated_images/infant_girl_fashion.png'),
  'g3': require('../attached_assets/generated_images/toddler_girl_fashion.png'),
  'g4': require('../attached_assets/generated_images/preschool_girl_fashion.png'),
  'g5': require('../attached_assets/generated_images/kids_girl_fashion.png'),
};

const boysImages: { [key: string]: any } = {
  'b1': require('../attached_assets/generated_images/newborn_boy_fashion.png'),
  'b2': require('../attached_assets/generated_images/infant_boy_fashion.png'),
  'b3': require('../attached_assets/generated_images/toddler_boy_fashion.png'),
  'b4': require('../attached_assets/generated_images/preschool_boy_fashion.png'),
  'b5': require('../attached_assets/generated_images/kids_boy_fashion.png'),
};

const winterImages: { [key: string]: any } = {
  '1': require('../attached_assets/generated_images/winter_sweater_kids.png'),
  '2': require('../attached_assets/generated_images/winter_sweatshirt_kids.png'),
  '3': require('../attached_assets/generated_images/winter_jacket_kids.png'),
  '4': require('../attached_assets/generated_images/thermal_innerwear_kids.png'),
  '5': require('../attached_assets/generated_images/winter_essentials_kids.png'),
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState(PRODUCTS);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const cartCount = useSelector((state: RootState) => selectCartTotalItems(state.cart));

  // Load wishlist on mount
  useEffect(() => {
    const loadWishlist = async () => {
      const wishlist = await wishlistStorage.getWishlist();
      const wishlistIds = new Set(wishlist.map(item => item.id));
      setWishlistedItems(wishlistIds);
    };
    loadWishlist();
  }, []);

  // Memoized product list with wishlist status
  const updatedProducts = useMemo(() => 
    products.map(p => ({
      ...p,
      isWishlisted: wishlistedItems.has(p.id)
    })),
    [products, wishlistedItems]
  );

  // Callback: Product press with navigation
  const handleProductPress = useCallback((productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  }, [navigation]);

  // Callback: Wishlist toggle with storage sync
  const handleWishlistToggle = useCallback(async (productId: string) => {
    const isCurrentlyWishlisted = wishlistedItems.has(productId);

    try {
      if (isCurrentlyWishlisted) {
        await wishlistStorage.removeFromWishlist(productId);
        setWishlistedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      } else {
        const product = products.find(p => p.id === productId);
        if (product) {
          await wishlistStorage.addToWishlist(product);
          setWishlistedItems(prev => new Set(prev).add(productId));
        }
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  }, [wishlistedItems, products]);

  // Callback: Category navigation
  const handleCategoryPress = useCallback(() => {
    navigation.navigate('CategoryAggregator');
  }, [navigation]);

  // Callback: Search navigation
  const handleSearchPress = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Scrollable Content with Header */}
      <ScreenScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <ModernSearchBar 
          onSearch={handleSearchPress}
          products={updatedProducts && updatedProducts.length > 0 ? updatedProducts : PRODUCTS}
          onProductSelect={handleProductPress}
        />

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ModernHeroSection
            onSlidePress={() => {}}
            onButtonPress={() => navigation.navigate('FlashSale')}
          />
        </View>


        {/* Baby Girls Fashion Row */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>👧 Baby Girls Fashion</ThemedText>
            <Pressable onPress={() => navigation.navigate('AgeWise')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.ageGroupGrid}>
            {GIRLS_AGE_GROUPS.map((ageGroup) => (
              <Pressable 
                key={ageGroup.id}
                style={styles.ageGroupItem}
                onPress={() => navigation.navigate('AgeGroupDetail', { 
                  ageRange: ageGroup.ageRange, 
                  gender: 'girls',
                  color: ageGroup.color
                })}
              >
                <View 
                  style={[
                    styles.ageGroupCard, 
                    { backgroundColor: ageGroup.color }
                  ]}
                >
                  {girlsImages[ageGroup.id] && (
                    <Image 
                      source={girlsImages[ageGroup.id]}
                      style={styles.ageGroupImage}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <ThemedText style={styles.ageGroupName}>{ageGroup.ageRange}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Baby Boys Fashion Row */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>👦 Baby Boys Fashion</ThemedText>
            <Pressable onPress={() => navigation.navigate('AgeWise')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.ageGroupGrid}>
            {BOYS_AGE_GROUPS.map((ageGroup) => (
              <Pressable 
                key={ageGroup.id}
                style={styles.ageGroupItem}
                onPress={() => navigation.navigate('AgeGroupDetail', { 
                  ageRange: ageGroup.ageRange, 
                  gender: 'boys',
                  color: ageGroup.color
                })}
              >
                <View 
                  style={[
                    styles.ageGroupCard, 
                    { backgroundColor: ageGroup.color }
                  ]}
                >
                  {boysImages[ageGroup.id] && (
                    <Image 
                      source={boysImages[ageGroup.id]}
                      style={styles.ageGroupImage}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <ThemedText style={styles.ageGroupName}>{ageGroup.ageRange}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Shop by Age - Combined Winter */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>❄️ Winter Essentials - All</ThemedText>
            <Pressable onPress={() => navigation.navigate('AgeWise')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.ageGroupGrid}>
            {AGE_WISE_CATEGORIES.map((category) => (
              <Pressable 
                key={category.id}
                style={styles.ageGroupItem}
                onPress={() => navigation.navigate('AgeWise')}
              >
                <View 
                  style={[
                    styles.ageGroupCard, 
                    { backgroundColor: category.color }
                  ]}
                >
                  {winterImages[category.id] && (
                    <Image 
                      source={winterImages[category.id]}
                      style={styles.ageGroupImage}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <ThemedText style={styles.ageGroupName}>{category.name}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Shop by Category</ThemedText>
            <Pressable onPress={() => navigation.navigate('AllProducts')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <Pressable 
                key={category.id}
                onPress={handleCategoryPress}
                style={styles.categoryItem}
              >
                <View 
                  style={[
                    styles.categoryCard, 
                    { backgroundColor: category.color + '22' }
                  ]}
                >
                  <View style={styles.categoryImageContainer}>
                    <Image 
                      source={categoryImages[category.name as keyof typeof categoryImages]}
                      style={styles.categoryImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Parenting Zone Section */}
        <View style={styles.parentingZoneSection}>
          <Pressable 
            style={styles.parentingZoneBanner}
            onPress={() => {
              // Future navigation will be added here
              console.log('Parenting Zone clicked - will navigate to parenting section');
            }}
          >
            <Image 
              source={require('../attached_assets/WhatsApp Image 2025-11-29 at 3.25.16 PM_1764410805074.jpeg')}
              style={styles.parentingZoneImage}
              resizeMode="cover"
            />
          </Pressable>
        </View>

        {/* Trending Store Section */}
        <View style={styles.trendingStoreSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingStoreScroll}
          >
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/birthday_gifts_items.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Birthday & Gifts</ThemedText>
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/electronics_tech_gadgets.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Electronics & Tech</ThemedText>
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/moms_maternity_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Moms & Maternity</ThemedText>
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/beauty_care_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Beauty & Care</ThemedText>
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/special_deals_sale.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Special Deals</ThemedText>
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_gear_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Baby Gear</ThemedText>
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/toys_gaming_collection.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.trendingStoreCardTitle}>Toys & Gaming</ThemedText>
            </Pressable>
          </ScrollView>
        </View>

        {/* Flash Sale Section */}
        <Pressable style={styles.flashSaleBanner} onPress={() => navigation.navigate('FlashSale')}>
          <LinearGradient
            colors={['#FF6B9D', '#FFA8C5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.flashGradient}
          >
            <View style={styles.flashLeft}>
              <View style={styles.flashIcon}>
                <Feather name="zap" size={24} color="#FFFFFF" />
              </View>
              <View>
                <ThemedText style={styles.flashTitle}>Flash Sale</ThemedText>
                <ThemedText style={styles.flashSubtitle}>Limited offers today</ThemedText>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>

        {/* Best Sellers */}
        <BestSellersCarousel onProductPress={handleProductPress} />

        {/* Personalized Section */}
        <PersonalizedSection onItemPress={() => navigation.navigate('AllProducts')} />

        {/* Trending Products - 2x2 Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
            <Pressable onPress={() => navigation.navigate('AllProducts')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.productsGrid}>
            {updatedProducts.slice(0, 4).map(product => (
              <View key={product.id} style={styles.productGridItem}>
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                  onWishlistPress={() => handleWishlistToggle(product.id)}
                  isWishlisted={product.isWishlisted}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Winter Sales - 2x2 Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Winter Sales</ThemedText>
            <Pressable onPress={() => navigation.navigate('AllProducts')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.productsGrid}>
            {updatedProducts.slice(4, 8).map(product => (
              <View key={product.id} style={styles.productGridItem}>
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                  onWishlistPress={() => handleWishlistToggle(product.id)}
                  isWishlisted={product.isWishlisted}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Best For You - 2x2 Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Best For You</ThemedText>
            <Pressable onPress={() => navigation.navigate('AllProducts')}>
              <ThemedText style={styles.seeAllText}>View All</ThemedText>
            </Pressable>
          </View>
          <View style={styles.productsGrid}>
            {updatedProducts.slice(8, 12).map(product => (
              <View key={product.id} style={styles.productGridItem}>
                <ProductCard
                  product={product}
                  onPress={() => handleProductPress(product.id)}
                  onWishlistPress={() => handleWishlistToggle(product.id)}
                  isWishlisted={product.isWishlisted}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials */}
        <TestimonialsSection />
      </ScreenScrollView>

      {/* Floating Cart Button */}
      <Pressable
        style={styles.cartFAB}
        onPress={() => navigation.navigate('Cart')}
      >
        <LinearGradient
          colors={['#FF6B9D', '#FF8FB3']}
          style={styles.cartFABGradient}
        >
          <Feather name="shopping-cart" size={24} color="#FFFFFF" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <ThemedText style={styles.cartBadgeText}>{cartCount}</ThemedText>
            </View>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  heroContainer: {
    paddingVertical: Spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: Spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 8,
  },
  categoryItem: {
    width: '18%', // Changed from '23%'
    alignItems: 'center',
    marginBottom: 18,
  },
  categoryCard: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden', // Added
  },
  categoryImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%', // Changed from '80%'
    height: '100%', // Changed from '80%'
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    width: '100%',
  },
  categoryCount: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  ageGroupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 8,
  },
  ageGroupItem: {
    width: '18%',
    alignItems: 'center',
    marginBottom: 18,
  },
  ageGroupCard: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden', // Added
  },
  ageGroupImage: {
    width: '100%', // Changed from '85%'
    height: '100%', // Changed from '85%'
  },
  ageGroupName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    width: '100%',
  },
  flashSaleBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  flashGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  flashLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flashIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  flashSubtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  productGridItem: {
    width: '50%',
    paddingHorizontal: 4,
  },
  cartFAB: {
    position: 'absolute',
    bottom: 90,
    right: Spacing.lg,
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 100,
  },
  cartFABGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartBadgeText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 18,
    textAlign: 'center',
  },
  parentingZoneSection: {
    marginHorizontal: 0,
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  parentingZoneBanner: {
    width: '100%',
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: '#FFFFFF',
  },
  parentingZoneImage: {
    width: '100%',
    height: 280,
  },
  trendingStoreSection: {
    marginTop: 1,
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  trendingStoreScroll: {
    paddingHorizontal: 0,
    gap: 16,
  },
  trendingStoreCard: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  trendingStoreCardImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.85,
    borderRadius: 0,
    marginBottom: 12,
  },
  trendingStoreCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 16,
  },
});