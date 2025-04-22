"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { handleAuthEvent } from "@/actions/authActions";
import { Gender, AgeGroup } from "@prisma/client";

export default function AuthCompleteCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("認証処理中...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processAuth = async () => {
      const supabase = createClientComponentClient();
      const isRegistration = searchParams.get("registration") === "true";
      const callbackUrl = searchParams.get("callbackUrl") || "/mypage";

      try {
        // セッション確認
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setError(
            "セッション情報が取得できませんでした。再度ログインしてください。"
          );
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        // 新規登録の場合はユーザーテーブルにデータ保存
        if (isRegistration) {
          // ユーザーのメタデータを取得
          const userData = session.user.user_metadata;
          const name = userData.name || userData.full_name || "ユーザー";
          const gender = (userData.gender as Gender) || Gender.OTHER;
          const ageGroup = (userData.ageGroup as AgeGroup) || AgeGroup.TWENTIES;

          // サーバーアクションを直接呼び出す
          const formData = new FormData();
          formData.append("type", "SIGNED_UP");
          formData.append("authId", session.user.id);
          formData.append("name", name);
          formData.append("gender", gender);
          formData.append("ageGroup", ageGroup);

          const result = await handleAuthEvent(formData);

          if (!result.success) {
            console.error("ユーザー情報の保存に失敗:", result.error);
            // ユーザー情報の保存に失敗してもログインは続行
          }

          setMessage("アカウント登録が完了しました。リダイレクトします...");
        } else {
          setMessage("ログインが完了しました。リダイレクトします...");
        }

        // 指定されたURLかマイページへリダイレクト
        setTimeout(() => {
          // callbackUrlが指定されていれば、そこへリダイレクト
          if (callbackUrl && callbackUrl !== "/mypage") {
            router.push(decodeURIComponent(callbackUrl));
          } else {
            router.push("/mypage");
          }
        }, 2000);
      } catch (error) {
        console.error("認証処理エラー:", error);
        setError(
          error instanceof Error
            ? error.message
            : "認証処理中にエラーが発生しました"
        );
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    processAuth();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full py-8 px-6 bg-white rounded-lg shadow-md">
        {error ? (
          <div className="text-center">
            <h1 className="text-xl font-bold text-red-600 mb-4">エラー</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <p className="text-sm text-gray-500">
              ログインページへ移動します...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold text-cyan-600 mb-4">処理中</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="w-12 h-12 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}
