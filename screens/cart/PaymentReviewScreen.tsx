import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ['Cart', 'Address', 'Payment', 'Review'];
  
  return (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View style={[
            styles.stepCircle,
            index < currentStep && styles.stepCompleted,
            index === currentStep && styles.stepActive,
          ]}>
            {index < currentStep ? (
              <Feather name="check" size={14} color="#FFFFFF" />
            ) : (
              <ThemedText style={[
                styles.stepNumber,
                (index === currentStep || index < currentStep) && styles.stepNumberActive
              ]}>
                {index + 1}
              </ThemedText>
            )}
          </View>
          <ThemedText style={[
            styles.stepLabel,
            index === currentStep && styles.stepLabelActive
          ]}>
            {step}
          </ThemedText>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              index < currentStep && styles.stepLineCompleted
            ]} />
          )}
        </View>
      ))}
    </View>
  );
}

export default function PaymentReviewScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'PaymentReview'>>();
  const insets = useSafeAreaInsets();

  const paymentMethod = route.params?.paymentMethod || 'UPI';
  const paymentDetails = route.params?.paymentDetails || 'user@okaxis';

  const orderSummary = {
    subtotal: 2499,
    discount: 500,
    deliveryFee: 0,
    platformFee: 5,
    total: 2004,
  };

  const handlePaySecurely = () => {
    navigation.navigate('OrderConfirmation', { orderId: 'ORD' + Date.now() });
  };

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'UPI': return 'smartphone';
      case 'Card': return 'credit-card';
      case 'Wallet': return 'briefcase';
      case 'NetBanking': return 'globe';
      case 'COD': return 'package';
      default: return 'credit-card';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StepIndicator currentStep={3} />
        
        <View style={styles.pageTitleContainer}>
          <Feather name="check-circle" size={24} color="#22C55E" />
          <ThemedText style={styles.pageTitle}>Review Your Order</ThemedText>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Delivery Address</ThemedText>
            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.typeBadge}>
                  <Feather name="home" size={14} color="#FF8C00" />
                  <ThemedText style={styles.typeText}>Home</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.addressName}>Rahul Sharma</ThemedText>
              <ThemedText style={styles.addressText}>Tech Park, Building C, Floor 5</ThemedText>
              <ThemedText style={styles.addressText}>Mumbai, Maharashtra 400051</ThemedText>
              <View style={styles.phoneRow}>
                <Feather name="phone" size={12} color="#6B7280" />
                <ThemedText style={styles.phoneText}>+91 9876543210</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
            <View style={styles.paymentCard}>
              <View style={styles.paymentMethodRow}>
                <View style={styles.paymentIconContainer}>
                  <Feather name={getPaymentIcon()} size={22} color="#FFFFFF" />
                </View>
                <View style={styles.paymentInfo}>
                  <ThemedText style={styles.paymentMethodName}>{paymentMethod}</ThemedText>
                  <ThemedText style={styles.paymentMethodDetails}>{paymentDetails}</ThemedText>
                </View>
                <View style={styles.verifiedBadge}>
                  <Feather name="check-circle" size={14} color="#22C55E" />
                  <ThemedText style={styles.verifiedText}>Verified</ThemedText>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Order Summary</ThemedText>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Subtotal</ThemedText>
                <ThemedText style={styles.summaryValue}>₹{orderSummary.subtotal}</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Discount</ThemedText>
                <ThemedText style={styles.summaryValueGreen}>-₹{orderSummary.discount}</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Delivery Fee</ThemedText>
                <ThemedText style={styles.summaryValueGreen}>
                  {orderSummary.deliveryFee === 0 ? 'FREE' : `₹${orderSummary.deliveryFee}`}
                </ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>Platform Fee</ThemedText>
                <ThemedText style={styles.summaryValue}>₹{orderSummary.platformFee}</ThemedText>
              </View>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <ThemedText style={styles.totalLabel}>Total Payable</ThemedText>
                <ThemedText style={styles.totalValue}>₹{orderSummary.total}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.savingsCard}>
            <Feather name="gift" size={20} color="#22C55E" />
            <ThemedText style={styles.savingsText}>
              You are saving ₹{orderSummary.discount} on this order!
            </ThemedText>
          </View>

          <View style={styles.securitySection}>
            <View style={styles.securityItem}>
              <Feather name="shield" size={18} color="#22C55E" />
              <ThemedText style={styles.securityText}>Secure Payment</ThemedText>
            </View>
            <View style={styles.securityItem}>
              <Feather name="lock" size={18} color="#22C55E" />
              <ThemedText style={styles.securityText}>SSL Encrypted</ThemedText>
            </View>
            <View style={styles.securityItem}>
              <Feather name="award" size={18} color="#22C55E" />
              <ThemedText style={styles.securityText}>100% Safe</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.footerPriceRow}>
          <ThemedText style={styles.footerTotalLabel}>Total</ThemedText>
          <ThemedText style={styles.footerTotalValue}>₹{orderSummary.total}</ThemedText>
        </View>
        <Pressable style={styles.payButton} onPress={handlePaySecurely}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payGradient}
          >
            <Feather name="lock" size={18} color="#FFFFFF" />
            <ThemedText style={styles.payText}>Pay Securely ₹{orderSummary.total}</ThemedText>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 180,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCompleted: {
    backgroundColor: '#22C55E',
  },
  stepActive: {
    backgroundColor: '#FF8C00',
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
    marginLeft: 4,
  },
  stepLabelActive: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 6,
  },
  stepLineCompleted: {
    backgroundColor: '#22C55E',
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressHeader: {
    marginBottom: 10,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF8C00',
  },
  addressName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  phoneText: {
    color: '#6B7280',
    fontSize: 14,
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 14,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  paymentMethodDetails: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  summaryValueGreen: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF8C00',
  },
  savingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  securitySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerTotalLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  payButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  payGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  payText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
