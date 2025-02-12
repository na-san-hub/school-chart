"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// `data` の型定義
interface RadarChartProps {
  data: { subject: string; value: number; fullMark: number }[];
}

//  カスタム Tick コンポーネント
const CustomTick = ({
  x,
  y,
  payload,
  data,
}: {
  x: number;
  y: number;
  payload: any;
  data: RadarChartProps["data"];
}) => {
  const subject = payload.value;
  const value = data.find((d) => d.subject === subject)?.value ?? "-"; // `data` から `subject` に対応する `value` を取得

  return (
    <g transform={`translate(${x},${y})`}>
      {/* subject のラベル */}
      <text x={0} y={0} dy={-8} textAnchor="middle" fontSize={14} fill="#555">
        {subject}
      </text>
      {/* value のラベル */}
      <text x={0} y={0} dy={12} textAnchor="middle" fontSize={14} fill="#888">
        {value}
      </text>
    </g>
  );
};

export default function RadarChartComponent({ data }: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart cx="50%" cy="55%" outerRadius="80%" data={data}>
        <PolarGrid gridType="polygon" />
        {/* ✅ `CustomTick` に `data` を渡す */}
        <PolarAngleAxis
          dataKey="subject"
          tick={(props) => <CustomTick {...props} data={data} />}
        />
        <PolarRadiusAxis
          domain={[0, 5]}
          tick={false}
          axisLine={false}
          tickCount={6}
        />
        <Radar
          name="評価"
          dataKey="value"
          stroke="currentColor"
          fill="currentColor"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
