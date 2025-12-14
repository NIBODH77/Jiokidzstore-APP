
import React, { useState } from 'react';
import { View, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/theme';

interface EnterPincodeModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (pincode: string) => void;
}

export function EnterPincodeModal({ visible, onClose, onApply }: EnterPincodeModalProps) {
  const [pincode, setPincode] = useState('');

  const handleApply = () => {
    if (pincode.length === 6) {
      onApply(pincode);
      setPincode('');
    }
  };

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
            <Pressable onPress={onClose} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#333" />
            </Pressable>
            <ThemedText style={styles.headerTitle}>Enter a pincode</ThemedText>
            <View style={styles.placeholder} />
          </View>

          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter 6-digit pincode"
            placeholderTextColor="#999"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="number-pad"
            maxLength={6}
          />

          {/* Apply Button */}
          <Pressable 
            style={[
              styles.applyButton,
              pincode.length !== 6 && styles.applyButtonDisabled
            ]} 
            onPress={handleApply}
            disabled={pincode.length !== 6}
          >
            <ThemedText style={styles.applyButtonText}>APPLY</ThemedText>
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
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: 16,
    marginBottom: Spacing.xl,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: '#FFB399',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
