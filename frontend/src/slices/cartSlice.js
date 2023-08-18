import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const cartSlice = createSlice({
  name: "cart",
  initialState: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItem: [], shippingAddress: {}, paymentMethod: "Paypal" },
  reducers: {
    addToCart: (state, action) => {
      const currentItem = action.payload;
      const itemExist = state.cartItem.find((item) => item._id === currentItem._id);

      if (itemExist) {
        state.cartItem = state.cartItem.map((item) =>
          item._id === itemExist._id ? currentItem : item
        );
      } else {
        state.cartItem = [...state.cartItem, currentItem];
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItem = [];
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
