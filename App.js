/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import type { Node } from "react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainView from "./components/MainView";

const persistor = persistStore(store);

const App: () => Node = () => {

  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
    <MainView/>
        </PersistGate>
      </Provider>
  );
};

export default App;
