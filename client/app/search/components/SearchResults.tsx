import SearchResultCard from "@/search/components/SearchResultCard";
import type { School } from "@/types/search";

interface SearchResultsListProps {
  results: School[];
}

const SearchResults = ({ results }: SearchResultsListProps) => {
  return results.length > 0 ? (
    <div className="flex flex-col gap-4">
      {results.map((school) => (
        <SearchResultCard
          key={school.id}
          id={school.id}
          name={school.name}
          logo={school.logo}
          rating={school.rating}
          description={school.description}
        />
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-center">検索結果がありません</p>
  );
};

export default SearchResults;
