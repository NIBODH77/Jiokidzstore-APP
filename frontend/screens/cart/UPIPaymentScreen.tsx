import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: '🔵', color: '#4285F4' },
  { id: 'phonepe', name: 'PhonePe', icon: '🟣', color: '#5F259F' },
  { id: 'paytm', name: 'Paytm', icon: '🔷', color: '#00B9F1' },
  { id: 'bhim', name: 'BHIM', icon: '🔹', color: '#00529B' },
  { id: 'amazon', name: 'Amazon Pay', icon: '🟠', color: '#FF9900' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '🟢', color: '#25D366' },
];

export default function UPIPaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [upiId, setUpiId] = useState('');

  const handleContinue = () => {
    const paymentDetails = selectedApp 
      ? UPI_APPS.find(app => app.id === selectedApp)?.name 
      : upiId;
    navigation.navigate('PaymentReview', { 
      paymentMethod: 'UPI', 
      paymentDetails: paymentDetails || 'UPI Payment'
    });
  };

  const isValid = selectedApp || (upiId.includes('@') && upiId.length > 3);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>UPI Payment</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.infoBox}>
          <Feather name="zap" size={20} color="#FF8C00" />
          <ThemedText style={styles.infoText}>
            Pay instantly using UPI. Fast, secure, and convenient.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Select UPI App</ThemedText>
          <View style={styles.appsGrid}>
            {UPI_APPS.map((app) => (
              <Pressable
                key={app.id}
                style={[
                  styles.appCard,
                  selectedApp === app.id && styles.appCardSelected
                ]}
                onPress={() => {
                  setSelectedApp(app.id);
                  setUpiId('');
                }}
              >
                <View style={[styles.appIcon, { backgroundColor: app.color + '20' }]}>
                  <ThemedText style={styles.appIconText}>{app.icon}</ThemedText>
                </View>
                <ThemedText style={styles.appName}>{app.name}</ThemedText>
                {selectedApp === app.id && (
                  <View style={styles.checkBadge}>
                    <Feather name="check" size={12} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <ThemedText style={styles.dividerText}>OR</ThemedText>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Enter UPI ID</ThemedText>
          <View style={styles.inputContainer}>
            <Feather name="at-sign" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="yourname@bankname"
              placeholderTextColor="#9CA3AF"
              value={upiId}
              onChangeText={(text) => {
                setUpiId(text);
                if (text.length > 0) setSelectedApp(null);
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <ThemedText style={styles.inputHint}>
            Example: yourname@okaxis, yourname@ybl, yourname@paytm
          </ThemedText>
        </View>

        <View style={styles.securitySection}>
          <View style={styles.securityBanner}>
            <View style={styles.securityIconRow}>
              <View style={styles.securityIconCircle}>
                <Feather name="shield" size={20} color="#22C55E" />
              </View>
              <View style={styles.securityIconCircle}>
                <Feather name="lock" size={20} color="#22C55E" />
              </View>
            </View>
            <ThemedText style={styles.securityTitle}>100% Secure UPI Payment</ThemedText>
            <ThemedText style={styles.securitySubtitle}>
              Your UPI PIN is never shared with us
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable 
          style={[styles.continueButton, !isValid && styles.continueButtonDisabled]} 
          onPress={handleContinue}
          disabled={!isValid}
        >
          <LinearGradient
            colors={isValid ? ['#FF8C00', '#FF6B35'] : ['#D1D5DB', '#D1D5DB']}
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
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    margin: 16,
    padding: 14,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFE4CC',
  },
  infoText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  appCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  appCardSelected: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFFAF5',
  },
  appIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  appIconText: {
    fontSize: 26,
  },
  appName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#1F2937',
  },
  inputHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  securitySection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  securityBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
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
    fontSize: 13,
    color: '#047857',
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
  continueButtonDisabled: {
    opacity: 0.7,
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
