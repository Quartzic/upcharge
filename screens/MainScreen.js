import {
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import tw from "twrnc";
import SectionedItemsList from "../components/ItemViews";
import Menu from "../components/Menu";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../data/cartSlice";
import { DocumentDirectoryPath, writeFile } from "react-native-fs";
import { MetadataView } from "../components/MetadataView";
import { emailCart, shareCart } from "../data/cartExport";
import settingsSlice from "../data/settingsSlice";

export default function MainScreen({ navigation }) {

  const cart = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const metadata = useSelector((state) => state.metadata);
  let dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const isDarkMode = useColorScheme() === "dark";
  if(settings === settingsSlice.getInitialState()) {
    Alert.alert("Welcome to Upcharge", "Please download a configuration file.", [{ text: "OK", onPress: () => navigation.navigate("Settings") }]);
  }
  return (<><StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
    <SafeAreaView style={tw`dark:bg-black`}>
      <View style={tw`flex flex-col h-full`}>
        {/*
        <TextInput
          style={tw`w-64 h-12 m-6 px-3 text-2xl border bg-white dark:bg-gray-100 dark:text-white shadow-md`}
          placeholder={"Reference Number"} placeholderTextColor={isDarkMode ? "black" : "white"}
          autoComplete={"off"} autoCorrect={false} />*/}
        <View style={tw`flex-1 flex flex-row p-4`}>
          <View style={{ ...tw`m-2 flex flex-col` }}>

            <MetadataView />

            <ScrollView style={tw`bg-white dark:bg-neutral-900 rounded-lg shadow-md p-4`}>
              {cart.length > 0 ? <SectionedItemsList items={cart} categories={settings.categories} /> :
                <Text style={tw`dark:text-white`}>No items available. Check the app configuration.</Text>}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
    <Menu openSettings={() => {
      navigation.navigate("Settings");
    }}  /></>);
}
