import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView, Dimensions, FlatList } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { TopHeader } from '@/components/TopHeader';
import { Colors } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');
const screenHeight = Dimensions.get('window').height;

interface Section {
  id: string;
  title: string;
  description?: string;
  icon: string;
  backgroundColor: string;
  gradientColors?: string[];
}

interface AdBanner {
  id: string;
  title: string;
  subtitle: string;
  gradientColors: string[];
  icon: string;
  image?: any;
}

const girlBannerImage = require('../attached_assets/generated_images/baby_girl_discount_banner.png');
const boyBannerImage = require('../attached_assets/generated_images/baby_boy_winter_sale_banner.png');
const megaSaleBannerImage = require('../attached_assets/generated_images/mega_kids_fashion_sale.png');

const adBanners: AdBanner[] = [
  {
    id: '1',
    title: 'Baby Girl Fashion',
    subtitle: 'FLAT 40% OFF',
    gradientColors: ['#FFE5D5', '#FFDCC4'],
    icon: '👧',
    image: girlBannerImage,
  },
  {
    id: '2',
    title: 'Baby Boy Fashion',
    subtitle: 'WINTER SALE 50% OFF',
    gradientColors: ['#E0F7FA', '#B3E5FC'],
    icon: '👦',
    image: boyBannerImage,
  },
  {
    id: '3',
    title: 'Mega Kids Sale',
    subtitle: 'UP TO 60% OFF',
    gradientColors: ['#FFF8E1', '#FFEB3B'],
    icon: '🎉',
    image: megaSaleBannerImage,
  },
];

