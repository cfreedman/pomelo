import Recipe, { greenCurry } from "@/components/Recipe";
import RecipeContainer from "@/components/RecipeContainer";
import RecipeList, { recipeList } from "@/components/RecipeList";
import { JSX } from "react";

export default function CalendarPage(): JSX.Element {
  return (
    <div className="flex justify-between w-full">
      <RecipeList recipes={recipeList} />
      <RecipeContainer>
        <Recipe name={greenCurry.name} ingredients={greenCurry.ingredients} />
      </RecipeContainer>
    </div>
  );
}
