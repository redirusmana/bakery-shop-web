import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceShort(price: number | string): string {
  const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price;
  
  if (Number.isNaN(numericPrice)) return "0";

  const shortPrice = numericPrice / 1000;

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0, 
  }).format(shortPrice);
}