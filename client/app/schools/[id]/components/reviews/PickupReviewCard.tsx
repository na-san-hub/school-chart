"use client";

import StarRating from "@/components/schoolData/StarRating";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";
import { Lock } from "lucide-react";
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

const categoryLabels = {
  curriculum: "カリキュラム",
  instructor: "講師",
  cost: "料金",
  support: "サポート",
  community: "コミュニティ",
};

export default function PickupReviewCard({
  review,
}: {
  review: ReviewWithUser;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;

  const avgRating =
    (review.ratingCurriculum +
      review.ratingInstructor +
      review.ratingCost +
      review.ratingSupport +
      review.ratingCommunity) /
    5;

  // すべてのコメントを集約して一つのテキストにする
  const generateCombinedCommentText = () => {
    const comments = [];

    // 総合コメントがあれば最初に追加
    if (review.comment) {
      comments.push(review.comment.trim());
    }

    // 各カテゴリのコメントを追加
    const categoryComments = [
      { label: categoryLabels.curriculum, text: review.commentCurriculum },
      { label: categoryLabels.instructor, text: review.commentInstructor },
      { label: categoryLabels.cost, text: review.commentCost },
      { label: categoryLabels.support, text: review.commentSupport },
      { label: categoryLabels.community, text: review.commentCommunity },
    ];

    // 空でないカテゴリコメントを追加
    categoryComments.forEach(({ label, text }) => {
      if (text && text.trim() !== "") {
        comments.push(`【${label}】${text.trim()}`);
      }
    });

    // すべてのコメントを結合
    return comments.join("\n\n");
  };

  const combinedComment = generateCombinedCommentText();
  const visibleLength = 60;
  const visibleText = combinedComment.slice(0, visibleLength);
  const hiddenText = combinedComment.slice(visibleLength);

  // ログインページへリダイレクト
  const handleLoginRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentPath = window.location.pathname;
    router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
  };

  // 未ログイン時は、カードクリックでログインページへ
  const handleCardClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      handleLoginRedirect(e);
    }
  };

  return (
    <div
      className={`border rounded-md p-4 bg-white hover:bg-gray-50 transition-all 
        ${!isLoggedIn ? "cursor-pointer hover:opacity-75" : ""}`}
      onClick={!isLoggedIn ? handleCardClick : undefined}
    >
      <div className="text-base text-gray-500 mb-1">{review.course.name}</div>

      <div className="mb-2 flex items-center gap-1">
        <StarRating rating={avgRating} size="sm" />
        <span className="text-sm text-gray-700">{avgRating.toFixed(1)}</span>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-xs">
          投稿日：{new Date(review.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-xs">
          {ageGroupMap[review.user.ageGroup]} / {genderMap[review.user.gender]}
        </p>
      </div>

      {combinedComment && (
        <div className="mt-3 border-t pt-3">
          <p className="text-sm text-gray-700 whitespace-pre-wrap inline">
            {visibleText}
            {hiddenText.length > 0 && "…"}
          </p>

          {hiddenText.length > 0 && (
            <span className="relative block w-full mt-1">
              <span
                className={`text-sm whitespace-pre-wrap block w-full ${
                  isLoggedIn
                    ? "text-gray-700"
                    : "blur-sm select-none text-gray-700"
                }`}
              >
                {/* 非ログイン時は長さを制限 */}
                {isLoggedIn ? hiddenText : hiddenText.slice(0, 100)}
              </span>

              {!isLoggedIn && (
                <span className="absolute inset-0 flex items-center justify-center bg-white/70 w-full">
                  <Lock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-xs text-cyan-600">
                    続きを見るにはログインが必要です
                  </span>
                </span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
