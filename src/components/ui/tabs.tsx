"use client";

import * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../lib/utils";

function Tabs({
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

function TabsList({
  className,
  variant = "solid",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: "solid" | "line";
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        variant === "solid" &&
          "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        variant === "line" &&
          "inline-flex items-center justify-start gap-0 border-b border-border bg-transparent p-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  variant = "solid",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  variant?: "solid" | "line";
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        /* 공통 */
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",

        /* solid */
        variant === "solid" && [
          "rounded-md px-3 py-1",
          "ring-offset-background",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ],

        /* line */
        variant === "line" && [
          "relative px-4 py-2.5 rounded-none",
          "text-muted-foreground hover:text-foreground hover:bg-gray-100",
          "data-[state=active]:text-pullim-500 data-[state=active]:font-semibold",
          /* 하단 인디케이터 */
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-t-full",
          "after:bg-transparent data-[state=active]:after:bg-pullim-500",
        ],

        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "mt-2 ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
