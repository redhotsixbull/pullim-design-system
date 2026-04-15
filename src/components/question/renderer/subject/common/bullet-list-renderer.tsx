import type { BulletListBlock } from "../../../component-block/subject/common";
import { RichText } from "../../_shared/rich-text";

export function BulletListRenderer({ block }: { block: BulletListBlock }) {
  return (
    <ul className="list-none space-y-1">
      {block.blocks.map((item, i) => (
        <li key={i} className="flex gap-2 leading-relaxed">
          <span className="text-muted-foreground shrink-0 font-medium">{item.label}</span>
          <RichText text={item.text} />
        </li>
      ))}
    </ul>
  );
}
