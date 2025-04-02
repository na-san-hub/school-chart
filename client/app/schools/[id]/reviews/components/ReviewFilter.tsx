"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const ReviewFilterSection = () => {
  // フィルタリング状態
  const [gender, setGender] = useState<string>("all");
  const [ageGroup, setAgeGroup] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  // フィルタリング適用
  const handleFilter = () => {
    // APIリクエストやコンテキスト更新などの実装
    console.log("フィルタリング適用:", { gender, ageGroup, keyword });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-8">
      <h2 className="text-base font-semibold text-gray-700 mb-2">
        絞り込み検索
      </h2>

      <div className="flex flex-wrap gap-7 mb-3">
        {/* 性別フィルター */}
        <div className="flex items-center">
          <label className="text-xs font-medium text-gray-600">性別：</label>
          <div className="flex gap-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="all"
                checked={gender === "all"}
                onChange={() => setGender("all")}
                className="mr-1.5"
              />
              <span className="text-sm">すべて</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={gender === "MALE"}
                onChange={() => setGender("MALE")}
                className="mr-1.5"
              />
              <span className="text-sm">男性</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={gender === "FEMALE"}
                onChange={() => setGender("FEMALE")}
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
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 text-sm"
          >
            <option value="all">すべて</option>
            <option value="TEENS">10代</option>
            <option value="TWENTIES">20代</option>
            <option value="THIRTIES">30代</option>
            <option value="FORTIES">40代</option>
            <option value="FIFTIES">50代</option>
            <option value="SIXTIES">60代以上</option>
          </select>
        </div>
      </div>

      {/* キーワード検索 */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="キーワードで口コミを検索"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center text-sm hover:opacity-90"
        >
          <Search className="w-4 h-4 mr-1" />
          検索
        </button>
      </div>
    </div>
  );
};

export default ReviewFilterSection;
