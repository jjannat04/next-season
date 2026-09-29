import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ClimateObservation } from "../../types";

interface ClimateChartProps {
  data: ClimateObservation[];
}

export function ClimateChart({ data }: ClimateChartProps) {
  const chartData = data.map((observation) => ({
    date: observation.date,
    temperature: observation.temperature ?? null,
    rainfall: observation.rainfall ?? null,
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
            yAxisId="temperature"
            tick={{
              fill: "var(--color-ink-muted)",
              fontSize: 11,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            yAxisId="rainfall"
            orientation="right"
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
            yAxisId="temperature"
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="var(--color-earth-600)"
            strokeWidth={2}
            dot={false}
            connectNulls
          />

          <Line
            yAxisId="rainfall"
            type="monotone"
            dataKey="rainfall"
            name="Rainfall"
            stroke="var(--color-blue-600)"
            strokeWidth={2}
            dot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}