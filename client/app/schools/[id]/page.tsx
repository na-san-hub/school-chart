import ChartSection from "@/schools/[id]/components/ChartSection";
import { getRadarChartData } from "@/lib/schoolData";
import { getSchoolById } from "@/lib/school";

export default async function SchoolPage(props: {
  params: Promise<{ id: string }>;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const chartData = await getRadarChartData(id);
  const school = await getSchoolById(id);

  return (
    <div className="border-t border-t-gray-400">
      <ChartSection chartData={chartData} rating={school.rating} />
    </div>
  );
}
