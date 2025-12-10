import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  minOrder: string;
  validTill: string;
  terms: string[];
  type: 'all' | 'expiring' | 'high';
  icon: 'pricetag' | 'gift' | 'wallet' | 'sparkles';
}

export default function DiscountCouponsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'expiring' | 'high'>('all');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedCoupon, setExpandedCoupon] = useState<string | null>(null);

  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'FLAT50',
      title: 'Flat ₹50 Off',
      description: 'Get ₹50 off on orders above ₹499',
      discount: '₹50 OFF',
      minOrder: '₹499',
      validTill: '31 Dec, 2025',
      terms: ['Valid on all products', 'Cannot be combined with other offers', 'One time use per user'],
      type: 'all',
      icon: 'pricetag'
    },
    {
      id: '2',
      code: 'NEWUSER100',
      title: 'New User Special',
      description: 'Get ₹100 off on your first order above ₹999',
      discount: '₹100 OFF',
      minOrder: '₹999',
      validTill: '31 Dec, 2025',
      terms: ['Valid only for new users', 'Minimum order ₹999', 'Valid on first purchase only'],
      type: 'high',
      icon: 'gift'
    },
    {
      id: '3',
      code: 'SAVE20',
      title: '20% Off',
      description: 'Get 20% off on orders above ₹1499',
      discount: '20% OFF',
      minOrder: '₹1499',
      validTill: '15 Dec, 2025',
      terms: ['Maximum discount ₹500', 'Valid on fashion category', 'Not valid on sale items'],
      type: 'expiring',
      icon: 'wallet'
    },
    {
      id: '4',
      code: 'MEGA200',
      title: 'Mega Discount',
      description: 'Get ₹200 off on orders above ₹1999',
      discount: '₹200 OFF',
      minOrder: '₹1999',
      validTill: '25 Dec, 2025',
      terms: ['Valid on electronics', 'One time use per user', 'Cannot be clubbed with other offers'],
      type: 'high',
      icon: 'sparkles'
    },
    {
      id: '5',
      code: 'FLASH15',
      title: 'Flash Sale',
      description: 'Get 15% off on all products',
      discount: '15% OFF',
      minOrder: '₹799',
      validTill: '12 Dec, 2025',
      terms: ['Valid for 24 hours only', 'Maximum discount ₹300', 'Valid on all categories'],
      type: 'expiring',
      icon: 'sparkles'
    },
    {
      id: '6',
      code: 'WEEKEND25',
      title: 'Weekend Bonanza',
      description: 'Get 25% off on orders above ₹2499',
      discount: '25% OFF',
      minOrder: '₹2499',
      validTill: '31 Dec, 2025',
      terms: ['Valid on weekends only', 'Maximum discount ₹750', 'Valid on home & kitchen'],
      type: 'high',
      icon: 'gift'
    },
    {
      id: '7',
      code: 'FIRST50',
      title: 'First Order Deal',
      description: 'Get ₹50 off on your first order',
      discount: '₹50 OFF',
      minOrder: '₹399',
      validTill: '31 Dec, 2025',
      terms: ['Valid for new users only', 'Minimum order ₹399', 'One time use'],
      type: 'all',
      icon: 'pricetag'
    },
    {
      id: '8',
      code: 'SUPER300',
      title: 'Super Saver',
      description: 'Get ₹300 off on orders above ₹2999',
      discount: '₹300 OFF',
      minOrder: '₹2999',
      validTill: '28 Dec, 2025',
      terms: ['Valid on all products', 'Cannot be combined with other offers', 'Limited period offer'],
      type: 'high',
      icon: 'wallet'
    }
  ];

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         coupon.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || coupon.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    Alert.alert('Success', `Coupon ${code} applied successfully! Proceed to checkout to see the discount.`);
  };

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    Alert.alert('Copied!', `Coupon code ${code} copied to clipboard`);
  };

  const getIconName = (iconType: string): keyof typeof Ionicons.glyphMap => {
    switch (iconType) {
      case 'pricetag': return 'pricetag';
      case 'gift': return 'gift';
      case 'wallet': return 'wallet';
      case 'sparkles': return 'sparkles';
      default: return 'pricetag';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discount Coupons</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerBannerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="gift" size={20} color="#fff" />
          </View>
          <Text style={styles.headerBannerText}>Apply these coupons to get discounts on your orders</Text>
        </View>
        <View style={styles.couponCountBadge}>
          <Ionicons name="pricetag" size={16} color="#fff" />
          <Text style={styles.couponCountText}>{filteredCoupons.length} Coupons Available</Text>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchFilterContainer}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search coupons..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            onPress={() => setActiveFilter('all')}
            style={[styles.filterTab, activeFilter === 'all' && styles.filterTabActive]}
          >
            <Text style={[styles.filterTabText, activeFilter === 'all' && styles.filterTabTextActive]}>
              All Coupons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter('expiring')}
            style={[styles.filterTab, activeFilter === 'expiring' && styles.filterTabExpiring]}
          >
            <Text style={[styles.filterTabText, activeFilter === 'expiring' && styles.filterTabTextActive]}>
              Expiring Soon
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter('high')}
            style={[styles.filterTab, activeFilter === 'high' && styles.filterTabHigh]}
          >
            <Text style={[styles.filterTabText, activeFilter === 'high' && styles.filterTabTextActive]}>
              High Discounts
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Coupons List */}
      <ScrollView style={styles.couponsList} showsVerticalScrollIndicator={false}>
        {filteredCoupons.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="bag-handle-outline" size={48} color="#FF6B35" />
            </View>
            <Text style={styles.emptyTitle}>No Coupons Found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filter to find available coupons</Text>
          </View>
        ) : (
          filteredCoupons.map((coupon) => {
            const isExpanded = expandedCoupon === coupon.id;
            const isApplied = appliedCoupon === coupon.code;
            const isCopied = copiedCode === coupon.code;

            return (
              <View
                key={coupon.id}
                style={[styles.couponCard, isApplied && styles.couponCardApplied]}
              >
                {/* Discount Badge */}
                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>{coupon.discount}</Text>
                </View>

                {/* Coupon Content */}
                <View style={styles.couponContent}>
                  <View style={styles.couponHeader}>
                    <View style={styles.couponIconContainer}>
                      <Ionicons name={getIconName(coupon.icon)} size={24} color="#FF6B35" />
                    </View>
                    <View style={styles.couponInfo}>
                      <Text style={styles.couponTitle}>{coupon.title}</Text>
                      <Text style={styles.couponDescription}>{coupon.description}</Text>
                    </View>
                  </View>

                  {/* Coupon Code Box */}
                  <View style={styles.codeBox}>
                    <View style={styles.codeBoxLeft}>
                      <Text style={styles.codeLabel}>Coupon Code</Text>
                      <Text style={styles.codeText}>{coupon.code}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleCopyCode(coupon.code)}
                      style={styles.copyBtn}
                    >
                      <Ionicons name={isCopied ? "checkmark" : "copy-outline"} size={18} color="#FF6B35" />
                      <Text style={styles.copyBtnText}>{isCopied ? 'Copied' : 'Copy'}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Validity */}
                  <View style={styles.validityRow}>
                    <Ionicons name="calendar-outline" size={16} color="#F97316" />
                    <Text style={styles.validityText}>Valid till: {coupon.validTill}</Text>
                  </View>

                  {/* View Details */}
                  <TouchableOpacity
                    onPress={() => setExpandedCoupon(isExpanded ? null : coupon.id)}
                    style={styles.detailsBtn}
                  >
                    <Ionicons name="information-circle-outline" size={18} color="#FF6B35" />
                    <Text style={styles.detailsBtnText}>
                      {isExpanded ? 'Hide Details' : 'View Details'}
                    </Text>
                  </TouchableOpacity>

                  {/* Expanded Terms */}
                  {isExpanded && (
                    <View style={styles.termsContainer}>
                      <Text style={styles.termsTitle}>Terms & Conditions:</Text>
                      {coupon.terms.map((term, index) => (
                        <View key={index} style={styles.termRow}>
                          <Text style={styles.termBullet}>•</Text>
                          <Text style={styles.termText}>{term}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Apply Button */}
                  <TouchableOpacity
                    onPress={() => handleApplyCoupon(coupon.code)}
                    style={[styles.applyBtn, isApplied && styles.applyBtnApplied]}
                    disabled={isApplied}
                  >
                    <Text style={[styles.applyBtnText, isApplied && styles.applyBtnTextApplied]}>
                      {isApplied ? 'Applied ✓' : 'Apply Coupon'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FF6B35',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerBanner: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  headerIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 16,
  },
  headerBannerText: {
    flex: 1,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  couponCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  couponCountText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  searchFilterContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -12,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterScroll: {
    marginHorizontal: -4,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
  },
  filterTabActive: {
    backgroundColor: '#FF6B35',
  },
  filterTabExpiring: {
    backgroundColor: '#F97316',
  },
  filterTabHigh: {
    backgroundColor: '#10B981',
  },
  filterTabText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTabTextActive: {
    color: '#fff',
  },
  couponsList: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 48,
    alignItems: 'center',
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFF0E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  couponCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  couponCardApplied: {
    borderColor: '#10B981',
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 16,
    zIndex: 1,
  },
  discountBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  couponContent: {
    padding: 14,
  },
  couponHeader: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
    paddingRight: 80,
  },
  couponIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF0E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponInfo: {
    flex: 1,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  couponDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF0E8',
    borderWidth: 2,
    borderColor: '#FFD6C4',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  codeBoxLeft: {
    flex: 1,
  },
  codeLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  codeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF6B35',
    letterSpacing: 2,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD6C4',
  },
  copyBtnText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 13,
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  validityText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  detailsBtnText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 14,
  },
  termsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  termRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  termBullet: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  termText: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  applyBtn: {
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  applyBtnApplied: {
    backgroundColor: '#10B981',
  },
  applyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  applyBtnTextApplied: {
    color: '#fff',
  },
});