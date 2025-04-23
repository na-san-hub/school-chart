import Link from "next/link";
import { CalendarDays, PenSquare } from "lucide-react";
import StarRating from "@/components/schoolData/StarRating";
import { UserReviewDisplay } from "@/types/review";

export default function UserReview({
  reviews,
  isLoading,
}: {
  reviews: UserReviewDisplay[];
  isLoading: boolean;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
        <PenSquare className="w-5 h-5 mr-2 text-gray-700" />
        口コミしたスクール
      </h3>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-pulse">データを読み込み中...</div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <Link href={`/schools/${review.schoolId}`} className="block">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {review.schoolName}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {review.courseName}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-3">
                  <CalendarDays className="w-3 h-3 mr-1" />
                  投稿日: {review.createdAt.toLocaleDateString()}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4 text-sm">
            まだ口コミを投稿していません。
          </p>
          <Link
            href="/search"
            className="inline-block px-6 py-2 text-sm bg-cyan-600 text-white rounded-md hover:opacity-90 transition"
          >
            スクールを探して口コミを投稿する
          </Link>
        </div>
      )}
    </div>
  );
}
