"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext/useAuth";

export default function LogoutPage() {
  const router = useRouter();
  const { signOut, user } = useAuth(); // 👈 user も取得
  const [error, setError] = useState<string | null>(null);
  const [hasSignedOut, setHasSignedOut] = useState(false); // サインアウト済みフラグ

  // 初回マウント時に signOut 実行
  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
        setHasSignedOut(true); // サインアウト成功
      } catch (err) {
        setError("ログアウト中にエラーが発生しました");
        console.error("ログアウトエラー:", err);
      }
    };

    performLogout();
  }, [signOut]);

  // サインアウト後、user が null に更新されたら遷移
  useEffect(() => {
    if (hasSignedOut && user === null) {
      router.push("/");
      router.refresh(); // キャッシュクリアと再描画
    }
  }, [hasSignedOut, user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl font-semibold text-gray-700 mb-4">
        ログアウト中...
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
