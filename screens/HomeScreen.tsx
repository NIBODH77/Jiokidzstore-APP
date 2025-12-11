import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions, FlatList, Platform, ScrollView, Text, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ModernSearchBar } from '@/components/ModernSearchBar';
import { ModernHeroSection } from '@/components/ModernHeroSection';
import { ChooseLocationModal } from '@/components/ChooseLocationModal';
import { EnterPincodeModal } from '@/components/EnterPincodeModal';
import { LocationPermissionModal } from '@/components/LocationPermissionModal';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { GIRLS_AGE_GROUPS, BOYS_AGE_GROUPS, AGE_WISE_CATEGORIES } from '@/data/ageGroupData';
import { wishlistStorage } from '@/utils/storage';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const girlsImages: { [key: string]: any } = {
  'g1': require('../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png'),
  'g2': require('../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png'),
  'g3': require('../attached_assets/generated_images/toddler_girl_purple_floral_dress.png'),
  'g4': require('../attached_assets/generated_images/preschool_girl_pink_casual_outfit.png'),
  'g5': require('../attached_assets/generated_images/school_girl_colorblock_dress.png'),
};

const boysImages: { [key: string]: any } = {
  'b1': require('../attached_assets/generated_images/newborn_baby_boy_blue_onesie.png'),
  'b2': require('../attached_assets/generated_images/infant_baby_boy_blue_shirt.png'),
  'b3': require('../attached_assets/generated_images/toddler_boy_navy_outfit.png'),
  'b4': require('../attached_assets/generated_images/preschool_boy_blue_graphic_shirt.png'),
  'b5': require('../attached_assets/generated_images/school_boy_blue_hoodie.png'),
};

const winterImages: { [key: string]: any } = {
  '1': require('../attached_assets/generated_images/purple_kids_sweatshirt.png'),
  '2': require('../attached_assets/generated_images/navy_winter_pullover.png'),
  '3': require('../attached_assets/generated_images/red_kids_winter_jacket.png'),
  '4': require('../attached_assets/generated_images/colorful_rainbow_kids_winter_coat.png'),
  '5': require('../attached_assets/generated_images/pink_comfortable_kids_hoodie.png'),
};

