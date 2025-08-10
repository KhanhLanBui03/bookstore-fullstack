import { createSlice } from "@reduxjs/toolkit";
import { loadCartState } from "./loadCartState";


const savedCart = loadCartState();

const initialState = savedCart || {
  items: [],
  total: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const item = action.payload;
      const existsItem = state.items.find(i => i.bookId === item.bookId);

      if (existsItem) {
        existsItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.total += 1;
      state.totalPrice += item.price;
    },

    decreaseItem: (state, action) => {
      const bookId = action.payload;
      const existsItem = state.items.find(i => i.bookId === bookId);
      if (!existsItem) return;

      existsItem.quantity -= 1;
      state.total -= 1;
      state.totalPrice -= existsItem.price;

      if (existsItem.quantity === 0) {
        state.items = state.items.filter(i => i.bookId !== bookId);
      }
    },

    removeItem: (state, action) => {
      const bookId = action.payload;
      const existsItem = state.items.find(i => i.bookId === bookId);
      if (!existsItem) return;

      state.total -= existsItem.quantity;
      state.totalPrice -= existsItem.quantity * existsItem.price;
      state.items = state.items.filter(i => i.bookId !== bookId);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItems, decreaseItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
