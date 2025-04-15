"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { addFavoriteSchool } from "@/mypage/actions";

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
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (isFavorite) return;
    startTransition(async () => {
      await addFavoriteSchool(schoolId);
      setIsFavorite(true);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isFavorite || isPending}
      className={`py-3 px-6 bg-white border border-gray-300 text-sm text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:hover:bg-white disabled:opacity-60 ${className}`}
    >
      <Heart className="w-4 h-4 mr-2 text-gray-600" />
      {isFavorite
        ? "気になる済み"
        : isPending
        ? "登録中..."
        : "気になるに登録する"}
    </button>
  );
}
