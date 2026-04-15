import type { ImageAfterOptionsBlock } from "../../../component-block/subject/math";

export function ImageAfterOptionsRenderer({ block }: { block: ImageAfterOptionsBlock }) {
  return (
    <figure className="mt-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={block.imageUrl} alt={block.alt} className="max-w-full rounded" />
    </figure>
  );
}
