import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const PAYMENT_METHODS = [
  { 
    id: 'upi', 
    name: 'UPI Payment', 
    subtitle: 'Google Pay, PhonePe, Paytm UPI',
    icon: 'smartphone',
    logos: ['GPay', 'PhonePe', 'Paytm', 'BHIM']
  },
  { 
    id: 'card', 
    name: 'Debit / Credit Cards', 
    subtitle: 'Visa, Mastercard, RuPay, Amex',
    icon: 'credit-card',
    logos: ['Visa', 'MC', 'RuPay', 'Amex']
  },
  { 
    id: 'wallet', 
    name: 'Wallets', 
    subtitle: 'Paytm, Amazon Pay, Mobikwik, Freecharge',
    icon: 'briefcase',
    logos: ['Paytm', 'Amazon', 'Mobikwik']
  },
  { 
    id: 'netbanking', 
    name: 'Net Banking', 
    subtitle: 'All major banks supported',
    icon: 'globe',
    logos: ['SBI', 'HDFC', 'ICICI', 'Axis']
  },
  { 
    id: 'cod', 
    name: 'Cash on Delivery', 
    subtitle: 'Pay when you receive your order',
    icon: 'package',
    logos: []
  },
];

const BANK_LOGOS = [
  { id: 'sbi', name: 'SBI', color: '#1A4D8C' },
  { id: 'hdfc', name: 'HDFC', color: '#004C8F' },
  { id: 'icici', name: 'ICICI', color: '#F37021' },
  { id: 'axis', name: 'Axis', color: '#97144D' },
  { id: 'kotak', name: 'Kotak', color: '#ED1C24' },
  { id: 'pnb', name: 'PNB', color: '#003366' },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ['Address', 'Payment', 'Review'];
  
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

export default function CheckoutPaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [expandedMethod, setExpandedMethod] = useState<string | null>('upi');

  const handleContinue = () => {
    navigation.navigate('OrderSummary');
  };

  const handleMethodPress = (methodId: string) => {
    setSelectedMethod(methodId);
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StepIndicator currentStep={1} />
        
        <View style={styles.pageTitleContainer}>
          <Feather name="lock" size={20} color="#FF8C00" />
          <ThemedText style={styles.pageTitle}>Secure Payment</ThemedText>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Choose Payment Method</ThemedText>
          
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.methodCard, 
                selectedMethod === method.id && styles.methodCardSelected
              ]}
              onPress={() => handleMethodPress(method.id)}
            >
              <View style={styles.methodHeader}>
                <View style={[
                  styles.methodIconContainer,
                  selectedMethod === method.id && styles.methodIconContainerSelected
                ]}>
                  <Feather 
                    name={method.icon as any} 
                    size={22} 
                    color={selectedMethod === method.id ? '#FFFFFF' : '#9CA3AF'} 
                  />
                </View>
                <View style={styles.methodInfo}>
                  <ThemedText style={[
                    styles.methodName,
                    selectedMethod === method.id && styles.methodNameSelected
                  ]}>
                    {method.name}
                  </ThemedText>
                  <ThemedText style={styles.methodSubtitle}>{method.subtitle}</ThemedText>
                </View>
                <View style={[
                  styles.radio, 
                  selectedMethod === method.id && styles.radioSelected
                ]}>
                  {selectedMethod === method.id && <View style={styles.radioDot} />}
                </View>
              </View>

              {method.logos.length > 0 && selectedMethod === method.id && (
                <View style={styles.logosContainer}>
                  {method.logos.map((logo, idx) => (
                    <View key={idx} style={styles.logoBadge}>
                      <ThemedText style={styles.logoText}>{logo}</ThemedText>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
          ))}

          {selectedMethod === 'netbanking' && (
            <View style={styles.bankLogosSection}>
              <ThemedText style={styles.bankLogosTitle}>Popular Banks</ThemedText>
              <View style={styles.bankLogosGrid}>
                {BANK_LOGOS.map((bank) => (
                  <Pressable key={bank.id} style={styles.bankLogoCard}>
                    <View style={[styles.bankLogoCircle, { backgroundColor: bank.color + '20' }]}>
                      <ThemedText style={[styles.bankLogoInitial, { color: bank.color }]}>
                        {bank.name.charAt(0)}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.bankLogoName}>{bank.name}</ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View style={styles.securitySection}>
            <View style={styles.securityBanner}>
              <View style={styles.securityIconRow}>
                <View style={styles.securityIconCircle}>
                  <Feather name="shield" size={20} color="#22C55E" />
                </View>
                <View style={styles.securityIconCircle}>
                  <Feather name="lock" size={20} color="#22C55E" />
                </View>
                <View style={styles.securityIconCircle}>
                  <Feather name="check-circle" size={20} color="#22C55E" />
                </View>
              </View>
              <ThemedText style={styles.securityTitle}>Your Payment is 100% Secure</ThemedText>
              <ThemedText style={styles.securitySubtitle}>
                Protected by 256-bit SSL encryption
              </ThemedText>
            </View>

            <View style={styles.trustIndicators}>
              <View style={styles.trustItem}>
                <Feather name="shield" size={16} color={Colors.light.success} />
                <ThemedText style={styles.trustText}>Verified Secure</ThemedText>
              </View>
              <View style={styles.trustItem}>
                <Feather name="lock" size={16} color={Colors.light.success} />
                <ThemedText style={styles.trustText}>SSL Encrypted</ThemedText>
              </View>
              <View style={styles.trustItem}>
                <Feather name="award" size={16} color={Colors.light.success} />
                <ThemedText style={styles.trustText}>PCI Compliant</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}
          >
            <Feather name="lock" size={18} color="#FFFFFF" />
            <ThemedText style={styles.continueText}>Pay Securely</ThemedText>
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
    paddingBottom: 120,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCompleted: {
    backgroundColor: Colors.light.success,
  },
  stepActive: {
    backgroundColor: '#FF8C00',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginLeft: 6,
  },
  stepLabelActive: {
    color: '#FF8C00',
    fontWeight: '600',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  stepLineCompleted: {
    backgroundColor: Colors.light.success,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    overflow: 'hidden',
  },
  methodCardSelected: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFFAF5',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodIconContainerSelected: {
    backgroundColor: '#FF8C00',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 14,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  methodNameSelected: {
    color: '#FF8C00',
    fontWeight: '700',
  },
  methodSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#FF8C00',
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF8C00',
  },
  logosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
  },
  logoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  logoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  bankLogosSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bankLogosTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  bankLogosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bankLogoCard: {
    alignItems: 'center',
    width: '30%',
  },
  bankLogoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  bankLogoInitial: {
    fontSize: 18,
    fontWeight: '700',
  },
  bankLogoName: {
    fontSize: 11,
    fontWeight: '500',
    color: '#374151',
  },
  securitySection: {
    marginTop: 8,
  },
  securityBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  securityIconRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  securityIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 4,
  },
  securitySubtitle: {
    fontSize: 12,
    color: '#047857',
  },
  trustIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 11,
    color: Colors.light.success,
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
  continueButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  continueText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
