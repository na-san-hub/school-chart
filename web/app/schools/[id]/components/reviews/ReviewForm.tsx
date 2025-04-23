"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CourseListData } from "@/types/school";
import { submitReview } from "@/actions/reviewsPost";

interface ReviewFormProps {
  schoolId: string;
  courses: CourseListData[];
}

interface RatingField {
  name: string;
  label: string;
  value: number;
  commentField: string;
}

export default function ReviewForm({ schoolId, courses }: ReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  // レビュー評価項目
  const [ratings, setRatings] = useState<RatingField[]>([
    {
      name: "ratingCurriculum",
      label: "カリキュラム",
      commentField: "commentCurriculum",
      value: 0,
    },
    {
      name: "ratingInstructor",
      label: "講師",
      commentField: "commentInstructor",
      value: 0,
    },
    {
      name: "ratingCost",
      label: "料金",
      commentField: "commentCost",
      value: 0,
    },
    {
      name: "ratingSupport",
      label: "サポート",
      commentField: "commentSupport",
      value: 0,
    },
    {
      name: "ratingCommunity",
      label: "コミュニティ",
      commentField: "commentCommunity",
      value: 0,
    },
  ]);

  // レビューコメント項目
  const [comments, setComments] = useState({
    comment: "",
    commentCurriculum: "",
    commentInstructor: "",
    commentCost: "",
    commentSupport: "",
    commentCommunity: "",
  });

  // 星評価の変更ハンドラ
  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index].value = value;
    setRatings(newRatings);
  };

  // コメントの変更ハンドラ
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComments({ ...comments, [name]: value });
  };

  // コース選択の変更ハンドラ
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(e.target.value);
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // 必須項目の検証
    if (!selectedCourseId) {
      setError("コースを選択してください");
      setIsSubmitting(false);
      return;
    }

    const hasEmptyRating = ratings.some((rating) => rating.value === 0);
    if (hasEmptyRating) {
      setError("すべての評価項目に星評価をつけてください");
      setIsSubmitting(false);
      return;
    }

    // カテゴリーコメントの必須チェック
    const hasEmptyComment = [
      "commentCurriculum",
      "commentInstructor",
      "commentCost",
      "commentSupport",
      "commentCommunity",
    ].some((field) => !comments[field as keyof typeof comments]);

    if (hasEmptyComment) {
      setError("すべての評価項目にコメントを入力してください");
      setIsSubmitting(false);
      return;
    }

    try {
      // レビューデータの作成
      const reviewData = {
        courseId: selectedCourseId,
        ratingCurriculum:
          ratings.find((r) => r.name === "ratingCurriculum")?.value || 0,
        ratingInstructor:
          ratings.find((r) => r.name === "ratingInstructor")?.value || 0,
        ratingCost: ratings.find((r) => r.name === "ratingCost")?.value || 0,
        ratingSupport:
          ratings.find((r) => r.name === "ratingSupport")?.value || 0,
        ratingCommunity:
          ratings.find((r) => r.name === "ratingCommunity")?.value || 0,
        ...comments,
      };

      // サーバーアクションを使用
      const result = await submitReview(reviewData);

      if (!result.success) {
        throw new Error(result.error || "レビューの投稿に失敗しました");
      }

      // 成功処理
      setSuccess(true);
      setTimeout(() => {
        router.push(`/schools/${schoolId}/reviews`);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("レビュー投稿エラー:", error);
      setError(
        error instanceof Error ? error.message : "不明なエラーが発生しました"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold text-green-700 mb-2">
          レビューを投稿しました
        </h2>
        <p className="text-green-600">
          ありがとうございます。レビューページへリダイレクトします...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
        {/* コース選択 */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            コースを選択 <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCourseId}
            onChange={handleCourseChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">コースを選択してください</option>
            {courses.length > 0
              ? courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))
              : null}
            <option value="other">その他</option>
          </select>
        </div>

        {/* 各項目の評価 */}
        <div className="space-y-4">
          {ratings.map((rating, index) => (
            <div key={rating.name} className="border-gray-100 pt-2">
              <div className="items-center my-2">
                <label className="block text-base font-medium mb-3 text-gray-700">
                  {rating.label}の評価 <span className="text-red-500">*</span>
                </label>
                <select
                  value={rating.value}
                  onChange={(e) =>
                    handleRatingChange(index, Number(e.target.value))
                  }
                  className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value={0}>選択してください</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name={rating.commentField}
                value={comments[rating.commentField as keyof typeof comments]}
                onChange={handleCommentChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder={`${rating.label}についての評価をお書きください`}
              />
            </div>
          ))}
        </div>

        {/* 全体的な感想 */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            総合感想
          </label>
          <textarea
            name="comment"
            value={comments.comment}
            onChange={handleCommentChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="その他このスクールの良かった点、改善点など総合的な感想をお書きください"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 送信ボタン */}
        <div className="pt-4 border-gray-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`block mx-auto py-3 px-6 bg-cyan-600 text-white rounded-md font-medium ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-70"
            }`}
          >
            {isSubmitting ? "送信中..." : "レビューを投稿する"}
          </button>
        </div>
      </form>
    </div>
  );
}
