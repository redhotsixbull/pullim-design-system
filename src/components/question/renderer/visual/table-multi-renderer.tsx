import type { TableMultiBlock } from "../../component-block/visual";
import { TableGrid } from "../_shared/table-grid";

export function TableMultiRenderer({ block }: { block: TableMultiBlock }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-foreground text-sm font-semibold">{block.title}</h3>
        {block.description && <p className="text-muted-foreground text-xs">{block.description}</p>}
        {block.unit && <p className="text-muted-foreground text-xs">({block.unit})</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {block.tables.map((sub, i) => (
          <div key={i} className="space-y-1">
            {sub.subTitle && (
              <h4 className="text-muted-foreground text-xs font-medium">{sub.subTitle}</h4>
            )}
            <TableGrid cells={sub.cells} />
          </div>
        ))}
      </div>
    </div>
  );
}
