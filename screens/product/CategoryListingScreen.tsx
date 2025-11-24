import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { ProductCard } from '@/components/ProductCard';
import { Colors, Spacing } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';

export default function CategoryListingScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState(PRODUCTS);

  const handleProductPress = (productId: string) => {
    navigation.navigate('HomeTab' as any, {
      screen: 'HomeStack',
      params: {
        screen: 'ProductDetail',
        params: { productId }
      }
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

  return (
    <ScreenFlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.grid}
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
    />
  );
}

const styles = StyleSheet.create({
  grid: { padding: Spacing.sm },
  productItem: { width: '50%' },
});
