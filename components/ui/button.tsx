import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-secondary text-on-secondary-container shadow-sm hover:bg-secondary-container active:scale-95",
        
        outline: "border border-[#c6c6cd] bg-white hover:bg-[#f8f9ff] hover:text-[#4648d4] hover:border-[#4648d4]",
        
        secondary: "bg-[#eff4ff] text-[#4648d4] hover:bg-[#e5eeff] active:scale-95",
        
        ghost: "hover:bg-[#eff4ff] hover:text-[#4648d4]",
        
        destructive: "bg-[#ba1a1a] text-white shadow-sm hover:bg-[#d32f2f] active:scale-95",
        
        link: "text-[#4648d4] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-sm",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-12 rounded-sm px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? "span" : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }