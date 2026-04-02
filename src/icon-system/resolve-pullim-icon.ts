import type { LucideIcon } from "lucide-react";

import { pullimIconOverrides } from "./overrides";
import { wrapLucideIcon } from "./wrap-lucide-icon";

/**
 * 오버라이드가 있으면 그 컴포넌트, 없으면 Lucide를 래핑한 컴포넌트를 반환한다.
 * `icons` 엔트리의 각 export는 이 함수로 생성한다.
 */
export function resolvePullimIcon(displayName: string, lucide: LucideIcon): LucideIcon {
  const override = pullimIconOverrides[displayName];
  if (override) return override;
  return wrapLucideIcon(displayName, lucide);
}
