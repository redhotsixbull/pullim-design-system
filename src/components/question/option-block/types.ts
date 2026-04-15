// ── 공통 ──

interface BaseOption {
  displayOrder: number;
}

// ── Text (horizontal / vertical) ──

export interface TextOption extends BaseOption {
  text: string;
}

export interface TextOptionBlock {
  type: "horizontal" | "vertical";
  options: TextOption[];
}

// ── Pair ──

export interface PairOption extends BaseOption {
  text: string[];
}

export interface PairOptionBlock {
  type: "pair";
  labels: string[];
  options: PairOption[];
}

// ── Image ──

export interface ImageOption extends BaseOption {
  imageUrl: string;
}

export interface ImageOptionBlock {
  type: "image";
  options: ImageOption[];
}

// ── Table ──

export interface TableHeaderCell {
  col: number;
  value: string;
}

export interface TableCell {
  row: number;
  col: number;
  value: string;
}

export interface TableOption extends BaseOption {
  cells: TableCell[];
}

export interface TableOptionBlock {
  type: "table";
  title: string;
  header: TableHeaderCell[];
  options: TableOption[];
}

// ── Discriminated Union ──

export type OptionBlock = TextOptionBlock | PairOptionBlock | ImageOptionBlock | TableOptionBlock;
