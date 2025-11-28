import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

const categoryImages = {
  'Boy Fashion': require('../../attached_assets/generated_images/boys_casual_fashion_clothing.png'),
  'Girl Fashion': require('../../attached_assets/generated_images/girls_fashion_clothing.png'),
  'Footwear': require('../../attached_assets/generated_images/kids_footwear_shoes.png'),
  'Toys': require('../../attached_assets/generated_images/colorful_kids_toys.png'),
  'Diapers': require('../../attached_assets/generated_images/baby_diapers_products.png'),
  'Books': require('../../attached_assets/generated_images/colorful_children_books.png'),
  'Accessories': require('../../attached_assets/generated_images/kids_accessories_collection.png'),
  'Baby Care': require('../../attached_assets/generated_images/baby_care_products.png'),
};

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
  { id: '1', name: 'Footwear', bgColor: '#E3F2FD' },
  { id: '2', name: 'Fashion Accessories', bgColor: '#FCE4EC' },
  { id: '3', name: 'Disney & Marvel', bgColor: '#FFF3E0' },
  { id: '4', name: 'Toys & Gaming', bgColor: '#F3E5F5' },
  { id: '5', name: 'Baby Gear', bgColor: '#E8F5E9' },
  { id: '6', name: 'Diapering & Potty', bgColor: '#FFEBEE' },
  { id: '7', name: 'Bath & Skin Care', bgColor: '#E0F7FA' },
  { id: '8', name: 'Feeding & Nursing', bgColor: '#FFF8E1' },
  { id: '9', name: 'Health & Safety', bgColor: '#E3F2FD' },
  { id: '10', name: 'Baby Nursery', bgColor: '#FCE4EC' },
  { id: '11', name: 'Art & Hobbies', bgColor: '#FFF3E0' },
  { id: '12', name: 'Books', bgColor: '#F3E5F5' },
  { id: '13', name: 'School Supplies', bgColor: '#E8F5E9' },
  { id: '14', name: 'Sports & Outdoor', bgColor: '#FFEBEE' },
  { id: '15', name: 'Home & Living', bgColor: '#E0F7FA' },
  { id: '16', name: 'Birthday & Gifts', bgColor: '#FFF8E1' },
  { id: '17', name: 'Electronics & Tech', bgColor: '#E3F2FD' },
  { id: '18', name: 'Moms & Maternity', bgColor: '#FCE4EC' },
  { id: '19', name: 'Beauty & Care', bgColor: '#FFF3E0' },
  { id: '20', name: 'Special Deals', bgColor: '#F3E5F5' },
];

export default function JioKidsLandingScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF6B9D', '#FF8FB3', '#FFB8D0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 16 }]}
      >
        <Text style={styles.welcomeTitle}>Welcome to JioKids</Text>
        <Text style={styles.welcomeSubtitle}>Shop for Kids Products</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
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
              <View key={category.id} style={styles.categoryItem}>
                <View 
                  style={[styles.categoryCard, { backgroundColor: category.bgColor }]}
                >
                  <View style={styles.categoryImageContainer}>
                    <Image 
                      source={categoryImages[category.name as keyof typeof categoryImages] || categoryImages['Toys']}
                      style={styles.categoryImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
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
    paddingHorizontal: 8,
    gap: 8,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryCard: {
    width: '100%',
    aspectRatio: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '85%',
    height: '85%',
  },
  categoryName: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});
