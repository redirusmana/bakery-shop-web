"use client";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col ">
      <Navbar variant="solid" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-[480px] bg-white  p-8 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-white p-4">
            <CheckCircle className="h-24 w-24 text-primary" />
          </div>

          <h1 className="mb-2 font-serif text-3xl ">Thank You!</h1>

          <p className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
            Order Placed Successfully
          </p>

          {/* Message */}
          <p className="mb-8 font-sans text-sm leading-relaxed text-gray-600">
            We have received your order. Please check your email for the payment
            instructions and order details.
          </p>

          <Button
            
            onClick={() => router.replace("/")}
            className="w-full rounded-none py-6 text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90 md:w-auto md:min-w-[200px]"
          >
            Back to Home
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
