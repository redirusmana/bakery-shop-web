import fetchAPI from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import { ProductList } from "@/components/home/product-list";

export async function ProductListLoader() {
  let products: Product[] = [];
  
  try {
    const response = await fetchAPI.get<ApiResponse<Product[]>>("/all-products");
    if (response.data?.success) {
      products = (response.data.data || []).slice(0, 3);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <ProductList
      title="Our Signature Cakes"
      products={products}
      viewAllLink="/shop"
    />
  );
}