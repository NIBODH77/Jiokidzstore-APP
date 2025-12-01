
import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Spacing } from '@/constants/theme';

interface LocationPermissionModalProps {
  visible: boolean;
  onClose: () => void;
  onTurnOn: () => void;
}

export function LocationPermissionModal({ visible, onClose, onTurnOn }: LocationPermissionModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <ThemedText style={styles.headerTitle}>
            For a better experience, your device will need to use Location Accuracy
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            The following settings should be on:
          </ThemedText>

          {/* Device Location */}
          <View style={styles.settingRow}>
            <Feather name="map-pin" size={24} color="#FFFFFF" />
            <ThemedText style={styles.settingText}>Device location</ThemedText>
          </View>

          {/* Location Accuracy */}
          <View style={styles.settingRow}>
            <Feather name="target" size={24} color="#FFFFFF" />
            <View style={styles.settingTextContainer}>
              <ThemedText style={styles.settingText}>
                Location Accuracy, which provides more accurate location for apps and services. To do this, Google periodically processes information about device sensors and wireless signals from your device to crowdsource wireless signal locations. These are used without identifying you to improve location accuracy and location-based services and to improve, provide and maintain Google's services based on Google's and third parties' legitimate interests to serve users' needs.
              </ThemedText>
            </View>
          </View>

          <ThemedText style={styles.footerText}>
            You can change this at any time in location settings.{' '}
            <ThemedText style={styles.linkText}>Manage settings</ThemedText> or{' '}
            <ThemedText style={styles.linkText}>learn more</ThemedText>
          </ThemedText>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.noButton} onPress={onClose}>
              <ThemedText style={styles.noButtonText}>No, thanks</ThemedText>
            </Pressable>
            <Pressable style={styles.turnOnButton} onPress={onTurnOn}>
              <ThemedText style={styles.turnOnButtonText}>Turn on</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: '#2C3E50',
    borderRadius: 16,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.lg,
    alignItems: 'flex-start',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    flex: 1,
  },
  footerText: {
    fontSize: 13,
    color: '#B0BEC5',
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    lineHeight: 18,
  },
  linkText: {
    color: '#64B5F6',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  noButton: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 12,
    alignItems: 'center',
  },
  noButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  turnOnButton: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#7C8FFF',
    paddingVertical: 12,
    alignItems: 'center',
  },
  turnOnButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
