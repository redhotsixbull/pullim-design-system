import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

/* =================================================================
 * Heading
 * as prop으로 시맨틱 태그를 지정하고, size prop으로 시각적 크기를 분리합니다.
 * 예: <Heading as="h2" size="xl">섹션 제목</Heading>
 * ================================================================= */
const headingVariants = cva("font-semibold leading-tight tracking-tight text-foreground", {
  variants: {
    size: {
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      base: "text-base",
    },
  },
  defaultVariants: { size: "2xl" },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag;
}

function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(headingVariants({ size }), className)}
      {...props}
    />
  );
}

/* =================================================================
 * Text
 * 일반 본문 텍스트. as prop으로 p/span/label/div 선택 가능.
 * ================================================================= */
const textVariants = cva("leading-relaxed text-foreground", {
  variants: {
    size: {
      xl: "text-xl",
      lg: "text-lg",
      base: "text-base",
      sm: "text-sm",
      xs: "text-xs",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    muted: {
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
  },
});

type TextTag = "p" | "span" | "div";

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: TextTag;
}

function Text({
  as: Tag = "p",
  size,
  weight,
  muted,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(textVariants({ size, weight, muted }), className)}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    />
  );
}

/* =================================================================
 * Lead
 * 섹션 소개 문구. h1/h2 아래에 위치하는 강조 본문.
 * ================================================================= */
function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-lg text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

/* =================================================================
 * Muted
 * 보조 설명, 힌트 텍스트 등에 사용합니다.
 * ================================================================= */
function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/* =================================================================
 * Code
 * 인라인 코드 스니펫.
 * ================================================================= */
function Code({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "relative rounded-md bg-gray-100 px-[0.4em] py-[0.2em]",
        "font-mono text-sm font-medium text-gray-900",
        "dark:bg-gray-800 dark:text-gray-100",
        className,
      )}
      {...props}
    />
  );
}

/* =================================================================
 * Blockquote
 * 인용문.
 * ================================================================= */
function Blockquote({ className, ...props }: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-pullim-500 pl-4 text-base italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Blockquote,
  Code,
  Heading,
  headingVariants,
  Lead,
  Muted,
  Text,
  textVariants,
};
