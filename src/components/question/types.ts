import type { ComponentBlock } from "./component-block/container";
import type { OptionBlock } from "./option-block";

export type { ComponentBlock } from "./component-block/container";
export type { OptionBlock } from "./option-block";

export interface ListeningScript {
  order: number;
  gender: "M" | "W";
  scriptText: string;
}

export interface Question {
  stemBlocks: ComponentBlock[];
  contentBlocks: ComponentBlock[];
  optionBlocks: OptionBlock;
  answer: string;
  explanation: string;
}

export interface SetQuestion {
  listeningScript?: ListeningScript[];
  setStemBlocks: ComponentBlock[];
  setContentBlocks: ComponentBlock[];
  questions: Question[];
}
