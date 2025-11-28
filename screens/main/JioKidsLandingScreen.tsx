import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STATS = [
  { value: '50K+', label: 'Happy Parents' },
  { value: '100K+', label: 'Products' },
  { value: '4.8★', label: 'Rating' },
];

const FEATURES = [
  { title: 'Fast Delivery', subtitle: '24-48 hour shipping' },
  { title: '100% Safe', subtitle: 'Certified products' },
  { title: 'Best Brands', subtitle: 'Trusted quality' },
  { title: '24/7 Support', subtitle: 'Always here to help' },
];

const CATEGORIES = [
  { id: '1', name: 'Boy Fashion', emoji: '👦' },
  { id: '2', name: 'Girl Fashion', emoji: '👧' },
  { id: '3', name: 'Footwear', emoji: '👟' },
  { id: '4', name: 'Toys', emoji: '🧸' },
  { id: '5', name: 'Diapers', emoji: '🍼' },
  { id: '6', name: 'Books', emoji: '📚' },
  { id: '7', name: 'Accessories', emoji: '🎒' },
  { id: '8', name: 'Baby Care', emoji: '🐤' },
];

interface JioKidsLandingScreenProps {
  onNavigateToShopping?: () => void;
}

export default function JioKidsLandingScreen({ onNavigateToShopping }: JioKidsLandingScreenProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const handleCategoryPress = (categoryId: string) => {
    if (onNavigateToShopping) {
      onNavigateToShopping();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#FF9EB5', '#FFD4E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 20 }]}
        >
          <Text style={styles.welcomeTitle}>Welcome to JioKids</Text>
          <Text style={styles.welcomeSubtitle}>Shop for Kids Products</Text>
        </LinearGradient>

        <View style={styles.statsContainer}>
          {STATS.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why JioKids?</Text>
          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIndicator} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -25,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  featureIndicator: {
    width: 4,
    height: 40,
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (SCREEN_WIDTH - 60) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '500',
  },
});
