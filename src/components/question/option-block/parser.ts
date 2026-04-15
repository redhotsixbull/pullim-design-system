import type {
  OptionBlock,
  TextOptionBlock,
  PairOptionBlock,
  ImageOptionBlock,
  TableOptionBlock,
} from "./types";

// ── Type Guards ──

export function isTextOptionBlock(block: OptionBlock): block is TextOptionBlock {
  return block.type === "horizontal" || block.type === "vertical";
}

export function isPairOptionBlock(block: OptionBlock): block is PairOptionBlock {
  return block.type === "pair";
}

export function isImageOptionBlock(block: OptionBlock): block is ImageOptionBlock {
  return block.type === "image";
}

export function isTableOptionBlock(block: OptionBlock): block is TableOptionBlock {
  return block.type === "table";
}

// ── Parser ──

const VALID_TYPES = new Set(["horizontal", "vertical", "pair", "image", "table"]);

export function parseOptionBlock(raw: unknown): OptionBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("OptionBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.type !== "string" || !VALID_TYPES.has(obj.type)) {
    throw new Error(`Invalid OptionBlock type: ${String(obj.type)}`);
  }

  if (!Array.isArray(obj.options)) {
    throw new Error("OptionBlock.options must be an array");
  }

  switch (obj.type) {
    case "horizontal":
    case "vertical":
      return parseTextOptionBlock(obj);
    case "pair":
      return parsePairOptionBlock(obj);
    case "image":
      return parseImageOptionBlock(obj);
    case "table":
      return parseTableOptionBlock(obj);
    default:
      throw new Error(`Unknown OptionBlock type: ${obj.type}`);
  }
}

function parseTextOptionBlock(obj: Record<string, unknown>): TextOptionBlock {
  const options = (obj.options as Record<string, unknown>[]).map((opt) => ({
    displayOrder: Number(opt.displayOrder),
    text: String(opt.text),
  }));

  return {
    type: obj.type as "horizontal" | "vertical",
    options,
  };
}

function parsePairOptionBlock(obj: Record<string, unknown>): PairOptionBlock {
  if (!Array.isArray(obj.labels)) {
    throw new Error("PairOptionBlock.labels must be an array");
  }

  const options = (obj.options as Record<string, unknown>[]).map((opt) => ({
    displayOrder: Number(opt.displayOrder),
    text: (opt.text as string[]).map(String),
  }));

  return {
    type: "pair",
    labels: (obj.labels as string[]).map(String),
    options,
  };
}

function parseImageOptionBlock(obj: Record<string, unknown>): ImageOptionBlock {
  const options = (obj.options as Record<string, unknown>[]).map((opt) => ({
    displayOrder: Number(opt.displayOrder),
    imageUrl: String(opt.imageUrl),
  }));

  return {
    type: "image",
    options,
  };
}

function parseTableOptionBlock(obj: Record<string, unknown>): TableOptionBlock {
  if (!Array.isArray(obj.header)) {
    throw new Error("TableOptionBlock.header must be an array");
  }

  const header = (obj.header as Record<string, unknown>[]).map((h) => ({
    col: Number(h.col),
    value: String(h.value),
  }));

  const options = (obj.options as Record<string, unknown>[]).map((opt) => ({
    displayOrder: Number(opt.displayOrder),
    cells: (opt.cells as Record<string, unknown>[]).map((cell) => ({
      row: Number(cell.row),
      col: Number(cell.col),
      value: String(cell.value),
    })),
  }));

  return {
    type: "table",
    title: String(obj.title),
    header,
    options,
  };
}
