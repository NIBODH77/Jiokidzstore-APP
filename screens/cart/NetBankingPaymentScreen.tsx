import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const POPULAR_BANKS = [
  { id: 'sbi', name: 'State Bank of India', shortName: 'SBI', color: '#0066B3' },
  { id: 'hdfc', name: 'HDFC Bank', shortName: 'HDFC', color: '#004B87' },
  { id: 'icici', name: 'ICICI Bank', shortName: 'ICICI', color: '#F58220' },
  { id: 'axis', name: 'Axis Bank', shortName: 'AXIS', color: '#800000' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', shortName: 'KOTAK', color: '#ED1C24' },
  { id: 'pnb', name: 'Punjab National Bank', shortName: 'PNB', color: '#DC143C' },
];

const OTHER_BANKS = [
  { id: 'bob', name: 'Bank of Baroda', shortName: 'BOB', color: '#F7941D' },
  { id: 'canara', name: 'Canara Bank', shortName: 'CANARA', color: '#0B3D91' },
  { id: 'union', name: 'Union Bank', shortName: 'UBI', color: '#FF6600' },
  { id: 'indian', name: 'Indian Bank', shortName: 'IB', color: '#0047AB' },
  { id: 'idbi', name: 'IDBI Bank', shortName: 'IDBI', color: '#00A651' },
  { id: 'yes', name: 'Yes Bank', shortName: 'YES', color: '#002F6C' },
];

export default function NetBankingPaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllBanks, setShowAllBanks] = useState(false);

  const allBanks = [...POPULAR_BANKS, ...OTHER_BANKS];
  const filteredBanks = searchQuery 
    ? allBanks.filter(bank => 
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.shortName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleContinue = () => {
    const bank = allBanks.find(b => b.id === selectedBank);
    navigation.navigate('PaymentReview', { 
      paymentMethod: 'NetBanking', 
      paymentDetails: bank?.name || 'Net Banking'
    });
  };

  const isValid = selectedBank !== null;

  const renderBankItem = (bank: typeof POPULAR_BANKS[0]) => (
    <Pressable
      key={bank.id}
      style={[
        styles.bankCard,
        selectedBank === bank.id && styles.bankCardSelected
      ]}
      onPress={() => {
        setSelectedBank(bank.id);
        setSearchQuery('');
      }}
    >
      <View style={[styles.bankIcon, { backgroundColor: bank.color }]}>
        <ThemedText style={styles.bankIconText}>
          {bank.shortName.substring(0, 2)}
        </ThemedText>
      </View>
      <View style={styles.bankInfo}>
        <ThemedText style={styles.bankName}>{bank.name}</ThemedText>
        <ThemedText style={styles.bankCode}>{bank.shortName}</ThemedText>
      </View>
      <View style={[
        styles.radio,
        selectedBank === bank.id && styles.radioSelected
      ]}>
        {selectedBank === bank.id && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Net Banking</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.infoBox}>
          <Feather name="globe" size={20} color="#FF8C00" />
          <ThemedText style={styles.infoText}>
            Pay directly from your bank account using Internet Banking
          </ThemedText>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search bank name..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Feather name="x-circle" size={20} color="#9CA3AF" />
              </Pressable>
            )}
          </View>
        </View>

        {searchQuery.length > 0 ? (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Search Results</ThemedText>
            {filteredBanks.length === 0 ? (
              <ThemedText style={styles.noResults}>No banks found</ThemedText>
            ) : (
              filteredBanks.map(renderBankItem)
            )}
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Popular Banks</ThemedText>
              <View style={styles.bankGrid}>
                {POPULAR_BANKS.map((bank) => (
                  <Pressable
                    key={bank.id}
                    style={[
                      styles.bankGridItem,
                      selectedBank === bank.id && styles.bankGridItemSelected
                    ]}
                    onPress={() => setSelectedBank(bank.id)}
                  >
                    <View style={[styles.bankGridIcon, { backgroundColor: bank.color }]}>
                      <ThemedText style={styles.bankGridIconText}>
                        {bank.shortName.substring(0, 2)}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.bankGridName} numberOfLines={1}>
                      {bank.shortName}
                    </ThemedText>
                    {selectedBank === bank.id && (
                      <View style={styles.checkBadge}>
                        <Feather name="check" size={10} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              style={styles.showMoreButton}
              onPress={() => setShowAllBanks(!showAllBanks)}
            >
              <ThemedText style={styles.showMoreText}>
                {showAllBanks ? 'Show Less' : `Show All Banks (${OTHER_BANKS.length} more)`}
              </ThemedText>
              <Feather 
                name={showAllBanks ? 'chevron-up' : 'chevron-down'} 
                size={18} 
                color="#FF8C00" 
              />
            </Pressable>

            {showAllBanks && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Other Banks</ThemedText>
                {OTHER_BANKS.map(renderBankItem)}
              </View>
            )}
          </>
        )}

        <View style={styles.noteSection}>
          <ThemedText style={styles.noteTitle}>Important Notes</ThemedText>
          <View style={styles.noteItem}>
            <Feather name="info" size={14} color="#6B7280" />
            <ThemedText style={styles.noteText}>
              You will be redirected to your bank's secure website
            </ThemedText>
          </View>
          <View style={styles.noteItem}>
            <Feather name="shield" size={14} color="#6B7280" />
            <ThemedText style={styles.noteText}>
              All transactions are secured with 256-bit encryption
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable 
          style={[styles.continueButton, !isValid && styles.continueButtonDisabled]} 
          onPress={handleContinue}
          disabled={!isValid}
        >
          <LinearGradient
            colors={isValid ? ['#FF8C00', '#FF6B35'] : ['#D1D5DB', '#D1D5DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueGradient}
          >
            <ThemedText style={styles.continueText}>Continue to Review</ThemedText>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    margin: 16,
    padding: 14,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFE4CC',
  },
  infoText: {
    fontSize: 13,
    color: '#92400E',
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#1F2937',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },
  noResults: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 20,
  },
  bankGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bankGridItem: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  bankGridItemSelected: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFFAF5',
  },
  bankGridIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  bankGridIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  bankGridName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
    marginBottom: 8,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF8C00',
  },
  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  bankCardSelected: {
    borderColor: '#FF8C00',
    backgroundColor: '#FFFAF5',
  },
  bankIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  bankInfo: {
    flex: 1,
    marginLeft: 14,
  },
  bankName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  bankCode: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#FF8C00',
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF8C00',
  },
  noteSection: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  continueButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  continueText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
