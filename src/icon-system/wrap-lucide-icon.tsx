import * as React from "react";
import type { LucideIcon } from "lucide-react";

import type { PullimIconProps } from "./types";

/**
 * Lucide 아이콘을 Pullim 아이콘 레이어로 감싼다.
 * `displayName`은 DevTools·오버라이드 맵 키로 쓰이므로 export 이름과 맞출 것.
 */
export function wrapLucideIcon(displayName: string, Source: LucideIcon): LucideIcon {
  const Wrapped = React.forwardRef<SVGSVGElement, PullimIconProps>(function PullimWrappedIcon(
    props,
    ref,
  ) {
    return <Source ref={ref} {...props} />;
  });
  Wrapped.displayName = `PullimIcon(${displayName})`;
  return Wrapped as LucideIcon;
}
