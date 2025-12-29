import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, Product } from "../interface/product.interface";

const emptyProduct: Product = {
  id: "",
  title: "Nuevo producto",
  description: "",
  price: 0,
  images: [],
  slug: "",
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: [],
};

const getProductByIdAction = async (id: string): Promise<Product> => {
  if (id === "new") return emptyProduct;
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
