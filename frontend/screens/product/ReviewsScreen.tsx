import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function ReviewsScreen() {
  return (
    <ScreenScrollView>
      <View style={[styles.container, { marginTop: Spacing.lg }]}>
        <View style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <ThemedText style={styles.userName}>John Doe</ThemedText>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Feather key={i} name="star" size={14} color={Colors.light.warning} fill={Colors.light.warning} />
              ))}
            </View>
          </View>
          <ThemedText style={styles.reviewText}>
            Great product! My kids love it. Excellent quality and fast delivery.
          </ThemedText>
          <ThemedText type="caption" style={styles.reviewDate}>2 days ago</ThemedText>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg },
  reviewCard: {
    backgroundColor: Colors.light.backgroundRoot,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  userName: { fontWeight: '600' },
  rating: { flexDirection: 'row', gap: 2 },
  reviewText: { marginBottom: Spacing.sm, lineHeight: 20 },
  reviewDate: { color: Colors.light.textGray },
});
