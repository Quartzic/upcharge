import { View } from "react-native";
import tw from "twrnc";
import { TextInput } from "react-native-paper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import metadataSlice from "../data/metadataSlice";
export function MetadataView() {

  const metadata = useSelector((state) => state.metadata);
  let dispatch = useDispatch();

  return <View style={tw`flex flex-row mb-4 p-4 bg-white rounded-lg shadow-md flex-wrap`}>
    <View style={tw`w-full sm:w-1/2`}>
      <TextInput
        label="Reference Number"
        value={metadata.refNumber}
        onChangeText={(text) => dispatch(metadataSlice.actions.setRefNumber(text))}
        style={tw`h-10 mx-2 mb-2 sm:mb-0 justify-center`}
        mode={"outlined"}
      />
    </View>
    <View style={tw`w-full sm:w-1/2`}>
      <TextInput
        label="Customer Name"
        value={metadata.customerName}
        onChangeText={(text) => dispatch(metadataSlice.actions.setCustomerName(text))}
        style={tw`h-10 mx-2 mt-2 sm:mt-0 justify-center`}
        mode={"outlined"}
      />
    </View>
  </View>;
}
