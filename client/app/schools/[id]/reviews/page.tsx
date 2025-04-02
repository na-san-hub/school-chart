import { getSchoolWithCourses } from "@/lib/school";
import { getAllReviewsForSchool } from "@/lib/reviews";
import ReviewFilterSection from "./components/ReviewFilter";
import ReviewList from "./components/ReviewList";
import ReviewSidebarSection from "./components/ReviewSidebar";

export const dynamic = "force-dynamic";

interface ReviewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  // パラメータを解決
  const resolvedParams = await params;
  const schoolId = resolvedParams.id;

  // スクール情報とレビューデータを並行して取得
  const [school, reviews] = await Promise.all([
    getSchoolWithCourses(schoolId),
    getAllReviewsForSchool(schoolId),
  ]);

  return (
    <div className="border-t border-t-gray-400 w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-700 mb-5">口コミ一覧</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 左側: フィルターと口コミリスト */}
          <div className="w-full md:w-3/4">
            {/* フィルタリングセクション */}
            <ReviewFilterSection />

            {/* レビューリスト */}
            <ReviewList reviews={reviews} />
          </div>

          {/* 右側: スクール情報と操作ボタン */}
          <div className="w-full md:w-1/4">
            <ReviewSidebarSection school={school} />
          </div>
        </div>
      </div>
    </div>
  );
}
