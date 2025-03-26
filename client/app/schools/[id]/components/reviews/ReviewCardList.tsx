import ReviewCard from "./ReviewCard";
import { ReviewWithUser } from "@/types/review";

export default function ReviewCardList({
  reviews,
}: {
  reviews: ReviewWithUser[];
}) {
  return (
    <section className="mt-5 max-w-5xl w-full mx-auto px-4">
      <h2 className="text-lg font-bold mb-4 text-gray-700">
        ピックアップ口コミ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <button className="my-5 max-w-5xl text-sm w-full px-3 py-3 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200">
        受講者の口コミ一覧を見る
      </button>
    </section>
  );
}
