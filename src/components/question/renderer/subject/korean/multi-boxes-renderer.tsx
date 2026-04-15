import type { MultiBoxesBlock } from "../../../component-block/subject/korean";
import { LabeledBox } from "../../_shared/labeled-box";
import { RichText } from "../../_shared/rich-text";

export function MultiBoxesRenderer({ block }: { block: MultiBoxesBlock }) {
  return (
    <div className="space-y-3">
      {block.boxes.map((item, i) => (
        <LabeledBox key={i} label={item.label}>
          <RichText text={item.text} className="leading-relaxed" />
        </LabeledBox>
      ))}
    </div>
  );
}
