"use client";

import { useAuth } from "@/context/AuthContext/useAuth";
import { useState, useEffect } from "react";
import { getUserReviews } from "./actions";
import { UserReviewDisplay } from "@/types/review";
import UserInformation from "./components/UserInformation";
import UserReview from "./components/UserReview";

export default function MypagePage() {
  const { user, userName } = useAuth();
  const [reviews, setReviews] = useState<UserReviewDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Server Actionを使用して口コミデータを取得
  const fetchUserReviews = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Server Actionを呼び出し
      const { reviews } = await getUserReviews();

      // 表示用にデータを整形
      const displayReviews = reviews.map((review) => {
        // 5つの評価を平均して総合評価を計算
        const averageRating =
          (review.ratingCurriculum +
            review.ratingInstructor +
            review.ratingCost +
            review.ratingSupport +
            review.ratingCommunity) /
          5;

        // school情報がない場合のフォールバック
        const school = review.course.school || { id: "", name: "" };

        return {
          id: review.id,
          schoolId: school.id,
          schoolName: school.name,
          courseName: review.course.name,
          rating: averageRating,
          createdAt: new Date(review.createdAt),
        };
      });

      setReviews(displayReviews);
    } catch (error) {
      console.error("口コミデータの取得に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user]);

  if (!user) return null;

  const displayName = userName || "ユーザー";

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-700 mb-5 flex items-center">
        マイページ
      </h1>
      <UserInformation displayName={displayName} />
      <UserReview reviews={reviews} isLoading={isLoading} />
    </div>
  );
}
