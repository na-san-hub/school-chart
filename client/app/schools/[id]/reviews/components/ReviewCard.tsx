import StarRating from "@/components/schoolData/StarRating";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";
import { ThumbsUp } from "lucide-react";

// 性別と年代のマッピング
const genderMap: Record<Gender, string> = {
  MALE: "男性",
  FEMALE: "女性",
  OTHER: "その他",
};

const ageGroupMap: Record<AgeGroup, string> = {
  TEENS: "10代",
  TWENTIES: "20代",
  THIRTIES: "30代",
  FORTIES: "40代",
  FIFTIES: "50代",
  SIXTIES: "60代以上",
};

interface ReviewCardProps {
  review: ReviewWithUser;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  // 総合評価（5つの評価の平均）
  const averageRating =
    (review.ratingCurriculum +
      review.ratingInstructor +
      review.ratingCost +
      review.ratingSupport +
      review.ratingCommunity) /
    5;

  // 日付フォーマット
  const formattedDate = new Date(review.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* ヘッダー部分 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center mb-1">
            <StarRating rating={averageRating} size="base" />
            <span className="ml-2 font-bold text-lg">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <div className="text-gray-500 text-sm">{review.course.name}</div>
        </div>
        <div className="text-sm text-gray-500 text-right">
          <div>{formattedDate}</div>
          <div className="mt-1">
            {ageGroupMap[review.user.ageGroup]} /{" "}
            {genderMap[review.user.gender]}
          </div>
        </div>
      </div>

      {/* 各評価項目 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <RatingItem label="カリキュラム" rating={review.ratingCurriculum} />
        <RatingItem label="講師" rating={review.ratingInstructor} />
        <RatingItem label="料金" rating={review.ratingCost} />
        <RatingItem label="サポート" rating={review.ratingSupport} />
        <RatingItem label="コミュニティ" rating={review.ratingCommunity} />
      </div>

      {/* 口コミ内容 */}
      <div className="border-t border-gray-100 pt-4 mt-2">
        <p className="text-gray-700 whitespace-pre-line">{review.comment}</p>
      </div>

      {/* フッター */}
      <div className="flex justify-end mt-4">
        <button className="flex items-center text-gray-500 text-sm hover:text-cyan-600">
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>役に立った (0)</span>
        </button>
      </div>
    </div>
  );
};

// 評価項目コンポーネント
const RatingItem = ({ label, rating }: { label: string; rating: number }) => (
  <div className="flex flex-col items-center">
    <div className="text-xs text-gray-600 mb-1">{label}</div>
    <div className="flex items-center">
      <span className="font-medium text-gray-700 mr-1">
        {rating.toFixed(1)}
      </span>
      <StarRating rating={rating} size="xs" />
    </div>
  </div>
);

export default ReviewCard;
