import type {
  KoreanBlock,
  AnnotatedParagraphBlock,
  MultiBoxesBlock,
  NoteStylePassageBlock,
  PaperStylePassageBlock,
  PassageBlockBlock,
} from "./types";
import type { TextWithBoxBlock } from "../common/types";

// ── Type Guards ──

export function isAnnotatedParagraphBlock(block: KoreanBlock): block is AnnotatedParagraphBlock {
  return block.type === "annotated-paragraph";
}

export function isMultiBoxesBlock(block: KoreanBlock): block is MultiBoxesBlock {
  return block.type === "multi-boxes";
}

export function isNoteStylePassageBlock(block: KoreanBlock): block is NoteStylePassageBlock {
  return block.type === "note-style-passage";
}

export function isPaperStylePassageBlock(block: KoreanBlock): block is PaperStylePassageBlock {
  return block.type === "paper-style-passage";
}

export function isPassageBlockBlock(block: KoreanBlock): block is PassageBlockBlock {
  return block.type === "passage-block";
}

// ── Parser ──

export const KOREAN_TYPES = new Set([
  "annotated-paragraph",
  "multi-boxes",
  "note-style-passage",
  "paper-style-passage",
  "passage-block",
]);

function parsePassageInnerBlock(raw: unknown): TextWithBoxBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("PassageInnerBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (obj.type !== "text-with-box") {
    throw new Error(`Invalid PassageInnerBlock type: ${String(obj.type)}`);
  }

  return { type: "text-with-box", text: String(obj.text) };
}

export function parseKoreanBlock(raw: unknown): KoreanBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("KoreanBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.type !== "string" || !KOREAN_TYPES.has(obj.type)) {
    throw new Error(`Invalid KoreanBlock type: ${String(obj.type)}`);
  }

  switch (obj.type) {
    case "annotated-paragraph":
      return {
        type: "annotated-paragraph",
        label: String(obj.label),
        text: String(obj.text),
      };

    case "multi-boxes":
      return {
        type: "multi-boxes",
        boxes: (obj.boxes as Record<string, unknown>[]).map((b) => ({
          label: String(b.label),
          text: String(b.text),
        })),
      };

    case "note-style-passage":
      return { type: "note-style-passage", text: String(obj.text) };

    case "paper-style-passage":
      return { type: "paper-style-passage", text: String(obj.text) };

    case "passage-block":
      return {
        type: "passage-block",
        blocks: (obj.blocks as unknown[]).map(parsePassageInnerBlock),
      };

    default:
      throw new Error(`Unknown KoreanBlock type: ${obj.type}`);
  }
}
