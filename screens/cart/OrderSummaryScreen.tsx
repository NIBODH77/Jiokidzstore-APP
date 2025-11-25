import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function OrderSummaryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();

  const handlePlaceOrder = () => {
    const orderId = Math.floor(10000 + Math.random() * 90000).toString();
    navigation.navigate('OrderConfirmation', { orderId });
  };

  return (
    <View style={styles.container}>
      <ScreenScrollView>
        <View style={[styles.content, { marginTop: Spacing.lg }]}>
          <ThemedText type="h2" style={styles.title}>Order Summary</ThemedText>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Price Details</ThemedText>
            <View style={styles.row}>
              <ThemedText>Subtotal (3 items)</ThemedText>
              <ThemedText>₹2,999</ThemedText>
            </View>
            <View style={styles.row}>
              <ThemedText>Delivery Charges</ThemedText>
              <ThemedText style={styles.freeText}>FREE</ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Delivery Address</ThemedText>
            <ThemedText style={styles.addressText}>
              Home{'\n'}
              123 Main Street{'\n'}
              Mumbai, Maharashtra 400001
            </ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
            <ThemedText style={styles.paymentText}>UPI Payment</ThemedText>
          </View>

          <View style={[styles.section, styles.totalSection]}>
            <View style={styles.row}>
              <ThemedText type="h3">Total Amount</ThemedText>
              <ThemedText type="h3" style={styles.totalPrice}>₹2,999</ThemedText>
            </View>
          </View>
        </View>
      </ScreenScrollView>
      <View style={styles.footer}>
        <Button onPress={handlePlaceOrder}>
          Place Order & Pay ₹2,999
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg },
  card: {
    backgroundColor: Colors.light.backgroundRoot,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    ...Shadows.small,
  },
  title: { marginBottom: Spacing.xl, color: '#1F2937' },
  section: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  sectionTitle: { 
    fontWeight: '700', 
    marginBottom: Spacing.md,
    fontSize: 16,
    color: '#1F2937',
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  totalRow: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  freeText: { color: Colors.light.success, fontWeight: '700' },
  addressText: {
    lineHeight: 22,
    color: Colors.light.textGray,
  },
  paymentText: {
    fontWeight: '600',
    color: '#1F2937',
  },
  totalSection: { 
    borderBottomWidth: 0, 
    paddingTop: Spacing.md,
    backgroundColor: Colors.light.backgroundSecondary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
  },
  totalPrice: { color: Colors.light.primary, fontSize: 20 },
  free: { color: Colors.light.success, fontWeight: '600' },
  footer: {
    padding: Spacing.lg,
    paddingBottom: 90,
    backgroundColor: Colors.light.backgroundRoot,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
});