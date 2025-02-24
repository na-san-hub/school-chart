import RadarChartComponent from "./RadarChart";
import Score from "./Score";
import { RadarChartData } from "@/types/school";

interface ChartSectionProps {
  chartData: RadarChartData;
}

export default function ChartSection({
  chartData: { schoolRating, categories },
}: ChartSectionProps) {
  return (
    <section className="my-5 ml-5 py-3 flex justify-center items-center rounded-md border border-gray-200">
      {/* チャートエリア */}
      <div className="w-full text-cyan-600">
        <RadarChartComponent data={categories} />
      </div>
      {/* スコアエリア */}
      <div>
        <Score rating={schoolRating} />
        <button className="bg-gray-200 mt-2 py-1 px-2 rounded-md border border-gray-200 text-cyan-600 text-sm">
          評価分布
        </button>
      </div>
    </section>
  );
}
