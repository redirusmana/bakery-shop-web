import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

import fetchAPI from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductView } from "@/components/product/product-view";
import { ProductViewSkeleton } from "@/components/product/product-view-skeleton";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export const revalidate = 60;

const ProductBreadcrumb = ({ title }: { title?: string }) => (
  <div className="bg-secondary py-3 text-white mt-2">
    <div className=" mx-auto px-4 md:px-12">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase ">
        <Link
          href="/"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          Home
        </Link>
        <span className="opacity-70">•</span>
        <Link
          href="/shop"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          Shop
        </Link>
        <span className="opacity-70">•</span>
        {title ? (
          <span className="text-white md:max-w-none">
            {title}
          </span>
        ) : (
          <div className="h-3 w-24 bg-white opacity-70 animate-pulse rounded" />
        )}
      </nav>
    </div>
  </div>
);

async function ProductContent({ handle }: Readonly<{ handle: string }>) {
  let product: Product | null = null;

  try {
    const response = await fetchAPI.get<ApiResponse<Product>>(
      `/product/${handle}`
    );
    if (response?.data?.success) {
      product = response.data.data;
    }
  } catch (error) {
    console.error(`Failed to fetch product: ${handle}`, error);
  }

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductBreadcrumb title={product.title} />
      <ProductView product={product} />
    </>
  );
}

export default async function ProductDetailPage({
  params,
}: Readonly<PageProps>) {
  const { handle } = await params;

  return (
    <main className="min-h-screen pt-16">
      <Navbar variant="solid" />

      <Suspense
        fallback={
          <>
            <ProductBreadcrumb />
            <ProductViewSkeleton />
          </>
        }
      >
        <ProductContent handle={handle} />
      </Suspense>

      <Footer />
    </main>
  );
}
