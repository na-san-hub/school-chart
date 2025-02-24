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
  data: { category: string; score: number }[];
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
  payload: { value: string };
  data: RadarChartProps["data"];
}) => {
  if (!payload || typeof payload.value !== "string") return null;

  const category = payload.value;
  const score = data.find((d) => d.category === category)?.score ?? "-";

  return (
    <g transform={`translate(${x},${y})`}>
      {/* category のラベル */}
      <text x={0} y={0} dy={-8} textAnchor="middle" fontSize={14} fill="#555">
        {category}
      </text>
      {/* value のラベル */}
      <text x={0} y={0} dy={12} textAnchor="middle" fontSize={14} fill="#888">
        {score}
      </text>
    </g>
  );
};

export default function RadarChartComponent({ data }: RadarChartProps) {
  return (
    <div className="px-3 h-auto min-h-[300px] justify-center items-center">
      <ResponsiveContainer width="100%" minWidth={300} minHeight={300}>
        <RadarChart cx="52%" cy="55%" outerRadius="73%" data={data}>
          <PolarGrid gridType="polygon" />
          <PolarAngleAxis
            dataKey="category"
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
            dataKey="score"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
