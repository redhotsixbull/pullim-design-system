"use client";

import type { ReactNode } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "../../../../lib/utils";

interface ChartWrapperProps {
  title: string;
  description?: string | null;
  note?: string;
  height?: number;
  children: ReactNode;
  className?: string;
}

export const CHART_COLORS = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-korean)",
  "var(--color-english)",
  "var(--color-math)",
  "var(--color-social)",
  "var(--color-science)",
  "var(--color-info)",
];

/**
 * 차트 공통 래퍼.
 * title, description, note 렌더링 + ResponsiveContainer.
 */
export function ChartWrapper({
  title,
  description,
  note,
  height = 350,
  children,
  className,
}: ChartWrapperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <h3 className="text-foreground text-sm font-semibold">{title}</h3>
        {description && <p className="text-muted-foreground text-xs">{description}</p>}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        {children as React.ReactElement}
      </ResponsiveContainer>
      {note && <p className="text-muted-foreground text-xs italic">{note}</p>}
    </div>
  );
}
