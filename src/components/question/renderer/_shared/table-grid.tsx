import type { TableCell } from "../../component-block/visual/types";
import { cn } from "../../../../lib/utils";

interface TableGridProps {
  cells: TableCell[];
  className?: string;
}

/**
 * TableCell[] (row, col, value, colspan?)을 <table>로 변환한다.
 */
export function TableGrid({ cells, className }: TableGridProps) {
  const rows = buildRows(cells);

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx === 0 ? "bg-muted font-medium" : ""}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  colSpan={cell.colspan ?? 1}
                  className="border-border border px-3 py-2 text-center"
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function buildRows(cells: TableCell[]): TableCell[][] {
  const rowMap = new Map<number, TableCell[]>();

  for (const cell of cells) {
    if (!rowMap.has(cell.row)) {
      rowMap.set(cell.row, []);
    }
    rowMap.get(cell.row)!.push(cell);
  }

  // row 순서 정렬, 각 row 내에서 col 순서 정렬
  return Array.from(rowMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, rowCells]) => rowCells.sort((a, b) => a.col - b.col));
}
