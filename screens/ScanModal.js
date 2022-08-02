import * as React from 'react';

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCameraDevices, useFrameProcessor } from "react-native-vision-camera";
import { Camera } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes } from "vision-camera-code-scanner";
import tw from "twrnc";
import { runOnJS } from "react-native-reanimated";
import { useEffect } from "react";

export default function ScanModal(props) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [barcodes, setBarcodes] = React.useState([]);

  useEffect(() => {
    if(barcodes.length > 0) {
      props.callback(barcodes[0].rawValue);
    }
  }, [barcodes]);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], { checkInverted: true });
    runOnJS(setBarcodes)(detectedBarcodes);
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();

      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <View style={tw`w-full h-full flex flex-col relative`}>

        <Pressable onPress={props.close} style={tw`absolute top-2 right-2 z-10 bg-black text-white opacity-50 p-4 rounded-full`}>
          <Text style={tw`text-white`}>Cancel</Text>
        </Pressable>
        <Camera
          style={tw`flex-1 rounded-lg absolute top-0 left-0 right-0 bottom-0`}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
      </View>
    )
  );
}
