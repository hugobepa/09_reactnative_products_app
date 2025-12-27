"constant/theme.ts" add "primary":

```
export const Colors = {
  light: {
   ....

    primary: "#3D64F4",
  },
  dark: {
    ....
    primary: "#3D64F4",
  },
};

```

use color en "app/index.tsx":

```
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";

const HomeScreen = () => {
const primary = useThemeColor({}, "primary");

  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "Kanit_700Bold", color: primary }}>
        HomeScreen
      </ThemedText>
```
