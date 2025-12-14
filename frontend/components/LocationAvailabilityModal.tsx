
import React, { useState } from 'react';
import { Modal, StyleSheet, View, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';

interface LocationAvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
}

export function LocationAvailabilityModal({ visible, onClose }: LocationAvailabilityModalProps) {
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleCheckAvailability = () => {
    // Simple validation
    if (pincode.length === 6 && city.trim() && state.trim()) {
      // Simulate availability check - you can replace with actual API call
      setIsAvailable(true);
    }
  };

  const handleClose = () => {
    setPincode('');
    setCity('');
    setState('');
    setIsAvailable(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>Check Availability</ThemedText>
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <Feather name="x" size={24} color="#333" />
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Pincode Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Pincode *</ThemedText>
              <View style={styles.inputWrapper}>
                <Feather name="map-pin" size={18} color="#666666" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit pincode"
                  placeholderTextColor="#999"
                  value={pincode}
                  onChangeText={setPincode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>
            </View>

            {/* City Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>City *</ThemedText>
              <View style={styles.inputWrapper}>
                <Feather name="home" size={18} color="#666666" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter city name"
                  placeholderTextColor="#999"
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </View>

            {/* State Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>State *</ThemedText>
              <View style={styles.inputWrapper}>
                <Feather name="map" size={18} color="#666666" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter state name"
                  placeholderTextColor="#999"
                  value={state}
                  onChangeText={setState}
                />
              </View>
            </View>

            {/* Check Button */}
            <Pressable
              style={[
                styles.checkButton,
                (!pincode || !city || !state || pincode.length !== 6) && styles.checkButtonDisabled
              ]}
              onPress={handleCheckAvailability}
              disabled={!pincode || !city || !state || pincode.length !== 6}
            >
              <ThemedText style={styles.checkButtonText}>Check Availability</ThemedText>
            </Pressable>

            {/* Result */}
            {isAvailable !== null && (
              <View style={[styles.resultBox, isAvailable ? styles.resultSuccess : styles.resultError]}>
                <Feather 
                  name={isAvailable ? "check-circle" : "x-circle"} 
                  size={20} 
                  color={isAvailable ? "#10B981" : "#EF4444"} 
                />
                <ThemedText style={[styles.resultText, isAvailable ? styles.resultTextSuccess : styles.resultTextError]}>
                  {isAvailable 
                    ? "Products available in your area!" 
                    : "Products not available in your area"}
                </ThemedText>
              </View>
            )}
          </View>
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
  },
  checkButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  checkButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    gap: 10,
  },
  resultSuccess: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  resultError: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  resultText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  resultTextSuccess: {
    color: '#065F46',
  },
  resultTextError: {
    color: '#991B1B',
  },
});
