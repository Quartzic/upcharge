import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE,} from 'redux-persist'
import cartSlice from "./cartSlice";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const reducers = combineReducers({
  cart: cartSlice.reducer,
});

const persistedRootReducer = persistReducer({
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
}, reducers);

let middlewares = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: middlewares,
})
