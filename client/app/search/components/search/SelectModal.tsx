"use client";

import { useState } from "react";

interface SelectModalProps {
  title: string;
  options: { name: string }[];
  selectedItems: string[];
  onSave: (selected: string[]) => void;
  onClose: () => void;
}

const SelectModal = ({
  title,
  options,
  selectedItems,
  onSave,
  onClose,
}: SelectModalProps) => {
  const [tempSelection, setTempSelection] = useState<string[]>(selectedItems);

  // チェックボックスの選択・解除
  const handleCheckboxChange = (optionId: string) => {
    setTempSelection((prev) =>
      prev.includes(optionId)
        ? prev.filter((item) => item !== optionId)
        : [...prev, optionId]
    );
  };
  // 「決定」ボタンの処理
  const handleConfirm = () => {
    onSave(tempSelection);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-auto h-auto overflow-y-auto">
        <p className="text-lg font-bold mb-4">{title}</p>
        {/* 🔹 選択肢リスト */}
        <div className="gap-2 grid grid-cols-3">
          {options.map((item) => (
            <label key={item.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={tempSelection.includes(item.name)}
                onChange={() => handleCheckboxChange(item.name)}
              />
              <span className="text-base">{item.name}</span>
            </label>
          ))}
        </div>

        {/* 🔹 決定・閉じるボタン */}
        <div className="mt-4 flex gap-2 justify-center">
          <button
            onClick={onClose}
            className="w-24 px-4 py-2 bg-gray-300 rounded-md"
          >
            閉じる
          </button>
          <button
            onClick={handleConfirm}
            className="w-24 px-4 py-1 bg-cyan-600 text-white rounded-md"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
