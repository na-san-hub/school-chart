import { getSchoolWithCourses } from "@/lib/school";
import ReviewsPageClient from "./client";
import DetailSidebar from "../components/sidebar/DetailSidebar";
import { getAllReviewsForSchool } from "@/lib/reviews";

export const dynamic = "force-dynamic";

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page?: string;
    gender?: string;
    ageGroup?: string;
    keyword?: string;
    sort?: string;
  }>;
}

export default async function ReviewsPage({
  params,
  searchParams,
}: ReviewsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const schoolId = resolvedParams.id;
  const page = parseInt(resolvedSearchParams.page || "1");
  const gender = resolvedSearchParams.gender;
  const ageGroup = resolvedSearchParams.ageGroup;
  const keyword = resolvedSearchParams.keyword || "";
  const sort = resolvedSearchParams.sort || "latest";

  // getAllReviewsForSchool関数を使用
  const { reviews, totalCount } = await getAllReviewsForSchool(
    schoolId,
    page,
    10, // perPage
    { gender, ageGroup, keyword, sort } // フィルター
  );

  const school = await getSchoolWithCourses(schoolId);

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-700 mb-5">口コミ一覧</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/*  クライアントコンポーネント（左） */}
          <ReviewsPageClient
            school={school}
            reviews={reviews}
            totalCount={totalCount}
          />
          {/*  サーバーコンポーネント（右） */}
          <div className="w-full md:w-1/4">
            <DetailSidebar school={school} />
          </div>
        </div>
      </div>
    </div>
  );
}
