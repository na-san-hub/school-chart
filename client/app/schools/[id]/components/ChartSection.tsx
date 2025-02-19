import RadarChartComponent from "./RadarChart";
import Score from "./Score";

interface ChartSectionProps {
  chartData: { subject: string; value: number; fullMark: number }[];
  rating: number;
}

export default function ChartSection({ chartData, rating }: ChartSectionProps) {
  return (
    <section className="my-5 ml-5 py-3 flex justify-center items-center rounded-md border border-gray-200">
      {/* チャートエリア */}
      <div className="w-full text-cyan-600">
        <RadarChartComponent data={chartData} />
      </div>
      {/* スコアエリア */}
      <div>
        <Score rating={rating} />
        <button className="bg-gray-200 mt-2 py-1 px-2 rounded-md border border-gray-200 text-cyan-600 text-sm">
          評価分布
        </button>
      </div>
    </section>
  );
}
