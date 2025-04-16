"use client";

import StarRating from "@/components/schoolData/StarRating";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";
import { ThumbsUp, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext/useAuth";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const handleCardClick = () => {
    if (!isLoggedIn) {
      const currentPath = window.location.pathname;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  };

  const averageRating =
    (review.ratingCurriculum +
      review.ratingInstructor +
      review.ratingCost +
      review.ratingSupport +
      review.ratingCommunity) /
    5;

  const formattedDate = new Date(review.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 ${
        !isLoggedIn ? "cursor-pointer hover:opacity-75" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* ヘッダー */}
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

      {/* 口コミ内容（ぼかし対象） */}
      <div className="border-t border-gray-100 pt-4 mt-2 relative">
        <div
          className={`space-y-4 ${
            !isLoggedIn ? "blur-sm select-none pointer-events-none" : ""
          }`}
        >
          {review.commentCurriculum?.trim() && (
            <CategoryComment
              title="カリキュラム"
              comment={review.commentCurriculum}
              rating={review.ratingCurriculum}
            />
          )}
          {review.commentInstructor?.trim() && (
            <CategoryComment
              title="講師"
              comment={review.commentInstructor}
              rating={review.ratingInstructor}
            />
          )}
          {review.commentCost?.trim() && (
            <CategoryComment
              title="料金"
              comment={review.commentCost}
              rating={review.ratingCost}
            />
          )}
          {review.commentSupport?.trim() && (
            <CategoryComment
              title="サポート"
              comment={review.commentSupport}
              rating={review.ratingSupport}
            />
          )}
          {review.commentCommunity?.trim() && (
            <CategoryComment
              title="コミュニティ"
              comment={review.commentCommunity}
              rating={review.ratingCommunity}
            />
          )}
          {review.comment?.trim() && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center mb-1">
                <h3 className="text-sm font-semibold text-gray-700">
                  総合感想
                </h3>
              </div>
              <p className="text-gray-700 whitespace-pre-line text-sm">
                {review.comment}
              </p>
            </div>
          )}
        </div>

        {/* ロックオーバーレイ（非ログイン時） */}
        {!isLoggedIn && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-lg">
            <Lock className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-sm text-cyan-600">
              続きを見るにはログインが必要です
            </span>
          </div>
        )}
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

const CategoryComment = ({
  title,
  comment,
  rating,
}: {
  title: string;
  comment: string;
  rating: number;
}) => (
  <div>
    <div className="flex items-center mb-1">
      <h3 className="text-sm font-semibold text-gray-700 mr-2">
        {title}の評価
      </h3>
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 mr-1">
          {rating.toFixed(1)}
        </span>
        <StarRating rating={rating} size="xs" />
      </div>
    </div>
    <p className="text-gray-700 whitespace-pre-line text-sm">{comment}</p>
  </div>
);

export default ReviewCard;
