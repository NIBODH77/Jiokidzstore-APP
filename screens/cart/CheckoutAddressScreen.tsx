import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function CheckoutAddressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleDeliverHere = () => {
    navigation.navigate('CheckoutPayment');
  };

  const handleAddAddress = () => {
    navigation.navigate('AddEditAddress');
  };

  return (
    <ScreenScrollView>
      <View style={[styles.container, { marginTop: 20 }]}>
        <ThemedText style={styles.pageTitle}>Select Delivery Address</ThemedText>
        
        <Pressable style={styles.addCard} onPress={handleAddAddress}>
          <View style={styles.addIconContainer}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.addText}>Add New Address</ThemedText>
        </Pressable>
        
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <ThemedText style={styles.addressName}>Home</ThemedText>
            <View style={styles.defaultBadge}>
              <ThemedText style={styles.defaultText}>Default</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.addressText}>
            123 Main Street{'\n'}Mumbai, Maharashtra 400001{'\n'}India
          </ThemedText>
          <View style={styles.phoneRow}>
            <Feather name="phone" size={14} color="#6B7280" />
            <ThemedText style={styles.phoneText}>+91 9876543210</ThemedText>
          </View>
          <View style={styles.addressActions}>
            <Pressable style={styles.editButton}>
              <Feather name="edit-2" size={16} color="#FF6B35" />
              <ThemedText style={styles.editText}>Edit</ThemedText>
            </Pressable>
            <Pressable style={styles.deleteButton}>
              <Feather name="trash-2" size={16} color="#6B7280" />
              <ThemedText style={styles.deleteText}>Delete</ThemedText>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Pressable style={styles.deliverButton} onPress={handleDeliverHere}>
            <ThemedText style={styles.deliverButtonText}>Deliver Here</ThemedText>
          </Pressable>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F0',
    marginBottom: 20,
    justifyContent: 'center',
  },
  addIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addText: { 
    color: '#FF6B35', 
    fontWeight: '600',
    fontSize: 16,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressName: { 
    fontWeight: '700',
    fontSize: 16,
    color: '#1F2937',
  },
  defaultBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  addressText: { 
    marginBottom: 12,
    lineHeight: 22,
    color: '#4B5563',
    fontSize: 14,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  phoneText: {
    color: '#6B7280',
    fontSize: 14,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 12,
  },
  deliverButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliverButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
