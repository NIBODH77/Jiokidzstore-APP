
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface RouteParams {
  orderNumber: string;
}

interface TrackingStep {
  title: string;
  description: string;
  date: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export default function TrackOrderScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { orderNumber } = route.params;
  const insets = useSafeAreaInsets();

  const trackingSteps: TrackingStep[] = [
    {
      title: 'Order Placed',
      description: 'Your order has been placed successfully',
      date: '15 Nov 2024',
      time: '10:30 AM',
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Order Confirmed',
      description: 'Your order has been confirmed',
      date: '15 Nov 2024',
      time: '11:45 AM',
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Shipped',
      description: 'Your order has been shipped',
      date: '16 Nov 2024',
      time: '09:15 AM',
      isCompleted: true,
      isCurrent: false,
    },
    {
      title: 'Out for Delivery',
      description: 'Your order is out for delivery',
      date: '18 Nov 2024',
      time: '08:00 AM',
      isCompleted: false,
      isCurrent: true,
    },
    {
      title: 'Delivered',
      description: 'Your order will be delivered soon',
      date: 'Expected Today',
      time: 'By 6:00 PM',
      isCompleted: false,
      isCurrent: false,
    },
  ];

  const deliveryPartner = {
    name: 'Delhivery',
    trackingId: 'DELV123456789',
    phone: '+91 1800-123-4567',
    deliveryBoy: 'Rahul Kumar',
    deliveryPhone: '+91 9876543210',
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
      >
        {/* Order Info Card */}
        <View style={styles.orderInfoCard}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderLabel}>Order Number</Text>
            <Text style={styles.orderValue}>{orderNumber}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderLabel}>Tracking ID</Text>
            <Text style={styles.orderValue}>{deliveryPartner.trackingId}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderLabel}>Delivery Partner</Text>
            <Text style={styles.orderValue}>{deliveryPartner.name}</Text>
          </View>
        </View>

        {/* Current Status Card */}
        <View style={styles.currentStatusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="rocket" size={32} color="#FF6B00" />
          </View>
          <Text style={styles.currentStatusTitle}>
            {trackingSteps.find(s => s.isCurrent)?.title}
          </Text>
          <Text style={styles.currentStatusDesc}>
            {trackingSteps.find(s => s.isCurrent)?.description}
          </Text>
          <Text style={styles.expectedDelivery}>
            Expected Delivery: <Text style={styles.expectedDeliveryTime}>Today by 6:00 PM</Text>
          </Text>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>Order Timeline</Text>
          {trackingSteps.map((step, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* Timeline Line */}
              {index !== trackingSteps.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    step.isCompleted && styles.timelineLineCompleted,
                  ]}
                />
              )}

              {/* Timeline Dot */}
              <View
                style={[
                  styles.timelineDot,
                  step.isCompleted && styles.timelineDotCompleted,
                  step.isCurrent && styles.timelineDotCurrent,
                ]}
              >
                {step.isCompleted ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : step.isCurrent ? (
                  <View style={styles.currentDotInner} />
                ) : (
                  <View style={styles.pendingDotInner} />
                )}
              </View>

              {/* Timeline Content */}
              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineStepTitle,
                    step.isCurrent && styles.timelineStepTitleCurrent,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.timelineStepDesc}>{step.description}</Text>
                <Text style={styles.timelineStepTime}>
                  {step.date} • {step.time}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Partner Details */}
        <View style={styles.deliveryPartnerCard}>
          <Text style={styles.deliveryPartnerTitle}>Delivery Partner Details</Text>
          <View style={styles.deliveryPartnerInfo}>
            <View style={styles.deliveryPartnerRow}>
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <Text style={styles.deliveryPartnerText}>{deliveryPartner.deliveryBoy}</Text>
            </View>
            <View style={styles.deliveryPartnerRow}>
              <Ionicons name="call-outline" size={20} color="#6B7280" />
              <Text style={styles.deliveryPartnerText}>{deliveryPartner.deliveryPhone}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 0,
  },
  scrollView: {
    flex: 1,
  },
  orderInfoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  currentStatusCard: {
    backgroundColor: '#FFF7ED',
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FDBA74',
  },
  statusIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  currentStatusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  currentStatusDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  expectedDelivery: {
    fontSize: 14,
    color: '#6B7280',
  },
  expectedDeliveryTime: {
    fontWeight: '700',
    color: '#FF6B00',
  },
  timelineSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    paddingBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 32,
    bottom: 0,
    width: 2,
    backgroundColor: '#E5E7EB',
  },
  timelineLineCompleted: {
    backgroundColor: '#22C55E',
  },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  timelineDotCompleted: {
    backgroundColor: '#22C55E',
  },
  timelineDotCurrent: {
    backgroundColor: '#FF6B00',
  },
  currentDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  pendingDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9CA3AF',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineStepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  timelineStepTitleCurrent: {
    color: '#FF6B00',
    fontWeight: '700',
  },
  timelineStepDesc: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  timelineStepTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  deliveryPartnerCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  deliveryPartnerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  deliveryPartnerInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  deliveryPartnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryPartnerText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
});
