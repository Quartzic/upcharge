import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const metadataSlice = createSlice({

  name: "metadata",
  // the initial state should have one element per item
  initialState: {
    refNumber: "",
    customerName: "",
  },
  reducers: {
    setRefNumber: (state, action) => {
      state.refNumber = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    }
  },
});

export default metadataSlice;
