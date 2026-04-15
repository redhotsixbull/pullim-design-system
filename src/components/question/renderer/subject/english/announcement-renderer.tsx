import type { AnnouncementBlock } from "../../../component-block/subject/english";
import { RichText } from "../../_shared/rich-text";

export function AnnouncementRenderer({ block }: { block: AnnouncementBlock }) {
  return (
    <div className="border-border flex gap-4 rounded-md border p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.image.src}
        alt={block.image.alt}
        className="h-24 w-24 shrink-0 rounded object-cover"
      />
      <RichText text={block.text} className="leading-relaxed" />
    </div>
  );
}
