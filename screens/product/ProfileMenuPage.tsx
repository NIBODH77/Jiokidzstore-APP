
import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Text,
  Image,
  Dimensions 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

interface MenuItem {
  icon?: string;
  label: string;
  bg: string;
  custom?: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { icon: '👕', label: 'Shop By Category', bg: '#FFE4EC' },
  { label: 'Boutiques', bg: '#1A1A1A', custom: <BoutiquesIcon /> },
  { icon: '👨‍👩‍👧', label: 'Parenting', bg: '#FFE4EC' },
  { icon: '🏪', label: 'Club', bg: '#FFE4EC' },
  { icon: '💰', label: 'Offer Zone', bg: '#FFF3CD' },
  { icon: '🎁', label: 'Gifts & Cards', bg: '#E8D5FF' },
  { label: 'Intelli Education', bg: '#FFF9E6', custom: <IntelliIcon /> },
  { icon: '🎒', label: 'Preschools', bg: '#D6EAF8' },
  { icon: '🏬', label: 'FirstCry Stores', bg: '#FFE8D6' },
  { icon: '🛍️', label: 'Sell with Us', bg: '#E8D5FF' },
  { icon: '🎮', label: 'PlayBees', bg: '#FFF3CD' },
  { icon: '🤝', label: 'Customer Service', bg: '#D6EAF8' },
];

const shoppingItems = [
  { icon: '👤', title: 'Account' },
  { icon: '📦', title: 'Order History' },
  { icon: '🚚', title: 'Track order' },
  { icon: '💰', title: 'Cash Refund' },
];

const recentProducts = [
  { offer: "20% OFF", price: "₹299", oldPrice: "374", name: "Kids T-Shirt" },
  { offer: "48% OFF", price: "₹156", oldPrice: "300", name: "Baby Shoes" },
  { offer: "25% OFF", price: "₹225", oldPrice: "300", name: "Toy Set" }
];

const parentingItems = [
  { icon: '🏠', title: 'My Feed', bg: '#FFF0F3' },
  { icon: '💉', title: 'Vaccine & Growth', bg: '#FFF0F3' },
  { icon: '🏆', title: 'Contests', bg: '#FFF0F3' },
  { icon: '💬', title: 'Expert Q&A', bg: '#FFF0F3' },
];

// Custom icon components
function BoutiquesIcon() {
  return (
    <View style={styles.boutiquesIcon}>
      <Text style={styles.boutiquesText1}>firstcry</Text>
      <Text style={styles.boutiquesText2}>.com</Text>
      <View style={styles.boutiquesLine} />
      <Text style={styles.boutiquesText3}>BOUTIQUES</Text>
    </View>
  );
}

function IntelliIcon() {
  return (
    <View style={styles.intelliIcon}>
      <Text style={styles.intelliText1}>intelli</Text>
      <Text style={styles.intelliText2}>education</Text>
    </View>
  );
}

