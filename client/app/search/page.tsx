import { searchSchools } from "@/lib/search";
import type { School } from "@/types/search";
import SearchResults from "./components/SearchResults";

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const searchParams = await searchParamsPromise;

  // クエリパラメータを配列に統一
  const skills = Array.isArray(searchParams.skills)
    ? searchParams.skills
    : searchParams.skills
    ? [searchParams.skills]
    : [];
  const professions = Array.isArray(searchParams.professions)
    ? searchParams.professions
    : searchParams.professions
    ? [searchParams.professions]
    : [];
  const features = Array.isArray(searchParams.features)
    ? searchParams.features
    : searchParams.features
    ? [searchParams.features]
    : [];

  // 新たな検索条件の取得
  const location_prefectures = Array.isArray(searchParams.location_prefecture)
    ? searchParams.location_prefecture
    : searchParams.location_prefecture
    ? [searchParams.location_prefecture]
    : [];
  const delivery_method =
    typeof searchParams.delivery_method === "string"
      ? searchParams.delivery_method
      : "";
  const price_min =
    typeof searchParams.price_min === "string" ? searchParams.price_min : "";
  const price_max =
    typeof searchParams.price_max === "string" ? searchParams.price_max : "";
  const keyword =
    typeof searchParams.keyword === "string" ? searchParams.keyword : "";

  // サーバー側で検索実行
  const results: School[] = await searchSchools({
    skills,
    professions,
    features,
    location_prefectures,
    delivery_method,
    price_min,
    price_max,
    keyword,
  });

  return (
    <div className="w-full mx-auto border-t border-t-gray-400">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">検索結果</h1>
      <SearchResults results={results} />
    </div>
  );
}
