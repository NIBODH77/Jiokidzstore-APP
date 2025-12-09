
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopHeader } from '@/components/TopHeader';

export default function CashRefundPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.yellowCard}>
          <Text style={styles.balanceText}>You have ₹ 0.00 Cash Refund</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Amount Card */}
        <View style={styles.greyCard}>
          <Text style={styles.balanceAmountText}>Balance Amount: ₹ 0.00</Text>
        </View>

        {/* Refund Button */}
        <TouchableOpacity style={styles.refundButton} disabled>
          <Text style={styles.refundButtonText}>REFUND AMOUNT BACK TO ME</Text>
        </TouchableOpacity>

        {/* Info Message */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            You have insufficient balance to initiate cash refund.{' '}
            <Text style={styles.refundPolicyLink}>Refund Policy</Text>
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textTransform: 'uppercase',
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  yellowCard: {
    backgroundColor: '#FFFBF0',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE4A3',
  },
  balanceText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  shopNowButton: {
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  greyCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  balanceAmountText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  refundButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  refundButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  refundPolicyLink: {
    color: '#2196F3',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
