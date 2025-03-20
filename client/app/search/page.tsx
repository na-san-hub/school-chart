import { searchSchools } from "@/lib/search";
import type { SchoolCoverData } from "@/types/school";
import SearchResults from "./components/SearchResults";
import SearchLoading from "./components/SearchLoading";
import { Suspense } from "react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  return (
    <Suspense fallback={<SearchLoading />}>
      <PageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PageContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;

  const getArrayParam = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param : param ? [param] : [];

  const getStringParam = (param: string | string[] | undefined) =>
    typeof param === "string" ? param : "";

  // 検索条件
  const skills = getArrayParam(params.skills);
  const professions = getArrayParam(params.professions);
  const features = getArrayParam(params.features);
  const location_prefectures = getArrayParam(params.location_prefecture);
  const delivery_method = getStringParam(params.delivery_method);
  const price_min = getStringParam(params.price_min);
  const price_max = getStringParam(params.price_max);
  const keyword = getStringParam(params.keyword);
  const sort = getStringParam(params.sort);

  // サーバー側で検索 & ソート実行
  const results: SchoolCoverData[] = await searchSchools({
    skills,
    professions,
    features,
    location_prefectures,
    delivery_method,
    price_min,
    price_max,
    keyword,
    sort,
  });

  return (
    <div className="w-full mx-auto border-t border-t-gray-400">
      <SearchResults results={results} />
    </div>
  );
}
