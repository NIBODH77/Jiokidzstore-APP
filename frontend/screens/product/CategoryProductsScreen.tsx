import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS, CATEGORIES } from '@/data/mockData';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

type CategoryProductsRouteProp = RouteProp<HomeStackParamList, 'CategoryProducts'>;

export default function CategoryProductsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<CategoryProductsRouteProp>();
  const insets = useSafeAreaInsets();
  
  const { categoryName } = route.params;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const productCategory = product.category?.toLowerCase() || '';
      const searchCategory = categoryName.toLowerCase();
      return productCategory.includes(searchCategory) || 
             searchCategory.includes(productCategory.split(' ')[0]);
    });
  }, [categoryName]);

  const handleProductPress = (productId: string) => {
    navigation.push('ProductDetail', { productId });
  };

  const renderProduct = ({ item }: { item: typeof PRODUCTS[0] }) => {
    const discountPercentage = item.mrp ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
    
    return (
      <Pressable 
        style={styles.productCard}
        onPress={() => handleProductPress(item.id)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              item.images && item.images.length > 0
                ? typeof item.images[0] === 'string'
                  ? { uri: item.images[0] }
                  : item.images[0]
                : require('../../attached_assets/generated_images/toddler_boy_navy_outfit.png')
            }
            style={styles.productImage}
            resizeMode="cover"
          />
          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <ThemedText style={styles.discountText}>{discountPercentage}% OFF</ThemedText>
            </View>
          )}
        </View>
        <View style={styles.productInfo}>
          <ThemedText style={styles.brand} numberOfLines={1}>{item.brand}</ThemedText>
          <ThemedText style={styles.productName} numberOfLines={2}>{item.name}</ThemedText>
          <View style={styles.priceRow}>
            <ThemedText style={styles.price}>₹{item.price}</ThemedText>
            {item.mrp && item.mrp > item.price && (
              <ThemedText style={styles.mrp}>₹{item.mrp}</ThemedText>
            )}
          </View>
          <View style={styles.ratingRow}>
            <Feather name="star" size={12} color="#FFC107" />
            <ThemedText style={styles.rating}>{item.rating}</ThemedText>
            <ThemedText style={styles.reviewCount}>({item.reviewCount})</ThemedText>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#1F2937" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>{categoryName}</ThemedText>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}>
            <Feather name="search" size={22} color="#1F2937" />
          </Pressable>
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <ThemedText style={styles.resultsCount}>
          {filteredProducts.length} Products Found
        </ThemedText>
        <Pressable style={styles.filterButton}>
          <Feather name="sliders" size={16} color="#FF8C00" />
          <ThemedText style={styles.filterText}>Filter</ThemedText>
        </Pressable>
      </View>

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Feather name="package" size={64} color="#D1D5DB" />
          <ThemedText style={styles.emptyTitle}>No Products Found</ThemedText>
          <ThemedText style={styles.emptySubtitle}>
            We couldn't find any products in this category
          </ThemedText>
          <Pressable 
            style={styles.browseButton}
            onPress={() => navigation.goBack()}
          >
            <ThemedText style={styles.browseButtonText}>Browse All Categories</ThemedText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF8C00',
    backgroundColor: '#FFF5EB',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF8C00',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: '#F5F5F5',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  productInfo: {
    padding: 12,
  },
  brand: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  productName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1F2937',
    lineHeight: 18,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  mrp: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewCount: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#FF8C00',
    borderRadius: 12,
  },
  browseButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
