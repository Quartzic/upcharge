import { createSlice } from "@reduxjs/toolkit";
import items  from "../data/items";

const initialState = items.map((item) => {
  return {
    ...item,
    quantity: 0,
  };
})

const cartSlice = createSlice({
  name: "cart",
  // the initial state should have one element per item
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      item.quantity++;
    },
    subtract: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      item.quantity--;
    },
    update: (state, action) => {
      // find the item in the state and update its quantity
      const item = state.find((i) => i.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },
    reset: () => {
      return initialState;
    },
  },
});

export default cartSlice;
