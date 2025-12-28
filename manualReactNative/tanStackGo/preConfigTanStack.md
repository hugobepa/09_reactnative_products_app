https://tanstack.com/query/latest/docs/framework/react/overview

0. crear interfaces "core\products\interface\product.interface.ts": - mediate postman copiamos respuesta json - VS -comand paletes --"paste json" y se copian los tipos json

```
import { User } from "@/core/auth/interface/user";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}
```

0. conecxion el api ya creada antes,"core\api\productsApi.ts":

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

1.  se crean las acciones (extraer datos del api),"core\products\actions":

        * "core\products\actions\get-products.action.ts":

```
        import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interface/product.interface";

const getProductsAction = async (limit = 20, offset = 0) => {
  try {
    const { data } = await productsApi.get<Product[]>("/products", {
      params: {
        limit,
        offset,
      },
    });
    return data.map((product) => ({
      ...product,
      images: product.images.map(
        (image) => `${API_URL}/files/product/${image}`
      ),
    }));
  } catch (error) {
    console.log({ error });
    throw new Error("Unable to load products");
  }
};

export default getProductsAction;


```

       * "core\products\actions\get-product-by-id.action.ts":

```

import { API_URL, productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

const getProductByIdAction = async (id: string): Promise<Product> => {
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);
    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  } catch (error) {
    console.log({ error });
    throw new Error(`Unable to load product ${id}`);
  }
};

export default getProductByIdAction;

```
