"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { id: "top", label: "TOP", path: "" },
  { id: "reviews", label: "口コミ", path: "/reviews" },
  { id: "course", label: "コース一覧", path: "/course" },
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
        const isActive = pathname === `/schools/${schoolID}${tab.path}`;
        return (
          <Link
            key={tab.id}
            href={`/schools/${schoolID}${tab.path}`}
            className={`text-sm px-5 py-3 mx-1 rounded-t-lg w-36 text-center ${
              isActive
                ? "border border-gray-400 bg-white text-gray-700 font-bold border-b-0 mb-[-1px] z-10"
                : "bg-gray-200 text-cyan-600 shadow-sm"
            }`}
          >
            {tab.label} {tab.id === "reviews" ? `(${reviewsCount}件)` : ""}
          </Link>
        );
      })}
    </div>
  );
}
