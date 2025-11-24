import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { ScreenFlatList } from '@/components/ScreenFlatList';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { CartItem } from '@/data/types';
import { cartStorage } from '@/utils/storage';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Reload cart when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadCart();
    }, [])
  );

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await cartStorage.getCart();
    setCartItems(items);
    setLoading(false);
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      Alert.alert('Remove Item', 'Remove this item from cart?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: async () => {
            await cartStorage.removeFromCart(itemId);
            loadCart();
          },
          style: 'destructive',
        },
      ]);
    } else {
      await cartStorage.updateQuantity(itemId, newQuantity);
      loadCart();
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    Alert.alert('Remove Item', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        onPress: async () => {
          await cartStorage.removeFromCart(itemId);
          loadCart();
        },
        style: 'destructive',
      },
    ]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = total > 499 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  if (!loading && cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="shopping-cart" size={80} color={Colors.light.textGray} />
        <ThemedText type="h2" style={styles.emptyTitle}>Your cart is empty</ThemedText>
        <ThemedText style={styles.emptySubtitle}>Add items to get started</ThemedText>
        <Button onPress={() => navigation.navigate('Home')} style={styles.shopButton}>
          Start Shopping
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenFlatList
        contentContainerStyle={{ paddingTop: Spacing.lg }}
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <ThemedText type="small" style={styles.brand}>{item.product.brand}</ThemedText>
              <ThemedText numberOfLines={2} style={styles.itemName}>{item.product.name}</ThemedText>
              {item.selectedSize && (
                <ThemedText type="caption">Size: {item.selectedSize}</ThemedText>
              )}
              <View style={styles.priceRow}>
                <ThemedText style={styles.itemPrice}>₹{item.product.price}</ThemedText>
                <View style={styles.quantityControls}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Feather name="minus" size={16} color={Colors.light.primary} />
                  </Pressable>
                  <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Feather name="plus" size={16} color={Colors.light.primary} />
                  </Pressable>
                </View>
              </View>
            </View>
            <Pressable
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item.id)}
            >
              <Feather name="trash-2" size={20} color={Colors.light.error} />
            </Pressable>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <ThemedText>Subtotal</ThemedText>
            <ThemedText>₹{total}</ThemedText>
          </View>
          <View style={styles.summaryRow}>
            <ThemedText>Delivery Fee</ThemedText>
            <ThemedText>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</ThemedText>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <ThemedText type="h3">Total</ThemedText>
            <ThemedText type="h3" style={styles.totalPrice}>₹{finalTotal}</ThemedText>
          </View>
        </View>
        <Button onPress={() => navigation.navigate('CheckoutAddress')}>
          Proceed to Checkout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: Colors.light.backgroundRoot,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.light.backgroundSecondary,
    marginRight: Spacing.md,
  },
  itemDetails: {
    flex: 1,
  },
  brand: {
    color: Colors.light.textGray,
    marginBottom: 2,
  },
  itemName: {
    marginBottom: 4,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: Spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  emptyTitle: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    color: Colors.light.textGray,
    marginBottom: Spacing.xxl,
  },
  shopButton: {
    paddingHorizontal: Spacing.xxl * 2,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: 90,
    backgroundColor: Colors.light.backgroundRoot,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    ...Shadows.medium,
  },
  summary: {
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  totalRow: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  totalPrice: {
    color: Colors.light.primary,
  },
});
