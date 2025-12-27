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

4. aa
