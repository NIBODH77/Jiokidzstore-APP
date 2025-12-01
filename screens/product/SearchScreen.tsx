import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={[styles.searchContainer, { paddingTop: insets.top + 10 }]}>
        <Feather name="search" size={20} color={Colors.light.textGray} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor={Colors.light.textGray}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Feather name="x-circle" size={20} color={Colors.light.textGray} />
          </Pressable>
        )}
      </View>

      {/* Scrollable Content */}
      <ScreenScrollView>
        <View style={styles.content}>
          <ThemedText type="h3">Recent Searches</ThemedText>
          <ThemedText style={styles.placeholder}>Start typing to search...</ThemedText>
        </View>
      </ScreenScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    height: 48,
    marginHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.body.fontSize,
    color: Colors.light.text,
  },
  content: {
    padding: Spacing.lg
  },
  placeholder: {
    color: Colors.light.textGray,
    marginTop: Spacing.md
  },
});