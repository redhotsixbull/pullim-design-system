import type { ImageOptionBlock } from "../../option-block";

export function ImageOptionRenderer({ block }: { block: ImageOptionBlock }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {block.options.map((opt) => (
        <div key={opt.displayOrder} className="flex flex-col items-center gap-1">
          <span className="text-muted-foreground text-sm font-medium">
            {toCircledNumber(opt.displayOrder)}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={opt.imageUrl}
            alt={`Option ${opt.displayOrder}`}
            className="max-w-full rounded"
          />
        </div>
      ))}
    </div>
  );
}

function toCircledNumber(n: number): string {
  const circled = ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464"];
  return circled[n - 1] ?? `${n}`;
}
