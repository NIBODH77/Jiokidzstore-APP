
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export default function NotificationsScreen() {
  const notifications = [
    { 
      id: '1', 
      title: 'Payment Successful', 
      message: 'Your payment of ₹2,999 was successful. Order #12345', 
      type: 'payment', 
      read: false 
    },
    { 
      id: '2', 
      title: 'Order Confirmed', 
      message: 'Your order #12345 has been confirmed and is being processed', 
      type: 'order', 
      read: false 
    },
    { 
      id: '3', 
      title: 'Order Delivered', 
      message: 'Your order #12340 has been delivered successfully', 
      type: 'order', 
      read: true 
    },
    { 
      id: '4', 
      title: 'Flash Sale', 
      message: 'Up to 60% OFF on kids fashion. Limited time offer!', 
      type: 'promo', 
      read: false 
    },
    { 
      id: '5', 
      title: 'Order Shipped', 
      message: 'Your order #12338 is on the way', 
      type: 'order', 
      read: true 
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return 'check-circle';
      case 'order':
        return 'package';
      case 'promo':
        return 'tag';
      default:
        return 'bell';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'payment':
        return Colors.light.success;
      case 'order':
        return Colors.light.primary;
      case 'promo':
        return Colors.light.warning;
      default:
        return Colors.light.textGray;
    }
  };

  return (
    <ScreenScrollView contentContainerStyle={{ paddingTop: Spacing.lg, paddingBottom: Spacing.xl }}>
      <View style={styles.container}>
        <ThemedText type="h3" style={styles.header}>Notifications</ThemedText>
        {notifications.map((notif) => (
          <Pressable
            key={notif.id}
            style={[styles.notifCard, !notif.read && styles.unread]}
          >
            <View style={[
              styles.icon, 
              notif.type === 'promo' && styles.promoIcon,
              notif.type === 'payment' && styles.paymentIcon
            ]}>
              <Feather
                name={getIcon(notif.type) as any}
                size={20}
                color={getIconColor(notif.type)}
              />
            </View>
            <View style={styles.notifContent}>
              <ThemedText style={styles.notifTitle}>{notif.title}</ThemedText>
              <ThemedText type="small" style={styles.notifMessage}>{notif.message}</ThemedText>
            </View>
            {!notif.read && <View style={styles.unreadDot} />}
          </Pressable>
        ))}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.lg,
    color: '#1F2937',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.backgroundRoot,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  unread: { 
    backgroundColor: `${Colors.light.primary}08`,
    borderColor: `${Colors.light.primary}30`,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  promoIcon: { 
    backgroundColor: `${Colors.light.warning}20` 
  },
  paymentIcon: { 
    backgroundColor: `${Colors.light.success}20` 
  },
  notifContent: { 
    flex: 1 
  },
  notifTitle: { 
    fontWeight: '700',
    marginBottom: 4,
    color: '#1F2937',
    fontSize: 15,
  },
  notifMessage: { 
    color: Colors.light.textGray,
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
    marginLeft: Spacing.sm,
  },
});
