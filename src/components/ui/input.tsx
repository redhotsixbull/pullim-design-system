import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          "bg-card rounded-md border border-gray-200 shadow-sm",
          "text-foreground h-9 w-full px-3 py-1 text-sm",
          "font-sans leading-5 font-normal",
          "placeholder:text-muted-foreground placeholder:font-normal",
          "focus:border-ring focus:ring-pullim-500 focus:ring-[2px] focus:outline-none",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-1",
          "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
