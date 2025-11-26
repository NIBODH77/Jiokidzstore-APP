import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function CheckoutPaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const methods = [
    { id: 'upi', name: 'UPI Payment', icon: 'smartphone' },
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'netbanking', name: 'Net Banking', icon: 'globe' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'package' },
  ];

  const handleContinue = () => {
    navigation.navigate('OrderSummary');
  };

  return (
    <ScreenScrollView>
      <View style={[styles.container, { marginTop: Spacing.lg }]}>
        <ThemedText type="h3" style={styles.title}>Select Payment Method</ThemedText>
        {methods.map((method) => (
          <Pressable
            key={method.id}
            style={[styles.methodCard, selectedMethod === method.id && styles.methodCardSelected]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <Feather name={method.icon as any} size={24} color={Colors.light.primary} />
              <ThemedText style={styles.methodName}>{method.name}</ThemedText>
            </View>
            <View style={[styles.radio, selectedMethod === method.id && styles.radioSelected]}>
              {selectedMethod === method.id && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}
        <View style={styles.button}>
          <Button title="Proceed to Order Summary" onPress={handleContinue} />
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg },
  title: {
    marginBottom: Spacing.lg,
    color: '#1F2937',
  },
  methodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: Spacing.md,
  },
  methodCardSelected: { borderColor: Colors.light.primary, backgroundColor: `${Colors.light.primary}10` },
  methodLeft: { flexDirection: 'row', alignItems: 'center' },
  methodName: { marginLeft: Spacing.md, fontWeight: '500' },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: { borderColor: Colors.light.primary },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.light.primary },
  button: { marginTop: Spacing.xl },
});
