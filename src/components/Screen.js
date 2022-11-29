import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({ title, children }) => (
  <SafeAreaView
    style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
  >
    <Text>{title}</Text>
    {children}
  </SafeAreaView>
);

export default Screen;
