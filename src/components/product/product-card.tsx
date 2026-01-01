"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPriceShort } from "@/lib/utils";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const priceAmount = product.priceRange?.maxVariantPrice?.amount || "0";

  const featuredImage = product.media?.nodes?.[0]?.previewImage;
  const imageUrl =
    featuredImage?.url || "https://placehold.co/600x600/png?text=No+Image";
  const imageAlt = featuredImage?.altText || product.title;

  const isBestSeller = index === 0 || index === 4;
  const isSeasonal = index === 2 || index === 5;
  const isHaveNote = index === 6;

  const ribbonStyle = {
    clipPath: "polygon(100% 0, 100% 100%, 0 100%, 8px 50%, 0 0)",
  };

  return (
    <div className="group relative flex flex-col space-y-3 ">
      <Link
        href={`/product/${product.handle}`}
        className="relative aspect-square w-full overflow-hidden bg-gray-100 block"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {isBestSeller && (
          <div
            className="absolute top-4 right-0 z-20 bg-primary pl-5 pr-3 pb-1 drop-shadow-sm"
            style={ribbonStyle}
          >
            <span className="text-[9px] font-bold uppercase text-white">
              Best Seller
            </span>
          </div>
        )}

        {isSeasonal && (
          <div
            className="absolute top-4 right-0 z-20 bg-destructive pl-5 pr-3 pb-1 drop-shadow-sm"
            style={ribbonStyle}
          >
            <span className="text-[9px] font-bold uppercase text-white">
              Seasonal
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <Button
            variant="secondary"
            className="w-full bg-white/95 hover:bg-primary text-foreground hover:text-white backdrop-blur-sm transition-colors h-10 font-bold uppercase shadow-sm"
          >
            <Eye className="mr-2 h-3 w-3" /> View Details
          </Button>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Link href={`/product/${product.handle}`}>
            <h3 className="font-sans text-bs md:text-lg font-bold uppercase leading-relaxed tracking-wide transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {isHaveNote && (
            <p className="font-itc text-bs md:text-lg italic opacity-70">
              *Only available in Bandung
            </p>
          )}
        </div>

        <p className="font-serif text-bs md:text-lg font-bold text-destructive whitespace-nowrap">
          {formatPriceShort(priceAmount)}
        </p>
      </div>
    </div>
  );
};
