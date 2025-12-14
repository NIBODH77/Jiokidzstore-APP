import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TextInputProps, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface ModernInputProps extends TextInputProps {
  icon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export function ModernInput({
  icon,
  rightIcon,
  onRightIconPress,
  ...props
}: ModernInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
        style={styles.gradient}
      >
        <View style={styles.inputWrapper}>
          {icon && <Feather name={icon as any} size={18} color={Colors.light.textGray} />}
          <TextInput
            {...props}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, icon && { marginLeft: Spacing.md }]}
            placeholderTextColor={Colors.light.textGray}
          />
          {rightIcon && (
            <Pressable onPress={onRightIconPress}>
              <Feather name={rightIcon as any} size={18} color={Colors.light.primary} />
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  containerFocused: {
    borderColor: Colors.light.primary,
    shadowOpacity: 0.15,
  },
  gradient: {
    padding: 0,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
