import type { ReactNode } from "react";
import { cn } from "../../../../lib/utils";

interface LabeledBoxProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

/**
 * 테두리 박스 + 선택적 라벨 뱃지.
 * text-with-box, view-box, multi-boxes, composite-with-box 등에서 공용.
 */
export function LabeledBox({ label, children, className }: LabeledBoxProps) {
  return (
    <div className={cn("border-border rounded-md border p-4", className)}>
      {label && (
        <span className="bg-muted text-muted-foreground mb-2 inline-block rounded px-2 py-0.5 text-sm font-medium">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
