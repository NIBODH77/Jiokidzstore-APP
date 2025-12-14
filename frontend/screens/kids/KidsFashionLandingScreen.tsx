import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { GIRLS_AGE_GROUPS, BOYS_AGE_GROUPS, AgeGenderGroup } from '@/data/kidsFashionData';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 5;

const girlsImages: { [key: string]: any } = {
  'g1': require('../../attached_assets/generated_images/newborn_baby_girl_pink_onesie.png'),
  'g2': require('../../attached_assets/generated_images/infant_baby_girl_striped_pink_shirt.png'),
  'g3': require('../../attached_assets/generated_images/toddler_girl_purple_floral_dress.png'),
  'g4': require('../../attached_assets/generated_images/preschool_girl_pink_casual_outfit.png'),
  'g5': require('../../attached_assets/generated_images/school_girl_colorblock_dress.png'),
};

const boysImages: { [key: string]: any } = {
  'b1': require('../../attached_assets/generated_images/newborn_baby_boy_blue_onesie.png'),
  'b2': require('../../attached_assets/generated_images/infant_baby_boy_blue_shirt.png'),
  'b3': require('../../attached_assets/generated_images/toddler_boy_navy_outfit.png'),
  'b4': require('../../attached_assets/generated_images/preschool_boy_blue_graphic_shirt.png'),
  'b5': require('../../attached_assets/generated_images/school_boy_blue_hoodie.png'),
};

export default function KidsFashionLandingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const handleAgeGroupPress = (group: AgeGenderGroup) => {
    navigation.navigate('AgeGenderLanding', {
      gender: group.gender,
      ageRange: group.ageRange,
      color: group.bgColor,
    });
  };

  const renderAgeCard = (group: AgeGenderGroup, image: any) => (
    <Pressable
      key={group.id}
      style={[styles.ageCard, { backgroundColor: group.bgColor }]}
      onPress={() => handleAgeGroupPress(group)}
    >
      <Image source={image} style={styles.ageCardImage} resizeMode="cover" />
      <Text style={styles.ageCardLabel}>{group.label}</Text>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { paddingTop: Spacing.lg }]}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BABY & KIDS FASHION</Text>
          <Text style={styles.sectionSubtitle}>Shop by Age & Gender</Text>
        </View>

        {/* Girls Section */}
        <View style={styles.genderSection}>
          <View style={styles.genderHeader}>
            <View style={[styles.genderBadge, { backgroundColor: '#FFE5F0' }]}>
              <Text style={[styles.genderBadgeText, { color: '#FF69B4' }]}>👧 GIRLS</Text>
            </View>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ageCardsRow}
          >
            {GIRLS_AGE_GROUPS.map((group) => renderAgeCard(group, girlsImages[group.id]))}
          </ScrollView>
        </View>

        {/* Boys Section */}
        <View style={styles.genderSection}>
          <View style={styles.genderHeader}>
            <View style={[styles.genderBadge, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.genderBadgeText, { color: '#4169E1' }]}>👦 BOYS</Text>
            </View>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ageCardsRow}
          >
            {BOYS_AGE_GROUPS.map((group) => renderAgeCard(group, boysImages[group.id]))}
          </ScrollView>
        </View>

        {/* Featured Categories Banner */}
        <View style={styles.bannerSection}>
          <LinearGradient
            colors={['#FF8C00', '#FFD4A3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.featuredBanner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Winter Collection</Text>
              <Text style={styles.bannerSubtitle}>Up to 50% OFF</Text>
              <Pressable style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Shop Now</Text>
                <Feather name="arrow-right" size={16} color="#FF8C00" />
              </Pressable>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Categories */}
        <View style={styles.quickCategories}>
          <Text style={styles.quickCategoriesTitle}>Popular Categories</Text>
          <View style={styles.quickCategoriesGrid}>
            {[
              { name: 'Winter Wear', icon: '🧥', color: '#FFF3E0' },
              { name: 'Party Wear', icon: '🎀', color: '#E1BEE7' },
              { name: 'Ethnic Wear', icon: '🥻', color: '#FFECB3' },
              { name: 'Footwear', icon: '👟', color: '#B2DFDB' },
            ].map((cat, index) => (
              <Pressable key={index} style={[styles.quickCategoryCard, { backgroundColor: cat.color }]}>
                <Text style={styles.quickCategoryIcon}>{cat.icon}</Text>
                <Text style={styles.quickCategoryName}>{cat.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingBottom: 100,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  genderSection: {
    marginBottom: 24,
  },
  genderHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  genderBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  genderBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  ageCardsRow: {
    paddingHorizontal: 12,
    gap: 10,
  },
  ageCard: {
    width: CARD_WIDTH,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 8,
  },
  ageCardImage: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  ageCardLabel: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 14,
  },
  bannerSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featuredBanner: {
    borderRadius: 16,
    padding: 20,
  },
  bannerContent: {
    alignItems: 'flex-start',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 4,
    opacity: 0.9,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF8C00',
  },
  quickCategories: {
    paddingHorizontal: 16,
  },
  quickCategoriesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  quickCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickCategoryCard: {
    width: (width - 44) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  quickCategoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickCategoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});
