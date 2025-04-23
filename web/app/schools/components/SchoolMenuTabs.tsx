"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "top", label: "TOP", path: "" },
  { id: "reviews", label: "口コミ", path: "/reviews" },
  { id: "course", label: "コース一覧", path: "/courses" },
];

export default function SchoolMenuTabs({
  schoolID,
  reviewsCount,
}: {
  schoolID: string;
  reviewsCount: number;
}) {
  const pathname = usePathname();

  return (
    <div className="flex max-w-5xl mx-auto bg-gray-100 px-16 ">
      {tabs.map((tab) => {
        let isActive = pathname === `/schools/${schoolID}${tab.path}`;

        // コース詳細ページの場合はコース一覧タブをアクティブにする
        if (
          tab.id === "course" &&
          pathname.startsWith(`/schools/${schoolID}/courses/`)
        ) {
          isActive = true;
        }

        // レビュー投稿ページの場合は口コミタブをアクティブにする
        if (
          tab.id === "reviews" &&
          (pathname.startsWith(`/schools/${schoolID}/reviews/`) ||
            pathname === `/schools/${schoolID}/reviews/new`)
        ) {
          isActive = true;
        }

        return (
          <Link
            key={tab.id}
            href={`/schools/${schoolID}${tab.path}`}
            className={`text-sm px-5 py-3 mx-1 rounded-t-lg w-36 text-center ${
              isActive
                ? "border border-gray-400 bg-white text-gray-700 font-bold border-b-0 mb-[-1px] z-10"
                : "bg-gray-200 text-cyan-600 shadow-sm hover:opacity-75"
            }`}
          >
            {tab.label} {tab.id === "reviews" ? `(${reviewsCount}件)` : ""}
          </Link>
        );
      })}
    </div>
  );
}
