import React, { useState, useMemo, useRef, useEffect } from 'react';
import { StyleSheet, View, Pressable, FlatList, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing } from '@/constants/theme';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

const { width: screenWidth } = Dimensions.get('window');

interface ModernSearchBarProps {
  onSearch?: (text: string) => void;
  onProductSelect?: (productId: string) => void;
  products?: any[];
  onMicPress?: () => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onCartPress?: () => void;
  onWishlistPress?: () => void;
  onProfilePress?: () => void;
  notificationCount?: number;
  cartCount?: number;
}

// Banner data for auto-scroll
const BANNERS = [
  { id: '1', image: require('@/attached_assets/WhatsApp Image 2025-11-29 at 3.25.16 PM_1764410805074.jpeg') },
  { id: '2', image: require('@/attached_assets/generated_images/baby_girl_discount_banner.png') },
  { id: '3', image: require('@/attached_assets/generated_images/baby_boy_winter_sale_banner.png') },
  { id: '4', image: require('@/attached_assets/generated_images/mega_kids_fashion_sale.png') },
];

export function ModernSearchBar({ 
  onSearch, 
  onProductSelect,
  products = [],
  onMicPress,
  onLocationPress,
  onNotificationPress,
  onCartPress,
  onWishlistPress,
  onProfilePress,
  notificationCount = 0,
  cartCount = 0
}: ModernSearchBarProps) {
  const navigation = useNavigation();
  const bannerScrollRef = useRef<FlatList>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-scroll banners
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % BANNERS.length;
      setCurrentBannerIndex(nextIndex);
      bannerScrollRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const renderBanner = ({ item }: any) => (
    <View style={styles.bannerItem}>
      <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.fixedHeader}>
        <View style={styles.container}>
      {/* Top Row: Logo and Icons */}
      <View style={styles.topRow}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/attached_assets/JioKidslogo_1763923777175.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.iconsContainer}>
          <Pressable style={styles.headerIconBtn} onPress={onSearch}>
            <Feather name="search" size={20} color="#333333" />
          </Pressable>

          <Pressable style={styles.headerIconBtn} onPress={onWishlistPress}>
            <Feather name="heart" size={20} color="#333333" />
          </Pressable>

          <Pressable style={styles.headerIconBtn} onPress={onNotificationPress}>
            <Feather name="bell" size={20} color="#333333" />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <View style={styles.badgeDot} />
              </View>
            )}
          </Pressable>

          <Pressable style={styles.headerIconBtn} onPress={onProfilePress}>
            <Feather name="user" size={20} color="#333333" />
          </Pressable>

          <Pressable style={styles.headerIconBtn} onPress={onCartPress}>
            <Feather name="shopping-cart" size={20} color="#333333" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <View style={styles.badgeDot} />
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Full Width Location Box */}
      <Pressable style={styles.locationBox} onPress={onLocationPress}>
        <Feather name="map-pin" size={14} color="#666666" />
        <ThemedText style={styles.locationPlaceholder}>
          Select delivery location
        </ThemedText>
      </Pressable>
      </View>
      </View>

      {/* Auto-scrolling Banners */}
      <View style={styles.bannersContainer}>
        <FlatList
          ref={bannerScrollRef}
          data={BANNERS}
          renderItem={renderBanner}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={screenWidth - 32}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (screenWidth - 32));
            setCurrentBannerIndex(index);
          }}
        />

        {/* Pagination Dots */}
        <View style={styles.paginationDots}>
          {BANNERS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentBannerIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: '#FFFFFF',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: '#FFFFFF',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 45,
  },
  locationBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginBottom: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  locationPlaceholder: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  bannersContainer: {
    height: 200,
    marginBottom: 8,
    marginTop: 180,
  },
  bannerItem: {
    width: screenWidth - 32,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#666666',
  },
});