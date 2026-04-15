import type { TextWithBoxBlock } from "../../../component-block/subject/common";
import { LabeledBox } from "../../_shared/labeled-box";
import { RichText } from "../../_shared/rich-text";

export function TextWithBoxRenderer({ block }: { block: TextWithBoxBlock }) {
  return (
    <LabeledBox>
      <RichText text={block.text} className="leading-relaxed" />
    </LabeledBox>
  );
}
