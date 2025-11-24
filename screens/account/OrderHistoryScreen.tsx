import React, { useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { ProfileStackParamList } from '@/navigation/ProfileStackNavigator';

export default function OrderHistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  
  const orders = [
    { id: '12345', status: 'Delivered', date: '2 days ago', total: 1398, items: 2 },
    { id: '12344', status: 'In Transit', date: '5 days ago', total: 899, items: 1 },
  ];

  const handleTrackOrder = useCallback((orderId: string) => {
    try {
      navigation.navigate('OrderTracking', { orderId });
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }, [navigation]);

  return (
    <ScreenScrollView contentContainerStyle={{ paddingTop: Spacing.lg, paddingBottom: Spacing.xl }}>
      <View style={styles.container}>
        {orders.map((order) => (
          <Pressable 
            key={order.id} 
            style={({ pressed }) => [styles.orderCard, pressed && styles.orderCardPressed]}
            onPress={() => handleTrackOrder(order.id)}
          >
            <View style={styles.orderHeader}>
              <ThemedText style={styles.orderId}>Order #{order.id}</ThemedText>
              <View style={[styles.statusBadge, order.status === 'Delivered' && styles.delivered]}>
                <ThemedText style={styles.statusText}>{order.status}</ThemedText>
              </View>
            </View>
            <ThemedText type="caption" style={styles.date}>{order.date}</ThemedText>
            <View style={styles.orderFooter}>
              <ThemedText>
                {order.items} items • ₹{order.total}
              </ThemedText>
              <Feather name="chevron-right" size={20} color={Colors.light.textGray} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.lg },
  orderCard: {
    backgroundColor: Colors.light.backgroundRoot,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  orderCardPressed: {
    opacity: 0.7,
    backgroundColor: 'rgba(255, 107, 157, 0.05)',
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  orderId: { fontWeight: '700' },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: Colors.light.warning,
  },
  delivered: { backgroundColor: Colors.light.success },
  statusText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  date: { color: Colors.light.textGray, marginBottom: Spacing.md },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
