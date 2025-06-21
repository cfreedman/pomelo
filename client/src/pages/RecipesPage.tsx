import AnimateGroup from "@/components/AnimationProviders/AnimateGroup";
import Recipe, { greenCurry } from "@/components/Recipe";
import RecipeContainer from "@/components/RecipeContainer";
import RecipeList from "@/components/RecipeList";
import { JSX } from "react";

export default function CalendarPage(): JSX.Element {
  return (
    <div className="flex justify-between w-full">
      <RecipeList />
      <RecipeContainer>
        <AnimateGroup type="slide" direction="up" offset="medium">
          <Recipe name={greenCurry.name} ingredients={greenCurry.ingredients} />
        </AnimateGroup>
      </RecipeContainer>
    </div>
  );
}
