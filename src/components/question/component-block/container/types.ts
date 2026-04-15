import type { CommonBlock } from "../subject/common";
import type { EnglishBlock } from "../subject/english";
import type { KoreanBlock } from "../subject/korean";
import type { MathBlock } from "../subject/math";
import type { VisualBlock } from "../visual";

// ── Content Block (리프 블록 합집합) ──

export type ContentBlock = CommonBlock | EnglishBlock | KoreanBlock | MathBlock | VisualBlock;

// ── Component Block (최종 유니온, 재귀) ──

export type ComponentBlock = ContentBlock | ContainerBlock;

// ── Split Block ──

export interface SplitBlock {
  type: "split-block";
  left: ComponentBlock[];
  right: ComponentBlock[];
}

// ── Composite ──

export interface CompositeBlock {
  type: "composite";
  label: string;
  blocks: ComponentBlock[];
}

// ── Composite With Box ──

export interface CompositeWithBoxBlock {
  type: "composite-with-box";
  blocks: ComponentBlock[];
}

// ── Labeled Paragraph ──

export interface LabeledParagraphBlock {
  type: "labeled-paragraph";
  label: string;
  blocks: ComponentBlock[];
}

// ── Container Block (컨테이너 합집합) ──

export type ContainerBlock =
  | SplitBlock
  | CompositeBlock
  | CompositeWithBoxBlock
  | LabeledParagraphBlock;
