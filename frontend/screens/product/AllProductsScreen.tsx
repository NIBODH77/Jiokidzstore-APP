import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { CleanProductCard } from '@/components/CleanProductCard';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const PRICE_RANGES = [
  { id: '0-500', label: '₹0 - ₹500' },
  { id: '500-1000', label: '₹500 - ₹1000' },
  { id: '1000-2000', label: '₹1000 - ₹2000' },
  { id: '2000+', label: '₹2000+' },
];

const RATINGS = [
  { id: '4plus', label: '4★ & up' },
  { id: '3plus', label: '3★ & up' },
];

export default function AllProductsScreen() {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [products, setProducts] = useState(PRODUCTS);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'rating'>('popularity');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedPriceRange) {
      filtered = filtered.filter(p => {
        if (selectedPriceRange === '0-500') return p.price <= 500;
        if (selectedPriceRange === '500-1000') return p.price > 500 && p.price <= 1000;
        if (selectedPriceRange === '1000-2000') return p.price > 1000 && p.price <= 2000;
        if (selectedPriceRange === '2000+') return p.price > 2000;
        return true;
      });
    }

    if (selectedRating) {
      filtered = filtered.filter(p => {
        if (selectedRating === '4plus') return p.rating >= 4;
        if (selectedRating === '3plus') return p.rating >= 3;
        return true;
      });
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, selectedPriceRange, selectedRating, sortBy]);

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

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSortBy('popularity');
    setShowFilters(false);
  };

  const hasActiveFilters = selectedPriceRange || selectedRating || sortBy !== 'popularity';

  // Header component for FlatList
  const renderHeader = () => (
    <>
      {/* Filter Header */}
      <View style={[styles.header, { marginTop: Spacing.lg }]}>
        <ThemedText style={styles.headerTitle}>All Products</ThemedText>
        <Pressable
          style={styles.sortButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather name={showFilters ? 'chevron-up' : 'filter'} size={20} color={Colors.light.primary} />
          <ThemedText style={styles.sortLabel}>Filter</ThemedText>
        </Pressable>
      </View>

      {/* Filter Panel - Collapsible */}
      {showFilters && (
        <View style={styles.filterPanel}>
          {/* Sort Options */}
          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Sort By</ThemedText>
            <View style={styles.filterOptions}>
              {(['popularity', 'price-low', 'price-high', 'rating'] as const).map(option => (
                <Pressable
                  key={option}
                  style={[styles.filterOption, sortBy === option && styles.filterOptionActive]}
                  onPress={() => setSortBy(option)}
                >
                  <ThemedText style={[styles.filterOptionText, sortBy === option && styles.filterOptionTextActive]}>
                    {option === 'popularity' ? 'Popular' : option === 'price-low' ? 'Price: Low to High' : option === 'price-high' ? 'Price: High to Low' : 'Top Rated'}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Price Range Filter */}
          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Price Range</ThemedText>
            <View style={styles.filterOptions}>
              {PRICE_RANGES.map(range => (
                <Pressable
                  key={range.id}
                  style={[styles.filterOption, selectedPriceRange === range.id && styles.filterOptionActive]}
                  onPress={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                >
                  <ThemedText style={[styles.filterOptionText, selectedPriceRange === range.id && styles.filterOptionTextActive]}>
                    {range.label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Rating Filter */}
          <View style={styles.filterSection}>
            <ThemedText style={styles.filterTitle}>Rating</ThemedText>
            <View style={styles.filterOptions}>
              {RATINGS.map(rating => (
                <Pressable
                  key={rating.id}
                  style={[styles.filterOption, selectedRating === rating.id && styles.filterOptionActive]}
                  onPress={() => setSelectedRating(selectedRating === rating.id ? null : rating.id)}
                >
                  <ThemedText style={[styles.filterOptionText, selectedRating === rating.id && styles.filterOptionTextActive]}>
                    {rating.label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Pressable style={styles.clearButton} onPress={clearFilters}>
              <ThemedText style={styles.clearButtonText}>Clear All Filters</ThemedText>
            </Pressable>
          )}
        </View>
      )}

      {/* Results Count */}
      {filteredProducts.length > 0 && (
        <View style={styles.resultInfo}>
          <ThemedText style={styles.resultText}>{filteredProducts.length} products found</ThemedText>
        </View>
      )}
    </>
  );

  // Empty state component
  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Feather name="inbox" size={48} color={Colors.light.textGray} />
      <ThemedText style={styles.emptyStateText}>No products found</ThemedText>
      <Pressable style={styles.resetButton} onPress={clearFilters}>
        <ThemedText style={styles.resetButtonText}>Reset Filters</ThemedText>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sticky Filter/Sort Bar */}
      <View style={styles.stickyFilterBar}>
        <View style={styles.stickyFilterLeft}>
          <ThemedText style={styles.productCountText}>
            {filteredProducts.length} Products
          </ThemedText>
        </View>
        <View style={styles.stickyFilterRight}>
          <Pressable
            style={[styles.stickyFilterButton, sortBy !== 'popularity' && styles.stickyFilterButtonActive]}
            onPress={() => {
              const sortOptions = ['popularity', 'price-low', 'price-high', 'rating'] as const;
              const currentIndex = sortOptions.indexOf(sortBy);
              const nextIndex = (currentIndex + 1) % sortOptions.length;
              setSortBy(sortOptions[nextIndex]);
            }}
          >
            <Feather name="bar-chart-2" size={16} color={sortBy !== 'popularity' ? Colors.light.primary : '#666666'} />
            <ThemedText style={[styles.stickyFilterButtonText, sortBy !== 'popularity' && styles.stickyFilterButtonTextActive]}>
              Sort
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.stickyFilterButton, hasActiveFilters && styles.stickyFilterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Feather name="sliders" size={16} color={hasActiveFilters ? Colors.light.primary : '#666666'} />
            <ThemedText style={[styles.stickyFilterButtonText, hasActiveFilters && styles.stickyFilterButtonTextActive]}>
              Filter
            </ThemedText>
            {hasActiveFilters && (
              <View style={styles.filterBadge}>
                <ThemedText style={styles.filterBadgeText}>
                  {(selectedPriceRange ? 1 : 0) + (selectedRating ? 1 : 0)}
                </ThemedText>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <ScreenFlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
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
      scrollEventThrottle={16}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  stickyFilterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  stickyFilterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  stickyFilterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stickyFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FAFAFA',
  },
  stickyFilterButtonActive: {
    borderColor: Colors.light.primary,
    backgroundColor: 'rgba(255, 107, 157, 0.08)',
  },
  stickyFilterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  stickyFilterButtonTextActive: {
    color: Colors.light.primary,
  },
  filterBadge: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  filterPanel: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: Spacing.sm,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
  },
  filterOptionActive: {
    borderColor: Colors.light.primary,
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
  },
  filterOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
  },
  filterOptionTextActive: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#FFF3E0',
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  resultInfo: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  resultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  grid: {
    padding: Spacing.sm,
  },
  columnWrapper: {
    gap: Spacing.sm,
  },
  productItem: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    minHeight: 400,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.textGray,
    marginTop: Spacing.md,
  },
  resetButton: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 6,
    backgroundColor: Colors.light.primary,
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
