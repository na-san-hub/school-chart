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
    <div className="py-3 px-4 flex items-center gap-4">
      <p className="text-base mx-2 font-bold text-gray-700">{label}</p>
      <button
        className="px-6 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
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
