import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import React from "react";

export default function Section ({ children, title, style }) {
  return (
    <View style={{ ...tw`m-2 flex flex-col`, ...style }}>
      <Text
        style={tw`text-2xl font-bold my-2 dark:text-white`}>
        {title}
      </Text>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};
