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

2. crear un hook con tanStackQueryInfinite, " presentation\products\hooks\useProducts.ts ":

```
import getProductsAction from "@/core/products/actions/get-products.action";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam }) => getProductsAction(20, pageParam * 20),

    staleTime: 1000 * 60 * 60, //1h
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  return {
    productsQuery,
    //Methods
    loadNextPage: productsQuery.fetchNextPage,
  };
};
```

# utilizacion queryInfinite del TanstackHook:

- crear esta pagina para evitar fallos "app\(products-app)\product\[id].tsx" rellenarla "rnfe"

- creacion de componentes para colocar lista en "app\(products-app)\(home)\index.tsx"

tarjeta de producto en la lista, "presentation\products\components\ProductCard.tsx":

```
import { Product } from "@/core/products/interface/product.interface";
import { ThemedText } from "@/presentation/theme/components/themed-text";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
        margin: 3,
        borderRadius: 5,
        overflow: "hidden",
        padding: 5,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({ pathname: "/product/[id]", params: { id: product.id } })
        }
      >
        {product.images.length === 0 ? (
          <Image
            source={require("../../../assets/images/no-product-image.png")}
            style={{ width: "100%", height: 200 }}
          />
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: "100%" }}
          />
        )}

        <ThemedText
          numberOfLines={2}
          style={{ textAlign: "center" }}
          darkColor={"black"}
        >
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

```

crear la lista de productos,"presentation\products\components\ProductList.tsx":

```
import { Product } from "@/core/products/interface/product.interface";
import React from "react";
import { FlatList } from "react-native";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id} //string
      renderItem={({ item }) => <ProductCard product={item} />}
    />
  );
};

export default ProductList;
```

-lista "ProductList" en Screen cargandola "useProducts"(hook) , "app\(products-app)\(home)\index.tsx":

```
import ProductList from "@/presentation/products/components/ProductList";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import ThemedActivityIndicator from "@/presentation/theme/components/ThemedActivityIndicator";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return <ThemedActivityIndicator />;
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
    </View>
  );
};

export default HomeScreen;

```
