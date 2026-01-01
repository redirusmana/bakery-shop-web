import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Montserrat, Rozha_One, EB_Garamond } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { CartWrapper } from "@/components/cart/cart-wrapper";
import { SplashScreen } from "@/components/layout/splash-screen";

export const metadata: Metadata = {
  title: "Antikode Cake Store",
  description: "Delicious cakes for you",
};

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Rozha_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const fontItc = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-itc",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} ${fontItc.variable}`}
    >
      <body className="antialiased font-sans">
        <SplashScreen />

        <QueryProvider>
          {children}
          <CartWrapper />
        </QueryProvider>

        <Toaster position="top-center" richColors expand />
      </body>
    </html>
  );
}
