https://www.npmjs.com/package/axios

npm i axios

0. "core/auth/interface/user.ts",usuario nuestro creado:

```
export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
```

1. "/core/auth/api/productsApi.ts":

```
import axios from "axios";
//TODO: conectar mediante envs vars, Android e IOS
const productsApi = axios.create({
  baseURL: "localhost:3000/api",
});
//TODO: interceptores

export { productsApi };
```

2. "/core/auth/actions/auth-actions.ts":

```
import { productsApi } from "../api/productsApi";
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

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>("/auth/check-status");

    return returnUserToken(data);
  } catch (error) {
    return null;
  }
};

```

3. "presentation/auth/store/useAuthStore.ts" :

```
import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";
export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Properties
  status: "checking",
  token: undefined,
  user: undefined,

  //Actions

  changeStatus: (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      //TODO:LLAMAR LOGOUT
      return false;
    }

    set({ status: "authenticated", token: token, user: user });

    //TODO: guardar el token en el secure storage

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
    //TODO: clear token del secure storage
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));


```

# AÑADIENDO VARIABLES DE ENTORNO:

0. .env:

```
EXPO_PUBLIC_STAGE =dev

#windows ip cable: terminal: ipconfig -- adaptador ethernet ethernet --- Dirección IPv4
EXPO_PUBLIC_API_URL=http://Dirección IPv4:3000/api

EXPO_PUBLIC_API_URL_IOS=http://localhost:3000/api


#windows ip cable: terminal: ipconfig -- adaptador ethernet ethernet --- Dirección IPv4
EXPO_PUBLIC_API_URL_ANDROID=http://Dirección IPv4:3000/api
```

1. "/core/auth/api/productsApi.ts" add variables entorno:

```
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
//TODO: interceptores

export { productsApi };

```

# Verificar autentificacion(trabajo con status)

"app\(products-app)\_layout.tsx":

```
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const CheckAutenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (status === "unauthenticated") {
    //TODO: guardar ruta del usuario
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
        }}
      />
    </Stack>
  );
};

export default CheckAutenticationLayout;

```
