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
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

export const recipeList: RecipeListItemProps[] = [
  {
    name: "Green Curry",
    cuisine: "Thai",
    type: "Main",
    tags: ["Healthy"],
  },
  {
    name: "Pasta Puttanesca",
    cuisine: "Italian",
    type: "Main",
    tags: ["Healthy"],
  },
  {
    name: "White-cut Chicken",
    cuisine: "Cantonese",
    type: "Main",
    tags: ["Healthy"],
  },
  {
    name: "Stuffed Tofu",
    cuisine: "Cantonese",
    type: "Appetizer",
    tags: ["Healthy"],
  },
  {
    name: "Roasted Pork",
    cuisine: "Cantonese",
    type: "Main",
    tags: ["Healthy"],
  },
  {
    name: "Pad Thai",
    cuisine: "Thai",
    type: "Main",
    tags: ["Healthy"],
  },
  {
    name: "Bolognese",
    cuisine: "Italian",
    type: "Main",
    tags: ["Healthy"],
  },
];

export interface RecipeListItemProps {
  name: string;
  cuisine: string;
  type: string;
  tags?: string[];
}

export interface RecipeListProps {
  recipes: RecipeListItemProps[];
}

export default function RecipeList({ recipes }: RecipeListProps): JSX.Element {
  const [filterOpen, setFilterOpen] = useState(false);

  const cuisines = Array.from(new Set(recipes.map((recipe) => recipe.cuisine)));
  const mealTypes = Array.from(new Set(recipes.map((recipe) => recipe.type)));

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
          {recipes.map((recipe) => (
            <TableRow key={recipe.name}>
              <TableCell className="text-left">{recipe.name}</TableCell>
              <TableCell className="text-left">{recipe.tags}</TableCell>
              <TableCell className="text-left">{recipe.type}</TableCell>
              <TableCell className="text-right">{recipe.cuisine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
