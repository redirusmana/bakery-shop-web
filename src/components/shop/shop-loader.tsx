import fetchAPI from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card"; 
import { FadeIn } from "@/components/ui/fade-in";

export async function ShopLoader() {
  let products: Product[] = [];

  try {
    const response = await fetchAPI.get<ApiResponse<Product[]>>(
      "/all-products"
    );
    if (response.data?.success) {
      products = response.data.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch shop products", error);
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center font-sans">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product, index) => (
        <FadeIn key={product.id} delay={index * 50}>
          <ProductCard product={product} index={index} />
        </FadeIn>
      ))}
    </div>
  );
}
