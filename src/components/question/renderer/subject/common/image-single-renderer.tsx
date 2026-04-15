import type { ImageSingleBlock } from "../../../component-block/subject/common";

export function ImageSingleRenderer({ block }: { block: ImageSingleBlock }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={block.imageUrl} alt={block.alt} className="max-w-full rounded" />
    </figure>
  );
}
