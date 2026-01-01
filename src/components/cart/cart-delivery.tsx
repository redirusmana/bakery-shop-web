"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useCheckout } from "@/hooks/cart/use-cart-checkout";
import { useAuthStore } from "@/stores/use-auth-store";
import { useCartStore } from "@/stores/use-cart-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const INPUT_STYLE =
  "h-11 rounded-none border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm font-sans shadow-none transition-colors focus:border-black focus:ring-0 focus-visible:ring-0";

interface CartDeliveryProps {
  onBack: () => void;
}

export const CartDelivery = ({ onBack }: CartDeliveryProps) => {
  const router = useRouter();

  const { checkout, isCheckingOut } = useCheckout();
  const { isAuthenticated } = useAuthStore();
  const { closeCart } = useCartStore();

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const triggerCloseAnimation = () => {
    setIsClosing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleProceed();
  };

  const handleProceed = async () => {
    if (!date || !time || !phone) {
      toast.error("Almost there! Please complete all delivery details first");
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd");

    if (isAuthenticated === false) {
      toast.error("Please login to secure your order.", {
        description: "Your delivery details have been saved",
      });

      const formData = {
        deliveryDate: formattedDate,
        deliveryTime: time,
        phone: phone,
      };
      localStorage.setItem("checkoutFormData", JSON.stringify(formData));
      localStorage.setItem("pendingCheckout", "true");

      closeCart();
      triggerCloseAnimation();
      router.push("/account/login");
    } else {
      try {
        await checkout({
          deliveryDate: formattedDate,
          deliveryTime: time,
          phone: phone,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col duration-300",
        isClosing
          ? "animate-out slide-out-to-right"
          : "animate-in slide-in-from-right"
      )}
      onAnimationEnd={() => {
        if (isClosing) onBack();
      }}
    >
      {/* Header */}
      <div className="px-8 pt-8">
        <Button
          type="button"
          variant="ghost"
          onClick={triggerCloseAnimation}
          className="mb-4 h-auto p-0 font-bold uppercase opacity-70 hover:bg-transparent"
        >
          <ChevronLeft className="mr-1 h-3 w-3" /> Back
        </Button>
      </div>

      {/* FORM WRAPPER */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 px-8">
          <div className="space-y-6 py-2">
            {/* DELIVERY DATE */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Label>DELIVERY DATE</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                      INPUT_STYLE,
                      "w-full justify-between text-left font-normal border-gray-300 hover:bg-transparent",
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-2 h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 rounded-none bg-white border-gray-200"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date <= new Date()}
                    className="rounded-none font-sans"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* DELIVERY TIME */}
            {date && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Label>DELIVERY TIME</Label>
                <Select onValueChange={setTime} value={time}>
                  <SelectTrigger className={cn(INPUT_STYLE, "w-full")}>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-gray-200 bg-white">
                    {[
                      "10AM - 12PM",
                      "12PM - 2PM",
                      "2PM - 4PM",
                      "4PM - 6PM",
                    ].map((slot) => (
                      <SelectItem
                        key={slot}
                        value={slot}
                        className="font-sans cursor-pointer hover:bg-gray-50"
                      >
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* PHONE NUMBER */}
            {date && time && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Label>PHONE NUMBER</Label>
                <Input
                  type="tel"
                  placeholder="Input phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={INPUT_STYLE}
                  autoFocus
                />
                <p className="text-xs opacity-70 leading-relaxed">
                  Enter your phone number or your U+Rewards phone number to earn
                  U+ points on this order.
                </p>
              </div>
            )}
          </div>

          <div className="py-8">
            <Button
              type="submit"
              disabled={!date || !time || !phone || isCheckingOut}
              className="w-full rounded-none font-bold uppercase text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
            </Button>
          </div>
        </ScrollArea>
      </form>
      {/* FORM WRAPPER*/}
    </div>
  );
};
