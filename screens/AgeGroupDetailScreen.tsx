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

interface BoutiqueCard {
  id: string;
  image: any;
  title: string;
  subtitle: string;
  hasTimer?: boolean;
  timerText?: string;
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
  const seasonScrollRef = useRef<ScrollView>(null);
  const [seasonScrollIndex, setSeasonScrollIndex] = useState(0);

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

  // Auto-scroll Season's Favourite carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setSeasonScrollIndex((prev) => (prev + 1) % 9); // 9 total cards
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seasonScrollRef.current) {
      const scrollPosition = seasonScrollIndex * 130; // 120px card + 10px gap
      seasonScrollRef.current.scrollTo({
        x: scrollPosition,
        animated: true,
      });
    }
  }, [seasonScrollIndex]);

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

        {/* JioKidz Boutiques - Winter Wonderland Section */}
        <View style={styles.boutiquesSection}>
          {/* Header Banner with Baby Image */}
          <View style={styles.boutiquesHeader}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=150&fit=crop' }}
              style={styles.boutiquesHeaderBabyImage}
              resizeMode="cover"
            />
            <View style={styles.boutiquesHeaderTextContainer}>
              <View style={styles.boutiquesLogoRow}>
                <ThemedText style={styles.jioText}>Jio</ThemedText>
                <ThemedText style={styles.kidzText}>Kidz</ThemedText>
                <ThemedText style={styles.boutiquesText}> BOUTIQUES</ThemedText>
              </View>
              <View style={styles.winterWonderlandRow}>
                <ThemedText style={styles.winterText}>Winter</ThemedText>
                <ThemedText style={styles.wonderlandText}>WONDERLAND</ThemedText>
              </View>
            </View>
          </View>

          {/* Promotional Cards Row */}
          <View style={styles.boutiqueCardsRow}>
            {/* Left Card - Fashion Sale */}
            <View style={styles.boutiqueCardSmall}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200&h=300&fit=crop' }}
                style={styles.boutiqueCardImage}
                resizeMode="cover"
              />
              <View style={styles.stocksLastBadge}>
                <ThemedText style={styles.stocksLastText}>Until stocks last</ThemedText>
              </View>
              <Pressable style={styles.shopNowButton}>
                <ThemedText style={styles.shopNowText}>SHOP NOW</ThemedText>
              </Pressable>
            </View>

            {/* Right Card - Pantaloons */}
            <View style={styles.boutiqueCardLarge}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop' }}
                style={styles.boutiqueCardImageLarge}
                resizeMode="cover"
              />
              <View style={styles.pantaloonsOverlay}>
                <ThemedText style={styles.turnUpText}>Turn Up the</ThemedText>
                <ThemedText style={styles.warmthText}>WARMTH</ThemedText>
                <View style={styles.pantaloonsRow}>
                  <ThemedText style={styles.withText}>with </ThemedText>
                  <ThemedText style={styles.pantaloonsLogo}>PANTALOONS</ThemedText>
                </View>
                <ThemedText style={styles.jeansJacketsText}>Jeans, Jackets &{'\n'}More</ThemedText>
                <View style={styles.discountBadge}>
                  <ThemedText style={styles.uptoText}>UPTO</ThemedText>
                  <ThemedText style={styles.fiftyText}>50</ThemedText>
                  <ThemedText style={styles.percentOffText}>%OFF{'>'}</ThemedText>
                </View>
              </View>
              <View style={styles.timerBadge}>
                <Feather name="clock" size={12} color="#666" />
                <ThemedText style={styles.timerText}>1d</ThemedText>
              </View>
            </View>
          </View>

          {/* Effortless Looks Card */}
          <View style={styles.effortlessCard}>
            <ThemedText style={styles.effortlessTitle}>Effortless Looks, Endless Style</ThemedText>
            <ThemedText style={styles.effortlessSubtitle}>Shop new-season favorites & more</ThemedText>
            <Pressable style={styles.shopNowButtonOutline}>
              <ThemedText style={styles.shopNowTextDark}>SHOP NOW</ThemedText>
            </Pressable>
          </View>

          {/* View All Boutiques Button */}
          <Pressable style={styles.viewAllBoutiquesButton}>
            <ThemedText style={styles.viewAllBoutiquesText}>VIEW ALL BOUTIQUES {'>'}</ThemedText>
          </Pressable>
        </View>

        {/* Season's Favourite Section */}
        <View style={styles.seasonSection}>
          <View style={styles.seasonHeader}>
            <ThemedText style={styles.seasonTitle}>Season's Favourite</ThemedText>
            <View style={styles.discountTag}>
              <ThemedText style={styles.uptoSmall}>Upto</ThemedText>
              <ThemedText style={styles.discountPercent}>60</ThemedText>
              <ThemedText style={styles.percentOff}>%Off</ThemedText>
            </View>
          </View>
          <ScrollView 
            ref={seasonScrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.seasonScrollContent}
            scrollEventThrottle={16}
          >
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Sweatshirts{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Jackets{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>sweater sets{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Rompers{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Thermals{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Party Wear{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Winter Caps{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Dresses{'>'}</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.seasonCardSlide}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200&h=250&fit=crop' }}
                style={styles.seasonCardImage}
                resizeMode="cover"
              />
              <View style={styles.seasonCardLabel}>
                <ThemedText style={styles.seasonCardText}>Coats{'>'}</ThemedText>
              </View>
            </Pressable>
          </ScrollView>
        </View>

        {/* Cold-Weather Essentials Section */}
        <View style={styles.coldWeatherSection}>
          <ThemedText style={styles.coldWeatherTitle}>Cold-Weather Essentials</ThemedText>
          <ThemedText style={styles.coldWeatherSubtitle}>From Head to Toe: Winter Must-Haves</ThemedText>
          <View style={styles.coldWeatherGrid}>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Onesies & Rompers{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>sweaters{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Sets & suits{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Winterwear{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Thermals{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Caps & Gloves{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Jackets{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1520689564069-2cfee5c6052c?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Mittens{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1539671435995-90bbe6ffed96?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Booties{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1528987122490-c0e9ddceee08?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Scarves{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1520695917143-a1a6ac5eb4d5?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Sweatshirts{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1520706857378-af106a4cd819?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Coats{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1513076620552-46a46e3e34e6?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Socks Set{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544526096-fb3fc6f95f98?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Leggings{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Track Suits{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1563707902-91c9ba9e4b67?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Cardigans{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Winter Gloves{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.coldWeatherCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1562183241-bd70a528e92e?w=150&h=180&fit=crop' }}
                style={styles.coldWeatherCardImage}
                resizeMode="cover"
              />
              <ThemedText style={styles.coldWeatherCardText}>Thermal Sets{'>'}</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Brands to Eye On Section */}
        <View style={styles.brandsSection}>
          <View style={styles.brandsHeader}>
            <ThemedText style={styles.brandsTitle}>BRANDS TO EYE ON</ThemedText>
            <View style={styles.discountTag}>
              <ThemedText style={styles.uptoSmall}>Upto</ThemedText>
              <ThemedText style={styles.discountPercent}>60</ThemedText>
              <ThemedText style={styles.percentOff}>%Off</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.brandsSubtitle}>Winter's finest for your little wonders</ThemedText>
          <View style={styles.brandsGrid}>
            <Pressable style={[styles.brandCard, { backgroundColor: '#FFE4EC' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { backgroundColor: '#E91E63', color: '#FFF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }]}>babyhug</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#E8F5E9' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#FFF', backgroundColor: '#8BC34A', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }]}>babyoye</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#E3F2FD' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#1976D2' }]}>carter's</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#FFF3E0' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#E91E63' }]}>cutewalk</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#FCE4EC' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#333' }]}>Disney | babyhug</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#E8F5E9' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#4CAF50' }]}>Doodle Poodle</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#FFF8E1' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#FF9800' }]}>MARK & MIA</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#E3F2FD' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#333' }]}>Kookie Kids</ThemedText>
              </View>
            </Pressable>
            <Pressable style={[styles.brandCard, { backgroundColor: '#FFEBEE' }]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&h=150&fit=crop' }}
                style={styles.brandCardImage}
                resizeMode="cover"
              />
              <View style={styles.brandLogoContainer}>
                <ThemedText style={[styles.brandLogo, { color: '#E91E63' }]}>TOFFYHOUSE</ThemedText>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Everyday Innerwear Section */}
        <View style={styles.innerwearSection}>
          <ThemedText style={styles.innerwearTitle}>Everday Innerwear</ThemedText>
          <View style={styles.innerwearGrid}>
            <Pressable style={styles.innerwearCard}>
              <LinearGradient
                colors={['#E8F5E9', '#B3E5FC']}
                style={styles.innerwearCardGradient}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&h=150&fit=crop' }}
                  style={styles.innerwearCardImage}
                  resizeMode="contain"
                />
              </LinearGradient>
              <ThemedText style={styles.innerwearCardText}>Thermal{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.innerwearCard}>
              <LinearGradient
                colors={['#FFF9C4', '#FFECB3']}
                style={styles.innerwearCardGradient}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=150&h=150&fit=crop' }}
                  style={styles.innerwearCardImage}
                  resizeMode="contain"
                />
              </LinearGradient>
              <ThemedText style={styles.innerwearCardText}>Jhablas{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.innerwearCard}>
              <LinearGradient
                colors={['#FCE4EC', '#F8BBD9']}
                style={styles.innerwearCardGradient}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=150&h=150&fit=crop' }}
                  style={styles.innerwearCardImage}
                  resizeMode="contain"
                />
              </LinearGradient>
              <ThemedText style={styles.innerwearCardText}>Slips & Camisoles{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.innerwearCard}>
              <LinearGradient
                colors={['#FFCDD2', '#EF9A9A']}
                style={styles.innerwearCardGradient}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=150&h=150&fit=crop' }}
                  style={styles.innerwearCardImage}
                  resizeMode="contain"
                />
              </LinearGradient>
              <ThemedText style={styles.innerwearCardText}>Innerwear sets{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.innerwearCard}>
              <LinearGradient
                colors={['#E1F5FE', '#B3E5FC']}
                style={styles.innerwearCardGradient}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=150&h=150&fit=crop' }}
                  style={styles.innerwearCardImage}
                  resizeMode="contain"
                />
              </LinearGradient>
              <ThemedText style={styles.innerwearCardText}>Bloomers{'>'}</ThemedText>
            </Pressable>
            <Pressable style={styles.innerwearCard}>
              <LinearGradient
                colors={['#F3E5F5', '#E1BEE7']}
                style={styles.innerwearCardGradient}
              >
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop' }}
                  style={styles.innerwearCardImage}
                  resizeMode="contain"
                />
              </LinearGradient>
              <ThemedText style={styles.innerwearCardText}>Multi packs{'>'}</ThemedText>
            </Pressable>
          </View>
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
  boutiquesSection: {
    marginTop: 24,
    marginBottom: 16,
  },
  boutiquesHeader: {
    backgroundColor: '#2C3E50',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 120,
    marginBottom: 12,
  },
  boutiquesHeaderBabyImage: {
    width: 140,
    height: '100%',
  },
  boutiquesHeaderTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#34495E',
  },
  boutiquesLogoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  jioText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  kidzText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFD93D',
  },
  boutiquesText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  winterWonderlandRow: {
    alignItems: 'center',
  },
  winterText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3498DB',
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wonderlandText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F39C12',
    letterSpacing: 2,
  },
  boutiqueCardsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  boutiqueCardSmall: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  boutiqueCardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  stocksLastBadge: {
    position: 'absolute',
    bottom: 50,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stocksLastText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  shopNowButton: {
    position: 'absolute',
    bottom: 12,
    left: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  shopNowText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  boutiqueCardLarge: {
    flex: 1.5,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E8E8E8',
  },
  boutiqueCardImageLarge: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  pantaloonsOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '55%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 10,
    justifyContent: 'center',
  },
  turnUpText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  warmthText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 2,
  },
  pantaloonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  withText: {
    fontSize: 10,
    color: '#666',
  },
  pantaloonsLogo: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E67E22',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  jeansJacketsText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 6,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#1F2937',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  uptoText: {
    fontSize: 8,
    color: '#FFFFFF',
    marginRight: 4,
  },
  fiftyText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F1C40F',
  },
  percentOffText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timerBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  timerText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  effortlessCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  effortlessTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  effortlessSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  shopNowButtonOutline: {
    borderWidth: 1,
    borderColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  shopNowTextDark: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllBoutiquesButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1F2937',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewAllBoutiquesText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 1,
  },
  seasonSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  seasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  seasonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  discountTag: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  uptoSmall: {
    fontSize: 12,
    color: '#666',
    marginRight: 2,
  },
  discountPercent: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF6B35',
  },
  percentOff: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  seasonScrollContent: {
    paddingRight: 16,
    gap: 10,
  },
  seasonCardSlide: {
    width: 120,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  seasonGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  seasonCard: {
    flex: 1,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  seasonCardImage: {
    width: '100%',
    height: '100%',
  },
  seasonCardLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  seasonCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  coldWeatherSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  coldWeatherTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  coldWeatherSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  coldWeatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  coldWeatherCard: {
    width: (screenWidth - 32 - 16) / 3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  coldWeatherCardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F0F0F0',
  },
  coldWeatherCardText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 6,
    paddingVertical: 8,
    textAlign: 'center',
  },
  brandsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  brandsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  brandsSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandCard: {
    width: (screenWidth - 48) / 3,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
  },
  brandCardImage: {
    width: '100%',
    height: 100,
  },
  brandLogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  brandLogo: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  innerwearSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  innerwearTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  innerwearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  innerwearCard: {
    width: (screenWidth - 48) / 3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  innerwearCardGradient: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerwearCardImage: {
    width: '80%',
    height: '80%',
  },
  innerwearCardText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 6,
    paddingVertical: 8,
    textAlign: 'center',
  },
});
