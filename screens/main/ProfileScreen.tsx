import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Text,
  Image,
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
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

const shoppingItems = [
  { icon: '👤', title: 'Account' },
  { icon: '📦', title: 'Order History' },
  { icon: '🚚', title: 'Track order' },
  { icon: '💰', title: 'Cash Refund' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'profile' | 'menu'>('profile');

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
        {shoppingItems.map((item, index) => (
          <Pressable key={index} style={styles.shoppingCard}>
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
        {['20% OFF', '48% OFF', '25% OFF'].map((offer, index) => (
          <View key={index} style={styles.recentlyViewedCard}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerBadgeText}>{offer}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const MenuContent = () => (
    <View style={styles.menuContentContainer}>
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: item.bg }]}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 70 }]}>
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
    </View>
  );
}

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
  recentlyViewedCard: {
    width: 160,
    height: 192,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
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
    fontSize: 12,
    fontWeight: '700',
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
});
