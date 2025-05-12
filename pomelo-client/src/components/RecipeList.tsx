import { JSX, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import TagIcon from "./TagIcon";
import { Recipe, fetchAllRecipes } from "@/lib/recipes";
import { DUMMY_RECIPES } from "@/dummy/recipes";

export default function RecipeList(): JSX.Element {
  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryFn: fetchAllRecipes,
    queryKey: ["allRecipes"],
    placeholderData: DUMMY_RECIPES,
    initialData: DUMMY_RECIPES,
  });
  const [filterOpen, setFilterOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const cuisines = Array.from(
    new Set(recipes?.map((recipe) => recipe.cuisine))
  );
  const mealTypes = Array.from(
    new Set(
      recipes?.reduce((filtered: string[], recipe: Recipe) => {
        if (recipe.mealType) {
          filtered.push(recipe.mealType);
        }
        return filtered;
      }, [])
    )
  );

  return (
    <div className="flex flex-col grow px-[30px] py-[50px]">
      <h1>Recipes</h1>
      <Button className="w-[80px] " onClick={() => setFilterOpen(!filterOpen)}>
        Filters
      </Button>
      {filterOpen && (
        <div className="flex my-2 p-2 bg-gray-100 rounded-sm">
          <div className="flex flex-row flex-wrap mx-2">
            {cuisines.map((cuisine) => (
              <Button className="mx-1" key={cuisine}>
                {cuisine}
              </Button>
            ))}
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cuisine</SelectLabel>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value="cuisine">
                    {cuisine}
                  </SelectItem>
                ))}
                <SelectLabel>Meal Type</SelectLabel>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
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
          {recipes?.map((recipe) => (
            <TableRow
              key={recipe.name}
              className="hover:bg-breaker-bay-200 even:bg-breaker-bay-100 border-none"
            >
              <TableCell className="text-left text-lg py-5">
                {recipe.name}
              </TableCell>
              <TableCell className="text-left text-lg py-5 flex gap-1">
                {recipe.tags.map(({ name }) => (
                  <TagIcon key={name} name={name} width={20} height={20} />
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
    </div>
  );
}
