import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { ThemedText } from '@/components/ThemedText';
import { ProductCard } from '@/components/ProductCard';
import { Colors, Spacing } from '@/constants/theme';
import { PRODUCTS } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';

export default function FlashSaleScreen() {
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
      ListHeaderComponent={
        <View style={styles.header}>
          <ThemedText type="h2" style={styles.title}>Flash Sale</ThemedText>
          <ThemedText style={styles.subtitle}>Up to 60% OFF - Limited Time!</ThemedText>
        </View>
      }
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
  header: { padding: Spacing.lg },
  title: { color: Colors.light.primary },
  subtitle: { color: Colors.light.textGray, marginTop: 4 },
  grid: { padding: Spacing.sm },
  productItem: { width: '50%' },
});
