import type { NoteStylePassageBlock } from "../../../component-block/subject/korean";
import { RichText } from "../../_shared/rich-text";

export function NoteStylePassageRenderer({ block }: { block: NoteStylePassageBlock }) {
  return (
    <div className="border-muted-foreground bg-muted rounded-md border-l-4 px-4 py-3">
      <RichText text={block.text} className="text-foreground leading-relaxed" />
    </div>
  );
}
