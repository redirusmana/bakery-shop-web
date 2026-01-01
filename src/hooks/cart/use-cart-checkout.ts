"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import fetchAPI from "@/lib/api";
import { useCartStore } from "@/stores/use-cart-store";
import { ApiResponse } from "@/types/api";
import { CheckoutPayload } from "@/types/cart";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { cartId, clearCart, closeCart } = useCartStore();

  // UPDATE BUYER IDENTITY
  const updateBuyerIdentity = useMutation({
    mutationFn: async () => {
      if (!cartId) return;

      const res = await fetchAPI.post<ApiResponse<unknown>>(
        "/update-cart-buyer-identity",
        { cartId }
      );

      if (!res.data.success) {
        console.warn("Update identity warning:", res.data.message);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });

  // CHECKOUT
  const checkout = useMutation({
    mutationFn: async (payload: Omit<CheckoutPayload, "cartId">) => {
      if (!cartId) throw new Error("No cart found");

      const res = await fetchAPI.post<ApiResponse<unknown>>("/checkout", {
        cartId,
        ...payload,
      });

      if (!res.data.success) {
        throw new Error(res.data.message || "Checkout failed");
      }
      return res.data;
    },
    onSuccess: (response) => {
      queryClient.removeQueries({ queryKey: ["cart", cartId] });
      clearCart();
      closeCart();
      toast.success("Order placed successfully", {
        description: "Thank you for your order",
      });

      return response.success;
    },
    onError: (error: Error | AxiosError) => {
      toast.error(
        error.message || "Something went wrong with checkout. Please try again"
      );
    },
  });

  return {
    updateBuyerIdentity: updateBuyerIdentity.mutateAsync,
    checkout: checkout.mutateAsync,
    isCheckingOut: checkout.isPending,
  };
};
