///http://localhost:3000/api/products/a51a6c52-d923-42fe-9785-19792b984fa1

import { updateCreateProductAction } from "@/core/products/actions/create-update-product.action";
import getProductByIdAction from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interface/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId); //new/UUID

  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductByIdAction(productId),
    staleTime: 1000 * 60 * 60, //1h
  });

  //mutacion
  const productMutacion = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProductAction({
        ...data,
        id: productIdRef.current,
      }), //:updateCreateProductAction,
    onSuccess(data: Product) {
      productIdRef.current = data.id;

      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
      queryClient.invalidateQueries({ queryKey: ["products", data.id] });
      Alert.alert("Producto guardado", `${data.title} se guardo correctamente`);
    },
  });

  //Mantener ID del producto en caso nuevo

  return {
    productQuery,
    productMutacion,
  };
};
