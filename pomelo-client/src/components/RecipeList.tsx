import { JSX } from "react";

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
  },
  {
    name: "Pasta Puttanesca",
    cuisine: "Italian",
  },
  {
    name: "White-cut Chicken",
    cuisine: "Cantonese",
  },
];

export interface RecipeListItemProps {
  name: string;
  cuisine: string;
}

export interface RecipeListProps {
  recipes: RecipeListItemProps[];
}

export default function RecipeList({ recipes }: RecipeListProps): JSX.Element {
  return (
    <div>
      <h1>Recipes</h1>
      <Button>Filters</Button>
      <div className="flex">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Group by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cuisine</SelectLabel>
              <SelectItem value="poop">Thai</SelectItem>
              <SelectItem value="poop">Italian</SelectItem>
              <SelectItem value="poop">Cantonese</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cuisine</SelectLabel>
              <SelectItem value="poop">Thai</SelectItem>
              <SelectItem value="poop">Italian</SelectItem>
              <SelectItem value="poop">Cantonese</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>Hello</TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.name}>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>{recipe.cuisine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
