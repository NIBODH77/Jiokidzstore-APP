
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CashCouponsPageProps {
  onBack: () => void;
}

interface Coupon {
  id: number;
  code: string;
  description: string;
  validTill: string;
  amount: string;
  terms: string[];
}

export default function CashCouponsPage({ onBack }: CashCouponsPageProps) {
  const [expandedCoupon, setExpandedCoupon] = useState<number | null>(null);

  const coupons: Coupon[] = [
    {
      id: 1,
      code: 'FCRY1900BGEAR',
      description: 'Flat ₹ 1900 OFF* on Baby Gear orders worth ₹ 4999 & above',
      validTill: '15-Dec-2025 (5 Days left)',
      amount: '1900',
      terms: [
        'Limited Period Offer.',
        'User will get flat ₹ 1900 OFF on Baby Gear orders worth ₹ 4999 & above.',
        'Coupon code is valid on Baby Gear Range except on brands Fisher Price by Tiffany, Jane, Joie, Masilo, Melissa & Doug, Shumee, Vaux, Baybee. For more T & C\'s, Click Here.',
        'Coupon is not applicable with any other coupon.',
        'Coupon is applicable only on the MRP of products.',
        'Prices inclusive of all taxes. Please refer Terms of Use for full details.',
        'Coupon code can\'t be used for purchase of FirstCry Club Membership.',
      ],
    },
    {
      id: 2,
      code: 'FCRY300DP',
      description: 'Flat ₹ 300 OFF on Diapers orders worth ₹ 1099 & above',
      validTill: '15-Dec-2025 (5 Days left)',
      amount: '300',
      terms: [
        'Limited Period Offer.',
        'User will get flat ₹ 300 OFF on Diapers orders worth ₹ 1099 & above.',
        'Coupon code is valid on Diapers Range.',
        'Coupon is not applicable with any other coupon.',
        'Coupon is applicable only on the MRP of products.',
      ],
    },
  ];

  const toggleCoupon = (couponId: number) => {
    setExpandedCoupon(expandedCoupon === couponId ? null : couponId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CASH COUPONS</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Total Coupons Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalText}>You have ₹ 4500 worth of Cash Coupons.</Text>
        </View>

        {/* Coupon Cards */}
        {coupons.map((coupon) => (
          <View key={coupon.id} style={styles.couponCard}>
            {/* Coupon Details */}
            <View style={styles.couponRow}>
              <Text style={styles.label}>Coupon Code</Text>
              <Text style={styles.value}>: {coupon.code}</Text>
            </View>
            <View style={styles.couponRow}>
              <Text style={styles.label}>Description</Text>
              <Text style={styles.value}>: {coupon.description}</Text>
            </View>
            <View style={styles.couponRow}>
              <Text style={styles.label}>Valid Till</Text>
              <Text style={styles.value}>: {coupon.validTill}</Text>
            </View>
            <View style={styles.couponRow}>
              <Text style={styles.label}>Amount (₹)</Text>
              <Text style={styles.value}>: {coupon.amount}</Text>
            </View>

            {/* View/Close Details Button */}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => toggleCoupon(coupon.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.detailsButtonText}>
                {expandedCoupon === coupon.id ? 'Close Details' : 'View Details'}
              </Text>
            </TouchableOpacity>

            {/* Terms of Use - Expanded */}
            {expandedCoupon === coupon.id && (
              <View style={styles.termsSection}>
                <Text style={styles.termsTitle}>Terms of Use : {coupon.code}</Text>
                <View style={styles.termsList}>
                  {coupon.terms.map((term, index) => (
                    <Text key={index} style={styles.termItem}>
                      {index + 1}. {term}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}

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
  totalCard: {
    backgroundColor: '#FFFBF0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFE4A3',
  },
  totalText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  couponRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: '#666',
    width: 110,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  detailsButton: {
    backgroundColor: '#FFFBF0',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFE4A3',
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  termsSection: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  termsList: {
    gap: 8,
  },
  termItem: {
    fontSize: 13,
    color: '#666',
    lineHeight: 22,
  },
});
