import type { PairOptionBlock } from "../../option-block";
import { RichText } from "../_shared/rich-text";

export function PairOptionRenderer({ block }: { block: PairOptionBlock }) {
  return (
    <div className="space-y-2">
      {/* 헤더 라벨 */}
      <div className="text-muted-foreground flex gap-4 text-sm font-medium">
        {block.labels.map((label, i) => (
          <span key={i} className="flex-1 text-center">
            {label}
          </span>
        ))}
      </div>
      {/* 선지 */}
      {block.options.map((opt) => (
        <div key={opt.displayOrder} className="flex items-start gap-2">
          <span className="text-muted-foreground shrink-0 font-medium">
            {toCircledNumber(opt.displayOrder)}
          </span>
          <div className="flex flex-1 gap-4">
            {opt.text.map((t, i) => (
              <span key={i} className="flex-1 text-center">
                <RichText text={t} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function toCircledNumber(n: number): string {
  const circled = ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464"];
  return circled[n - 1] ?? `${n}`;
}
