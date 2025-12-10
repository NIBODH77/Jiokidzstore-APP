import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ContactDetailsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('lolu4224@gmail.com');
  const [phone, setPhone] = useState('8604415251');
  const [isPhoneVerified, setIsPhoneVerified] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: 90 }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Enter Your Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Enter Your Mobile No.</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.flagEmoji}>🇮🇳</Text>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              maxLength={10}
            />
            {isPhoneVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
            )}
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil-outline" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why should I verify my mobile number</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              By verifying your mobile number with us you can now Shop'n'Earn Club Cash at our JioKidz.com stores too! To earn Club Cash on store purchases, simply provide your verified mobile number at the time of billing.{' '}
              <Text style={styles.linkText}>T&C Apply</Text>
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  flagEmoji: {
    fontSize: 20,
    marginRight: 6,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  verifiedBadge: {
    marginLeft: 8,
  },
  editBtn: {
    marginLeft: 12,
    padding: 4,
  },
  infoSection: {
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#FFFDE7',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    padding: 16,
    borderRadius: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  linkText: {
    color: '#1976D2',
    textDecorationLine: 'underline',
  },
});
