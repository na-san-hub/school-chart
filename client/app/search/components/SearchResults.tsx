"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchSchools } from "@/actions/search";
import SearchResultCard from "@/search/components/SearchResultCard";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const skills = searchParams.getAll("skills");
      const professions = searchParams.getAll("professions");
      const features = searchParams.getAll("features");

      const data = await searchSchools({ skills, professions, features });
      setResults(data);
    };

    fetchData();
  }, [searchParams]); // 🔍 クエリパラメータが変わるたびに再検索

  return (
    <div>
      {results.length > 0 ? (
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
      )}
    </div>
  );
};

export default SearchResults;
