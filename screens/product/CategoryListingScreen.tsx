import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { CleanProductCard } from '@/components/CleanProductCard';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';
import type { CategoriesStackParamList } from '@/navigation/CategoriesStackNavigator';

const SORT_OPTIONS = [
  { id: 'popularity', label: 'Popular' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

export default function CategoryListingScreen() {
  const navigation = useNavigation<NavigationProp<CategoriesStackParamList>>();
  const [products, setProducts] = useState(PRODUCTS);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'rating'>('popularity');

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, sortBy]);

  const handleSortChange = useCallback((option: typeof sortBy) => {
    setSortBy(option);
    setShowSortMenu(false);
  }, []);

  const handleProductPress = useCallback((productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  }, [navigation]);

  const handleWishlistToggle = useCallback(async (productId: string) => {
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
  }, [products]);

  const renderHeader = () => (
    <View style={styles.filterSortBar}>
      <View style={styles.resultCount}>
        <ThemedText style={styles.resultCountText}>{sortedProducts.length} Products</ThemedText>
      </View>
      <Pressable
        style={styles.sortButton}
        onPress={() => setShowSortMenu(!showSortMenu)}
      >
        <Feather name="sliders" size={16} color={Colors.light.text} />
        <ThemedText style={styles.sortButtonText}>Sort</ThemedText>
        <Feather name={showSortMenu ? 'chevron-up' : 'chevron-down'} size={16} color={Colors.light.textGray} />
      </Pressable>
      {showSortMenu && (
        <View style={styles.sortDropdown}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={[styles.sortOption, sortBy === option.id && styles.sortOptionActive]}
              onPress={() => handleSortChange(option.id as typeof sortBy)}
            >
              <ThemedText style={[styles.sortOptionText, sortBy === option.id && styles.sortOptionTextActive]}>
                {option.label}
              </ThemedText>
              {sortBy === option.id && (
                <Feather name="check" size={16} color={Colors.light.primary} />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScreenFlatList
      data={sortedProducts}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.grid}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <CleanProductCard
            product={{
              id: item.id,
              name: item.name,
              brand: item.brand,
              price: item.price,
              mrp: item.originalPrice,
              discount: item.originalPrice && item.price ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0,
              rating: item.rating,
              reviewCount: item.reviews,
              images: item.images,
              inStock: item.stock !== 0,
            }}
            onPress={() => handleProductPress(item.id)}
            onWishlistPress={() => handleWishlistToggle(item.id)}
            isWishlisted={item.isWishlisted}
            showRating={true}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  grid: { 
    padding: Spacing.sm,
    paddingTop: Spacing.md,
  },
  productItem: { width: '50%' },
  filterSortBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.light.backgroundRoot,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    position: 'relative',
  },
  resultCount: {
    flex: 1,
  },
  resultCountText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.textGray,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.light.backgroundRoot,
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.light.text,
  },
  sortDropdown: {
    position: 'absolute',
    top: '100%',
    right: Spacing.md,
    backgroundColor: Colors.light.backgroundRoot,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.sm,
    minWidth: 180,
    zIndex: 100,
    marginTop: Spacing.xs,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  sortOptionActive: {
    backgroundColor: Colors.light.secondary,
  },
  sortOptionText: {
    fontSize: 13,
    color: Colors.light.text,
  },
  sortOptionTextActive: {
    fontWeight: '600',
    color: Colors.light.primary,
  },
});

