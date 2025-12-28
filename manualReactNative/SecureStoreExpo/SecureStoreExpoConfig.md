https://docs.expo.dev/versions/latest/sdk/securestore/
https://docs.expo.dev/versions/latest/sdk/securestore/#usage
https://www.npmjs.com/package/axios

0. instalar secure storage, terminal: npx expo install expo-secure-store

1. crear adapter de storage "helpers\adapters\secure.adapter.ts":

```
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export class SecureStorageAdapter {
  static async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log({ error });
      Alert.alert("ERROR", "Failed to save data");
    }
  }
  static async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log({ error });
      Alert.alert("ERROR", "Failed to get data");
      return null;
    }
  }
  static async deleteItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log({ error });
      Alert.alert("ERROR", "Failed to delete data");
    }
  }
}


```

2. utilizar Storage adapter, add "productsApi.interceptors.request.use(...)", " core\auth\api\productsApi.ts ":

```
import { SecureStorageAdapter } from "@/helpers/adapters/secure.adapter";
import axios from "axios";
import { Platform } from "react-native";
//TODO: conectar mediante envs vars, Android e IOS

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

console.log({ STAGE, [Platform.OS]: API_URL });

const productsApi = axios.create({
  baseURL: API_URL,
});

productsApi.interceptors.request.use(async (config) => {
  //verificar si tenemos un token en el secure storage
  const token = await SecureStorageAdapter.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { productsApi };
```

3. utilizar adapter en " presentation\auth\store\useAuthStore.ts":

add:

```
changeStatus: (token?: string, user?: User) => Promise<boolean>; //add Promise<>
await SecureStorageAdapter.setItem("token", token);
await SecureStorageAdapter.deleteItem("token"); //await depende donde
```

```
import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure.adapter";
import { create } from "zustand";
export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Properties
  status: "checking",
  token: undefined,
  user: undefined,

  //Actions

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({ status: "authenticated", token: token, user: user });

    await SecureStorageAdapter.setItem("token", token);

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    get().changeStatus(resp?.token, resp?.user);
  },
  logout: async () => {
    SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));

```

4. cerrar sesion "useAuthStore.logout()",botton custom "presentation\auth\components\LogoutIconButton.tsx":

```
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

const LogoutIconButton = () => {
  const primaryColor = useThemeColor({}, "primary");
  const { logout } = useAuthStore();

  return (
    <TouchableOpacity style={{ marginRight: 8 }} onPress={logout}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default LogoutIconButton;

```

5. cerrar sesion llamando "LogoutIconButton", " app\(products-app)\_layout.tsx":

```

import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";

 return (
    <Stack>
    <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
          headerShadowVisible: false,
          headerLeft: () => <LogoutIconButton />,
        }}
      />
    </Stack>
 )
```
