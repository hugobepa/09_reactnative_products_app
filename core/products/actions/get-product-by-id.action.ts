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
