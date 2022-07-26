import React, { Component, useEffect, useLayoutEffect } from "react";

import {
  Text, TouchableOpacity, Linking, Platform, Alert, Pressable, View, ScrollView,
} from "react-native";
import tw from "twrnc";
import { Switch, TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import settingsSlice from "../data/settingsSlice";
import cartSlice from "../data/settingsSlice";
function SettingsScreen(props) {
  const { navigation } = props;

  const settings = useSelector((state) => state.settings);
  let dispatch = useDispatch();

  return (<View style={tw`flex flex-col flex-1`}>
    <View style={tw`bg-white m-8 rounded-lg p-8 flex flex-col flex-1`}>

      <View style={tw`my-4`}>
        <View style={tw`flex flex-row items-center flex-wrap sm:flex-nowrap`}>
        <TextInput onChangeText={
          (text) => {
            dispatch(settingsSlice.actions.setUpdateURL(text));
          }
        }
        mode={"outlined"}
        label={"Update URL"}
        value={settings.updateURL}
        style={tw`w-full sm:flex-1 sm:mr-8`}/>
        <Button onPress={
          () => {
            fetch(settings.updateURL).then(r => {
              if(r.ok) {
                // convert response body to json
                r.json().then(data => {
                  dispatch(settingsSlice.actions.update(data));
                  Alert.alert("Settings updated", "Reset the cart to see changed items.");

                }).catch(
                  () => {
                    Alert.alert("Parsing error", `Invalid JSON`);
                  }
                );
              } else {
                Alert.alert("Invalid response", "Couldn't download data");
              }
            }).catch(
              () => {
                Alert.alert("Fetch error", "Couldn't download data");
              }
            );
          }
        } mode={"outlined"}
        style={tw`w-full mt-6 sm:mt-0 sm:w-auto`}>
          Download Content
        </Button>
        </View>
      </View>

      <View style={tw`my-4 flex flex-col flex-1`}>
        <Text style={tw`text-xl font-bold mb-2`}>Current Configuration</Text>
        <ScrollView>
          <Text style={{fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'}} selectable={true}>
            {
              JSON.stringify(settings, null, 2)
            }
          </Text>
        </ScrollView>
      </View>

    </View>
    </View>);
}

export default SettingsScreen;
