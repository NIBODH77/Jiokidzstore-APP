
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Spacing, BorderRadius } from '@/constants/theme';

type TabType = 'offers' | 'orders';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  icon: keyof typeof Feather.glyphMap;
  iconColor: string;
  backgroundColor: string;
}

const OFFERS_DATA: NotificationItem[] = [
  {
    id: '1',
    title: '🎉 Mega Sale Alert!',
    description: 'Get up to 50% OFF on all Kids Fashion. Limited time offer!',
    time: '2 hours ago',
    isRead: false,
    icon: 'tag',
    iconColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  {
    id: '2',
    title: '💝 Special Discount for You',
    description: 'Use code KIDS20 to get extra 20% off on your next purchase',
    time: '5 hours ago',
    isRead: false,
    icon: 'gift',
    iconColor: '#EC4899',
    backgroundColor: '#FDF2F8',
  },
  {
    id: '3',
    title: '🚀 New Arrivals',
    description: 'Check out our latest collection of Winter Wear for kids',
    time: '1 day ago',
    isRead: true,
    icon: 'star',
    iconColor: '#8B5CF6',
    backgroundColor: '#F5F3FF',
  },
];

const ORDERS_DATA: NotificationItem[] = [
  {
    id: '1',
    title: '📦 Order Delivered',
    description: 'Your order #12345 has been delivered successfully',
    time: '3 hours ago',
    isRead: false,
    icon: 'check-circle',
    iconColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  {
    id: '2',
    title: '🚚 Out for Delivery',
    description: 'Your order #12344 is out for delivery and will reach you soon',
    time: '1 day ago',
    isRead: false,
    icon: 'truck',
    iconColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  {
    id: '3',
    title: '✅ Order Confirmed',
    description: 'Your order #12343 has been confirmed and will be shipped soon',
    time: '2 days ago',
    isRead: true,
    icon: 'package',
    iconColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
];

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

const NotificationCard = ({ item, onPress }: { item: NotificationItem; onPress: () => void }) => {
  return (
    <Pressable 
      style={[styles.notificationCard, !item.isRead && styles.unreadCard]} 
      onPress={onPress}
    >
      <View style={[styles.iconWrapper, { backgroundColor: item.backgroundColor }]}>
        <Feather name={item.icon} size={24} color={item.iconColor} />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.headerRow}>
          <ThemedText style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </ThemedText>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <ThemedText style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>
        <ThemedText style={styles.cardTime}>{item.time}</ThemedText>
      </View>
    </Pressable>
  );
};

const EmptyState = ({ onContinueShopping }: { onContinueShopping: () => void }) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.iconWrapperEmpty}>
        <Sparkle style={styles.sparkleTopLeft} />
        <Sparkle style={styles.sparkleTopRight} />
        <Sparkle style={styles.sparkleBottomLeft} />
        <Sparkle style={styles.sparkleBottomRight} />
        <View style={styles.iconBg}>
          <Feather name="bell" size={72} color="#9CA3AF" strokeWidth={1} />
        </View>
      </View>
      <ThemedText style={styles.emptyTitle}>No new Notifications</ThemedText>
      <Pressable style={styles.continueButton} onPress={onContinueShopping}>
        <ThemedText style={styles.continueButtonText}>Continue Shopping</ThemedText>
      </Pressable>
    </View>
  );
};

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('offers');

  const handleContinueShopping = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      (parentNav as any).navigate('Home');
    } else {
      (navigation as any).navigate('Home');
    }
  };

  const handleNotificationPress = (item: NotificationItem) => {
    console.log('Notification clicked:', item.id);
    // You can add navigation logic here based on notification type
  };

  const currentData = activeTab === 'offers' ? OFFERS_DATA : ORDERS_DATA;
  const hasNotifications = currentData.length > 0;

  return (
    <View style={styles.container}>
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

      {/* Content Area with Gradient */}
      <LinearGradient
        colors={['#FFF0F3', '#FFFFFF']}
        style={styles.contentArea}
      >
        {hasNotifications ? (
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {currentData.map((item) => (
              <NotificationCard 
                key={item.id} 
                item={item}
                onPress={() => handleNotificationPress(item)}
              />
            ))}
          </ScrollView>
        ) : (
          <EmptyState onContinueShopping={handleContinueShopping} />
        )}
      </LinearGradient>
    </View>
  );
};

export default NotificationsScreen;

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
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  unreadCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  contentWrapper: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F97316',
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 80,
  },
  iconWrapperEmpty: {
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
    marginBottom: 32,
    textAlign: 'center',
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
