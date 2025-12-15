import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Address, Product } from '@/data/types';

const CART_KEY = '@CloudKidd_cart';
const WISHLIST_KEY = '@CloudKidd_wishlist';
const ADDRESSES_KEY = '@CloudKidd_addresses';

export const cartStorage = {
  async getCart(): Promise<CartItem[]> {
    try {
      const data = await AsyncStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  },

  async addToCart(item: CartItem): Promise<void> {
    try {
      const cart = await this.getCart();
      const existingIndex = cart.findIndex(
        i => i.product.id === item.product.id &&
        i.selectedSize === item.selectedSize &&
        i.selectedColor === item.selectedColor
      );

      if (existingIndex >= 0) {
        cart[existingIndex].quantity += item.quantity;
      } else {
        cart.push(item);
      }

      await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  },

  async updateQuantity(itemId: string, quantity: number): Promise<void> {
    try {
      const cart = await this.getCart();
      const index = cart.findIndex(i => i.id === itemId);

      if (index >= 0) {
        if (quantity <= 0) {
          cart.splice(index, 1);
        } else {
          cart[index].quantity = quantity;
        }
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  },

  async removeFromCart(itemId: string): Promise<void> {
    try {
      const cart = await this.getCart();
      const filtered = cart.filter(i => i.id !== itemId);
      await AsyncStorage.setItem(CART_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  },

  async clearCart(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CART_KEY);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  },
};

export const wishlistStorage = {
  async getWishlist(): Promise<Product[]> {
    try {
      const data = await AsyncStorage.getItem(WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      return [];
    }
  },

  async addToWishlist(product: Product): Promise<void> {
    try {
      const wishlist = await this.getWishlist();
      if (!wishlist.find(p => p.id === product.id)) {
        wishlist.push(product);
        await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      throw error;
    }
  },

  async removeFromWishlist(productId: string): Promise<void> {
    try {
      const wishlist = await this.getWishlist();
      const filtered = wishlist.filter(p => p.id !== productId);
      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      throw error;
    }
  },

  async isInWishlist(productId: string): Promise<boolean> {
    try {
      const wishlist = await this.getWishlist();
      return wishlist.some(p => p.id === productId);
    } catch (error) {
      console.error('Failed to check wishlist:', error);
      return false;
    }
  },
};

export const addressStorage = {
  async getAddresses(): Promise<Address[]> {
    try {
      const data = await AsyncStorage.getItem(ADDRESSES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load addresses:', error);
      return [];
    }
  },

  async saveAddress(address: Address): Promise<void> {
    try {
      const addresses = await this.getAddresses();
      const index = addresses.findIndex(a => a.id === address.id);

      if (index >= 0) {
        addresses[index] = address;
      } else {
        addresses.push(address);
      }

      if (address.isDefault) {
        addresses.forEach(a => {
          if (a.id !== address.id) {
            a.isDefault = false;
          }
        });
      }

      await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
    } catch (error) {
      console.error('Failed to save address:', error);
      throw error;
    }
  },

  async deleteAddress(addressId: string): Promise<void> {
    try {
      const addresses = await this.getAddresses();
      const filtered = addresses.filter(a => a.id !== addressId);
      await AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete address:', error);
      throw error;
    }
  },
};
