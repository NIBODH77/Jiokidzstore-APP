import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import CashRefundPage from '@/screens/product/CashRefundPage';
import CashCouponsPage from '@/screens/product/CashCouponsPage';

const { width: screenWidth } = Dimensions.get('window');

interface MenuItem {
  icon: string;
  label: string;
  bg: string;
}

const menuItems: MenuItem[] = [
  { icon: '👕', label: 'Shop By Category', bg: '#FFE4EC' },
  { icon: '🏪', label: 'Boutiques', bg: '#1A1A1A' },
  { icon: '👨‍👩‍👧', label: 'Parenting', bg: '#FFE4EC' },
  { icon: '🎭', label: 'Club', bg: '#FFE4EC' },
  { icon: '💰', label: 'Offer Zone', bg: '#FFF3CD' },
  { icon: '🎁', label: 'Gifts & Cards', bg: '#E8D5FF' },
  { icon: '📚', label: 'Intelli Education', bg: '#FFF9E6' },
  { icon: '🎒', label: 'Preschools', bg: '#D6EAF8' },
  { icon: '🏬', label: 'FirstCry Stores', bg: '#FFE8D6' },
  { icon: '🛍️', label: 'Sell with Us', bg: '#E8D5FF' },
  { icon: '🎮', label: 'PlayBees', bg: '#FFF3CD' },
  { icon: '🤝', label: 'Customer Service', bg: '#D6EAF8' },
];

const accountMenuItems = [
  {
    title: 'Cash In My Account',
    hasExpand: true,
    subMenus: ['Cash Refund', 'Club Cash']
  },
  { title: 'My Refunds', hasExpand: false, navigateTo: 'MyRefunds' },
  {
    title: 'My Orders',
    hasExpand: true,
    subMenus: ['Order History', 'Track Order']
  },
  {
    title: 'My Profile',
    hasExpand: true,
    subMenus: ['Contact Details', 'Personal Details', 'Child Details']
  },
  { title: 'Address Book', hasExpand: false, navigateTo: 'AddressBook' },
  {
    title: 'My payment details',
    hasExpand: true,
    subMenus: ['Saved Cards', 'Add Bank Account']
  },

  { title: 'Gift Certificate', hasExpand: false },
  { title: 'My Reviews', hasExpand: false, navigateTo: 'MyReviews' },
  { title: 'Invites and Credits', hasExpand: false },
  { title: 'Notify Me', hasExpand: false },
  { title: 'My Shortlist', hasExpand: false },
  { title: 'My Recently Viewed', hasExpand: false },
];

