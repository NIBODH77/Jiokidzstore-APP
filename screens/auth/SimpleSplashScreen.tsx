import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
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

export default function SimpleSplashScreen({ onFinish }: { onFinish: () => void }) {
  const rotateValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const opacityValue = useSharedValue(0);
  const jumpValue = useSharedValue(0);

  useEffect(() => {
    // Animate opacity and scale to bring the logo in with a spring effect
    opacityValue.value = withTiming(1, { duration: 400, easing: Easing.ease });
    scaleValue.value = withSpring(1, { damping: 12, stiffness: 90 });

    // Rotate with a spring for a more professional and dynamic effect
    rotateValue.value = withSpring(360 * 2, {
      damping: 18,
      stiffness: 90,
      mass: 1.2,
    });

    // Use requestAnimationFrame fallback for web compatibility
    let timer: ReturnType<typeof setTimeout>;
    const startTime = Date.now();
    const checkTime = () => {
      if (Date.now() - startTime >= 3000) {
        onFinish();
      } else {
        timer = setTimeout(checkTime, 100);
      }
    };
    timer = setTimeout(checkTime, 100);

    return () => clearTimeout(timer);
  }, [onFinish, opacityValue, scaleValue, rotateValue]);

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
        <FloatingCircle
          delay={200}
          size={45}
          position={{ top: 100, right: width * 0.15 }}
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
        <FloatingCircle
          delay={600}
          size={70}
          position={{ bottom: 80, left: width * 0.15 }}
        />

        {/* Top Left Circles */}
        <FloatingCircle
          delay={400}
          size={55}
          position={{ top: height * 0.2, left: -15 }}
        />

        {/* Bottom Right Circles */}
        <FloatingCircle
          delay={700}
          size={65}
          position={{ bottom: 30, right: width * 0.12 }}
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
        <View
          style={[
            styles.decorativeCircle,
            {
              top: height * 0.4,
              left: width * 0.05,
              width: 100,
              height: 100,
              backgroundColor: 'rgba(255, 182, 217, 0.06)',
            },
          ]}
        />
        <View
          style={[
            styles.decorativeCircle,
            {
              bottom: height * 0.1,
              right: width * 0.08,
              width: 110,
              height: 110,
              backgroundColor: 'rgba(255, 107, 157, 0.06)',
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
  decorativeCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
