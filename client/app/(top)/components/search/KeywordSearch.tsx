import { locations } from "@/lib/staticLists";
import { searchKeywordAction } from "@/actions/searchKeywordAction";
const KeywordSearch = () => {
  return (
    <section className="px-8 pb-10">
      <form
        action={searchKeywordAction}
        className="flex items-center gap-4 h-12"
      >
        {/* キーワード入力 */}
        <input
          type="text"
          id="keyword"
          name="keyword"
          placeholder="スクール名・資格などで検索"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 h-full"
        />

        {/* 都道府県選択 */}
        <select
          name="location_prefecture"
          id="prefecture"
          className="text-gray-500 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 h-full"
        >
          <option value="">都道府県を選択</option>
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>

        {/* 検索ボタン */}
        <button
          type="submit"
          className="p-3 bg-cyan-600 text-white rounded-lg shadow-sm hover:opacity-75 transition "
        >
          検索
        </button>
      </form>
    </section>
  );
};

export default KeywordSearch;
