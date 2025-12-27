import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
//import { useFonts } from "expo-font";
import {
  Kanit_100Thin,
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
//import{AppLoading}from "expo"

//import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontloaded, fonterror] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
    Kanit_100Thin,
    KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
    KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
  });

  useEffect(() => {
    if (fontloaded || fonterror) {
      SplashScreen.hideAsync();
    }
  }, [fontloaded, fonterror]);

  if (!fontloaded && !fonterror) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        /> */}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
