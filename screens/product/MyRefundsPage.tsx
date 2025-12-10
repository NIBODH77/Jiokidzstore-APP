
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface Refund {
  id: string;
  orderNumber: string;
  date: string;
  amount: string;
  status: string;
  statusColor: string;
  productName: string;
  reason: string;
}

export default function MyRefundsPage() {
  const refunds: Refund[] = [
    {
      id: 'REF123456',
      orderNumber: 'ORD789012',
      date: '15 Nov 2024',
      amount: '₹1,299',
      status: 'Processing',
      statusColor: '#FEF3C7',
      productName: 'Wireless Bluetooth Headphones',
      reason: 'Product damaged'
    },
    {
      id: 'REF123457',
      orderNumber: 'ORD789013',
      date: '10 Nov 2024',
      amount: '₹599',
      status: 'Approved',
      statusColor: '#D1FAE5',
      productName: 'Mobile Phone Case',
      reason: 'Wrong item received'
    },
    {
      id: 'REF123458',
      orderNumber: 'ORD789014',
      date: '5 Nov 2024',
      amount: '₹2,499',
      status: 'Completed',
      statusColor: '#DBEAFE',
      productName: 'Smart Watch Band',
      reason: 'Product not as described'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Refund Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Refund Details</Text>
          
          <View style={styles.refundsList}>
            {refunds.map((refund) => (
              <View key={refund.id} style={styles.refundCard}>
                <View style={styles.refundHeader}>
                  <View style={styles.refundInfo}>
                    <Text style={styles.productName}>{refund.productName}</Text>
                    <Text style={styles.refundId}>Refund ID: {refund.id}</Text>
                    <Text style={styles.refundId}>Order: {refund.orderNumber}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: refund.statusColor }]}>
                    <Text style={styles.statusText}>{refund.status}</Text>
                  </View>
                </View>
                
                <View style={styles.refundGrid}>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridLabel}>Refund Amount</Text>
                    <Text style={styles.amountText}>{refund.amount}</Text>
                  </View>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridLabel}>Request Date</Text>
                    <Text style={styles.dateText}>{refund.date}</Text>
                  </View>
                </View>
                
                <View style={styles.reasonSection}>
                  <Text style={styles.gridLabel}>Reason</Text>
                  <Text style={styles.reasonText}>{refund.reason}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Text style={styles.helpText}>
            Need help with your refund? Contact our customer support at{' '}
            <Text style={styles.helpLink}>support@example.com</Text> or call{' '}
            <Text style={styles.helpLink}>1800-123-4567</Text>
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
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  refundsList: {
    gap: 16,
  },
  refundCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
  },
  refundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  refundInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  refundId: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  refundGrid: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  gridItem: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 14,
    color: '#374151',
  },
  reasonSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reasonText: {
    fontSize: 14,
    color: '#374151',
  },
  helpSection: {
    backgroundColor: '#EFF6FF',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  helpText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  helpLink: {
    color: '#2563EB',
    fontWeight: '500',
  },
});