export default function AgeGroupDetailScreen() {
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { ageRange, gender, color } = route.params || {};
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const carouselRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sections: Section[] = gender === 'girls' 
    ? [
        {
          id: '1',
          title: 'Baby Girl Clothes',
          description: 'Explore our curated collection of fashionable baby girl clothes',
          icon: '👗',
          backgroundColor: '#FFE5F0',
        },
        {
          id: '2',
          title: 'Winter Wonderland',
          description: 'Warm and cozy winter essentials for your little one',
          icon: '❄️',
          backgroundColor: '#E0F2FE',
        },
        {
          id: '3',
          title: 'Newborn Checklist',
          description: 'Essential items checklist for newborn baby girls',
          icon: '✓',
          backgroundColor: '#FFF3E0',
        },
        {
          id: '4',
          title: 'Occasion Wear',
          description: 'Special occasion dresses and outfits for baby girls',
          icon: '🎀',
          backgroundColor: '#FFB3D9',
          gradientColors: ['#FF69B4', '#FFB6D9'],
        },
        {
          id: '5',
          title: 'Accessories',
          description: 'Cute accessories and add-ons for your baby',
          icon: '🎀',
          backgroundColor: '#D8BFD8',
        },
        {
          id: '6',
          title: 'Budget Store',
          description: 'Affordable options for baby girl fashion',
          icon: '🏪',
          backgroundColor: '#FF6B6B',
        },
        {
          id: '7',
          title: 'Footwear',
          description: 'Comfortable and stylish shoes for baby girls',
          icon: '👟',
          backgroundColor: '#FFB6D9',
        },
      ]
    : [
        {
          id: '1',
          title: 'Baby Boy Clothes',
          description: 'Explore our curated collection of fashionable baby boy clothes',
          icon: '👕',
          backgroundColor: '#E3F2FD',
        },
        {
          id: '2',
          title: 'Winter Wonderland',
          description: 'Warm and cozy winter essentials for your little one',
          icon: '❄️',
          backgroundColor: '#E0F2FE',
        },
        {
          id: '3',
          title: 'Newborn Checklist',
          description: 'Essential items checklist for newborn baby boys',
          icon: '✓',
          backgroundColor: '#FFF3E0',
        },
        {
          id: '4',
          title: 'Occasion Wear',
          description: 'Special occasion outfits for baby boys',
          icon: '🎩',
          backgroundColor: '#B3D9FF',
          gradientColors: ['#4169E1', '#87CEEB'],
        },
        {
          id: '5',
          title: 'Accessories',
          description: 'Cute accessories and add-ons for your baby',
          icon: '🎀',
          backgroundColor: '#C0C0C0',
        },
        {
          id: '6',
          title: 'Budget Store',
          description: 'Affordable options for baby boy fashion',
          icon: '🏪',
          backgroundColor: '#FF6B6B',
        },
        {
          id: '7',
          title: 'Footwear',
          description: 'Comfortable and stylish shoes for baby boys',
          icon: '👟',
          backgroundColor: '#FFB6D9',
        },
      ];

  const toggleSection = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Auto-scroll carousel
  useFocusEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % adBanners.length;
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  });

  const renderAdBanner = ({ item }: { item: AdBanner }) => (
    <Pressable style={styles.adBannerContainer}>
      {item.image ? (
        <Image 
          source={item.image}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      ) : (
        <LinearGradient
          colors={item.gradientColors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.adBannerGradient}
        >
          <View style={styles.adBannerContent}>
            <ThemedText style={styles.adBannerIcon}>{item.icon}</ThemedText>
            <View style={styles.adTextContainer}>
              <ThemedText style={styles.adTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.adSubtitle}>{item.subtitle}</ThemedText>
            </View>
            <Feather name="arrow-right" size={20} color="#1F2937" />
          </View>
        </LinearGradient>
      )}
      {item.image && (
        <View style={styles.bannerOverlay}>
          <View style={styles.bannerBadge}>
            <ThemedText style={styles.badgeText}>{item.subtitle}</ThemedText>
          </View>
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Top Header with Back Button */}
      <TopHeader showBackButton={true} />
      
      {/* Ad Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={carouselRef}
          data={adBanners}
          renderItem={renderAdBanner}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={screenWidth - 32}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (screenWidth - 32));
            setCurrentIndex(index);
          }}
        />
      </View>

      {/* Header */}
      <View style={styles.headerTop}>
        <View style={styles.headerContent}>
          <ThemedText style={styles.headerTitle}>
            {gender === 'girls' ? 'Girl' : 'Boy'} Fashion {ageRange}
          </ThemedText>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner - Optional */}

        {/* Accordion Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map((section) => (
            <View key={section.id} style={styles.sectionWrapper}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: section.backgroundColor }]}>
                  <ThemedText style={styles.sectionIcon}>{section.icon}</ThemedText>
                </View>
                <View style={styles.sectionTitleContainer}>
                  <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
                  <ThemedText style={styles.sectionDescription}>{section.description}</ThemedText>
                </View>
                <Feather
                  name={expandedId === section.id ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#666"
                />
              </Pressable>

              {/* Expanded Content */}
              {expandedId === section.id && (
                <View style={styles.expandedContent}>
                  <View style={styles.itemsGrid}>
                    {[1, 2, 3, 4].map((item) => (
                      <Pressable key={item} style={styles.gridItem}>
                        <View style={[styles.itemImageContainer, { backgroundColor: section.backgroundColor }]}>
                          <ThemedText style={styles.itemEmoji}>🛍️</ThemedText>
                        </View>
                        <ThemedText style={styles.itemName}>Item {item}</ThemedText>
                      </Pressable>
                    ))}
                  </View>
                  <Pressable style={styles.viewMoreButton}>
                    <ThemedText style={styles.viewMoreText}>View All Items →</ThemedText>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  carouselContainer: {
    height: 280,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  carouselContent: {
    paddingHorizontal: 8,
  },
  adBannerContainer: {
    width: screenWidth - 32,
    height: 260,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  adBannerGradient: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  adBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adBannerIcon: {
    fontSize: 40,
  },
  adTextContainer: {
    flex: 1,
  },
  adTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  adSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  headerTop: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#999',
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
  },
  itemImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemEmoji: {
    fontSize: 40,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  viewMoreButton: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
});
