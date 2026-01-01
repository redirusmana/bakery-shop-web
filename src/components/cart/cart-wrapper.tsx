"use client";

import dynamic from "next/dynamic";

const CartSidebar = dynamic(
  () => import("./cart-sidebar").then((mod) => mod.CartSidebar),
  { ssr: false }
);

export const CartWrapper = () => {
  return <CartSidebar />;
};
