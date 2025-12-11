import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Colors } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';
import type { RootState } from '@/store/store';
import { selectCartTotalItems } from '@/store/cartSlice';
import { categoryImages } from '@/data/mockData';

const localCategoryImages = {
  'Boy Fashion': require('../../attached_assets/generated_images/boys_casual_fashion_clothing.png'),
  'Girl Fashion': require('../../attached_assets/generated_images/girls_fashion_clothing.png'),
  'Footwear': require('../../attached_assets/generated_images/kids_footwear_shoes.png'),
  'Toys': require('../../attached_assets/generated_images/colorful_kids_toys.png'),
  'Diapers': require('../../attached_assets/generated_images/baby_diapers_products.png'),
  'Books': require('../../attached_assets/generated_images/colorful_children_books.png'),
  'Accessories': require('../../attached_assets/generated_images/kids_accessories_collection.png'),
  'Baby Care': require('../../attached_assets/generated_images/baby_care_products.png'),
};

const trendingStoreImages = [
  { id: '1', image: require('../../attached_assets/generated_images/luxury_diaper_promotional_banner.png'), title: 'Luxury Diapers' },
  { id: '2', image: require('../../attached_assets/generated_images/baby_skincare_products_banner.png'), title: 'Baby Skincare' },
  { id: '3', image: require('../../attached_assets/generated_images/baby_toys_promotional_banner.png'), title: 'Baby Toys' },
  { id: '4', image: require('../../attached_assets/generated_images/baby_clothing_collection_banner.png'), title: 'Baby Clothing' },
  { id: '5', image: require('../../attached_assets/generated_images/baby_feeding_essentials_banner.png'), title: 'Feeding Essentials' },
  { id: '6', image: require('../../attached_assets/generated_images/baby_bath_products_banner.png'), title: 'Bath Products' },
  { id: '7', image: require('../../attached_assets/generated_images/baby_stroller_gear_banner.png'), title: 'Baby Gear' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STATS = [
  { value: '50K+', label: 'Happy Parents' },
  { value: '100K+', label: 'Products' },
  { value: '4.8★', label: 'Rating' },
];

const FEATURES = [
  { title: 'Fast Delivery', subtitle: '24-48 hour shipping' },
  { title: '100% Safe', subtitle: 'Certified products' },
  { title: 'Best Brands', subtitle: 'Trusted quality' },
  { title: '24/7 Support', subtitle: 'Always here to help' },
];

const CATEGORIES = [
  { id: '1', name: 'Boy Fashion', emoji: '👦', bgColor: '#E3F2FD', itemCount: 245 },
  { id: '2', name: 'Girl Fashion', emoji: '👧', bgColor: '#FCE4EC', itemCount: 312 },
  { id: '3', name: 'Footwear', emoji: '👟', bgColor: '#FFF3E0', itemCount: 128 },
  { id: '4', name: 'Toys', emoji: '🧸', bgColor: '#F3E5F5', itemCount: 567 },
  { id: '5', name: 'Diapers', emoji: '🍼', bgColor: '#E8F5E9', itemCount: 89 },
  { id: '6', name: 'Books', emoji: '📚', bgColor: '#FFEBEE', itemCount: 201 },
  { id: '7', name: 'Accessories', emoji: '🎒', bgColor: '#E0F7FA', itemCount: 156 },
  { id: '8', name: 'Baby Care', emoji: '🐤', bgColor: '#FFF8E1', itemCount: 234 },
  { id: '9', name: 'Bedding', emoji: '🛏️', bgColor: '#E8EAF6', itemCount: 98 },
  { id: '10', name: 'Strollers', emoji: '🍼', bgColor: '#FBE9E7', itemCount: 45 },
  { id: '11', name: 'School Bags', emoji: '🎒', bgColor: '#E0F2F1', itemCount: 178 },
  { id: '12', name: 'Art Supplies', emoji: '🎨', bgColor: '#FFF9C4', itemCount: 245 },
  { id: '13', name: 'Bath', emoji: '🛁', bgColor: '#E1F5FE', itemCount: 134 },
  { id: '14', name: 'Sports', emoji: '⚽', bgColor: '#F1F8E9', itemCount: 189 },
  { id: '15', name: 'Electronics', emoji: '🎮', bgColor: '#EDE7F6', itemCount: 76 },
  { id: '16', name: 'Party', emoji: '🎉', bgColor: '#FFE0B2', itemCount: 112 },
  { id: '17', name: 'Feeding', emoji: '🍽️', bgColor: '#FFECB3', itemCount: 167 },
  { id: '18', name: 'Safety', emoji: '🔒', bgColor: '#C8E6C9', itemCount: 54 },
  { id: '19', name: 'Mom Care', emoji: '👩', bgColor: '#F8BBD9', itemCount: 98 },
  { id: '20', name: 'Gifts', emoji: '🎁', bgColor: '#FFCDD2', itemCount: 203 },
];

const COMPREHENSIVE_CATEGORIES = [
  { id: '1', name: 'Footwear', image: categoryImages['Footwear'] },
  { id: '2', name: 'Fashion Accessories', image: categoryImages['Fashion Accessories'] },
  { id: '3', name: 'Disney & Marvel', image: categoryImages['Disney & Marvel'] },
  { id: '4', name: 'Toys & Gaming', image: categoryImages['Toys & Gaming'] },
  { id: '5', name: 'Baby Gear', image: categoryImages['Baby Gear'] },
  { id: '6', name: 'Diapering & Potty', image: categoryImages['Diapering & Potty'] },
  { id: '7', name: 'Bath & Skin Care', image: categoryImages['Bath & Skin Care'] },
  { id: '8', name: 'Feeding & Nursing', image: categoryImages['Feeding & Nursing'] },
  { id: '9', name: 'Health & Safety', image: categoryImages['Health & Safety'] },
  { id: '10', name: 'Baby Nursery', image: categoryImages['Baby Nursery'] },
  { id: '11', name: 'Art & Hobbies', image: categoryImages['Art & Hobbies'] },
  { id: '12', name: 'Books', image: categoryImages['Books'] },
  { id: '13', name: 'School Supplies', image: categoryImages['School Supplies'] },
  { id: '14', name: 'Sports & Outdoor', image: categoryImages['Sports & Outdoor'] },
  { id: '15', name: 'Home & Living', image: categoryImages['Home & Living'] },
  { id: '16', name: 'Birthday & Gifts', image: categoryImages['Birthday & Gifts'] },
  { id: '17', name: 'Electronics & Tech', image: categoryImages['Electronics & Tech'] },
  { id: '18', name: 'Moms & Maternity', image: categoryImages['Moms & Maternity'] },
  { id: '19', name: 'Beauty & Care', image: categoryImages['Beauty & Care'] },
  { id: '20', name: 'Special Deals', image: categoryImages['Special Deals'] },
];

export default function JioKidsLandingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const cartCount = useSelector((state: RootState) => selectCartTotalItems(state.cart));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C00', '#FF8FB3', '#FFB8D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.locationText}>Delhi, India</Text>
          </View>
          
          <View style={styles.headerRight}>
            {/* Cart */}
            <Pressable style={styles.headerIconBtn} hitSlop={10}>
              <Feather name="shopping-cart" size={24} color="#FFFFFF" strokeWidth={1.5} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
            
            {/* Profile */}
            <Pressable 
              style={styles.headerIconBtn} 
              hitSlop={10}
              onPress={() => navigation.navigate('Profile' as never)}
            >
              <Feather name="user" size={24} color="#FFFFFF" strokeWidth={1.5} />
            </Pressable>

            {/* Notification */}
            <Pressable style={styles.headerIconBtn} hitSlop={10}>
              <Feather name="bell" size={24} color="#FFFFFF" strokeWidth={1.5} />
              <View style={styles.notificationBadge}>
                <View style={styles.badgeDot} />
              </View>
            </Pressable>
            
            {/* Wishlist */}
            <Pressable 
              style={styles.headerIconBtn} 
              hitSlop={10}
              onPress={() => navigation.navigate('Wishlist' as never)}
            >
              <Feather name="heart" size={24} color="#FFFFFF" strokeWidth={1.5} />
            </Pressable>
          </View>
        </View>

        <Text style={styles.welcomeTitle}>Welcome to JioKids</Text>
        <Text style={styles.welcomeSubtitle}>Shop for Kids Products</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          {STATS.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why JioKids?</Text>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIndicator} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Collections</Text>
          <View style={styles.featuredGrid}>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredEmoji}>👧</Text>
              <Text style={styles.featuredCardName}>Baby Girls Fashion</Text>
            </View>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredEmoji}>👦</Text>
              <Text style={styles.featuredCardName}>Baby Boys Fashion</Text>
            </View>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredEmoji}>❄️</Text>
              <Text style={styles.featuredCardName}>Winter Essentials</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <Pressable onPress={() => navigation.navigate('AgeWise')}>
              <Text style={styles.viewAllText}>Age-wise →</Text>
            </Pressable>
          </View>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <View 
                key={category.id} 
                style={[styles.categoryCard, { backgroundColor: category.bgColor }]}
              >
                <View style={styles.categoryIconContainer}>
                  <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.itemCount}+ Items</Text>
              </View>
            ))}
          </View>
        </View>

        <LinearGradient
          colors={['#B8F0E8', '#D4F5ED', '#E8FAF5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.parentingZoneContainer}
        >
          <View style={styles.parentingZoneTitleBadge}>
            <Text style={styles.parentingZoneTitle}>Parenting Zone</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.parentingZoneScrollContent}
          >
            <Pressable style={styles.parentingZoneCard} onPress={() => {}}>
              <View style={[styles.parentingCardImageContainer, { backgroundColor: '#FFA64D' }]}>
                <Text style={styles.parentingCardImage}>👶💤</Text>
              </View>
              <View style={styles.parentingCardLabelRow}>
                <Text style={styles.parentingCardName}>Baby Names</Text>
                <View style={styles.parentingCardArrowCircle}>
                  <Text style={styles.parentingCardArrow}>›</Text>
                </View>
              </View>
            </Pressable>
            
            <Pressable style={styles.parentingZoneCard} onPress={() => {}}>
              <View style={[styles.parentingCardImageContainer, { backgroundColor: '#4BA3FF' }]}>
                <Text style={styles.parentingCardImage}>🏆</Text>
              </View>
              <View style={styles.parentingCardLabelRow}>
                <Text style={styles.parentingCardName}>Contests</Text>
                <View style={styles.parentingCardArrowCircle}>
                  <Text style={styles.parentingCardArrow}>›</Text>
                </View>
              </View>
            </Pressable>
            
            <Pressable style={styles.parentingZoneCard} onPress={() => {}}>
              <View style={[styles.parentingCardImageContainer, { backgroundColor: '#FF8C00' }]}>
                <Text style={styles.parentingCardImage}>💬❓</Text>
              </View>
              <View style={styles.parentingCardLabelRow}>
                <Text style={styles.parentingCardName}>Q&A</Text>
                <View style={styles.parentingCardArrowCircle}>
                  <Text style={styles.parentingCardArrow}>›</Text>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </LinearGradient>

        {/* TRENDING Store Section */}
        <View style={styles.trendingStoreSection}>
          <View style={styles.trendingStoreTitleRow}>
            {/* Decorative snowflakes */}
            <Text style={styles.decorativeSnowflakeLeft}>❄</Text>
            <View style={styles.trendingTitleContainer}>
              <View style={styles.trendingLettersRow}>
                <Text style={[styles.trendingLetter, { color: '#5D3A1A' }]}>T</Text>
                <Text style={[styles.trendingLetter, { color: '#6B4423' }]}>R</Text>
                <Text style={[styles.trendingLetter, { color: '#7A4E2C' }]}>E</Text>
                <Text style={[styles.trendingLetter, { color: '#8B5A35' }]}>N</Text>
                <Text style={[styles.trendingLetter, { color: '#9C663E' }]}>D</Text>
                <Text style={[styles.trendingLetter, { color: '#AD7247' }]}>I</Text>
                <Text style={[styles.trendingLetter, { color: '#BE7E50' }]}>N</Text>
                <Text style={[styles.trendingLetter, { color: '#CF8A59' }]}>G</Text>
                <Text style={styles.storeText}>Store</Text>
              </View>
              <View style={styles.storeUnderline} />
            </View>
            <Text style={styles.decorativeSnowflakeRight}>❄</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingStoreScrollContent}
            pagingEnabled={false}
            decelerationRate="fast"
            snapToInterval={SCREEN_WIDTH * 0.82 + 12}
          >
            {trendingStoreImages.map((item) => (
              <Pressable key={item.id} style={styles.trendingStoreCard} onPress={() => {}}>
                <Image
                  source={item.image}
                  style={styles.trendingStoreImage}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Season's Special Section */}
        <View style={styles.seasonsSpecialSection}>
          <View style={styles.seasonsSpecialHeader}>
            <View style={styles.seasonsSpecialTitleContainer}>
              <Text style={styles.seasonsSpecialTitle}>Season's Special</Text>
              <Text style={styles.seasonsSpecialSubtitle}>Pick Your Winter Wardrobe Refresh Pieces</Text>
            </View>
            <View style={styles.startingPriceContainer}>
              <Text style={styles.startingText}>STARTING</Text>
              <Text style={styles.priceText}>₹199</Text>
            </View>
          </View>
          
          <View style={styles.seasonsSpecialGrid}>
            {/* Row 1 */}
            <View style={styles.seasonsRow}>
              <Pressable style={styles.seasonsCardLarge} onPress={() => {}}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=500&fit=crop' }}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <Text style={styles.seasonsCardLabelText}>Hoodies</Text>
                  <Text style={styles.seasonsCardArrow}>›</Text>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardSmall} onPress={() => {}}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=300&fit=crop' }}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <Text style={styles.seasonsCardLabelText}>Sweatshirts</Text>
                  <Text style={styles.seasonsCardArrow}>›</Text>
                </View>
              </Pressable>
            </View>

            {/* Row 2 */}
            <View style={styles.seasonsRow}>
              <Pressable style={styles.seasonsCardSmall} onPress={() => {}}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=300&fit=crop' }}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <Text style={styles.seasonsCardLabelText}>Winter Sets</Text>
                  <Text style={styles.seasonsCardArrow}>›</Text>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardLarge} onPress={() => {}}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=500&fit=crop' }}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <Text style={styles.seasonsCardLabelText}>Pullovers</Text>
                  <Text style={styles.seasonsCardArrow}>›</Text>
                </View>
              </Pressable>
            </View>

            {/* Row 3 */}
            <View style={styles.seasonsRow}>
              <Pressable style={styles.seasonsCardLarge} onPress={() => {}}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1502451885777-c0cbbb49c990?w=400&h=500&fit=crop' }}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <Text style={styles.seasonsCardLabelText}>Jackets</Text>
                  <Text style={styles.seasonsCardArrow}>›</Text>
                </View>
              </Pressable>
              <Pressable style={styles.seasonsCardSmall} onPress={() => {}}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=300&fit=crop' }}
                  style={styles.seasonsCardImage}
                  resizeMode="cover"
                />
                <View style={styles.seasonsCardLabel}>
                  <Text style={styles.seasonsCardLabelText}>Sweaters</Text>
                  <Text style={styles.seasonsCardArrow}>›</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Cold-Weather Essentials Section */}
        <View style={styles.coldWeatherSection}>
          <View style={styles.coldWeatherHeader}>
            <Text style={styles.coldWeatherTitle}>Cold-Weather Essentials</Text>
            <Text style={styles.coldWeatherSubtitle}>From Head to Toe: Winter Must-Haves</Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coldWeatherScrollContent}
          >
            <Pressable style={styles.coldWeatherCard} onPress={() => {}}>
              <View style={styles.coldWeatherImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=300&h=350&fit=crop' }}
                  style={styles.coldWeatherImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.coldWeatherLabelBox}>
                <Text style={styles.coldWeatherLabelText}>Hoodies›</Text>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => {}}>
              <View style={styles.coldWeatherImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=350&fit=crop' }}
                  style={styles.coldWeatherImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.coldWeatherLabelBox}>
                <Text style={styles.coldWeatherLabelText}>Sweatshirts›</Text>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => {}}>
              <View style={styles.coldWeatherImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1502451885777-c0cbbb49c990?w=300&h=350&fit=crop' }}
                  style={styles.coldWeatherImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.coldWeatherLabelBox}>
                <Text style={styles.coldWeatherLabelText}>Jackets›</Text>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => {}}>
              <View style={styles.coldWeatherImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300&h=350&fit=crop' }}
                  style={styles.coldWeatherImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.coldWeatherLabelBox}>
                <Text style={styles.coldWeatherLabelText}>Sweaters›</Text>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => {}}>
              <View style={styles.coldWeatherImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=350&fit=crop' }}
                  style={styles.coldWeatherImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.coldWeatherLabelBox}>
                <Text style={styles.coldWeatherLabelText}>Winter Sets›</Text>
              </View>
            </Pressable>

            <Pressable style={styles.coldWeatherCard} onPress={() => {}}>
              <View style={styles.coldWeatherImageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&h=350&fit=crop' }}
                  style={styles.coldWeatherImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.coldWeatherLabelBox}>
                <Text style={styles.coldWeatherLabelText}>Thermals›</Text>
              </View>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.allCategoriesSection}>
          <View style={styles.allCategoriesHeader}>
            <Text style={styles.allCategoriesTitle}>Shop by Category</Text>
          </View>
          <View style={styles.allCategoriesGrid}>
            {[
              '👟 Footwear',
              '👗 Fashion',
              '🏰 Disney & Marvel',
              '🎮 Toys & Gaming',
              '🍼 Baby Gear',
              '🧷 Diapering',
              '🛁 Bath & Skin',
              '🍴 Feeding',
              '❤️ Health & Safety',
              '🛏️ Nursery',
              '🎨 Art & Hobbies',
              '📚 Books',
              '✏️ School Supplies',
              '⚽ Sports',
              '🏠 Home Living',
              '🎁 Gifts',
              '📱 Electronics',
              '👶 Maternity',
              '💄 Beauty Care',
              '⭐ Special Deals'
            ].map((category, idx) => (
              <Pressable key={idx} style={styles.simpleCategoryCard} onPress={() => {}}>
                <Text style={styles.simpleCategoryName}>{category}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flex: 1,
  },
  locationText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    backgroundColor: '#FFE5D5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerContent: {
    paddingHorizontal: 4,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'left',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  featureIndicator: {
    width: 4,
    height: 40,
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 56) / 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryName: {
    fontSize: 10,
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 8,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 13,
    color: '#FF8C00',
    fontWeight: '600',
  },
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  featuredCard: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  featuredEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  featuredCardName: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  parentingZoneContainer: {
    marginHorizontal: 0,
    marginTop: 30,
    marginBottom: 0,
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  parentingZoneTitleBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  parentingZoneTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B5B5E',
    textAlign: 'center',
  },
  parentingZoneScrollContent: {
    paddingHorizontal: 16,
    gap: 14,
  },
  parentingZoneCard: {
    width: SCREEN_WIDTH * 0.42,
    alignItems: 'center',
  },
  parentingCardImageContainer: {
    width: SCREEN_WIDTH * 0.40,
    height: SCREEN_WIDTH * 0.36,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  parentingCardImage: {
    fontSize: 60,
  },
  parentingCardLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  parentingCardName: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
  },
  parentingCardArrowCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4BA3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentingCardArrow: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -1,
  },
  trendingStoreSection: {
    marginTop: 32,
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
    fontSize: 16,
    color: '#87CEEB',
    marginRight: 12,
    opacity: 0.7,
  },
  decorativeSnowflakeRight: {
    fontSize: 16,
    color: '#87CEEB',
    marginLeft: 12,
    opacity: 0.7,
  },
  trendingTitleContainer: {
    alignItems: 'center',
  },
  trendingLettersRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  trendingLetter: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  storeText: {
    fontSize: 28,
    color: '#3D8B8B',
    fontWeight: '600',
    fontStyle: 'italic',
    marginLeft: 4,
  },
  storeUnderline: {
    width: 65,
    height: 3,
    backgroundColor: '#3D8B8B',
    marginTop: 2,
    alignSelf: 'flex-end',
    marginRight: 0,
    borderRadius: 1.5,
  },
  trendingStoreScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  trendingStoreCard: {
    width: SCREEN_WIDTH * 0.82,
    height: SCREEN_WIDTH * 1.1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  trendingStoreImage: {
    width: '100%',
    height: '100%',
  },
  seasonsSpecialSection: {
    marginTop: 30,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
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
  },
  seasonsCardSmall: {
    flex: 0.8,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  seasonsCardLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  seasonsCardArrow: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 2,
  },
  coldWeatherSection: {
    marginTop: 30,
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  coldWeatherHeader: {
    marginBottom: 16,
    paddingRight: 16,
  },
  coldWeatherTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  coldWeatherSubtitle: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
  },
  coldWeatherScrollContent: {
    paddingRight: 16,
    gap: 12,
  },
  coldWeatherCard: {
    width: 140,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  coldWeatherImageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#F5F5F5',
  },
  coldWeatherImage: {
    width: '100%',
    height: '100%',
  },
  coldWeatherLabelBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 0,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  coldWeatherLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 14,
  },
  allCategoriesSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
  },
  allCategoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  allCategoriesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  viewAllLink: {
    fontSize: 13,
    color: '#FF8C00',
    fontWeight: '600',
  },
  allCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  simpleCategoryCard: {
    width: (SCREEN_WIDTH - 56) / 4,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleCategoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
});
