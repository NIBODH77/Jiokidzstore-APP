import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const WALLETS = [
  { id: 'paytm', name: 'Paytm Wallet', icon: '💰', color: '#00B9F1', balance: 1250 },
  { id: 'amazon', name: 'Amazon Pay', icon: '🛒', color: '#FF9900', balance: 500 },
  { id: 'mobikwik', name: 'Mobikwik', icon: '📱', color: '#5F2EEA', balance: 0 },
  { id: 'freecharge', name: 'Freecharge', icon: '⚡', color: '#00C853', balance: 0 },
  { id: 'phonepe', name: 'PhonePe Wallet', icon: '🟣', color: '#5F259F', balance: 0 },
  { id: 'ola', name: 'Ola Money', icon: '🚗', color: '#2AB24B', balance: 0 },
];

export default function WalletPaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleContinue = () => {
    const wallet = WALLETS.find(w => w.id === selectedWallet);
    navigation.navigate('PaymentReview', { 
      paymentMethod: 'Wallet', 
      paymentDetails: wallet?.name || 'Wallet Payment'
    });
  };

  const isValid = selectedWallet !== null;

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
          <ThemedText style={styles.headerTitle}>Wallet Payment</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.infoBox}>
          <Feather name="briefcase" size={20} color="#FF8C00" />
          <ThemedText style={styles.infoText}>
            Pay using your digital wallet. Quick and hassle-free!
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Select Wallet</ThemedText>
          
          {WALLETS.map((wallet) => (
            <Pressable
              key={wallet.id}
              style={[
                styles.walletCard,
                selectedWallet === wallet.id && styles.walletCardSelected
              ]}
              onPress={() => setSelectedWallet(wallet.id)}
            >
              <View style={styles.walletRow}>
                <View style={[styles.walletIcon, { backgroundColor: wallet.color + '20' }]}>
                  <ThemedText style={styles.walletIconText}>{wallet.icon}</ThemedText>
                </View>
                <View style={styles.walletInfo}>
                  <ThemedText style={styles.walletName}>{wallet.name}</ThemedText>
                  {wallet.balance > 0 && (
                    <ThemedText style={styles.walletBalance}>
                      Balance: ₹{wallet.balance}
                    </ThemedText>
                  )}
                </View>
                <View style={[
                  styles.radio,
                  selectedWallet === wallet.id && styles.radioSelected
                ]}>
                  {selectedWallet === wallet.id && <View style={styles.radioDot} />}
                </View>
              </View>
              {wallet.balance > 0 && selectedWallet === wallet.id && (
                <View style={styles.balanceBadge}>
                  <Feather name="check-circle" size={14} color="#22C55E" />
                  <ThemedText style={styles.balanceText}>Sufficient balance</ThemedText>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <View style={styles.benefitsSection}>
          <ThemedText style={styles.benefitsTitle}>Wallet Benefits</ThemedText>
          <View style={styles.benefitsList}>
            {[
              { icon: 'zap', text: 'Instant payments without card details' },
              { icon: 'shield', text: 'Secure transactions with wallet protection' },
              { icon: 'gift', text: 'Exclusive cashback offers' },
              { icon: 'refresh-cw', text: 'Easy refunds directly to wallet' },
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIconContainer}>
                  <Feather name={benefit.icon as any} size={16} color="#FF8C00" />
                </View>
                <ThemedText style={styles.benefitText}>{benefit.text}</ThemedText>
              </View>
            ))}
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },
  walletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  walletCardSelected: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFFAF5',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletIconText: {
    fontSize: 26,
  },
  walletInfo: {
    flex: 1,
    marginLeft: 14,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  walletBalance: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '600',
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
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
    marginLeft: 66,
    alignSelf: 'flex-start',
    gap: 6,
  },
  balanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22C55E',
  },
  benefitsSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 14,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
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
