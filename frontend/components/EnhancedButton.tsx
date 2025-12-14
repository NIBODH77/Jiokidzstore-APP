import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface EnhancedButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export function EnhancedButton({
  onPress,
  children,
  style,
  textStyle,
  gradient = true,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}: EnhancedButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sizeStyles = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  };

  const variantStyles = {
    primary: styles.variantPrimary,
    secondary: styles.variantSecondary,
    outline: styles.variantOutline,
  };

  const buttonContent = (
    <ThemedText
      style={[
        styles.text,
        variant === 'outline' && styles.textOutline,
        textStyle,
      ]}
    >
      {children}
    </ThemedText>
  );

  if (variant === 'outline') {
    return (
      <Animated.View style={[animatedStyle, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          style={[styles.button, sizeStyles[size], variantStyles[variant]]}
        >
          {buttonContent}
        </Pressable>
      </Animated.View>
    );
  }

  if (gradient && variant === 'primary') {
    return (
      <Animated.View style={[animatedStyle, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          style={[styles.button, sizeStyles[size], { overflow: 'hidden' }]}
        >
          <LinearGradient
            colors={['#FF8C00', '#FFA8C5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          {buttonContent}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.button, sizeStyles[size], variantStyles[variant]]}
      >
        {buttonContent}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  sizeSmall: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 32,
  },
  sizeMedium: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 44,
  },
  sizeLarge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    minHeight: 52,
  },
  variantPrimary: {
    backgroundColor: Colors.light.primary,
  },
  variantSecondary: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  variantOutline: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  textOutline: {
    color: Colors.light.primary,
  },
});
