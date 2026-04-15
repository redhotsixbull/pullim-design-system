// ── Vocab Note (각주) ──

export interface VocabNoteEntry {
  term: string;
  definition: string;
}

export interface VocabNoteBlock {
  type: "vocab-note";
  notes: VocabNoteEntry[];
}

// ── Announcement ──

export interface AnnouncementImage {
  src: string;
  alt: string;
}

export interface AnnouncementBlock {
  type: "announcement";
  image: AnnouncementImage;
  text: string;
}

// ── Text Box Flow ──

export interface TextBoxFlowItem {
  id: string;
  text: string;
  voca?: VocabNoteBlock[];
}

export interface TextBoxFlowBlock {
  type: "text-box-flow";
  blocks: TextBoxFlowItem[];
}

// ── Passage Box Group ──

export interface PassageBoxItem {
  label: string;
  text: string;
  voca?: VocabNoteBlock[];
}

export interface PassageBoxGroupBlock {
  type: "passage-box-group";
  boxes: PassageBoxItem[];
}

// ── Discriminated Union ──

export type EnglishBlock =
  | VocabNoteBlock
  | AnnouncementBlock
  | TextBoxFlowBlock
  | PassageBoxGroupBlock;
