import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { CATEGORIES } from '@/data/mockData';
import type { CategoriesStackParamList } from '@/navigation/CategoriesStackNavigator';

export default function CategoriesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CategoriesStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('CategoryListing', { categoryId, categoryName });
  };

  return (
    <ScreenScrollView>
      <View style={[styles.container, { paddingTop: Spacing.lg }]}>
        {CATEGORIES.map(category => (
          <Pressable
            key={category.id}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && styles.categoryCardPressed,
            ]}
            onPress={() => handleCategoryPress(category.id, category.name)}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
              <Feather name={category.icon as any} size={32} color="#FFFFFF" />
            </View>
            <View style={styles.categoryInfo}>
              <ThemedText type="h3">{category.name}</ThemedText>
              <ThemedText type="caption" style={styles.itemCount}>
                {category.itemCount} items
              </ThemedText>
            </View>
            <Feather name="chevron-right" size={24} color={Colors.light.textGray} />
          </Pressable>
        ))}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundRoot,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  categoryCardPressed: {
    opacity: 0.7,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  categoryInfo: {
    flex: 1,
  },
  itemCount: {
    color: Colors.light.textGray,
    marginTop: 2,
  },
});
