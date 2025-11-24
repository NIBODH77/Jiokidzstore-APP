import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from './ThemedText';
import { Spacing, BorderRadius, Colors } from '@/constants/theme';

interface BadgeLabelProps {
  label: string;
  type?: 'new' | 'hot' | 'limited' | 'sale' | 'free-shipping';
  style?: ViewStyle;
}

export function BadgeLabel({ label, type = 'new', style }: BadgeLabelProps) {
  const badgeConfigs = {
    new: {
      colors: ['#3498DB', '#5DADE2'],
      icon: '✨',
    },
    hot: {
      colors: ['#FF6B9D', '#FFA8C5'],
      icon: '🔥',
    },
    limited: {
      colors: ['#F39C12', '#F5B041'],
      icon: '⚡',
    },
    sale: {
      colors: ['#27AE60', '#52BE80'],
      icon: '💰',
    },
    'free-shipping': {
      colors: ['#9B59B6', '#D8BFD8'],
      icon: '📦',
    },
  };

  const config = badgeConfigs[type];

  return (
    <LinearGradient
      colors={config.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.badge, style]}
    >
      <ThemedText style={styles.text}>{config.icon} {label}</ThemedText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
