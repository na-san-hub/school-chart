"use client";

import StarRating from "@/components/schoolData/StarRating";
import { ReviewWithUser, Gender, AgeGroup } from "@/types/review";

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

export default function PickupReviewCard({
  review,
}: {
  review: ReviewWithUser;
}) {
  const avgRating =
    (review.ratingCurriculum +
      review.ratingInstructor +
      review.ratingCost +
      review.ratingSupport +
      review.ratingCommunity) /
    5;

  return (
    <div className="border rounded-md p-4 bg-white hover:opacity-70 hover:bg-gray-50">
      <div className="text-base text-gray-500 mb-1">{review.course.name}</div>

      <div className="mb-2 flex items-center gap-1">
        <StarRating rating={avgRating} size="sm" />
        <span className="text-sm text-gray-700">{avgRating.toFixed(1)}</span>
      </div>
      <div className="flex gap-2">
        <p className="text-gray-500 text-xs">
          投稿日：{new Date(review.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-xs">
          {ageGroupMap[review.user.ageGroup]} / {genderMap[review.user.gender]}
        </p>
      </div>
    </div>
  );
}
