import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface TwoColumnPromoProps {
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export function TwoColumnPromo({ onLeftPress, onRightPress }: TwoColumnPromoProps) {
  return (
    <View style={styles.container}>
      {/* Left Column - New Arrivals */}
      <Pressable style={styles.column} onPress={onLeftPress}>
        <LinearGradient
          colors={['#FFD4A3', '#FFE8D6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <ThemedText style={styles.emoji}>✨</ThemedText>
            <ThemedText style={styles.title}>New Arrivals</ThemedText>
            <ThemedText style={styles.subtitle}>Latest Collection</ThemedText>
            <View style={styles.ctaRow}>
              <ThemedText style={styles.cta}>Shop Now</ThemedText>
              <Feather name="arrow-right" size={14} color={Colors.light.primary} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      {/* Right Column - Exclusive Deals */}
      <Pressable style={styles.column} onPress={onRightPress}>
        <LinearGradient
          colors={['#A8E6CF', '#C8F7DC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <ThemedText style={styles.emoji}>💰</ThemedText>
            <ThemedText style={styles.title}>Exclusive</ThemedText>
            <ThemedText style={styles.subtitle}>Members Only</ThemedText>
            <View style={styles.ctaRow}>
              <ThemedText style={styles.cta}>Explore</ThemedText>
              <Feather name="arrow-right" size={14} color={Colors.light.primary} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  column: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  cardContent: {
    gap: Spacing.sm,
  },
  emoji: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.textGray,
    fontWeight: '500',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  cta: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.primary,
  },
});
