import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { QualitySection } from "@/components/home/quality-section";
import { GroupOrderSection } from "@/components/home/group-order-section";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { ProductListLoader } from "@/components/home/product-list-loader";
import { ProductCardSkeleton } from "@/components/product/product-card-skeleton";

export const revalidate = 60;

function BestSellerLoading() {
  return (
    <section className="container py-16">
      <div className="mb-12 text-center">
        <div className="h-8 w-48 bg-gray-200 mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar variant="transparent" />
      <Hero />

      <FadeIn delay={200}>
        <Suspense fallback={<BestSellerLoading />}>
          <ProductListLoader />
        </Suspense>
      </FadeIn>

      <FadeIn delay={300}>
        <QualitySection />
      </FadeIn>

      <FadeIn delay={300}>
        <GroupOrderSection />
      </FadeIn>

      <Footer />
    </main>
  );
}
