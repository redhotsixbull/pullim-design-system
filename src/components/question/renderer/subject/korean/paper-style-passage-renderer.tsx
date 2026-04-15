import type { PaperStylePassageBlock } from "../../../component-block/subject/korean";
import { RichText } from "../../_shared/rich-text";

export function PaperStylePassageRenderer({ block }: { block: PaperStylePassageBlock }) {
  return (
    <div className="border-border bg-card rounded border p-5 shadow-sm">
      <RichText text={block.text} className="text-card-foreground leading-relaxed" />
    </div>
  );
}
