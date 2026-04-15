import type {
  EnglishBlock,
  VocabNoteBlock,
  AnnouncementBlock,
  TextBoxFlowBlock,
  PassageBoxGroupBlock,
  TextBoxFlowItem,
  PassageBoxItem,
} from "./types";

// ── Type Guards ──

export function isVocabNoteBlock(block: EnglishBlock): block is VocabNoteBlock {
  return block.type === "vocab-note";
}

export function isAnnouncementBlock(block: EnglishBlock): block is AnnouncementBlock {
  return block.type === "announcement";
}

export function isTextBoxFlowBlock(block: EnglishBlock): block is TextBoxFlowBlock {
  return block.type === "text-box-flow";
}

export function isPassageBoxGroupBlock(block: EnglishBlock): block is PassageBoxGroupBlock {
  return block.type === "passage-box-group";
}

// ── Voca Parser (재사용) ──

function parseVocaList(raw: unknown): VocabNoteBlock[] | undefined {
  if (!Array.isArray(raw)) return undefined;

  return raw.map((v) => {
    const obj = v as Record<string, unknown>;
    return {
      type: "vocab-note" as const,
      notes: (obj.notes as Record<string, unknown>[]).map((n) => ({
        term: String(n.term),
        definition: String(n.definition),
      })),
    };
  });
}

// ── Parser ──

export const ENGLISH_TYPES = new Set([
  "vocab-note",
  "announcement",
  "text-box-flow",
  "passage-box-group",
]);

export function parseEnglishBlock(raw: unknown): EnglishBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("EnglishBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.type !== "string" || !ENGLISH_TYPES.has(obj.type)) {
    throw new Error(`Invalid EnglishBlock type: ${String(obj.type)}`);
  }

  switch (obj.type) {
    case "vocab-note":
      return parseVocabNoteBlock(obj);
    case "announcement":
      return parseAnnouncementBlock(obj);
    case "text-box-flow":
      return parseTextBoxFlowBlock(obj);
    case "passage-box-group":
      return parsePassageBoxGroupBlock(obj);
    default:
      throw new Error(`Unknown EnglishBlock type: ${obj.type}`);
  }
}

function parseVocabNoteBlock(obj: Record<string, unknown>): VocabNoteBlock {
  return {
    type: "vocab-note",
    notes: (obj.notes as Record<string, unknown>[]).map((n) => ({
      term: String(n.term),
      definition: String(n.definition),
    })),
  };
}

function parseAnnouncementBlock(obj: Record<string, unknown>): AnnouncementBlock {
  const image = obj.image as Record<string, unknown>;
  return {
    type: "announcement",
    image: {
      src: String(image.src),
      alt: String(image.alt),
    },
    text: String(obj.text),
  };
}

function parseTextBoxFlowBlock(obj: Record<string, unknown>): TextBoxFlowBlock {
  const blocks = (obj.blocks as Record<string, unknown>[]).map(
    (b): TextBoxFlowItem => ({
      id: String(b.id),
      text: String(b.text),
      voca: parseVocaList(b.voca),
    })
  );

  return { type: "text-box-flow", blocks };
}

function parsePassageBoxGroupBlock(obj: Record<string, unknown>): PassageBoxGroupBlock {
  const boxes = (obj.boxes as Record<string, unknown>[]).map(
    (b): PassageBoxItem => ({
      label: String(b.label),
      text: String(b.text),
      voca: parseVocaList(b.voca),
    })
  );

  return { type: "passage-box-group", boxes };
}
