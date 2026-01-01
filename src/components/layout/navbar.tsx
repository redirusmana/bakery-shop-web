"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Menu, ShoppingBag, X } from "lucide-react";

import { useCartStore } from "@/stores/use-cart-store";
import { useCartQuery } from "@/hooks/cart/use-cart-query";
import { useAuthStore } from "@/stores/use-auth-store";
import { cn } from "@/lib/utils";

const UserNav = dynamic(() => import("./user-nav"), { ssr: false });

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { openCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { data: cart } = useCartQuery();

  const totalQuantity =
    cart?.lines?.nodes.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    setIsUserLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  const navLinks = [
    { label: "GROUP ORDER", href: "/" },
    { label: "FAQ", href: "/" },
  ];

  const transparentStyle =
    isScrolled || isMobileMenuOpen
      ? "bg-primary py-4 shadow-md"
      : "bg-transparent";

  const navBackgroundClass =
    variant === "transparent" ? transparentStyle : "bg-primary";

  return (
    <>
      <nav
        className={cn(
          "fixed px-4 top-0 left-0 right-0 z-50 flex items-center justify-between py-4 md:px-12 w-full transition-all duration-300 ease-in-out",
          navBackgroundClass
        )}
      >
        <div className="flex-shrink-0 z-50">
          <Link href="/">
            <Image
              src="/union-bakery-light.png"
              alt="Union Bakery Logo"
              priority
              className="w-[8.1rem] h-[40px] object-contain"
              width={129.6}
              height={50}
            />
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-6">
            <Link
              href={"/shop"}
              className="text-xs font-semibold text-white transition-opacity hover:opacity-70 "
            >
              SHOP
            </Link>
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="cursor-pointer text-xs font-semibold text-white transition-opacity hover:opacity-70 "
              >
                {link.label}
              </div>
            ))}
          </div>
          <span className="text-white opacity-50">•</span>
          <div className="flex items-center gap-6">
            <button
              onClick={openCart}
              className="text-xs font-semibold text-white transition-opacity hover:opacity-70 flex items-center relative"
            >
              CART
              {totalQuantity > 0 && (
                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] text-white">
                  {totalQuantity}
                </span>
              )}
            </button>
            <UserNav />
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden z-50">
          <button onClick={openCart} className="relative text-white group">
            <ShoppingBag className="h-6 w-6" />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none transition-transform duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-primary px-8 pt-28 pb-8 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-12">
          <div className="flex flex-col items-start space-y-6">
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href={"/shop"}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:opacity-70"
            >
              SHOP
            </Link>
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:opacity-70"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-start space-y-6">
            <div className="text-[10px] font-bold uppercase text-white mb-2">
              MORE
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setTimeout(() => openCart(), 300);
              }}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:opacity-70"
            >
              CART {totalQuantity > 0 && `(${totalQuantity})`}
            </button>

            {!isUserLoggedIn && (
              <Link
                href="/account/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:opacity-70"
              >
                ACCOUNT / LOGIN
              </Link>
            )}

            <div className="w-full h-px bg-white/20 mt-8" />
          </div>
        </div>
      </div>
    </>
  );
};
