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
import { Recipe, fetchAllRecipes } from "@/lib/recipes";

export default function RecipeList(): JSX.Element {
  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryFn: fetchAllRecipes,
    queryKey: ["allRecipes"],
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
    <div className="flex flex-col grow bg-red-50 px-[30px] py-[50px]">
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
      <Table className="my-2">
        <TableHeader>
          <TableRow>
            <TableCell className="text-left">Title</TableCell>
            <TableCell className="text-left">Tags</TableCell>
            <TableCell className="text-left">Dish Type</TableCell>
            <TableCell className="text-right">Cuisine</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes?.map((recipe) => (
            <TableRow key={recipe.name}>
              <TableCell className="text-left">{recipe.name}</TableCell>
              <TableCell className="text-left">
                {recipe.tags.map(({ name }) => name).join(", ")}
              </TableCell>
              <TableCell className="text-left">{recipe.mealType}</TableCell>
              <TableCell className="text-right">{recipe.cuisine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
