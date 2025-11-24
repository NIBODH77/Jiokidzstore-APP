import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <ScreenScrollView>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={Colors.light.textGray} />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor={Colors.light.textGray}
          autoFocus
        />
      </View>
      <View style={styles.content}>
        <ThemedText type="h3">Recent Searches</ThemedText>
        <ThemedText style={styles.placeholder}>Start typing to search...</ThemedText>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    margin: Spacing.lg,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: Typography.body.fontSize,
    color: Colors.light.text,
  },
  content: { padding: Spacing.lg },
  placeholder: { color: Colors.light.textGray, marginTop: Spacing.md },
});
