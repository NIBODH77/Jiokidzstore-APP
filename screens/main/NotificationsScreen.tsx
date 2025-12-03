import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

type TabType = 'offers' | 'orders';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validTill: string;
}

interface Order {
  id: string;
  orderNo: string;
  status: string;
  date: string;
  amount: string;
  icon: string;
}

const Sparkle = ({ delay }: { delay: number }) => {
  const opacityRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityRef, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(opacityRef, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, opacityRef]);

  return (
    <Animated.View style={[styles.sparkle, { opacity: opacityRef }]}>
      <View style={styles.sparkleInner} />
    </Animated.View>
  );
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('offers');

  const offers: Offer[] = [
    {
      id: '1',
      title: 'Flat 40% OFF on Winter Collection',
      description: 'Exclusive deal on all winter wear for kids',
      discount: '40% OFF',
      validTill: '15 Dec 2024',
    },
    {
      id: '2',
      title: 'Buy 1 Get 1 on Shoes',
      description: 'Limited time offer on selected shoes',
      discount: 'Buy 1\nGet 1',
      validTill: '10 Dec 2024',
    },
    {
      id: '3',
      title: 'Free Shipping on Orders Above ₹999',
      description: 'No minimum purchase needed',
      discount: 'FREE\nSHIP',
      validTill: '31 Dec 2024',
    },
  ];

  const orders: Order[] = [
    {
      id: '1',
      orderNo: '10456',
      status: 'Delivered',
      date: '2 Dec 2024',
      amount: '₹2,499',
      icon: 'check-circle',
    },
    {
      id: '2',
      orderNo: '10455',
      status: 'Processing',
      date: '1 Dec 2024',
      amount: '₹1,899',
      icon: 'package',
    },
    {
      id: '3',
      orderNo: '10454',
      status: 'Delivered',
      date: '28 Nov 2024',
      amount: '₹3,299',
      icon: 'check-circle',
    },
  ];

  const handleContinueShopping = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      (parentNav as any).navigate('HomeTab');
    } else {
      (navigation as any).navigate('Home');
    }
  };

  const isOffersEmpty = offers.length === 0;
  const isOrdersEmpty = orders.length === 0;
  const isEmpty = activeTab === 'offers' ? isOffersEmpty : isOrdersEmpty;

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
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

        {/* Content */}
        <ScrollView 
          style={styles.contentScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {isEmpty ? (
            <View style={styles.emptyContainer}>
              <View style={styles.iconWrapper}>
                <Sparkle delay={0} />
                <Sparkle delay={150} />
                <Sparkle delay={300} />
                <Sparkle delay={450} />
                <View style={styles.iconBg}>
                  <Feather name="bell" size={80} color="#FF6B9D" strokeWidth={0.8} />
                </View>
              </View>
              <ThemedText style={styles.emptyTitle}>No new Notifications</ThemedText>
              <Pressable style={styles.continueButton} onPress={handleContinueShopping}>
                <ThemedText style={styles.continueButtonText}>Continue Shopping</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.listContent}>
              {activeTab === 'offers' ? (
                offers.map(offer => (
                  <View key={offer.id} style={styles.notificationCard}>
                    <View style={styles.cardLeft}>
                      <View style={styles.discountBadge}>
                        <ThemedText style={styles.discountText}>{offer.discount}</ThemedText>
                      </View>
                    </View>
                    <View style={styles.cardContent}>
                      <ThemedText style={styles.cardTitle}>{offer.title}</ThemedText>
                      <ThemedText style={styles.cardDescription}>{offer.description}</ThemedText>
                      <ThemedText style={styles.validTill}>Valid till: {offer.validTill}</ThemedText>
                    </View>
                    <Pressable style={styles.cardAction}>
                      <Feather name="chevron-right" size={24} color="#FF6B9D" />
                    </Pressable>
                  </View>
                ))
              ) : (
                orders.map(order => (
                  <View key={order.id} style={styles.notificationCard}>
                    <View style={styles.orderIcon}>
                      <View style={[styles.iconCircle, order.status === 'Delivered' ? styles.deliveredIcon : styles.processingIcon]}>
                        <Feather name={order.icon as any} size={24} color="#FFFFFF" strokeWidth={1.5} />
                      </View>
                    </View>
                    <View style={styles.cardContent}>
                      <ThemedText style={styles.orderNo}>Order #{order.orderNo}</ThemedText>
                      <ThemedText style={[styles.orderStatus, order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing]}>
                        {order.status}
                      </ThemedText>
                      <View style={styles.orderFooter}>
                        <ThemedText style={styles.orderDate}>{order.date}</ThemedText>
                        <ThemedText style={styles.orderAmount}>{order.amount}</ThemedText>
                      </View>
                    </View>
                    <Pressable style={styles.cardAction}>
                      <Feather name="chevron-right" size={24} color="#FF6B9D" />
                    </Pressable>
                  </View>
                ))
              )}
            </View>
          )}
        </ScrollView>
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
    marginBottom: Spacing.lg,
    paddingTop: Spacing.lg,
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
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  listContent: {
    paddingHorizontal: Spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    minHeight: 500,
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
    backgroundColor: '#FF6B9D',
    paddingVertical: 16,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  cardLeft: {
    marginRight: Spacing.lg,
  },
  discountBadge: {
    width: 70,
    height: 70,
    borderRadius: BorderRadius.md,
    backgroundColor: '#FF6B9D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 14,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  cardDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: Spacing.xs,
    lineHeight: 16,
  },
  validTill: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  cardAction: {
    marginLeft: Spacing.md,
  },
  orderIcon: {
    marginRight: Spacing.lg,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveredIcon: {
    backgroundColor: '#10B981',
  },
  processingIcon: {
    backgroundColor: '#F59E0B',
  },
  orderNo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: Spacing.sm,
  },
  statusDelivered: {
    color: '#10B981',
  },
  statusProcessing: {
    color: '#F59E0B',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  orderAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
  },
});
