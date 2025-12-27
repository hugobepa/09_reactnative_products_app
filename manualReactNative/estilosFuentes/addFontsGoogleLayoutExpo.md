https://medium.com/@rudrakshkanungo2022/how-to-use-googlefonts-in-expo-react-native-98e6a3db5613
https://www.youtube.com/watch?v=LBmsecuEXNQ
https://fonts.google.com/

instalacion:

npx expo install expo-font @expo-google-fonts/name_of_font

npx expo install expo-font @expo-google-fonts/kanit

bajar la fuente de google,poner funte en carpeta "/assets/fonts/"

1. primera config :"app/\_layout.tsx",cargando paquete "@expo-google-fonts" llamara a la fuente:

```
//import { useFonts } from 'expo-font'; //opcional
import{useFonts,Kanit_400Regular,Kanit_700Bold,Kanit_100Thin}from "@expo-google-fonts/kanit"
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

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


```

2. segunda config :"app/\_layout.tsx". Sin cargar el paquete de expo-google-font, llamara a la fuente:

```
import { useFonts } from 'expo-font'; //opcional
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    // Kanit_400Regular,
    // Kanit_700Bold,
    // Kanit_100Thin,
    KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
    KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


```

"/app/index.tsx" utilizar fuente:

```
return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "Kanit_700Bold" }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitBold" }}>
        HomeScreen
      </ThemedText>


```
