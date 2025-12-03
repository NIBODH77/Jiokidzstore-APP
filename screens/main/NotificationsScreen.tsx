import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

type TabType = 'offers' | 'orders';

const Sparkle = ({ delay }: { delay: number }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity, delay]);

  return (
    <Animated.View style={[styles.sparkle, { opacity }]}>
      <View style={styles.sparkleInner} />
    </Animated.View>
  );
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('offers');

  const handleContinueShopping = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      (parentNav as any).navigate('HomeTab');
    } else {
      (navigation as any).navigate('Home');
    }
  };

  const renderEmptyState = () => (
    <View style={styles.contentWrapper}>
      <View style={styles.emptyContainer}>
        {/* Bell Icon with Sparkles */}
        <View style={styles.iconWrapper}>
          {/* Sparkles */}
          <Sparkle delay={0} />
          <Sparkle delay={150} />
          <Sparkle delay={300} />
          <Sparkle delay={450} />

          {/* Bell Icon Container */}
          <View style={styles.iconBg}>
            <Feather name="bell" size={80} color="#FF6B9D" strokeWidth={0.8} />
          </View>
        </View>

        {/* No Notifications Text */}
        <ThemedText style={styles.emptyTitle}>No new Notifications</ThemedText>

        {/* Continue Shopping Button */}
        <Pressable 
          onPress={handleContinueShopping} 
          style={{ marginTop: Spacing.xl, width: '100%' }}
        >
          <LinearGradient
            colors={['#FF6B9D', '#FF8FB3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButton}
          >
            <Feather name="shopping-bag" size={22} color="#FFFFFF" strokeWidth={1.5} />
            <ThemedText style={styles.continueButtonText}>Continue Shopping</ThemedText>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.contentWrapper, { paddingTop: Spacing.lg }]}>
        {/* Tab Section */}
        <View style={styles.tabContainer}>
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

        {/* Empty State */}
        {renderEmptyState()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundDefault,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Spacing.sm,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#FF6B9D',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#FF6B9D',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  iconWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  sparkle: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
  sparkleInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#C084FC',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  iconBg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
    gap: Spacing.md,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
