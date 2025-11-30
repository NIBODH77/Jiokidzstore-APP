import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions, FlatList, Platform, ScrollView, Text, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
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

        {/* TRENDING Store Section */}
        <View style={styles.trendingStoreSection}>
          <View style={styles.trendingStoreTitleRow}>
            <Text style={styles.decorativeSnowflakeLeft}>❄</Text>
            <View style={styles.trendingTitleContainer}>
              <View style={styles.trendingLettersRow}>
                <Text style={[styles.trendingLetter, { color: '#6B3410' }]}>T</Text>
                <Text style={[styles.trendingLetter, { color: '#7B3F1A' }]}>R</Text>
                <Text style={[styles.trendingLetter, { color: '#8B4513' }]}>E</Text>
                <Text style={[styles.trendingLetter, { color: '#A0522D' }]}>N</Text>
                <Text style={[styles.trendingLetter, { color: '#B8651F' }]}>D</Text>
                <Text style={[styles.trendingLetter, { color: '#CD7F32' }]}>I</Text>
                <Text style={[styles.trendingLetter, { color: '#D2691E' }]}>N</Text>
                <Text style={[styles.trendingLetter, { color: '#DEB887' }]}>G</Text>
                <Text style={styles.storeText}>Store</Text>
              </View>
              <View style={styles.storeUnderline} />
            </View>
            <Text style={styles.decorativeSnowflakeRight}>❄</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingStoreScroll}
            scrollEnabled={true}
            decelerationRate="fast"
            snapToInterval={Dimensions.get('window').width}
          >
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/birthday_gifts_items.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/electronics_tech_gadgets.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/moms_maternity_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/beauty_care_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/special_deals_sale.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_gear_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/toys_gaming_collection.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
          </ScrollView>
        </View>

        {/* Season's Special Section */}
        <View style={styles.seasonsSpecialSection}>
          <View style={styles.seasonsSpecialHeader}>
            <View style={styles.seasonsSpecialTitleContainer}>
              <ThemedText style={styles.seasonsSpecialTitle}>Season's Special</ThemedText>
              <ThemedText style={styles.seasonsSpecialSubtitle}>Pick Your Winter Wardrobe Refresh Pieces</ThemedText>
            </View>
            <View style={styles.startingPriceContainer}>
              <ThemedText style={styles.startingText}>STARTING</ThemedText>
              <ThemedText style={styles.priceText}>₹199</ThemedText>
            </View>
          </View>

          <View style={styles.seasonsSpecialGrid}>
            <View style={styles.seasonsRow}>
              <Pressable style={styles.seasonsCardLarge} onPress={() => navigation.navigate('AllProducts')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Hoodies›</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardSmall} onPress={() => navigation.navigate('AllProducts')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Sweatshirts›</ThemedText>
                </View>
              </Pressable>
            </View>

            <View style={styles.seasonsRow}>
              <Pressable style={styles.seasonsCardSmall} onPress={() => navigation.navigate('AllProducts')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Winter Sets›</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardLarge} onPress={() => navigation.navigate('AllProducts')}>
                <Image 
                  source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Pullovers›</ThemedText>
                </View>
              </Pressable>
            </View>

            <View style={styles.seasonsRow}>
              <Pressable style={styles.seasonsCardMedium} onPress={() => navigation.navigate('AllProducts')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Jackets›</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardMedium} onPress={() => navigation.navigate('AllProducts')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Sweaters›</ThemedText>
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Onesies Made for Winter Cuddles Section */}
        <View style={styles.onesiesSection}>
          <ThemedText style={styles.onesiesSectionTitle}>Onesies Made for Winter Cuddles</ThemedText>

          {/* Top Banner with Babies */}
          <View style={styles.onesiesBanner}>
            <Image 
              source={require('../attached_assets/generated_images/baby_clothing_collection_banner.png')}
              style={styles.onesiesBannerImage}
              resizeMode="cover"
            />
            <View style={styles.onesiesBannerOverlay}>
              <View style={styles.onesiesBannerLeft}>
                <ThemedText style={styles.onesiesStartingText}>STARTING</ThemedText>
                <ThemedText style={styles.onesiesPriceText}>₹199</ThemedText>
                <Pressable style={styles.onesiesViewAllButton} onPress={() => navigation.navigate('AllProducts')}>
                  <ThemedText style={styles.onesiesViewAllText}>View All ›</ThemedText>
                </Pressable>
              </View>
              <View style={styles.onesiesBannerRight}>
                <ThemedText style={styles.onesiesTaglineTop}>One</ThemedText>
                <ThemedText style={styles.onesiesTaglineMiddle}>of a kind</ThemedText>
                <ThemedText style={styles.onesiesTaglineBottom}>Shop onesies</ThemedText>
                <ThemedText style={styles.onesiesTaglineBottom}>& Rompers</ThemedText>
              </View>
            </View>
          </View>

          {/* Scrollable Product Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.onesiesCardsScroll}
            scrollEnabled={true}
            decelerationRate="fast"
          >
            <Pressable style={styles.onesiesCard} onPress={() => navigation.navigate('AllProducts')}>
              <View style={styles.onesiesCardImageContainer}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                  style={styles.onesiesCardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.onesiesCardLabel}>
                <ThemedText style={styles.onesiesCardText}>Onesies &</ThemedText>
                <ThemedText style={styles.onesiesCardText}>Bodysuits›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.onesiesCard} onPress={() => navigation.navigate('AllProducts')}>
              <View style={styles.onesiesCardImageContainer}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                  style={styles.onesiesCardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.onesiesCardLabel}>
                <ThemedText style={styles.onesiesCardText}>Rompers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.onesiesCard} onPress={() => navigation.navigate('AllProducts')}>
              <View style={styles.onesiesCardImageContainer}>
                <Image 
                  source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                  style={styles.onesiesCardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.onesiesCardLabel}>
                <ThemedText style={styles.onesiesCardText}>Winter</ThemedText>
                <ThemedText style={styles.onesiesCardText}>Onesies›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.onesiesCard} onPress={() => navigation.navigate('AllProducts')}>
              <View style={styles.onesiesCardImageContainer}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                  style={styles.onesiesCardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.onesiesCardLabel}>
                <ThemedText style={styles.onesiesCardText}>Jumpsuits›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.onesiesCard} onPress={() => navigation.navigate('AllProducts')}>
              <View style={styles.onesiesCardImageContainer}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                  style={styles.onesiesCardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.onesiesCardLabel}>
                <ThemedText style={styles.onesiesCardText}>Full Sleeves›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.onesiesCard} onPress={() => navigation.navigate('AllProducts')}>
              <View style={styles.onesiesCardImageContainer}>
                <Image 
                  source={require('../attached_assets/generated_images/baby_care_products.png')}
                  style={styles.onesiesCardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.onesiesCardLabel}>
                <ThemedText style={styles.onesiesCardText}>Sleepwear›</ThemedText>
              </View>
            </Pressable>
          </ScrollView>
        </View>

        {/* Cold-Weather Essentials Section */}
        <View style={styles.coldWeatherSection}>
          <View style={styles.coldWeatherHeader}>
            <ThemedText style={styles.coldWeatherTitle}>Cold-Weather Essentials</ThemedText>
            <ThemedText style={styles.coldWeatherSubtitle}>From Head to Toe: Winter Must-Haves</ThemedText>
          </View>

          {/* Row 1: Sweatshirts & Sweaters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coldWeatherRow}
            scrollEnabled={true}
            decelerationRate="fast"
          >
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherPromoImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherPromoOverlay}>
                <ThemedText style={styles.coldWeatherPromoTitle}>SWEATSHIRTS &</ThemedText>
                <ThemedText style={styles.coldWeatherPromoTitle}>SWEATERS</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPrice}>STARTING</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPriceValue}>₹199</ThemedText>
                <View style={styles.coldWeatherPromoButton}>
                  <Feather name="chevron-right" size={20} color="#FFFFFF" />
                </View>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Hoodies›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Sweater Vests›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Pullovers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Cardigans›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Knits›</ThemedText>
              </View>
            </Pressable>
          </ScrollView>

          {/* Row 2: Jackets */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coldWeatherRow}
            scrollEnabled={true}
            decelerationRate="fast"
          >
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherPromoImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherPromoOverlayBlue}>
                <ThemedText style={styles.coldWeatherPromoTitle}>JACKETS</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPrice}>STARTING</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPriceValue}>₹399</ThemedText>
                <View style={styles.coldWeatherPromoButton}>
                  <Feather name="chevron-right" size={20} color="#FFFFFF" />
                </View>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Denim›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Coats›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Bomber Jackets›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Puffer Jackets›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Windcheaters›</ThemedText>
              </View>
            </Pressable>
          </ScrollView>

          {/* Row 3: Thermals */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coldWeatherRow}
            scrollEnabled={true}
            decelerationRate="fast"
          >
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherPromoImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherPromoOverlayMint}>
                <ThemedText style={styles.coldWeatherPromoTitle}>THERMALS</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPrice}>STARTING</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPriceValue}>₹199</ThemedText>
                <View style={styles.coldWeatherPromoButton}>
                  <Feather name="chevron-right" size={20} color="#FFFFFF" />
                </View>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Thermal Pants›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Thermals Sets›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Base Layers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Long Johns›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Innerwear›</ThemedText>
              </View>
            </Pressable>
          </ScrollView>

          {/* Row 4: Winter Accessories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coldWeatherRow}
            scrollEnabled={true}
            decelerationRate="fast"
          >
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherPromoImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherPromoOverlayPurple}>
                <ThemedText style={styles.coldWeatherPromoTitle}>WINTER</ThemedText>
                <ThemedText style={styles.coldWeatherPromoTitle}>ACCESSORIES</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPrice}>STARTING</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPriceValue}>₹99</ThemedText>
                <View style={styles.coldWeatherPromoButton}>
                  <Feather name="chevron-right" size={20} color="#FFFFFF" />
                </View>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Stockings›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Gloves›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Scarves›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Hats›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Mittens›</ThemedText>
              </View>
            </Pressable>
          </ScrollView>

          {/* Row 5: Bottoms */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coldWeatherRow}
            scrollEnabled={true}
            decelerationRate="fast"
          >
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherPromoImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherPromoOverlayOrange}>
                <ThemedText style={styles.coldWeatherPromoTitle}>BOTTOMS</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPrice}>STARTING</ThemedText>
                <ThemedText style={styles.coldWeatherPromoPriceValue}>₹109</ThemedText>
                <View style={styles.coldWeatherPromoButton}>
                  <Feather name="chevron-right" size={20} color="#FFFFFF" />
                </View>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Leggings›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Track Pants›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Joggers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Cargo Pants›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => navigation.navigate('AllProducts')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Dungarees›</ThemedText>
              </View>
            </Pressable>
          </ScrollView>
        </View>

        {/* Cozy & Cute Section */}
        <View style={styles.cozyCuteSection}>
          {/* Top Banner with Kids */}
          <View style={styles.cozyCuteBanner}>
            <Image 
              source={require('../attached_assets/generated_images/baby_clothing_collection_banner.png')}
              style={styles.cozyCuteBannerImage}
              resizeMode="cover"
            />
            <View style={styles.cozyCuteBannerOverlay}>
              <View style={styles.cozyCuteBannerContent}>
                <ThemedText style={styles.cozyCuteTitle}>COZY & CUTE</ThemedText>
                <ThemedText style={styles.cozyCuteSubtitle}>Winter Essentials for</ThemedText>
                <ThemedText style={styles.cozyCuteSubtitle}>Infants</ThemedText>
                <View style={styles.cozyCutePriceTag}>
                  <ThemedText style={styles.cozyCuteStarting}>STARTING</ThemedText>
                  <ThemedText style={styles.cozyCutePrice}>₹199›</ThemedText>
                </View>
              </View>
            </View>
          </View>

          {/* Single Row with 9 Cards - Fast Scrolling */}
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cozyCuteScrollContent}
            scrollEventThrottle={1}
            decelerationRate="fast"
            scrollEnabled={true}
            nestedScrollEnabled={true}
          >
            <View style={styles.cozyCuteRow}>
              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Onesies›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Jhablas›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Diaper Leggings›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Booties›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Caps›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/baby_care_products.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Mittens›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/baby_gear_products.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Multipacks›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/feeding_nursing_products.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Sleep Suits›</ThemedText>
                </View>
              </Pressable>

              <Pressable style={styles.cozyCuteCard} onPress={() => navigation.navigate('AllProducts')}>
                <View style={styles.cozyCuteCardImageContainer}>
                  <Image 
                    source={require('../attached_assets/generated_images/baby_nursery_furniture.png')}
                    style={styles.cozyCuteCardImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cozyCuteCardLabel}>
                  <ThemedText style={styles.cozyCuteCardText}>Fleece Bottoms›</ThemedText>
                </View>
              </Pressable>
            </View>
          </Animated.ScrollView>
        </View>

        {/* Premium Baby Kids Banner */}
        <Pressable onPress={() => navigation.navigate('AllProducts')}>
          <LinearGradient
            colors={['#FFE5F1', '#FFF0F8', '#E8F4F8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumBanner}
          >
            <View style={styles.premiumBannerContent}>
              <View style={styles.premiumBannerTextSection}>
                <ThemedText style={styles.premiumBannerTag}>✨ EXCLUSIVE COLLECTION</ThemedText>
                <ThemedText style={styles.premiumBannerTitle}>Discover Premium Quality</ThemedText>
                <ThemedText style={styles.premiumBannerSubtitle}>Crafted with Love for Your Little Ones</ThemedText>
                <ThemedText style={styles.premiumBannerDescription}>Soft, Safe & Stylish Baby Fashion</ThemedText>
                <View style={styles.premiumBannerButton}>
                  <ThemedText style={styles.premiumBannerButtonText}>Explore Now →</ThemedText>
                </View>
              </View>
              <View style={styles.premiumBannerIconSection}>
                <View style={styles.premiumBannerIconBox}>
                  <ThemedText style={styles.premiumBannerIcon}>👶</ThemedText>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Pressable>
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
  cozyCuteSection: {
    marginTop: 0,
    marginBottom: 24,
    backgroundColor: '#F5E6D3',
  },
  cozyCuteBanner: {
    width: '100%',
    height: 220,
    position: 'relative',
    marginBottom: 0,
    backgroundColor: '#F5E6D3',
  },
  cozyCuteBannerImage: {
    width: '100%',
    height: '100%',
  },
  cozyCuteBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  cozyCuteBannerContent: {
    backgroundColor: 'rgba(74, 74, 74, 0.85)',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  cozyCuteTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cozyCuteSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  cozyCutePriceTag: {
    marginTop: 12,
  },
  cozyCuteStarting: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: 1.5,
  },
  cozyCutePrice: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFD700',
    lineHeight: 40,
  },
  cozyCuteProductGrid: {
    paddingVertical: 20,
    backgroundColor: '#F5E6D3',
  },
  cozyCuteScrollContent: {
    paddingHorizontal: 16,
  },
  cozyCuteRow: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  cozyCuteCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cozyCuteCardImageContainer: {
    width: 140,
    height: 140,
    backgroundColor: '#E8F4F8',
  },
  cozyCuteCardImage: {
    width: '100%',
    height: '100%',
  },
  cozyCuteCardLabel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cozyCuteCardText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  premiumBanner: {
    marginHorizontal: 0,
    marginTop: 24,
    marginBottom: 26,
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: 280,
  },
  premiumBannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  premiumBannerTextSection: {
    flex: 1,
  },
  premiumBannerTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E91E63',
    letterSpacing: 2,
    marginBottom: 12,
  },
  premiumBannerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
    lineHeight: 38,
    marginBottom: 8,
  },
  premiumBannerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 6,
  },
  premiumBannerDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: '#9CA3AF',
    lineHeight: 18,
    marginBottom: 20,
  },
  premiumBannerButton: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  premiumBannerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  premiumBannerIconSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBannerIconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  premiumBannerIcon: {
    fontSize: 56,
  },
  parentingZoneSection: {
    marginHorizontal: 0,
    marginBottom: 0,
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
    marginTop: 0,
    marginBottom: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  trendingStoreTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  decorativeSnowflakeLeft: {
    fontSize: 18,
    color: '#B0E0E6',
    marginRight: 12,
    opacity: 0.8,
  },
  decorativeSnowflakeRight: {
    fontSize: 18,
    color: '#B0E0E6',
    marginLeft: 12,
    opacity: 0.8,
  },
  trendingTitleContainer: {
    alignItems: 'center',
  },
  trendingLettersRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  trendingLetter: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  storeText: {
    fontSize: 28,
    color: '#20B2AA',
    fontWeight: '500',
    fontStyle: 'italic',
    marginLeft: 6,
  },
  storeUnderline: {
    width: 65,
    height: 2.5,
    backgroundColor: '#20B2AA',
    marginTop: 3,
    alignSelf: 'flex-end',
    marginRight: 0,
    borderRadius: 1,
  },
  trendingStoreScroll: {
    paddingHorizontal: 0,
    gap: 0,
  },
  trendingStoreCard: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.35,
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: '#FFFFFF',
  },
  trendingStoreCardImage: {
    width: '100%',
    height: '100%',
  },
  seasonsSpecialSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  seasonsSpecialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  seasonsSpecialTitleContainer: {
    flex: 1,
  },
  seasonsSpecialTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  seasonsSpecialSubtitle: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
  },
  startingPriceContainer: {
    alignItems: 'flex-end',
  },
  startingText: {
    fontSize: 11,
    color: '#1A1A1A',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A237E',
  },
  seasonsSpecialGrid: {
    gap: 10,
  },
  seasonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  seasonsCardLarge: {
    flex: 1.2,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  seasonsCardSmall: {
    flex: 0.8,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  seasonsCardMedium: {
    flex: 1,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  seasonsCardImage: {
    width: '100%',
    height: '100%',
  },
  seasonsCardLabel: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seasonsCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  onesiesSection: {
    marginTop: 0,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  onesiesSectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  onesiesBanner: {
    width: '100%',
    height: 280,
    position: 'relative',
    marginBottom: 0,
  },
  onesiesBannerImage: {
    width: '100%',
    height: '100%',
  },
  onesiesBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  onesiesBannerLeft: {
    alignItems: 'flex-start',
  },
  onesiesStartingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  onesiesPriceText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 52,
  },
  onesiesViewAllButton: {
    backgroundColor: '#F9E7A3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  onesiesViewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  onesiesBannerRight: {
    alignItems: 'flex-end',
  },
  onesiesTaglineTop: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  onesiesTaglineMiddle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  onesiesTaglineBottom: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  onesiesCardsScroll: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
    backgroundColor: '#FFF9E6',
  },
  onesiesCard: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  onesiesCardImageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
  },
  onesiesCardImage: {
    width: '100%',
    height: '100%',
  },
  onesiesCardLabel: {
    backgroundColor: '#F9E7A3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 55,
    justifyContent: 'center',
  },
  onesiesCardText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'left',
  },
  coldWeatherSection: {
    marginTop: 0,
    marginBottom: 24,
    backgroundColor: '#F5E6D3',
  },
  coldWeatherHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  coldWeatherTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  coldWeatherSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  coldWeatherRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  coldWeatherPromoCard: {
    width: (Dimensions.get('window').width - 44) / 2.8,
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  coldWeatherPromoImage: {
    width: '100%',
    height: '100%',
  },
  coldWeatherPromoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 182, 193, 0.35)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
  },
  coldWeatherPromoOverlayBlue: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(135, 206, 250, 0.35)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
  },
  coldWeatherPromoOverlayMint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(152, 251, 152, 0.35)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
  },
  coldWeatherPromoOverlayPurple: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(216, 191, 216, 0.35)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
  },
  coldWeatherPromoOverlayOrange: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 218, 185, 0.35)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
  },
  coldWeatherPromoTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'left',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  coldWeatherPromoPrice: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  coldWeatherPromoPriceValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  coldWeatherPromoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  coldWeatherCard: {
    width: (Dimensions.get('window').width - 44) / 2.8,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  coldWeatherCardImage: {
    width: '100%',
    height: '100%',
  },
  coldWeatherCardLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  coldWeatherCardText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
});