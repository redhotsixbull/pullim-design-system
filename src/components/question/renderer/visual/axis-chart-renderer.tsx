"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import type { AxisChartBase } from "../../component-block/visual";
import { ChartWrapper, CHART_COLORS } from "../_shared/chart-wrapper";

type AxisChartType =
  | "bar"
  | "bar-grouped"
  | "bar-horizontal"
  | "bar-horizontal-grouped"
  | "bar-stacked"
  | "bar-horizontal-stacked"
  | "line";

interface AxisChartRendererProps {
  block: AxisChartBase & { type: AxisChartType; note?: string };
}

/**
 * 7개 축 기반 차트를 하나의 컴포넌트로 렌더링한다.
 * type에 따라 Recharts 컴포넌트/layout/stackId를 분기.
 */
export function AxisChartRenderer({ block }: AxisChartRendererProps) {
  const { type } = block;
  const isHorizontal = type.includes("horizontal");
  const isStacked = type.includes("stacked");
  const isLine = type === "line";

  // Recharts 데이터 형식으로 변환
  const data = block.labels.map((label, idx) => {
    const point: Record<string, string | number> = { name: label };
    block.series.forEach((s, si) => {
      point[s.label ?? `series-${si}`] = s.data[idx] ?? 0;
    });
    return point;
  });

  const showDataLabel = block.options.showDataLabel;
  const labelPosition = block.options.dataLabelPosition ?? "outside";

  const content = isLine ? (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        label={
          block.xAxis.showLabel
            ? { value: block.xAxis.label, position: "insideBottom", offset: -5 }
            : undefined
        }
      />
      <YAxis
        label={
          block.yAxis.showLabel
            ? { value: block.yAxis.label, angle: -90, position: "insideLeft" }
            : undefined
        }
      />
      <Tooltip />
      {block.series.length > 1 && <Legend />}
      {block.series.map((s, si) => {
        const key = s.label ?? `series-${si}`;
        const seriesColor = s.color ?? CHART_COLORS[si % CHART_COLORS.length];
        return (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={seriesColor}
            strokeWidth={2}
            dot={{ r: 3 }}
          >
            {showDataLabel && <LabelList position="top" />}
          </Line>
        );
      })}
    </LineChart>
  ) : (
    <BarChart data={data} layout={isHorizontal ? "vertical" : "horizontal"}>
      <CartesianGrid strokeDasharray="3 3" />
      {isHorizontal ? (
        <>
          <XAxis
            type="number"
            label={
              block.xAxis.showLabel
                ? { value: block.xAxis.label, position: "insideBottom", offset: -5 }
                : undefined
            }
          />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            label={
              block.yAxis.showLabel
                ? { value: block.yAxis.label, angle: -90, position: "insideLeft" }
                : undefined
            }
          />
        </>
      ) : (
        <>
          <XAxis
            dataKey="name"
            label={
              block.xAxis.showLabel
                ? { value: block.xAxis.label, position: "insideBottom", offset: -5 }
                : undefined
            }
          />
          <YAxis
            label={
              block.yAxis.showLabel
                ? { value: block.yAxis.label, angle: -90, position: "insideLeft" }
                : undefined
            }
          />
        </>
      )}
      <Tooltip />
      {block.series.length > 1 && <Legend />}
      {block.series.map((s, si) => {
        const key = s.label ?? `series-${si}`;
        const seriesColor = s.color ?? CHART_COLORS[si % CHART_COLORS.length];
        return (
          <Bar key={key} dataKey={key} fill={seriesColor} stackId={isStacked ? "stack" : undefined}>
            {showDataLabel && (
              <LabelList position={labelPosition === "inside" ? "center" : "top"} />
            )}
          </Bar>
        );
      })}
    </BarChart>
  );

  return (
    <ChartWrapper
      title={block.title}
      description={block.description}
      note={(block as { note?: string }).note}
    >
      {content}
    </ChartWrapper>
  );
}
