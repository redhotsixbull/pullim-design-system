import type { AnnotatedParagraphBlock } from "../../../component-block/subject/korean";
import { LabeledBox } from "../../_shared/labeled-box";
import { RichText } from "../../_shared/rich-text";

export function AnnotatedParagraphRenderer({ block }: { block: AnnotatedParagraphBlock }) {
  return (
    <LabeledBox label={block.label}>
      <RichText text={block.text} className="leading-relaxed" />
    </LabeledBox>
  );
}
