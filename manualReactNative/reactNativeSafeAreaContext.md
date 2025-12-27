https://docs.expo.dev/versions/latest/sdk/safe-area-context/
NO CAL INSTALAR
react-native-safe-area-context
import { useSafeAreaInsets,SafeAreaView } from "react-native-safe-area-context";
const safeArea = useSafeAreaInsets();
<View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}

---

import { SafeAreaView } from 'react-native-safe-area-context';

    <SafeAreaView>
      <View />
    </SafeAreaView>
