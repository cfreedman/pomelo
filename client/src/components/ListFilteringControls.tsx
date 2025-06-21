import { ListFilter, SlidersHorizontal } from "lucide-react";
import SearchInput from "./SearchInput";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

export type FilterField = "cuisine" | "mealType" | "tag";

export type FilterSelection = {
  [K in FilterField]: string[];
};

export type GroupBySelection = "Cuisine" | "Meal Type";

export interface ListFilterControlsProps {
  searchInput: string;
  handleSearchChange: (value: string) => void;
  filterSelection: FilterSelection;
  handleFilterChange: (value: string, field: FilterField) => void;
  groupBySelection: GroupBySelection | null;
  allFilters: FilterSelection;
}

export default function ListFilteringControls({
  searchInput,
  handleSearchChange,
  filterSelection,
  handleFilterChange,
  groupBySelection,
  allFilters,
}: ListFilterControlsProps): JSX.Element {
  return (
    <div className="flex space-between">
      <SearchInput
        searchInput={searchInput}
        handleSearchChange={handleSearchChange}
      />
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge className="brutal-badge w-fit justify-start bg-orange-400">
              <ListFilter size={60} />
              <span>Filter</span>
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Cuisine</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup className="py-2.5">
              <ScrollArea className="h-30">
                {allFilters.cuisine.map((cuisine) => (
                  <DropdownMenuCheckboxItem>{cuisine}</DropdownMenuCheckboxItem>
                ))}
              </ScrollArea>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Meal Type</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup className="py-2.5">
              <ScrollArea className="h-30">
                {allFilters.mealType.map((mealType) => (
                  <DropdownMenuCheckboxItem
                    checked={filterSelection.mealType.includes(mealType)}
                    onCheckedChange={() =>
                      handleFilterChange(mealType, "mealType")
                    }
                  >
                    {mealType}
                  </DropdownMenuCheckboxItem>
                ))}
              </ScrollArea>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Tags</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup className="py-2.5">
              <ScrollArea className="h-30">
                {allFilters.tag.map((tag) => (
                  <DropdownMenuCheckboxItem
                    checked={filterSelection.tag.includes(tag)}
                    onCheckedChange={() => handleFilterChange(tag, "tag")}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </ScrollArea>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Badge className="brutal-badge w-fit justify-start bg-thunderbird-700">
              <SlidersHorizontal size={60} />
              <span>Group By</span>
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem>Cuisine</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Meal Type</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
