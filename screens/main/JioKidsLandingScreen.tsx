import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

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

export default function JioKidsLandingScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#FF6B9D', '#FFA8C5', '#FFD4E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 32 }]}
        >
          <Text style={styles.welcomeTitle}>Welcome to JioKids</Text>
          <Text style={styles.welcomeSubtitle}>Shop for Kids Products</Text>
        </LinearGradient>

        <View style={styles.statsWrapper}>
          <View style={styles.statsContainer}>
            {STATS.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why JioKids?</Text>
          <View style={styles.featuresContainer}>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesGrid}>
              {CATEGORIES.map((category) => (
                <View key={category.id} style={styles.categoryItem}>
                  <View style={styles.categoryEmojiContainer}>
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 17,
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  statsWrapper: {
    paddingHorizontal: 16,
    marginTop: -30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
    }),
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.light.primary,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 18,
    letterSpacing: 0.3,
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  featureIndicator: {
    width: 5,
    height: 44,
    backgroundColor: Colors.light.primary,
    borderRadius: 3,
    marginRight: 18,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: (SCREEN_WIDTH - 72) / 4,
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  categoryEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF5F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 16,
  },
});
