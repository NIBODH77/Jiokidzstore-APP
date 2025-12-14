import { createStore, combineReducers } from 'redux';
import { cartReducer, CartState } from './cartSlice';

export interface RootState {
  cart: CartState;
}

const rootReducer = combineReducers({
  cart: cartReducer,
});

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
