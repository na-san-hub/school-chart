import ChartSection from "@/schools/[id]/components/ChartSection";
import { getSchoolWithCourses, getRadarChartData } from "@/lib/school";
import SchoolDetail from "@/schools/[id]/components/SchoolDetail";

export default async function SchoolPage(props: {
  params: Promise<{ id: string }>;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const schoolId = resolvedParams.id;

  const chartData = await getRadarChartData(schoolId);
  const school = await getSchoolWithCourses(schoolId);

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="mt-5 flex flex-wrap max-w-5xl mx-auto justify-between items-center">
        <ChartSection chartData={chartData} />
        <SchoolDetail school={school} />
      </div>
    </div>
  );
}
