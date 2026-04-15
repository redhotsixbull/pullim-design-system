import type { TableOptionBlock } from "../../option-block";

export function TableOptionRenderer({ block }: { block: TableOptionBlock }) {
  const headerSorted = [...block.header].sort((a, b) => a.col - b.col);

  return (
    <div className="space-y-2">
      {block.title && <h4 className="text-foreground text-sm font-medium">{block.title}</h4>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border-border border px-3 py-2" />
              {headerSorted.map((h) => (
                <th key={h.col} className="border-border border px-3 py-2 font-medium">
                  {h.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.options.map((opt) => {
              const cellsSorted = [...opt.cells].sort((a, b) => a.col - b.col);
              return (
                <tr key={opt.displayOrder}>
                  <td className="border-border text-muted-foreground border px-3 py-2 font-medium">
                    {toCircledNumber(opt.displayOrder)}
                  </td>
                  {cellsSorted.map((cell) => (
                    <td key={cell.col} className="border-border border px-3 py-2 text-center">
                      {cell.value}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function toCircledNumber(n: number): string {
  const circled = ["\u2460", "\u2461", "\u2462", "\u2463", "\u2464"];
  return circled[n - 1] ?? `${n}`;
}
