import React from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const jiokidzLogo = require('../attached_assets/generated_images/jiokidz_colorful_app_logo.png');

interface TopHeaderProps {
  showBackButton?: boolean;
  onCartPress?: () => void;
  cartCount?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export function TopHeader({ showBackButton = false, onCartPress, cartCount = 0 }: TopHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <Pressable 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Feather name="chevron-left" size={28} color="#333" />
            </Pressable>
          )}
        </View>

        {/* Center Logo */}
        <Image
          source={jiokidzLogo}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Right Section */}
        <View style={styles.rightSection}>
          <Pressable style={styles.iconButton}>
            <Feather name="search" size={24} color="#333" />
          </Pressable>
          
          <Pressable style={styles.iconButton}>
            <Feather name="user" size={24} color="#333" />
          </Pressable>
          
          <Pressable style={styles.iconButton}>
            <Feather name="bell" size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <Feather name="bell" size={12} color="#FF6B35" />
            </View>
          </Pressable>
          
          <Pressable style={styles.iconButton}>
            <Feather name="heart" size={24} color="#333" />
            <View style={styles.badge}>
              <Feather name="heart" size={10} color="#FF6B35" />
            </View>
          </Pressable>
          
          <Pressable 
            onPress={onCartPress}
            style={styles.cartButton}
          >
            <Feather name="shopping-cart" size={24} color="#333" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Feather name="shopping-cart" size={10} color="#FFFFFF" />
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSection: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    marginHorizontal: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    backgroundColor: '#FFF3E0',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#FFE5D5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