const recentProducts = [
  { offer: '20% OFF', price: '₹299', oldPrice: '₹374', name: 'Kids T-Shirt', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200&h=200&fit=crop' },
  { offer: '48% OFF', price: '₹156', oldPrice: '₹300', name: 'Baby Shoes', img: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=200&h=200&fit=crop' },
  { offer: '25% OFF', price: '₹225', oldPrice: '₹300', name: 'Toy Set', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop' }
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'profile' | 'menu'>('profile');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [showClubCashPage, setShowClubCashPage] = useState(false); // State to control Club Cash page visibility
  const [showCashRefundPage, setShowCashRefundPage] = useState(false); // State to control Cash Refund page visibility
  const [showCashCouponsPage, setShowCashCouponsPage] = useState(false); // State to control Cash Coupons page visibility
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null); // State to control FAQ expansion

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenu(expandedMenu === menuTitle ? null : menuTitle);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleMenuPress = (screenName: string) => {
    // Use push instead of navigate to maintain proper navigation stack
    if (screenName === 'CashRefund') {
      (navigation as any).push('CashRefund');
    } else if (screenName === 'CashCoupons') {
      (navigation as any).push('CashCoupons');
    } else if (screenName === 'MyRefunds') {
      (navigation as any).push('MyRefunds');
    } else if (screenName === 'OrderHistory') {
      (navigation as any).push('OrderHistory');
    } else if (screenName === 'TrackOrder') {
      (navigation as any).push('TrackOrder', { orderNumber: 'ORD123456' });
    }
  };

  const handleCashRefundPress = () => {
    // navigation.navigate('CashRefund' as never);
    setShowCashRefundPage(true);
  };

  const handleCashCouponsPress = () => {
    // navigation.navigate('CashCoupons' as never);
    setShowCashCouponsPage(true);
  };

  const ProfileContent = () => (
    <View style={styles.contentContainer}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarInner} />
        </View>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeTitle}>Hi Lolu</Text>
          <Text style={styles.welcomeSubtitle}>
            Add Child details to have personalized shopping experience. →
          </Text>
        </View>
      </View>

      {/* Club Banner */}
      <View style={styles.clubBanner}>
        <View style={styles.clubIconContainer}>
          <View style={styles.clubIcon} />
        </View>
        <Text style={styles.clubText}>
          Join <Text style={styles.clubTextBold}>Club</Text> Now!
        </Text>
        <Pressable style={styles.clubButton}>
          <Text style={styles.clubButtonText}>Buy at ₹ 78/Month →</Text>
        </Pressable>
      </View>

      {/* Shopping Section */}
      <Text style={styles.sectionTitle}>Shopping</Text>
      <View style={styles.shoppingGrid}>
        {[
          { icon: '👤', title: 'Account', action: () => setShowAccountMenu(true) },
          { icon: '📦', title: 'Order History', action: () => {} },
          { icon: '🚚', title: 'Track order', action: () => {} },
          { icon: '💰', title: 'Cash Refund', action: handleCashRefundPress },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={styles.shoppingCard}
            onPress={item.action}
          >
            <View style={styles.shoppingIconContainer}>
              <Text style={styles.shoppingIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.shoppingCardText}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      {/* Recently Viewed Products */}
      <Text style={styles.sectionTitle}>Your Recently Viewed Products</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recentlyViewedScroll}
      >
        {recentProducts.map((product, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.productImageContainer}>
              <Image
                source={{ uri: product.img }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.offerBadge}>
                <Text style={styles.offerBadgeText}>{product.offer}</Text>
              </View>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
              </View>
              <TouchableOpacity style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Parenting Section */}
      <Text style={styles.sectionTitle}>Parenting</Text>
      <View style={styles.parentingGrid}>
        {[
          { icon: '🏠', title: 'My Feed' },
          { icon: '💉', title: 'Vaccine & Growth' },
          { icon: '🏆', title: 'Contests' },
          { icon: '💬', title: 'Expert Q&A' },
        ].map((item, index) => (
          <Pressable key={index} style={styles.parentingItem}>
            <Text style={styles.parentingIcon}>{item.icon}</Text>
            <Text style={styles.parentingLabel}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.parentingActivities}>
        <Text style={styles.parentingActivitiesText}>Parenting Activities</Text>
        <Ionicons name="chevron-down" size={24} color="#333" />
      </Pressable>

      <View style={{ height: 40 }} />
    </View>
  );

  const MenuContent = () => (
    <View style={styles.menuContentContainer}>
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: item.bg }]}>
              <Text style={[styles.menuIcon, item.bg === '#1A1A1A' && { color: '#fff' }]}>
                {item.icon}
              </Text>
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const AccountMenuOverlay = () => (
    <View style={[styles.overlay, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.overlayHeader}>
        <TouchableOpacity onPress={() => setShowAccountMenu(false)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.overlayTitle}>My Account</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Account Menu Items */}
      <ScrollView style={styles.overlayContent} showsVerticalScrollIndicator={false}>
        {accountMenuItems.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                if (item.navigateTo) {
                  (navigation as any).push(item.navigateTo);
                  setShowAccountMenu(false);
                } else if (item.hasExpand) {
                  toggleMenu(item.title);
                }
              }}
              style={styles.accountMenuItem}
              activeOpacity={0.7}
            >
              <Text style={styles.accountMenuText}>{item.title}</Text>
              {item.hasExpand && (
                <Text style={styles.expandIcon}>
                  {expandedMenu === item.title ? '−' : '+'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Sub Menus */}
            {item.hasExpand && expandedMenu === item.title && item.subMenus && (
                  <View style={styles.subMenuContainer}>
                    {item.subMenus.map((subMenu, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        style={styles.subMenuItem}
                        activeOpacity={0.7}
                        onPress={() => {
                          if (subMenu === 'Club Cash') {
                            setShowClubCashPage(true);
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Cash Refund') {
                            handleMenuPress('CashRefund');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Order History') {
                            handleMenuPress('OrderHistory');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Track Order') {
                            handleMenuPress('TrackOrder');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Contact Details') {
                            (navigation as any).push('ContactDetails');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Personal Details') {
                            (navigation as any).push('PersonalDetails');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Child Details') {
                            (navigation as any).push('ChildDetails');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Saved Cards') {
                            (navigation as any).push('SavedCards');
                            setShowAccountMenu(false);
                          } else if (subMenu === 'Add Bank Account') {
                            (navigation as any).push('AddBankAccount');
                            setShowAccountMenu(false);
                          }
                        }}
                      >
                        <Text style={styles.subMenuText}>{subMenu}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );

  // Render Cash Refund Page if showCashRefundPage is true
  if (showCashRefundPage) {
    return (
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <CashRefundPage onBack={() => setShowCashRefundPage(false)} />
      </View>
    );
  }

  // Render Cash Coupons Page if showCashCouponsPage is true
  if (showCashCouponsPage) {
    return (
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <CashCouponsPage onBack={() => setShowCashCouponsPage(false)} />
      </View>
    );
  }

  // Render Club Cash Page if showClubCashPage is true
  if (showClubCashPage) {
    return (
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.overlayHeader}>
          <TouchableOpacity onPress={() => setShowClubCashPage(false)} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.overlayTitle}>Club Cash</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.clubCashScrollView} showsVerticalScrollIndicator={false}>
          {/* Current Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>₹ 0</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>

          {/* Join Club Section */}
          <View style={styles.joinClubSection}>
            <View style={styles.joinClubHeader}>
              <View style={styles.clubIconSmall} />
              <Text style={styles.joinClubHeaderText}>
                Join Club & Earn Club Cash Benefit On Products
              </Text>
            </View>

            {/* Plans */}
            <View style={styles.plansRow}>
              {/* 3 Months Plan */}
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>3 Months</Text>
                <Text style={styles.planPrice}>₹ 267.33</Text>
                <Text style={styles.planOldPrice}>₹ 399</Text>
                <Text style={styles.planDiscount}>33% OFF</Text>
                <TouchableOpacity style={styles.addNowButton}>
                  <Text style={styles.addNowButtonText}>ADD NOW</Text>
                </TouchableOpacity>
              </View>

              {/* 12 Months Plan */}
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>12 Months</Text>
                <Text style={styles.planPrice}>₹ 941.97</Text>
                <Text style={styles.planOldPrice}>₹ 1599</Text>
                <Text style={styles.planDiscount}>41.09% OFF</Text>
                <TouchableOpacity style={styles.addNowButton}>
                  <Text style={styles.addNowButtonText}>ADD NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* How To Earn Club Cash */}
          <View style={styles.howToEarnSection}>
            <Text style={styles.sectionTitleClub}>How To Earn Club Cash?</Text>
            <View style={styles.earnDescription}>
              <View style={styles.earnIconCircle}>
                <Text style={styles.earnIconText}>C</Text>
              </View>
              <Text style={styles.earnDescriptionText}>
                Join Club membership & earn club cash on purchase of eligible products.
              </Text>
            </View>

            <View style={styles.planDetailsCard}>
              <Text style={styles.planDetailsTitle}>▶ 3 Months Plan & 6 Months Plan:</Text>
              <Text style={styles.planDetailsText}>
                Customers receive Club Cash as per the Club cash allocation logic of Firstcry.com
              </Text>
            </View>

            <View style={styles.planDetailsCard}>
              <Text style={styles.planDetailsTitle}>▶ 12 Months Plan:</Text>
              <Text style={styles.planDetailsText}>
                Customers receive 2 X of 3 Months Club Cash.
              </Text>
            </View>
          </View>

          {/* How shop & earn Works */}
          <View style={styles.howShopWorksSection}>
            <Text style={styles.sectionTitleClub}>How shop & earn Works?</Text>
            {[
              { icon: '📱', text: 'Join Club' },
              { icon: '❤️', text: 'Select your favourite products on JioKids.' },
              { icon: '💰', text: 'Club Cash to be earned is mentioned against each eligible product' },
              { icon: '🎯', text: 'Earn Club Cash on your purchase' },
              { icon: '📦', text: 'Once product is successfully delivered, earned Club Cash would show in your account' },
              { icon: '💳', text: 'Accumulate a minimum of ₹ 100 Club Cash' },
              { icon: '💸', text: 'Pay for your order with the Club Cash earned' },
            ].map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.stepIconCircle}>
                  <Text style={styles.stepIcon}>{step.icon}</Text>
                </View>
                <Text style={styles.stepText}>{step.text}</Text>
              </View>
            ))}
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={styles.sectionTitleClub}>Frequently asked questions</Text>
            {[
              {
                question: 'What is the Club Cash Program on products?',
                answer: 'The Club Cash Program allows Club members to earn cashback on eligible products which can be used for future purchases on JioKids.',
              },
              {
                question: 'How do I earn Club Cash on products?',
                answer: 'Go to Firstcry.com, become a Club member, and search for your favourite products. You will see the Club Cash available against the eligible products. On purchasing the product, the club cash for the product will be automatically added to your account within 48 hours of being successfully delivered to you. If you are purchasing at a FirstCry store, the store receipt will explicitly mention the Club Cash earned by you for that purchase. Club Cash is credited to your account within 24 hours of purchase. Note that in case of purchases at the FirstCry store, Club Cash earned by you is recorded against your mobile number if you are a club member. Please ensure you share the correct mobile number which has an active club membership at the time of purchase.',
              },
              {
                question: 'How is my Club Cash Calculated on products?',
                answer: 'Club Cash is calculated based on the value of eligible products purchased and your membership plan. Higher tier plans offer better Club Cash rates.',
              },
              {
                question: 'How do I redeem my Club Cash?',
                answer: 'You can redeem your Club Cash during checkout. A minimum balance of ₹100 is required to use Club Cash for payment.',
              },
              {
                question: 'What happens if I return/cancel my order?',
                answer: 'If you return or cancel your order, the Club Cash earned on that order will be deducted from your account.',
              },
              {
                question: "Will my Club Cash expire if I don't use it?",
                answer: 'Club Cash has a validity period. Please check your account for specific expiry dates.',
              },
              {
                question: 'Can I redeem Club cash earned on the FirstCry website at the FirstCry Stores and vice-versa?',
                answer: 'Yes, you can redeem Club Cash earned on the website at FirstCry stores and vice-versa.',
              },
              {
                question: 'Can I Earn club cash if I am not a club member?',
                answer: 'No, Club Cash benefits are exclusive to Club members only. Join Club to start earning.',
              },
            ].map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(index)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Ionicons
                    name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
                {expandedFAQ === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBackBtn}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab('profile')}
            style={[
              styles.tabButton,
              activeTab === 'profile' && styles.tabButtonActive
            ]}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === 'profile' && styles.tabButtonTextActive
            ]}>
              👤 PROFILE
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('menu')}
            style={[
              styles.tabButton,
              activeTab === 'menu' && styles.tabButtonActive
            ]}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === 'menu' && styles.tabButtonTextActive
            ]}>
              ☰ MENU
            </Text>
          </Pressable>
        </View>

        {/* Content */}
        {activeTab === 'profile' ? <ProfileContent /> : <MenuContent />}
      </ScrollView>

      {/* Account Menu Overlay */}
      {showAccountMenu && <AccountMenuOverlay />}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerBackBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#FF6B35',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
  },
  welcomeSection: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FDBA74',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#FCE7F3',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarInner: {
    width: 28,
    height: 28,
    backgroundColor: '#F9A8D4',
    borderRadius: 14,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  clubBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  clubIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    marginRight: 12,
  },
  clubIcon: {},
  clubText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  clubTextBold: {
    fontWeight: '700',
  },
  clubButton: {
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  clubButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    marginTop: 8,
  },
  shoppingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  shoppingCard: {
    width: (screenWidth - 48 - 12) / 2,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  shoppingIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shoppingIcon: {
    fontSize: 24,
  },
  shoppingCardText: {
    fontSize: 14,
    color: '#1F2937',
  },
  recentlyViewedScroll: {
    paddingRight: 16,
    gap: 12,
  },
  productCard: {
    width: 160,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
  },
  productImageContainer: {
    height: 160,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  offerBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offerBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productOldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  parentingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  parentingItem: {
    width: (screenWidth - 48 - 12) / 2,
    backgroundColor: '#FCE4EC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentingIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  parentingLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  parentingActivities: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  parentingActivitiesText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuContentContainer: {
    paddingHorizontal: Spacing.lg,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuItem: {
    width: (screenWidth - 48 - 24) / 3,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 32,
  },
  menuLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  overlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    padding: 4,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  overlayContent: {
    flex: 1,
  },
  accountMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  accountMenuText: {
    fontSize: 16,
    color: '#555',
  },
  expandIcon: {
    fontSize: 24,
    color: '#999',
  },
  subMenuContainer: {
    backgroundColor: '#F5F5F5',
  },
  subMenuItem: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  subMenuText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#FF6B00',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clubCashScrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#2196F3',
    margin: 16,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  shopNowButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinClubSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  joinClubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clubIconSmall: {
    width: 32,
    height: 32,
    backgroundColor: '#2196F3',
    borderRadius: 16,
    marginRight: 12,
  },
  joinClubHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  plansRow: {
    flexDirection: 'row',
    gap: 12,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 4,
  },
  planOldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  planDiscount: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addNowButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  addNowButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  howToEarnSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitleClub: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  earnDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
  },
  earnIconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  earnDescriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  planDetailsCard: {
    backgroundColor: '#FFF9E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  planDetailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  planDetailsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  howShopWorksSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  stepIconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepIcon: {
    fontSize: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  faqSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 8,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingRight: 8,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
    paddingRight: 12,
  },
  faqAnswer: {
    paddingBottom: 16,
    paddingRight: 8,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});