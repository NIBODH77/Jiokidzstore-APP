import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ORANGE_PRIMARY = '#FF6B00';
const ORANGE_LIGHT = '#FFF3E6';

interface PaymentOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  route: string;
  savedCount?: number;
}

const paymentOptions: PaymentOption[] = [
  {
    id: '1',
    title: 'Saved Cards',
    subtitle: 'Debit & Credit Cards',
    icon: '💳',
    iconBg: '#E3F2FD',
    route: 'SavedCards',
    savedCount: 2,
  },
  {
    id: '2',
    title: 'Add Bank Account',
    subtitle: 'Link your bank account',
    icon: '🏦',
    iconBg: '#E8F5E9',
    route: 'AddBankAccount',
  },
];

export default function MyPaymentDetailsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleOptionPress = (route: string) => {
    (navigation as any).push(route);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Payment Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerCard}>
          <View style={styles.bannerIcon}>
            <Ionicons name="shield-checkmark" size={32} color={ORANGE_PRIMARY} />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Secure Payments</Text>
            <Text style={styles.bannerSubtitle}>
              Your payment information is encrypted and stored securely
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Methods</Text>

        <View style={styles.optionsList}>
          {paymentOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handleOptionPress(option.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.iconBg }]}>
                <Text style={styles.optionIconText}>{option.icon}</Text>
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <View style={styles.optionRight}>
                {option.savedCount && option.savedCount > 0 && (
                  <View style={styles.savedBadge}>
                    <Text style={styles.savedBadgeText}>{option.savedCount}</Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={22} color="#CCC" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Quick Tips</Text>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={18} color={ORANGE_PRIMARY} />
            <Text style={styles.infoText}>
              Save your cards for faster checkout
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={18} color={ORANGE_PRIMARY} />
            <Text style={styles.infoText}>
              Link UPI for instant payments
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="checkmark-circle" size={18} color={ORANGE_PRIMARY} />
            <Text style={styles.infoText}>
              Use wallets for exclusive cashback offers
            </Text>
          </View>
        </View>

        <View style={styles.supportSection}>
          <TouchableOpacity style={styles.supportBtn}>
            <Ionicons name="help-circle-outline" size={22} color={ORANGE_PRIMARY} />
            <Text style={styles.supportText}>Need help with payments?</Text>
            <Ionicons name="chevron-forward" size={18} color={ORANGE_PRIMARY} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ORANGE_LIGHT,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: ORANGE_PRIMARY + '30',
  },
  bannerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 4,
  },
  optionIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIconText: {
    fontSize: 26,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedBadge: {
    backgroundColor: ORANGE_PRIMARY,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  savedBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  infoSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 14,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  supportSection: {
    marginTop: 20,
  },
  supportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: ORANGE_PRIMARY + '40',
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    color: ORANGE_PRIMARY,
    fontWeight: '500',
    marginLeft: 10,
  },
});
