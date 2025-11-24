import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from './ThemedText';
import { Spacing, BorderRadius, Colors } from '@/constants/theme';
import { Category } from '@/data/types';

interface ModernCategoryProps {
  category: Category;
  onPress: () => void;
}

export function ModernCategory({ category, onPress }: ModernCategoryProps) {
  const categoryColors: Record<string, string[]> = {
    'Boy Fashion': ['#3498DB', '#5DADE2'],
    'Girl Fashion': ['#FF6B9D', '#FF8FB3'],
    Footwear: ['#F39C12', '#F5B041'],
    Toys: ['#9B59B6', '#AF7AC5'],
    Diapers: ['#27AE60', '#52BE80'],
    Books: ['#E74C3C', '#EC7063'],
    Accessories: ['#1ABC9C', '#48C9B0'],
    'Baby Care': ['#FF6B9D', '#FF8FB3'],
  };

  const categoryIcons: Record<string, string> = {
    'Boy Fashion': 'user',
    'Girl Fashion': 'heart',
    Footwear: 'arrow-up-right',
    Toys: 'gift',
    Diapers: 'package',
    Books: 'book',
    Accessories: 'watch',
    'Baby Care': 'smile',
  };

  const colors = categoryColors[category.name] || ['#3498DB', '#5DADE2'];
  const icon = categoryIcons[category.name] || 'shopping-bag';

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.iconContainer}>
            <Feather name={icon as any} size={28} color="#FFFFFF" />
          </View>
        </LinearGradient>
      </Pressable>
      <ThemedText style={styles.label} numberOfLines={1}>
        {category.name}
      </ThemedText>
      <ThemedText style={styles.count}>{category.itemCount} items</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.sm,
    width: 100,
  },
  pressed: {
    opacity: 0.8,
  },
  gradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
  },
  count: {
    fontSize: 11,
    color: Colors.light.textGray,
    textAlign: 'center',
  },
});
