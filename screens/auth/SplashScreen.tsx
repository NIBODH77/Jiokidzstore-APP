import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Pressable, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing } from '@/constants/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface SlideProps {
  title: string;
  subtitle: string;
  icon?: string;
  logo?: any;
  gradient: [string, string];
  isFirstSlide?: boolean;
  slideIndex: number;
  currentSlide: number;
}

// Sparkle particles
function Sparkle({ delay, position }: any) {
  const sparkleAnim = useSharedValue(0);

  useEffect(() => {
    sparkleAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500, easing: Easing.ease }),
        withTiming(0, { duration: 500, easing: Easing.ease })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: sparkleAnim.value,
  }));

  return (
    <Animated.View style={[styles.sparkle, position, animatedStyle]}>
      <Feather name="star" size={12} color="#FFFFFF" />
    </Animated.View>
  );
}

// Rotating background shapes
function RotatingShapes({ isActive }: { isActive: boolean }) {
  const rotate1 = useSharedValue(0);
  const rotate2 = useSharedValue(0);
  const rotate3 = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      rotate1.value = withRepeat(
        withTiming(360, { duration: 8000, easing: Easing.linear }),
        -1,
        false
      );
      rotate2.value = withRepeat(
        withTiming(360, { duration: 10000, easing: Easing.linear }),
        -1,
        true
      );
      rotate3.value = withRepeat(
        withTiming(360, { duration: 12000, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [isActive]);

  const rotateStyle1 = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotate1.value}deg` }],
  }));

  const rotateStyle2 = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotate2.value}deg` }],
  }));

  const rotateStyle3 = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotate3.value}deg` }],
  }));

  return (
    <View style={styles.shapesContainer}>
      <Animated.View style={[styles.shape, styles.shape1, rotateStyle1]}>
        <View style={styles.shapeInner} />
      </Animated.View>
      <Animated.View style={[styles.shape, styles.shape2, rotateStyle2]}>
        <View style={styles.shapeInner} />
      </Animated.View>
      <Animated.View style={[styles.shape, styles.shape3, rotateStyle3]}>
        <View style={styles.shapeInner} />
      </Animated.View>
    </View>
  );
}

// Animated corner threads flowing to center with boom effect
function CornerThreads({ isActive }: { isActive: boolean }) {
  const threadAnim = useSharedValue(0);
  const boomAnim = useSharedValue(0);
  const boomAnim2 = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      threadAnim.value = withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 500 })
      );

      setTimeout(() => {
        boomAnim.value = withTiming(1, { duration: 800, easing: Easing.ease });
      }, 2000);

      setTimeout(() => {
        boomAnim2.value = withTiming(1, { duration: 600, easing: Easing.ease });
      }, 2200);
    } else {
      threadAnim.value = 0;
      boomAnim.value = 0;
      boomAnim2.value = 0;
    }
  }, [isActive]);

  const topLeftAnimStyle = useAnimatedStyle(() => {
    const progress = threadAnim.value;
    const x = interpolate(progress, [0, 1], [-screenWidth / 2, 0]);
    const y = interpolate(progress, [0, 1], [-screenHeight / 2, 0]);
    const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity,
    };
  });

  const topRightAnimStyle = useAnimatedStyle(() => {
    const progress = threadAnim.value;
    const x = interpolate(progress, [0, 1], [screenWidth / 2, 0]);
    const y = interpolate(progress, [0, 1], [-screenHeight / 2, 0]);
    const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity,
    };
  });

  const bottomLeftAnimStyle = useAnimatedStyle(() => {
    const progress = threadAnim.value;
    const x = interpolate(progress, [0, 1], [-screenWidth / 2, 0]);
    const y = interpolate(progress, [0, 1], [screenHeight / 2, 0]);
    const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity,
    };
  });

  const bottomRightAnimStyle = useAnimatedStyle(() => {
    const progress = threadAnim.value;
    const x = interpolate(progress, [0, 1], [screenWidth / 2, 0]);
    const y = interpolate(progress, [0, 1], [screenHeight / 2, 0]);
    const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);
    return {
      transform: [{ translateX: x }, { translateY: y }],
      opacity,
    };
  });

  const boomStyle = useAnimatedStyle(() => {
    const boom = boomAnim.value;
    const scale = interpolate(boom, [0, 1], [0.3, 4]);
    const opacity = interpolate(boom, [0, 0.3, 1], [0, 1, 0]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const boomStyle2 = useAnimatedStyle(() => {
    const boom = boomAnim2.value;
    const scale = interpolate(boom, [0, 1], [0.1, 2.5]);
    const opacity = interpolate(boom, [0, 0.4, 1], [0, 0.8, 0]);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.threadContainer}>
      <Animated.View style={[styles.boomEffect, boomStyle]} />
      <Animated.View style={[styles.boomEffect2, boomStyle2]} />

      <Animated.View style={[styles.threadLine, styles.threadTopLeft, topLeftAnimStyle]}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.threadGradient}
        />
      </Animated.View>

      <Animated.View style={[styles.threadLine, styles.threadTopRight, topRightAnimStyle]}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.threadGradient}
        />
      </Animated.View>

      <Animated.View style={[styles.threadLine, styles.threadBottomLeft, bottomLeftAnimStyle]}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.threadGradient}
        />
      </Animated.View>

      <Animated.View style={[styles.threadLine, styles.threadBottomRight, bottomRightAnimStyle]}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.threadGradient}
        />
      </Animated.View>
    </View>
  );
}

function Slide({ title, subtitle, icon, logo, gradient, isFirstSlide, slideIndex, currentSlide }: SlideProps) {
  const textFadeAnim = useSharedValue(0);
  const textTranslateAnim = useSharedValue(50);
  const logoFadeAnim = useSharedValue(0);
  const logoScaleAnim = useSharedValue(0.6);
  const containerRotateAnim = useSharedValue(0);

  useEffect(() => {
    if (slideIndex === currentSlide && isFirstSlide) {
      setTimeout(() => {
        textFadeAnim.value = withTiming(1, { duration: 600, easing: Easing.ease });
        textTranslateAnim.value = withTiming(0, { duration: 600, easing: Easing.ease });
      }, 2200);

      setTimeout(() => {
        logoFadeAnim.value = withTiming(1, {
          duration: 800,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        });
        logoScaleAnim.value = withTiming(1, {
          duration: 800,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        });
        containerRotateAnim.value = withTiming(360, {
          duration: 1000,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        });
      }, 2600);
    } else if (slideIndex === currentSlide && !isFirstSlide) {
      textFadeAnim.value = withTiming(1, { duration: 600, easing: Easing.ease });
      logoFadeAnim.value = withTiming(1, { duration: 600, easing: Easing.ease });
    } else {
      textFadeAnim.value = 0;
      textTranslateAnim.value = 50;
      logoFadeAnim.value = 0;
      logoScaleAnim.value = 0.6;
      containerRotateAnim.value = 0;
    }
  }, [slideIndex, currentSlide]);

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textFadeAnim.value,
    transform: [{ translateY: textTranslateAnim.value }],
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoFadeAnim.value,
    transform: [
      { scale: logoScaleAnim.value },
      { rotateZ: `${containerRotateAnim.value}deg` },
    ],
  }));

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.slide}
    >
      {isFirstSlide && slideIndex === currentSlide && (
        <>
          <CornerThreads isActive={true} />
          
          {/* Sparkles */}
          <Sparkle delay={0} position={{ top: 100, left: 50 }} />
          <Sparkle delay={200} position={{ top: 200, right: 60 }} />
          <Sparkle delay={400} position={{ bottom: 150, left: 70 }} />
          <Sparkle delay={600} position={{ bottom: 120, right: 80 }} />
          <Sparkle delay={300} position={{ top: 300, right: 100 }} />
        </>
      )}

      <View style={styles.slideContent}>
        {isFirstSlide ? (
          <>
            <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
              <ThemedText style={styles.slideTitle}>{title}</ThemedText>
            </Animated.View>

            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
            </Animated.View>

            <Animated.View style={[{ opacity: textFadeAnim }, styles.subtitleContainer]}>
              <ThemedText style={styles.slideSubtitle}>{subtitle}</ThemedText>
            </Animated.View>
          </>
        ) : (
          <>
            <Animated.View style={[styles.iconContainer, logoAnimatedStyle]}>
              <View style={styles.iconGradientBg}>
                <Feather name={icon as any} size={80} color="#FFFFFF" />
              </View>
            </Animated.View>
            <Animated.View style={[textAnimatedStyle, styles.textContainerOther]}>
              <ThemedText style={styles.slideTitle}>{title}</ThemedText>
              <ThemedText style={styles.slideSubtitle}>{subtitle}</ThemedText>
            </Animated.View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideProps[] = [
    {
      title: 'Welcome to',
      subtitle: 'Premium Kids Store',
      logo: require('@/attached_assets/JioKidslogo_1763923777175.png'),
      gradient: ['#FFB6D9', '#FF6B9D'],
      isFirstSlide: true,
      slideIndex: 0,
      currentSlide,
    },
    {
      title: 'Easy Shopping',
      subtitle: 'Browse, filter, and find everything you need in just a few taps',
      icon: 'shopping-bag',
      gradient: ['#FF8FB3', '#FF6B9D'],
      isFirstSlide: false,
      slideIndex: 1,
      currentSlide,
    },
    {
      title: 'Fast Delivery',
      subtitle: 'Quick checkout and reliable delivery to your doorstep',
      icon: 'truck',
      gradient: ['#FF6B9D', '#E5426B'],
      isFirstSlide: false,
      slideIndex: 2,
      currentSlide,
    },
  ];

  const startAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
    }

    const timer1 = setTimeout(() => {
      if (currentSlide === 0) {
        scrollViewRef.current?.scrollTo({ x: screenWidth, animated: true });
        setCurrentSlide(1);
      }
    }, 4000);

    autoScrollTimer.current = timer1;
  };

  const startAutoScrollSlide2 = () => {
    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
    }

    const timer2 = setTimeout(() => {
      if (currentSlide === 1) {
        scrollViewRef.current?.scrollTo({ x: screenWidth * 2, animated: true });
        setCurrentSlide(2);
      }
    }, 4000);

    autoScrollTimer.current = timer2;
  };

  useEffect(() => {
    startAutoScroll();
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 1) {
      startAutoScrollSlide2();
    }
  }, [currentSlide]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const slide = Math.round(scrollX / screenWidth);
    setCurrentSlide(slide);

    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
    }
  };

  const handleGetStarted = () => {
    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
    }
    navigation.navigate('Login');
  };

  const handleDotPress = (index: number) => {
    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
    }
    scrollViewRef.current?.scrollTo({ x: screenWidth * index, animated: true });
    setCurrentSlide(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={{ width: screenWidth }}>
            <Slide {...slide} />
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <Pressable
            key={index}
            style={[
              styles.dot,
              currentSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
            onPress={() => handleDotPress(index)}
          />
        ))}
      </View>

      {/* Get Started Button - Only on last slide */}
      {currentSlide === 2 && (
        <Animated.View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.getStartedButton,
              pressed && styles.getStartedButtonPressed,
            ]}
            onPress={handleGetStarted}
          >
            <LinearGradient
              colors={['#FF6B9D', '#FF8FB3']}
              style={styles.buttonGradient}
            >
              <ThemedText style={styles.buttonText}>Get Started</ThemedText>
              <Feather name="arrow-right" size={18} color="#FFFFFF" style={{ marginLeft: Spacing.sm }} />
            </LinearGradient>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  threadContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  threadLine: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  threadTopLeft: {
    width: screenWidth,
    height: 8,
    left: -screenWidth / 2,
    top: -screenHeight / 2,
  },
  threadTopRight: {
    width: screenWidth,
    height: 8,
    right: -screenWidth / 2,
    top: -screenHeight / 2,
  },
  threadBottomLeft: {
    width: screenWidth,
    height: 8,
    left: -screenWidth / 2,
    bottom: -screenHeight / 2,
  },
  threadBottomRight: {
    width: screenWidth,
    height: 8,
    right: -screenWidth / 2,
    bottom: -screenHeight / 2,
  },
  threadGradient: {
    flex: 1,
  },
  boomEffect: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  boomEffect2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  shapesContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape1: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  shape2: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  shape3: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  shapeInner: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
  sparkle: {
    position: 'absolute',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: Spacing.lg,
    zIndex: 10,
  },
  textContainerOther: {
    marginTop: Spacing.lg,
  },
  logoContainer: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    marginBottom: Spacing.xl,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  subtitleContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  iconContainer: {
    marginBottom: Spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGradientBg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  slideSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 32,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  getStartedButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  getStartedButtonPressed: {
    opacity: 0.8,
  },
  buttonGradient: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
});
