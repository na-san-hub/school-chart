"use client";

import { useAuth } from "@/context/AuthContext/useAuth";

export default function MypageTop() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) return <div>読み込み中...</div>;
  if (!user) return <div>ログインが必要です</div>;

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        ようこそ、{user.email?.split("@")[0]}さん
      </h2>
      <p className="text-gray-600 mb-6">
        こちらからお気に入りや投稿した口コミを確認できます。
      </p>

      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        ログアウト
      </button>
    </div>
  );
}
