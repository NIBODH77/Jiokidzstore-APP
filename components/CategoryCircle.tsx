import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Category } from '@/data/types';
import { Spacing, BorderRadius } from '@/constants/theme';

interface CategoryCircleProps {
  category: Category;
  onPress: () => void;
}

export function CategoryCircle({ category, onPress }: CategoryCircleProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.circle, { backgroundColor: category.color }]}>
        <Feather name={category.icon as any} size={28} color="#FFFFFF" />
      </View>
      <ThemedText type="caption" style={styles.label} numberOfLines={1}>
        {category.name}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
  pressed: {
    opacity: 0.8,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  label: {
    textAlign: 'center',
    maxWidth: 70,
  },
});
