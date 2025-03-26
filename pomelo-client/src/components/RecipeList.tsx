import { JSX, useState } from "react";

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
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export const recipeList: RecipeListItemProps[] = [
  {
    name: "Green Curry",
    cuisine: "Thai",
    type: "Main",
  },
  {
    name: "Pasta Puttanesca",
    cuisine: "Italian",
    type: "Main",
  },
  {
    name: "White-cut Chicken",
    cuisine: "Cantonese",
    type: "Main",
  },
  {
    name: "Stuffed Tofu",
    cuisine: "Cantonese",
    type: "Appetizer",
  },
  {
    name: "Roasted Pork",
    cuisine: "Cantonese",
    type: "Main",
  },
  {
    name: "Pad Thai",
    cuisine: "Thai",
    type: "Main",
  },
  {
    name: "Bolognese",
    cuisine: "Italian",
    type: "Main",
  },
];

export interface RecipeListItemProps {
  name: string;
  cuisine: string;
  type: string;
}

export interface RecipeListProps {
  recipes: RecipeListItemProps[];
}

export default function RecipeList({ recipes }: RecipeListProps): JSX.Element {
  const [filterOpen, setFilterOpen] = useState(false);

  const cuisines = Array.from(new Set(recipes.map((recipe) => recipe.cuisine)));
  const mealTypes = Array.from(new Set(recipes.map((recipe) => recipe.type)));

  return (
    <div className="flex flex-col">
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
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.name}>
              <TableCell className="text-left">{recipe.name}</TableCell>
              <TableCell className="text-left">{recipe.cuisine}</TableCell>
              <TableCell className="text-right">{recipe.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
