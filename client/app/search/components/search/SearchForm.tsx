"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SelectModal from "./SelectModal";

interface SearchOptionProps {
  skills: { id: string; name: string }[];
  professions: { id: string; name: string }[];
  features: { id: string; name: string }[];
}

const SearchForm = ({ skills, professions, features }: SearchOptionProps) => {
  const router = useRouter();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [modalType, setModalType] = useState<
    "skill" | "profession" | "feature" | null
  >(null);

  // 検索ボタン押下時にクエリパラメータを更新
  const handleSearch = () => {
    const params = new URLSearchParams();

    selectedSkills.forEach((skill) => params.append("skills", skill));
    selectedProfessions.forEach((profession) =>
      params.append("professions", profession)
    );
    selectedFeatures.forEach((feature) => params.append("features", feature));

    router.push(`/search?${params.toString()}`); // 検索結果ページに遷移
  };

  const getNamesByIds = (
    ids: string[],
    options: { id: string; name: string }[]
  ) => {
    return options
      .filter((option) => ids.includes(option.id))
      .map((option) => option.name)
      .join(", ");
  };

  const filters = [
    {
      key: "skill",
      label: "学べるスキル",
      selected: selectedSkills,
      setSelected: setSelectedSkills,
      options: skills,
    },
    {
      key: "profession",
      label: "目指せる職種",
      selected: selectedProfessions,
      setSelected: setSelectedProfessions,
      options: professions,
    },
    {
      key: "feature",
      label: "こだわり条件",
      selected: selectedFeatures,
      setSelected: setSelectedFeatures,
      options: features,
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto text-center py-12">
      <div className="border border-gray-300 bg-white rounded-lg backdrop-blur-sm overflow-hidden">
        {/* 🔹 各選択ボタン */}
        <div className="p-4 flex flex-col gap-4">
          {filters.map(({ key, label, selected, setSelected, options }) => (
            <div key={key} className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold">{label}</p>
                <button
                  className="px-6 py-2 text-sm bg-gray-200 rounded-md"
                  onClick={() =>
                    setModalType(key as "skill" | "profession" | "feature")
                  }
                >
                  選択する
                </button>

                {selected.length > 0 && (
                  <p className="text-sm">{getNamesByIds(selected, options)}</p>
                )}
              </div>{" "}
            </div>
          ))}
        </div>

        {/* 🔍 検索ボタン */}
        <div className="p-4">
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-cyan-600 text-white rounded-md font-bold"
          >
            検索
          </button>
        </div>
      </div>

      {/* 🔹 モーダルの表示 */}
      {modalType &&
        (() => {
          const filter = filters.find((f) => f.key === modalType);
          if (!filter) return null;
          return (
            <SelectModal
              title={`${filter.label} を選択`}
              options={filter.options}
              selected={filter.selected}
              onClose={() => setModalType(null)}
              onSave={(items) => {
                filter.setSelected(items);
                setModalType(null);
              }}
            />
          );
        })()}
    </section>
  );
};

export default SearchForm;
