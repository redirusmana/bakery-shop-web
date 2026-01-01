import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ShopLoader } from "@/components/shop/shop-loader";
import { ShopSkeleton } from "@/components/shop/shop-skeleton";

export const revalidate = 60;

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <div className="mx-auto px-6 py-12 md:px-12 md:py-16">
        <div className="mb-12">
          <h1 className="font-sans text-2xl md:text-3xl font-bold mb-3">
            HANDCRAFTED SIGNATURE CAKES
          </h1>
          <p className="font-itc italic opacity-50">
            * All prices shown are in thousands of rupiah
          </p>
        </div>

        <Suspense fallback={<ShopSkeleton />}>
          <ShopLoader />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
