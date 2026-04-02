"use client";

/**
 * Pullim용 `motion.div` 래퍼.
 * 내부적으로 fadeIn 등 variants와 `hidden`/`show`(펄스는 `initial`/`animate`)를 맞춰 둔다.
 * 페이지 전환 대신 한 블록 등장에 쓰고, 라우트 전환은 앱에서 `AnimatePresence`와 조합하면 된다.
 */
import * as React from "react";
import { motion } from "motion/react";

import { cn } from "../../lib/utils";

import type {
  PullimFadeSlideUpOptions,
  PullimFadeSlideXOptions,
  PullimMotionBaseOptions,
  PullimPulseOptions,
  PullimScaleInOptions,
  PullimStaggerContainerOptions,
} from "./types";
import {
  fadeIn,
  fadeSlideUp,
  fadeSlideX,
  pulse as pulseVariants,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "./variants";

type MotionDivProps = React.ComponentProps<typeof motion.div>;

/**
 * - `mount`: 마운트 직후 `animate="show"`.
 * - `inView`: 뷰포트에 들어올 때 `whileInView="show"` (기본 `once`, `margin`).
 */
export type PullimWhen = "mount" | "inView";

type OmitAnim = Omit<
  MotionDivProps,
  "initial" | "animate" | "variants" | "whileInView" | "children"
>;

function animProps(
  when: PullimWhen,
  viewport: MotionDivProps["viewport"] | undefined,
) {
  if (when === "inView") {
    return {
      initial: "hidden" as const,
      whileInView: "show" as const,
      viewport: viewport ?? { once: true, margin: "-40px" },
    };
  }
  return {
    initial: "hidden" as const,
    animate: "show" as const,
  };
}

export type PullimFadeInProps = OmitAnim & {
  options?: PullimMotionBaseOptions;
  when?: PullimWhen;
  viewport?: MotionDivProps["viewport"];
  children?: React.ReactNode;
};

/** `fadeIn` variants — opacity만. */
export const PullimFadeIn = React.forwardRef<HTMLDivElement, PullimFadeInProps>(
  function PullimFadeIn(
    { className, options, when = "mount", viewport, children, ...props },
    ref,
  ) {
    const a = animProps(when, viewport);
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={fadeIn(options)}
        {...a}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
PullimFadeIn.displayName = "PullimFadeIn";

export type PullimFadeSlideUpProps = OmitAnim & {
  options?: PullimFadeSlideUpOptions;
  when?: PullimWhen;
  viewport?: MotionDivProps["viewport"];
  children?: React.ReactNode;
};

/** `fadeSlideUp` — 페이드 + 아래에서 위로. */
export const PullimFadeSlideUp = React.forwardRef<
  HTMLDivElement,
  PullimFadeSlideUpProps
>(function PullimFadeSlideUp(
  { className, options, when = "mount", viewport, children, ...props },
  ref,
) {
  const a = animProps(when, viewport);
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={fadeSlideUp(options)}
      {...a}
      {...props}
    >
      {children}
    </motion.div>
  );
});
PullimFadeSlideUp.displayName = "PullimFadeSlideUp";

export type PullimFadeSlideXProps = OmitAnim & {
  options?: PullimFadeSlideXOptions;
  when?: PullimWhen;
  viewport?: MotionDivProps["viewport"];
  children?: React.ReactNode;
};

/** `fadeSlideX` — 페이드 + 좌우 슬라이드. */
export const PullimFadeSlideX = React.forwardRef<
  HTMLDivElement,
  PullimFadeSlideXProps
>(function PullimFadeSlideX(
  { className, options, when = "mount", viewport, children, ...props },
  ref,
) {
  const a = animProps(when, viewport);
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={fadeSlideX(options)}
      {...a}
      {...props}
    >
      {children}
    </motion.div>
  );
});
PullimFadeSlideX.displayName = "PullimFadeSlideX";

export type PullimScaleInProps = OmitAnim & {
  options?: PullimScaleInOptions;
  when?: PullimWhen;
  viewport?: MotionDivProps["viewport"];
  children?: React.ReactNode;
};

/** `scaleIn` — 살짝 확대되며 등장. */
export const PullimScaleIn = React.forwardRef<
  HTMLDivElement,
  PullimScaleInProps
>(function PullimScaleIn(
  { className, options, when = "mount", viewport, children, ...props },
  ref,
) {
  const a = animProps(when, viewport);
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={scaleIn(options)}
      {...a}
      {...props}
    >
      {children}
    </motion.div>
  );
});
PullimScaleIn.displayName = "PullimScaleIn";

export type PullimPulseProps = OmitAnim & {
  options?: PullimPulseOptions;
  children?: React.ReactNode;
};

/**
 * `pulse` — 반복 펄스. `initial`/`animate` variant 고정.
 * 등장·스크롤 트리거가 아니라 계속 도는 연출에 사용.
 */
export const PullimPulse = React.forwardRef<HTMLDivElement, PullimPulseProps>(
  function PullimPulse({ className, options, children, ...props }, ref) {
    const v = pulseVariants(options);
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={v}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
PullimPulse.displayName = "PullimPulse";

export type PullimStaggerRootProps = OmitAnim & {
  options?: PullimStaggerContainerOptions;
  when?: PullimWhen;
  viewport?: MotionDivProps["viewport"];
  children?: React.ReactNode;
};

/**
 * `staggerContainer` — 자식 `PullimStaggerItem` 순차 등장을 조율하는 루트.
 *
 * `when="mount"`일 때 Motion은 부모 `animate="show"`가 자식 mount보다 먼저 돌면
 * `variantChildren`이 비어 stagger가 스킵되고, 자식이 상속으로 동시에 show 되는
 * 경우가 있다. 한 프레임 뒤 `show`로 올려 자식 등록 후 stagger가 적용되게 한다.
 */
export const PullimStaggerRoot = React.forwardRef<
  HTMLDivElement,
  PullimStaggerRootProps
>(function PullimStaggerRoot(
  { className, options, when = "mount", viewport, children, ...props },
  ref,
) {
  const [mountShow, setMountShow] = React.useState(false);
  React.useLayoutEffect(() => {
    setMountShow(true);
  }, []);

  const a =
    when === "mount"
      ? ({
          initial: "hidden" as const,
          animate: mountShow ? ("show" as const) : ("hidden" as const),
        } as const)
      : animProps(when, viewport);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={staggerContainer(options)}
      {...a}
      {...props}
    >
      {children}
    </motion.div>
  );
});
PullimStaggerRoot.displayName = "PullimStaggerRoot";

export type PullimStaggerItemProps = OmitAnim & {
  options?: PullimFadeSlideUpOptions;
  children?: React.ReactNode;
};

/**
 * `staggerItem` — `PullimStaggerRoot` 직계 자식에서만 stagger 타이밍을 받는다.
 * `initial`/`animate`는 부모가 담당하므로 여기서는 `variants`만 설정한다.
 */
export const PullimStaggerItem = React.forwardRef<
  HTMLDivElement,
  PullimStaggerItemProps
>(function PullimStaggerItem({ className, options, children, ...props }, ref) {
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={staggerItem(options)}
      {...props}
    >
      {children}
    </motion.div>
  );
});
PullimStaggerItem.displayName = "PullimStaggerItem";