const ProfileMenuPage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"profile" | "menu">("profile");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (menuTitle: string) => {
    setExpandedMenu(expandedMenu === menuTitle ? null : menuTitle);
  };

  // Profile Tab Content
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
        <View style={styles.clubIconContainer} />
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
        {shoppingItems.map((item, index) => (
          <Pressable 
            key={index} 
            style={styles.shoppingCard}
            onPress={() => item.title === 'Account' && setShowAccountMenu(true)}
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
          <View key={index} style={styles.recentlyViewedCard}>
            <View style={styles.productImagePlaceholder}>
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
              <Pressable style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Parenting Section */}
      <View style={styles.parentingSection}>
        <Text style={styles.sectionTitle}>Parenting</Text>
        <View style={styles.parentingGrid}>
          {parentingItems.map((item, index) => (
            <Pressable key={index} style={[styles.parentingCard, { backgroundColor: item.bg }]}>
              <Text style={styles.parentingIcon}>{item.icon}</Text>
              <Text style={styles.parentingTitle}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.parentingActivitiesButton}>
          <Text style={styles.parentingActivitiesText}>Parenting Activities</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </Pressable>
      </View>
    </View>
  );

  // Menu Tab Content
  const MenuContent = () => (
    <View style={styles.menuContentContainer}>
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: item.bg }]}>
              {item.custom ? item.custom : <Text style={styles.menuIcon}>{item.icon}</Text>}
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  // Account Menu Overlay
  const AccountMenuOverlay = () => {
    const accountMenuItems = [
      { 
        title: "Cash In My Account", 
        hasExpand: true,
        subMenus: ["Cash Refund", "Cash Coupons"]
      },
      { title: "Cashback Codes", hasExpand: false },
      { title: "My Refunds", hasExpand: false },
      { 
        title: "My Orders", 
        hasExpand: true,
        subMenus: ["Order History", "Track Order"]
      },
      { 
        title: "My Profile", 
        hasExpand: true,
        subMenus: ["Contact Details", "Personal Details", "Child Details"]
      },
      { title: "Address Book", hasExpand: false },
      { title: "My payment details", hasExpand: false },
      { 
        title: "Intelli Education Subscription", 
        hasExpand: true,
        subMenus: ["Intelibaby Subscription", "Intelikit Subscription"]
      },
      { title: "Gift Certificate", hasExpand: false },
      { title: "My Reviews", hasExpand: false },
      { title: "Invites and Credits", hasExpand: false },
      { title: "Notify Me", hasExpand: false },
      { title: "My Shortlist", hasExpand: false },
      { title: "My Recently Viewed", hasExpand: false },
    ];

    return (
      <View style={styles.accountMenuOverlay}>
        {/* Header */}
        <View style={[styles.accountMenuHeader, { paddingTop: insets.top }]}>
          <Pressable onPress={() => setShowAccountMenu(false)} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.accountMenuTitle}>My Account</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.accountMenuScroll}>
          {accountMenuItems.map((item, index) => (
            <View key={index}>
              <Pressable
                onPress={() => item.hasExpand && toggleMenu(item.title)}
                style={styles.accountMenuItem}
              >
                <Text style={styles.accountMenuItemText}>{item.title}</Text>
                {item.hasExpand && (
                  <Text style={styles.expandIcon}>
                    {expandedMenu === item.title ? "−" : "+"}
                  </Text>
                )}
              </Pressable>

              {/* Sub Menus */}
              {item.hasExpand && expandedMenu === item.title && item.subMenus && (
                <View style={styles.subMenuContainer}>
                  {item.subMenus.map((subMenu, subIndex) => (
                    <Pressable
                      key={subIndex}
                      style={styles.subMenuItem}
                    >
                      <Text style={styles.subMenuText}>{subMenu}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <Pressable style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>LOGOUT</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Account Menu Overlay */}
      {showAccountMenu && <AccountMenuOverlay />}

      {/* Header Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab("profile")}
          style={[
            styles.tabButton,
            activeTab === "profile" && styles.tabButtonActive
          ]}
        >
          <Text style={[
            styles.tabButtonText,
            activeTab === "profile" && styles.tabButtonTextActive
          ]}>
            👤 PROFILE
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("menu")}
          style={[
            styles.tabButton,
            activeTab === "menu" && styles.tabButtonActive
          ]}
        >
          <Text style={[
            styles.tabButtonText,
            activeTab === "menu" && styles.tabButtonTextActive
          ]}>
            ☰ MENU
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "profile" ? <ProfileContent /> : <MenuContent />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
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
    marginBottom: 12,
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
    marginBottom: 20,
  },
  clubIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#1E40AF',
    borderRadius: 20,
    marginRight: 12,
  },
  clubText: {
    fontSize: 18,
    color: '#1F2937',
    flex: 1,
  },
  clubTextBold: {
    fontWeight: '700',
  },
  clubButton: {
    backgroundColor: '#1E3A5F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  clubButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
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
    marginBottom: 24,
  },
  recentlyViewedCard: {
    width: 176,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 176,
    backgroundColor: '#F3F4F6',
    position: 'relative',
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
    fontSize: 10,
    fontWeight: '700',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  productOldPrice: {
    fontSize: 14,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  parentingSection: {
    marginBottom: 24,
  },
  parentingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  parentingCard: {
    width: (screenWidth - 48 - 12) / 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  parentingIcon: {
    fontSize: 48,
    marginRight: 12,
  },
  parentingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
  parentingActivitiesButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parentingActivitiesText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  dropdownIcon: {
    fontSize: 24,
    color: '#6B7280',
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
  boutiquesIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  boutiquesText1: {
    color: '#FB923C',
    fontSize: 18,
    fontWeight: '700',
  },
  boutiquesText2: {
    color: '#60A5FA',
    fontSize: 14,
  },
  boutiquesLine: {
    width: 64,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
  },
  boutiquesText3: {
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 2,
  },
  intelliIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  intelliText1: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: '700',
  },
  intelliText2: {
    color: '#22C55E',
    fontSize: 14,
  },
  accountMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 50,
  },
  accountMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: '#6B7280',
  },
  accountMenuTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 32,
  },
  accountMenuScroll: {
    flex: 1,
  },
  accountMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  accountMenuItemText: {
    fontSize: 18,
    color: '#374151',
  },
  expandIcon: {
    fontSize: 28,
    color: '#9CA3AF',
  },
  subMenuContainer: {
    backgroundColor: '#F9FAFB',
  },
  subMenuItem: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  subMenuText: {
    fontSize: 16,
    color: '#6B7280',
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  logoutButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProfileMenuPage;
