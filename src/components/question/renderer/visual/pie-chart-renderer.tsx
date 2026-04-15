"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { PieLabelRenderProps } from "recharts";
import type { PieChartBlock } from "../../component-block/visual";
import { ChartWrapper, CHART_COLORS } from "../_shared/chart-wrapper";

interface PieChartRendererProps {
  block: PieChartBlock;
}

export function PieChartRenderer({ block }: PieChartRendererProps) {
  const series = block.series[0];
  if (!series) return null;

  const data = block.labels.map((label: string, idx: number) => ({
    name: label,
    value: series.data[idx] ?? 0,
  }));

  const isPercentage = block.options.displayValueType === "percentage";
  const sliceColors = block.options.colors;

  const renderLabel = block.options.showDataLabel
    ? (props: PieLabelRenderProps) => {
        const name = String(props.name ?? "");
        const value = Number(props.value ?? 0);
        return isPercentage ? `${name} ${value}%` : `${name} ${value}`;
      }
    : undefined;

  return (
    <ChartWrapper title={block.title} description={block.description}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={renderLabel}
        >
          {data.map((_: unknown, idx: number) => (
            <Cell key={idx} fill={sliceColors?.[idx] ?? CHART_COLORS[idx % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartWrapper>
  );
}
