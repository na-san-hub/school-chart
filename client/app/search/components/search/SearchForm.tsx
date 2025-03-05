"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectModal from "./SelectModal";
import SearchFilter from "./SearchFilter";

interface SearchOptionProps {
  skills: { name: string }[];
  professions: { name: string }[];
  features: { name: string }[];
}

const SearchForm = ({ skills, professions, features }: SearchOptionProps) => {
  const router = useRouter();

  const [selectSkills, setSelectSkills] = useState<string[]>([]);
  const [selectProfessions, setSelectProfessions] = useState<string[]>([]);
  const [selectFeatures, setSelectFeatures] = useState<string[]>([]);
  const [modalType, setModalType] = useState<
    "skills" | "professions" | "features" | null
  >(null);

  // 検索条件を URL に反映して /search ページに遷移
  const handleSearch = () => {
    const params = new URLSearchParams();
    selectSkills.forEach((skill) => params.append("skills", skill));
    selectProfessions.forEach((profession) =>
      params.append("professions", profession)
    );
    selectFeatures.forEach((feature) => params.append("features", feature));

    router.push(`/search?${params.toString()}`);
  };

  // モーダルで選択された値を保存
  const handleSelectionSave = (selected: string[]) => {
    if (modalType === "skills") {
      setSelectSkills(selected);
    } else if (modalType === "professions") {
      setSelectProfessions(selected);
    } else if (modalType === "features") {
      setSelectFeatures(selected);
    }
    setModalType(null);
  };

  // 各フィルターの設定を配列で管理し、map() で動的にレンダリング
  const filterOptions = [
    { key: "skills", label: "学べるスキル", selectedItems: selectSkills },
    {
      key: "professions",
      label: "目指せる職種",
      selectedItems: selectProfessions,
    },
    { key: "features", label: "こだわり条件", selectedItems: selectFeatures },
  ] as const;

  return (
    <section className="w-full max-w-4xl mx-auto text-center py-12">
      <div className="border border-gray-300 bg-white rounded-lg overflow-hidden">
        {filterOptions.map(({ key, label, selectedItems }) => (
          <SearchFilter
            key={key}
            label={label}
            selectedItems={selectedItems}
            onOpenModal={() => setModalType(key)}
          />
        ))}

        <div className="p-4">
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-cyan-600 text-white rounded-md font-bold"
          >
            検索
          </button>
        </div>
      </div>

      {modalType && (
        <SelectModal
          title={
            modalType === "skills"
              ? "学べるスキルを選択"
              : modalType === "professions"
              ? "目指せる職種を選択"
              : "こだわり条件を選択"
          }
          options={
            modalType === "skills"
              ? skills
              : modalType === "professions"
              ? professions
              : features
          }
          selectedItems={
            modalType === "skills"
              ? selectSkills
              : modalType === "professions"
              ? selectProfessions
              : selectFeatures
          }
          onSave={handleSelectionSave}
          onClose={() => setModalType(null)}
        />
      )}
    </section>
  );
};

export default SearchForm;
