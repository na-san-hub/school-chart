"use client";
import { useAuth } from "@/context/AuthContext/useAuth";
import { useState, useEffect, useCallback } from "react";
import { getUserReviews } from "./actions";
import { UserReviewDisplay } from "@/types/review";
import UserInformation from "./components/UserInformation";
import UserReview from "./components/UserReview";

export default function MypagePage() {
  const { user, userName } = useAuth();
  const [reviews, setReviews] = useState<UserReviewDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // useCallbackでメモ化
  const fetchUserReviews = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { reviews } = await getUserReviews();
      const displayReviews = reviews.map((review) => {
        const averageRating =
          (review.ratingCurriculum +
            review.ratingInstructor +
            review.ratingCost +
            review.ratingSupport +
            review.ratingCommunity) /
          5;
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
  }, [user]); // userを依存配列に入れる

  useEffect(() => {
    if (user) {
      fetchUserReviews();
    }
  }, [user, fetchUserReviews]); // fetchUserReviewsも依存配列に追加

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
