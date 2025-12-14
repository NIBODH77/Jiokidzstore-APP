import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = (screenWidth - 48) / 2;

const STORAGE_KEY = 'recently_viewed_products';

interface RecentProduct {
  id: string;
  name: string;
  price: string;
  oldPrice: string;
  offer: string;
  image: string;
  viewedAt: number;
}

const defaultRecentProducts: RecentProduct[] = [
  {
    id: '1',
    name: 'Kids Cotton T-Shirt Blue',
    price: '₹299',
    oldPrice: '₹374',
    offer: '20% OFF',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200&h=200&fit=crop',
    viewedAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: '2',
    name: 'Baby Soft Shoes Pink',
    price: '₹156',
    oldPrice: '₹300',
    offer: '48% OFF',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=200&h=200&fit=crop',
    viewedAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: '3',
    name: 'Educational Toy Set',
    price: '₹225',
    oldPrice: '₹300',
    offer: '25% OFF',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop',
    viewedAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: '4',
    name: 'Baby Diapers Pack',
    price: '₹499',
    oldPrice: '₹699',
    offer: '29% OFF',
    image: 'https://images.unsplash.com/photo-1584839404054-46e0e3a3c7d5?w=200&h=200&fit=crop',
    viewedAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: '5',
    name: 'Baby Feeding Bottle',
    price: '₹199',
    oldPrice: '₹349',
    offer: '43% OFF',
    image: 'https://images.unsplash.com/photo-1584839404054-46e0e3a3c7d5?w=200&h=200&fit=crop',
    viewedAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: '6',
    name: 'Kids Winter Jacket',
    price: '₹899',
    oldPrice: '₹1499',
    offer: '40% OFF',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200&h=200&fit=crop',
    viewedAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];

export default function RecentlyViewedScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentProducts();
  }, []);

  const loadRecentProducts = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentProducts(parsed);
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecentProducts));
        setRecentProducts(defaultRecentProducts);
      }
    } catch (error) {
      console.log('Error loading recently viewed:', error);
      setRecentProducts(defaultRecentProducts);
    }
    setLoading(false);
  };

  const clearAllRecent = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentProducts([]);
    } catch (error) {
      console.log('Error clearing recently viewed:', error);
    }
  };

  const removeProduct = async (productId: string) => {
    const updated = recentProducts.filter(p => p.id !== productId);
    setRecentProducts(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log('Error removing product:', error);
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const handleProductPress = (product: RecentProduct) => {
    (navigation as any).push('ProductDetail', { productId: product.id });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="eye-outline" size={80} color="#FFD4A3" />
      </View>
      <Text style={styles.emptyTitle}>No Recently Viewed Products</Text>
      <Text style={styles.emptySubtitle}>
        Products you view will appear here for easy access
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.shopNowButtonText}>START SHOPPING</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recently Viewed</Text>
        {recentProducts.length > 0 && (
          <TouchableOpacity onPress={clearAllRecent} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : recentProducts.length === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.countText}>
            {recentProducts.length} product{recentProducts.length !== 1 ? 's' : ''} viewed recently
          </Text>

          <View style={styles.productGrid}>
            {recentProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product)}
                activeOpacity={0.8}
              >
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeProduct(product.id)}
                >
                  <Ionicons name="close-circle" size={22} color="#FF8C00" />
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <View style={styles.offerBadge}>
                    <Text style={styles.offerBadgeText}>{product.offer}</Text>
                  </View>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                  </View>
                  <Text style={styles.timeAgo}>{getTimeAgo(product.viewedAt)}</Text>
                </View>

                <TouchableOpacity style={styles.addToCartButton}>
                  <Ionicons name="cart-outline" size={16} color="#fff" />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF3E0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#FF8C00',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  countText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 11,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  offerBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    height: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FF8C00',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  timeAgo: {
    fontSize: 11,
    color: '#999',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    gap: 6,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  shopNowButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  shopNowButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});

export const addToRecentlyViewed = async (product: Omit<RecentProduct, 'viewedAt'>) => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    let products: RecentProduct[] = stored ? JSON.parse(stored) : [];
    
    products = products.filter(p => p.id !== product.id);
    
    products.unshift({
      ...product,
      viewedAt: Date.now(),
    });
    
    if (products.length > 20) {
      products = products.slice(0, 20);
    }
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.log('Error adding to recently viewed:', error);
  }
};
