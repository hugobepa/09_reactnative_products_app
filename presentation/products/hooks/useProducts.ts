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
