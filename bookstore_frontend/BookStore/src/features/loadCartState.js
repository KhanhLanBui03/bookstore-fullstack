// utils/localStorage.js
export const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Load cart from localStorage failed', e);
    return undefined;
  }
};

export const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn('Save cart to localStorage failed', e);
  }
};
