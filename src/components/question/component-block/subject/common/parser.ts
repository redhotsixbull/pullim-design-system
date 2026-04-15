import type {
  CommonBlock,
  TextBasicBlock,
  ImageSingleBlock,
  TextWithBoxBlock,
  PassageBlockGroupBlock,
  ViewBoxBlock,
  BulletListBlock,
} from "./types";

// ── Type Guards ──

export function isTextBasicBlock(block: CommonBlock): block is TextBasicBlock {
  return block.type === "text-basic";
}

export function isImageSingleBlock(block: CommonBlock): block is ImageSingleBlock {
  return block.type === "image-single";
}

export function isTextWithBoxBlock(block: CommonBlock): block is TextWithBoxBlock {
  return block.type === "text-with-box";
}

export function isPassageBlockGroupBlock(block: CommonBlock): block is PassageBlockGroupBlock {
  return block.type === "passage-block-group";
}

export function isViewBoxBlock(block: CommonBlock): block is ViewBoxBlock {
  return block.type === "view-box";
}

export function isBulletListBlock(block: CommonBlock): block is BulletListBlock {
  return block.type === "bullet-list";
}

// ── Parser ──

export const COMMON_TYPES = new Set([
  "text-basic",
  "image-single",
  "text-with-box",
  "passage-block-group",
  "view-box",
  "bullet-list",
]);

export function parseCommonBlock(raw: unknown): CommonBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("CommonBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.type !== "string" || !COMMON_TYPES.has(obj.type)) {
    throw new Error(`Invalid CommonBlock type: ${String(obj.type)}`);
  }

  switch (obj.type) {
    case "text-basic":
      return { type: "text-basic", text: String(obj.text) };

    case "image-single":
      return {
        type: "image-single",
        imageUrl: String(obj.imageUrl),
        alt: String(obj.alt),
      };

    case "text-with-box":
      return { type: "text-with-box", text: String(obj.text) };

    case "passage-block-group":
      return {
        type: "passage-block-group",
        blocks: (obj.blocks as Record<string, unknown>[]).map((b) => ({
          label: String(b.label),
          text: String(b.text),
        })),
      };

    case "view-box":
      return {
        type: "view-box",
        label: String(obj.label),
        text: String(obj.text),
      };

    case "bullet-list":
      return {
        type: "bullet-list",
        blocks: (obj.blocks as Record<string, unknown>[]).map((b) => ({
          label: String(b.label),
          text: String(b.text),
        })),
      };

    default:
      throw new Error(`Unknown CommonBlock type: ${obj.type}`);
  }
}
