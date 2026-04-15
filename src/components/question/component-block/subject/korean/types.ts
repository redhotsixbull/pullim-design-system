import type { TextWithBoxBlock } from "../common/types";

// ── Annotated Paragraph ──

export interface AnnotatedParagraphBlock {
  type: "annotated-paragraph";
  label: string;
  text: string;
}

// ── Multi Boxes ──

export interface MultiBoxItem {
  label: string;
  text: string;
}

export interface MultiBoxesBlock {
  type: "multi-boxes";
  boxes: MultiBoxItem[];
}

// ── Note Style Passage ──

export interface NoteStylePassageBlock {
  type: "note-style-passage";
  text: string;
}

// ── Paper Style Passage ──

export interface PaperStylePassageBlock {
  type: "paper-style-passage";
  text: string;
}

// ── Passage Block ──

export interface PassageBlockBlock {
  type: "passage-block";
  blocks: TextWithBoxBlock[];
}

// ── Discriminated Union ──

export type KoreanBlock =
  | AnnotatedParagraphBlock
  | MultiBoxesBlock
  | NoteStylePassageBlock
  | PaperStylePassageBlock
  | PassageBlockBlock;
