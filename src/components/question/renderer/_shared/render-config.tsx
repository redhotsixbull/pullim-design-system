"use client";

import { createContext, useContext } from "react";

export type RenderVariant = "preview" | "print" | "compact";

export interface RenderConfig {
  /** 전체 문제 스케일 (0.5 ~ 2.0, 기본값 1) */
  scale: number;
  /** 렌더링 프리셋 */
  variant: RenderVariant;
}

export const DEFAULT_RENDER_CONFIG: RenderConfig = {
  scale: 1,
  variant: "preview",
};

/** variant별 간격 프리셋 (Tailwind 클래스) */
export const VARIANT_GAPS: Record<
  RenderVariant,
  { section: string; block: string; inner: string }
> = {
  preview: { section: "space-y-6", block: "space-y-4", inner: "space-y-3" },
  print: { section: "space-y-4", block: "space-y-3", inner: "space-y-2" },
  compact: { section: "space-y-2", block: "space-y-1.5", inner: "space-y-1" },
};

const RenderConfigContext = createContext<RenderConfig>(DEFAULT_RENDER_CONFIG);

export function RenderConfigProvider({
  config,
  children,
}: {
  config: RenderConfig;
  children: React.ReactNode;
}) {
  return <RenderConfigContext.Provider value={config}>{children}</RenderConfigContext.Provider>;
}

export function useRenderConfig(): RenderConfig {
  return useContext(RenderConfigContext);
}
