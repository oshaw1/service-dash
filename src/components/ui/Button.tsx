import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-transparent",
  {
    variants: {
      variant: {
        default:
          "hover-gradient-animate text-neutral-300 rounded-md border border-neutral-400 hover:text-neutral-300 hover:bg-neutral-700 active:bg-blue-700",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        secondary:
          "text-neutral-500 rounded-md border border-neutral-600 hover:text-neutral-300 hover:bg-neutral-700 active:bg-blue-700",
        ghost: "hover:bg-blue-500 hover:text-white active:bg-blue-600",
        nav: "w-full flex items-center rounded-md py-2 justify-center text-sm font-medium hover:bg-neutral-700 active:bg-blue-700/50 active:border-blue-900",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };