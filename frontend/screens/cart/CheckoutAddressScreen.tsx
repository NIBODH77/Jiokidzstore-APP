import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const MOCK_ADDRESSES = [
  {
    id: '2',
    type: 'Office',
    name: 'Rahul Sharma',
    address: 'Tech Park, Building C, Floor 5',
    city: 'Mumbai, Maharashtra 400051',
    phone: '+91 9876543210',
    isDefault: false,
  },
];

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ['Address', 'Payment', 'Review'];
  
  return (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View style={[
            styles.stepCircle,
            index < currentStep && styles.stepCompleted,
            index === currentStep && styles.stepActive,
          ]}>
            {index < currentStep ? (
              <Feather name="check" size={14} color="#FFFFFF" />
            ) : (
              <ThemedText style={[
                styles.stepNumber,
                (index === currentStep || index < currentStep) && styles.stepNumberActive
              ]}>
                {index + 1}
              </ThemedText>
            )}
          </View>
          <ThemedText style={[
            styles.stepLabel,
            index === currentStep && styles.stepLabelActive
          ]}>
            {step}
          </ThemedText>
          {index < steps.length - 1 && (
            <View style={[
              styles.stepLine,
              index < currentStep && styles.stepLineCompleted
            ]} />
          )}
        </View>
      ))}
    </View>
  );
}

export default function CheckoutAddressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedAddress, setSelectedAddress] = useState('2');

  const handleDeliverHere = () => {
    navigation.navigate('CheckoutPayment');
  };

  const handleAddAddress = () => {
    navigation.navigate('AddEditAddress');
  };

  return (
    <View style={styles.container}>
      <ScreenScrollView contentContainerStyle={styles.scrollContent}>
        <StepIndicator currentStep={0} />
        
        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Select Delivery Address</ThemedText>
          
          <Pressable style={styles.addCard} onPress={handleAddAddress}>
            <View style={styles.addIconContainer}>
              <Feather name="plus" size={20} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.addText}>Add New Address</ThemedText>
          </Pressable>
          
          {MOCK_ADDRESSES.map((addr) => (
            <Pressable
              key={addr.id}
              style={[
                styles.addressCard,
                selectedAddress === addr.id && styles.addressCardSelected
              ]}
              onPress={() => setSelectedAddress(addr.id)}
            >
              <View style={styles.addressHeader}>
                <View style={styles.addressTypeRow}>
                  <View style={[
                    styles.radio,
                    selectedAddress === addr.id && styles.radioSelected
                  ]}>
                    {selectedAddress === addr.id && <View style={styles.radioDot} />}
                  </View>
                  <View style={styles.typeBadge}>
                    <Feather 
                      name={addr.type === 'Home' ? 'home' : 'briefcase'} 
                      size={12} 
                      color={Colors.light.primary} 
                    />
                    <ThemedText style={styles.typeText}>{addr.type}</ThemedText>
                  </View>
                  {addr.isDefault && (
                    <View style={styles.defaultBadge}>
                      <ThemedText style={styles.defaultText}>Default</ThemedText>
                    </View>
                  )}
                </View>
              </View>
              
              <View style={styles.addressDetails}>
                <ThemedText style={styles.addressName}>{addr.name}</ThemedText>
                <ThemedText style={styles.addressText}>{addr.address}</ThemedText>
                <ThemedText style={styles.addressText}>{addr.city}</ThemedText>
                <View style={styles.phoneRow}>
                  <Feather name="phone" size={12} color="#6B7280" />
                  <ThemedText style={styles.phoneText}>{addr.phone}</ThemedText>
                </View>
              </View>
              
              <View style={styles.addressActions}>
                <Pressable style={styles.actionButton}>
                  <Feather name="edit-2" size={14} color={Colors.light.primary} />
                  <ThemedText style={styles.actionTextPrimary}>Edit</ThemedText>
                </Pressable>
                <Pressable style={styles.actionButton}>
                  <Feather name="trash-2" size={14} color="#9CA3AF" />
                  <ThemedText style={styles.actionTextSecondary}>Delete</ThemedText>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScreenScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.deliverButton} onPress={handleDeliverHere}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.deliverGradient}
          >
            <ThemedText style={styles.deliverButtonText}>Deliver to this Address</ThemedText>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundDefault,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCompleted: {
    backgroundColor: Colors.light.success,
  },
  stepActive: {
    backgroundColor: Colors.light.primary,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginLeft: 6,
  },
  stepLabelActive: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  stepLineCompleted: {
    backgroundColor: Colors.light.success,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    borderStyle: 'dashed',
    backgroundColor: '#FFF5F0',
    marginBottom: 16,
  },
  addIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addText: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  addressCardSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: '#FFF5F0',
  },
  addressHeader: {
    marginBottom: 12,
  },
  addressTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.light.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  defaultBadge: {
    backgroundColor: Colors.light.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  addressDetails: {
    paddingLeft: 30,
  },
  addressName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  phoneText: {
    color: '#6B7280',
    fontSize: 13,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 12,
    paddingLeft: 30,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionTextPrimary: {
    color: Colors.light.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  actionTextSecondary: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  deliverButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  deliverGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  deliverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
