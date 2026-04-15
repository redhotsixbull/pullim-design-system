import type { ReactNode } from "react";
import { cn } from "../../../../lib/utils";

interface RichTextProps {
  text: string;
  className?: string;
}

/**
 * 제한된 HTML 태그를 안전하게 React 엘리먼트로 변환한다.
 * 허용 태그: <u>, <b>, <br>, <box>
 * dangerouslySetInnerHTML 미사용.
 */
export function RichText({ text, className }: RichTextProps) {
  const nodes = parseRichText(text);
  return <span className={cn("whitespace-pre-wrap", className)}>{nodes}</span>;
}

// ── Parser ──

const TAG_REGEX = /<(br\s*\/?>|\/?(u|b|box))>/gi;

function parseRichText(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  const stack: { tag: string; children: ReactNode[] }[] = [];
  let current: ReactNode[] = result;
  let lastIndex = 0;
  let keyCounter = 0;

  let match: RegExpExecArray | null;
  while ((match = TAG_REGEX.exec(text)) !== null) {
    // 태그 앞의 텍스트 추가
    if (match.index > lastIndex) {
      current.push(text.slice(lastIndex, match.index));
    }
    lastIndex = match.index + match[0].length;

    const raw = match[1].toLowerCase().trim();

    // <br> / <br/>
    if (raw.startsWith("br")) {
      current.push(<br key={`br-${keyCounter++}`} />);
      continue;
    }

    // 닫는 태그
    if (raw.startsWith("/")) {
      const tagName = raw.slice(1);
      if (stack.length > 0 && stack[stack.length - 1].tag === tagName) {
        const frame = stack.pop()!;
        const parent = stack.length > 0 ? stack[stack.length - 1].children : result;
        parent.push(wrapTag(tagName, frame.children, keyCounter++));
        current = parent;
      }
      continue;
    }

    // 여는 태그
    const frame = { tag: raw, children: [] as ReactNode[] };
    stack.push(frame);
    current = frame.children;
  }

  // 남은 텍스트
  if (lastIndex < text.length) {
    current.push(text.slice(lastIndex));
  }

  // 닫히지 않은 태그 처리 — 그냥 텍스트로 flush
  while (stack.length > 0) {
    const frame = stack.pop()!;
    const parent = stack.length > 0 ? stack[stack.length - 1].children : result;
    parent.push(...frame.children);
    current = parent;
  }

  return result;
}

function wrapTag(tag: string, children: ReactNode[], key: number): ReactNode {
  switch (tag) {
    case "u":
      return (
        <span key={`u-${key}`} className="underline">
          {children}
        </span>
      );
    case "b":
      return <strong key={`b-${key}`}>{children}</strong>;
    case "box":
      return (
        <span key={`box-${key}`} className="border-foreground inline-block border px-1">
          {children}
        </span>
      );
    default:
      return <span key={`unknown-${key}`}>{children}</span>;
  }
}
