import React from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { ProfileStackParamList } from '@/navigation/ProfileStackNavigator';

const { height: screenHeight } = Dimensions.get('window');

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  badge?: number;
  danger?: boolean;
}

function MenuItem({ icon, title, onPress, badge, danger }: MenuItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, danger && styles.iconContainerDanger]}>
          <Feather name={icon as any} size={20} color={danger ? Colors.light.error : Colors.light.primary} />
        </View>
        <ThemedText style={[styles.menuItemText, danger && styles.menuItemTextDanger]}>
          {title}
        </ThemedText>
      </View>
      <View style={styles.menuItemRight}>
        {badge !== undefined && badge > 0 && (
          <View style={styles.menuBadge}>
            <ThemedText style={styles.menuBadgeText}>{badge}</ThemedText>
          </View>
        )}
        <Feather name="chevron-right" size={20} color={Colors.light.textGray} />
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  
  // Responsive sizing based on screen height
  const isSmallDevice = screenHeight < 700;
  const avatarSize = isSmallDevice ? 80 : 100;
  const headerPadding = isSmallDevice ? Spacing.lg : Spacing.xxl;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
            <Feather name="user" size={avatarSize * 0.4} color={Colors.light.primary} />
          </View>
        </View>
        <ThemedText type="h2" style={[styles.userName, { fontSize: isSmallDevice ? 18 : 20 }]}>
          {user?.name || 'User'}
        </ThemedText>
        <ThemedText style={[styles.userPhone, { fontSize: isSmallDevice ? 13 : 14 }]}>
          {user?.phone || user?.email || ''}
        </ThemedText>
      </View>

      <ScreenScrollView 
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: 0, paddingHorizontal: 0 }
        ]}
      >
        <View style={styles.section}>
        <MenuItem
          icon="edit-2"
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <MenuItem
          icon="package"
          title="My Orders"
          onPress={() => navigation.navigate('OrderHistory')}
          badge={2}
        />
        <MenuItem
          icon="heart"
          title="My Wishlist"
          onPress={() => navigation.getParent()?.navigate('WishlistTab' as any)}
        />
        <MenuItem
          icon="map-pin"
          title="Saved Addresses"
          onPress={() => navigation.navigate('SavedAddresses')}
        />
        <MenuItem
          icon="bell"
          title="Notifications"
          onPress={() => navigation.navigate('Notifications')}
          badge={5}
        />
      </View>

      <View style={styles.section}>
        <MenuItem
          icon="help-circle"
          title="Help & Support"
          onPress={() => navigation.navigate('HelpSupport')}
        />
        <MenuItem
          icon="settings"
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      <View style={[styles.section, { marginBottom: Spacing.xxl * 2 }]}>
        <MenuItem
          icon="log-out"
          title="Logout"
          onPress={handleLogout}
          danger
        />
      </View>
      </ScreenScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: '#FFE5EE',
  },
  avatarContainer: {
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  avatar: {
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  userName: {
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  userPhone: {
    color: Colors.light.textGray,
    fontSize: 14,
  },
  section: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  iconContainerDanger: {
    backgroundColor: `${Colors.light.error}15`,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  menuItemTextDanger: {
    color: Colors.light.error,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginRight: Spacing.sm,
  },
  menuBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
