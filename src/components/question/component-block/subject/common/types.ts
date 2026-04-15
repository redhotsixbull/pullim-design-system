// ── Text Basic ──

export interface TextBasicBlock {
  type: "text-basic";
  text: string;
}

// ── Image Single ──

export interface ImageSingleBlock {
  type: "image-single";
  imageUrl: string;
  alt: string;
}

// ── Text With Box ──

export interface TextWithBoxBlock {
  type: "text-with-box";
  text: string;
}

// ── Passage Block Group ──

export interface PassageItem {
  label: string;
  text: string;
}

export interface PassageBlockGroupBlock {
  type: "passage-block-group";
  blocks: PassageItem[];
}

// ── View Box ──

export interface ViewBoxBlock {
  type: "view-box";
  label: string;
  text: string;
}

// ── Bullet List ──

export interface BulletItem {
  label: string;
  text: string;
}

export interface BulletListBlock {
  type: "bullet-list";
  blocks: BulletItem[];
}

// ── Discriminated Union ──

export type CommonBlock =
  | TextBasicBlock
  | ImageSingleBlock
  | TextWithBoxBlock
  | PassageBlockGroupBlock
  | ViewBoxBlock
  | BulletListBlock;
