import type { LucideIcon, LucideProps } from "lucide-react";

/**
 * Lucide와 동일한 props. 커스텀 아이콘도 이 형태를 맞추면 교체 시 타입이 유지된다.
 */
export type PullimIconProps = LucideProps;

/** Pullim에서 노출하는 아이콘 컴포넌트 타입 (Lucide와 동일 시그니처). */
export type { LucideIcon };
