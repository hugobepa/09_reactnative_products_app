https://tanstack.com/query/latest/docs/framework/react/overview
https://tanstack.com/query/latest/docs/framework/react/quick-start

0. instalar terminal: npm i @tanstack/react-query, npm i -D @tanstack/eslint-plugin-query (opcional)

1. provider al punto mas alto de la app para instalar lo, "app/\_layout.tsx ":

```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

 const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <GestureHandlerRootView
      style={{ backgroundColor: backgroundColor, flex: 1 }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        ....
        </ThemeProvider>
        </QueryClientProvider>
    </GestureHandlerRootView>

```

2. crear un hook con tanStackQueryProduct, " presentation\products\hooks\useProduct.ts ":

```
///http://localhost:3000/api/products/a51a6c52-d923-42fe-9785-19792b984fa1

import getProductByIdAction from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductByIdAction(productId),
    staleTime: 1000 * 60 * 60, //1h
  });

  return {
    productQuery,
  };
};
```

3. utilizar useProduct en screen dinamica,"app\(products-app)\product\[id].tsx":

- Error: Argument of type 'string | string[]' is not assignable to parameter of type 'string'.

```
const { id } = useLocalSearchParams();
const{}=useProduct(`${id}`);  //solucion
```

```
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ThemedActivityIndicator from "@/presentation/theme/components/ThemedActivityIndicator";
import { Text } from "@react-navigation/elements";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {FlatList,Image,Text} from "react-native";
const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduct(`${id}`);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data!;

  return (
        //propiedad sencilla
        <Text>{product.title}</Text>

         //matriz doble array
         <FlatList
          data={product.images}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: 300,
                height: 300,
                marginHorizontal: 7,
                borderRadius: 5,
              }}
            />
          )}
        />


        //array simple
        <View>
      {product.sizes.map((size) => (
        <TouchableOpacity key={size}>
          <Text>{size}</Text>
        </TouchableOpacity>
      ))}
    </View>


  );
};

export default ProductScreen;

```
