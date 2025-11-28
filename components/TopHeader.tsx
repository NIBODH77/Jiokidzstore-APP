import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { selectCartTotalItems } from '@/store/cartSlice';

const jiokidzLogo = require('../attached_assets/generated_images/jiokidz_colorful_app_logo.png');

interface TopHeaderProps {
  showBackButton?: boolean;
}

export function TopHeader({ showBackButton = false }: TopHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const cartCount = useSelector((state: RootState) => selectCartTotalItems(state.cart));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Left - Back Button */}
        <View style={styles.leftSection}>
          {showBackButton ? (
            <Pressable 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={10}
            >
              <Feather name="chevron-left" size={32} color="#1F2937" strokeWidth={2.5} />
            </Pressable>
          ) : (
            <View style={styles.leftPlaceholder} />
          )}
        </View>

        {/* Center - Logo */}
        <Image
          source={jiokidzLogo}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Right - Notification & Cart */}
        <View style={styles.rightSection}>
          <Pressable style={styles.iconButton} hitSlop={8}>
            <Feather name="bell" size={28} color="#1F2937" strokeWidth={1.8} />
            <View style={styles.notificationBadge}>
              <View style={styles.badgeDot} />
            </View>
          </Pressable>
          
          <Pressable style={styles.cartButton} hitSlop={8}>
            <Feather name="shopping-cart" size={28} color="#1F2937" strokeWidth={1.8} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <View style={styles.cartCount}>
                  <Feather name="shopping-cart" size={11} color="#FFFFFF" strokeWidth={2} />
                </View>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftPlaceholder: {
    width: 48,
    height: 48,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    flex: 1,
    width: 140,
    height: 50,
    marginHorizontal: 8,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
  },
  cartButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
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
