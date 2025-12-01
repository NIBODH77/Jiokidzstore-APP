
import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/theme';

interface ChooseLocationModalProps {
  visible: boolean;
  onClose: () => void;
  onManageAddress: () => void;
  onPincodeEnter: () => void;
  onCurrentLocation: () => void;
}

export function ChooseLocationModal({ 
  visible, 
  onClose, 
  onManageAddress,
  onPincodeEnter,
  onCurrentLocation
}: ChooseLocationModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>Choose your location</ThemedText>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#333" />
            </Pressable>
          </View>

          <ThemedText style={styles.subtitle}>
            Select a delivery location to see product availability and delivery option.
          </ThemedText>

          {/* Manage Address Book */}
          <Pressable style={styles.manageAddressBox} onPress={onManageAddress}>
            <ThemedText style={styles.manageAddressText}>Manage address book</ThemedText>
          </Pressable>

          {/* Enter a Pincode */}
          <Pressable style={styles.optionButton} onPress={onPincodeEnter}>
            <Feather name="map-pin" size={20} color="#1E88E5" />
            <ThemedText style={styles.optionText}>Enter a pincode</ThemedText>
          </Pressable>

          {/* Use Current Location */}
          <Pressable style={styles.optionButton} onPress={onCurrentLocation}>
            <Feather name="navigation" size={20} color="#1E88E5" />
            <ThemedText style={styles.optionText}>Use my current location</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  manageAddressBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    minHeight: 120,
  },
  manageAddressText: {
    fontSize: 16,
    color: '#1E88E5',
    fontWeight: '600',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#1E88E5',
    fontWeight: '500',
  },
});
