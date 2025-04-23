"use client";
import { Dispatch, SetStateAction } from "react";

interface SearchKeywordProps {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

const SearchKeyword = ({ keyword, setKeyword }: SearchKeywordProps) => {
  return (
    <div className="py-3 px-4 pt-5 flex items-center gap-4">
      <p className="text-base text-gray-700 font-bold mx-2">フリーワード</p>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="text-sm px-4 py-2 border rounded-md w-3/4"
        placeholder="スクール名や説明を入力"
      />
    </div>
  );
};

export default SearchKeyword;
