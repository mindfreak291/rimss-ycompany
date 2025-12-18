import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem, Product } from '@/types';

interface AddToCartPayload {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const initialState: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, quantity, selectedColor, selectedSize } = action.payload;
      
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedColor,
          selectedSize,
        });
      }

      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: number }>
    ) => {
      const { index, quantity } = action.payload;
      if (quantity <= 0) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity = quantity;
      }
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;