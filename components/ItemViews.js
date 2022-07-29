import React, { useEffect, useState } from "react";
import {
  FlatList, Text, View, Alert, Pressable, Button, TextInput,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


import { FlatGrid } from "react-native-super-grid";
import { useDeviceContext } from "twrnc";
import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialIcons";
import pluralize from "pluralize";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../data/cartSlice";



function RoundButton(props: { iconName: any, onPress: any }) {
  return <Pressable style={({ pressed }) => {
    return { ...(pressed ? tw`bg-neutral-300 dark:bg-neutral-700` : tw`bg-neutral-200 dark:bg-neutral-800`), ...tw`rounded-lg` };
  }} hitSlop={10} onPress={props.onPress}>
    <Icon name={props.iconName} size={48} style={tw`dark:text-white`} />
  </Pressable>;
}

function Item(props: { item: any }) {
  useDeviceContext(tw);
  let dispatch = useDispatch();

  if (props.item.quantity === 0) {
    // return a grayed-out card
    return (<Pressable style={{
      ...tw`p-2 w-full md:w-1/3 lg:w-1/4`,
    }}
                       onPress={() => {
                         dispatch(cartSlice.actions.add({ id: props.item.id }));
                       }}>
      <View style={tw`p-2 py-4 bg-gray-100 dark:bg-neutral-800 rounded-lg flex-col border-gray-300 dark:border-neutral-600 border rounded-lg justify-center h-26 sm:h-36`}>
        <Text style={tw`text-xl text-neutral-500 font-bold text-center`}>{props.item.title}</Text>
      </View>
    </Pressable>);

  }
  return (<View
      style={{
        ...tw`p-2 w-full md:w-1/3 lg:w-1/4`,
      }}
    >
      <View style={tw`p-2 bg-white dark:bg-neutral-600 rounded-lg shadow-md flex-col justify-between h-26 sm:h-36`}>
        <Text style={tw`text-xl font-bold text-center dark:text-white`}>{props.item.title}</Text>
        <View style={tw`flex-row justify-between items-center rounded-lg px-4`}>
          <RoundButton iconName="remove" onPress={() => {
            dispatch(cartSlice.actions.subtract({ id: props.item.id }));
          }} />
          <View style={tw`flex-col px-2 py-2`}>
            <TextInput keyboardType='number-pad' style={tw`text-3xl text-center flex-auto dark:text-white`} onChangeText={(value) => {
              dispatch(cartSlice.actions.updateItem({id: props.item.id, quantity: value}))
            }} onEndEditing={(value) => {
              dispatch(cartSlice.actions.updateItem({id: props.item.id, quantity: !isNaN(parseInt(value.nativeEvent.text)) ? parseInt(value.nativeEvent.text) : 0}))
            }} value={props.item.quantity.toString()} maxLength={4} hitSlop={1}/>
            <Text
              style={tw`hidden sm:flex text-sm text-center flex-auto dark:text-white`}>{props.item.billingUnit && pluralize(props.item.billingUnit, props.item.quantity)}</Text>
          </View>
          <RoundButton iconName="add" onPress={() => {
            dispatch(cartSlice.actions.add({ id: props.item.id }));
          }} />
        </View>
      </View>
    </View>

  );
}

function ItemsSection(props) {
  return (<View style={tw`my-4`}>

    <Text style={tw`mx-2 text-xl font-bold dark:text-white`}>
      {props.title}
    </Text>
    <View style={tw`flex flex-row flex-wrap`}>
      {props.items.map((item, index) => {
        return (<Item
          key={index}
          item={item}
        />);
      })}
    </View>
  </View>);
}

function SectionedItemsList(props: { items: any[], categories: any[] }) {
  // for every category, display a section with all the items in that category

    let sections = props.categories.map((category, index) => {
      return <ItemsSection key={index} title={category.title}
                           items={props.items.filter(item => item.category === category.id)} />;
    });

    let uncategorizedItems = props.items.filter(item => item.category === undefined);
    if(uncategorizedItems.length > 0) {
      sections.push(<ItemsSection key={sections.length} title="Uncategorized"
                           items={uncategorizedItems} />);
    }

    return sections;
  }


export default SectionedItemsList;
