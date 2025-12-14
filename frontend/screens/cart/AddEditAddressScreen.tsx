import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenKeyboardAwareScrollView } from '@/components/ScreenKeyboardAwareScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { useTheme } from '@/hooks/useTheme';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export default function AddEditAddressScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [stdCode, setStdCode] = useState('');
  const [landline, setLandline] = useState('');
  const [addressType, setAddressType] = useState<'home' | 'office'>('home');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // TODO: Save address logic here
    console.log('Saving address...');
    navigation.goBack();
  };

  return (
    <ScreenKeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.heading}>Add New Address</ThemedText>
      <View style={styles.field}>
        <ThemedText style={styles.label}>Full Name *</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your Name"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      
      <View style={styles.field}>
        <ThemedText style={styles.label}>Flat No. / House / Building *</ThemedText>
        <TextInput
          style={styles.input}
          value={flatNo}
          onChangeText={setFlatNo}
          placeholder="e.g., A-101"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>Street Address / Colony *</ThemedText>
        <TextInput
          style={styles.input}
          value={street}
          onChangeText={setStreet}
          placeholder="e.g., MG Road"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>Landmark (Optional)</ThemedText>
        <TextInput
          style={styles.input}
          value={landmark}
          onChangeText={setLandmark}
          placeholder="e.g., Near City Mall"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>Pincode *</ThemedText>
        <TextInput
          style={styles.input}
          value={pincode}
          onChangeText={setPincode}
          placeholder="e.g., 400001"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>City *</ThemedText>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="e.g., Mumbai"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>State *</ThemedText>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={setState}
          placeholder="e.g., Maharashtra"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>Mobile Number *</ThemedText>
        <View style={styles.row}>
          <View style={styles.codeField}>
            <TextInput
              style={styles.input}
              value="+91"
              editable={false}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.flexField}>
            <TextInput
              style={styles.input}
              value={mobileNo}
              onChangeText={setMobileNo}
              placeholder="9876543210"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      <View style={styles.field}>
        <ThemedText style={styles.label}>Landline (Optional)</ThemedText>
        <View style={styles.row}>
          <View style={styles.codeField}>
            <TextInput
              style={styles.input}
              value="+91"
              editable={false}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.smallField}>
            <TextInput
              style={styles.input}
              value={stdCode}
              onChangeText={setStdCode}
              placeholder="022"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.flexField}>
            <TextInput
              style={styles.input}
              value={landline}
              onChangeText={setLandline}
              placeholder="12345678"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      <View style={styles.addressTypeContainer}>
        <ThemedText style={styles.addressTypeLabel}>Address Type *</ThemedText>
        <View style={styles.radioGroup}>
          <Pressable 
            style={[styles.radioOption, addressType === 'home' && styles.radioOptionSelected]} 
            onPress={() => setAddressType('home')}
          >
            <View style={[styles.radioCircle, addressType === 'home' && styles.radioCircleActive]}>
              {addressType === 'home' && <View style={styles.radioCircleSelected} />}
            </View>
            <ThemedText style={[styles.radioLabel, addressType === 'home' && styles.radioLabelActive]}>Home</ThemedText>
          </Pressable>
          <Pressable 
            style={[styles.radioOption, addressType === 'office' && styles.radioOptionSelected]} 
            onPress={() => setAddressType('office')}
          >
            <View style={[styles.radioCircle, addressType === 'office' && styles.radioCircleActive]}>
              {addressType === 'office' && <View style={styles.radioCircleSelected} />}
            </View>
            <ThemedText style={[styles.radioLabel, addressType === 'office' && styles.radioLabelActive]}>Office</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <ThemedText style={styles.cancelButtonText}>CANCEL</ThemedText>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <ThemedText style={styles.saveButtonText}>SAVE ADDRESS</ThemedText>
        </Pressable>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
  },
  field: { 
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  codeField: {
    width: 70,
  },
  smallField: {
    flex: 0.35,
  },
  flexField: {
    flex: 1,
  },
  addressTypeContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  addressTypeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 12,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  radioOptionSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FFF5F0',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: '#FF6B35',
  },
  radioCircleSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B35',
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  radioLabelActive: {
    color: '#FF6B35',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '700',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
