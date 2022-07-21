import { Linking, SafeAreaView, Share, StatusBar, TextInput, useColorScheme, View } from "react-native";
import tw from "twrnc";
import SectionedItemsList from "./ItemViews";
import Menu from "./Menu";
import React from "react";
import { useSelector } from "react-redux";
import Section from "./Section";
import { useDispatch } from "react-redux";
import cartSlice from "../redux/cartSlice";
function cartToShareableString(cart) {
  return cart.filter((item) => item.quantity !== 0).map(( item ) => `${item.title} x ${item.quantity}`).join("\n");
}
export default function MainView(props) {

  const isDarkMode = useColorScheme() === "dark";
  const cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  return (
    <><StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
    <SafeAreaView>
      <View style={tw`flex flex-col h-full`}>
        {/*
        <TextInput
          style={tw`w-64 h-12 m-6 px-3 text-2xl border bg-white dark:bg-gray-100 dark:text-white shadow-md`}
          placeholder={"Reference Number"} placeholderTextColor={isDarkMode ? "black" : "white"}
          autoComplete={"off"} autoCorrect={false} />*/}
        <View style={tw`flex-1 flex flex-row p-4`}>
          <Section title="Project Extracurricular" style={tw`flex-1`}>
            <SectionedItemsList items={cart} />

          </Section>

        </View>
      </View>
    </SafeAreaView>
    <Menu clearCart={() => dispatch(
      cartSlice.actions.reset()
      )} shareCart={() => {
      Share.share({ message: cartToShareableString(cart) });
    }} emailCart={ () => {
      let URL = `mailto:?subject=Check out my cart&body=${cartToShareableString(cart)}`
      Linking.openURL(URL);
    } }/></>);
}
