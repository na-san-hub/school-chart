import ChartSection from "@/schools/[id]/components/ChartSection";
import { getRadarChartData } from "@/lib/schoolRating";
import { getSchoolWithCourses } from "@/lib/school";
import SchoolDetail from "@/schools/[id]/components/SchoolDetail";

export default async function SchoolPage(props: {
  params: Promise<{ id: string }>;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const chartData = await getRadarChartData(id);
  const school = await getSchoolWithCourses(id);

  return (
    <div className="border-t border-t-gray-400 flex flex-wrap justify-center">
      <ChartSection chartData={chartData} rating={school.rating} />
      <SchoolDetail school={school} />
    </div>
  );
}
