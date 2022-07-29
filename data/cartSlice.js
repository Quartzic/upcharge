import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const cartSlice = createSlice({

  name: "cart",
  // the initial state should have one element per item
  initialState: [],
  reducers: {
    add: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if(item.quantity < 9999){
        item.quantity ++;
      }
    },
    subtract: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      item.quantity--;
    },
    updateItem: (state, action) => {
      // find the item in the state and update its quantity
      const item = state.find((i) => i.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },
    initialize: (state, action) => {
      // ensure that a cart was passed in
      if(action.payload) {
        return action.payload.map((item) => {
          // ensure all items have a quantity
          if(item.quantity === undefined) {
            return {
              ...item,
              quantity: 0
            }
          } else {
            return item;
          }
        });
      } else {
        return [];
      }
    }
  },
});

export default cartSlice;
