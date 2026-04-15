import type { MathBlock, ImageAfterOptionsBlock } from "./types";

export function isImageAfterOptionsBlock(block: MathBlock): block is ImageAfterOptionsBlock {
  return block.type === "image-after-options";
}

export const MATH_TYPES = new Set(["image-after-options"]);

export function parseMathBlock(raw: unknown): MathBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("MathBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.type !== "string" || !MATH_TYPES.has(obj.type)) {
    throw new Error(`Invalid MathBlock type: ${String(obj.type)}`);
  }

  return {
    type: "image-after-options",
    imageUrl: String(obj.imageUrl),
    alt: String(obj.alt),
  };
}
