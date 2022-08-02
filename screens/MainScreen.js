import {
  Alert, KeyboardAvoidingView, Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native";
import tw from "twrnc";
import SectionedItemsList from "../components/ItemViews";
import Menu from "../components/Menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MetadataView } from "../components/MetadataView";
import settingsSlice from "../data/settingsSlice";
import ScanModal from "./ScanModal";

export default function MainScreen({ navigation }) {

  const cart = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  let [modalVisible, setModalVisible] = useState(false);
  let [modalCallback, setModalCallback] = useState(null);

  const isDarkMode = useColorScheme() === "dark";
  if (settings === settingsSlice.getInitialState()) {
    Alert.alert("Welcome to Upcharge", "Please download a configuration file.", [{
      text: "OK",
      onPress: () => navigation.navigate("Settings"),
    }]);
  }

  return (<>
    <Modal
      animationType={"slide"}
      presentationStyle={"formSheet"}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      style={{ width: "100%", alignSelf: "center", height: "100%", justifyContent: "flex-start", position: "relative"}}
    >
          <View style={tw`bg-white shadow-lg rounded-lg m-4`}>
            <ScanModal callback={
              (data) => {
                setModalVisible(false);
                modalCallback(data);
              }
            }
            close={() => {setModalVisible(false);}}/>
          </View>
    </Modal>
    <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

    <SafeAreaView style={tw`dark:bg-black`}>

      <KeyboardAvoidingView behavior={"height"} style={tw`flex flex-col h-full`}>
        <View style={tw`flex-1 flex flex-row p-4`}>
          <View style={{ ...tw`m-2 flex flex-col` }}>
            <MetadataView openModal={(callback) => {
              setModalCallback(() => callback);
              setModalVisible(true);
            }}/>
            <ScrollView style={tw`bg-white dark:bg-neutral-900 rounded-lg shadow-md p-4`}>
              {cart.length > 0 ? <SectionedItemsList items={cart} categories={settings.categories} /> :
                <Text style={tw`dark:text-white`}>No items available. Check the app configuration.</Text>}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    <Menu openSettings={() => {
      navigation.navigate("Settings");
    }} />
  </>);
}
