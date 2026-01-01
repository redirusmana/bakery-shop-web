"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

interface ProductListProps {
  title?: string;
  products: Product[];
  viewAllLink?: string;
}

export const ProductList = ({
  title = "Our Collection",
  products,
  viewAllLink = "/shop",
}: ProductListProps) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="px-6 md:px-8 lg:px-10 mx-auto">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-4">
          <div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold uppercase ">
              {title}
            </h2>
            <div className="mt-4 h-1 w-20 bg-primary" />
          </div>

          <Link href={viewAllLink} className="hidden md:block">
            <Button
              variant="link"
              className="text-xs font-bold uppercase text-primary hover:text-secondary p-0"
            >
              Shop Now
            </Button>
          </Link>
        </div>

        {/* PRODUCT */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
