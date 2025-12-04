import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';

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
    subMenus: ['Cash Refund', 'Cash Coupons', 'Club Cash']
  },
  { title: 'Cashback Codes', hasExpand: false },
  { title: 'My Refunds', hasExpand: false },
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
  { title: 'Address Book', hasExpand: false },
  { title: 'My payment details', hasExpand: false },
  { 
    title: 'Intelli Education Subscription', 
    hasExpand: true,
    subMenus: ['Intelibaby Subscription', 'Intelikit Subscription']
  },
  { title: 'Gift Certificate', hasExpand: false },
  { title: 'My Reviews', hasExpand: false },
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

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenu(expandedMenu === menuTitle ? null : menuTitle);
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
          { icon: '💰', title: 'Cash Refund', action: () => {} },
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
              onPress={() => item.hasExpand && toggleMenu(item.title)}
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

  // Render Club Cash Page if showClubCashPage is true
  if (showClubCashPage) {
    // Replace this with your actual Club Cash page component
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Club Cash Page</Text>
        <Button title="Go Back" onPress={() => setShowClubCashPage(false)} />
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
    backgroundColor: '#1E40AF',
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
});