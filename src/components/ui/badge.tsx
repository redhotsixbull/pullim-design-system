import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md border",
    "px-1.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0",
    "[&>svg]:size-3.5 [&>svg]:pointer-events-none",
    "focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "transition-colors overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: {
        /* ── Semantic ── */
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90",
        outline:
          "border-border text-foreground bg-transparent [a&]:hover:bg-accent",

        /* ── 상태 색상 (토큰 기반) ── */
        red:
          "border-transparent bg-red-200 text-red",
        blue:
          "border-transparent bg-pullim-100 text-pullim-500",
        green:
          "border-transparent bg-green-surface text-green-text",
        orange:
          "border-transparent bg-warning-surface text-warning",
        gray:
          "border-transparent bg-gray-300 text-gray-700",
        darkGray:
          "border-transparent bg-gray-700 text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
