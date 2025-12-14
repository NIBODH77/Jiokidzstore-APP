import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Wallet {
  id: string;
  name: string;
  icon: string;
  color: string;
  isLinked: boolean;
  balance?: number;
  phoneNumber?: string;
}

const ORANGE_PRIMARY = '#FF6B00';
const ORANGE_LIGHT = '#FFF3E6';

export default function WalletsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: '1',
      name: 'Paytm Wallet',
      icon: '💰',
      color: '#00B9F1',
      isLinked: true,
      balance: 1250,
      phoneNumber: '98XXXXXX21',
    },
    {
      id: '2',
      name: 'Amazon Pay',
      icon: '🛒',
      color: '#FF9900',
      isLinked: true,
      balance: 500,
      phoneNumber: '98XXXXXX21',
    },
    {
      id: '3',
      name: 'Mobikwik',
      icon: '📱',
      color: '#5F2EEA',
      isLinked: false,
    },
    {
      id: '4',
      name: 'Freecharge',
      icon: '⚡',
      color: '#00C853',
      isLinked: false,
    },
    {
      id: '5',
      name: 'PhonePe Wallet',
      icon: '🟣',
      color: '#5F259F',
      isLinked: false,
    },
    {
      id: '6',
      name: 'Ola Money',
      icon: '🚗',
      color: '#2AB24B',
      isLinked: false,
    },
  ]);

  const handleLinkWallet = (walletId: string) => {
    Alert.alert(
      'Link Wallet',
      'You will be redirected to the wallet app to complete linking.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => {
            setTimeout(() => {
              setWallets(
                wallets.map((wallet) =>
                  wallet.id === walletId
                    ? { ...wallet, isLinked: true, balance: 0, phoneNumber: '98XXXXXX21' }
                    : wallet
                )
              );
              Alert.alert('Success', 'Wallet linked successfully!');
            }, 1000);
          },
        },
      ]
    );
  };

  const handleUnlinkWallet = (walletId: string) => {
    Alert.alert(
      'Unlink Wallet',
      'Are you sure you want to unlink this wallet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unlink',
          style: 'destructive',
          onPress: () => {
            setWallets(
              wallets.map((wallet) =>
                wallet.id === walletId
                  ? { ...wallet, isLinked: false, balance: undefined, phoneNumber: undefined }
                  : wallet
              )
            );
          },
        },
      ]
    );
  };

  const linkedWallets = wallets.filter((w) => w.isLinked);
  const availableWallets = wallets.filter((w) => !w.isLinked);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallets</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="wallet" size={20} color={ORANGE_PRIMARY} />
          <Text style={styles.infoText}>
            Link your digital wallets for quick and easy payments
          </Text>
        </View>

        {linkedWallets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Linked Wallets</Text>
            {linkedWallets.map((wallet) => (
              <View key={wallet.id} style={styles.walletCard}>
                <View style={styles.walletHeader}>
                  <View style={[styles.walletIcon, { backgroundColor: wallet.color + '20' }]}>
                    <Text style={styles.walletIconText}>{wallet.icon}</Text>
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>{wallet.name}</Text>
                    <Text style={styles.walletPhone}>{wallet.phoneNumber}</Text>
                  </View>
                  <View style={styles.linkedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text style={styles.linkedText}>Linked</Text>
                  </View>
                </View>
                <View style={styles.balanceRow}>
                  <Text style={styles.balanceLabel}>Available Balance</Text>
                  <Text style={styles.balanceAmount}>₹ {wallet.balance?.toLocaleString()}</Text>
                </View>
                <View style={styles.walletActions}>
                  <TouchableOpacity style={styles.addMoneyBtn}>
                    <Ionicons name="add" size={18} color={ORANGE_PRIMARY} />
                    <Text style={styles.addMoneyText}>Add Money</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.unlinkBtn}
                    onPress={() => handleUnlinkWallet(wallet.id)}
                  >
                    <Text style={styles.unlinkText}>Unlink</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {availableWallets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Wallets</Text>
            {availableWallets.map((wallet) => (
              <View key={wallet.id} style={styles.availableWalletCard}>
                <View style={styles.walletHeader}>
                  <View style={[styles.walletIcon, { backgroundColor: wallet.color + '20' }]}>
                    <Text style={styles.walletIconText}>{wallet.icon}</Text>
                  </View>
                  <View style={styles.walletInfo}>
                    <Text style={styles.walletName}>{wallet.name}</Text>
                    <Text style={styles.walletDescription}>Link to use for payments</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.linkBtn}
                    onPress={() => handleLinkWallet(wallet.id)}
                  >
                    <Text style={styles.linkBtnText}>Link</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why use Wallets?</Text>
          <View style={styles.benefitsList}>
            {[
              { icon: '⚡', text: 'Instant payments without entering card details' },
              { icon: '🔒', text: 'Secure transactions with wallet protection' },
              { icon: '💸', text: 'Exclusive cashback offers on wallet payments' },
              { icon: '📱', text: 'Easy refunds directly to your wallet' },
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>
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
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ORANGE_LIGHT,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  walletCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  walletIconText: {
    fontSize: 24,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  walletPhone: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  walletDescription: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  linkedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  linkedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: ORANGE_PRIMARY,
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  addMoneyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ORANGE_PRIMARY,
  },
  addMoneyText: {
    color: ORANGE_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  unlinkBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  unlinkText: {
    color: '#FF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  availableWalletCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  linkBtn: {
    backgroundColor: ORANGE_PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  linkBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});
