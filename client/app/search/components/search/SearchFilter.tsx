"use client";
interface SearchFilterProps {
  label: string;
  selectedItems: string[];
  onOpenModal: () => void;
}

const SearchFilter = ({
  label,
  selectedItems,
  onOpenModal,
}: SearchFilterProps) => {
  return (
    <div className="p-4 flex items-center gap-4">
      <p className="text-sm font-bold">{label}</p>
      <button
        className="px-6 py-2 text-sm bg-gray-200 rounded-md"
        onClick={onOpenModal}
      >
        選択する
      </button>
      <p className="text-sm text-gray-600">
        {selectedItems.length > 0 ? selectedItems.join(", ") : "未選択"}
      </p>
    </div>
  );
};

export default SearchFilter;
