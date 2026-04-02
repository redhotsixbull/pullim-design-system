import type { LucideIcon } from "lucide-react";

/**
 * Lucide 기반 export만 교체할 때 사용한다. (`resolvePullimIcon`의 첫 인자와 동일한 키)
 * `NaverIcon`·`KakaoIcon` 같은 비-Lucide 아이콘은 `social-icons.tsx`에서 직접 export 하며 여기에 넣지 않는다.
 *
 * @example
 * ```ts
 * import { Search as SearchLucide } from "lucide-react";
 * import { PullimSearch } from "./custom/pullim-search";
 *
 * export const pullimIconOverrides: PullimIconOverrides = {
 *   Search: PullimSearch,
 * };
 * ```
 */
export type PullimIconOverrides = Partial<Record<string, LucideIcon>>;

/** 기본은 비어 있음. 필요한 항목만 추가한다. */
export const pullimIconOverrides: PullimIconOverrides = {};
