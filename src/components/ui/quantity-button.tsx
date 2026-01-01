import * as React from "react";
import { cn } from "@/lib/utils";

type QuantityButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const QuantityButton = React.forwardRef<HTMLButtonElement, QuantityButtonProps>(
  ({ className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        type="button"
        className={cn(
          "group flex h-9 w-9 items-center justify-center rounded-full border transition-all",
          disabled
            ? "border-gray-200 text-gray-300 cursor-not-allowed opacity-70 bg-transparent"
            : "border-primary text-primary hover:bg-primary hover:text-white bg-transparent",
            
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
QuantityButton.displayName = "QuantityButton";

export { QuantityButton };