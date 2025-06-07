import { JSX, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import TagIcon from "./TagIcon";
import {
  Recipe,
  fetchAllRecipes,
  hasCuisine,
  hasMealType,
} from "@/lib/recipes";
import { DUMMY_RECIPES } from "@/dummy/recipes";
import ListFilteringControls, {
  FilterField,
  FilterSelection,
} from "./ListFilteringControls";
import PaginationControls from "./PaginationControls";

export default function RecipeList(): JSX.Element {
  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryFn: fetchAllRecipes,
    queryKey: ["allRecipes"],
    placeholderData: DUMMY_RECIPES,
    initialData: DUMMY_RECIPES,
  });
  const [searchInput, setSearchInput] = useState("");
  const [filterSelection, setFilterSelection] = useState<FilterSelection>({
    cuisine: [],
    mealType: [],
    tag: [],
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (value: string, field: FilterField) => {
    const updatedFilterSelection = {
      ...filterSelection,
      [field]: [],
    };

    if (filterSelection[field].includes(value)) {
      const updatedField = filterSelection[field].filter(
        (item) => item !== value
      );
      updatedFilterSelection[field] = updatedField;
    } else {
      const updatedField = [...filterSelection[field]];
      updatedField.push(value);
      updatedFilterSelection[field] = updatedField;
    }

    setFilterSelection(updatedFilterSelection);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allCuisines = Array.from(
    new Set(recipes?.filter(hasCuisine).map((recipe) => recipe.cuisine))
  );
  const allMealTypes = Array.from(
    new Set(recipes?.filter(hasMealType).map((recipe) => recipe.mealType))
  );
  const allTags = Array.from(
    new Set(
      recipes?.reduce((filtered: string[], recipe: Recipe) => {
        if (recipe.tags.length === 0) {
          return filtered;
        }
        const updated = filtered.concat(recipe.tags.map((tag) => tag.name));

        return updated;
      }, [])
    )
  );

  console.log("tags");
  console.log(allTags);

  const allFilters = {
    cuisine: allCuisines,
    mealType: allMealTypes,
    tag: allTags,
  };

  const pageRecipes = recipes.slice(
    (currentPage - 1) * itemsPerPage,
    Math.min(currentPage * itemsPerPage, recipes.length)
  );

  const totalPages = Math.round(recipes.length / itemsPerPage);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col grow px-[30px] py-[50px]">
        <h1>Recipes</h1>
        <ListFilteringControls
          searchInput={searchInput}
          handleSearchChange={setSearchInput}
          filterSelection={filterSelection}
          handleFilterChange={handleFilterChange}
          groupBySelection={null}
          allFilters={allFilters}
        />
        <Table className="my-2 px-3">
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableCell className="text-left font-bold text-xl text-breaker-bay-600">
                Title
              </TableCell>
              <TableCell className="text-left font-bold text-xl text-breaker-bay-600">
                Tags
              </TableCell>
              <TableCell className="text-left font-bold text-xl text-breaker-bay-600">
                Dish Type
              </TableCell>
              <TableCell className="text-right font-bold text-xl text-breaker-bay-600">
                Cuisine
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRecipes?.map((recipe) => (
              <TableRow
                key={recipe.name}
                className="hover:bg-breaker-bay-200 even:bg-breaker-bay-100 border-none"
              >
                <TableCell className="text-left text-lg py-5">
                  {recipe.name}
                </TableCell>
                <TableCell className="text-left text-lg py-5 flex gap-1">
                  {recipe.tags.map(({ name }) => (
                    <TagIcon
                      key={name}
                      name={name.toLowerCase()}
                      width={30}
                      height={30}
                    />
                  ))}
                </TableCell>
                <TableCell className="text-left text-lg py-5">
                  {recipe.mealType}
                </TableCell>
                <TableCell className="text-right text-lg py-5">
                  {recipe.cuisine}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
          handleItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
}
