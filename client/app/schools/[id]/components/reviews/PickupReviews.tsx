import Link from "next/link";
import ReviewCard from "./ReviewCard";
import { ReviewWithUser } from "@/types/review";

export default function PickupReviews({
  reviews,
  schoolId,
}: {
  reviews: ReviewWithUser[];
  schoolId: string;
}) {
  return (
    <section className="mt-5 max-w-5xl w-full mx-auto px-4">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        ピックアップ口コミ
      </h2>
      {reviews.length === 0 ? (
        <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-6 text-center text-gray-500 mb-10">
          <p className="text-sm">まだ口コミが投稿されていません。</p>
          <button className="mt-2 text-sm border bg-cyan-600 hover:opacity-75 text-white rounded-md py-2 px-5">
            ログインしてレビューを投稿する
          </button>
        </div>
      ) : (
        <Link href={`/schools/${schoolId}/reviews`} className="block">
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <button className="my-5 max-w-5xl text-sm w-full px-3 py-3 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200">
            受講者の口コミ一覧を見る
          </button>{" "}
        </Link>
      )}
    </section>
  );
}
