import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { ProductCard } from '@/components/ProductCard';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';

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
  const navigation = useNavigation();
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
    navigation.navigate('HomeTab' as any, {
      screen: 'HomeStack',
      params: {
        screen: 'ProductDetail',
        params: { productId }
      }
    } as any);
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
      <View style={styles.header}>
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
      <Feather name="inbox" size={48} color={Colors.light.textSecondary} />
      <ThemedText style={styles.emptyStateText}>No products found</ThemedText>
      <Pressable style={styles.resetButton} onPress={clearFilters}>
        <ThemedText style={styles.resetButtonText}>Reset Filters</ThemedText>
      </Pressable>
    </View>
  );

  return (
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
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item.id)}
            onWishlistPress={() => handleWishlistToggle(item.id)}
            isWishlisted={item.isWishlisted}
          />
        </View>
      )}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#FFE5EE',
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
    color: Colors.light.textSecondary,
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
