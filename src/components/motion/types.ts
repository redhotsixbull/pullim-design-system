import type { Transition } from "motion/react";

/**
 * 불투명도만 조절할 때 쓰는 옵션.
 * `hidden`/`show` 또는 `initial` 계열 variant와 함께 쓰인다.
 */
export interface PullimMotionOpacityOptions {
  /** 등장 전(hidden) 불투명도. 기본 `0`. */
  opacityFrom?: number;
  /** 등장 후(show) 불투명도. 기본 `1`. */
  opacityTo?: number;
}

/** 시간·이징. 모든 등장 계열 variant에서 공통으로 사용. */
export interface PullimMotionTimingOptions {
  /** 초 단위. 미지정 시 팩토리 기본값(보통 0.25s 전후). */
  duration?: number;
  /** Motion `Transition["ease"]`. 미지정 시 팩토리 기본 커브. */
  ease?: Transition["ease"];
  /** 시작 전 대기(초). */
  delay?: number;
}

/** 페이드·슬라이드·스케일 등에 쓰는 공통 튜닝(불투명도 + 시간). */
export type PullimMotionBaseOptions = PullimMotionOpacityOptions & PullimMotionTimingOptions;

/**
 * `fadeSlideUp` / `staggerItem`용.
 * 세로 오프셋만 추가로 조절한다.
 */
export interface PullimFadeSlideUpOptions extends PullimMotionBaseOptions {
  /** 시작 시 아래로 밀린 픽셀(양수). 기본 `10` → 위로 올라오며 등장. */
  y?: number;
}

/**
 * `fadeSlideX`용.
 * 좌우에서 슬라이드하며 페이드할 때 사용.
 */
export interface PullimFadeSlideXOptions extends PullimMotionBaseOptions {
  /** `left`: 왼쪽에서, `right`: 오른쪽에서 들어옴. 기본 `left`. */
  direction?: "left" | "right";
  /** 시작 시 좌우 오프셋 픽셀(절댓값). 기본 `24`. */
  x?: number;
}

/**
 * `scaleIn`용.
 * 살짝 작은 상태에서 확대되며 나타나는 느낌.
 */
export interface PullimScaleInOptions extends PullimMotionBaseOptions {
  /** hidden 단계 scale. 기본 `0.95`. */
  scaleFrom?: number;
  /** show 단계 scale. 기본 `1`. */
  scaleTo?: number;
}

/**
 * `staggerContainer`용.
 * 자식들의 등장 시점을 `staggerChildren`으로 어긋난다.
 */
export interface PullimStaggerContainerOptions extends PullimMotionTimingOptions {
  /** 자식 variant 간 간격(초). 기본 `0.08`. */
  staggerChildren?: number;
  /** 첫 자식 시작 전 컨테이너 전체 지연(초). 기본 `0`. */
  delayChildren?: number;
  /**
   * `true`면 컨테이너 자체도 opacity로 페이드한다.
   * `false`면 컨테이너는 레이아웃만 잡고, 자식만 순차 등장.
   */
  fadeContainer?: boolean;
  /** `fadeContainer`일 때만 의미 있음. hidden opacity. 기본 `0`. */
  opacityFrom?: number;
  /** `fadeContainer`일 때만 의미 있음. show opacity. 기본 `1`. */
  opacityTo?: number;
}

/**
 * `pulse`용.
 * 로딩/타이핑 인디케이터처럼 **반복**되는 움직임.
 */
export interface PullimPulseOptions {
  /** 한 사이클 길이(초). 기본 `1.5`. */
  duration?: number;
  /** 기본 `Infinity`. 숫자면 그 횟수만 반복. */
  repeat?: number | typeof Infinity;
  /** scale 키프레임 `[시작, 피크, 끝]`. 기본 `[1, 1.05, 1]`. */
  scale?: [number, number, number];
  /** opacity 키프레임 `[시작, 중간, 끝]`. 기본 `[1, 0.85, 1]`. */
  opacity?: [number, number, number];
  ease?: Transition["ease"];
}
