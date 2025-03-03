"use client";

import { useState } from "react";

interface SelectModalProps {
  title: string;
  options: { id: string; name: string }[];
  selected: string[];
  onClose: () => void;
  onSave: (selected: string[]) => void;
}

const SelectModal = ({
  title,
  options,
  selected,
  onClose,
  onSave,
}: SelectModalProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selected);

  // ✅ 選択を切り替える
  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <div className="max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label key={option.id} className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={selectedItems.includes(option.id)}
                onChange={() => toggleSelection(option.id)}
              />
              {option.name}
            </label>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="px-4 py-2 bg-cyan-600 text-white rounded-md"
            onClick={() => onSave(selectedItems)}
          >
            設定する
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
