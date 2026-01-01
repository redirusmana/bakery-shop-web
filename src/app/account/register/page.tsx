"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Eye, EyeClosed, Check } from "lucide-react";
import { AxiosError } from "axios";

import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { useAuthStore } from "@/stores/use-auth-store";
import { useCartStore } from "@/stores/use-cart-store";
import { useCheckout } from "@/hooks/cart/use-cart-checkout";
import { SavedCheckoutData } from "@/types/cart";

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Must contain at least one number" }),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  newsletter: z.boolean().default(false).optional(),
});

export default function RegisterPage() {
  const router = useRouter();

  // Store
  const { register } = useAuthStore();
  const { cartId } = useCartStore();
  const { checkout, updateBuyerIdentity } = useCheckout();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      newsletter: false,
    },
    mode: "onChange",
  });

  // Logic Password
  const password = form.watch("password") || "";
  const requirements = [
    { id: "length", label: "8 characters", isValid: password.length >= 8 },
    {
      id: "case",
      label: "Upper & lower case",
      isValid: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
    { id: "number", label: "Number", isValid: /\d/.test(password) },
  ];
  const strength = requirements.filter((r) => r.isValid).length;

  const getStrengthBarColor = (level: number) => {
    if (strength < level) return "bg-gray-100";
    switch (strength) {
      case 1:
        return "bg-destructive/70";
      case 2:
        return "bg-yellow-400";
      default:
        return "bg-primary";
    }
  };

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      await register(values);

      toast.success("Welcome! Your account has been created");

      if (cartId) {
        await updateBuyerIdentity().catch((error: Error) =>
          console.error("Identity sync warning:", error)
        );
      }

      const isPendingCheckout = localStorage.getItem("pendingCheckout");

      if (isPendingCheckout) {
        toast.info("Resuming your checkout...");
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
      let msg = "Registration failed";
      if (error instanceof AxiosError && error.response?.data?.message) {
        msg = String(error.response.data.message);
      } else if (error instanceof Error) {
        msg = error.message;
      }
      toast.error(msg, {
        description: "Registration failed. Please try again or contact support",
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

          <div className="bg-white p-6 sm:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <h2 className="mb-2 font-sans text-2xl font-bold uppercase ">
              New Customers
            </h2>
            <p className="mb-6 font-sans text-sm leading-relaxed">
              Create an account for seamless checkout experience & access <br />
              to your order history.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Field Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage className="text-base" />
                    </FormItem>
                  )}
                />

                {/* Field Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
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

                      {/* Strength Bars */}
                      <div className="flex h-0.5 w-full gap-1 mt-2">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              "h-full flex-1 transition-all duration-300",
                              getStrengthBarColor(level)
                            )}
                          />
                        ))}
                      </div>

                      {/* Checklist */}
                      <div className="mt-2 flex flex-col gap-x-3 gap-y-1">
                        {requirements.map((req) => (
                          <div
                            key={req.id}
                            className={cn(
                              "flex items-center gap-1 text-[9px] transition-colors duration-200",
                              req.isValid
                                ? "text-primary font-medium"
                                : "text-gray-400"
                            )}
                          >
                            {req.isValid ? (
                              <Check className="h-2.5 w-2.5" />
                            ) : (
                              <div className="h-1 w-1 rounded-full bg-gray-300" />
                            )}
                            <span>{req.label}</span>
                          </div>
                        ))}
                      </div>
                      <FormMessage className="text-base" />
                    </FormItem>
                  )}
                />

                {/* Names */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage className="text-base" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage className="text-base" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Newsletter */}
                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-none border-gray-300 data-[state=checked]:bg-primary h-4 w-4"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <p className="font-sans text-sm">
                          Send me latest info & promotions about Union Bakery
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-none font-bold uppercase mt-2"
                >
                  {isLoading ? "Creating Account..." : "Register"}
                </Button>

                <div className="text-center mt-4">
                  <p className="font-sans text-base">
                    By signing up, you agree to our{" "}
                    <div className="cursor-pointer font-bold hover:text-primary">
                      Terms
                    </div>{" "}
                    and{" "}
                    <div className="cursor-pointer font-bold hover:text-primary">
                      Privacy Policy
                    </div>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
