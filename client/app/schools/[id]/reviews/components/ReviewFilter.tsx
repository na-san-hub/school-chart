"use client";

import { useEffect } from "react";
import { Gender, AgeGroup } from "@prisma/client";
import { ReviewWithUser } from "@/types/review";
import { filterReviewsWithForm, FilterState } from "../actions";
import { useFormState } from "react-dom";
import { Search } from "lucide-react";

// 年齢グループの表示名マッピング
const ageGroupLabels: { [key in AgeGroup]: string } = {
  TEENS: "10代",
  TWENTIES: "20代",
  THIRTIES: "30代",
  FORTIES: "40代",
  FIFTIES: "50代",
  SIXTIES: "60代以上",
};

const initialState: FilterState = {
  gender: "all",
  ageGroup: "all",
  keyword: "",
  reviews: [],
};

interface ReviewFilterFormProps {
  schoolId: string;
  initialReviews: ReviewWithUser[];
  onReviewsUpdate: (reviews: ReviewWithUser[]) => void;
}

export default function ReviewFilterForm({
  schoolId,
  initialReviews,
  onReviewsUpdate,
}: ReviewFilterFormProps) {
  // useFormStateを使用して、フォーム状態を管理
  const [state, formAction] = useFormState(filterReviewsWithForm, {
    ...initialState,
    reviews: initialReviews,
  });

  useEffect(() => {
    // フィルター結果が変更されたら親コンポーネントに通知
    onReviewsUpdate(state.reviews);
  }, [state.reviews, onReviewsUpdate]);

  return (
    <form
      action={formAction}
      className="bg-white rounded-lg border border-gray-200 p-5 mb-8"
    >
      <input type="hidden" name="schoolId" value={schoolId} />

      <h2 className="text-base font-semibold text-gray-700 mb-2">
        絞り込み検索
      </h2>

      <div className="flex flex-wrap gap-7 mb-3">
        {/* 性別フィルター */}
        <div className="flex items-center">
          <label className="text-xs font-medium text-gray-600">性別：</label>
          <div className="flex gap-3 ml-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="all"
                defaultChecked={state.gender === "all"}
                className="mr-1.5"
              />
              <span className="text-sm">すべて</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.MALE}
                defaultChecked={state.gender === Gender.MALE}
                className="mr-1.5"
              />
              <span className="text-sm">男性</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.FEMALE}
                defaultChecked={state.gender === Gender.FEMALE}
                className="mr-1.5"
              />
              <span className="text-sm">女性</span>
            </label>
          </div>
        </div>

        {/* 年代フィルター */}
        <div className="flex items-center">
          <label className="text-xs font-medium text-gray-600">年代：</label>
          <select
            name="ageGroup"
            defaultValue={state.ageGroup}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm ml-2"
          >
            <option value="all">すべて</option>
            {Object.entries(ageGroupLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* キーワード検索 */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            name="keyword"
            defaultValue={state.keyword}
            placeholder="キーワードで口コミを検索"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center text-sm hover:opacity-90"
        >
          <Search className="w-4 h-4 mr-1" />
          検索
        </button>
      </div>
    </form>
  );
}
