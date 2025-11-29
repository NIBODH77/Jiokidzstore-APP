import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';
import { Colors, Spacing } from '@/constants/theme';

export default function ParentingScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingTop: insets.top }}
    >
      <View style={[styles.content, { paddingHorizontal: Spacing.md }]}>
        <ThemedText style={styles.title}>Parenting Zone</ThemedText>
        <ThemedText style={styles.subtitle}>Tips, guides, and products for parents</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
});
