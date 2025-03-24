import { JSX } from "react";

interface Ingredient {
  name: string;
  unit?: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
}

export const recipe: Recipe = {
  name: "Green Curry",
  ingredients: [
    { name: "Chicken Thigh" },
    { name: "Coconut Milk", unit: "ml" },
    { name: "Green Curry Paste", unit: "g" },
    { name: "Kaffir Lime Leaves" },
  ],
};

export default function Recipe({ name, ingredients }: Recipe): JSX.Element {
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
}
