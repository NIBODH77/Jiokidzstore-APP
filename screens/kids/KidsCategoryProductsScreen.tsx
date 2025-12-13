import React, { useState, useMemo, useCallback } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Pressable, 
  FlatList, Modal, Dimensions, TextInput 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { 
  Gender, 
  AgeRange, 
  getProductsByCategory,
  getProductsByAgeGender,
  sortBySeasonPriority,
  getCurrentSeason,
  KIDS_FASHION_CATEGORIES,
  PRICE_RANGES,
  SORT_OPTIONS,
  getUniqueBrands,
  getUniqueColors,
  KidsFashionProduct
} from '@/data/kidsFashionData';
import { Spacing } from '@/constants/theme';
import { CleanProductCard } from '@/components/CleanProductCard';

const { width } = Dimensions.get('window');

type RouteParams = {
  KidsCategoryProducts: {
    gender: Gender;
    ageRange: AgeRange;
    category: string;
  };
};

export default function KidsCategoryProductsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, 'KidsCategoryProducts'>>();
  const { gender, ageRange, category } = route.params;
  
  const currentSeason = getCurrentSeason();
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = useMemo(() => {
    if (category === 'All') {
      return getProductsByAgeGender(ageRange, gender);
    }
    return getProductsByCategory(ageRange, gender, category);
  }, [ageRange, gender, category]);

  const brands = useMemo(() => getUniqueBrands(allProducts), [allProducts]);
  const colors = useMemo(() => getUniqueColors(allProducts), [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    
    if (searchQuery) {
      result = result.filter(p => 
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedPriceRange) {
      const range = PRICE_RANGES.find(r => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    
    if (selectedSeason) {
      result = result.filter(p => p.season === selectedSeason || p.season === 'All Season');
    }
    
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        result = sortBySeasonPriority(result);
    }
    
    return result;
  }, [allProducts, searchQuery, selectedPriceRange, selectedBrands, selectedSeason, sortBy]);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setSelectedBrands([]);
    setSelectedSeason(null);
    setSearchQuery('');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedPriceRange) count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (selectedSeason) count++;
    return count;
  }, [selectedPriceRange, selectedBrands, selectedSeason]);

  const renderProductCard = ({ item }: { item: KidsFashionProduct }) => (
    <View style={styles.productCardWrapper}>
      <CleanProductCard
        product={{
          id: item.product_id,
          name: item.product_name,
          brand: item.brand,
          price: item.price,
          mrp: item.original_price,
          discount: item.discount,
          rating: item.rating,
          reviewCount: item.reviews_count,
          images: item.images || [],
          inStock: item.in_stock,
        }}
        onPress={() => handleProductPress(item.product_id)}
        showRating={true}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>{category}</Text>
            <Text style={styles.headerSubtitle}>{gender} | {ageRange}</Text>
          </View>
          <Text style={styles.productCount}>{filteredProducts.length} Products</Text>
        </View>
        
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbLink}>Home</Text>
          <Feather name="chevron-right" size={12} color="#999" />
          <Text style={styles.breadcrumbLink}>Kids</Text>
          <Feather name="chevron-right" size={12} color="#999" />
          <Text style={styles.breadcrumbLink}>{gender}</Text>
          <Feather name="chevron-right" size={12} color="#999" />
          <Text style={styles.breadcrumbLink}>{ageRange}</Text>
          <Feather name="chevron-right" size={12} color="#999" />
          <Text style={styles.breadcrumbCurrent}>{category}</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in this category..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Feather name="x" size={18} color="#999" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Season Banner */}
      <LinearGradient
        colors={currentSeason === 'Winter' ? ['#1E3A5F', '#4A90A4'] : ['#FF8C00', '#FFB74D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.seasonInfoBanner}
      >
        <Text style={styles.seasonInfoIcon}>{currentSeason === 'Winter' ? '❄️' : '☀️'}</Text>
        <Text style={styles.seasonInfoText}>
          {currentSeason} products shown first • Other seasons below
        </Text>
      </LinearGradient>

      {/* Filter/Sort Bar */}
      <View style={styles.filterBar}>
        <Pressable style={styles.filterButton} onPress={() => setShowSort(true)}>
          <Feather name="sliders" size={16} color="#333" />
          <Text style={styles.filterButtonText}>Sort</Text>
          <Feather name="chevron-down" size={14} color="#333" />
        </Pressable>
        
        <Pressable 
          style={[styles.filterButton, activeFiltersCount > 0 && styles.filterButtonActive]} 
          onPress={() => setShowFilters(true)}
        >
          <Feather name="filter" size={16} color={activeFiltersCount > 0 ? '#FF8C00' : '#333'} />
          <Text style={[styles.filterButtonText, activeFiltersCount > 0 && styles.filterButtonTextActive]}>
            Filter {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
          </Text>
        </Pressable>

        {activeFiltersCount > 0 && (
          <Pressable style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        )}
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.product_id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={styles.productsRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="package" size={48} color="#CCC" />
            <Text style={styles.emptyStateTitle}>No products found</Text>
            <Text style={styles.emptyStateSubtitle}>Try adjusting your filters</Text>
          </View>
        }
      />

      {/* Sort Modal */}
      <Modal visible={showSort} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowSort(false)}>
          <View style={styles.sortModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <Pressable onPress={() => setShowSort(false)}>
                <Feather name="x" size={24} color="#333" />
              </Pressable>
            </View>
            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                style={[styles.sortOption, sortBy === option.id && styles.sortOptionActive]}
                onPress={() => { setSortBy(option.id); setShowSort(false); }}
              >
                <Text style={[styles.sortOptionText, sortBy === option.id && styles.sortOptionTextActive]}>
                  {option.label}
                </Text>
                {sortBy === option.id && <Feather name="check" size={20} color="#FF8C00" />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Filter Modal */}
      <Modal visible={showFilters} transparent animationType="slide">
        <View style={styles.filterModalContainer}>
          <View style={styles.filterModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <Pressable onPress={() => setShowFilters(false)}>
                <Feather name="x" size={24} color="#333" />
              </Pressable>
            </View>
            
            <ScrollView style={styles.filterContent}>
              {/* Price Range */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price Range</Text>
                <View style={styles.filterOptions}>
                  {PRICE_RANGES.map((range) => (
                    <Pressable
                      key={range.id}
                      style={[styles.filterChip, selectedPriceRange === range.id && styles.filterChipActive]}
                      onPress={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                    >
                      <Text style={[styles.filterChipText, selectedPriceRange === range.id && styles.filterChipTextActive]}>
                        {range.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Season */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Season</Text>
                <View style={styles.filterOptions}>
                  {['Summer', 'Winter', 'All Season'].map((season) => (
                    <Pressable
                      key={season}
                      style={[styles.filterChip, selectedSeason === season && styles.filterChipActive]}
                      onPress={() => setSelectedSeason(selectedSeason === season ? null : season)}
                    >
                      <Text style={[styles.filterChipText, selectedSeason === season && styles.filterChipTextActive]}>
                        {season}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Brands */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Brands</Text>
                <View style={styles.filterOptions}>
                  {brands.map((brand) => (
                    <Pressable
                      key={brand}
                      style={[styles.filterChip, selectedBrands.includes(brand) && styles.filterChipActive]}
                      onPress={() => toggleBrand(brand)}
                    >
                      <Text style={[styles.filterChipText, selectedBrands.includes(brand) && styles.filterChipTextActive]}>
                        {brand}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.filterActions}>
              <Pressable style={styles.clearFiltersButton} onPress={clearFilters}>
                <Text style={styles.clearFiltersButtonText}>Clear All</Text>
              </Pressable>
              <Pressable style={styles.applyFiltersButton} onPress={() => setShowFilters(false)}>
                <Text style={styles.applyFiltersButtonText}>Apply ({filteredProducts.length} items)</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: Spacing.md,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  productCount: {
    fontSize: 13,
    color: '#666',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
    flexWrap: 'wrap',
  },
  breadcrumbLink: {
    fontSize: 11,
    color: '#FF8C00',
  },
  breadcrumbCurrent: {
    fontSize: 11,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  seasonInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  seasonInfoIcon: {
    fontSize: 16,
  },
  seasonInfoText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    gap: 6,
  },
  filterButtonActive: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFF5EC',
  },
  filterButtonText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#FF8C00',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 13,
    color: '#FF8C00',
    fontWeight: '500',
  },
  productsGrid: {
    padding: 8,
    paddingBottom: 100,
  },
  productsRow: {
    justifyContent: 'space-between',
  },
  productCardWrapper: {
    width: (width - 24) / 2,
    marginBottom: 8,
  },
  productCard: {
    width: (width - 24) / 2,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 180,
    backgroundColor: '#F0F0F0',
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
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  seasonText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    padding: 10,
  },
  productBrand: {
    fontSize: 11,
    color: '#888',
    fontWeight: '600',
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
    lineHeight: 16,
    height: 32,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountLabel: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  ratingNumber: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  reviewsText: {
    fontSize: 10,
    color: '#888',
  },
  sizesRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 4,
    flexWrap: 'wrap',
  },
  sizeChip: {
    fontSize: 9,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  moreSizes: {
    fontSize: 9,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sortModal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  sortOptionActive: {
    backgroundColor: '#FFF5EC',
  },
  sortOptionText: {
    fontSize: 15,
    color: '#333',
  },
  sortOptionTextActive: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  filterModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  filterChipActive: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFF5EC',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
  },
  filterChipTextActive: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  filterActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    gap: 12,
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  clearFiltersButtonText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  applyFiltersButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
  },
  applyFiltersButtonText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: '700',
  },
});
