import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function SavedAddressesScreen() {
  return (
    <ScreenScrollView contentContainerStyle={{ paddingTop: Spacing.lg, paddingBottom: Spacing.xl }}>
      <View style={[styles.container, { paddingTop: Spacing.lg }]}>
        <View style={styles.addButton}>
          <Button onPress={() => {}}>
            <Feather name="plus" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            Add New Address
          </Button>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <View style={styles.addressType}>
              <ThemedText style={styles.addressTypeText}>Home</ThemedText>
            </View>
            <Pressable>
              <Feather name="edit-2" size={20} color={Colors.light.primary} />
            </Pressable>
          </View>
          <ThemedText style={styles.addressText}>
            123 Main Street{'\n'}Mumbai, Maharashtra 400001{'\n'}India
          </ThemedText>
          <ThemedText type="caption">+91 9876543210</ThemedText>
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.lg },
  addButton: { marginBottom: Spacing.xl },
  addressCard: {
    backgroundColor: Colors.light.backgroundRoot,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    ...Shadows.small,
  },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  addressType: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addressTypeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  addressText: { marginBottom: Spacing.sm, lineHeight: 20 },
});
