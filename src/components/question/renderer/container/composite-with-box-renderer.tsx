import type { CompositeWithBoxBlock } from "../../component-block/container";
import { LabeledBox } from "../_shared/labeled-box";
import { BlockRenderer } from "../block-renderer";

export function CompositeWithBoxRenderer({ block }: { block: CompositeWithBoxBlock }) {
  return (
    <LabeledBox>
      <div className="space-y-3">
        {block.blocks.map((child, i) => (
          <BlockRenderer key={i} block={child} />
        ))}
      </div>
    </LabeledBox>
  );
}
