import { Alert, SafeAreaView, ScrollView, Share, StatusBar, Text, useColorScheme, View } from "react-native";
import tw from "twrnc";
import SectionedItemsList from "../components/ItemViews";
import Menu from "../components/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../data/cartSlice";
import { DocumentDirectoryPath, writeFile } from "react-native-fs";
import { MetadataView } from "../components/MetadataView";
import { emailCart, shareCart } from "../data/cartExport";

export default function MainScreen({ navigation }) {

  const isDarkMode = useColorScheme() === "dark";

  const cart = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const metadata = useSelector((state) => state.metadata);

  let dispatch = useDispatch();

  return (<><StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
    <SafeAreaView>
      <View style={tw`flex flex-col h-full`}>
        {/*
        <TextInput
          style={tw`w-64 h-12 m-6 px-3 text-2xl border bg-white dark:bg-gray-100 dark:text-white shadow-md`}
          placeholder={"Reference Number"} placeholderTextColor={isDarkMode ? "black" : "white"}
          autoComplete={"off"} autoCorrect={false} />*/}
        <View style={tw`flex-1 flex flex-row p-4`}>
          <View style={{ ...tw`m-2 flex flex-col` }}>

            <MetadataView />

            <ScrollView style={tw`bg-white rounded-lg shadow-md p-4`}>
              {cart.length > 0 ? <SectionedItemsList items={cart} categories={settings.categories} /> :
                <Text>No items available. Check the app configuration.</Text>}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
    <Menu openSettings={() => {
      navigation.navigate("Settings");
    }}  /></>);
}
