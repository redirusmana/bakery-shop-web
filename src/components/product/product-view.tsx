"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { useCartMutations } from "@/hooks/cart/use-cart-mutation";

import { formatPriceShort } from "@/lib/utils";
import { Product, ProductVariant } from "@/types/product";

import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { QuantityButton } from "@/components/ui/quantity-button";
import { Label } from "@/components/ui/label";

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: Readonly<ProductViewProps>) {
  const { addToCart, isAdding } = useCartMutations();
  const initialVariant = product.variants?.nodes?.[0];
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [isWording, setIsWording] = useState(false);
  const [wording, setWording] = useState("");
  const [isGreeting, setIsGreeting] = useState(false);
  const [greeting, setGreeting] = useState("");

  const handleAddToCart = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!selectedVariant) return;
    if (!selectedVariant.availableForSale) {
      toast.error("Oh no! This treat is currently out of stock");
      return;
    }
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: quantity,
        cakeWording: isWording ? wording : "",
        greetingWording: isGreeting ? greeting : "",
      });

      clearState();
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const clearState = () => {
    setIsWording(false);
    setWording("");
    setIsGreeting(false);
    setGreeting("");
    setQuantity(1);
  };

  const displayPrice = selectedVariant
    ? selectedVariant.price.amount
    : product.priceRange?.maxVariantPrice?.amount || "0";

  const getVariantLabel = (title: string) => {
    const isSlice = title.toLowerCase().includes("slice");
    return {
      main: title.replaceAll(/\D/g, "") || title,
      sub: isSlice ? "Slice" : "cm",
    };
  };

  if (!product) return <div>Product data not found</div>;
  const images = product.images?.nodes || [];

  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-screen ">
      <div className="w-full md:w-1/2 flex flex-col">
        {images.length > 0 ? (
          images.map((media, index) => (
            <FadeIn
              key={media.id || index}
              delay={index * 150}
              className="relative w-full aspect-square md:aspect-auto md:h-screen sticky-image-container"
            >
              <Image
                src={media.url || ""}
                alt={media.altText || product.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </FadeIn>
          ))
        ) : (
          <div className="flex h-[50vh] md:h-screen w-full items-center justify-center opacity-70">
            No Image Available
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2  flex flex-col relative">
        <div className="flex-1 p-8 md:p-16 lg:px-24 lg:py-16">
          <div className="flex justify-between items-start mb-4">
            <h1 className="font-sans text-2xl font-bold uppercase text-foreground max-w-[70%]">
              {product.title}
            </h1>
            <span className="font-serif text-xl font-bold text-destructive">
              {formatPriceShort(displayPrice)}
            </span>
          </div>

          <div
            className="mb-8 font-sans text-sm opacity-70 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || product.description || "",
            }}
          />

          <div className="h-px w-full bg-gray-300 mb-8" />

          <div className="space-y-8">
            {/* VARIANT */}
            {product.variants?.nodes?.length > 0 && (
              <div className="space-y-3">
                <Label className="font-sans text-base font-bold uppercase">
                  Cake Size
                </Label>
                <div className="flex gap-4 flex-wrap">
                  {product.variants.nodes.map((variant) => {
                    const label = getVariantLabel(variant.title);
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.availableForSale}
                        className={`min-w-[100px] border py-4 text-center transition-all relative ${
                          isSelected
                            ? "border-primary ring-1 ring-primary"
                            : "border-dashed border-gray-300 bg-transparent hover:border-gray-400"
                        } ${
                          variant.availableForSale
                            ? ""
                            : "opacity-70 cursor-not-allowed bg-gray-100"
                        }`}
                      >
                        <span className="block font-serif text-3xl font-bold text-destructive">
                          {label.main}
                        </span>
                        <span className="block text-sm font-bold uppercase opacity-70">
                          {label.sub}
                        </span>
                        {!variant.availableForSale && (
                          <span className="absolute top-1 right-1 text-[8px] text-destructive font-bold uppercase">
                            Sold Out
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="h-px w-full border-t border-dashed border-gray-300" />

            {/* CAKE WORDING */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-sans text-base font-bold uppercase text-foreground">
                    Add Cake Wording
                  </Label>
                  <p className="text-sm opacity-70">
                    Optional - max. 25 characters
                  </p>
                </div>
                <Checkbox
                  checked={isWording}
                  onCheckedChange={(c) => {
                    setIsWording(!!c);
                    setWording("");
                  }}
                  className="rounded-none border-gray-400 data-[state=checked]:bg-foreground h-5 w-5"
                />
              </div>
              {isWording && (
                <Textarea
                  maxLength={25}
                  placeholder="Enter Message..."
                  value={wording}
                  onChange={(e) => setWording(e.target.value)}
                />
              )}
            </div>

            <div className="h-px w-full border-t border-dashed border-gray-300" />

            {/* GREETING CARD */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-sans text-base font-bold uppercase text-foreground">
                    Add Greeting Card
                  </Label>
                  <p className="text-sm opacity-70">
                    Optional - max. 100 characters
                  </p>
                </div>
                <Checkbox
                  checked={isGreeting}
                  onCheckedChange={(c) => {
                    setIsGreeting(!!c);
                    setGreeting("");
                  }}
                  className="rounded-none border-gray-400 data-[state=checked]:bg-foreground h-5 w-5"
                />
              </div>
              {isGreeting && (
                <Textarea
                  maxLength={100}
                  placeholder="Enter Message..."
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                />
              )}
            </div>

            <div className="h-px w-full bg-gray-300" />

            {/* TERMS */}
            <div className="space-y-2 pb-8">
              <h4 className="font-sans text-base font-bold uppercase text-foreground">
                Terms & Conditions
              </h4>
              <ul className="list-disc pl-4 text-sm leading-relaxed space-y-1 opacity-70">
                <li>
                  <strong>Freshness & Storage:</strong> Our cakes are perishable
                  and made with fresh ingredients. Please ensure they are stored
                  in a refrigerator (0-4°C) immediately upon receipt to maintain
                  quality.
                </li>
                <li>
                  <strong>Damage Liability:</strong> Union Bakery is not liable
                  for any damage to the cake (melting, smudging, or shifting)
                  once it has been handed over to you or the delivery courier.
                  Please handle the box with extreme care.
                </li>
                <li>
                  <strong>Visual Variation:</strong> As all our products are
                  handcrafted, slight variations in decoration, color, or
                  finishing may occur compared to the catalog photos.
                </li>
                <li>
                  <strong>Inspection Policy:</strong> Please inspect your order
                  immediately upon pickup or delivery. We do not accept
                  complaints, refunds, or exchanges regarding the cakes
                  condition once it has been accepted.
                </li>
                <li>
                  <strong>Allergen Notice:</strong> Our products may contain
                  traces of nuts, gluten, eggs, and dairy. Please consume with
                  caution if you have known food allergies.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 z-10 border border-b-0 border-secondary mx-10 bg-white p-4 md:px-8 md:py-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex items-end justify-between gap-4 md:gap-6">
            <div className="flex flex-col">
              <span className="font-sans text-sm uppercase opacity-70 mb-3">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <QuantityButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </QuantityButton>

                <span className="min-w-[1.25rem] text-center font-serif text-xl font-bold text-foreground">
                  {quantity}
                </span>

                <QuantityButton onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </QuantityButton>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || !selectedVariant?.availableForSale}
              className="h-10 rounded-none bg-primary font-bold uppercase text-white transition-all disabled:opacity-70"
            >
              {isAdding ? (
                <span className="animate-pulse">Adding...</span>
              ) : (
                "Add to Cart"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
