import type {
  VisualBlock,
  BarChartBlock,
  BarGroupedChartBlock,
  BarHorizontalChartBlock,
  BarHorizontalGroupedChartBlock,
  BarStackedChartBlock,
  BarHorizontalStackedChartBlock,
  LineChartBlock,
  PieChartBlock,
  PieChartOptions,
  TableBasicBlock,
  TableMultiBlock,
  TableCell,
  TableSubTable,
  AxisChartBase,
  ChartAxis,
  ChartSeries,
  ChartOptions,
} from "./types";

// ── Type Guards ──

export function isBarChartBlock(block: VisualBlock): block is BarChartBlock {
  return block.type === "bar";
}

export function isBarGroupedChartBlock(block: VisualBlock): block is BarGroupedChartBlock {
  return block.type === "bar-grouped";
}

export function isBarHorizontalChartBlock(block: VisualBlock): block is BarHorizontalChartBlock {
  return block.type === "bar-horizontal";
}

export function isBarHorizontalGroupedChartBlock(
  block: VisualBlock
): block is BarHorizontalGroupedChartBlock {
  return block.type === "bar-horizontal-grouped";
}

export function isBarStackedChartBlock(block: VisualBlock): block is BarStackedChartBlock {
  return block.type === "bar-stacked";
}

export function isBarHorizontalStackedChartBlock(
  block: VisualBlock
): block is BarHorizontalStackedChartBlock {
  return block.type === "bar-horizontal-stacked";
}

export function isLineChartBlock(block: VisualBlock): block is LineChartBlock {
  return block.type === "line";
}

export function isPieChartBlock(block: VisualBlock): block is PieChartBlock {
  return block.type === "pie";
}

export function isTableBasicBlock(block: VisualBlock): block is TableBasicBlock {
  return block.type === "table-basic";
}

export function isTableMultiBlock(block: VisualBlock): block is TableMultiBlock {
  return block.type === "table-multi";
}

// ── Shared Helpers ──

function parseChartAxis(raw: unknown): ChartAxis {
  const obj = raw as Record<string, unknown>;
  return {
    label: String(obj.label),
    showLabel: Boolean(obj.showLabel),
  };
}

function parseChartSeries(raw: unknown): ChartSeries {
  const obj = raw as Record<string, unknown>;
  return {
    ...(typeof obj.label === "string" ? { label: obj.label } : {}),
    ...(typeof obj.color === "string" ? { color: obj.color } : {}),
    data: (obj.data as unknown[]).map(Number),
  };
}

const DATA_LABEL_POSITIONS = new Set(["inside", "outside"]);
const DATA_LABEL_ALIGNS = new Set(["center", "left", "right"]);

function parseChartOptions(raw: unknown): ChartOptions {
  const obj = raw as Record<string, unknown>;
  return {
    showDataLabel: Boolean(obj.showDataLabel),
    ...(DATA_LABEL_POSITIONS.has(obj.dataLabelPosition as string)
      ? { dataLabelPosition: obj.dataLabelPosition as "inside" | "outside" }
      : {}),
    ...(typeof obj.showRange === "boolean" ? { showRange: obj.showRange } : {}),
    ...(DATA_LABEL_ALIGNS.has(obj.dataLabelAlign as string)
      ? { dataLabelAlign: obj.dataLabelAlign as "center" | "left" | "right" }
      : {}),
  };
}

function parseAxisChart(obj: Record<string, unknown>): AxisChartBase {
  return {
    title: String(obj.title),
    description: obj.description != null ? String(obj.description) : null,
    xAxis: parseChartAxis(obj.xAxis),
    yAxis: parseChartAxis(obj.yAxis),
    labels: (obj.labels as unknown[]).map(String),
    series: (obj.series as unknown[]).map(parseChartSeries),
    options: parseChartOptions(obj.options),
  };
}

const DISPLAY_VALUE_TYPES = new Set(["percentage", "number"]);

function parsePieChartOptions(raw: unknown): PieChartOptions {
  const obj = raw as Record<string, unknown>;
  return {
    showDataLabel: Boolean(obj.showDataLabel),
    displayValueType: DISPLAY_VALUE_TYPES.has(obj.displayValueType as string)
      ? (obj.displayValueType as "percentage" | "number")
      : "percentage",
    ...(Array.isArray(obj.colors) ? { colors: (obj.colors as unknown[]).map(String) } : {}),
  };
}

function parseTableCell(raw: unknown): TableCell {
  const obj = raw as Record<string, unknown>;
  return {
    row: Number(obj.row),
    col: Number(obj.col),
    value: String(obj.value),
    ...(typeof obj.colspan === "number" ? { colspan: obj.colspan } : {}),
  };
}

function parseTableCells(raw: unknown): TableCell[] {
  return (raw as unknown[]).map(parseTableCell);
}

// ── Type Registry ──

export const VISUAL_TYPES = new Set([
  "bar",
  "bar-grouped",
  "bar-horizontal",
  "bar-horizontal-grouped",
  "bar-stacked",
  "bar-horizontal-stacked",
  "line",
  "pie",
  "table-basic",
  "table-multi",
]);

// ── Parser ──

export function parseVisualBlock(raw: unknown): VisualBlock {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("VisualBlock must be an object");
  }

  const obj = raw as Record<string, unknown>;

  if (typeof obj.type !== "string" || !VISUAL_TYPES.has(obj.type)) {
    throw new Error(`Invalid VisualBlock type: ${String(obj.type)}`);
  }

  switch (obj.type) {
    case "bar":
    case "bar-grouped":
    case "bar-horizontal":
    case "bar-stacked":
    case "bar-horizontal-stacked":
    case "line":
      return { type: obj.type, ...parseAxisChart(obj) } as VisualBlock;

    case "bar-horizontal-grouped":
      return {
        type: "bar-horizontal-grouped",
        ...parseAxisChart(obj),
        ...(typeof obj.note === "string" ? { note: obj.note } : {}),
      };

    case "pie":
      return {
        type: "pie",
        title: String(obj.title),
        description: obj.description != null ? String(obj.description) : null,
        labels: (obj.labels as unknown[]).map(String),
        series: (obj.series as unknown[]).map(parseChartSeries),
        options: parsePieChartOptions(obj.options),
      };

    case "table-basic":
      return {
        type: "table-basic",
        title: String(obj.title),
        unit: String(obj.unit),
        description: obj.description != null ? String(obj.description) : null,
        cells: parseTableCells(obj.cells),
      };

    case "table-multi":
      return {
        type: "table-multi",
        title: String(obj.title),
        unit: String(obj.unit),
        description: obj.description != null ? String(obj.description) : null,
        tables: (obj.tables as Record<string, unknown>[]).map(
          (t): TableSubTable => ({
            subTitle: String(t.subTitle),
            cells: parseTableCells(t.cells),
          })
        ),
      };

    default:
      throw new Error(`Unknown VisualBlock type: ${obj.type}`);
  }
}
