
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated, RefreshControl } from 'react-native';
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

export default function WishlistScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
    navigation.navigate('HomeTab' as any, {
      screen: 'ProductDetail',
      params: { productId },
    });
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await wishlistStorage.removeFromWishlist(productId);
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const handleShopNow = () => {
    navigation.navigate('HomeTab' as any);
  };

  const handleClearAll = () => {
    // Clear all items from wishlist
    wishlist.forEach(async (item) => {
      await wishlistStorage.removeFromWishlist(item.id);
    });
    setWishlist([]);
  };

  // Empty State
  if (!loading && wishlist.length === 0) {
    return (
      <View style={styles.container}>
        {/* Header with gradient */}
        <LinearGradient
          colors={['#FF6B9D', '#FFA8C5']}
          style={[styles.header, { paddingTop: insets.top + 12 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedText style={styles.headerTitle}>My Wishlist</ThemedText>
          <ThemedText style={styles.headerSubtitle}>0 items</ThemedText>
        </LinearGradient>

        {/* Empty state content */}
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

  // Wishlist with items
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
          {wishlist.length > 0 && (
            <Pressable onPress={handleClearAll} style={styles.clearButton}>
              <Feather name="trash-2" size={18} color="#FFFFFF" />
              <ThemedText style={styles.clearText}>Clear All</ThemedText>
            </Pressable>
          )}
        </View>
      </LinearGradient>

      {/* Products Grid */}
      <ScreenFlatList
        data={wishlist}
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
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ProductCard
              product={{ ...item, isWishlisted: true }}
              onPress={() => handleProductPress(item.id)}
              onWishlistPress={() => handleRemoveFromWishlist(item.id)}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.statsCard}>
              <LinearGradient
                colors={['#FFE5EE', '#FFFFFF']}
                style={styles.statsGradient}
              >
                <Feather name="heart" size={24} color={Colors.light.primary} />
                <ThemedText style={styles.statsText}>
                  You have {wishlist.length} favorite {wishlist.length === 1 ? 'item' : 'items'}
                </ThemedText>
              </LinearGradient>
            </View>
            
            <Pressable onPress={handleShopNow} style={styles.continueButton}>
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
        )}
      />
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
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    gap: 6,
  },
  clearText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  statsCard: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.small,
  },
  statsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  statsText: {
    flex: 1,
    fontSize: 15,
    color: Colors.light.text,
    fontWeight: '500',
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
});
