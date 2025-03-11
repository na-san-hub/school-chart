import { searchSchools } from "@/lib/search";
import type { School } from "@/types/search";
import SearchResults from "./components/SearchResults";

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const searchParams = await searchParamsPromise;

  // クエリパラメータを配列にして取得
  const getArrayParam = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param : param ? [param] : [];

  const getStringParam = (param: string | string[] | undefined) =>
    typeof param === "string" ? param : "";

  // 検索条件
  const skills = getArrayParam(searchParams.skills);
  const professions = getArrayParam(searchParams.professions);
  const features = getArrayParam(searchParams.features);
  const location_prefectures = getArrayParam(searchParams.location_prefecture);
  const delivery_method = getStringParam(searchParams.delivery_method);
  const price_min = getStringParam(searchParams.price_min);
  const price_max = getStringParam(searchParams.price_max);
  const keyword = getStringParam(searchParams.keyword);

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
