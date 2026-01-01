import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";

export function ShopSkeleton() {
  const SKELETON_MAPS = [1,2,3,4]
  return (
    <section className="mx-auto px-6 py-12 md:px-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {SKELETON_MAPS.map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
