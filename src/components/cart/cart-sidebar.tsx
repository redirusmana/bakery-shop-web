"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/stores/use-cart-store";
import { useCartQuery } from "@/hooks/cart/use-cart-query";
import { useCartMutations } from "@/hooks/cart/use-cart-mutation";

import { CartLine } from "@/types/cart";
import { formatPriceShort, cn } from "@/lib/utils";

import { CartEdit } from "@/components/cart/cart-edit";
import { CartDelivery } from "@/components/cart/cart-delivery";
import { CartSkeleton } from "@/components/cart/cart-skeleton";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type CartView = "LIST" | "EDIT" | "DELIVERY";

const MIN_ORDER_AMOUNT = 100000;

const getItemMetadata = (item: CartLine): string => {
  let sizePart = "";
  const variantTitle = item.merchandise?.title || "";

  if (variantTitle && variantTitle !== "Default Title") {
    const isSlice = variantTitle.toLowerCase().includes("slice");
    sizePart = isSlice
      ? variantTitle
      : `${variantTitle.replace(/cm/i, "").trim()}cm`;
  }

  let hasGreeting = false;
  let hasWording = false;

  if (item.attributes && item.attributes.length > 0) {
    item.attributes.forEach((attr) => {
      const key = attr.key.toLowerCase();
      const val = attr.value;
      if (key.startsWith("_") || !val) return;

      if (key.includes("greeting") || key.includes("card")) {
        hasGreeting = true;
      } else if (
        key.includes("cake") ||
        key.includes("wording") ||
        key.includes("message")
      ) {
        hasWording = true;
      }
    });
  }

  let suffixPart = "";
  if (hasWording && hasGreeting) {
    suffixPart = "with cake wording & greeting card";
  } else if (hasWording) {
    suffixPart = "with cake wording";
  } else if (hasGreeting) {
    suffixPart = "with greeting card";
  }

  return `${sizePart} ${suffixPart}`.trim();
};

export const CartSidebar = () => {
  const router = useRouter();
  const { isCartOpen, closeCart } = useCartStore();
  const { data: cart, isLoading } = useCartQuery();
  const { removeItem } = useCartMutations();

  const [view, setView] = useState<CartView>("LIST");
  const [editingItem, setEditingItem] = useState<CartLine | null>(null);

  const handleClose = () => {
    closeCart();
    setTimeout(() => setView("LIST"), 300);
  };

  const handleProceedToDelivery = () => {
    setView("DELIVERY");
  };

  const enrichedItems = cart?.lines?.nodes ?? [];
  const items =
    enrichedItems.length > 0 ? enrichedItems : cart?.lines.nodes || [];

  const subtotal = cart?.cost?.subtotalAmount?.amount
    ? Number.parseFloat(cart?.cost?.subtotalAmount?.amount)
    : 0;

  // --- VALIDATION LOGIC ---
  const isBelowMinOrder = subtotal < MIN_ORDER_AMOUNT;

  const renderContent = () => {
    if (isLoading && !cart) {
      return <CartSkeleton />;
    }

    if (view === "EDIT" && editingItem) {
      return <CartEdit item={editingItem} onBack={() => setView("LIST")} />;
    }

    if (view === "DELIVERY") {
      return <CartDelivery onBack={() => setView("LIST")} />;
    }

    return (
      <>
        <ScrollArea className="flex-1 px-4">
          {items.length === 0 ? (
            <div className="flex h-[50vh] flex-col items-center justify-center text-center opacity-70 space-y-4">
              <span className="font-sans text-lg italic opacity-70">
                Your cart is empty.
              </span>
              <Button
                variant="link"
                onClick={() => {
                  router.push("/shop");
                  handleClose();
                }}
                className="uppercase underline-offset-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="">
              {items.map((item) => {
                const metaText = getItemMetadata(item);
                return (
                  <li
                    key={item.id}
                    className="flex gap-5 mb-6 pb-6 border-b border-dashed border-gray-300 last:border-0 last:mb-0 last:pb-0"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative h-20 w-20 flex-shrink-0 border border-gray-200 bg-white">
                      {item.merchandise.image?.url && (
                        <Image
                          src={item.merchandise.image.url}
                          alt={item.merchandise?.product?.title || "Product"}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex flex-1 flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h3 className="font-sans text-sm font-bold uppercase ">
                            {item.merchandise?.product?.title}
                          </h3>
                          {metaText && (
                            <p className="font-sans text-xs opacity-70 leading-relaxed">
                              {metaText}
                            </p>
                          )}
                        </div>

                        {/* PRICE */}
                        <span className="font-serif text-sm font-bold text-destructive whitespace-nowrap">
                          {formatPriceShort(
                            Number.parseFloat(item.merchandise.price.amount)
                          )}
                        </span>
                      </div>

                      {/* QUANTITY & ACTIONS */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-sans text-base font-semibold opacity-70">
                          <span className="font-serif">{item.quantity}</span>x
                        </span>

                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setView("EDIT");
                            }}
                            className="text-xs font-bold uppercase hover:text-secondary transition-colors"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs font-bold uppercase hover:text-destructive transition-colors"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>

        {/* SUBTOTAL */}
        {items.length > 0 && (
          <div className="bg-white border-t border-foreground px-4 py-6 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
            <div className="flex items-end justify-between mb-6">
              <span className="font-sans text-sm font-bold uppercase opacity-70">
                Subtotal
              </span>
              <span className="font-serif text-2xl text-destructive">
                {formatPriceShort(subtotal)}
              </span>
            </div>

            {/* VALIDATION MESSAGE */}
            {isBelowMinOrder && (
              <p className="mb-3 text-center font-itc text-sm italic text-destructive">
                Min. order 100k to proceed for delivery order
              </p>
            )}

            <Button
              onClick={handleProceedToDelivery}
              disabled={isBelowMinOrder}
              className={cn(
                "w-full rounded-none py-4 font-bold uppercase text-white transition-colors",
                isBelowMinOrder && "opacity-70 cursor-not-allowed text-white"
              )}
            >
              Choose Delivery Time
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        className="flex w-full max-w-96 flex-col p-0 bg-union-paper border-l border-gray-200 shadow-2xl sm:max-w-96 [&>button]:hidden"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">Shopping Cart</SheetTitle>

        {view === "LIST" && (
          <div className="flex items-center justify-between px-4 pt-8 pb-4">
            <div>
              <h2 className="font-sans text-2xl font-bold uppercase">Cart</h2>
              <p className="font-itc text-sm italic opacity-70 mt-1">
                * All prices shown are in thousands of rupiah
              </p>
            </div>

            <button
              onClick={handleClose}
              className="hover:opacity-70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0 relative">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
};
