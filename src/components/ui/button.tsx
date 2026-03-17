import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md shrink-0 cursor-pointer",
    "text-sm font-medium whitespace-nowrap",
    "transition-all outline-none",
    "disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-600",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-pullim-500 text-gray-50 hover:bg-pullim-500/90 focus-visible:ring-pullim-500/50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive/50",
        outline:
          "border border-border bg-background text-foreground shadow-sm hover:bg-gray-100 hover:text-foreground focus-visible:ring-pullim-500/50",
        secondary:
          "bg-gray-200 text-secondary-foreground hover:bg-gray-200/80 focus-visible:ring-pullim-500/50",
        ghost:
          "text-gray-700 hover:bg-accent hover:text-accent-foreground focus-visible:ring-pullim-500/50",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-pullim-500/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
