"use client";
import { Dispatch, SetStateAction } from "react";

interface Option {
  label: string;
  value: string;
}

interface SearchDropdownProps {
  options: Option[];
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
}

const SearchDropdown = ({
  options,
  selectedValue,
  setSelectedValue,
}: SearchDropdownProps) => {
  return (
    <div className="py-3 px-3 flex items-center gap-2">
      <select
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className="text-sm px-4 py-2 border rounded-md"
      >
        {" "}
        <option value="">指定しない</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchDropdown;
