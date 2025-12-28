///http://localhost:3000/api/products/a51a6c52-d923-42fe-9785-19792b984fa1

import getProductByIdAction from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductByIdAction(productId),
    staleTime: 1000 * 60 * 60, //1h
  });

  //mutacion

  //Mantener ID del producto en caso nuevo

  return {
    productQuery,
  };
};
