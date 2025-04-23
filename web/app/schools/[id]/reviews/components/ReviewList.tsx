"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReviewWithUser } from "@/types/review";
import ReviewCard from "../../components/reviews/ReviewCard";
import ReviewPagination from "./ReviewPagination";

interface ReviewListProps {
  reviews: ReviewWithUser[];
  totalCount: number;
}

const ReviewList = ({ reviews, totalCount }: ReviewListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = 10; // 1ページあたりの表示件数

  // 現在のソート条件を取得
  const currentSort = searchParams.get("sort") || "latest";

  // ソート済みレビューの状態を管理
  const [sortedReviews, setSortedReviews] = useState<ReviewWithUser[]>(reviews);

  // レビューをソートする関数
  useEffect(() => {
    const sortReviews = () => {
      const reviewsCopy = [...reviews];

      switch (currentSort) {
        case "rating_high":
          // 評価の高い順（平均値で降順ソート）
          reviewsCopy.sort((a, b) => {
            const avgA =
              (a.ratingCurriculum +
                a.ratingInstructor +
                a.ratingCost +
                a.ratingSupport +
                a.ratingCommunity) /
              5;
            const avgB =
              (b.ratingCurriculum +
                b.ratingInstructor +
                b.ratingCost +
                b.ratingSupport +
                b.ratingCommunity) /
              5;
            return avgB - avgA;
          });
          break;
        case "rating_low":
          // 評価の低い順（平均値で昇順ソート）
          reviewsCopy.sort((a, b) => {
            const avgA =
              (a.ratingCurriculum +
                a.ratingInstructor +
                a.ratingCost +
                a.ratingSupport +
                a.ratingCommunity) /
              5;
            const avgB =
              (b.ratingCurriculum +
                b.ratingInstructor +
                b.ratingCost +
                b.ratingSupport +
                b.ratingCommunity) /
              5;
            return avgA - avgB;
          });
          break;
        case "latest":
        default:
          // デフォルトは新着順
          reviewsCopy.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          break;
      }

      setSortedReviews(reviewsCopy);
    };

    sortReviews();
  }, [reviews, currentSort]);

  // 並べ替え処理
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSort = e.target.value;
      const params = new URLSearchParams(searchParams.toString());

      // ソート条件を設定
      params.set("sort", newSort);

      // ページは1に戻す
      params.set("page", "1");

      // URLを更新
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

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
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="px-3 py-1 border text-gray-700 border-gray-300 rounded-md text-sm"
          >
            <option value="latest">新着順</option>
            <option value="rating_high">評価の高い順</option>
            <option value="rating_low">評価の低い順</option>
          </select>
        </div>
      </div>

      {/* レビューカードリスト */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* ページネーション */}
      <ReviewPagination totalCount={totalCount} perPage={perPage} />
    </div>
  );
};

export default ReviewList;
