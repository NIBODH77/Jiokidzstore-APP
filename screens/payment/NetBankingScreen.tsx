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

interface Bank {
  id: string;
  name: string;
  shortName: string;
  color: string;
  isPopular: boolean;
  isSaved?: boolean;
}

const ORANGE_PRIMARY = '#FF6B00';
const ORANGE_LIGHT = '#FFF3E6';

const BANKS: Bank[] = [
  { id: '1', name: 'State Bank of India', shortName: 'SBI', color: '#0066B3', isPopular: true },
  { id: '2', name: 'HDFC Bank', shortName: 'HDFC', color: '#004B87', isPopular: true },
  { id: '3', name: 'ICICI Bank', shortName: 'ICICI', color: '#F58220', isPopular: true },
  { id: '4', name: 'Axis Bank', shortName: 'AXIS', color: '#800000', isPopular: true },
  { id: '5', name: 'Kotak Mahindra Bank', shortName: 'KOTAK', color: '#ED1C24', isPopular: true },
  { id: '6', name: 'Punjab National Bank', shortName: 'PNB', color: '#DC143C', isPopular: true },
  { id: '7', name: 'Bank of Baroda', shortName: 'BOB', color: '#F7941D', isPopular: false },
  { id: '8', name: 'Canara Bank', shortName: 'CANARA', color: '#0B3D91', isPopular: false },
  { id: '9', name: 'Union Bank of India', shortName: 'UBI', color: '#FF6600', isPopular: false },
  { id: '10', name: 'Indian Bank', shortName: 'IB', color: '#0047AB', isPopular: false },
  { id: '11', name: 'IDBI Bank', shortName: 'IDBI', color: '#00A651', isPopular: false },
  { id: '12', name: 'IndusInd Bank', shortName: 'IIB', color: '#ED1C24', isPopular: false },
  { id: '13', name: 'Yes Bank', shortName: 'YES', color: '#002F6C', isPopular: false },
  { id: '14', name: 'Federal Bank', shortName: 'FED', color: '#0072BC', isPopular: false },
  { id: '15', name: 'South Indian Bank', shortName: 'SIB', color: '#1E3A5F', isPopular: false },
];

export default function NetBankingScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [savedBanks, setSavedBanks] = useState<string[]>(['1', '2']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllBanks, setShowAllBanks] = useState(false);

  const popularBanks = BANKS.filter((b) => b.isPopular);
  const otherBanks = BANKS.filter((b) => !b.isPopular);
  const filteredBanks = searchQuery
    ? BANKS.filter(
        (b) =>
          b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.shortName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectBank = (bank: Bank) => {
    Alert.alert(
      'Net Banking',
      `You will be redirected to ${bank.name} for secure payment.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => {
            if (!savedBanks.includes(bank.id)) {
              Alert.alert(
                'Save Bank?',
                'Would you like to save this bank for faster payments?',
                [
                  { text: 'No', style: 'cancel' },
                  {
                    text: 'Save',
                    onPress: () => setSavedBanks([...savedBanks, bank.id]),
                  },
                ]
              );
            }
          },
        },
      ]
    );
  };

  const handleRemoveSavedBank = (bankId: string) => {
    Alert.alert(
      'Remove Bank',
      'Remove this bank from your saved banks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setSavedBanks(savedBanks.filter((id) => id !== bankId)),
        },
      ]
    );
  };

  const renderBankItem = (bank: Bank, isSaved: boolean = false) => (
    <TouchableOpacity
      key={bank.id}
      style={styles.bankItem}
      onPress={() => handleSelectBank(bank)}
      onLongPress={isSaved ? () => handleRemoveSavedBank(bank.id) : undefined}
    >
      <View style={[styles.bankIcon, { backgroundColor: bank.color }]}>
        <Text style={styles.bankIconText}>{bank.shortName.substring(0, 2)}</Text>
      </View>
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>{bank.name}</Text>
        <Text style={styles.bankCode}>{bank.shortName}</Text>
      </View>
      {isSaved && (
        <View style={styles.savedBadge}>
          <Ionicons name="bookmark" size={14} color={ORANGE_PRIMARY} />
        </View>
      )}
      <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Net Banking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="business" size={20} color={ORANGE_PRIMARY} />
          <Text style={styles.infoText}>
            Pay directly from your bank account using Internet Banking
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bank name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {searchQuery.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {filteredBanks.length === 0 ? (
              <Text style={styles.noResults}>No banks found</Text>
            ) : (
              filteredBanks.map((bank) => renderBankItem(bank, savedBanks.includes(bank.id)))
            )}
          </View>
        ) : (
          <>
            {savedBanks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Saved Banks</Text>
                <Text style={styles.sectionHint}>Long press to remove</Text>
                {BANKS.filter((b) => savedBanks.includes(b.id)).map((bank) =>
                  renderBankItem(bank, true)
                )}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Banks</Text>
              {popularBanks.map((bank) => renderBankItem(bank, savedBanks.includes(bank.id)))}
            </View>

            <TouchableOpacity
              style={styles.showMoreBtn}
              onPress={() => setShowAllBanks(!showAllBanks)}
            >
              <Text style={styles.showMoreText}>
                {showAllBanks ? 'Show Less' : `Show All Banks (${otherBanks.length} more)`}
              </Text>
              <Ionicons
                name={showAllBanks ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={ORANGE_PRIMARY}
              />
            </TouchableOpacity>

            {showAllBanks && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Other Banks</Text>
                {otherBanks.map((bank) => renderBankItem(bank, savedBanks.includes(bank.id)))}
              </View>
            )}
          </>
        )}

        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>Important Notes</Text>
          <View style={styles.noteItem}>
            <Ionicons name="information-circle" size={16} color="#666" />
            <Text style={styles.noteText}>
              You will be redirected to your bank's secure website to complete the payment.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Ionicons name="shield-checkmark" size={16} color="#666" />
            <Text style={styles.noteText}>
              All transactions are secured with 256-bit encryption.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.noteText}>
              Net Banking transactions may take up to 15 minutes to process.
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
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  noResults: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 20,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  bankIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bankIconText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  bankCode: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  savedBadge: {
    marginRight: 8,
  },
  showMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  showMoreText: {
    color: ORANGE_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  noteSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
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
