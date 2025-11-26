import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { ScreenScrollView } from '@/components/ScreenScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function CheckoutAddressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleDeliverHere = () => {
    navigation.navigate('CheckoutPayment');
  };

  return (
    <ScreenScrollView>
      <View style={[styles.container, { marginTop: Spacing.lg }]}>
        <Pressable style={styles.addCard}>
          <Feather name="plus-circle" size={24} color={Colors.light.primary} />
          <ThemedText style={styles.addText}>Add New Address</ThemedText>
        </Pressable>
        
        <View style={styles.addressCard}>
          <ThemedText style={styles.addressName}>Home</ThemedText>
          <ThemedText style={styles.addressText}>
            123 Main Street{'\n'}Mumbai, Maharashtra 400001{'\n'}India
          </ThemedText>
          <ThemedText type="caption">Phone: +91 9876543210</ThemedText>
        </View>
        
        <View style={styles.button}>
          <Button title="Deliver Here" onPress={handleDeliverHere} />
        </View>
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: Spacing.lg },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderStyle: 'dashed',
    marginBottom: Spacing.lg,
    justifyContent: 'center',
  },
  addText: { marginLeft: Spacing.sm, color: Colors.light.primary, fontWeight: '600' },
  addressCard: {
    backgroundColor: Colors.light.backgroundRoot,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.lg,
    ...Shadows.small,
  },
  addressName: { fontWeight: '700', marginBottom: Spacing.sm },
  addressText: { marginBottom: Spacing.sm, lineHeight: 20 },
  button: { marginTop: Spacing.xl },
});
