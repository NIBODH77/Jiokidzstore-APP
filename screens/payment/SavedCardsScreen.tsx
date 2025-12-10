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
import { TopHeader } from '@/components/TopHeader';

interface SavedCard {
  id: string;
  cardNumber: string;
  cardType: 'visa' | 'mastercard' | 'rupay';
  expiryDate: string;
  cardHolderName: string;
  isDefault: boolean;
}

const ORANGE_PRIMARY = '#FF6B00';
const ORANGE_LIGHT = '#FFF3E6';
const ORANGE_DARK = '#E55A00';

export default function SavedCardsScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: '1',
      cardNumber: '**** **** **** 4532',
      cardType: 'visa',
      expiryDate: '12/26',
      cardHolderName: 'LOLU SHARMA',
      isDefault: true,
    },
    {
      id: '2',
      cardNumber: '**** **** **** 8821',
      cardType: 'mastercard',
      expiryDate: '08/25',
      cardHolderName: 'LOLU SHARMA',
      isDefault: false,
    },
  ]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'rupay':
        return '💳';
      default:
        return '💳';
    }
  };

  const getCardTypeName = (cardType: string) => {
    switch (cardType) {
      case 'visa':
        return 'VISA';
      case 'mastercard':
        return 'MasterCard';
      case 'rupay':
        return 'RuPay';
      default:
        return 'Card';
    }
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to remove this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSavedCards(savedCards.filter((card) => card.id !== cardId));
          },
        },
      ]
    );
  };

  const handleSetDefault = (cardId: string) => {
    setSavedCards(
      savedCards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.expiryDate || !newCard.cardHolderName) {
      Alert.alert('Error', 'Please fill all card details');
      return;
    }
    const newCardEntry: SavedCard = {
      id: Date.now().toString(),
      cardNumber: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
      cardType: 'visa',
      expiryDate: newCard.expiryDate,
      cardHolderName: newCard.cardHolderName.toUpperCase(),
      isDefault: savedCards.length === 0,
    };
    setSavedCards([...savedCards, newCardEntry]);
    setNewCard({ cardNumber: '', expiryDate: '', cvv: '', cardHolderName: '' });
    setShowAddCard(false);
    Alert.alert('Success', 'Card added successfully!');
  };

  return (
    <View style={styles.container}>
      <TopHeader 
        showBackButton={true}
        hideRightIcons={true}
      />
      
      <ScrollView style={[styles.content, { marginTop: 90 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color={ORANGE_PRIMARY} />
          <Text style={styles.infoText}>
            Your card information is encrypted and stored securely
          </Text>
        </View>

        {savedCards.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="card-outline" size={64} color={ORANGE_PRIMARY} />
            </View>
            <Text style={styles.emptyTitle}>No Saved Cards</Text>
            <Text style={styles.emptySubtitle}>
              Add a card for faster checkout experience
            </Text>
          </View>
        ) : (
          <View style={styles.cardsList}>
            {savedCards.map((card) => (
              <View key={card.id} style={styles.cardItem}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTypeContainer}>
                    <Text style={styles.cardIcon}>{getCardIcon(card.cardType)}</Text>
                    <Text style={styles.cardTypeName}>{getCardTypeName(card.cardType)}</Text>
                  </View>
                  {card.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardNumber}>{card.cardNumber}</Text>
                <View style={styles.cardDetails}>
                  <View>
                    <Text style={styles.cardLabel}>Card Holder</Text>
                    <Text style={styles.cardValue}>{card.cardHolderName}</Text>
                  </View>
                  <View>
                    <Text style={styles.cardLabel}>Expires</Text>
                    <Text style={styles.cardValue}>{card.expiryDate}</Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  {!card.isDefault && (
                    <TouchableOpacity
                      style={styles.setDefaultBtn}
                      onPress={() => handleSetDefault(card.id)}
                    >
                      <Text style={styles.setDefaultText}>Set as Default</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteCard(card.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#FF4444" />
                    <Text style={styles.deleteText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {showAddCard && (
          <View style={styles.addCardForm}>
            <Text style={styles.formTitle}>Add New Card</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
                value={newCard.cardNumber}
                onChangeText={(text) => setNewCard({ ...newCard, cardNumber: text })}
              />
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  maxLength={5}
                  value={newCard.expiryDate}
                  onChangeText={(text) => setNewCard({ ...newCard, expiryDate: text })}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="***"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  value={newCard.cvv}
                  onChangeText={(text) => setNewCard({ ...newCard, cvv: text })}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Holder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name on card"
                autoCapitalize="characters"
                value={newCard.cardHolderName}
                onChangeText={(text) => setNewCard({ ...newCard, cardHolderName: text })}
              />
            </View>
            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowAddCard(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddCard}>
                <Text style={styles.saveBtnText}>Save Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {!showAddCard && (
          <TouchableOpacity
            style={styles.addCardBtn}
            onPress={() => setShowAddCard(true)}
          >
            <Ionicons name="add-circle" size={24} color={ORANGE_PRIMARY} />
            <Text style={styles.addCardText}>Add New Card</Text>
          </TouchableOpacity>
        )}

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
  cardsList: {
    gap: 16,
  },
  cardItem: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  cardTypeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  cardNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  cardActions: {
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
  addCardBtn: {
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
  addCardText: {
    color: ORANGE_PRIMARY,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addCardForm: {
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
  inputRow: {
    flexDirection: 'row',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
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
  saveBtn: {
    backgroundColor: ORANGE_PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
