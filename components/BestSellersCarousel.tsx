import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');

const BEST_SELLERS = [
  {
    id: '1',
    name: 'Premium Baby Stroller',
    price: '₹12,999',
    originalPrice: '₹19,999',
    rating: 4.8,
    reviews: 2143,
    image: '🛒',
  },
  {
    id: '2',
    name: 'Organic Cotton Diaper Set',
    price: '₹849',
    originalPrice: '₹1,299',
    rating: 4.9,
    reviews: 1856,
    image: '👶',
  },
  {
    id: '3',
    name: 'Educational Toy Bundle',
    price: '₹2,499',
    originalPrice: '₹3,999',
    rating: 4.7,
    reviews: 945,
    image: '🧩',
  },
];

interface BestSellersCarouselProps {
  onProductPress?: (id: string) => void;
}

export function BestSellersCarousel({ onProductPress }: BestSellersCarouselProps) {
  const renderCard = ({ item }: any) => (
    <Pressable
      style={styles.card}
      onPress={() => onProductPress?.(item.id)}
    >
      <LinearGradient
        colors={['#FFE5EE', '#FFF8FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Image Placeholder */}
        <View style={styles.imagePlaceholder}>
          <ThemedText style={styles.imageEmoji}>{item.image}</ThemedText>
          <View style={styles.bestSellerBadge}>
            <Feather name="trending-up" size={12} color="#FFFFFF" />
            <ThemedText style={styles.bestSellerText}>Best Seller</ThemedText>
          </View>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <ThemedText style={styles.productName} numberOfLines={2}>
            {item.name}
          </ThemedText>

          <View style={styles.priceRow}>
            <ThemedText style={styles.price}>{item.price}</ThemedText>
            <ThemedText style={styles.originalPrice}>{item.originalPrice}</ThemedText>
          </View>

          <View style={styles.ratingRow}>
            <Feather name="star" size={12} color="#F59E0B" fill="#F59E0B" />
            <ThemedText style={styles.rating}>{item.rating}</ThemedText>
            <ThemedText style={styles.reviews}>({item.reviews})</ThemedText>
          </View>

          <Pressable style={styles.addButton}>
            <LinearGradient
              colors={['#FF6B9D', '#FFA8C5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButtonGradient}
            >
              <Feather name="plus" size={16} color="#FFFFFF" />
              <ThemedText style={styles.addButtonText}>Add to Cart</ThemedText>
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Best Sellers 🔥</ThemedText>
      <FlatList
        data={BEST_SELLERS}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: Spacing.lg,
  },
  listContent: {
    gap: Spacing.md,
  },
  card: {
    width: width - 80,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardGradient: {
    padding: Spacing.lg,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: 'rgba(255,107,157,0.1)',
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  imageEmoji: {
    fontSize: 48,
  },
  bestSellerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.light.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  bestSellerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  info: {
    gap: Spacing.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.light.primary,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: Colors.light.textGray,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.text,
  },
  reviews: {
    fontSize: 11,
    color: Colors.light.textGray,
  },
  addButton: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
