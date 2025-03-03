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
  const sort = searchParams.get("sort");

  return (
    <div className="flex max-w-5xl mx-auto bg-gray-100 px-16">
      {tabs.map((tab) => {
        const isTopTab = (tab.id === "top" && !sort) || sort === "";
        const isSortMatch = sort === tab.path.replace("?sort=", "");

        const isActive = isTopTab || isSortMatch;

        return (
          <Link
            key={tab.id}
            href={`/search${tab.path}`}
            className={`text-sm px-5 py-3 mx-1 rounded-t-lg w-36 text-center ${
              isActive
                ? "border border-gray-400 bg-white text-gray-700 font-bold border-b-0 mb-[-1px] z-10"
                : "bg-gray-200 text-cyan-600 shadow-sm"
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
