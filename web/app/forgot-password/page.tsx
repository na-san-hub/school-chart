"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("メールアドレスを入力してください");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 実際のSupabaseリセットパスワード処理
      // 以下は実装例:
      // const { error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: `${window.location.origin}/auth/reset-password`,
      // });

      // if (error) throw error;

      // デモのため、成功したと仮定
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("パスワードリセットエラー:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "パスワードリセットの処理中にエラーが発生しました"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center flex-grow bg-gray-50 justify-center py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="w-full max-w-md mx-auto p-6 border border-gray-300 bg-white rounded-lg">
          {isSubmitted ? (
            // 送信後の確認画面
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-700 mb-4">
                リセット用メールを送信しました
              </h1>
              <p className="mb-6 text-gray-600">
                {email} 宛にパスワードリセット用のメールを送信しました。
                メールに記載されているリンクをクリックして、パスワードをリセットしてください。
              </p>
              <p className="mb-6 text-gray-500 text-sm">
                メールが届かない場合は、迷惑メールフォルダをご確認いただくか、
                別のメールアドレスでお試しください。
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="text-cyan-600 hover:underline flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  ログインページに戻る
                </Link>
              </div>
            </div>
          ) : (
            // パスワードリセットフォーム
            <>
              <h1 className="text-xl font-bold text-center text-gray-700 mb-2">
                パスワードをお忘れですか？
              </h1>
              <p className="text-center text-sm text-gray-600 mb-6">
                登録時のメールアドレスを入力してください。
                パスワードリセット用のリンクをお送りします。
              </p>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="example@example.com"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-cyan-600 hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "送信中..." : "リセットリンクを送信"}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-cyan-600 hover:underline">
                  ログインページに戻る
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
