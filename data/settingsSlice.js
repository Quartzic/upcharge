import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  categories: [],
  emailRecipients: [],
  emailSender: "",
  postmarkAPIKey: "",
  updateURL: "",
}

const settingsSlice = createSlice({
  name: "settings",
  // the initial state should have one element per item
  initialState: initialState,
  reducers: {
    update: (state, action) => action.payload,
    setUpdateURL: (state, action) => {
      state.updateURL = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export default settingsSlice
