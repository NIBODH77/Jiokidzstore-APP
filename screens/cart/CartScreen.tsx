import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Alert, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/Button';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { CartItem } from '@/data/types';
import { cartStorage } from '@/utils/storage';
import type { HomeStackParamList } from '@/navigation/HomeStackNavigator';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100x100/FFF3E0/FF8C00?text=Product';

export default function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

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
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
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

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }
    const upperCode = couponCode.toUpperCase();
    if (upperCode === 'SAVE10') {
      setAppliedCoupon(upperCode);
      setCouponDiscount(10);
      Alert.alert('Success', 'Coupon applied! You get 10% off');
    } else if (upperCode === 'FLAT100') {
      setAppliedCoupon(upperCode);
      setCouponDiscount(100);
      Alert.alert('Success', 'Coupon applied! Rs 100 off');
    } else if (upperCode === 'NEWUSER') {
      setAppliedCoupon(upperCode);
      setCouponDiscount(15);
      Alert.alert('Success', 'Coupon applied! You get 15% off');
    } else {
      Alert.alert('Invalid Coupon', 'This coupon code is not valid');
    }
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item?.product?.price || 0) * item.quantity, 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + ((item?.product?.originalPrice || item?.product?.price || 0) * item.quantity), 0);
  const discount = totalMrp - subtotal;
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const couponDiscountAmount = appliedCoupon 
    ? (couponDiscount > 50 ? couponDiscount : Math.round(subtotal * couponDiscount / 100))
    : 0;
  const finalTotal = subtotal + deliveryFee - couponDiscountAmount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalSavings = discount + couponDiscountAmount + (subtotal > 499 ? 40 : 0);

  if (!loading && cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <Feather name="shopping-cart" size={60} color={Colors.light.primary} />
        </View>
        <ThemedText type="h2" style={styles.emptyTitle}>Your Cart is Empty</ThemedText>
        <ThemedText style={styles.emptySubtitle}>
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </ThemedText>
        <Pressable style={styles.shopNowButton} onPress={() => navigation.navigate('Home')}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.shopNowGradient}
          >
            <ThemedText style={styles.shopNowText}>Start Shopping</ThemedText>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <ThemedText type="h3" style={styles.sectionTitle}>
            My Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </ThemedText>
        </View>

        <View style={styles.deliveryBanner}>
          <Feather name="truck" size={20} color="#27AE60" />
          <View style={styles.deliveryTextContainer}>
            <ThemedText style={styles.deliveryTitle}>Free Delivery on orders above ₹499</ThemedText>
            {subtotal < 499 && (
              <ThemedText style={styles.deliverySubtitle}>
                Add ₹{499 - subtotal} more for free delivery
              </ThemedText>
            )}
          </View>
        </View>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
              <Image
                source={item.product.image ? { uri: item.product.image } : { uri: PLACEHOLDER_IMAGE }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              {item.product.discount && item.product.discount > 0 && (
                <View style={styles.discountBadge}>
                  <ThemedText style={styles.discountBadgeText}>{item.product.discount}% OFF</ThemedText>
                </View>
              )}
            </View>
            <View style={styles.itemDetails}>
              <View style={styles.itemHeader}>
                <ThemedText type="caption" style={styles.brand}>{item.product.brand}</ThemedText>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather name="x" size={18} color={Colors.light.textGray} />
                </Pressable>
              </View>
              <ThemedText numberOfLines={2} style={styles.itemName}>{item.product.name}</ThemedText>
              
              <View style={styles.attributeRow}>
                {item.selectedSize && (
                  <View style={styles.attributeTag}>
                    <ThemedText style={styles.attributeText}>Size: {item.selectedSize}</ThemedText>
                  </View>
                )}
                {item.selectedColor && (
                  <View style={[styles.attributeTag, { marginLeft: Spacing.xs }]}>
                    <View style={[styles.colorDot, { backgroundColor: item.selectedColor }]} />
                    <ThemedText style={styles.attributeText}>Color</ThemedText>
                  </View>
                )}
              </View>

              <View style={styles.priceRow}>
                <View style={styles.priceContainer}>
                  <ThemedText style={styles.itemPrice}>₹{item.product.price}</ThemedText>
                  {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                    <ThemedText style={styles.originalPrice}>₹{item.product.originalPrice}</ThemedText>
                  )}
                </View>
                <View style={styles.quantityControls}>
                  <Pressable
                    style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                    onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Feather name="minus" size={14} color={item.quantity <= 1 ? Colors.light.textGray : Colors.light.primary} />
                  </Pressable>
                  <View style={styles.quantityDisplay}>
                    <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
                  </View>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Feather name="plus" size={14} color={Colors.light.primary} />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.couponSection}>
          <View style={styles.couponHeader}>
            <MaterialIcons name="local-offer" size={20} color={Colors.light.primary} />
            <ThemedText style={styles.couponTitle}>Apply Coupon</ThemedText>
          </View>
          {appliedCoupon ? (
            <View style={styles.appliedCouponContainer}>
              <View style={styles.appliedCouponInfo}>
                <Feather name="check-circle" size={18} color="#27AE60" />
                <ThemedText style={styles.appliedCouponText}>{appliedCoupon} applied</ThemedText>
                <ThemedText style={styles.couponSavings}>-₹{couponDiscountAmount}</ThemedText>
              </View>
              <Pressable onPress={handleRemoveCoupon}>
                <ThemedText style={styles.removeCouponText}>Remove</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View style={styles.couponInputContainer}>
              <TextInput
                style={styles.couponInput}
                placeholder="Enter coupon code"
                placeholderTextColor={Colors.light.textGray}
                value={couponCode}
                onChangeText={setCouponCode}
                autoCapitalize="characters"
              />
              <Pressable style={styles.applyButton} onPress={handleApplyCoupon}>
                <ThemedText style={styles.applyButtonText}>APPLY</ThemedText>
              </Pressable>
            </View>
          )}
          <View style={styles.availableCoupons}>
            <ThemedText style={styles.availableCouponsTitle}>Available Coupons:</ThemedText>
            <View style={styles.couponChip}>
              <ThemedText style={styles.couponChipText}>SAVE10 - 10% off</ThemedText>
            </View>
            <View style={styles.couponChip}>
              <ThemedText style={styles.couponChipText}>NEWUSER - 15% off</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.priceBreakdown}>
          <ThemedText style={styles.priceBreakdownTitle}>Price Details</ThemedText>
          <View style={styles.priceRow2}>
            <ThemedText style={styles.priceLabel}>Total MRP</ThemedText>
            <ThemedText style={styles.priceValue}>₹{totalMrp}</ThemedText>
          </View>
          {discount > 0 && (
            <View style={styles.priceRow2}>
              <ThemedText style={styles.priceLabel}>Discount on MRP</ThemedText>
              <ThemedText style={styles.discountValue}>-₹{discount}</ThemedText>
            </View>
          )}
          {couponDiscountAmount > 0 && (
            <View style={styles.priceRow2}>
              <ThemedText style={styles.priceLabel}>Coupon Discount</ThemedText>
              <ThemedText style={styles.discountValue}>-₹{couponDiscountAmount}</ThemedText>
            </View>
          )}
          <View style={styles.priceRow2}>
            <ThemedText style={styles.priceLabel}>Delivery Fee</ThemedText>
            <ThemedText style={deliveryFee === 0 ? styles.freeDelivery : styles.priceValue}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </ThemedText>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.priceRow2}>
            <ThemedText style={styles.totalLabel}>Total Amount</ThemedText>
            <ThemedText style={styles.totalValue}>₹{finalTotal}</ThemedText>
          </View>
          {totalSavings > 0 && (
            <View style={styles.savingsContainer}>
              <Feather name="tag" size={14} color="#27AE60" />
              <ThemedText style={styles.savingsText}>You're saving ₹{totalSavings} on this order</ThemedText>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPriceContainer}>
          <ThemedText style={styles.footerTotal}>₹{finalTotal}</ThemedText>
          <Pressable onPress={() => {}}>
            <ThemedText style={styles.viewDetails}>View Details</ThemedText>
          </Pressable>
        </View>
        <Pressable style={styles.checkoutButton} onPress={() => navigation.navigate('CheckoutAddress')}>
          <LinearGradient
            colors={['#FF8C00', '#FF6B35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutGradient}
          >
            <ThemedText style={styles.checkoutText}>Proceed to Checkout</ThemedText>
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
    backgroundColor: Colors.light.backgroundDefault,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xl + 15,
    paddingBottom: 120,
  },
  headerSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: Colors.light.text,
  },
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  deliveryTextContainer: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#27AE60',
  },
  deliverySubtitle: {
    fontSize: 11,
    color: '#2E7D32',
    marginTop: 2,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.light.backgroundRoot,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    ...Shadows.small,
  },
  itemImageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  discountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  itemDetails: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brand: {
    color: Colors.light.textGray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  removeButton: {
    padding: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginTop: 2,
    marginBottom: Spacing.xs,
  },
  attributeRow: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  attributeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  attributeText: {
    fontSize: 11,
    color: Colors.light.textGray,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  itemPrice: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.light.text,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.light.textGray,
    textDecorationLine: 'line-through',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: BorderRadius.xs,
    padding: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: Colors.light.backgroundRoot,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  quantityDisplay: {
    minWidth: 32,
    alignItems: 'center',
  },
  quantity: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.light.text,
  },
  couponSection: {
    backgroundColor: Colors.light.backgroundRoot,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    ...Shadows.small,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  couponTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: Spacing.sm,
    color: Colors.light.text,
  },
  couponInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  couponInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    color: Colors.light.text,
  },
  applyButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.lg,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.xs,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  appliedCouponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8F5E9',
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderStyle: 'dashed',
  },
  appliedCouponInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  appliedCouponText: {
    fontWeight: '600',
    color: '#27AE60',
  },
  couponSavings: {
    fontWeight: '700',
    color: '#27AE60',
  },
  removeCouponText: {
    color: '#E74C3C',
    fontWeight: '600',
    fontSize: 13,
  },
  availableCoupons: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  availableCouponsTitle: {
    fontSize: 12,
    color: Colors.light.textGray,
    marginBottom: Spacing.xs,
  },
  couponChip: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  couponChipText: {
    fontSize: 11,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  priceBreakdown: {
    backgroundColor: Colors.light.backgroundRoot,
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    ...Shadows.small,
  },
  priceBreakdownTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  priceRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.light.textGray,
  },
  priceValue: {
    fontSize: 14,
    color: Colors.light.text,
  },
  discountValue: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '500',
  },
  freeDelivery: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
  },
  totalDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: Spacing.sm,
    borderRadius: 4,
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  savingsText: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    backgroundColor: Colors.light.backgroundDefault,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  emptyTitle: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: Colors.light.textGray,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    lineHeight: 22,
  },
  shopNowButton: {
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  shopNowGradient: {
    paddingHorizontal: Spacing.xxl * 2,
    paddingVertical: Spacing.md,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingBottom: 30,
    backgroundColor: Colors.light.backgroundRoot,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    ...Shadows.medium,
  },
  footerPriceContainer: {
    flex: 1,
  },
  footerTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  viewDetails: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  checkoutButton: {
    flex: 1.5,
    marginLeft: Spacing.md,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
