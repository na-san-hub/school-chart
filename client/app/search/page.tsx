export const dynamic = "force-dynamic";

import { searchSchools } from "@/lib/search";
import type { SchoolCoverData } from "@/types/school";
import SearchResults from "./components/SearchResults";
import Pagination from "./components/Pagination";

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const searchParams = await searchParamsPromise;

  const getArrayParam = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param : param ? [param] : [];

  const getStringParam = (param: string | string[] | undefined) =>
    typeof param === "string" ? param : "";

  const page = parseInt(
    typeof searchParams.page === "string" ? searchParams.page : "1"
  );

  // 検索条件
  const skills = getArrayParam(searchParams.skills);
  const professions = getArrayParam(searchParams.professions);
  const features = getArrayParam(searchParams.features);
  const location_prefectures = getArrayParam(searchParams.location_prefecture);
  const delivery_method = getStringParam(searchParams.delivery_method);
  const price_min = getStringParam(searchParams.price_min);
  const price_max = getStringParam(searchParams.price_max);
  const keyword = getStringParam(searchParams.keyword);
  const sort = getStringParam(searchParams.sort);

  // サーバー側で検索 & ソート実行
  const {
    schools,
    totalCount,
  }: { schools: SchoolCoverData[]; totalCount: number } = await searchSchools({
    skills,
    professions,
    features,
    location_prefectures,
    delivery_method,
    price_min,
    price_max,
    keyword,
    sort,
    page,
  });

  const totalPages = Math.ceil(totalCount / 15);

  return (
    <div className="w-full mx-auto border-t border-t-gray-400">
      <SearchResults results={schools} totalCount={totalCount} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
