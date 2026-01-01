"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import fetchAPI from "@/lib/api";
import { useCartStore } from "@/stores/use-cart-store";
import { ApiResponse } from "@/types/api";
import {
  Cart,
  CartApiResponse,
  AddToCartPayload,
  UpdateItemPayload,
} from "@/types/cart";

export const useCartMutations = () => {
  const queryClient = useQueryClient();
  const { cartId, setCartId, clearCart, openCart } = useCartStore();

  // ADD ITEM 
  const addToCart = useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      if (!cartId) {
        const res = await fetchAPI.post<ApiResponse<Cart>>(
          "/createCart",
          payload
        );
        if (!res.data.success)
          throw new Error(res.data.message || "Failed to create cart");
        return { type: "create" as const, data: res.data.data };
      }

      const res = await fetchAPI.post<ApiResponse<CartApiResponse>>(
        "/cart-line-add",
        { ...payload, cartId }
      );
      if (!res.data.success)
        throw new Error(res.data.message || "Failed to add item");

      return { type: "add" as const, data: res.data.data };
    },
    onSuccess: (result) => {
      if (result.type === "create") {
        setCartId(result.data.id);
        queryClient.setQueryData(["cart", result.data.id], result.data);
      } else {
        queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
      }
      openCart();
      toast.success("Item added to your cart");
    },
    onError: (error: Error | AxiosError) => {
      toast.error(error.message || "Couldn't add item. Please refresh and try again");
    },
  });

  // UPDATE ITEM
  const updateItem = useMutation({
    mutationFn: async (payload: UpdateItemPayload) => {
      if (!cartId) return;

      const res = await fetchAPI.post<ApiResponse<unknown>>(
        "/update-cart-line",
        { ...payload, cartId }
      );

      if (!res.data.success)
        throw new Error(res.data.message || "Failed to update item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
      toast.success("Cart updated successfully");
    },
    onError: () => toast.error("Failed to update cart"),
  });

  // REMOVE ITEM
  const removeItem = useMutation({
    mutationFn: async (lineId: string) => {
      if (!cartId) return;

      const res = await fetchAPI.post<ApiResponse<unknown>>(
        "/remove-cart-item",
        { cartId, lineIds: lineId }
      );

      if (!res.data.success)
        throw new Error(res.data.message || "Failed to remove item");

      return lineId;
    },
    onSuccess: (removedLineId) => {
      const currentCart = queryClient.getQueryData<Cart>(["cart", cartId]);
      const lines = currentCart?.lines?.nodes || [];
      const isLastItem = lines.length === 1 && lines[0].id === removedLineId;

      if (isLastItem) {
        clearCart();
        queryClient.removeQueries({ queryKey: ["cart", cartId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
      }

      toast.success("Item removed from your cart");
    },
    onError: () => toast.error("Failed to remove item"),
  });

  return {
    addToCart: addToCart.mutateAsync,
    isAdding: addToCart.isPending,
    updateItem: updateItem.mutateAsync,
    removeItem: removeItem.mutateAsync,
  };
};
