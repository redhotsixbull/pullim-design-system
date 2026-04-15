import type { PassageBlockGroupBlock } from "../../../component-block/subject/common";
import { LabeledBox } from "../../_shared/labeled-box";
import { RichText } from "../../_shared/rich-text";

export function PassageBlockGroupRenderer({ block }: { block: PassageBlockGroupBlock }) {
  return (
    <div className="space-y-3">
      {block.blocks.map((item, i) => (
        <LabeledBox key={i} label={item.label}>
          <RichText text={item.text} className="leading-relaxed" />
        </LabeledBox>
      ))}
    </div>
  );
}
