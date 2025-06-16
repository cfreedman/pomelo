import { JSX } from "react";

import { Badge } from "./ui/badge";
import { BaseRecipe } from "@/lib/recipes";

interface RecipeSuggestionsProps {
  recipes: BaseRecipe[];
}

export default function RecipeSuggestions({
  recipes,
}: RecipeSuggestionsProps): JSX.Element {
  return (
    <div className="w-full my-3 flex flex-wrap gap-2">
      {recipes.map((recipe) => (
        <Badge key={recipe.id}>{recipe.name}</Badge>
      ))}
    </div>
  );
}
