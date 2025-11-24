import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';

const DEALS = [
  {
    id: 'flash-sale',
    title: 'Flash Sale',
    discount: 'Up to 60% OFF',
    endTime: '2 hours left',
    color1: '#FF6B9D',
    color2: '#FFA8C5',
  },
  {
    id: 'mega-deal',
    title: 'Mega Deal',
    discount: 'Buy 2 Get 1',
    endTime: '4 hours left',
    color1: '#9B59B6',
    color2: '#D8BFD8',
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    discount: 'Up to 40% OFF',
    endTime: 'Ongoing',
    color1: '#3498DB',
    color2: '#85C1E9',
  },
];

export default function DealsScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [products, setProducts] = useState(PRODUCTS);

  const handleProductPress = (productId: string) => {
    navigation.navigate('DealsTab', {
      screen: 'DealDetail',
      params: { productId }
    } as any);
  };

  const handleWishlistToggle = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const isWishlisted = await wishlistStorage.isInWishlist(productId);
      if (isWishlisted) {
        await wishlistStorage.removeFromWishlist(productId);
      } else {
        await wishlistStorage.addToWishlist(product);
      }
      setProducts(prev =>
        prev.map(p =>
          p.id === productId ? { ...p, isWishlisted: !isWishlisted } : p
        )
      );
    }
  };

  const trendingProducts = products.filter(p => p.isNew).slice(0, 8);

  return (
    <ScreenScrollView>
      {/* Deals Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Special Deals</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Limited time offers just for you</ThemedText>
      </View>

      {/* Deals Carousel */}
      <FlatList
        data={DEALS}
        renderItem={({ item }) => (
          <Pressable style={styles.dealCard}>
            <LinearGradient
              colors={[item.color1, item.color2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.dealGradient}
            >
              <View style={styles.dealContent}>
                <ThemedText style={styles.dealTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.dealDiscount}>{item.discount}</ThemedText>
                <View style={styles.timerBadge}>
                  <Feather name="clock" size={12} color="#FFFFFF" />
                  <ThemedText style={styles.timerText}>{item.endTime}</ThemedText>
                </View>
              </View>
              <Feather name="arrow-right" size={24} color="#FFFFFF" />
            </LinearGradient>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dealsContainer}
      />

      {/* Trending in Deals */}
      <View style={styles.trendingSection}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Trending Deals</ThemedText>
          <Pressable>
            <ThemedText style={styles.seeAll}>See All</ThemedText>
          </Pressable>
        </View>

        <FlatList
          data={trendingProducts}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item.id)}
              onWishlistPress={() => handleWishlistToggle(item.id)}
              isWishlisted={item.isWishlisted}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Brands on Sale */}
      <View style={styles.brandsSection}>
        <ThemedText style={styles.sectionTitle}>Brands on Sale</ThemedText>
        <View style={styles.brandsGrid}>
          {['FirstCry', 'Mothercare', 'EarthyBaby', 'Chicco'].map((brand, idx) => (
            <Pressable key={idx} style={styles.brandCard}>
              <LinearGradient
                colors={['#FFE5EE', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.brandGradient}
              >
                <ThemedText style={styles.brandName}>{brand}</ThemedText>
                <ThemedText style={styles.brandDiscount}>Up to 50%</ThemedText>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.light.textGray,
  },
  dealsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  dealCard: {
    width: 280,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  dealGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  dealContent: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  dealDiscount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: Spacing.md,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
  },
  timerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  trendingSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  columnWrapper: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  brandsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  brandCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  brandGradient: {
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  brandDiscount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});
