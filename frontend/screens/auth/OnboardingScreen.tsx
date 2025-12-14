import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { replace } from '@/navigation/navigationRef';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/RootNavigator';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Shop for Your Kids',
    description: 'Discover thousands of products for babies and kids. Toys, clothes, and everything you need.',
    image: 'shopping-cart',
  },
  {
    id: '2',
    title: 'Fast & Safe Delivery',
    description: 'Get your orders delivered quickly and safely to your doorstep. Track every step of the way.',
    image: 'truck',
  },
  {
    id: '3',
    title: 'Secure Checkout',
    description: 'Safe and secure payment options. Shop with confidence and peace of mind.',
    image: 'shield',
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    replace('Login');
  };

  const handleGetStarted = async () => {
    await completeOnboarding();
    replace('Login');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage} />
      </View>
      <ThemedText type="h1" style={styles.title}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.description}>{item.description}</ThemedText>
    </View>
  );

  return (
    <LinearGradient
      colors={[Colors.light.primary, Colors.light.accent]}
      style={styles.container}
    >
      <Pressable onPress={handleSkip} style={styles.skipButton}>
        <ThemedText style={styles.skipText}>Skip</ThemedText>
      </Pressable>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {currentIndex === slides.length - 1 ? (
          <Button onPress={handleGetStarted} title="Get Started" variant="secondary" />
        ) : (
          <Button onPress={handleNext} title="Next" variant="secondary" />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: Spacing.xl,
    zIndex: 10,
    padding: Spacing.sm,
  },
  skipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  imageContainer: {
    width: 300,
    height: 300,
    marginBottom: Spacing.xxl,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: BorderRadius.lg,
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: 60,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  button: {
    backgroundColor: '#FFFFFF',
  },
});
