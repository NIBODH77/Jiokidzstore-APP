
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function OrderConfirmationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'OrderConfirmation'>>();
  const orderId = route.params?.orderId || '12345';

  const handleTrackOrder = () => {
    navigation.navigate('Home');
  };

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Feather name="check" size={60} color={Colors.light.backgroundRoot} />
          </View>
        </View>

        <ThemedText type="h2" style={styles.title}>Payment Successful!</ThemedText>
        
        <ThemedText style={styles.subtitle}>
          Your order has been placed successfully
        </ThemedText>

        <View style={styles.orderCard}>
          <View style={styles.orderRow}>
            <ThemedText style={styles.label}>Order ID</ThemedText>
            <ThemedText style={styles.value}>#{orderId}</ThemedText>
          </View>
          <View style={styles.orderRow}>
            <ThemedText style={styles.label}>Payment Method</ThemedText>
            <ThemedText style={styles.value}>UPI Payment</ThemedText>
          </View>
          <View style={styles.orderRow}>
            <ThemedText style={styles.label}>Total Amount</ThemedText>
            <ThemedText style={styles.totalValue}>₹2,999</ThemedText>
          </View>
        </View>

        <View style={styles.deliveryInfo}>
          <Feather name="truck" size={20} color={Colors.light.primary} />
          <ThemedText style={styles.deliveryText}>
            Estimated delivery: 3-5 business days
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={handleTrackOrder}>
            Track Order
          </Button>
          <Pressable onPress={handleContinueShopping} style={styles.secondaryButton}>
            <ThemedText style={styles.secondaryButtonText}>Continue Shopping</ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundRoot,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
    color: '#1F2937',
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.light.textGray,
    marginBottom: Spacing.xl,
    fontSize: 16,
  },
  orderCard: {
    width: '100%',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: {
    color: Colors.light.textGray,
    fontSize: 14,
  },
  value: {
    fontWeight: '600',
    color: '#1F2937',
    fontSize: 14,
  },
  totalValue: {
    fontWeight: '700',
    color: Colors.light.primary,
    fontSize: 16,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.light.primary}15`,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xxl,
  },
  deliveryText: {
    marginLeft: Spacing.sm,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.backgroundRoot,
  },
  secondaryButtonText: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
