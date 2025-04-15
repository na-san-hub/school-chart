"use client";

import { Trash2 } from "lucide-react";
import { removeFavoriteSchool } from "../actions";
import { useRouter } from "next/navigation";

export default function FavoriteDeleteButton({
  schoolId,
}: {
  schoolId: string;
}) {
  const router = useRouter();

  // 削除処理とリロードを行うハンドラ関数
  const handleDelete = async (formData: FormData) => {
    // Server Actionを実行
    await removeFavoriteSchool(formData);
    // ページをリロード
    router.refresh();
  };
  return (
    <form
      action={handleDelete}
      onClick={(e) => e.stopPropagation()}
      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
    >
      <input type="hidden" name="schoolId" value={schoolId} />
      <button
        type="submit"
        className="text-gray-400 hover:text-red-500 transition-colors p-1 bg-white rounded"
        title="お気に入りから削除"
      >
        <Trash2 size={18} />
      </button>
    </form>
  );
}
