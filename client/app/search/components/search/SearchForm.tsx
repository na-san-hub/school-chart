"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import SelectModal from "./SelectModal";
import SearchFilter from "./SearchFilter";
import SearchKeyword from "./SearchKeyword";
import SearchDropdown from "./SearchDropdown";

interface SearchOptionProps {
  skills: { name: string }[];
  professions: { name: string }[];
  features: { name: string }[];
  locations: { name: string }[]; // 複数選択可能なロケーション
  // ドロップダウン用の選択肢は配列として渡すこともできます
  deliveryMethods: { label: string; value: string }[];
  priceRanges: { label: string; value: string }[];
}

const SearchForm = ({
  skills,
  professions,
  features,
  locations,
  deliveryMethods,
  priceRanges,
}: SearchOptionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLから初期値を取得
  const initialSelectProfessions = searchParams.getAll("professions");
  const initialSelectFeatures = searchParams.getAll("features");
  const initialKeyword = searchParams.get("keyword") || "";
  const initialSelectLocations = searchParams.getAll("location_prefecture");

  //検索条件用
  const [selectSkills, setSelectSkills] = useState<string[]>([]);
  const [selectProfessions, setSelectProfessions] = useState<string[]>(
    initialSelectProfessions
  );
  const [selectFeatures, setSelectFeatures] = useState<string[]>(
    initialSelectFeatures
  );
  const [selectLocations, setSelectLocations] = useState<string[]>(
    initialSelectLocations
  );
  const [keyword, setKeyword] = useState<string>(initialKeyword);
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");

  //フォーム折り畳み用
  const [isExpanded, setIsExpanded] = useState(false);
  // モーダルを開くための状態
  const [modalType, setModalType] = useState<
    "skills" | "professions" | "features" | "locations" | null
  >(null);

  // 検索ボタンの処理：各値を URLSearchParams にセットして /search に遷移
  const handleSearch = () => {
    const params = new URLSearchParams();
    selectSkills.forEach((skill) => params.append("skills", skill));
    selectProfessions.forEach((profession) =>
      params.append("professions", profession)
    );
    selectFeatures.forEach((feature) => params.append("features", feature));
    selectLocations.forEach((location) =>
      params.append("location_prefecture", location)
    );

    if (keyword) params.append("keyword", keyword);
    if (deliveryMethod) params.append("delivery_method", deliveryMethod);
    if (priceMin) params.append("price_min", priceMin);
    if (priceMax) params.append("price_max", priceMax);

    router.push(`/search?${params.toString()}`);
  };

  // モーダルで選択された値を保存
  const handleSelectionSave = (selected: string[]) => {
    if (modalType === "skills") setSelectSkills(selected);
    else if (modalType === "professions") setSelectProfessions(selected);
    else if (modalType === "features") setSelectFeatures(selected);
    else if (modalType === "locations") setSelectLocations(selected);
    setModalType(null);
  };

  // フィルターの定義
  const filterOptions = [
    { key: "skills", label: "学べるスキル", selectedItems: selectSkills },
    {
      key: "professions",
      label: "目指せる職種",
      selectedItems: selectProfessions,
    },
    { key: "features", label: "こだわり条件", selectedItems: selectFeatures },
  ] as const;

  const handleClear = () => {
    setSelectSkills([]);
    setSelectProfessions([]);
    setSelectFeatures([]);
    setSelectLocations([]);
    setKeyword("");
    setDeliveryMethod("");
    setPriceMin("");
    setPriceMax("");
  };

  return (
    <section className="w-full max-w-4xl mx-auto text-center py-10">
      <div className="border border-gray-300 bg-white rounded-md overflow-hidden">
        {/* フリーワード検索 */}
        <SearchKeyword keyword={keyword} setKeyword={setKeyword} />
        {/* エリア検索・受講形式*/}
        <div className="flex items-center gap-2 px-4">
          <label className="text-base font-bold mx-2 min-w-[90px] text-gray-700">
            受講形式
          </label>
          <SearchDropdown
            options={deliveryMethods}
            selectedValue={deliveryMethod}
            setSelectedValue={setDeliveryMethod}
          />
          <SearchFilter
            key={"locations"}
            label={"エリア"}
            selectedItems={selectLocations}
            onOpenModal={() => setModalType("locations")}
          />
        </div>
        {/* 🔹 折りたたみ可能な部分 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-sm py-2 my-2 bg-gray-100 text-gray-700 font-bold"
        >
          {isExpanded ? "▲ 一部の条件を隠す" : "▼ さらに条件を表示"}
        </button>
        <div className={`${isExpanded ? "block" : "hidden"}`}>
          {/* 複数選択フィルタ */}
          {filterOptions.map(({ key, label, selectedItems }) => (
            <SearchFilter
              key={key}
              label={label}
              selectedItems={selectedItems}
              onOpenModal={() => setModalType(key)}
            />
          ))}
          {/* 最低価格、最高価格 */}
          <div className="flex items-center gap-2 px-4">
            <label className="text-base text-gray-700 font-bold mx-2 min-w-[90px] ">
              受講料金
            </label>
            <SearchDropdown
              options={priceRanges}
              selectedValue={priceMin}
              setSelectedValue={setPriceMin}
            />
            ～
            <SearchDropdown
              options={priceRanges}
              selectedValue={priceMax}
              setSelectedValue={setPriceMax}
            />
            円
          </div>
          {/* クリアボタン */}
          <button
            onClick={handleClear}
            className="text-sm py-2 text-gray-700 font-bold"
          >
            条件をクリア
          </button>
        </div>

        {/* 検索ボタン */}
        <button
          onClick={handleSearch}
          className="px-6 py-3 mb-5 mt-3 bg-cyan-600 text-white rounded-md font-bold"
        >
          この条件で検索する
        </button>
      </div>

      {modalType && (
        <SelectModal
          title={
            modalType === "skills"
              ? "学べるスキルを選択"
              : modalType === "professions"
              ? "目指せる職種を選択"
              : modalType === "features"
              ? "こだわり条件を選択"
              : "エリアを選択"
          }
          options={
            modalType === "skills"
              ? skills
              : modalType === "professions"
              ? professions
              : modalType === "features"
              ? features
              : locations
          }
          selectedItems={
            modalType === "skills"
              ? selectSkills
              : modalType === "professions"
              ? selectProfessions
              : modalType === "features"
              ? selectFeatures
              : selectLocations
          }
          onSave={handleSelectionSave}
          onClose={() => setModalType(null)}
        />
      )}
    </section>
  );
};

export default SearchForm;
