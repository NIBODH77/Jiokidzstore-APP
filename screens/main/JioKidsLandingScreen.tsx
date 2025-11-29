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

const categoryImages = {
  'Boy Fashion': require('../../attached_assets/generated_images/boys_casual_fashion_clothing.png'),
  'Girl Fashion': require('../../attached_assets/generated_images/girls_fashion_clothing.png'),
  'Footwear': require('../../attached_assets/generated_images/kids_footwear_shoes.png'),
  'Toys': require('../../attached_assets/generated_images/colorful_kids_toys.png'),
  'Diapers': require('../../attached_assets/generated_images/baby_diapers_products.png'),
  'Books': require('../../attached_assets/generated_images/colorful_children_books.png'),
  'Accessories': require('../../attached_assets/generated_images/kids_accessories_collection.png'),
  'Baby Care': require('../../attached_assets/generated_images/baby_care_products.png'),
};

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
];

export default function JioKidsLandingScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const cartCount = useSelector((state: RootState) => selectCartTotalItems(state.cart));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#FF8FB3', '#FFB8D0']}
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
    gap: 12,
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 13,
    color: '#FF6B9D',
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
});
