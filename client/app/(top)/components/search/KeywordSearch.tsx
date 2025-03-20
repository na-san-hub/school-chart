"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/lib/staticLists";
import Link from "next/link";

const KeywordSearch = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ

    // クライアント側で入力値をチェック
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword && !location) {
      alert("キーワードまたは都道府県を入力してください");
      return;
    }

    // クエリパラメータを作成
    const params = new URLSearchParams();
    if (trimmedKeyword) params.append("keyword", trimmedKeyword);
    if (location) params.append("location_prefecture", location);

    // クライアントサイドでページ遷移
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="px-8">
      <form onSubmit={handleSearch} className="flex items-center gap-4 h-12">
        {/* キーワード入力 */}
        <input
          type="text"
          id="keyword"
          name="keyword"
          placeholder="スクール名・資格などで検索"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 h-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* 都道府県選択 */}
        <select
          name="location_prefecture"
          id="prefecture"
          className="text-gray-500 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 h-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">都道府県を選択</option>
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>

        {/* 検索ボタン */}
        <button
          type="submit"
          className="p-3 bg-cyan-600 text-white rounded-lg shadow-sm hover:opacity-75 transition"
        >
          検索
        </button>
      </form>
      <div className="mt-3 mb-5">
        <Link href="/search">
          <button className="text-base py-2 px-5 text-gray-700 hover:opacity-75">
            ▼ 詳しい条件を設定する
          </button>
        </Link>
      </div>
    </section>
  );
};

export default KeywordSearch;
