import { JSX } from "react";

import { Search } from "lucide-react";

import { Input } from "./ui/input";

interface SearchInputProps {
  searchInput: string;
  handleSearchChange: (value: string) => void;
}

export default function SearchInput({
  searchInput,
  handleSearchChange,
}: SearchInputProps): JSX.Element {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search recipes..."
        className="pl-8"
        value={searchInput}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <Search size={20} className="absolute top-1/2 left-2 -translate-y-1/2" />
    </div>
  );
}
