"use client";

import { useState } from "react";

const tabs = [
  { id: "top", label: "TOP" },
  { id: "reviews", label: "口コミ", count: 310 },
];

export default function MenuTabs() {
  const [activeTab, setActiveTab] = useState("top");

  return (
    <>
      {/* タブボタン部分 */}
      <div className="flex max-w-5xl mx-auto bg-gray-100 px-16 ">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm px-5 py-3 mx-1 rounded-t-lg w-36 text-center ${
                isActive
                  ? "border border-gray-400 bg-white text-gray-700 font-bold border-b-0 mb-[-1px] z-10"
                  : "bg-gray-200 text-cyan-600 shadow-sm"
              }`}
            >
              {tab.label} {tab.count ? `(${tab.count}件)` : ""}
            </button>
          );
        })}
      </div>

      {/* コンテンツ表示部分 */}
      <div className="p-4 bg-white border-t border-t-gray-400">
        {activeTab === "top" && <div>TOPのコンテンツ</div>}
        {activeTab === "reviews" && <div>口コミ一覧（310件）</div>}
      </div>
    </>
  );
}
