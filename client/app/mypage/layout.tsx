"use client";

import { useAuth } from "@/context/AuthContext/useAuth";
import MypageSidebar from "./components/MypageSideber";
import Link from "next/link";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 flex justify-center">
        <div className="animate-pulse">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 text-center">
        <h1 className="text-xl font-bold text-gray-700 mb-4">
          ログインが必要です
        </h1>
        <p className="mb-6 text-gray-500">
          マイページを閲覧するにはログインしてください。
        </p>
        <Link
          href="/login?callbackUrl=/mypage"
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:opacity-90 transition"
        >
          ログインする
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl my-5 mx-auto w-full">
      <div className="flex md:flex-row gap-6">
        {/* メインコンテンツエリア */}
        <div className="w-3/4 p-6">{children}</div>

        {/* サイドバー */}
        <div className="w-1/4">
          <MypageSidebar />
        </div>
      </div>
    </div>
  );
}
