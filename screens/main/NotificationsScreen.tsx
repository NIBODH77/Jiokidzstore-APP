import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Spacing, BorderRadius } from '@/constants/theme';

type TabType = 'offers' | 'orders';

const FIXED_HEADER_HEIGHT = 70;

const Sparkle = ({ style }: { style: any }) => {
  const opacityRef = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityRef, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityRef, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityRef]);

  return (
    <Animated.View style={[styles.sparkle, style, { opacity: opacityRef }]}>
      <View style={styles.sparkleInner} />
    </Animated.View>
  );
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('offers');
  
  const topPadding = Platform.OS === 'web' ? FIXED_HEADER_HEIGHT : insets.top + FIXED_HEADER_HEIGHT;

  const handleContinueShopping = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      (parentNav as any).navigate('HomeTab');
    } else {
      (navigation as any).navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Section */}
      <View style={[styles.tabContainer, { marginTop: topPadding }]}>
        <Pressable
          onPress={() => setActiveTab('offers')}
          style={[styles.tab, activeTab === 'offers' && styles.tabActive]}
        >
          <ThemedText 
            style={[
              styles.tabText,
              activeTab === 'offers' && styles.tabTextActive
            ]}
          >
            OFFERS
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('orders')}
          style={[styles.tab, activeTab === 'orders' && styles.tabActive]}
        >
          <ThemedText 
            style={[
              styles.tabText,
              activeTab === 'orders' && styles.tabTextActive
            ]}
          >
            ORDERS
          </ThemedText>
        </Pressable>
      </View>

      {/* Content Area with Gradient */}
      <LinearGradient
        colors={['#FFF0F3', '#FFFFFF']}
        style={styles.contentArea}
      >
        {activeTab === 'offers' ? (
          // OFFERS TAB CONTENT
          <View style={styles.emptyContainer}>
            {/* Bell Icon with Sparkles */}
            <View style={styles.iconWrapper}>
              <Sparkle style={styles.sparkleTopLeft} />
              <Sparkle style={styles.sparkleTopRight} />
              <Sparkle style={styles.sparkleBottomLeft} />
              <Sparkle style={styles.sparkleBottomRight} />

              <View style={styles.iconBg}>
                <Feather name="bell" size={72} color="#9CA3AF" strokeWidth={1} />
              </View>
            </View>

            <ThemedText style={styles.emptyTitle}>No new Offers</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Check back later for exciting deals and offers!
            </ThemedText>

            <Pressable style={styles.continueButton} onPress={handleContinueShopping}>
              <ThemedText style={styles.continueButtonText}>Continue Shopping</ThemedText>
            </Pressable>
          </View>
        ) : (
          // ORDERS TAB CONTENT
          <View style={styles.emptyContainer}>
            {/* Package Icon with Sparkles */}
            <View style={styles.iconWrapper}>
              <Sparkle style={styles.sparkleTopLeft} />
              <Sparkle style={styles.sparkleTopRight} />
              <Sparkle style={styles.sparkleBottomLeft} />
              <Sparkle style={styles.sparkleBottomRight} />

              <View style={[styles.iconBg, { backgroundColor: '#FFF0E6' }]}>
                <Feather name="package" size={72} color="#9CA3AF" strokeWidth={1} />
              </View>
            </View>

            <ThemedText style={styles.emptyTitle}>No Order Updates</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Your order notifications will appear here
            </ThemedText>

            <Pressable style={styles.continueButton} onPress={handleContinueShopping}>
              <ThemedText style={styles.continueButtonText}>Continue Shopping</ThemedText>
            </Pressable>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#F97316',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#F97316',
  },
  contentArea: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 80,
  },
  iconWrapper: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  sparkle: {
    position: 'absolute',
    width: 14,
    height: 14,
  },
  sparkleInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#C4B5FD',
    transform: [{ rotate: '45deg' }],
  },
  sparkleTopLeft: {
    top: 30,
    left: 25,
  },
  sparkleTopRight: {
    top: 30,
    right: 25,
  },
  sparkleBottomLeft: {
    bottom: 50,
    left: 15,
  },
  sparkleBottomRight: {
    bottom: 50,
    right: 15,
  },
  iconBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  continueButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 10,
    minWidth: 220,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
