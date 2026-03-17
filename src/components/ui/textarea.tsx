import * as React from "react";

import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "bg-card rounded-md border border-gray-200 shadow-sm",
        "text-foreground min-h-[80px] w-full px-3 py-2 text-sm",
        "font-sans leading-relaxed font-normal",
        "placeholder:text-muted-foreground",
        "focus:border-ring focus:ring-pullim-500 focus:ring-[2px] focus:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-1",
        "resize-y",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
