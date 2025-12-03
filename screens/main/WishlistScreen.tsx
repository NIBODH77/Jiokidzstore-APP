import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Pressable, Animated, RefreshControl, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { Product } from '@/data/types';
import { wishlistStorage } from '@/utils/storage';

type SortOption = 'date' | 'price-low' | 'price-high' | 'name';

export default function WishlistScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const items = await wishlistStorage.getWishlist();
      setWishlist(items);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWishlist();
    setRefreshing(false);
  };

  const handleProductPress = (productId: string) => {
    (navigation as any).navigate('ProductDetail', { productId });
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await wishlistStorage.removeFromWishlist(productId);
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const handleShopNow = () => {
    const parentNav = navigation.getParent() as any;
    if (parentNav) {
      parentNav.navigate('HomeTab');
    }
  };

  const handleContinueShopping = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      (parentNav as any).navigate('HomeTab');
    } else {
      (navigation as any).navigate('Home');
    }
  };

  const handleClearAll = async () => {
    Alert.alert(
      'Clear Wishlist',
      'Are you sure you want to remove all items from your wishlist?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Clear All',
          onPress: async () => {
            for (const item of wishlist) {
              await wishlistStorage.removeFromWishlist(item.id);
            }
            setWishlist([]);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleShareWishlist = () => {
    if (wishlist.length === 0) {
      Alert.alert('Empty Wishlist', 'Add items to your wishlist before sharing');
      return;
    }
    setShowShareModal(true);
  };

  const filteredAndSortedWishlist = useMemo(() => {
    let filtered = wishlist;

    if (searchQuery.trim()) {
      filtered = wishlist.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
        default:
          return 0;
      }
    });

    return sorted;
  }, [wishlist, searchQuery, sortBy]);

  const totalPrice = useMemo(() => {
    return filteredAndSortedWishlist.reduce((sum, item) => sum + item.price, 0);
  }, [filteredAndSortedWishlist]);

  const averagePrice = useMemo(() => {
    return filteredAndSortedWishlist.length > 0 ? totalPrice / filteredAndSortedWishlist.length : 0;
  }, [filteredAndSortedWishlist, totalPrice]);

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'name': return 'Name A-Z';
      case 'date': return 'Recently Added';
      default: return 'Sort by';
    }
  };

  // Empty state
  if (!loading && wishlist.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FF6B9D', '#FFA8C5']}
          style={[styles.header, { paddingTop: insets.top + 12 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedText style={styles.headerTitle}>My Wishlist</ThemedText>
          <ThemedText style={styles.headerSubtitle}>0 items</ThemedText>
        </LinearGradient>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <LinearGradient
              colors={['#FFE5EE', '#FFFFFF']}
              style={styles.emptyIconGradient}
            >
              <Feather name="heart" size={64} color={Colors.light.primary} />
            </LinearGradient>
          </View>
          
          <ThemedText type="h2" style={styles.emptyTitle}>
            Your wishlist is empty
          </ThemedText>
          <ThemedText style={styles.emptySubtitle}>
            Tap the heart icon on any product to save your favorites here
          </ThemedText>
          
          <Pressable onPress={handleShopNow} style={styles.shopNowButton}>
            <LinearGradient
              colors={['#FF6B9D', '#FF8FB3']}
              style={styles.shopNowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Feather name="shopping-bag" size={20} color="#FFFFFF" />
              <ThemedText style={styles.shopNowText}>Start Shopping</ThemedText>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={['#FF6B9D', '#FFA8C5']}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <ThemedText style={styles.headerTitle}>My Wishlist</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </ThemedText>
          </View>
          <View style={styles.headerActions}>
            {wishlist.length > 0 && (
              <>
                <Pressable onPress={handleShareWishlist} style={styles.iconButton}>
                  <Feather name="share-2" size={18} color="#FFFFFF" />
                </Pressable>
                <Pressable onPress={handleClearAll} style={[styles.iconButton, styles.clearIconButton]}>
                  <Feather name="trash-2" size={18} color="#FFFFFF" />
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color={Colors.light.textGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search wishlist..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
              <Feather name="x-circle" size={18} color="rgba(255,255,255,0.8)" />
            </Pressable>
          )}
        </View>

        {/* Sort & Filter Bar */}
        <View style={styles.filterContainer}>
          <Pressable 
            style={styles.sortButton}
            onPress={() => setShowSortMenu(!showSortMenu)}
          >
            <Feather name="sliders" size={16} color="#FFFFFF" />
            <ThemedText style={styles.sortButtonText}>{getSortLabel()}</ThemedText>
            <Feather name={showSortMenu ? "chevron-up" : "chevron-down"} size={16} color="#FFFFFF" />
          </Pressable>

          <View style={styles.totalPriceContainer}>
            <ThemedText style={styles.totalPriceLabel}>Total:</ThemedText>
            <ThemedText style={styles.totalPrice}>₹{totalPrice.toLocaleString()}</ThemedText>
          </View>
        </View>

        {/* Sort Menu Dropdown */}
        {showSortMenu && (
          <View style={styles.sortMenu}>
            {[
              { value: 'date' as SortOption, label: 'Recently Added', icon: 'clock' },
              { value: 'price-low' as SortOption, label: 'Price: Low to High', icon: 'trending-up' },
              { value: 'price-high' as SortOption, label: 'Price: High to Low', icon: 'trending-down' },
              { value: 'name' as SortOption, label: 'Name A-Z', icon: 'type' },
            ].map((option) => (
              <Pressable
                key={option.value}
                style={[styles.sortOption, sortBy === option.value && styles.sortOptionActive]}
                onPress={() => {
                  setSortBy(option.value);
                  setShowSortMenu(false);
                }}
              >
                <Feather name={option.icon as any} size={16} color={sortBy === option.value ? Colors.light.primary : "#FFFFFF"} />
                <ThemedText style={[
                  styles.sortOptionText,
                  sortBy === option.value && styles.sortOptionTextActive
                ]}>
                  {option.label}
                </ThemedText>
                {sortBy === option.value && (
                  <Feather name="check" size={16} color={Colors.light.primary} />
                )}
              </Pressable>
            ))}
          </View>
        )}
      </LinearGradient>

      {/* Products Grid */}
      <ScreenFlatList
        data={filteredAndSortedWishlist}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
            colors={[Colors.light.primary]}
          />
        }
        ListEmptyComponent={
          searchQuery.trim() ? (
            <View style={styles.noResultsContainer}>
              <Feather name="search" size={48} color={Colors.light.textGray} />
              <ThemedText style={styles.noResultsText}>No items match your search</ThemedText>
              <Pressable onPress={() => setSearchQuery('')} style={styles.clearFiltersButton}>
                <ThemedText style={styles.clearFiltersText}>Clear Search</ThemedText>
              </Pressable>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ProductCard
              product={{ ...item, isWishlisted: true }}
              onPress={() => handleProductPress(item.id)}
              onWishlistPress={() => handleRemoveFromWishlist(item.id)}
            />
          </View>
        )}
        ListFooterComponent={() => filteredAndSortedWishlist.length > 0 ? (
          <View style={styles.footer}>
            {/* Summary Stats Card */}
            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['#FFE5EE', '#FFFFFF']}
                style={styles.summaryGradient}
              >
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Feather name="heart" size={20} color={Colors.light.primary} />
                    <ThemedText style={styles.summaryLabel}>Items</ThemedText>
                    <ThemedText style={styles.summaryValue}>{filteredAndSortedWishlist.length}</ThemedText>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.summaryItem}>
                    <Feather name="tag" size={20} color={Colors.light.primary} />
                    <ThemedText style={styles.summaryLabel}>Total</ThemedText>
                    <ThemedText style={styles.summaryValue}>₹{totalPrice.toLocaleString()}</ThemedText>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.summaryItem}>
                    <Feather name="trending-down" size={20} color={Colors.light.primary} />
                    <ThemedText style={styles.summaryLabel}>Average</ThemedText>
                    <ThemedText style={styles.summaryValue}>₹{Math.round(averagePrice).toLocaleString()}</ThemedText>
                  </View>
                </View>
              </LinearGradient>
            </View>
            
            <Pressable onPress={handleContinueShopping} style={styles.continueButton}>
              <LinearGradient
                colors={['#FF6B9D', '#FF8FB3']}
                style={styles.continueGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <ThemedText style={styles.continueText}>Continue Shopping</ThemedText>
                <Feather name="arrow-right" size={20} color="#FFFFFF" />
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}
      />

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowShareModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.shareModal}>
            <View style={styles.shareHeader}>
              <ThemedText style={styles.shareTitle}>Share Wishlist</ThemedText>
              <Pressable onPress={() => setShowShareModal(false)}>
                <Feather name="x" size={24} color={Colors.light.text} />
              </Pressable>
            </View>

            <View style={styles.shareOptions}>
              <Pressable style={styles.shareOption}>
                <LinearGradient
                  colors={['#FF6B9D', '#FF8FB3']}
                  style={styles.shareOptionGradient}
                >
                  <Feather name="message-circle" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.shareOptionText}>Message</ThemedText>
                </LinearGradient>
              </Pressable>

              <Pressable style={styles.shareOption}>
                <LinearGradient
                  colors={['#3498DB', '#5DADE2']}
                  style={styles.shareOptionGradient}
                >
                  <Feather name="share-2" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.shareOptionText}>Share</ThemedText>
                </LinearGradient>
              </Pressable>

              <Pressable style={styles.shareOption}>
                <LinearGradient
                  colors={['#27AE60', '#52BE80']}
                  style={styles.shareOptionGradient}
                >
                  <Feather name="copy" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.shareOptionText}>Copy Link</ThemedText>
                </LinearGradient>
              </Pressable>
            </View>

            <Pressable onPress={() => setShowShareModal(false)} style={styles.closeButton}>
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundDefault,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    ...Shadows.medium,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  grid: {
    padding: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  productItem: {
    width: '50%',
    padding: Spacing.xs,
  },
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    paddingTop: Spacing.xxl * 2,
  },
  emptyIconContainer: {
    marginBottom: Spacing.xl,
  },
  emptyIconGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  emptyTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    color: Colors.light.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: Colors.light.textGray,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  shopNowButton: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    ...Shadows.large,
  },
  shopNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.sm,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Footer Styles
  footer: {
    padding: Spacing.md,
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  summaryCard: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.small,
  },
  summaryGradient: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.light.textGray,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.primary,
    marginTop: Spacing.xs,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.light.border,
  },
  continueButton: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
    ...Shadows.large,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md + 2,
    gap: Spacing.sm,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: Spacing.sm,
  },
  clearSearchButton: {
    padding: Spacing.xs,
  },

  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
    flex: 1,
  },
  sortButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  totalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    gap: 6,
  },
  totalPriceLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
  },
  totalPrice: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  sortMenu: {
    marginTop: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.sm,
    padding: Spacing.xs,
    gap: Spacing.xs,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    gap: Spacing.sm,
  },
  sortOptionActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  sortOptionText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  sortOptionTextActive: {
    color: Colors.light.primary,
    fontWeight: '700',
  },

  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl * 2,
    paddingHorizontal: Spacing.xl,
  },
  noResultsText: {
    color: Colors.light.textGray,
    fontSize: 16,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  clearFiltersButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    ...Shadows.small,
  },
  clearFiltersText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // Share Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  shareModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  shareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  shareOptions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  shareOption: {
    flex: 1,
    height: 100,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  shareOptionGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  shareOptionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.light.backgroundDefault,
  },
  closeButtonText: {
    textAlign: 'center',
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
