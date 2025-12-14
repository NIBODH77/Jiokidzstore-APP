import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');

const HERO_SLIDES = [
  {
    id: '1',
    title: 'Big Sale',
    subtitle: 'Up to 60% OFF on Kids Fashion',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
    badge: 'Limited Time',
    buttonText: 'Shop Now',
  },
  {
    id: '2',
    title: 'Baby Essentials',
    subtitle: 'Everything Your Baby Needs',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
    badge: 'Trending',
    buttonText: 'Explore',
  },
  {
    id: '3',
    title: 'Kids Clothing',
    subtitle: 'Cute & Comfortable Outfits',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80',
    badge: 'Best Sellers',
    buttonText: 'Discover',
  },
  {
    id: '4',
    title: 'Toys & Games',
    subtitle: 'Fun & Educational Play',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    badge: 'New In',
    buttonText: 'Browse',
  },
];

interface ModernHeroSectionProps {
  onSlidePress?: (id: string) => void;
  onButtonPress?: (id: string) => void;
}

export function ModernHeroSection({ onSlidePress, onButtonPress }: ModernHeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroScrollRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveSlide(viewableItems[0].index || 0);
    }
  }).current;

  const renderSlide = ({ item }: any) => (
    <Pressable
      style={styles.slide}
      onPress={() => onSlidePress?.(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <LinearGradient
        colors={['rgba(255,107,157,0.05)', 'rgba(255,107,157,0.95)']}
        style={styles.overlay}
      >
        {/* Badge */}
        <View style={styles.badgeContainer}>
          <LinearGradient
            colors={['#FFFFFF', '#FFF8FA']}
            style={styles.badge}
          >
            <ThemedText style={styles.badgeText}>{item.badge}</ThemedText>
          </LinearGradient>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          <ThemedText style={styles.subtitle}>{item.subtitle}</ThemedText>

          <Pressable
            style={styles.button}
            onPress={() => onButtonPress?.(item.id)}
          >
            <LinearGradient
              colors={['#FFFFFF', '#FFF8FA']}
              style={styles.buttonGradient}
            >
              <ThemedText style={styles.buttonText}>{item.buttonText}</ThemedText>
              <Feather name="arrow-right" size={16} color={Colors.light.primary} />
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={heroScrollRef}
        data={HERO_SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        snapToInterval={width}
        decelerationRate="fast"
        scrollEventThrottle={16}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {HERO_SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    borderRadius: 28,
    overflow: 'hidden',
  },
  slide: {
    width: width,
    height: 280,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  content: {
    gap: Spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: BorderRadius.lg,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.light.primary,
  },
});
