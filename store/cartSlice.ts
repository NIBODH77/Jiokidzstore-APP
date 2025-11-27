import { Product, CartItem } from '@/data/types';

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export interface AddToCartPayload {
  product: Product;
  quantity?: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: AddToCartPayload;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string;
}

export interface UpdateCartItemAction {
  type: typeof UPDATE_CART_ITEM;
  payload: {
    productId: string;
    quantity: number;
  };
}

export interface ClearCartAction {
  type: typeof CLEAR_CART;
}

export type CartAction = AddToCartAction | RemoveFromCartAction | UpdateCartItemAction | ClearCartAction;

// Selectors
export const selectCartItems = (state: CartState) => state.items;
export const selectCartTotalItems = (state: CartState) => state.totalItems;
export const selectCartTotalPrice = (state: CartState) => state.totalPrice;

// Reducer
export function cartReducer(state = initialState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find((item) => item.product.id === action.payload.product.id);

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + (action.payload.quantity || 1),
          totalPrice: state.totalPrice + action.payload.product.price * (action.payload.quantity || 1),
        };
      }

      const newItem: CartItem = {
        id: action.payload.product.id,
        product: action.payload.product,
        quantity: action.payload.quantity || 1,
        selectedSize: action.payload.selectedSize,
        selectedColor: action.payload.selectedColor,
      };

      return {
        ...state,
        items: [...state.items, newItem],
        totalItems: state.totalItems + (action.payload.quantity || 1),
        totalPrice: state.totalPrice + action.payload.product.price * (action.payload.quantity || 1),
      };
    }

    case REMOVE_FROM_CART: {
      const itemToRemove = state.items.find((item) => item.product.id === action.payload);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - itemToRemove.product.price * itemToRemove.quantity,
      };
    }

    case UPDATE_CART_ITEM: {
      const itemToUpdate = state.items.find((item) => item.product.id === action.payload.productId);
      if (!itemToUpdate) return state;

      const quantityDifference = action.payload.quantity - itemToUpdate.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalItems: state.totalItems + quantityDifference,
        totalPrice: state.totalPrice + itemToUpdate.product.price * quantityDifference,
      };
    }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}

// Action creators with proper Redux types
export function addToCart(
  product: Product,
  quantity = 1,
  selectedSize?: string,
  selectedColor?: string
) {
  return {
    type: ADD_TO_CART as const,
    payload: { product, quantity, selectedSize, selectedColor } as AddToCartPayload,
  };
}

export function removeFromCart(productId: string) {
  return {
    type: REMOVE_FROM_CART as const,
    payload: productId,
  };
}

export function updateCartItem(productId: string, quantity: number) {
  return {
    type: UPDATE_CART_ITEM as const,
    payload: { productId, quantity },
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART as const,
  };
}
