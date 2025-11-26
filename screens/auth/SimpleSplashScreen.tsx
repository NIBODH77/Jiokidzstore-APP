import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

function FloatingCircle({ delay, size, position }: any) {
  const floatValue = useSharedValue(0);

  useEffect(() => {
    floatValue.value = withRepeat(
      withTiming(1, {
        duration: 3000 + delay,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(floatValue.value, [0, 1], [0, -30]),
      },
    ],
    opacity: interpolate(floatValue.value, [0, 0.5, 1], [0.3, 0.6, 0.3]),
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          ...position,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
        animatedStyle,
      ]}
    />
  );
}

export default function SimpleSplashScreen() {
  const navigation = useNavigation<any>();
  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const opacityValue = useSharedValue(0);

  useEffect(() => {
    rotateValue.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    scaleValue.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    opacityValue.value = withTiming(1, {
      duration: 600,
      easing: Easing.ease,
    });

    const timer = setTimeout(() => {
      navigation.replace('AppIntro');
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotateValue.value}deg` },
      { scale: scaleValue.value },
    ],
    opacity: opacityValue.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#FFB6D9', '#FFD4E5', '#FFF0F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top Right Circles */}
        <FloatingCircle
          delay={0}
          size={100}
          position={{ top: -30, right: -20 }}
        />
        <FloatingCircle
          delay={500}
          size={60}
          position={{ top: 40, right: 10 }}
        />

        {/* Bottom Left Circles */}
        <FloatingCircle
          delay={800}
          size={80}
          position={{ bottom: -20, left: -30 }}
        />
        <FloatingCircle
          delay={300}
          size={50}
          position={{ bottom: 50, left: 20 }}
        />

        {/* Center Decorative Elements */}
        <View
          style={[
            styles.decorativeCircle,
            {
              top: height * 0.15,
              right: width * 0.1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          ]}
        />
        <View
          style={[
            styles.decorativeCircle,
            {
              bottom: height * 0.2,
              left: width * 0.08,
              width: 120,
              height: 120,
              backgroundColor: 'rgba(155, 89, 182, 0.08)',
            },
          ]}
        />

        {/* Main Logo Container */}
        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
            <Image
              source={require('@/attached_assets/JioKidslogo_1763923777175.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Glow Effect */}
          <View style={styles.glowContainer}>
            <View style={styles.glowCircle} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  glowContainer: {
    position: 'absolute',
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  glowCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 140,
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 157, 0.15)',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
