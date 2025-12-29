//https://tanstack.com/query/v4/docs/framework/react/guides/mutations
https://tanstack.com/query/v4/docs/framework/react/reference/useMutation

0. "core\api\productsApi.ts":

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

export { productsApi };
```

1. crear Acciones de crear y actualizar, "core\products\actions\create-update-product.action.ts":

```
import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interface/product.interface";

export const updateCreateProductAction = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};
const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      //todo esparcir imagenes
      ...rest,
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error("Error al actualizar el producto");
  }
};
const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {
    const { data } = await productsApi.post<Product>(`/products`, {
      //todo esparcir imagenes
      ...rest,
    });

    return data;
  } catch (error) {
    console.log({ error });
    throw new Error("Error al actualizar el producto");
  }
};

```

2 . crear un hook con tanStackQueryProduct, " presentation\products\hooks\useProduct.ts ":

```
import { updateCreateProductAction } from "@/core/products/actions/create-update-product.action";
import { Product } from "@/core/products/interface/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId); //new/UUID


  //mutacion
  const productMutacion = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProductAction({
        ...data,
        id: productIdRef.current,
      }), //:updateCreateProductAction,
    onSuccess(data: Product) {
      productIdRef.current = data.id;

      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] }); //lista productos
      queryClient.invalidateQueries({ queryKey: ["products", data.id] }); //producto
      Alert.alert("Producto guardado", `${data.title} se guardo correctamente`);
    },
  });



  return {
    productMutacion,
  };
};

```

3. utilizar Mutatione en screen, "app\(products-app)\product\[id].tsx":

```
import { useProduct } from "@/presentation/products/hooks/useProduct";

const { productQuery, productMutacion } = useProduct(`${id}`);

return (
    <Formik
      initialValues={product}
      onSubmit={productMutacion.mutate}
    >

```
