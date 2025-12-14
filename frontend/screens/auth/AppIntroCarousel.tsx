import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: [string, string];
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Welcome to Jio Kidz',
    description:
      'Premium quality products for your little ones. Everything from toys to clothing, all in one place.',
    icon: 'gift',
    gradient: ['#FF8C00', '#FFD4A3'],
  },
  {
    id: 2,
    title: 'Safe & Trusted',
    description:
      'All products are verified and tested for safety. We care about your child\'s wellbeing and happiness.',
    icon: 'shield',
    gradient: ['#9B59B6', '#D8BFD8'],
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description:
      'Quick checkout and reliable delivery. Track your order in real-time and get it delivered to your doorstep.',
    icon: 'truck',
    gradient: ['#3498DB', '#A8E6CF'],
  },
];

export default function AppIntroCarousel() {
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(scrollX / width);
    setCurrentSlide(slideIndex);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentSlide + 1) * width,
        animated: true,
      });
    } else {
      navigation.replace('Onboarding');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      >
        {slides.map((slide) => (
          <LinearGradient
            key={slide.id}
            colors={slide.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.slide}
          >
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Feather
                  name={slide.icon as any}
                  size={80}
                  color="#FFFFFF"
                  strokeWidth={1}
                />
              </View>

              <ThemedText
                style={[styles.title, { color: '#FFFFFF' }]}
                type="h1"
              >
                {slide.title}
              </ThemedText>

              <ThemedText style={[styles.description, { color: '#FFFFFF' }]}>
                {slide.description}
              </ThemedText>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <ThemedText style={styles.skipText}>
              {currentSlide === slides.length - 1 ? 'Login' : 'Skip'}
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={handleNext}
            style={[
              styles.nextButton,
              { backgroundColor: Colors.light.primary },
            ]}
          >
            <ThemedText style={styles.nextText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </ThemedText>
            <Feather
              name="arrow-right"
              size={18}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundRoot,
  },
  slide: {
    width,
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.lg,
    color: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#FFFFFF',
    opacity: 0.95,
  },
  footer: {
    backgroundColor: Colors.light.backgroundRoot,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.border,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: Colors.light.primary,
    width: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  skipButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  nextText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});
