"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const tabs = [
  { id: "top", label: "おすすめ", path: "" },
  { id: "reviews", label: "評価順", path: "?sort=rating" },
  { id: "course", label: "新着順", path: "?sort=newest" },
];

const SearchMenuTabs = () => {
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString()); // 現在のクエリパラメータを取得
  const sort = searchParams.get("sort");

  return (
    <div className="flex max-w-5xl mx-auto bg-gray-100 px-16">
      {tabs.map((tab) => {
        const isTopTab = (tab.id === "top" && !sort) || sort === "";
        const isSortMatch = sort === tab.path.replace("?sort=", "");
        const isActive = isTopTab || isSortMatch;

        // クエリパラメータを更新（他の検索条件を維持）
        if (tab.id === "top") {
          currentParams.delete("sort");
        } else {
          currentParams.set("sort", tab.path.replace("?sort=", ""));
        }

        return (
          <Link
            key={tab.id}
            href={`/search?${currentParams.toString()}`} // ← 既存の検索条件を維持
            className={`text-sm px-5 py-3 mx-1 rounded-t-lg w-36 text-center ${
              isActive
                ? "border border-gray-400 bg-white text-gray-700 font-bold border-b-0 mb-[-1px] z-10"
                : "bg-gray-200 text-cyan-600 shadow-sm hover:opacity-75"
            } `}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SearchMenuTabs;
