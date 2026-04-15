import type { PassageBlockBlock } from "../../../component-block/subject/korean";
import { TextWithBoxRenderer } from "../common/text-with-box-renderer";

export function PassageBlockRenderer({ block }: { block: PassageBlockBlock }) {
  return (
    <div className="space-y-3">
      {block.blocks.map((inner, i) => (
        <TextWithBoxRenderer key={i} block={inner} />
      ))}
    </div>
  );
}
