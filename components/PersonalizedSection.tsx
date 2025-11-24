import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const PERSONALIZED_ITEMS = [
  { id: '1', title: 'For Newborns', icon: '👶', color1: '#FFB6D9', color2: '#FFC9E3' },
  { id: '2', title: 'For Toddlers', icon: '🧒', color1: '#A8E6CF', color2: '#C8F7DC' },
  { id: '3', title: 'For Kids', icon: '👦', color1: '#FFD3B6', color2: '#FFDDCC' },
  { id: '4', title: 'Gifts Under ₹500', icon: '🎁', color1: '#FFAAA5', color2: '#FFCCC7' },
];

interface PersonalizedSectionProps {
  onItemPress?: (id: string) => void;
}

export function PersonalizedSection({ onItemPress }: PersonalizedSectionProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Just For You 🎯</ThemedText>
      <View style={styles.grid}>
        {PERSONALIZED_ITEMS.map((item) => (
          <Pressable
            key={item.id}
            style={styles.itemCard}
            onPress={() => onItemPress?.(item.id)}
          >
            <LinearGradient
              colors={[item.color1, item.color2]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.itemGradient}
            >
              <ThemedText style={styles.itemIcon}>{item.icon}</ThemedText>
              <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  itemCard: {
    width: '48%',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemGradient: {
    paddingVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  itemIcon: {
    fontSize: 32,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
