export const dynamic = "force-dynamic";

import ChartSection from "@/schools/[id]/components/ChartSection";
import { getSchoolWithCourses, getRadarChartData } from "@/lib/school";
import SchoolDetail from "@/schools/[id]/components/SchoolDetail";
import { getPickupReviewsForSchool } from "@/lib/reviews";
import PickupReviews from "./components/reviews/PickupReviews";
import { getPickupCoursesForSchool } from "@/lib/courses";
import PickupCourses from "./components/courses/PickupCourses";
import MainSidebar from "./components/sidebar/MainSidebar";

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
    getPickupReviewsForSchool(schoolId),
    getPickupCoursesForSchool(schoolId),
  ]);

  // ピックアップコースをschoolオブジェクトに追加
  const schoolWithPickupCourses = {
    ...school,
    pickupCourses,
  };

  return (
    <div className="border-t border-t-gray-400 w-full">
      {/* 上部コンテンツ */}
      <div className="mt-5 flex flex-wrap max-w-5xl mx-auto justify-between items-center">
        <ChartSection chartData={chartData} />
        <SchoolDetail school={school} />
      </div>

      {/* 下部コンテンツ */}
      <div className="mt-5 max-w-5xl mx-auto flex flex-col md:flex-row">
        {/* 左側：レビューとコース */}
        <div className="w-full md:w-3/4 pr-0 md:pr-4">
          <PickupReviews reviews={reviews} schoolId={schoolId} />
          <PickupCourses school={schoolWithPickupCourses} />
        </div>

        {/* 右側：サイドバー */}
        <div className="w-full md:w-1/4 mt-5 md:mt-0">
          <MainSidebar schoolId={schoolId} school={school} />
        </div>
      </div>
    </div>
  );
}
