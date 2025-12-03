import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

type TabType = 'offers' | 'orders';

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
        <View style={styles.emptyIconContainer}>
          <LinearGradient
            colors={['#FFE5EE', '#FFFFFF']}
            style={styles.emptyIconGradient}
          >
            <Feather name="bell" size={60} color="#FF6B9D" strokeWidth={0.5} />
          </LinearGradient>
        </View>

        <ThemedText style={styles.emptyTitle}>No new Notifications</ThemedText>
        <ThemedText style={styles.emptySubtitle}>
          {activeTab === 'offers' 
            ? "We'll notify you about amazing deals and special offers"
            : 'Your orders will appear here'}
        </ThemedText>

        <Pressable onPress={handleContinueShopping} style={{ marginTop: Spacing.xl }}>
          <LinearGradient
            colors={['#FF6B9D', '#FF8FB3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButton}
          >
            <Feather name="shopping-bag" size={20} color="#FFFFFF" />
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
    borderBottomWidth: 2,
    borderBottomColor: '#F3F4F6',
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6B9D',
    marginBottom: -2,
  },
  tabText: {
    fontSize: 14,
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
  emptyIconContainer: {
    marginBottom: Spacing.xl,
  },
  emptyIconGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.md,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
    gap: Spacing.sm,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
