import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Pressable, Dimensions, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { TopHeader } from '@/components/TopHeader';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { AGE_GROUPS, AGE_WISE_CATEGORIES, AgeGroup } from '@/data/ageGroupData';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AgeWiseScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(AGE_GROUPS[0].id);

  const handleAgeGroupSelect = useCallback((ageGroupId: string) => {
    setSelectedAgeGroup(ageGroupId);
  }, []);

  const selectedAgeInfo = useMemo(() => {
    return AGE_GROUPS.find(ag => ag.id === selectedAgeGroup);
  }, [selectedAgeGroup]);

  const renderAgeGroupTab = useCallback(({ item }: { item: AgeGroup }) => (
    <Pressable
      style={[
        styles.ageTab,
        selectedAgeGroup === item.id && styles.ageTabActive,
      ]}
      onPress={() => handleAgeGroupSelect(item.id)}
    >
      <View
        style={[
          styles.ageTabBadge,
          { backgroundColor: item.color },
          selectedAgeGroup === item.id && styles.ageTabBadgeActive,
        ]}
      >
        <ThemedText
          style={[
            styles.ageTabText,
            selectedAgeGroup === item.id && styles.ageTabTextActive,
          ]}
        >
          {item.ageRange}
        </ThemedText>
      </View>
    </Pressable>
  ), [selectedAgeGroup]);

  const renderCategoryCard = useCallback(({ item, index }: { item: typeof AGE_WISE_CATEGORIES[0]; index: number }) => (
    <Pressable
      style={styles.categoryItem}
      onPress={() => {
        navigation.navigate('CategoryAggregator');
      }}
    >
      <View
        style={[
          styles.categoryCard,
          { backgroundColor: item.color },
        ]}
      />
      <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
      <ThemedText style={styles.categoryCount}>{item.itemCount}+ Items</ThemedText>
    </Pressable>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <TopHeader showBackButton={true} />

      {/* Age Group Selector */}
      <FlatList
        horizontal
        data={AGE_GROUPS}
        renderItem={renderAgeGroupTab}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ageGroupsContainer}
        scrollEventThrottle={16}
      />

      {/* Age Group Title & Description */}
      {selectedAgeInfo && (
        <View style={styles.ageInfoSection}>
          <ThemedText style={styles.ageGroupTitle}>{selectedAgeInfo.name}</ThemedText>
          <ThemedText style={styles.ageGroupSubtitle}>
            Perfect for {selectedAgeInfo.ageRange}
          </ThemedText>
        </View>
      )}

      {/* Categories Grid */}
      <ScrollView
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoriesGrid}>
          {AGE_WISE_CATEGORIES.map((category, index) => (
            <View key={category.id} style={styles.categoryWrapper}>
              <Pressable
                style={styles.categoryItem}
                onPress={() => {
                  navigation.navigate('CategoryAggregator');
                }}
              >
                <View
                  style={[
                    styles.categoryCard,
                    { backgroundColor: category.color },
                  ]}
                />
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                <ThemedText style={styles.categoryCount}>{category.itemCount}+ Items</ThemedText>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  ageGroupsContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: 8,
  },
  ageTab: {
    marginHorizontal: 4,
  },
  ageTabBadge: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  ageTabBadgeActive: {
    borderColor: '#FF8C00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ageTabActive: {},
  ageTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  ageTabTextActive: {
    color: '#FF8C00',
    fontWeight: '700',
  },
  ageInfoSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: '#FAFAFA',
  },
  ageGroupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  ageGroupSubtitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  categoriesContainer: {
    flex: 1,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryWrapper: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: '100%',
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 48) / 4,
    height: (SCREEN_WIDTH - 48) / 4,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 9,
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
  },
});
