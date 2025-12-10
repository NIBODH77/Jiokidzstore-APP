
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CashRefundPage() {
  const navigation = useNavigation();
  const cashRefundAmount = 0.00;
  const balanceAmount = 0.00;

  const scrollViewRef = React.useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CASH REFUND</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Cash Refund Amount */}
        <View style={styles.cashRefundSection}>
          <Text style={styles.cashRefundText}>
            You have ₹{cashRefundAmount.toFixed(2)} Cash Refund{' '}
            <Text style={styles.shopNowLink}>Shop Now</Text>
          </Text>
        </View>

        {/* Balance Amount */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceText}>
            Balance Amount: ₹{balanceAmount.toFixed(2)}
          </Text>
        </View>

        {/* Refund Button */}
        <TouchableOpacity style={styles.refundButton} disabled>
          <Text style={styles.refundButtonText}>REFUND AMOUNT BACK TO ME</Text>
        </TouchableOpacity>

        {/* Insufficient Balance Message */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            You have insufficient balance to initiate cash refund.{' '}
            <Text style={styles.refundPolicyLink}>Refund Policy</Text>
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Scroll to Top Button */}
      <TouchableOpacity 
        style={styles.scrollToTopButton}
        onPress={scrollToTop}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-up" size={24} color="#1F2937" />
        <Text style={styles.scrollToTopText}>TOP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FCD34D',
    borderBottomWidth: 1,
    borderBottomColor: '#F59E0B',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  cashRefundSection: {
    marginBottom: 24,
  },
  cashRefundText: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 28,
  },
  shopNowLink: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  balanceSection: {
    marginBottom: 32,
  },
  balanceText: {
    fontSize: 20,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '600',
  },
  refundButton: {
    backgroundColor: '#9CA3AF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    opacity: 0.7,
  },
  refundButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  refundPolicyLink: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FCD34D',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollToTopText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 4,
  },
});
