import { JSX, useState } from "react";

import { RecipeCreate, RecipeIngredientCreate } from "@/lib/recipes";

export default function RecipeForm(): JSX.Element {
  const [recipe, setRecipe] = useState<RecipeCreate | null>({
    name: "",
    cuisine: "",
    ingredients: [
      {
        name: "",
        quantity: 0,
        units: "",
      },
    ],
  } as RecipeCreate);

  return (
    <form className="flex flex-col">
      <input
        type="text"
        placeholder="Recipe Name"
        value={recipe?.name}
        onChange={(e) =>
          setRecipe({ ...recipe, name: e.target.value } as RecipeCreate)
        }
      />
      <input
        type="text"
        placeholder="Cuisine"
        value={recipe?.cuisine}
        onChange={(e) =>
          setRecipe({ ...recipe, cuisine: e.target.value } as RecipeCreate)
        }
      />
      {recipe?.ingredients?.map(({ name, units, quantity }) => (
        <div className="flex flex-row">
          <input type="text" placeholder="Ingredient" value={name} />
          <input type="text" placeholder="Quantity" value={quantity} />
          <input type="text" placeholder="Units" value={units} />
          <button onClick={() => {}} />
        </div>
      ))}
      <button onClick={() => {}} />
    </form>
  );
}
