import React from 'react';
import { View, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { selectCartTotalItems } from '@/store/cartSlice';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

const jiokidzLogo = require('../attached_assets/generated_images/jiokidz_logo_final.png');

interface TopHeaderProps extends Partial<NativeStackHeaderProps> {
  showBackButton?: boolean;
  hideRightIcons?: boolean;
  hideSearchIcon?: boolean;
  hideWishlistIcon?: boolean;
  hideNotificationIcon?: boolean;
  hideProfileIcon?: boolean;
  hideCartIcon?: boolean;
}

export function TopHeader({ 
  showBackButton = false, 
  hideRightIcons = false,
  hideSearchIcon = false,
  hideWishlistIcon = false,
  hideNotificationIcon = false,
  hideProfileIcon = false,
  hideCartIcon = false,
  ...nativeProps
}: TopHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const cartCount = useSelector((state: RootState) => selectCartTotalItems(state.cart));

  const headerStyle = Platform.OS === 'web' 
    ? [styles.container, { paddingTop: insets.top }]
    : [styles.container, { paddingTop: insets.top }, nativeProps.options?.headerStyle];

  return (
    <View style={[headerStyle, styles.fixedContainer]}>
      <View style={styles.content}>
        {/* Left - Back Button & Logo */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <Pressable 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={10}
            >
              <Feather name="chevron-left" size={32} color="#1F2937" strokeWidth={2.5} />
            </Pressable>
          )}
          <Image
            source={jiokidzLogo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Center - Spacer */}
        <View style={{ flex: 1 }} />

        {/* Right - Search, Wishlist, Notification, Profile & Cart */}
        {!hideRightIcons && (
          <View style={styles.rightSection}>
            {!hideSearchIcon && (
              <Pressable 
                style={styles.iconButton} 
                hitSlop={8}
                onPress={() => navigation.navigate('Search' as never)}
              >
                <Feather name="search" size={24} color="#1F2937" strokeWidth={1} />
              </Pressable>
            )}

            {!hideWishlistIcon && (
              <Pressable 
                style={styles.iconButton} 
                hitSlop={8}
                onPress={() => navigation.navigate('Wishlist' as never)}
              >
                <Feather name="heart" size={24} color="#1F2937" strokeWidth={1} />
              </Pressable>
            )}

            {!hideNotificationIcon && (
              <Pressable 
                style={styles.iconButton} 
                hitSlop={8}
                onPress={() => navigation.navigate('Notifications' as never)}
              >
                <Feather name="bell" size={24} color="#1F2937" strokeWidth={1} />
                <View style={styles.notificationBadge}>
                  <View style={styles.badgeDot} />
                </View>
              </Pressable>
            )}

            {!hideProfileIcon && (
              <Pressable 
                style={styles.iconButton} 
                hitSlop={8}
                onPress={() => navigation.navigate('Profile' as never)}
              >
                <Feather name="user" size={24} color="#1F2937" strokeWidth={1} />
              </Pressable>
            )}
            
            {!hideCartIcon && (
              <Pressable 
                style={styles.cartButton} 
                hitSlop={8}
                onPress={() => navigation.navigate('Cart' as never)}
              >
                <Feather name="shopping-cart" size={24} color="#1F2937" strokeWidth={1} />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <View style={styles.cartCount}>
                      <Feather name="shopping-cart" size={11} color="#FFFFFF" strokeWidth={2} />
                    </View>
                  </View>
                )}
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 70,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  logo: {
    width: 100,
    height: 45,
    marginLeft: 0,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    backgroundColor: '#FFE5D5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  cartCount: {
    width: 24,
    height: 24,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
  },
});
