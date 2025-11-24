import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Colors, Spacing } from '@/constants/theme';
import { Product } from '@/data/types';
import { wishlistStorage } from '@/utils/storage';

export default function WishlistScreen() {
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!loading && wishlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.iconBox}>
          <Feather name="heart" size={50} color={Colors.light.primary} />
        </View>
        <ThemedText type="h2" style={styles.emptyTitle}>
          Your wishlist is empty
        </ThemedText>
        <ThemedText style={styles.emptySubtitle}>
          Save your favorite items here
        </ThemedText>
        <Button onPress={handleShopNow} style={styles.shopButton}>
          Start Shopping
        </Button>
      </View>
    );
  }

  return (
    <ScreenFlatList
      data={wishlist}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => (
        <View style={styles.productItem}>
          <ProductCard
            product={{ ...item, isWishlisted: true }}
            onPress={() => handleProductPress(item.id)}
            onWishlistPress={() => handleRemoveFromWishlist(item.id)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: Spacing.sm,
  },
  productItem: {
    width: '50%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    color: Colors.light.textGray,
    marginBottom: Spacing.xxl,
  },
  shopButton: {
    paddingHorizontal: Spacing.xxl * 2,
  },
});
