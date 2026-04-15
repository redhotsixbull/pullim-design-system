// ── Shared Axis / Series ──

export interface ChartAxis {
  label: string;
  showLabel: boolean;
}

export interface ChartSeries {
  label?: string;
  color?: string;
  data: number[];
}

export interface ChartOptions {
  showDataLabel: boolean;
  dataLabelPosition?: "inside" | "outside";
  showRange?: boolean;
  dataLabelAlign?: "center" | "left" | "right";
}

// ── Axis Chart Base (축 기반 차트 공통) ──

export interface AxisChartBase {
  title: string;
  description: string | null;
  xAxis: ChartAxis;
  yAxis: ChartAxis;
  labels: string[];
  series: ChartSeries[];
  options: ChartOptions;
}

// ── Bar Charts ──

export interface BarChartBlock extends AxisChartBase {
  type: "bar";
}

export interface BarGroupedChartBlock extends AxisChartBase {
  type: "bar-grouped";
}

export interface BarHorizontalChartBlock extends AxisChartBase {
  type: "bar-horizontal";
}

export interface BarHorizontalGroupedChartBlock extends AxisChartBase {
  type: "bar-horizontal-grouped";
  note?: string;
}

export interface BarStackedChartBlock extends AxisChartBase {
  type: "bar-stacked";
}

export interface BarHorizontalStackedChartBlock extends AxisChartBase {
  type: "bar-horizontal-stacked";
}

// ── Line Chart ──

export interface LineChartBlock extends AxisChartBase {
  type: "line";
}

// ── Pie Chart ──

export interface PieChartOptions {
  showDataLabel: boolean;
  displayValueType: "percentage" | "number";
  colors?: string[];
}

export interface PieChartBlock {
  type: "pie";
  title: string;
  description: string | null;
  labels: string[];
  series: ChartSeries[];
  options: PieChartOptions;
}

// ── Shared Table Cell ──

export interface TableCell {
  row: number;
  col: number;
  value: string;
  colspan?: number;
}

// ── Table Basic ──

export interface TableBasicBlock {
  type: "table-basic";
  title: string;
  unit: string;
  description: string | null;
  cells: TableCell[];
}

// ── Table Multi ──

export interface TableSubTable {
  subTitle: string;
  cells: TableCell[];
}

export interface TableMultiBlock {
  type: "table-multi";
  title: string;
  unit: string;
  description: string | null;
  tables: TableSubTable[];
}

// ── Discriminated Union ──

export type VisualBlock =
  | BarChartBlock
  | BarGroupedChartBlock
  | BarHorizontalChartBlock
  | BarHorizontalGroupedChartBlock
  | BarStackedChartBlock
  | BarHorizontalStackedChartBlock
  | LineChartBlock
  | PieChartBlock
  | TableBasicBlock
  | TableMultiBlock;
