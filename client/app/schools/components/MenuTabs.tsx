"use client";

import { useState } from "react";

const tabs = [
  { id: "top", label: "TOP" },
  { id: "reviews", label: "社員クチコミ", count: 310 },
];

export default function MenuTabs() {
  const [activeTab, setActiveTab] = useState("top");

  return (
    <>
      {/* タブボタン部分 */}
      <div className="flex bg-gray-100 px-16">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 border border-gray-300 ${
                isActive
                  ? "bg-white font-bold border-b-0 mb-[-1px] z-10"
                  : "bg-cyan-50"
              }`}
            >
              {tab.label} {tab.count ? `（${tab.count}件）` : ""}
            </button>
          );
        })}
      </div>

      {/* コンテンツ表示部分 */}
      <div className="p-4 bg-white border border-gray-300">
        {activeTab === "top" && <div>TOPのコンテンツ</div>}
        {activeTab === "reviews" && <div>社員クチコミ一覧（310件）</div>}
      </div>
    </>
  );
}
