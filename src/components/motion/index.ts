/**
 * Motion 공용 API: 옵션 타입(`types`), variant 팩토리(`variants`), `motion.div` 래퍼(`wrappers`).
 * 메인 패키지에서도 동일 심볼을 re-export 한다.
 */
export type {
  PullimFadeSlideUpOptions,
  PullimFadeSlideXOptions,
  PullimMotionBaseOptions,
  PullimMotionOpacityOptions,
  PullimMotionTimingOptions,
  PullimPulseOptions,
  PullimScaleInOptions,
  PullimStaggerContainerOptions,
} from "./types";

export {
  fadeIn,
  fadeSlideUp,
  fadeSlideX,
  pulse,
  scaleIn,
  staggerContainer,
  staggerItem,
  pullimMotionPresets,
} from "./variants";

export {
  PullimFadeIn,
  PullimFadeSlideUp,
  PullimFadeSlideX,
  PullimPulse,
  PullimScaleIn,
  PullimStaggerItem,
  PullimStaggerRoot,
} from "./wrappers";

export type {
  PullimFadeInProps,
  PullimFadeSlideUpProps,
  PullimFadeSlideXProps,
  PullimPulseProps,
  PullimScaleInProps,
  PullimStaggerItemProps,
  PullimStaggerRootProps,
  PullimWhen,
} from "./wrappers";
