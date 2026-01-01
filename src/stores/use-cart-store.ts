import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  cartId: string | null;
  isCartOpen: boolean;

  setCartId: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      isCartOpen: false,

      setCartId: (id: string) => set({ cartId: id }),

      clearCart: () => set({ cartId: null }),

      openCart: () => set({ isCartOpen: true }),

      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "union-cart-id-storage", 
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        cartId: state.cartId,
      }),
    }
  )
);
