export const dynamic = "force-dynamic";

import ChartSection from "@/schools/[id]/components/ChartSection";
import { getSchoolWithCourses, getRadarChartData } from "@/lib/school";
import SchoolDetail from "@/schools/[id]/components/SchoolDetail";
import { getReviewsForSchool } from "@/lib/reviews";
import PickupReviews from "./components/reviews/PickupReviews";
import { getPickupCoursesForSchool } from "@/lib/courses";
import PickupCourses from "./components/courses/PickupCourses";

export default async function SchoolPage(props: {
  params: Promise<{ id: string }>;
}) {
  // props.params を await してから利用する
  const resolvedParams = await props.params;
  const schoolId = resolvedParams.id;

  // 必要なデータを並行して取得
  const [chartData, school, reviews, pickupCourses] = await Promise.all([
    getRadarChartData(schoolId),
    getSchoolWithCourses(schoolId),
    getReviewsForSchool(schoolId),
    getPickupCoursesForSchool(schoolId),
  ]);

  // ピックアップコースをschoolオブジェクトに追加
  const schoolWithPickupCourses = {
    ...school,
    pickupCourses,
  };

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="mt-5 flex flex-wrap max-w-5xl mx-auto justify-between items-center">
        <ChartSection chartData={chartData} />
        <SchoolDetail school={school} />
        <PickupReviews reviews={reviews} />
        <PickupCourses school={schoolWithPickupCourses} />
      </div>
    </div>
  );
}
