"use client";

import { useQuery } from "@tanstack/react-query";
import fetchAPI from "@/lib/api";
import { useCartStore } from "@/stores/use-cart-store";
import { ApiResponse } from "@/types/api";
import { Cart, CartApiResponse } from "@/types/cart";

const getCart = async (cartId: string): Promise<Cart> => {
  const res = await fetchAPI.post<ApiResponse<CartApiResponse>>("/get-cart", {
    cartId,
  });

  if (!res.data.success || !res.data.data.cart) {
    throw new Error("Failed to fetch cart data");
  }

  return res.data.data.cart;
};

export const useCartQuery = () => {
  const { cartId } = useCartStore();

  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId, 
    retry: false,
  });
};