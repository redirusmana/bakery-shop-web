"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAuthStore } from "@/stores/use-auth-store";
import { useCartStore } from "@/stores/use-cart-store";
import { useCheckout } from "@/hooks/cart/use-cart-checkout";
import { SavedCheckoutData } from "@/types/cart";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginPage() {
  const router = useRouter();

  // Stores
  const { login } = useAuthStore();
  const { cartId } = useCartStore();
  const { checkout, updateBuyerIdentity } = useCheckout();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await login({ email: values.email, password: values.password });

      toast.success("Welcome back! It's good to see you again");

      if (cartId) {
        await updateBuyerIdentity().catch((error: Error) =>
          console.error("Identity sync warning:", error)
        );
      }

      const isPendingCheckout = localStorage.getItem("pendingCheckout");

      if (isPendingCheckout) {
        toast.info("Processing your pending checkout...");
        const savedDataString = localStorage.getItem("checkoutFormData");
        let savedData: SavedCheckoutData | null = null;
        if (savedDataString)
          savedData = JSON.parse(savedDataString) as SavedCheckoutData;

        const today = new Date().toISOString().split("T")[0];

        await checkout({
          phone: savedData?.phone || "08123456789",
          deliveryDate: savedData?.deliveryDate || today,
          deliveryTime: savedData?.deliveryTime || "10AM - 12PM",
        });

        localStorage.removeItem("pendingCheckout");
        localStorage.removeItem("checkoutFormData");
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      let msg = "";
      if (error instanceof AxiosError && error.response?.data?.message) {
        msg = String(error.response.data.message);
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg, {
        description:
          "Oops! We couldn't log you in. Please check your email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[628px] space-y-5">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/union-bakery.png"
              alt="Union Bakery Logo"
              width={129.6}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          {/* Form Login */}
          <div className="bg-white p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50">
            <h2 className="mb-2 font-sans text-2xl font-bold uppercase">
              Returning Customers
            </h2>
            <p className="mb-6 font-sans text-sm leading-relaxed opacity-70">
              If you already have an account, please log in to continue
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="pr-8"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-primary p-1"
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeClosed className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-[10px]" />
                      <div className="text-right pt-2">
                        <div className="cursor-pointer text-[9px] font-bold uppercase text-primary hover:text-foreground underline-offset-4 hover:underline transition-colors">
                          Forgot Password
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-none font-bold uppercase text-white transition-colors "
                >
                  {isLoading ? "Processing..." : "Login"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Register Link */}
          <div className="bg-white p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50">
            <h2 className="mb-2 font-sans text-2xl font-bold uppercase">
              New Customers
            </h2>
            <p className="mb-6 font-sans text-xs opacity-70 leading-relaxed">
              Create an account for seamless checkout experience & access to
              your order history.
            </p>
            <Button
              asChild
              variant="default"
              className="w-full rounded-none font-bold uppercase text-white transition-colors cursor-pointer "
            >
              <Link href="/account/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
