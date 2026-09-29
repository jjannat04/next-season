import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { VegetationObservation } from "../../types";

interface VegetationChartProps {
  data: VegetationObservation[];
}

export function VegetationChart({
  data,
}: VegetationChartProps) {
  const chartData = data.map((observation) => ({
    date: observation.date,
    ndvi: observation.ndvi ?? null,
    evi: observation.evi ?? null,
  }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="var(--color-border)"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{
              fill: "var(--color-ink-muted)",
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 1]}
            tick={{
              fill: "var(--color-ink-muted)",
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="ndvi"
            name="NDVI"
            stroke="var(--color-green-700)"
            strokeWidth={2}
            dot={false}
            connectNulls
          />

          <Line
            type="monotone"
            dataKey="evi"
            name="EVI"
            stroke="var(--color-green-600)"
            strokeWidth={2}
            dot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}