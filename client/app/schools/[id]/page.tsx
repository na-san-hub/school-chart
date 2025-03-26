export const dynamic = "force-dynamic";

import ChartSection from "@/schools/[id]/components/ChartSection";
import { getSchoolWithCourses, getRadarChartData } from "@/lib/school";
import SchoolDetail from "@/schools/[id]/components/SchoolDetail";
import { getReviewsForSchool } from "@/lib/reviews";
import ReviewCardList from "./components/reviews/ReviewCardList";

export default async function SchoolPage(props: {
  params: Promise<{ id: string }>;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const schoolId = resolvedParams.id;

  const chartData = await getRadarChartData(schoolId);
  const school = await getSchoolWithCourses(schoolId);

  const reviews = await getReviewsForSchool(schoolId);

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="mt-5 flex flex-wrap max-w-5xl mx-auto justify-between items-center">
        <ChartSection chartData={chartData} />
        <SchoolDetail school={school} />
        <ReviewCardList reviews={reviews} />
      </div>
    </div>
  );
}
