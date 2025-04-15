"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext/useAuth";

export default function LogoutPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
        // 少し遅延してからリダイレクト
        setTimeout(() => {
          router.push("/");
          router.refresh(); // 重要: キャッシュをクリアして再読み込み
        }, 500);
      } catch (err) {
        setError("ログアウト中にエラーが発生しました");
        console.error("ログアウトエラー:", err);
      }
    };

    performLogout();
  }, [signOut, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl font-semibold text-gray-700 mb-4">
        ログアウト中...
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
