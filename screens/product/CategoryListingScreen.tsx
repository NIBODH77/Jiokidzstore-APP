import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { CleanProductCard } from '@/components/CleanProductCard';
import { Colors, Spacing } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';
import type { CategoriesStackParamList } from '@/navigation/CategoriesStackNavigator';

export default function CategoryListingScreen() {
  const navigation = useNavigation<NavigationProp<CategoriesStackParamList>>();
  const [products, setProducts] = useState(PRODUCTS);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
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

  return (
    <ScreenFlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.grid, { paddingTop: Spacing.lg }]}
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
  grid: { padding: Spacing.sm },
  productItem: { width: '50%' },
});

