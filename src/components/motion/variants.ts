import type { Variants } from "motion/react";

import type {
  PullimFadeSlideUpOptions,
  PullimFadeSlideXOptions,
  PullimMotionBaseOptions,
  PullimPulseOptions,
  PullimScaleInOptions,
  PullimStaggerContainerOptions,
} from "./types";

// Pullim 공용 variants: 등장 계열은 hidden→show, 펄스는 initial→animate(반복).
const defaultEase = [0.16, 1, 0.3, 1] as const;

function transition(
  opts: PullimMotionBaseOptions | undefined,
  overrides?: Partial<{ duration: number; ease: typeof defaultEase | string }>,
) {
  return {
    duration: overrides?.duration ?? opts?.duration ?? 0.25,
    ease: (overrides?.ease ?? opts?.ease ?? defaultEase) as PullimMotionBaseOptions["ease"],
    delay: opts?.delay,
  };
}

/**
 * 단순 페이드만. 모달 오버레이, 토스트 배경 등 **이동 없이** 나타날 때.
 * Variants: `hidden` → `show` (opacity만).
 */
export function fadeIn(opts?: PullimMotionBaseOptions): Variants {
  const from = opts?.opacityFrom ?? 0;
  const to = opts?.opacityTo ?? 1;
  return {
    hidden: { opacity: from },
    show: {
      opacity: to,
      transition: transition(opts),
    },
  };
}

/**
 * 페이드 + 아래→위 슬라이드. 카드·섹션·리스트 행 등 **가장 많이 쓰는 등장** 패턴.
 * Variants: `hidden` → `show` (opacity + `y`).
 */
export function fadeSlideUp(opts?: PullimFadeSlideUpOptions): Variants {
  const from = opts?.opacityFrom ?? 0;
  const to = opts?.opacityTo ?? 1;
  const y = opts?.y ?? 10;
  return {
    hidden: { opacity: from, y },
    show: {
      opacity: to,
      y: 0,
      transition: transition(opts),
    },
  };
}

/**
 * 페이드 + 좌우 슬라이드. 배너, 사이드 패널, 가로 캐러셀 조각 등.
 * `direction`: 왼쪽(`left`, 기본) 또는 오른쪽(`right`)에서 `x`만큼 밀린 뒤 제자리.
 */
export function fadeSlideX(opts?: PullimFadeSlideXOptions): Variants {
  const from = opts?.opacityFrom ?? 0;
  const to = opts?.opacityTo ?? 1;
  const distance = opts?.x ?? 24;
  const x = opts?.direction === "right" ? distance : -distance;
  return {
    hidden: { opacity: from, x },
    show: {
      opacity: to,
      x: 0,
      transition: transition(opts),
    },
  };
}

/**
 * 리스트·그리드 **부모** 전용. `staggerChildren` / `delayChildren`만 담당.
 * 자식 각각에는 `staggerItem`(또는 동일한 `hidden`/`show` 구조의 variants)을 붙인다.
 * `fadeContainer: true`면 컨테이너 전체가 함께 페이드된다.
 */
export function staggerContainer(opts?: PullimStaggerContainerOptions): Variants {
  const fade = opts?.fadeContainer ?? false;
  const opacityFrom = opts?.opacityFrom ?? 0;
  const opacityTo = opts?.opacityTo ?? 1;
  const baseHidden = fade ? { opacity: opacityFrom } : {};
  const baseShow = fade
    ? {
        opacity: opacityTo,
        transition: {
          staggerChildren: opts?.staggerChildren ?? 0.08,
          delayChildren: opts?.delayChildren ?? 0,
          duration: opts?.duration ?? 0.25,
          ease: opts?.ease ?? defaultEase,
          delay: opts?.delay,
        },
      }
    : {
        transition: {
          staggerChildren: opts?.staggerChildren ?? 0.08,
          delayChildren: opts?.delayChildren ?? 0,
          delay: opts?.delay,
        },
      };
  return {
    hidden: baseHidden,
    show: baseShow,
  };
}

/**
 * `staggerContainer`의 **직계 자식**에 붙이는 variants. 기본 동작은 `fadeSlideUp`과 동일.
 * 자식마다 `options`로 `y`, opacity, duration 등을 개별 조정할 수 있다.
 */
export function staggerItem(opts?: PullimFadeSlideUpOptions): Variants {
  return fadeSlideUp(opts);
}

/**
 * 살짝 작았다가 커지며 페이드. 버튼·칩·인디케이터 dot 등 **포인트 UI**에 어울림.
 * Variants: `hidden` → `show` (opacity + scale).
 */
export function scaleIn(opts?: PullimScaleInOptions): Variants {
  const from = opts?.opacityFrom ?? 0;
  const to = opts?.opacityTo ?? 1;
  const scaleFrom = opts?.scaleFrom ?? 0.95;
  const scaleTo = opts?.scaleTo ?? 1;
  return {
    hidden: { opacity: from, scale: scaleFrom },
    show: {
      opacity: to,
      scale: scaleTo,
      transition: transition(opts),
    },
  };
}

/**
 * scale·opacity 키프레임을 **반복**한다. 타이핑 커서, 로딩 말풍선 등.
 * Variants: `initial` → `animate` (루프). `PullimPulse` 또는 `initial="initial" animate="animate"`와 조합.
 */
export function pulse(opts?: PullimPulseOptions): Variants {
  const duration = opts?.duration ?? 1.5;
  const repeat = opts?.repeat ?? Infinity;
  const scale = opts?.scale ?? ([1, 1.05, 1] as [number, number, number]);
  const opacity = opts?.opacity ?? ([1, 0.85, 1] as [number, number, number]);
  return {
    initial: { scale: scale[0], opacity: opacity[0] },
    animate: {
      scale,
      opacity,
      transition: {
        duration,
        repeat,
        ease: opts?.ease ?? "easeInOut",
      },
    },
  };
}

/**
 * 기본 옵션으로 생성한 variants 묶음.
 * `motion.div` 등에 `variants={pullimMotionPresets.fadeSlideUp}` 처럼 바로 넘길 때 사용.
 */
export const pullimMotionPresets = {
  /** @see fadeIn */
  fadeIn: fadeIn(),
  /** @see fadeSlideUp */
  fadeSlideUp: fadeSlideUp(),
  /** @see fadeSlideX — 왼쪽에서 진입 */
  fadeSlideX: fadeSlideX(),
  /** @see fadeSlideX — 오른쪽에서 진입 */
  fadeSlideXFromRight: fadeSlideX({ direction: "right" }),
  /** @see staggerContainer — 컨테이너도 페이드 */
  staggerContainer: staggerContainer(),
  /** @see staggerContainer — 컨테이너 페이드 없이 자식만 stagger */
  staggerContainerNoFade: staggerContainer({ fadeContainer: false }),
  /** @see staggerItem */
  staggerItem: staggerItem(),
  /** @see scaleIn */
  scaleIn: scaleIn(),
  /** @see pulse */
  pulse: pulse(),
} as const;
