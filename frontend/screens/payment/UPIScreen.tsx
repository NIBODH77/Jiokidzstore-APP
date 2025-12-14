import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SavedUPI {
  id: string;
  upiId: string;
  provider: 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'other';
  isDefault: boolean;
  isVerified: boolean;
}

const ORANGE_PRIMARY = '#FF6B00';
const ORANGE_LIGHT = '#FFF3E6';

export default function UPIScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [savedUPIs, setSavedUPIs] = useState<SavedUPI[]>([
    {
      id: '1',
      upiId: 'lolu@okaxis',
      provider: 'gpay',
      isDefault: true,
      isVerified: true,
    },
    {
      id: '2',
      upiId: 'lolu@ybl',
      provider: 'phonepe',
      isDefault: false,
      isVerified: true,
    },
  ]);
  const [showAddUPI, setShowAddUPI] = useState(false);
  const [newUPIId, setNewUPIId] = useState('');
  const [verifying, setVerifying] = useState(false);

  const getProviderInfo = (provider: string) => {
    switch (provider) {
      case 'gpay':
        return { name: 'Google Pay', color: '#4285F4', icon: '🔵' };
      case 'phonepe':
        return { name: 'PhonePe', color: '#5F259F', icon: '🟣' };
      case 'paytm':
        return { name: 'Paytm', color: '#00B9F1', icon: '🔷' };
      case 'bhim':
        return { name: 'BHIM', color: '#00529B', icon: '🔹' };
      default:
        return { name: 'UPI', color: '#666', icon: '💳' };
    }
  };

  const detectProvider = (upiId: string): SavedUPI['provider'] => {
    if (upiId.includes('@okaxis') || upiId.includes('@okhdfcbank')) return 'gpay';
    if (upiId.includes('@ybl') || upiId.includes('@ibl')) return 'phonepe';
    if (upiId.includes('@paytm')) return 'paytm';
    if (upiId.includes('@upi')) return 'bhim';
    return 'other';
  };

  const handleDeleteUPI = (upiId: string) => {
    Alert.alert(
      'Remove UPI ID',
      'Are you sure you want to remove this UPI ID?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setSavedUPIs(savedUPIs.filter((upi) => upi.id !== upiId));
          },
        },
      ]
    );
  };

  const handleSetDefault = (upiId: string) => {
    setSavedUPIs(
      savedUPIs.map((upi) => ({
        ...upi,
        isDefault: upi.id === upiId,
      }))
    );
  };

  const handleAddUPI = () => {
    if (!newUPIId || !newUPIId.includes('@')) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID (e.g., yourname@bank)');
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      const newEntry: SavedUPI = {
        id: Date.now().toString(),
        upiId: newUPIId.toLowerCase(),
        provider: detectProvider(newUPIId.toLowerCase()),
        isDefault: savedUPIs.length === 0,
        isVerified: true,
      };
      setSavedUPIs([...savedUPIs, newEntry]);
      setNewUPIId('');
      setShowAddUPI(false);
      setVerifying(false);
      Alert.alert('Success', 'UPI ID verified and added successfully!');
    }, 1500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UPI</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="flash" size={20} color={ORANGE_PRIMARY} />
          <Text style={styles.infoText}>
            Pay directly from your bank account using UPI
          </Text>
        </View>

        {savedUPIs.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>📱</Text>
            </View>
            <Text style={styles.emptyTitle}>No UPI IDs Saved</Text>
            <Text style={styles.emptySubtitle}>
              Add your UPI ID for instant payments
            </Text>
          </View>
        ) : (
          <View style={styles.upiList}>
            {savedUPIs.map((upi) => {
              const providerInfo = getProviderInfo(upi.provider);
              return (
                <View key={upi.id} style={styles.upiItem}>
                  <View style={styles.upiHeader}>
                    <View style={styles.providerContainer}>
                      <View style={[styles.providerIcon, { backgroundColor: providerInfo.color + '20' }]}>
                        <Text style={styles.providerIconText}>{providerInfo.icon}</Text>
                      </View>
                      <View>
                        <Text style={styles.providerName}>{providerInfo.name}</Text>
                        <Text style={styles.upiId}>{upi.upiId}</Text>
                      </View>
                    </View>
                    {upi.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                      </View>
                    )}
                  </View>
                  {upi.isVerified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                  <View style={styles.upiActions}>
                    {!upi.isDefault && (
                      <TouchableOpacity
                        style={styles.setDefaultBtn}
                        onPress={() => handleSetDefault(upi.id)}
                      >
                        <Text style={styles.setDefaultText}>Set as Default</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDeleteUPI(upi.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#FF4444" />
                      <Text style={styles.deleteText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {showAddUPI && (
          <View style={styles.addUPIForm}>
            <Text style={styles.formTitle}>Add UPI ID</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter your UPI ID</Text>
              <TextInput
                style={styles.input}
                placeholder="yourname@bankname"
                autoCapitalize="none"
                keyboardType="email-address"
                value={newUPIId}
                onChangeText={setNewUPIId}
              />
              <Text style={styles.inputHint}>Example: yourname@okaxis, yourname@ybl</Text>
            </View>
            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setShowAddUPI(false);
                  setNewUPIId('');
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.verifyBtn, verifying && styles.verifyBtnDisabled]}
                onPress={handleAddUPI}
                disabled={verifying}
              >
                <Text style={styles.verifyBtnText}>
                  {verifying ? 'Verifying...' : 'Verify & Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showAddUPI && (
          <TouchableOpacity
            style={styles.addUPIBtn}
            onPress={() => setShowAddUPI(true)}
          >
            <Ionicons name="add-circle" size={24} color={ORANGE_PRIMARY} />
            <Text style={styles.addUPIText}>Add New UPI ID</Text>
          </TouchableOpacity>
        )}

        <View style={styles.supportedApps}>
          <Text style={styles.supportedTitle}>Supported UPI Apps</Text>
          <View style={styles.appsGrid}>
            {[
              { name: 'Google Pay', icon: '🔵' },
              { name: 'PhonePe', icon: '🟣' },
              { name: 'Paytm', icon: '🔷' },
              { name: 'BHIM', icon: '🔹' },
              { name: 'Amazon Pay', icon: '🟠' },
              { name: 'WhatsApp Pay', icon: '🟢' },
            ].map((app, index) => (
              <View key={index} style={styles.appItem}>
                <Text style={styles.appIcon}>{app.icon}</Text>
                <Text style={styles.appName}>{app.name}</Text>
              </View>
            ))}
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ORANGE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  upiList: {
    gap: 16,
  },
  upiItem: {
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
  upiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerIconText: {
    fontSize: 20,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  upiId: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: ORANGE_PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  verifiedText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#4CAF50',
  },
  upiActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  setDefaultBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  setDefaultText: {
    color: ORANGE_PRIMARY,
    fontSize: 14,
    fontWeight: '500',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteText: {
    color: '#FF4444',
    fontSize: 14,
    marginLeft: 4,
  },
  addUPIBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ORANGE_LIGHT,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ORANGE_PRIMARY,
    borderStyle: 'dashed',
    marginTop: 16,
  },
  addUPIText: {
    color: ORANGE_PRIMARY,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addUPIForm: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  inputHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cancelBtnText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  verifyBtn: {
    backgroundColor: ORANGE_PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  verifyBtnDisabled: {
    opacity: 0.7,
  },
  verifyBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  supportedApps: {
    marginTop: 32,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  supportedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  appItem: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
  },
  appIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  appName: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});
