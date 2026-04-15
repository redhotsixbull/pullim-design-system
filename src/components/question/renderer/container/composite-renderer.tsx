import type { CompositeBlock } from "../../component-block/container";
import { LabeledBox } from "../_shared/labeled-box";
import { BlockRenderer } from "../block-renderer";

export function CompositeRenderer({ block }: { block: CompositeBlock }) {
  return (
    <LabeledBox label={block.label}>
      <div className="space-y-3">
        {block.blocks.map((child, i) => (
          <BlockRenderer key={i} block={child} />
        ))}
      </div>
    </LabeledBox>
  );
}
