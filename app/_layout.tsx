import { useColorScheme } from "@/presentation/theme/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
//import {Kanit_400Regular, useFonts } from 'expo-font';

//import { useColorScheme } from '@/hooks/use-color-scheme';

// const [loaded] = useFonts({
//     // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
//     KanitBold: require('../assets/fonts/Kanit-Bold.ttf'),
//     KanitThin: require('../assets/fonts/Kanit-Thin.ttf'),
//   });

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
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
