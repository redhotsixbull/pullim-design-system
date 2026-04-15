"use client";

import type { ReactNode } from "react";
import { useRenderConfig } from "./render-config";

interface ScaleWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * scale 값에 따라 전체 콘텐츠를 CSS transform으로 리사이징한다.
 * 컨테이너 높이를 보정하여 레이아웃이 깨지지 않도록 한다.
 */
export function ScaleWrapper({ children, className }: ScaleWrapperProps) {
  const { scale } = useRenderConfig();

  if (scale === 1) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{
        width: `${100 / scale}%`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
}
