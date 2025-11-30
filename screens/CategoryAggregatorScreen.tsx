import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { TopHeader } from '@/components/TopHeader';
import { ProductCard } from '@/components/ProductCard';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { wishlistStorage } from '@/utils/storage';
import type { CategoriesStackParamList } from '@/navigation/CategoriesStackNavigator';

// Placeholder for ad images
const AD_IMAGES = [
  'https://via.placeholder.com/600x200/FF5733/FFFFFF?text=Ad+Banner+1',
  'https://via.placeholder.com/600x200/33FF57/FFFFFF?text=Ad+Banner+2',
  'https://via.placeholder.com/600x200/3357FF/FFFFFF?text=Ad+Banner+3',
];

export default function CategoryAggregatorScreen() {
  const navigation = useNavigation<NavigationProp<CategoriesStackParamList>>(); // Use CategoriesStackParamList for consistency

  const [allProducts, setAllProducts] = useState(PRODUCTS);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      const updatedProducts = await Promise.all(
        PRODUCTS.map(async (p) => {
          const isWishlisted = await wishlistStorage.isInWishlist(p.id);
          return { ...p, isWishlisted };
        })
      );
      setAllProducts(updatedProducts);
    };
    checkWishlistStatus();
  }, []);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleWishlistToggle = async (productId: string) => {
    setAllProducts(prevProducts => {
      const productToToggle = prevProducts.find(p => p.id === productId);
      if (productToToggle) {
        const newWishlistedStatus = !productToToggle.isWishlisted;
        if (newWishlistedStatus) {
          wishlistStorage.addToWishlist(productToToggle);
        } else {
          wishlistStorage.removeFromWishlist(productId);
        }
        return prevProducts.map(p =>
          p.id === productId ? { ...p, isWishlisted: newWishlistedStatus } : p
        );
      }
      return prevProducts;
    });
  };

  // Select 5 categories (you can customize this logic)
  // For simplicity, taking the first 5 available categories.
  const categoriesToDisplay = CATEGORIES.slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <TopHeader showBackButton={true} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Ad Section Placeholder */}
        <View style={styles.adBannerContainer}>
          <Image source={{ uri: AD_IMAGES[0] }} style={styles.adBannerImage} />
          {/* In a real app, this would be a carousel or dynamic ad */}
        </View>

        {/* 5 Category Sections */}
        {categoriesToDisplay.map((category) => {
          const categoryProducts = allProducts
            .filter((product) => product.category === category.name)
            .slice(0, 4);

          if (categoryProducts.length === 0) {
            return null;
          }

          return (
            <View key={category.id} style={styles.categorySection}>
              <ThemedText style={styles.categoryTitle}>{category.name}</ThemedText>
              <View style={styles.productGrid}>
                {categoryProducts.map((product) => (
                  <View key={product.id} style={styles.productItem}>
                    <ProductCard
                      product={product}
                      onPress={() => handleProductPress(product.id)}
                      onWishlistPress={() => handleWishlistToggle(product.id)}
                      isWishlisted={product.isWishlisted}
                    />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: Spacing.lg,
  },
  adBannerContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: -Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  adBannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categorySection: {
    marginBottom: Spacing.xl,
    marginTop: -Spacing.md,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  productItem: {
    width: '48%', // Roughly 2 items per row with spacing
    marginBottom: Spacing.md,
  },
});
