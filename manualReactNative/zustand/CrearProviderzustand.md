https://zustand.docs.pmnd.rs/getting-started/introduction

0. crear typos para poder trabajar (./infrastructure/interface/location.ts):

```
export enum PermissionStatus {
  CHECKING = "CHECKING",
  GRANTED = "GRANTED",
}
```

1. crear funciones de trabajo (./core/actions/nombreCarp/nombreFichero.ts):

```
import { PermissionStatus } from "@/infrastructure/interfaces/location"; //tipos de permisos
import * as Location from "expo-location";

export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {


    return PermissionStatus.GRANTED;
  };

export const checktLocationPermission = async () => {
  const { status } = await Location.getBackgroundPermissionsAsync();

  switch (status) {
    case "granted":
      return PermissionStatus.GRANTED
  }
};

```

termninal: npm install zunstand

2. crear store zustand (./presentation/store/useXXXX.ts):

```
import {
  //importar metodos
} from "@/core/actions/permissions/location";
import { create } from "zustand";
import { PermissionStatus } from "../../infrastructure/interfaces/location"; //importar tipos

interface PermissionState {
  locationStatus: PermissionStatus;

  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
  clearWatchLocation: () => void;
}

export const usePermissionStore = create<PermissionState>()((set,get) => ({
  locationStatus: PermissionStatus.CHECKING,

  requestLocationPermission: async () => {
    const status = await requestLocationPermission();

    set({ locationStatus: status });

    return status;
  },
  checkLocationPermission: async () => {
    const status = await checktLocationPermission();

    set({ locationStatus: status });

    return status;
  },

   watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionID;
    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }



}));



```

3. crear Provider (/presentation/providers/PermissionsCheckerProvider.tsx)

```
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { router } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { usePermissionStore } from "../store/usePermissions";

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/map");
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace("/permissions");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);


  return <>{children}</>;
};

export default PermissionsCheckerProvider;
```

4. poner en el punto mas alto de la cadena (/app/layout):

```
import PermissionsCheckerProvider from "@/presentation/providers/PermissionsCheckerProvider";


return (

      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PermissionsCheckerProvider>
          <Stack screenOptions={{ headerShown: false }}>
          .....
        </PermissionsCheckerProvider>

```
