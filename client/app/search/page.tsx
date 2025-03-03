import SearchResults from "./components/SearchResults";

export default function SearchPage() {
  return (
    <div className="w-full  mx-auto border-t border-t-gray-400">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 ">検索結果</h1>
      <SearchResults />
    </div>
  );
}
