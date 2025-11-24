
import React from "react";
import { StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useResponsive } from "@/hooks/useResponsive";
import { BorderRadius, Shadows, Colors } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "gradient";

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  title,
  children,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  size = 'md',
}: ButtonProps) {
  const { theme } = useTheme();
  const { buttonHeight, fontSize, spacing } = useResponsive();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const sizeConfig = {
    sm: { height: 40, paddingHorizontal: 16 },
    md: { height: buttonHeight, paddingHorizontal: spacing.xl },
    lg: { height: 56, paddingHorizontal: spacing.xxl },
  };

  const getButtonStyle = () => {
    const baseStyle = {
      ...sizeConfig[size],
      borderRadius: BorderRadius.md,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.border : theme.primary,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: disabled ? theme.border : theme.secondary,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: disabled ? theme.border : theme.primary,
        };
      case "gradient":
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.textGray;
    switch (variant) {
      case "primary":
        return theme.buttonText;
      case "secondary":
        return theme.text;
      case "outline":
        return theme.primary;
    }
  };

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          {children ? (
            children
          ) : (
            <ThemedText
              style={[
                styles.text,
                { color: getTextColor(), fontSize: fontSize.md },
                icon && styles.textWithIcon,
              ]}
            >
              {title}
            </ThemedText>
          )}
        </>
      )}
    </>
  );

  return (
    <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth]}>
      {variant === 'gradient' ? (
        <LinearGradient
          colors={['#FF6B9D', '#FF8FB3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, getButtonStyle()]}
        >
          <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={styles.button}
          >
            {buttonContent}
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          style={[styles.button, getButtonStyle()]}
        >
          {buttonContent}
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
  textWithIcon: {
    marginLeft: 8,
  },
  fullWidth: {
    width: "100%",
  },
});
