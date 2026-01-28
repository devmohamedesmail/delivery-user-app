import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  discount?: number;
  store_id: number;
  store_name?: string;
  selectedAttribute?: {
    name: string;
    value: string;
    price: number;
  };
}

interface CartState {
  store: any | null;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
}

const initialState: CartState = {
  store: null,
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  // const totalPrice = items.reduce((sum, item) => {
  //   const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
  //   return sum + (price * item.quantity);
  // }, 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = item.selectedAttribute ? item.selectedAttribute.price : item.price;
    return sum + (price * item.quantity);
  }, 0);

  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {


    addToCart: (state, action: PayloadAction<{ product: Omit<CartItem, 'quantity'>; store: any }>) => {
      const { product, store } = action.payload;

      // store not set yet → set it
      if (!state.store) {
        state.store = store;
      }

      // different store → don't allow
      if (state.store.id !== store.id) {
        return; // سنعالج التحذير من الـ UI
      }

      // same store → add item
      // Create unique key based on product id and selected attribute
      const uniqueKey = product.selectedAttribute 
        ? `${product.id}_${product.selectedAttribute.value}`
        : product.id;
      
      const existingItem = state.items.find(item => {
        const itemKey = item.selectedAttribute 
          ? `${item.id}_${item.selectedAttribute.value}`
          : item.id;
        return itemKey === uniqueKey;
      });

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },


    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.store = null;
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;