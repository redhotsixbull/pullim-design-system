import type { TableBasicBlock } from "../../component-block/visual";
import { TableGrid } from "../_shared/table-grid";

export function TableBasicRenderer({ block }: { block: TableBasicBlock }) {
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-foreground text-sm font-semibold">{block.title}</h3>
        {block.description && <p className="text-muted-foreground text-xs">{block.description}</p>}
        {block.unit && <p className="text-muted-foreground text-xs">({block.unit})</p>}
      </div>
      <TableGrid cells={block.cells} />
    </div>
  );
}
