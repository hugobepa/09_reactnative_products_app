import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({ icon, ...rest }: Props) => {
  return (
    <View>
      <Text>ThemedTextInput</Text>
    </View>
  );
};

export default ThemedTextInput;
