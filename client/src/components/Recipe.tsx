import { JSX } from "react";

import PizzaImage from "@/assets/pizza.jpg";

interface Ingredient {
  name: string;
  unit?: string;
}

interface RecipeIngredient {
  ingredient: Ingredient;
  amount: number;
}

export interface Recipe {
  name: string;
  ingredients: RecipeIngredient[];
}

export const greenCurry: Recipe = {
  name: "Green Curry",
  ingredients: [
    { ingredient: { name: "Chicken Thigh" }, amount: 4 },
    { ingredient: { name: "Coconut Milk", unit: "ml" }, amount: 4 },
    { ingredient: { name: "Green Curry Paste", unit: "g" }, amount: 4 },
    { ingredient: { name: "Kaffir Lime Leaves" }, amount: 4 },
  ],
};

export const stuffTofu: Recipe = {
  name: "Stuffed Tofu",
  ingredients: [
    { ingredient: { name: "Soft tofu " }, amount: 2 },
    { ingredient: { name: "Soy sauce ", unit: "ml" }, amount: 500 },
  ],
};

export default function Recipe({ name, ingredients }: Recipe): JSX.Element {
  return (
    <div>
      <img
        className="h-[350px] rounded-lg"
        src={PizzaImage}
        alt="Pizza Image"
      />
      <h1 className="mt-[45px] mb-[20px] text-2xl">{name}</h1>
      <ul>
        {ingredients.map(({ ingredient, amount }) => {
          const unitString = ingredient.unit
            ? amount.toString().concat(ingredient.unit)
            : amount.toString();

          return (
            <li
              className="flex w-full justify-between py-[6px]"
              key={ingredient.name}
            >
              <p>{ingredient.name}</p>
              <p>{unitString}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
