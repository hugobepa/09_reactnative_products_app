//https://tanstack.com/query/v4/docs/framework/react/guides/mutations
https://tanstack.com/query/v4/docs/framework/react/reference/useMutation

1. crear un hook con tanStackQueryProduct, " presentation\products\hooks\useProduct.ts ":

```
import { Product } from "@/core/products/interface/product.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {

.....
  //mutacion
  const productMutacion = useMutation({
    mutationFn: async (data: Product) => {
      //TODO:disparar la ccion guardar
      console.log({ data });
      return data;
    },
    onSuccess(data: Product) {
      //TODO: Invalidar products queries
      Alert.alert("Producto guardado", `${data.title} se guardo correctamente`);
    },
  });


  return {
    productQuery,
    productMutacion,
  };
};
```

2. utilizar Mutatione en screen, "app\(products-app)\product\[id].tsx":

```
import { useProduct } from "@/presentation/products/hooks/useProduct";

const { productQuery, productMutacion } = useProduct(`${id}`);

return (
    <Formik
      initialValues={product}
      onSubmit={productMutacion.mutate}
    >

```

3. crear Acciones de crary actualizar, "core\products\actions\create-update-product.action.ts":

```

```
