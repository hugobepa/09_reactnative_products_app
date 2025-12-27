import { ThemedText } from "@/presentation/theme/components/themed-text";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "Kanit_700Bold" }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "Kanit_400Regular" }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "Kanit_100Thin" }}>
        HomeScreen
      </ThemedText>
    </View>
  );
};

export default HomeScreen;
