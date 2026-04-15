import type { TextOptionBlock } from "../../option-block";
import { RichText } from "../_shared/rich-text";
import { cn } from "../../../../lib/utils";

export function TextOptionRenderer({ block }: { block: TextOptionBlock }) {
  const isVertical = block.type === "vertical";

  return (
    <ol className={cn("list-none space-y-2", !isVertical && "flex flex-wrap gap-4 space-y-0")}>
      {block.options.map((opt) => (
        <li key={opt.displayOrder} className="flex gap-2">
          <span className="text-muted-foreground shrink-0 font-medium">
            {toCircledNumber(opt.displayOrder)}
          </span>
          <RichText text={opt.text} />
        </li>
      ))}
    </ol>
  );
}

function toCircledNumber(n: number): string {
  const circled = ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464"];
  return circled[n - 1] ?? `${n}`;
}
