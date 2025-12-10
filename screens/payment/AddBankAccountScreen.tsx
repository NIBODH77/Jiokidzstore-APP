
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ORANGE_PRIMARY = '#FF6B00';
const ORANGE_LIGHT = '#FFF3E6';

export default function AddBankAccountScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleGetOtp = () => {
    if (!accountNumber || !ifscCode || !accountHolderName || !bankName || !mobileNumber) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    
    // Validate account number (basic validation)
    if (accountNumber.length < 9 || accountNumber.length > 18) {
      Alert.alert('Error', 'Please enter a valid account number');
      return;
    }
    
    // Validate IFSC code
    if (ifscCode.length !== 11) {
      Alert.alert('Error', 'IFSC code should be 11 characters');
      return;
    }
    
    // Validate mobile number
    if (mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    
    setOtpSent(true);
    setShowOtpSection(true);
    Alert.alert('OTP Sent', `OTP has been sent to ${mobileNumber}`);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    
    // Simulate OTP verification
    Alert.alert(
      'Success',
      'Bank account added successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Bank Account</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color={ORANGE_PRIMARY} />
          <Text style={styles.infoText}>
            Your bank details are encrypted and stored securely
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Bank Account Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Account Holder Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account holder name"
              value={accountHolderName}
              onChangeText={setAccountHolderName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Account Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
              maxLength={18}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>IFSC Code *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter IFSC code"
              value={ifscCode}
              onChangeText={(text) => setIfscCode(text.toUpperCase())}
              autoCapitalize="characters"
              maxLength={11}
            />
            <Text style={styles.inputHint}>Example: SBIN0001234</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Bank Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter bank name"
              value={bankName}
              onChangeText={setBankName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Branch Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter branch name (optional)"
              value={branchName}
              onChangeText={setBranchName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mobile Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={styles.inputHint}>OTP will be sent to this number</Text>
          </View>

          {!showOtpSection && (
            <TouchableOpacity style={styles.getOtpBtn} onPress={handleGetOtp}>
              <Text style={styles.getOtpBtnText}>Get OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        {showOtpSection && (
          <View style={styles.otpCard}>
            <View style={styles.otpHeader}>
              <Ionicons name="lock-closed" size={24} color={ORANGE_PRIMARY} />
              <Text style={styles.otpTitle}>Verify OTP</Text>
            </View>
            <Text style={styles.otpSubtitle}>
              Enter the 6-digit OTP sent to {mobileNumber}
            </Text>
            
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.otpInput]}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>

            <TouchableOpacity style={styles.verifyBtn} onPress={handleVerifyOtp}>
              <Text style={styles.verifyBtnText}>Verify & Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendBtn} onPress={handleGetOtp}>
              <Text style={styles.resendBtnText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Important Information</Text>
          <View style={styles.noteItem}>
            <Ionicons name="information-circle" size={16} color="#666" />
            <Text style={styles.noteText}>
              Account must be in your name for verification
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Ionicons name="shield-checkmark" size={16} color="#666" />
            <Text style={styles.noteText}>
              Your bank details are secured with 256-bit encryption
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.noteText}>
              Verification may take up to 24 hours
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ORANGE_LIGHT,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
  inputHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  getOtpBtn: {
    backgroundColor: ORANGE_PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  getOtpBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  otpCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  otpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  otpSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 8,
    fontWeight: '600',
  },
  verifyBtn: {
    backgroundColor: ORANGE_PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  verifyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  resendBtnText: {
    color: ORANGE_PRIMARY,
    fontSize: 14,
    fontWeight: '500',
  },
  noteSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  noteText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});
