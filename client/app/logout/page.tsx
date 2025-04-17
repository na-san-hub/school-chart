"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext/useAuth";

export default function LogoutPage() {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [maxWaitExceeded, setMaxWaitExceeded] = useState(false);

  // サインアウト処理
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const performLogout = async () => {
      // 既にサインアウト中なら再度実行しない
      if (isSigningOut) return;

      setIsSigningOut(true);

      try {
        await signOut();
        // 最大10秒待機するタイマーを設定
        timeoutId = setTimeout(() => {
          if (mounted) {
            setMaxWaitExceeded(true);
          }
        }, 10000);
      } catch (err) {
        if (mounted) {
          console.error("ログアウトエラー:", err);
          setError("ログアウト中にエラーが発生しました");
          setIsSigningOut(false);
        }
      }
    };

    if (user && !isSigningOut) {
      performLogout();
    }

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, signOut, isSigningOut]);

  // ユーザー状態の監視とリダイレクト
  useEffect(() => {
    if (isSigningOut && user === null) {
      // userがnullになったらリダイレクト
      router.push("/");
      router.refresh();
    } else if (maxWaitExceeded) {
      // 最大待機時間を超えた場合、強制的にリダイレクト
      router.push("/?logout=forced");
      router.refresh();
    }
  }, [user, isSigningOut, maxWaitExceeded, router]);

  // 強制リトライボタン
  const handleForceLogout = () => {
    router.push("/?logout=forced");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <p className="text-xl font-semibold text-gray-700 mb-4">
        ログアウト中...
      </p>
      {error && (
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleForceLogout}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            ホームに戻る
          </button>
        </div>
      )}
      {isSigningOut && !error && (
        <div className="mt-7 flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500 mb-2">
            しばらくたっても画面が変わらない場合
          </p>
          <button
            onClick={handleForceLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            ホームに戻る
          </button>
        </div>
      )}
    </div>
  );
}
