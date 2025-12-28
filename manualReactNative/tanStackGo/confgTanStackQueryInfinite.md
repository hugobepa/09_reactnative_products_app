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

2. crear un hook con tanStack, " presentation\products\hooks\useProducts.ts ":

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
