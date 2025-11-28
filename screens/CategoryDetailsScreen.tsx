import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemedText } from '@/components/ThemedText';
import { TopHeader } from '@/components/TopHeader';
import { useTheme } from '@/hooks/useTheme';
import { Spacing, BorderRadius, Colors } from '@/constants/theme';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import { Product } from '@/data/types';
import { ProductCardDetails } from '@/components/ProductCardDetails';

// Define the RootStackParamList type for navigation
type RootStackParamList = {
  CategoryDetails: { categoryName: string };
  // Add other screen names and their params if needed
};

type CategoryDetailsScreenProps = StackScreenProps<RootStackParamList, 'CategoryDetails'>;

const { width: screenWidth } = Dimensions.get('window');

// Function to chunk array into smaller arrays
const chunkArray = (array: any[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function CategoryDetailsScreen({ route }: CategoryDetailsScreenProps) {
  const { theme } = useTheme();
  const { categoryName } = route.params;

  // Filter products relevant to the category
  const categoryProducts = PRODUCTS.filter(product => product.category === categoryName);

  // Define section titles and prepare product data for each section
  const sections = [
    { title: "Top Picks", products: categoryProducts.slice(0, 8) },
    { title: "New Arrivals", products: categoryProducts.slice(8, 16) }, // Assuming enough mock data
    { title: "Trending Now", products: categoryProducts.slice(16, 24) },
    { title: "Best Value", products: categoryProducts.slice(24, 32) },
  ].filter(section => section.products.length > 0); // Only show sections with products

  // If not enough products for 8 per section, duplicate or show fewer
  const ensureEightProducts = (prods: Product[]): Product[] => {
    if (prods.length >= 8) return prods.slice(0, 8);
    // Duplicate existing products to ensure at least 8, if fewer are available
    const repeated = Array(8).fill(null).map((_, i) => prods[i % prods.length]).filter(Boolean) as Product[];
    return repeated.slice(0,8);
  };

  const sectionsWithEnoughProducts = sections.map(section => ({
    ...section,
    products: ensureEightProducts(section.products),
  }));

  const handleProductPress = (product: Product) => {
    // Navigate to product detail screen or perform other action
    console.log('Product pressed:', product.name);
  };

  const renderProductCarouselPage = ({ item }: { item: Product[] }) => (
    <View style={styles.carouselPage}>
      <View style={styles.carouselRow}>
        {item.slice(0, 4).map((product, index) => (
          <View key={product.id + '-row1-' + index} style={styles.productCardWrapper}>
            <ProductCardDetails product={product} onPress={handleProductPress} />
          </View>
        ))}
      </View>
      <View style={styles.carouselRow}>
        {item.slice(4, 8).map((product, index) => (
          <View key={product.id + '-row2-' + index} style={styles.productCardWrapper}>
            <ProductCardDetails product={product} onPress={handleProductPress} />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundRoot }}>
      <TopHeader showBackButton={true} />
      <ScrollView style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
        {/* Category Header */}
        <View style={styles.headerContainer}>
          <ThemedText type="h1" style={styles.categoryTitle}>{categoryName}</ThemedText>
          <ThemedText type="body" style={styles.categorySubtitle}>Explore top products in this category</ThemedText>
        </View>

      {/* Product Sections */}
      {sectionsWithEnoughProducts.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <ThemedText type="h2" style={styles.sectionTitle}>{section.title}</ThemedText>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={chunkArray(section.products, 8)} // Each page will now have 8 products (4x2 grid)
            renderItem={renderProductCarouselPage}
            keyExtractor={(item, idx) => `section-${index}-page-${idx}`}
            snapToInterval={screenWidth - Spacing.md * 2}
            decelerationRate="fast"
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      ))}
      <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  categorySubtitle: {
    fontSize: Typography.body.fontSize,
    color: Colors.light.textGray,
  },
  sectionContainer: {
    marginTop: Spacing.xl,
    // No horizontal padding here, it's handled by carouselPage and productCardWrapper
  },
  sectionTitle: {
    fontSize: Typography.h2.fontSize,
    fontWeight: Typography.h2.fontWeight,
    color: Colors.light.text,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md, // Add padding to align with carousel content
  },
  flatListContentContainer: {
    paddingHorizontal: Spacing.md, // Padding around the entire FlatList content
  },
  carouselPage: {
    width: screenWidth - Spacing.md * 2, // Width of one page, accounting for horizontal padding
    justifyContent: 'center',
  },
  carouselRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm, // Space between rows
  },
  productCardWrapper: {
    width: (screenWidth - Spacing.md * 2 - Spacing.sm * 3) / 4, // 4 cards + 3 spaces between them
  },
});
