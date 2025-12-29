helpers\adapters\secure.adapter.ts :

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

conexion,"core\api\productsApi.ts":

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

"core\auth\actions\auth-actions.ts":

```
import { productsApi } from "@/core/api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (data: AuthResponse): { user: User; token: string } => {
  const { id, email, fullName, isActive, roles, token } = data;
  //const{token,...rest}=data;

  const user: User = { id, email, fullName, isActive, roles };

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log({ error });
    //throw new Error("User and/or password not valid");
    return null;
  }
};


```

crear store,"presentation\auth\store\useAuthStore.ts":

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

}));

```

utilizar "useAuthStore" en "app\auth\login\index.tsx":

```
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { router } from "expo-router";
import React, { useState } from "react";
import {Alert,KeyboardAvoidingView,ScrollView,View} from "react-native";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    const { email, password } = form;
    console.log({ email, password });
    if (email.length === 0 || password.length === 0) {
      return;
    }

    const wasSuccessful = await login(email, password);
    if (wasSuccessful) {
      router.replace("/");
      return;
    }
    Alert.alert("Error", "Usuario o contraseña no son correctos");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollVie>
        <View style={{ paddingTop: height * 0.25 }}>
        </View>
        {/**email y password */}
        <View>
          <ThemedTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <View style={{ marginTop: 10 }} />
          {/**Boton */}
          <ThemedButton
            disabled={isPosting}
            onPress={onLogin}
            icon="arrow-forward-outline"
          >
            Ingresar
          </ThemedButton>
        </View>
      </ScrollVie>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

```
