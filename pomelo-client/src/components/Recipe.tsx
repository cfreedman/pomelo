import { JSX } from "react";

interface Ingredient {
  name: string;
  unit?: string;
}

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
}

export const greenCurry: Recipe = {
  name: "Green Curry",
  ingredients: [
    { name: "Chicken Thigh" },
    { name: "Coconut Milk", unit: "ml" },
    { name: "Green Curry Paste", unit: "g" },
    { name: "Kaffir Lime Leaves" },
  ],
};

export const stuffTofu: Recipe = {
  name: "Stuffed Tofu",
  ingredients: [{ name: "Soft tofu " }, { name: "Soy sauce ", unit: "ml" }],
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
