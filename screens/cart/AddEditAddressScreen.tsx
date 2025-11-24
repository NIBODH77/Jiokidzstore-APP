import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useTheme } from '@/hooks/useTheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function AddEditAddressScreen() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  return (
    <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.field}>
        <ThemedText type="small" style={styles.label}>Full Name</ThemedText>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
        />
      </View>
      <View style={styles.field}>
        <ThemedText type="small" style={styles.label}>Phone Number</ThemedText>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.field}>
        <ThemedText type="small" style={styles.label}>Address</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter complete address"
          multiline
          numberOfLines={3}
        />
      </View>
      <View style={styles.field}>
        <ThemedText type="small" style={styles.label}>Pincode</ThemedText>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={pincode}
          onChangeText={setPincode}
          placeholder="Enter pincode"
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>
      <Button>Save Address</Button>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg },
  field: { marginBottom: Spacing.lg },
  label: { marginBottom: Spacing.sm, fontWeight: '600' },
  input: {
    height: Spacing.inputHeight,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.body.fontSize,
  },
  textArea: { height: 80, paddingTop: Spacing.md },
});
