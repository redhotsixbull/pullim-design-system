import type { OptionBlock } from "../../option-block";
import {
  isTextOptionBlock,
  isPairOptionBlock,
  isImageOptionBlock,
  isTableOptionBlock,
} from "../../option-block";
import { TextOptionRenderer } from "./text-option-renderer";
import { PairOptionRenderer } from "./pair-option-renderer";
import { ImageOptionRenderer } from "./image-option-renderer";
import { TableOptionRenderer } from "./table-option-renderer";

export function OptionRenderer({ block }: { block: OptionBlock }) {
  if (isTextOptionBlock(block)) return <TextOptionRenderer block={block} />;
  if (isPairOptionBlock(block)) return <PairOptionRenderer block={block} />;
  if (isImageOptionBlock(block)) return <ImageOptionRenderer block={block} />;
  if (isTableOptionBlock(block)) return <TableOptionRenderer block={block} />;

  return null;
}
