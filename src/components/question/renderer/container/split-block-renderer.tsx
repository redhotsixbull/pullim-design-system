import type { SplitBlock } from "../../component-block/container";
import { BlockRenderer } from "../block-renderer";

export function SplitBlockRenderer({ block }: { block: SplitBlock }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        {block.left.map((child, i) => (
          <BlockRenderer key={i} block={child} />
        ))}
      </div>
      <div className="space-y-3">
        {block.right.map((child, i) => (
          <BlockRenderer key={i} block={child} />
        ))}
      </div>
    </div>
  );
}
