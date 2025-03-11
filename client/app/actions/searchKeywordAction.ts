"use server";
import { redirect } from "next/navigation";

export async function searchKeywordAction(formData: FormData) {
  // フォームデータから入力値を取得
  const keyword = formData.get("keyword")?.toString().trim() || "";
  const locationPrefecture =
    formData.get("location_prefecture")?.toString() || "";

  // 必要ならここで検証や加工処理を実施
  // 例: keyword が空の場合はエラーメッセージを返す（リダイレクトせずに処理を中断する等）

  // クエリパラメータの組み立て
  const params = new URLSearchParams();
  if (keyword) params.append("keyword", keyword);
  if (locationPrefecture)
    params.append("location_prefecture", locationPrefecture);

  // 検索結果ページへリダイレクト
  redirect(`/search?${params.toString()}`);
}