const categoryImages: { [key: string]: any } = {
  'Footwear': require('../attached_assets/generated_images/kids_footwear_shoes.png'),
  'Fashion Accessories': require('../attached_assets/generated_images/kids_accessories_collection.png'),
  'Disney & Marvel': require('../attached_assets/generated_images/disney_marvel_merchandise.png'),
  'Toys & Gaming': require('../attached_assets/generated_images/colorful_kids_building_blocks.png'),
  'Baby Gear': require('../attached_assets/generated_images/baby_stroller_gear_banner.png'),
  'Diapering & Potty': require('../attached_assets/generated_images/diapering_potty_products.png'),
  'Bath & Skin Care': require('../attached_assets/generated_images/bath_skin_care_products.png'),
  'Feeding & Nursing': require('../attached_assets/generated_images/baby_feeding_essentials_banner.png'),
  'Health & Safety': require('../attached_assets/generated_images/health_safety_products.png'),
  'Baby Nursery': require('../attached_assets/generated_images/baby_nursery_furniture.png'),
  'Art & Hobbies': require('../attached_assets/generated_images/art_hobbies_supplies.png'),
  'Books': require('../attached_assets/generated_images/colorful_children_books.png'),
  'School Supplies': require('../attached_assets/generated_images/school_supplies_collection.png'),
  'Sports & Outdoor': require('../attached_assets/generated_images/sports_outdoor_gear.png'),
  'Home & Living': require('../attached_assets/generated_images/home_living_decor.png'),
  'Birthday & Gifts': require('../attached_assets/generated_images/birthday_gifts_items.png'),
  'Electronics & Tech': require('../attached_assets/generated_images/electronics_tech_gadgets.png'),
  'Moms & Maternity': require('../attached_assets/generated_images/moms_maternity_products.png'),
  'Beauty & Care': require('../attached_assets/generated_images/beauty_care_products.png'),
  'Special Deals': require('../attached_assets/generated_images/special_deals_sale.png'),
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState(PRODUCTS);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [notificationCount] = useState(3); // Mock notification count
  const [cartCount] = useState(0); // Mock cart count - you can connect to Redux later
  const [chooseLocationModalVisible, setChooseLocationModalVisible] = useState(false);
  const [pincodeModalVisible, setPincodeModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);


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
    (navigation as any).push('ProductDetail', { productId });
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
    (navigation as any).push('CategoryAggregator');
  }, [navigation]);

  // Callback: Search navigation
  const handleSearchPress = useCallback(() => {
    (navigation as any).push('Search');
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Search Bar - Fixed at top */}
      <ModernSearchBar 
          onSearch={() => (navigation as any).push('Search')}
          onLocationPress={() => setChooseLocationModalVisible(true)}
          onNotificationPress={() => (navigation as any).push('Notifications')}
          onCartPress={() => (navigation as any).push('Cart')}
          onWishlistPress={() => (navigation as any).push('Wishlist')}
          onProfilePress={() => (navigation as any).push('Profile')}
          notificationCount={3}
          cartCount={2}
        />

      {/* Scrollable Content */}
      <ScreenScrollView contentContainerStyle={styles.scrollContent}>

        {/* Auto-Scrolling Banners */}
        <View style={styles.autoScrollBannersContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            ref={(ref) => {
              if (ref) {
                let scrollIndex = 0;
                setInterval(() => {
                  scrollIndex = (scrollIndex + 1) % 7;
                  ref.scrollTo({
                    x: scrollIndex * (Dimensions.get('window').width - 32),
                    animated: true,
                  });
                }, 3000);
              }
            }}
            contentContainerStyle={styles.bannersScrollContent}
          >
            <Pressable style={styles.autoBanner} onPress={() => console.log('Welcome Banner')}>
              <Image 
                source={require('../attached_assets/generated_images/welcome_50%_off_kids_banner.png')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>

            <Pressable style={styles.autoBanner} onPress={() => console.log('Banner 1')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_girl_discount_banner.png')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>

            <Pressable style={styles.autoBanner} onPress={() => console.log('Banner 2')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_boy_winter_sale_banner.png')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>

            <Pressable style={styles.autoBanner} onPress={() => console.log('Banner 3')}>
              <Image 
                source={require('../attached_assets/generated_images/mega_kids_fashion_sale.png')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>

            <Pressable style={styles.autoBanner} onPress={() => console.log('Banner 4')}>
              <Image 
                source={require('../attached_assets/WhatsApp Image 2025-11-29 at 3.25.16 PM_1764410805074.jpeg')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>

            <Pressable style={styles.autoBanner} onPress={() => console.log('Banner 5')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_clothing_collection_banner.png')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>

            <Pressable style={styles.autoBanner} onPress={() => console.log('Banner 6')}>
              <Image 
                source={require('../attached_assets/Gemini_Generated_Image_xgkpipxgkpipxgkp_1764517163310.png')}
                style={styles.autoBannerImage}
                resizeMode="cover"
              />
            </Pressable>
          </ScrollView>
        </View>

        <ChooseLocationModal
          visible={chooseLocationModalVisible}
          onClose={() => setChooseLocationModalVisible(false)}
          onManageAddress={() => {
            setChooseLocationModalVisible(false);
            (navigation as any).push('AddEditAddress', { addressId: undefined });
          }}
          onPincodeEnter={() => {
            setChooseLocationModalVisible(false);
            setPincodeModalVisible(true);
          }}
          onCurrentLocation={() => {
            setChooseLocationModalVisible(false);
            setPermissionModalVisible(true);
          }}
        />

        <EnterPincodeModal
          visible={pincodeModalVisible}
          onClose={() => setPincodeModalVisible(false)}
          onApply={(pincode) => {
            console.log('Pincode entered:', pincode);
            setPincodeModalVisible(false);
          }}
        />

        <LocationPermissionModal
          visible={permissionModalVisible}
          onClose={() => setPermissionModalVisible(false)}
          onTurnOn={() => {
            console.log('Location permission granted');
            setPermissionModalVisible(false);
            // Here you would actually request location permission
          }}
        />






        {/* BABY & KIDS FASHION – Clean Dynamic Section */}
        {(() => {
          // Row 1: Age Groups
          const AGE_GROUPS = [
            { img: girlsImages['g1'], label: "0–6\nMonths" },
            { img: girlsImages['g2'], label: "6–24\nMonths" },
            { img: girlsImages['g3'], label: "2–4\nYears" },
            { img: girlsImages['g4'], label: "4–6\nYears" },
            { img: girlsImages['g5'], label: "6–14\nYears" },
          ];

          // Row 2: Boys Age Groups
          const BOYS_AGE_GROUPS_ROW = [
            { img: boysImages['b1'], label: "0–6\nMonths" },
            { img: boysImages['b2'], label: "6–24\nMonths" },
            { img: boysImages['b3'], label: "2–4\nYears" },
            { img: boysImages['b4'], label: "4–6\nYears" },
            { img: boysImages['b5'], label: "6–14\nYears" },
          ];

          // Row 3: Winter Bottom
          const WINTER_BOTTOM = [
            { img: winterImages['1'], label: "Hoodies" },
            { img: winterImages['2'], label: "Full Sleeves" },
            { img: winterImages['3'], label: "Pullovers" },
            { img: winterImages['4'], label: "Coats" },
            { img: winterImages['5'], label: "Knits" },
          ];

          // Reusable Card Component
          const FashionCard = ({ item }: { item: { img: any; label: string } }) => (
            <Pressable
              style={{
                width: '18%',
                backgroundColor: '#DFF2FF',
                borderRadius: 18,
                overflow: 'hidden',
                alignItems: 'center',
                paddingBottom: 8,
              }}
              onPress={() => console.log('Pressed:', item.label)}
            >
              <Image
                source={item.img}
                style={{
                  width: '100%',
                  height: 90,
                  resizeMode: 'cover',
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                }}
              />
              <Text
                style={{
                  marginTop: 6,
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '700',
                  color: '#1A1A1A',
                  lineHeight: 16,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );

          return (
            <View style={{ marginTop: 17, marginBottom: 30 }}>
              {/* Heading */}
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '900',
                  textAlign: 'center',
                  marginBottom: 22,
                  color: '#000',
                }}
              >
                BABY & KIDS FASHION
              </Text>

              {/* ROW 1: Age Groups */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  marginBottom: 22,
                }}
              >
                {AGE_GROUPS.map((item, i) => (
                  <FashionCard key={i} item={item} />
                ))}
              </View>

              {/* ROW 2: Boys Age Groups */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  marginBottom: 22,
                }}
              >
                {BOYS_AGE_GROUPS_ROW.map((item, i) => (
                  <FashionCard key={i} item={item} />
                ))}
              </View>
            </View>
          );
        })()}

        {/* Categories */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { justifyContent: 'center' }]}>
            <ThemedText style={styles.sectionTitle}>Shop by Category</ThemedText>
          </View>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => {
              const imageSource = categoryImages[category.name as keyof typeof categoryImages];
              if (!imageSource) {
                console.warn(`Image not found for category: ${category.name}`);
              }
              return (
                <Pressable 
                  key={category.id}
                  onPress={() => (navigation as any).push('CategoryAggregator')}
                  style={styles.categoryItem}
                >
                  <View 
                    style={[
                      styles.categoryCard, 
                      { backgroundColor: category.color + '22' }
                    ]}
                  >
                    {imageSource && (
                      <View style={styles.categoryImageContainer}>
                        <Image 
                          source={imageSource}
                          style={styles.categoryImage}
                          resizeMode="cover"
                        />
                      </View>
                    )}
                  </View>
                  <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                </Pressable>
              );
            })}
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
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/birthday_gifts_items.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/electronics_tech_gadgets.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/moms_maternity_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/beauty_care_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/special_deals_sale.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_gear_products.png')}
                style={styles.trendingStoreCardImage}
                resizeMode="cover"
              />
            </Pressable>
            <Pressable style={styles.trendingStoreCard} onPress={() => (navigation as any).push('AgeWise')}>
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
              <Pressable style={styles.seasonsCardLarge} onPress={() => (navigation as any).push('AgeWise')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Hoodies›</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardSmall} onPress={() => (navigation as any).push('AgeWise')}>
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
              <Pressable style={styles.seasonsCardSmall} onPress={() => (navigation as any).push('AgeWise')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Winter Sets›</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardLarge} onPress={() => (navigation as any).push('AgeWise')}>
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
              <Pressable style={styles.seasonsCardMedium} onPress={() => (navigation as any).push('AgeWise')}>
                <Image 
                  source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <ThemedText style={styles.seasonsCardText}>Jackets›</ThemedText>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardMedium} onPress={() => (navigation as any).push('AgeWise')}>
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
                <Pressable style={styles.onesiesViewAllButton} onPress={() => (navigation as any).push('AgeWise')}>
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
            <Pressable style={styles.onesiesCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.onesiesCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.onesiesCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.onesiesCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.onesiesCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.onesiesCard} onPress={() => (navigation as any).push('AgeWise')}>
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
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Hoodies›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Sweater Vests›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Pullovers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Cardigans›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
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
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Denim›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Coats›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Bomber Jackets›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Puffer Jackets›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
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
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Thermal Pants›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_essentials_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Thermals Sets›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Base Layers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweatshirt_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Long Johns›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
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
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Stockings›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Gloves›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Scarves›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Hats›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
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
            <Pressable style={styles.coldWeatherPromoCard} onPress={() => (navigation as any).push('AgeWise')}>
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

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/baby_care_products.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Leggings›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_jacket_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Track Pants›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/winter_sweater_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Joggers›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
              <Image 
                source={require('../attached_assets/generated_images/thermal_innerwear_kids.png')}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <View style={styles.coldWeatherCardLabel}>
                <ThemedText style={styles.coldWeatherCardText}>Cargo Pants›</ThemedText>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => (navigation as any).push('AgeWise')}>
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
              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

              <Pressable style={styles.cozyCuteCard} onPress={() => (navigation as any).push('AgeWise')}>
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

        {/* Little Explorers Banner */}
        <Pressable onPress={() => (navigation as any).push('AgeWise')} style={styles.littleExplorersBannerContainer}>
          <Image 
            source={require('../attached_assets/Gemini_Generated_Image_xgkpipxgkpipxgkp_1764517163310.png')}
            style={styles.littleExplorersBannerImage}
            resizeMode="cover"
          />
        </Pressable>
      </ScreenScrollView>
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
    paddingTop: 0,
  },
  autoScrollBannersContainer: {
    height: 280,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  bannersScrollContent: {
    paddingHorizontal: 16,
    gap: 0,
  },
  autoBanner: {
    width: Dimensions.get('window').width - 32,
    height: 280,
    marginRight: 0,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  autoBannerImage: {
    width: '100%',
    height: '100%',
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
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
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
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
  },
  categoryImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
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
    paddingHorizontal: 12,
    gap: 12,
    justifyContent: 'space-between',
  },
  ageGroupItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 18,
  },
  ageGroupCard: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
    backgroundColor: '#87CEEB',
    borderRadius: 8,
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
  littleExplorersBannerContainer: {
    marginHorizontal: 0,
    marginTop: 4,
    marginBottom: 0,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  littleExplorersBannerImage: {
    width: '100%',
    height: 450,
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
    shadowColor: '#FF8C00',
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