import { JSX, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
        console.log(recipe.name);
        if (recipe.tags.length === 0) {
          console.log("No tags");
          return filtered;
        }
        console.log("Some tags");
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

  console.log(allTags);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col grow px-[30px] py-[50px]">
        <ListFilteringControls
          searchInput={searchInput}
          handleSearchChange={setSearchInput}
          filterSelection={filterSelection}
          handleFilterChange={handleFilterChange}
          groupBySelection={null}
          allFilters={allFilters}
        />
        <div className="my-2">
          <div className="w-full py-4 flex border-b-1 border-gray-100">
            <h5 className="w-[40%] text-sm text-gray-500">Title</h5>
            <h5 className="w-[20%] text-sm text-center text-gray-500">Tags</h5>
            <h5 className="w-[20%] text-sm text-center text-gray-500">
              Dish Type
            </h5>
            <h5 className="w-[20%] text-sm text-right text-gray-500">
              Cuisine
            </h5>
          </div>
          {pageRecipes?.map((recipe) => (
            <div
              key={recipe.id}
              className="w-full px-2 py-6 flex border-solid border-b-1 border-gray-100 hover:bg-breaker-bay-100 hover:scale-105 hover:rounded-md hover-shadow"
            >
              <p className="w-[40%]">{recipe.name}</p>
              <div className="w-[20%] flex gap-2">
                {recipe.tags.map(({ name }) => (
                  <TagIcon
                    key={name}
                    name={name.toLowerCase()}
                    width={30}
                    height={30}
                  />
                ))}
              </div>
              <p className="w-[20%] text-center">{recipe.mealType}</p>
              <p className="w-[20%] text-right">{recipe.cuisine}</p>
            </div>
          ))}
        </div>
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
