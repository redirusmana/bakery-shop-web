import * as React from "react"
import { cn } from "@/lib/utils"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-none border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-none transition-colors",
          "placeholder:text-gray-300 resize-none",
          "focus-visible:outline-none focus-visible:border-black focus-visible:ring-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }