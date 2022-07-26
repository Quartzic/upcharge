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
import { store } from "./data/store";
import { PersistGate } from "redux-persist/integration/react";
import MainScreen from "./screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from "./screens/SettingsScreen";

const persistor = persistStore(store);
const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={MainScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
  );
};

export default App;
