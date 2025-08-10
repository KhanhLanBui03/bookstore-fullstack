// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { saveCartState } from './loadCartState';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 🔁 Lưu vào localStorage mỗi khi cart thay đổi
store.subscribe(() => {
  saveCartState(store.getState().cart); // <-- Lưu giỏ hàng mỗi khi có thay đổi
});

export default store;
