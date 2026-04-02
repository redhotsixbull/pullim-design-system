import * as React from "react";

import type { PullimIconProps } from "./types";

function iconDimensions(size: PullimIconProps["size"]) {
  if (size == null) return 24;
  if (typeof size === "number") return size;
  const parsed = Number.parseInt(String(size), 10);
  return Number.isFinite(parsed) ? parsed : 24;
}

/**
 * 네이버 로고 (Lucide 미제공). `size`·`className`·`color` 등은 Lucide 아이콘과 동일하게 사용.
 */
export const NaverIcon = React.forwardRef<SVGSVGElement, PullimIconProps>(function NaverIcon(
  { className, size, color, strokeWidth: _s, absoluteStrokeWidth: _a, ...props },
  ref,
) {
  const dim = iconDimensions(size);
  const { "aria-hidden": ariaHidden, ...svgProps } = props;
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      width={dim}
      height={dim}
      className={className}
      color={color}
      aria-hidden={ariaHidden ?? true}
      {...svgProps}
    >
      <path
        d="M13.6 10.4L6.4 0H0V20H6.4V9.6L13.6 20H20V0H13.6V10.4Z"
        fill="currentColor"
      />
    </svg>
  );
});
NaverIcon.displayName = "NaverIcon";

/**
 * 카카오톡 말풍선 마크 (Lucide 미제공).
 */
export const KakaoIcon = React.forwardRef<SVGSVGElement, PullimIconProps>(function KakaoIcon(
  { className, size, color, strokeWidth: _s, absoluteStrokeWidth: _a, ...props },
  ref,
) {
  const dim = iconDimensions(size);
  const { "aria-hidden": ariaHidden, ...svgProps } = props;
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 15"
      fill="none"
      width={dim}
      height={dim}
      className={className}
      color={color}
      aria-hidden={ariaHidden ?? true}
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58172 0 0 2.79086 0 6.23077C0 8.53846 1.79828 10.5385 4.36207 11.4615L3.44828 14.5385C3.37931 14.7692 3.65517 14.9231 3.82759 14.7692L7.58621 11.8462C7.72414 11.8462 7.86207 11.8462 8 11.8462C12.4183 11.8462 16 9.05538 16 5.61538C16 2.17538 12.4183 0 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
});
KakaoIcon.displayName = "KakaoIcon";
