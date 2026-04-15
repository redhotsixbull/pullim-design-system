import type {
  ComponentBlock,
  ContainerBlock,
  SplitBlock,
  CompositeBlock,
  CompositeWithBoxBlock,
  LabeledParagraphBlock,
} from "./types";
import { COMMON_TYPES, parseCommonBlock } from "../subject/common";
import { ENGLISH_TYPES, parseEnglishBlock } from "../subject/english";
import { KOREAN_TYPES, parseKoreanBlock } from "../subject/korean";
import { MATH_TYPES, parseMathBlock } from "../subject/math";
import { VISUAL_TYPES, parseVisualBlock } from "../visual";

// ── Type Guards ──

export function isSplitBlock(block: ComponentBlock): block is SplitBlock {
  return block.type === "split-block";
}

export function isCompositeBlock(block: ComponentBlock): block is CompositeBlock {
  return block.type === "composite";
}

export function isCompositeWithBoxBlock(block: ComponentBlock): block is CompositeWithBoxBlock {
  return block.type === "composite-with-box";
}

export function isLabeledParagraphBlock(block: ComponentBlock): block is LabeledParagraphBlock {
  return block.type === "labeled-paragraph";
}

// ── Type Registry ──

const CONTAINER_TYPES = new Set([
  "split-block",
  "composite",
  "composite-with-box",
  "labeled-paragraph",
]);

// ── Parsers ──

export function parseComponentBlock(raw: unknown): ComponentBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("ComponentBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;
  const type = String(obj.type);

  if (CONTAINER_TYPES.has(type)) return parseContainerBlock(raw);
  if (COMMON_TYPES.has(type)) return parseCommonBlock(raw);
  if (ENGLISH_TYPES.has(type)) return parseEnglishBlock(raw);
  if (KOREAN_TYPES.has(type)) return parseKoreanBlock(raw);
  if (MATH_TYPES.has(type)) return parseMathBlock(raw);
  if (VISUAL_TYPES.has(type)) return parseVisualBlock(raw);

  throw new Error(`Unknown ComponentBlock type: ${type}`);
}

function parseContainerBlock(raw: unknown): ContainerBlock {
  const obj = raw as Record<string, unknown>;

  switch (obj.type) {
    case "split-block":
      return {
        type: "split-block",
        left: (obj.left as unknown[]).map(parseComponentBlock),
        right: (obj.right as unknown[]).map(parseComponentBlock),
      };

    case "composite":
      return {
        type: "composite",
        label: String(obj.label),
        blocks: (obj.blocks as unknown[]).map(parseComponentBlock),
      };

    case "composite-with-box":
      return {
        type: "composite-with-box",
        blocks: (obj.blocks as unknown[]).map(parseComponentBlock),
      };

    case "labeled-paragraph":
      return {
        type: "labeled-paragraph",
        label: String(obj.label),
        blocks: (obj.blocks as unknown[]).map(parseComponentBlock),
      };

    default:
      throw new Error(`Unknown ContainerBlock type: ${String(obj.type)}`);
  }
}
