import React from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface ModernHeaderProps {
  onNotificationPress?: () => void;
  notificationCount?: number;
}

export function ModernHeader({ onNotificationPress, notificationCount = 0 }: ModernHeaderProps) {
  return (
    <LinearGradient
      colors={['#FFD4A3', '#FFF3E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Left Section - Location + Logo */}
        <View style={styles.leftSection}>
          {/* Location */}
          <Pressable style={styles.iconButton}>
            <Feather name="map-pin" size={20} color={Colors.light.text} />
          </Pressable>
          {/* CloudKidd Logo */}
          <Text style={styles.logo}>CloudKidd</Text>
        </View>

        {/* Right Icons */}
        <View style={styles.rightSection}>
          {/* Notification */}
          <Pressable style={styles.iconButton} onPress={onNotificationPress}>
            <Feather name="bell" size={20} color={Colors.light.text} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    zIndex: 100,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.light.primary,
    letterSpacing: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  rightSection: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.light.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
