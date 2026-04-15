import type { ViewBoxBlock } from "../../../component-block/subject/common";
import { LabeledBox } from "../../_shared/labeled-box";
import { RichText } from "../../_shared/rich-text";

export function ViewBoxRenderer({ block }: { block: ViewBoxBlock }) {
  return (
    <LabeledBox label={block.label}>
      <RichText text={block.text} className="leading-relaxed" />
    </LabeledBox>
  );
}
