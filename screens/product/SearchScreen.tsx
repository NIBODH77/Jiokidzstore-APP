import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Pressable, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Toys',
    'Baby Diapers',
    'Winter Clothes',
    'Shoes',
  ]);
  const insets = useSafeAreaInsets();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleRecentSearchPress = (search: string) => {
    handleSearch(search);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 64 }]}>
      {/* Search Input Box - PROMINENT */}
      <View style={styles.searchBoxWrapper}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={24} color={Colors.light.primary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for toys, clothes, diapers..."
            placeholderTextColor="#CCCCCC"
            autoFocus={true}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={handleClearSearch}>
              <Feather name="x-circle" size={22} color={Colors.light.textGray} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 ? (
          <View style={styles.content}>
            {/* Recent Searches Header */}
            <View style={styles.sectionHeader}>
              <ThemedText type="h3" style={styles.sectionTitle}>Recent Searches</ThemedText>
              {recentSearches.length > 0 && (
                <Pressable onPress={handleClearRecent}>
                  <ThemedText style={styles.clearButton}>Clear</ThemedText>
                </Pressable>
              )}
            </View>

            {/* Recent Searches List */}
            {recentSearches.length > 0 ? (
              <View style={styles.searchesList}>
                {recentSearches.map((search, index) => (
                  <Pressable
                    key={index}
                    style={styles.searchItem}
                    onPress={() => handleRecentSearchPress(search)}
                  >
                    <Feather name="clock" size={16} color={Colors.light.textGray} />
                    <ThemedText style={styles.searchItemText}>{search}</ThemedText>
                    <Feather name="arrow-up-left" size={16} color={Colors.light.textGray} />
                  </Pressable>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Feather name="search" size={48} color={Colors.light.backgroundSecondary} />
                <ThemedText style={styles.emptyStateText}>No recent searches</ThemedText>
                <ThemedText style={styles.emptyStateSubText}>
                  Start searching for products
                </ThemedText>
              </View>
            )}

            {/* Popular Searches */}
            <View style={styles.popularSection}>
              <ThemedText type="h3" style={styles.sectionTitle}>Popular Searches</ThemedText>
              <View style={styles.tagsContainer}>
                {['Baby Toys', 'Diapers', 'Clothes', 'Shoes', 'Bottles', 'Strollers'].map((tag, index) => (
                  <Pressable
                    key={index}
                    style={styles.tag}
                    onPress={() => handleSearch(tag)}
                  >
                    <ThemedText style={styles.tagText}>{tag}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <ThemedText style={styles.searchResultsPlaceholder}>
              No products found for "{searchQuery}"
            </ThemedText>
            <ThemedText style={styles.searchResultsSubtext}>
              Try different keywords or browse our categories
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBoxWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 100,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 60,
    gap: 12,
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.body.fontSize,
    color: Colors.light.text,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  clearButton: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  searchesList: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: '#F8F8F8',
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
  },
  searchItemText: {
    flex: 1,
    color: Colors.light.text,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
    gap: Spacing.md,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.textGray,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: Colors.light.textGray,
  },
  popularSection: {
    marginTop: Spacing.lg,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  tag: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.md,
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  searchResultsPlaceholder: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
    marginTop: Spacing.xl,
  },
  searchResultsSubtext: {
    fontSize: 14,
    color: Colors.light.textGray,
    textAlign: 'center',
  },
});