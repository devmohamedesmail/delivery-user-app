import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selectors for cart
export const selectCart = (state: RootState) => state.cart;
export const selectCartStore = (state: RootState) => state.cart.store;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemQuantity = (state: RootState, itemId: string) => 
  state.cart.items.find(item => item.id === itemId)?.quantity || 0;

// Selectors for wishlist
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistTotalItems = (state: RootState) => state.wishlist.totalItems;
export const selectIsInWishlist = (state: RootState, itemId: string) =>
  state.wishlist.items.some(item => item.id === itemId);