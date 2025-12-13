import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI Payment', subtitle: 'Google Pay, PhonePe, Paytm', icon: 'smartphone' },
  { id: 'card', name: 'Credit/Debit Card', subtitle: 'Visa, Mastercard, RuPay', icon: 'credit-card' },
  { id: 'netbanking', name: 'Net Banking', subtitle: 'All major banks supported', icon: 'globe' },
  { id: 'wallet', name: 'Wallets', subtitle: 'Paytm, Amazon Pay, Mobikwik', icon: 'briefcase' },
  { id: 'cod', name: 'Cash on Delivery', subtitle: 'Pay when you receive', icon: 'package' },
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

  const handleContinue = () => {
    navigation.navigate('OrderSummary');
  };

  return (
    <View style={styles.container}>
      <ScreenScrollView contentContainerStyle={styles.scrollContent}>
        <StepIndicator currentStep={1} />
        
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Select Payment Method</ThemedText>
          
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={[
                styles.methodCard, 
                selectedMethod === method.id && styles.methodCardSelected
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={[
                styles.methodIconContainer,
                selectedMethod === method.id && styles.methodIconContainerSelected
              ]}>
                <Feather 
                  name={method.icon as any} 
                  size={22} 
                  color={selectedMethod === method.id ? Colors.light.primary : '#9CA3AF'} 
                />
              </View>
              <View style={styles.methodInfo}>
                <ThemedText style={styles.methodName}>{method.name}</ThemedText>
                <ThemedText style={styles.methodSubtitle}>{method.subtitle}</ThemedText>
              </View>
              <View style={[
                styles.radio, 
                selectedMethod === method.id && styles.radioSelected
              ]}>
                {selectedMethod === method.id && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          ))}

          <View style={styles.securitySection}>
            <View style={styles.securityItem}>
              <Feather name="shield" size={18} color={Colors.light.success} />
              <ThemedText style={styles.securityText}>100% Secure Payments</ThemedText>
            </View>
            <View style={styles.securityItem}>
              <Feather name="lock" size={18} color={Colors.light.success} />
              <ThemedText style={styles.securityText}>SSL Encrypted</ThemedText>
            </View>
          </View>
        </View>
      </ScreenScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}
          >
            <ThemedText style={styles.continueText}>Continue to Review</ThemedText>
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
    backgroundColor: Colors.light.backgroundDefault,
  },
  scrollContent: {
    paddingBottom: 100,
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
    backgroundColor: Colors.light.primary,
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
    color: Colors.light.primary,
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  methodCardSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: '#FFF5F0',
  },
  methodIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodIconContainerSelected: {
    backgroundColor: '#FFE5D9',
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  methodSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.light.primary,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.primary,
  },
  securitySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityText: {
    fontSize: 12,
    color: Colors.light.success,
    fontWeight: '500',
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
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
