import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing, interpolate } from 'react-native-reanimated';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function OrderTrackingScreen() {
  const pulseAnim = useSharedValue(0);

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const steps = [
    { 
      title: 'Order Placed', 
      date: 'Jan 15, 2:30 PM', 
      completed: true,
      icon: 'check-circle',
      description: 'Your order has been placed successfully'
    },
    { 
      title: 'Order Confirmed', 
      date: 'Jan 15, 3:00 PM', 
      completed: true,
      icon: 'clipboard',
      description: 'Seller has confirmed your order'
    },
    { 
      title: 'Shipped', 
      date: 'Jan 16, 10:00 AM', 
      completed: true,
      icon: 'box',
      description: 'Your package has been shipped'
    },
    { 
      title: 'Out for Delivery', 
      date: 'Jan 18, 9:00 AM', 
      completed: true,
      icon: 'truck',
      description: 'Package is on its way to you'
    },
    { 
      title: 'Delivered', 
      date: 'Today, Expected 6:00 PM', 
      completed: false,
      icon: 'home',
      description: 'Will be delivered soon'
    },
  ];

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnim.value, [0, 1], [0.95, 1.05]);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <ScreenScrollView contentContainerStyle={{ paddingTop: Spacing.lg, paddingBottom: Spacing.xl }}>
      <View style={styles.container}>
        {/* Order Header Card */}
        <LinearGradient
          colors={['#FFB6D9', '#FF6B9D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerCard}
        >
          <View style={styles.headerContent}>
            <ThemedText style={styles.orderId}>Order #12345</ThemedText>
            <ThemedText style={styles.orderDate}>Placed on January 15, 2025</ThemedText>
            
            <View style={styles.deliveryInfo}>
              <Feather name="calendar" size={16} color="#FFFFFF" />
              <ThemedText style={styles.deliveryText}>Estimated delivery: Today, 6:00 PM</ThemedText>
            </View>
          </View>
        </LinearGradient>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <Feather name="package" size={20} color={Colors.light.primary} />
              </View>
              <ThemedText type="caption">2 Items</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <Feather name="map-pin" size={20} color={Colors.light.primary} />
              </View>
              <ThemedText type="caption">Mumbai</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <Feather name="credit-card" size={20} color={Colors.light.primary} />
              </View>
              <ThemedText type="caption">₹1,398</ThemedText>
            </View>
          </View>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.timelineSection}>
          <ThemedText style={styles.timelineTitle}>Tracking Status</ThemedText>
          
          <View style={styles.timeline}>
            {steps.map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepIndicator}>
                  <View style={[styles.dot, step.completed && styles.dotCompleted]}>
                    {step.completed ? (
                      <Feather name="check" size={16} color="#FFFFFF" />
                    ) : (
                      <Animated.View style={[styles.activePulse, pulseStyle]} />
                    )}
                  </View>
                  {index < steps.length - 1 && (
                    <View style={[styles.line, step.completed && styles.lineCompleted]} />
                  )}
                </View>
                
                <View style={styles.stepContent}>
                  <View style={styles.stepHeader}>
                    <ThemedText style={[styles.stepTitle, step.completed && styles.stepTitleCompleted]}>
                      {step.title}
                    </ThemedText>
                    <View style={[styles.stepBadge, step.completed ? styles.completedBadge : styles.pendingBadge]}>
                      <ThemedText style={styles.stepBadgeText}>
                        {step.completed ? 'Done' : 'In Progress'}
                      </ThemedText>
                    </View>
                  </View>
                  
                  <ThemedText type="caption" style={styles.stepDescription}>
                    {step.description}
                  </ThemedText>
                  
                  {step.date && (
                    <ThemedText type="caption" style={styles.stepDate}>
                      📅 {step.date}
                    </ThemedText>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Contact & Support Section */}
        <View style={styles.supportSection}>
          <ThemedText style={styles.supportTitle}>Need Help?</ThemedText>
          
          <View style={styles.supportButtonsContainer}>
            <Pressable style={styles.supportButton}>
              <Feather name="phone" size={18} color={Colors.light.primary} />
              <ThemedText style={styles.supportButtonText}>Call Support</ThemedText>
            </Pressable>
            
            <Pressable style={styles.supportButton}>
              <Feather name="message-circle" size={18} color={Colors.light.primary} />
              <ThemedText style={styles.supportButtonText}>Chat with Us</ThemedText>
            </Pressable>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Feather name="map-pin" size={20} color={Colors.light.primary} />
            <ThemedText style={styles.addressTitle}>Delivery Address</ThemedText>
          </View>
          
          <ThemedText style={styles.addressText}>
            123 Main Street, Apt 4B{'\n'}
            Mumbai, Maharashtra 400001{'\n'}
            India
          </ThemedText>
          
          <ThemedText type="caption" style={styles.addressPhone}>
            📱 +91 9876543210
          </ThemedText>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  headerCard: {
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.medium,
  },
  headerContent: {
    gap: Spacing.md,
  },
  orderId: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  orderDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Poppins',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  deliveryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: Colors.light.backgroundRoot,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.small,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.light.border,
  },
  timelineSection: {
    marginBottom: Spacing.xl,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.lg,
    fontFamily: 'Poppins',
  },
  timeline: {},
  step: { 
    flexDirection: 'row', 
    marginBottom: Spacing.xl,
  },
  stepIndicator: { 
    alignItems: 'center', 
    marginRight: Spacing.lg,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dotCompleted: { 
    backgroundColor: Colors.light.primary, 
    borderColor: Colors.light.primary,
  },
  activePulse: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.primary,
  },
  line: { 
    width: 2, 
    height: 60, 
    backgroundColor: Colors.light.border, 
    marginTop: 4,
  },
  lineCompleted: { 
    backgroundColor: Colors.light.primary,
  },
  stepContent: { 
    flex: 1, 
    paddingTop: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  stepTitle: { 
    fontWeight: '600', 
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  stepTitleCompleted: { 
    color: Colors.light.primary,
  },
  stepBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 107, 157, 0.1)',
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  stepDescription: { 
    color: Colors.light.textGray,
    marginBottom: Spacing.xs,
    fontSize: 12,
  },
  stepDate: { 
    color: Colors.light.primary,
    fontWeight: '500',
  },
  supportSection: {
    backgroundColor: Colors.light.backgroundRoot,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.small,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: Spacing.lg,
    fontFamily: 'Poppins',
  },
  supportButtonsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  supportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  supportButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  addressCard: {
    backgroundColor: Colors.light.backgroundRoot,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    ...Shadows.small,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
    fontFamily: 'Poppins',
  },
  addressText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 22,
    marginBottom: Spacing.sm,
    fontFamily: 'Poppins',
  },
  addressPhone: {
    color: Colors.light.textGray,
  },
});
