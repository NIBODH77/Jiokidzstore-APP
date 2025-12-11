import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { 
  Gender, 
  AgeRange, 
  getCategoriesForGender, 
  getProductsByAgeGender,
  sortBySeasonPriority,
  getCurrentSeason,
  KIDS_FASHION_CATEGORIES,
  KidsFashionProduct
} from '@/data/kidsFashionData';
import { Spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

type RouteParams = {
  AgeGenderLanding: {
    gender: Gender;
    ageRange: AgeRange;
    color: string;
  };
};

export default function AgeGenderLandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, 'AgeGenderLanding'>>();
  const { gender, ageRange, color } = route.params;
  
  const currentSeason = getCurrentSeason();
  const categories = useMemo(() => getCategoriesForGender(gender), [gender]);
  const products = useMemo(() => {
    const filtered = getProductsByAgeGender(ageRange, gender);
    return sortBySeasonPriority(filtered);
  }, [ageRange, gender]);

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('KidsCategoryProducts', {
      gender,
      ageRange,
      category: categoryName,
    });
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const renderCategoryCard = ({ item }: { item: typeof KIDS_FASHION_CATEGORIES[0] }) => (
    <Pressable
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => handleCategoryPress(item.name)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Feather name="chevron-right" size={16} color="#666" />
    </Pressable>
  );

  const renderProductCard = ({ item }: { item: KidsFashionProduct }) => (
    <Pressable 
      style={styles.productCard}
      onPress={() => handleProductPress(item.product_id)}
    >
      <View style={styles.productImageContainer}>
        <View style={styles.productImagePlaceholder}>
          <Feather name="image" size={32} color="#CCC" />
        </View>
        {item.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
        {item.season === currentSeason && (
          <View style={styles.seasonBadge}>
            <Text style={styles.seasonText}>{currentSeason}</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={2}>{item.product_name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>₹{item.price}</Text>
          {item.original_price > item.price && (
            <Text style={styles.originalPrice}>₹{item.original_price}</Text>
          )}
        </View>
        <View style={styles.ratingRow}>
          <Feather name="star" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>{item.rating} ({item.reviews_count})</Text>
        </View>
      </View>
    </Pressable>
  );

  const seasonProducts = products.filter(p => p.season === currentSeason || p.season === 'All Season').slice(0, 6);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <LinearGradient
        colors={gender === 'Girls' ? ['#FF69B4', '#FFB6C1'] : ['#4169E1', '#87CEEB']}
        style={styles.heroBanner}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>{gender}</Text>
          <Text style={styles.heroSubtitle}>{ageRange}</Text>
          <Text style={styles.heroItemCount}>{products.length}+ Products Available</Text>
        </View>
        <View style={styles.heroDecor}>
          <Text style={styles.heroEmoji}>{gender === 'Girls' ? '👧' : '👦'}</Text>
        </View>
      </LinearGradient>

      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.breadcrumbLink}>Home</Text>
        </Pressable>
        <Feather name="chevron-right" size={14} color="#999" />
        <Text style={styles.breadcrumbLink}>Kids Fashion</Text>
        <Feather name="chevron-right" size={14} color="#999" />
        <Text style={styles.breadcrumbCurrent}>{gender} | {ageRange}</Text>
      </View>

      {/* Season Highlight */}
      <View style={styles.seasonSection}>
        <LinearGradient
          colors={currentSeason === 'Winter' ? ['#2C3E50', '#4CA1AF'] : ['#FF8C00', '#FFD93D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.seasonBanner}
        >
          <View>
            <Text style={styles.seasonBannerTitle}>
              {currentSeason === 'Winter' ? '❄️ Winter Collection' : '☀️ Summer Collection'}
            </Text>
            <Text style={styles.seasonBannerSubtitle}>
              Best picks for {currentSeason.toLowerCase()} - {ageRange} {gender}
            </Text>
          </View>
          <Pressable style={styles.seasonShopButton}>
            <Text style={styles.seasonShopButtonText}>Shop</Text>
          </Pressable>
        </LinearGradient>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: cat.color }]}
              onPress={() => handleCategoryPress(cat.name)}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Feather name="chevron-right" size={16} color="#666" />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {currentSeason} Picks for {ageRange}
          </Text>
          <Pressable onPress={() => handleCategoryPress('All')}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={seasonProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.product_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        />
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <View style={styles.recommendationsGrid}>
          {[
            { title: `More ${currentSeason} Wear`, subtitle: `for ${ageRange} ${gender}`, color: '#E8F5E9' },
            { title: 'Best for Parties', subtitle: 'Special Occasion', color: '#FCE4EC' },
            { title: 'Trending Now', subtitle: `${gender} Outfits`, color: '#E3F2FD' },
            { title: 'New Arrivals', subtitle: 'Latest Collection', color: '#FFF3E0' },
          ].map((rec, index) => (
            <Pressable key={index} style={[styles.recommendationCard, { backgroundColor: rec.color }]}>
              <Text style={styles.recommendationTitle}>{rec.title}</Text>
              <Text style={styles.recommendationSubtitle}>{rec.subtitle}</Text>
              <Feather name="arrow-right" size={18} color="#333" style={styles.recommendationArrow} />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroBanner: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
  },
  heroSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    opacity: 0.9,
    marginTop: 4,
  },
  heroItemCount: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    marginTop: 8,
  },
  heroDecor: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 40,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
    gap: 6,
  },
  breadcrumbLink: {
    fontSize: 12,
    color: '#FF8C00',
  },
  breadcrumbCurrent: {
    fontSize: 12,
    color: '#666',
  },
  seasonSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  seasonBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seasonBannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  seasonBannerSubtitle: {
    fontSize: 13,
    color: '#FFF',
    opacity: 0.9,
    marginTop: 4,
  },
  seasonShopButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  seasonShopButtonText: {
    fontWeight: '700',
    color: '#333',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: '600',
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  productsRow: {
    gap: 12,
    paddingRight: 16,
  },
  productCard: {
    width: 160,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 160,
    backgroundColor: '#EFEFEF',
    position: 'relative',
  },
  productImagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  seasonBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  seasonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  productInfo: {
    padding: 12,
  },
  productBrand: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: '#666',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recommendationCard: {
    width: (width - 44) / 2,
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  recommendationArrow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});
