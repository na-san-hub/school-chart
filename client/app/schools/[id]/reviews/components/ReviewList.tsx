import { ReviewWithUser } from "@/types/review";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviews: ReviewWithUser[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-500">
          現在、このスクールの口コミはありません。
        </p>
        <button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-md text-sm hover:opacity-90">
          口コミを投稿する
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium text-gray-700">
          <span className="font-bold text-xl">{reviews.length}</span> 件の口コミ
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
    </div>
  );
};

export default ReviewList;
