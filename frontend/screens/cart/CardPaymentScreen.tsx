import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function CardPaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleContinue = () => {
    const maskedCard = '**** **** **** ' + cardNumber.replace(/\s/g, '').slice(-4);
    navigation.navigate('PaymentReview', { 
      paymentMethod: 'Card', 
      paymentDetails: maskedCard
    });
  };

  const isValid = 
    cardNumber.replace(/\s/g, '').length >= 16 && 
    expiryDate.length === 5 && 
    cvv.length >= 3 && 
    cardHolderName.length > 2;

  const getCardType = () => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return { name: 'VISA', color: '#1A1F71' };
    if (num.startsWith('5')) return { name: 'MasterCard', color: '#EB001B' };
    if (num.startsWith('6')) return { name: 'RuPay', color: '#097C34' };
    if (num.startsWith('37') || num.startsWith('34')) return { name: 'Amex', color: '#006FCF' };
    return null;
  };

  const cardType = getCardType();

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
          <ThemedText style={styles.headerTitle}>Card Payment</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.infoBox}>
          <Feather name="shield" size={20} color="#FF8C00" />
          <ThemedText style={styles.infoText}>
            Your card information is encrypted and secure
          </ThemedText>
        </View>

        <View style={styles.cardLogos}>
          <View style={[styles.cardLogo, cardType?.name === 'VISA' && styles.cardLogoActive]}>
            <ThemedText style={styles.cardLogoText}>VISA</ThemedText>
          </View>
          <View style={[styles.cardLogo, cardType?.name === 'MasterCard' && styles.cardLogoActive]}>
            <ThemedText style={styles.cardLogoText}>MC</ThemedText>
          </View>
          <View style={[styles.cardLogo, cardType?.name === 'RuPay' && styles.cardLogoActive]}>
            <ThemedText style={styles.cardLogoText}>RuPay</ThemedText>
          </View>
          <View style={[styles.cardLogo, cardType?.name === 'Amex' && styles.cardLogoActive]}>
            <ThemedText style={styles.cardLogoText}>Amex</ThemedText>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Card Number</ThemedText>
            <View style={styles.inputContainer}>
              <Feather name="credit-card" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#9CA3AF"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
              />
              {cardType && (
                <View style={[styles.cardTypeBadge, { backgroundColor: cardType.color }]}>
                  <ThemedText style={styles.cardTypeBadgeText}>{cardType.name}</ThemedText>
                </View>
              )}
            </View>
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
              <ThemedText style={styles.inputLabel}>Expiry Date</ThemedText>
              <View style={styles.inputContainer}>
                <Feather name="calendar" size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#9CA3AF"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <ThemedText style={styles.inputLabel}>CVV</ThemedText>
              <View style={styles.inputContainer}>
                <Feather name="lock" size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.input}
                  placeholder="***"
                  placeholderTextColor="#9CA3AF"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Card Holder Name</ThemedText>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder="Name on card"
                placeholderTextColor="#9CA3AF"
                value={cardHolderName}
                onChangeText={setCardHolderName}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.saveCardRow}>
            <View style={styles.saveCardInfo}>
              <Feather name="bookmark" size={20} color="#FF8C00" />
              <View>
                <ThemedText style={styles.saveCardTitle}>Save card for future payments</ThemedText>
                <ThemedText style={styles.saveCardSubtitle}>Your card is stored securely</ThemedText>
              </View>
            </View>
            <Switch
              value={saveCard}
              onValueChange={setSaveCard}
              trackColor={{ false: '#E5E7EB', true: '#FFD4A3' }}
              thumbColor={saveCard ? '#FF8C00' : '#9CA3AF'}
            />
          </View>
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
              <View style={styles.securityIconCircle}>
                <Feather name="check-circle" size={20} color="#22C55E" />
              </View>
            </View>
            <ThemedText style={styles.securityTitle}>256-bit SSL Encryption</ThemedText>
            <ThemedText style={styles.securitySubtitle}>
              PCI DSS Compliant • RBI Authorized
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
            <Feather name="lock" size={18} color="#FFFFFF" />
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
  cardLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  cardLogo: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  cardLogoActive: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFFAF5',
  },
  cardLogoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
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
  rowInputs: {
    flexDirection: 'row',
  },
  cardTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardTypeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  saveCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  saveCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  saveCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  saveCardSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  securitySection: {
    paddingHorizontal: 16,
    marginTop: 20,
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
