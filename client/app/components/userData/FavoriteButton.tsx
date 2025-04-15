"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { addFavoriteSchool } from "@/actions/userPage";

export default function FavoriteButton({
  schoolId,
  isInitiallyFavorite,
  className = "",
}: {
  schoolId: string;
  isInitiallyFavorite: boolean;
  className?: string;
}) {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // フォーム送信ハンドラ（Server Actionを呼び出す）
  const handleAddFavorite = async (formData: FormData) => {
    setIsPending(true);
    try {
      // Server Actionを呼び出す
      await addFavoriteSchool(formData.get("schoolId") as string);
      // 状態を更新
      setIsFavorite(true);
      // UIを更新（必要に応じて）
      router.refresh();
    } catch (error) {
      console.error("お気に入り追加エラー:", error);
    } finally {
      setIsPending(false);
    }
  };

  // すでにお気に入り済みか登録中の場合はボタンを無効化
  const isDisabled = isFavorite || isPending;

  return (
    <form action={handleAddFavorite}>
      <input type="hidden" name="schoolId" value={schoolId} />
      <button
        type="submit"
        disabled={isDisabled}
        className={`py-3 px-6 bg-white border border-gray-300 text-sm text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:hover:bg-white disabled:opacity-60 ${className}`}
      >
        <Heart
          className={`w-4 h-4 mr-2 ${
            isFavorite ? "text-gray-500 fill-gray-500" : "text-gray-600"
          }`}
        />
        {isFavorite
          ? "気になる済み"
          : isPending
          ? "登録中..."
          : "気になるに登録する"}
      </button>
    </form>
  );
}
