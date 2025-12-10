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
      <ThemedText style={styles.heading}>— Add New Address</ThemedText>
      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your Name"
          placeholderTextColor="#999"
        />
      </View>
      
      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={flatNo}
          onChangeText={setFlatNo}
          placeholder="Flat No.House/Building"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={street}
          onChangeText={setStreet}
          placeholder="Street Adress/Colony"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={landmark}
          onChangeText={setLandmark}
          placeholder="Landmark"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={pincode}
          onChangeText={setPincode}
          placeholder="Pincode"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={city}
          onChangeText={setCity}
          placeholder="City"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.field}>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
          value={state}
          onChangeText={setState}
          placeholder="State"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.codeField}>
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
            value="+91"
            editable={false}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.flexField}>
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
            value={mobileNo}
            onChangeText={setMobileNo}
            placeholder="Mobile No."
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.codeField}>
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
            value="+91"
            editable={false}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.smallField}>
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
            value={stdCode}
            onChangeText={setStdCode}
            placeholder="STD Code"
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.flexField}>
          <TextInput
            style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundDefault }]}
            value={landline}
            onChangeText={setLandline}
            placeholder="Landline No."
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.addressTypeContainer}>
        <ThemedText style={styles.addressTypeLabel}>Address Type:</ThemedText>
        <View style={styles.radioGroup}>
          <Pressable 
            style={styles.radioOption} 
            onPress={() => setAddressType('home')}
          >
            <View style={styles.radioCircle}>
              {addressType === 'home' && <View style={styles.radioCircleSelected} />}
            </View>
            <ThemedText style={styles.radioLabel}>Home</ThemedText>
          </Pressable>
          <Pressable 
            style={styles.radioOption} 
            onPress={() => setAddressType('office')}
          >
            <View style={styles.radioCircle}>
              {addressType === 'office' && <View style={styles.radioCircleSelected} />}
            </View>
            <ThemedText style={styles.radioLabel}>Office</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <Button title="CANCEL" onPress={handleCancel} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="SAVE" onPress={handleSave} />
        </View>
      </View>
    </ScreenKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg, paddingTop: Spacing.xl },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: Spacing.lg,
  },
  field: { marginBottom: Spacing.md },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingHorizontal: 0,
    fontSize: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  codeField: {
    width: 60,
  },
  smallField: {
    flex: 0.4,
  },
  flexField: {
    flex: 1,
  },
  addressTypeContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  addressTypeLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: Spacing.md,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B35',
  },
  radioLabel: {
    fontSize: 15,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  buttonWrapper: {
    flex: 1,
  },
});
