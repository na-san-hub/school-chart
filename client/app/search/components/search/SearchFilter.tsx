"use client";

import { useState } from "react";

interface SearchFilterProps {
  type: "skill" | "profession" | "feature";
  options: { id: string; name: string }[];
  onChange: (selectedId: string[]) => void;
}

const SearchFilter = ({ type, options, onChange }: SearchFilterProps) => {
  const [selectedId, setSelectedId] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    const newSelected = selectedId.includes(id)
      ? selectedId.filter((s) => s !== id)
      : [...selectedId, id];
    setSelectedId(newSelected);
    onChange(newSelected);
  };

  return (
    <div>
      <h3>
        {type === "skill" && "学べるスキル"}
        {type === "profession" && "目指せる職種"}
        {type === "feature" && "こだわり検索"}
      </h3>

      <div>
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`px-3 py-2  border rounded-md ${
              selectedId.includes(option.id) ? "bg-cyan-600" : "bg-gray-100"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
