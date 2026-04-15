import type { TextBasicBlock } from "../../../component-block/subject/common";
import { RichText } from "../../_shared/rich-text";

export function TextBasicRenderer({ block }: { block: TextBasicBlock }) {
  return (
    <div className="text-foreground leading-relaxed">
      <RichText text={block.text} />
    </div>
  );
}
