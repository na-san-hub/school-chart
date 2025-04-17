import SearchResultCard from "@/search/components/SearchResultCard";
import { SchoolCoverData } from "@/types/school";

interface SearchResultsListProps {
  results: SchoolCoverData[];
  totalCount: number;
}

const SearchResults = ({ results, totalCount }: SearchResultsListProps) => {
  return results.length > 0 ? (
    <>
      <h1 className="max-w-4xl mx-auto text-lg text-gray-700 mb-4 mt-6 flex items-center">
        該当スクール：
        <p className="font-bold text-2xl mx-1">{totalCount}</p>件
      </h1>
      <div className="flex flex-col gap-7">
        {results.map((school) => (
          <SearchResultCard key={school.id} school={school} />
        ))}
      </div>
    </>
  ) : (
    <p className="text-gray-500 text-lg text-center my-5">
      検索結果がありません
    </p>
  );
};

export default SearchResults;
