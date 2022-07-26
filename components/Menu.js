import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import { Alert, Share } from "react-native";
import Papa from "papaparse";
import { DocumentDirectoryPath, writeFile } from "react-native-fs";
import { Buffer } from "buffer";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../data/cartSlice";
import tw from "twrnc";

function Menu (props){
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const cart = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const metadata = useSelector((state) => state.metadata);
  const dispatch = useDispatch();
  if(settings.postmarkAPIKey) {
    var postmark = require("postmark");
    var client = new postmark.ServerClient(settings.postmarkAPIKey);
  }else{
    var client = null;
  }

  function cartToCSV(cart) {
    let elements = cart.filter((item) => item.quantity !== 0).map((item) => {
      return {
        id: item.id, title: item.title, quantity: item.quantity, billingUnit: item.billingUnit,
      };
    });
    if(elements.length === 0) {
      Alert.alert("The cart is empty.");
      return false;
    }
    let csv = Papa.unparse({ data: elements, fields: ["id", "title", "quantity", "billingUnit"] });
    return csv;
  }

  function shareCart() {
    let csv = cartToCSV(cart);
    if(csv === false) { return; }
    writeFile(DocumentDirectoryPath + "/cart.csv", csv, "utf8").then(() => {
      Share.share({
        url: "file://" + DocumentDirectoryPath + "/cart.csv",
      });
    }).catch((err) => {
      Alert.alert("Error", "Something went wrong saving your cart.", [{ text: "OK" }]);
    });
  }

  function emailCart(){
    if(client === null) {
      Alert.alert("Error", "You need to set up a Postmark API key to send emails.", [{ text: "OK" }]);
      return;
    }
    let csv = cartToCSV(cart);
    if(csv === false) { return; }

    client.sendEmail({
      "From": settings.emailSender,
      "To": settings.emailRecipients,
      "Subject": `${metadata.customerName} — ref. ${metadata.refNumber}`,
      "TextBody": "A report is attached.",
      "Attachments": [{
        "Name": `${metadata.customerName}-${metadata.refNumber}.csv`, // convert to base64 string
        "Content": Buffer.from(csv).toString("base64"), "ContentType": "text/csv",
      }],
    }).then((response) => {
      console.log(response);
      if (response.ErrorCode === 0) {
        Alert.alert("Message sent!");
      } else {
        Alert.alert("Error sending message", response.Message);
      }
    });
  }

  function initializeCart() {
    dispatch(cartSlice.actions.initialize(settings.items));
  }
  return (
        <FAB.Group
          fabStyle={
            {
              backgroundColor: '#3f51b5',
            }
          }
          open={open}
          icon={open ? 'close' : 'menu'}
          actions={[
            { icon: 'cog', label: 'Settings', onPress: props.openSettings},
            { icon: 'email', label: 'Email cart', onPress: emailCart},
            { icon: 'share', label: 'Share cart', onPress: shareCart },
            { icon: 'delete', label: 'Reset cart', onPress: () => Alert.alert(
                "Are you sure?",
                null,
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Reset cart", onPress: initializeCart },
                ],
                { cancelable: false }

              ), style: { backgroundColor: '#f44336' } },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
  );
};

export default Menu;
