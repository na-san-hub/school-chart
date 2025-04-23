import { ReviewWithUser } from "@/types/review";
import ReviewCard from "../../components/reviews/ReviewCard";
import ReviewPagination from "./ReviewPagination";

interface ReviewListProps {
  reviews: ReviewWithUser[];
  totalCount: number;
}

const ReviewList = ({ reviews, totalCount }: ReviewListProps) => {
  const perPage = 10; // 1ページあたりの表示件数

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-500">条件に合う口コミはありません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium text-gray-700">
          <span className="font-bold text-xl">{totalCount}</span> 件の口コミ
        </p>
        <div className="flex gap-2">
          <select className="px-3 py-1 border text-gray-700 border-gray-300 rounded-md text-sm">
            <option value="latest">新着順</option>
            <option value="rating_high">評価の高い順</option>
            <option value="rating_low">評価の低い順</option>
          </select>
        </div>
      </div>

      {/* レビューカードリスト */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* ページネーション */}
      <ReviewPagination totalCount={totalCount} perPage={perPage} />
    </div>
  );
};

export default ReviewList;
