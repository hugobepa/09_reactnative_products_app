import React from "react";
import { ActivityIndicator, View } from "react-native";

const ThemedActivityIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={60} color={"violet"} />
    </View>
  );
};

export default ThemedActivityIndicator;
