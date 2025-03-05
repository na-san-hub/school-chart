import { searchSchools } from "@/lib/search";
import type { School } from "@/types/search";
import SearchResults from "./components/SearchResults";

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const searchParams = await searchParamsPromise;

  const skills =
    typeof searchParams.skills === "string"
      ? [searchParams.skills]
      : searchParams.skills || [];
  const professions =
    typeof searchParams.professions === "string"
      ? [searchParams.professions]
      : searchParams.professions || [];
  const features =
    typeof searchParams.features === "string"
      ? [searchParams.features]
      : searchParams.features || [];

  const results: School[] = await searchSchools({
    skills,
    professions,
    features,
  });

  return (
    <div className="w-full mx-auto border-t border-t-gray-400">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">検索結果</h1>
      <SearchResults results={results} />
    </div>
  );
}
