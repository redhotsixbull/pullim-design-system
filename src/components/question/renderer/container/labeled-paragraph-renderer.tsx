import type { LabeledParagraphBlock } from "../../component-block/container";
import { BlockRenderer } from "../block-renderer";

export function LabeledParagraphRenderer({ block }: { block: LabeledParagraphBlock }) {
  return (
    <div className="space-y-2">
      <span className="bg-muted text-muted-foreground inline-block rounded px-2 py-0.5 text-sm font-semibold">
        {block.label}
      </span>
      <div className="space-y-3">
        {block.blocks.map((child, i) => (
          <BlockRenderer key={i} block={child} />
        ))}
      </div>
    </div>
  );
}
