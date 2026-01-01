"use client";

import { useState } from "react";
import { ChevronLeft, Minus, Plus } from "lucide-react";

import { useCartMutations } from "@/hooks/cart/use-cart-mutation";
import { CartLine } from "@/types/cart";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { QuantityButton } from "@/components/ui/quantity-button";
import { formatPriceShort } from "@/lib/utils";

interface CartEditProps {
  item: CartLine;
  onBack: () => void;
}

export const CartEdit = ({ item, onBack }: CartEditProps) => {
  const { updateItem } = useCartMutations();

  const initialCakeWording =
    item.attributes.find((a) => a.key === "Cake Wording")?.value || "";
  const initialGreeting =
    item.attributes.find((a) => a.key === "Greetings")?.value || "";

  const [quantity, setQuantity] = useState(item.quantity);
  const [isWording, setIsWording] = useState(!!initialCakeWording);
  const [cakeWording, setCakeWording] = useState(initialCakeWording);
  const [isGreeting, setIsGreeting] = useState(!!initialGreeting);
  const [greetingWording, setGreetingWording] = useState(initialGreeting);
  const [isSaving, setIsSaving] = useState(false);

  const [isClosing, setIsClosing] = useState(false);

  const unitPrice = Number.parseFloat(item.merchandise.price.amount);
  const totalPrice = unitPrice * quantity;

  const triggerCloseAnimation = () => {
    setIsClosing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateItem({
        lineId: item.id,
        quantity: quantity,
        cakeWording: isWording ? cakeWording : undefined,
        greetingWording: isGreeting ? greetingWording : undefined,
      });
      triggerCloseAnimation();
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`
        flex h-full flex-col duration-300
        ${
          isClosing
            ? "animate-out slide-out-to-right"
            : "animate-in slide-in-from-right"
        }
      `}
      onAnimationEnd={() => {
        if (isClosing) {
          onBack();
        }
      }}
    >
      {/* HEADER */}
      <div className="px-4 pt-8 pb-4">
        <Button
          variant="ghost"
          onClick={triggerCloseAnimation}
          className="mb-4 h-auto p-0 font-bold opacity-70 hover:bg-transparent hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-3 w-3" /> BACK
        </Button>
        <h2 className="font-sans text-xl font-bold uppercase">
          {item.merchandise?.product?.title}
        </h2>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6 py-4 border-t border-gray-300">
          {/* CAKE WORDING */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-sans text-sm font-bold uppercase ">
                  Add Cake Wording
                </Label>
                <p className="text-xs opacity-70">Optional - max. 25 chars</p>
              </div>
              <Checkbox
                checked={isWording}
                onCheckedChange={(c) => {
                  setIsWording(!!c);
                  setCakeWording("");
                }}
                className="rounded-none border-gray-400 data-[state=checke h-5 w-5"
              />
            </div>

            {isWording && (
              <div className="relative">
                <Textarea
                  maxLength={25}
                  value={cakeWording}
                  onChange={(e) => setCakeWording(e.target.value)}
                  placeholder="Enter Message..."
                />
                <div className="absolute bottom-2 right-2 text-xs opacity-70">
                  {cakeWording.length}/25
                </div>
              </div>
            )}
          </div>

          {/* 2. GREETING CARD */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-sans text-sm font-bold uppercase ">
                  Add Greeting Card
                </Label>
                <p className="text-xs opacity-70">Optional - max. 100 chars</p>
              </div>
              <Checkbox
                checked={isGreeting}
                onCheckedChange={(c) => {
                  setIsGreeting(!!c);
                  setGreetingWording("");
                }}
                className="rounded-none border-gray-400 data-[state=checke h-5 w-5"
              />
            </div>

            {isGreeting && (
              <div className="relative">
                <Textarea
                  maxLength={100}
                  value={greetingWording}
                  onChange={(e) => setGreetingWording(e.target.value)}
                  placeholder="Enter Message..."
                />
                <div className="absolute bottom-2 right-2 text-xs opacity-70">
                  {greetingWording.length}/100
                </div>
              </div>
            )}
          </div>

          {/* Quantity*/}
          <div className="border-t border-gray-300 pt-6 mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QuantityButton
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </QuantityButton>

              <span className="min-w-[1.5rem] text-center font-serif text-xl font-bold">
                {quantity}
              </span>

              <QuantityButton onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </QuantityButton>
            </div>

            <span className="font-serif text-xl font-bold text-destructive">
              {formatPriceShort(totalPrice)}
            </span>
          </div>
          <div className="pt-0">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full rounded-none font-bold uppercase text-white transition-colors"
            >
              {isSaving ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
